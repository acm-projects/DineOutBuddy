import express from 'express';
import { } from 'dotenv/config';
import axios from 'axios';
import fs from 'fs/promises';

export const router = express.Router();


router.get('/restaurants', async (req, res) => {
    const options = {
        // your options stay the same
        method: 'GET',
        url: 'https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng',
        params: {
            latitude: '32.94306862766964',
            longitude: '-96.74978670141907',
            limit: '30',
            currency: 'USD',
            distance: '10',
            open_now: 'true',
            dietary_restrictions: '', // Example: Halal
            lunit: 'km',
            lang: 'en_US'
        },
        headers: {
            'X-RapidAPI-Key': process.env.RAPID_API_KEY, 
            'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        const filteredData = response.data.data
            .filter(restaurant => restaurant.name) // Filter out restaurants without a name
            .map(restaurant => {
                // Transform dietary restrictions and cuisine to comma separated strings
                const dietaryRestrictionsList = restaurant.dietary_restrictions ? restaurant.dietary_restrictions.map(dr => dr.name).join(", ") : 'No specific dietary options listed';
                const cuisineList = restaurant.cuisine ? restaurant.cuisine.map(c => c.name).join(", ") : 'Various';

                return {
                    name: restaurant.name,
                    address: restaurant.address || 'Address not provided',
                    dietary_restrictions: dietaryRestrictionsList,
                    cuisine: cuisineList
                };
            });
        



        // Convert filteredData to a string
        const dataString = JSON.stringify(filteredData, null, 2);
        
        await fs.writeFile('restaurants.txt', dataString);
        console.log('Data written to restaurants.txt');
        res.json({ message: 'Data successfully written to restaurants.txt' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


export default router;