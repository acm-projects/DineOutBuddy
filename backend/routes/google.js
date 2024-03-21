import express from 'express';
import { } from 'dotenv/config';
import axios from 'axios';
import { unsubscribe } from 'diagnostics_channel';

export const router = express.Router();


router.get('/restaurantsByDiet', async (req, res) => {
    const { lat, lng, restrictions } = req.query;
    const apiKey = process.env.GOOGLE_API_KEY;
    const formattedRestrictions =  restrictions.replace(/\+/g, '|');
    const uber = "only uber eats  " + formattedRestrictions;
    console.log(uber);

    let url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=20000&type=restaurant&keyword=${uber}&key=${apiKey}`;

    let allRestaurants = [];
    let pageCount = 0;

    try {
        while (url && pageCount < 1) {
            const response = await axios.get(url);
            const results = response.data.results;
            const nextPageToken = response.data.next_page_token;

            allRestaurants = allRestaurants.concat(results.map(result => ({
                name: result.name,
                address: result.vicinity,
                rating: result.rating,
                latitude: result.geometry.location.lat,
                longitude: result.geometry.location.lng,
                googleMapsLink: `https://www.google.com/maps/search/?api=1&query=${result.geometry.location.lat},${result.geometry.location.lng}`
            })));

            if (!nextPageToken) break;

            url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken=${nextPageToken}&key=${apiKey}`;
            pageCount++;

            await new Promise(resolve => setTimeout(resolve, 2000)); // 2 seconds delay
        }

        res.json(allRestaurants);
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
    } catch (error) {
        console.error('Error fetching restaurants:', error);
        res.status(500).json({ message: error.message });
    }
});


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