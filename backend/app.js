import express from 'express';
import mongoose from 'mongoose';
import {} from 'dotenv/config';
import axios from 'axios';
import userRoute from './routes/user.js';

const app = express();

let locationId;

let restrictions = ["10665", "Vegan"]

app.use(express.json());
app.use(userRoute);

app.get("/", (req, res) => {
  res.send("<h1>DineOutBuddy On Top</h1>");
});




app.get('/restaurants', async (req, res) => {
  const options = {
    method: 'GET',
    url: 'https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng',
    params: {
      latitude: '32.98628371775638',
      longitude: '-96.74978670141907',
      limit: '30',
      currency: 'USD',
      distance: '10',
      open_now: 'true',
      lunit: 'km',
      lang: 'en_US'
    },
    headers: {
      'X-RapidAPI-Key': 'bdc36472b6mshfdfcd79ed24e568p155518jsna1f270bf8fe0',
      'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
    }
  };

  try {
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

