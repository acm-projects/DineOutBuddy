import express from 'express';
import mongoose from 'mongoose';
import { } from 'dotenv/config';
import userRoute from './routes/user.js';
import chatRoute from './routes/chat.js';
import googleRoute from './routes/google.js';
import travelRoute from './routes/travel.js'


const app = express();

let menuIDs;


app.use(express.json());
app.use(userRoute);
app.use(chatRoute);
app.use(googleRoute);
app.use(travelRoute)

app.get("/", async(req, res) => {
  res.send("<h1>DineOutBuddy On Top</h1>");
  
});


// Define the .get route for searching the closest match
// app.get('/findClosestMatch', async (req, res) => {
//   const { name, lat, lng } = req.query;

//   try {
//     const closestMatch = await searchClosestMatch(name, parseFloat(lat), parseFloat(lng));
//     if (closestMatch) {
//       res.json(closestMatch);
//     } else {
//       res.status(404).json({ message: "No close match found." });
//     }
//   } catch (error) {
//     console.error('Search Error:', error);
//     res.status(500).json({ message: "An error occurred during the search process." });
//   }
// });



mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("App is connected to Database");
    app.listen(8000, () => {
      console.log("Port is now listening to 8000");
    });
    
  })
  .catch(err => console.log(err.message));










