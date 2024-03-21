import express from 'express';
import { createUser, userSignIn, getUserPreferencesByUsername } from "../controllers/user.js";
import { validateUserSignUp, userValidation, validateUserSignIn } from "../middlewares/validation/user.js";
import isAuth from '../middlewares/auth.js';
import axios from 'axios';
import fs from 'fs';
import stringSimilarity from 'string-similarity';
import geolib from 'geolib';
import csvParser from 'csv-parser';

export const router = express.Router();


router.post('/create-user', validateUserSignUp, userValidation, createUser);
router.post('/sign-in', validateUserSignIn, userValidation, userSignIn);
router.post('/create-post', isAuth, (req, res) => {
  res.send("DineoutBuddy Secret Route!");
});

// Define the .get route for user preferences by username
router.get('/user/preferences/:username', isAuth, getUserPreferencesByUsername);

router.post("/signInAndFetchRestaurants", async (req, res) => {
  const { email, password, lat, lng } = req.body;

  try {
    const signInResponse = await axios.post('http://localhost:8000/sign-in', {
      email,
      password,
    });

    if (signInResponse.data.success) {
      //
      const preferences = signInResponse.data.user.preferences.join(' and ');
      const allergies = signInResponse.data.user.allergies.join(' and ') ;

      const allRestrictions  = allergies + preferences;


      //http://localhost:8000/restaurantsByDiet?lat=32.98628371775638&lng=-96.74978670141907&restrictions=halal+vegan+peanut allergy
      const restaurantsResponse = await axios.get(`http://localhost:8000/restaurantsByDiet?lat=${lat}&lng=${lng}&restrictions=${preferences + allergies}`);
      console.log(restaurantsResponse);
      res.json(restaurantsResponse.data);
      console.log(allRestrictions);
    } else {
      res.status(401).json({ message: "Authentication failed" });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: "An error occurred during the process." });
  }
});

router.post("/signInAndFetchRestaurantsID", async (req, res) => {
  const { email, password, lat, lng } = req.body;

  try {
    const signInResponse = await axios.post('http://localhost:8000/sign-in', {
      email,
      password,
    });

    if (signInResponse.data.success) {
      // Retrieve preferences and allergies from user data
      const preferences = signInResponse.data.user.preferences.join(' and ');
      const allergies = signInResponse.data.user.allergies.join(' and ');

      // Fetch restaurants with these preferences
      const restaurantsResponse = await axios.get(`http://localhost:8000/restaurantsByDiet?lat=${lat}&lng=${lng}&restrictions=${preferences + allergies}`);

      // Process each restaurant through searchClosestMatch
      const restaurants = restaurantsResponse.data; // Assuming this is an array of restaurant objects
      // Debugging: Log input data
      console.log(`Received for search: ${restaurants.length} restaurants`);

      const matches = await Promise.all(restaurants.map(restaurant => {
        // Debugging: Log each restaurant's data
        console.log(`Processing restaurant: ${restaurant.name}, Latitude: ${restaurant.latitude}, Longitude: ${restaurant.longitude}`);
        return searchClosestMatch(restaurant.name, parseFloat(restaurant.latitude), parseFloat(restaurant.longitude));
      }));

      // Debugging: Log results before filtering
      console.log(`Matches before filtering:`, matches);

      // Filter out any failed matches and extract the IDs
      const matchedIds = matches.filter(match => match !== null).map(match => {
        // Debugging: Log matched IDs
        console.log(`Matched ID: ${match.id}`);
        return match.id;
      });

      // Debugging: Log final matched IDs array
      console.log(`Final matched IDs:`, matchedIds);

      // Send back the matched IDs
      res.json({ matchedIds });
      console.log({ matchedIds });
    } else {
      res.status(401).json({ message: "Authentication failed" });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: "An error occurred during the process." });
  }
});


function searchClosestMatch(name, latitude, longitude) {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream('./restaurants.csv')
      .pipe(csvParser())
      .on('data', (data) => {
        const similarity = stringSimilarity.compareTwoStrings(data.name, name);
        const isCloseby = geolib.isPointWithinRadius(
          { latitude: parseFloat(data.lat), longitude: parseFloat(data.lng) },
          { latitude, longitude },
          100 // radius in meters to consider a match; adjust as needed
        );
        if (similarity > 0.4 && isCloseby) { // adjust similarity threshold as needed
          results.push({ ...data, similarity });
        }
      })
      .on('end', () => {
        // Sort results by similarity score and return the top result
        results.sort((a, b) => b.similarity - a.similarity);
        resolve(results.length > 0 ? results[0] : null);
      })
      .on('error', (error) => {
        reject(error);
      });
  });
}

export default router;
