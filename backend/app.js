import express from 'express';
import mongoose from 'mongoose';
import axios from 'axios';
import userRoute from './routes/user.js';

const app = express();

let locationId;

app.use(express.json());
app.use(userRoute);

app.get("/", (req, res) => {
  res.send("<h1>DineOutBuddy On Top</h1>");
});


app.post("/location/:city", async (req, res) => {
  try {
    const encodedParams = new URLSearchParams();
    const city = req.params.city;
    encodedParams.set('q', city);
    encodedParams.set('language', 'en_US');

    const options = {
      method: 'POST',
      url: 'https://restaurants222.p.rapidapi.com/typeahead',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': 'bdc36472b6mshfdfcd79ed24e568p155518jsna1f270bf8fe0',
        'X-RapidAPI-Host': 'restaurants222.p.rapidapi.com'
      },
      data: encodedParams,
    };

    const response = await axios.request(options);
    const locations = response.data.results.data;
    locationId = locations[0].result_object.location_id; 
    console.log('Location ID:', locationId);
    res.json({ locationId }); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post("/restaurants", async (req, res) => {
  try {
    const encodedParams = new URLSearchParams();
    encodedParams.set('location_id', locationId);
    encodedParams.set('language', 'en_US');
    encodedParams.set('currency', 'USD');
    encodedParams.set('offset', '0');

    const options = {
      method: 'POST',
      url: 'https://restaurants222.p.rapidapi.com/search',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': 'bdc36472b6mshfdfcd79ed24e568p155518jsna1f270bf8fe0',
        'X-RapidAPI-Host': 'restaurants222.p.rapidapi.com'
      },
      data: encodedParams,
    };

    const response = await axios.request(options);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("App is connected to Database");
    app.listen(8000, () => {
      console.log("Port is now listening to 8000");
    });
  })
  .catch(err => console.log(err.message));

