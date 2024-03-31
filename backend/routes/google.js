import express from 'express';
import { } from 'dotenv/config';
import axios from 'axios';
import { unsubscribe } from 'diagnostics_channel';
import { User } from "../models/user.js";
import isAuth from "../middlewares/auth.js"

export const router = express.Router();


router.get('/restaurantsByDiet', async (req, res) => {
    const { lat, lng, restrictions } = req.query; // Get latitude, longitude, and dietary restrictions from query parameters
    const apiKey = process.env.GOOGLE_API_KEY; // Your Google API key

    // Replace '+' with '|' to construct a keyword parameter that searches for any of the specified restrictions
    const formattedRestrictions = restrictions.replace(/\+/g, '|');
    const uber = "uber eats only and " + formattedRestrictions;
    //console.log(profile.allergies);
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=1500&type=restaurant&keyword=${formattedRestrictions}&key=${apiKey}`;

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