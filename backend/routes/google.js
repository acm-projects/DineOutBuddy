import express from 'express';
import { } from 'dotenv/config';
import axios from 'axios';
import fs from 'fs';
import csvParser from 'csv-parser';
import { unsubscribe } from 'diagnostics_channel';
import { User } from "../models/user.js";
import isAuth from "../middlewares/auth.js"

export const router = express.Router();

// Helper function to read and parse the CSV file
const readCsvFile = (filePath) => {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
};

const haversine = (lat1, lon1, lat2, lon2) => {
  const R = 6371e3; // meters
  const phi1 = lat1 * Math.PI / 180;
  const phi2 = lat2 * Math.PI / 180;
  const deltaPhi = (lat2 - lat1) * Math.PI / 180;
  const deltaLambda = (lon2 - lon1) * Math.PI / 180;

  const a = Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
            Math.cos(phi1) * Math.cos(phi2) *
            Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in meters
};

const preprocessMenuItems = (menuItemsData) => {
  const menuItemsMap = new Map();

  menuItemsData.forEach(item => {
    if (!menuItemsMap.has(item.restaurant_id)) {
      menuItemsMap.set(item.restaurant_id, []);
    }
    menuItemsMap.get(item.restaurant_id).push({
      category: item.category,
      name: item.name,
      description: item.description,
      price: item.price,
    });
  });

  

  return menuItemsMap;
};

router.get('/matchedRestaurants', async (req, res) => {
  const { lat, lng, restrictions } = req.query;
  const apiKey = process.env.GOOGLE_API_KEY;
  const restaurantsCsvPath = './restaurants.csv';
  const menuItemsCsvPath = './restaurant-menus.csv'; // Ensure this path is correct
  const matchThreshold = 500; // meters
  const menuItemsData = await readCsvFile(menuItemsCsvPath);
  //console.log("Sample menu item data:", menuItemsData.slice(0, 5));

  try {
    const restaurantsData = await readCsvFile(restaurantsCsvPath);
    const menuItemsData = await readCsvFile(menuItemsCsvPath);
    const menuItemsMap = preprocessMenuItems(menuItemsData); // Preprocess menu items into a Map

    const formattedRestrictions = restrictions.replace(/\+/g, '|');
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=1500&type=restaurant&keyword=${formattedRestrictions}&key=${apiKey}`;
    const apiResponse = await axios.get(url);
    const placesApiResults = apiResponse.data.results;

    const matchedRestaurants = placesApiResults.map(apiRestaurant => {
      let closestMatch = null;  
      let shortestDistance = Infinity;

      restaurantsData.forEach(csvRestaurant => {
        const distance = haversine(
          apiRestaurant.geometry.location.lat,
          apiRestaurant.geometry.location.lng,
          parseFloat(csvRestaurant.lat),
          parseFloat(csvRestaurant.lng)
        );

        if (distance < shortestDistance) {
          shortestDistance = distance;
          closestMatch = csvRestaurant;
        }
      });

      if (closestMatch && shortestDistance <= matchThreshold) {
        const restaurantMenuItems = menuItemsMap.get(closestMatch.id) || [];
        const menuItemsString = restaurantMenuItems.map(item => `${item.name} (${item.category}): ${item.price}`).join(", ");
        return {
          id: closestMatch.id,
          name: apiRestaurant.name,
          lat: apiRestaurant.geometry.location.lat,
          lng: apiRestaurant.geometry.location.lng,
          vicinity: apiRestaurant.vicinity,
          rating: apiRestaurant.rating,
          openNow: apiRestaurant.opening_hours?.open_now?.toString() ?? 'Unknown',
          price_level: apiRestaurant.price_level,
          category: closestMatch.category.split(','),
          user_ratings_total: apiRestaurant.user_ratings_total,
          photo: apiRestaurant.photos?.[0]?.photo_reference ?? 'DEFAULT_PHOTO_REFERENCE',
          distance: shortestDistance,
          place_id: apiRestaurant.place_id,
          menuString: menuItemsString,
          menuItems: restaurantMenuItems
        };
      }
    }).filter(Boolean);

    res.json(matchedRestaurants);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: error.message });
  }
});


router.get('/restaurantsByDiet', async (req, res) => {
    const { lat, lng, restrictions } = req.query; // Get latitude, longitude, and dietary restrictions from query parameters
    const apiKey = process.env.GOOGLE_API_KEY; // Your Google API key

    // Replace '+' with '|' to construct a keyword parameter that searches for any of the specified restrictions
    const formattedRestrictions = restrictions.replace(/\+/g, '|');
    const uber = "uber eats only" + formattedRestrictions;
    //console.log(profile.allergies);
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=150000&type=restaurant&keyword=${uber}&key=${apiKey}`;

    try {   
        const response = await axios.get(url);
        // const filteredRestaurants = response.data.results.map(result => ({
        //     name: result.name,
        //     address: result.vicinity,
        //     rating: result.rating,
        //     latitude: result.geometry.location.lat,
        //     longitude: result.geometry.location.lng,
        //     googleMapsLink: `https://www.google.com/maps/search/?api=1&query=${result.geometry.location.lat},${result.geometry.location.lng}`
        // }));
        res.json(response.data.results);
    } catch (error) {
        console.error('Error fetching restaurants with specified dietary restrictions:', error);
        res.status(500).json({ message: error.message });
    }
});

router.get('/restaurantsByDietClean', async (req, res) => {
    const { lat, lng, restrictions } = req.query; // Get latitude, longitude, and dietary restrictions from query parameters
    const apiKey = process.env.GOOGLE_API_KEY; // Your Google API key

    // Replace '+' with '|' to construct a keyword parameter that searches for any of the specified restrictions
    const formattedRestrictions = restrictions.replace(/\+/g, '|');
    const uber = "uber eats only and " + formattedRestrictions;
    //console.log(profile.allergies);
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=1500&type=restaurant&keyword=${formattedRestrictions}&key=${apiKey}`;

    try {   
        const response = await axios.get(url);
        const filteredRestaurants = response.data.results.map(result => ({
            name: result.name,
            address: result.vicinity,
            rating: result.rating,
            latitude: result.geometry.location.lat,
            longitude: result.geometry.location.lng,
            googleMapsLink: `https://www.google.com/maps/search/?api=1&query=${result.geometry.location.lat},${result.geometry.location.lng}`
        }));
        res.json(filteredRestaurants);
    } catch (error) {
        console.error('Error fetching restaurants with specified dietary restrictions:', error);
        res.status(500).json({ message: error.message });
    }
});


router.get('/findRestaurants', async (req, res) => {
    const { lat, lng } = req.query; // Get latitude and longitude from query parameters
    const apiKey = process.env.GOOGLE_API_KEY; 
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=1500&type=restaurant&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        const formattedResponse = response.data.results.map(restaurant => ({
            name: restaurant.name,
            address: restaurant.vicinity,
            placeId: restaurant.place_id
        }));
        res.json(formattedResponse);

        //res.json(response.data);
    } catch (error) {
        console.error('Error fetching restaurants:', error);
        res.status(500).json({ message: error.message });
    }
});

// const formattedResponse = response.data.results.map(restaurant => ({
        //     name: restaurant.name,
        //     address: restaurant.vicinity,
        //     placeId: restaurant.place_id
        // }));
        // res.json(formattedResponse);



router.get('/restaurantDetails', async (req, res) => {
    const { placeId } = req.query; // Get the Place ID from query parameters
    const apiKey = process.env.GOOGLE_API_KEY; 
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        const result = response.data.result; 

        // Log the name and address to the console
        console.log('Name:', result.name);
        console.log('Address:', result.formatted_address);
        console.log("https://www.google.com/search?q=" + result.name + result.formatted_address);

        res.json(response.data);
    } catch (error) {
        console.error('Error fetching restaurant details:', error);
        res.status(500).json({ message: error.message });
    }
});

export default router;