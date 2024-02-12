const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');

const app = express();

const User = require('./models/user')

app.get("/", (req,res)=>{
  res.send("<h1>Hello World</h1>");
});

app.post('/create-user', async (req,res) => {
  const user = await User({
    firstName: "Jason",
    lastName: "Luu",
    password: "Potato",
    avatar: "",
    allergies: "Potato",
    preferences: "Potato",
  });

  await user.save();
  res.json(user);
})

mongoose.connect(process.env.MONGO_URI).then(()=>{
  console.log("App is connect to Database");
  app.listen(8000, ()=>{
    console.log("Port is now listening to 8000");
  });
}).catch(err => console.log(err.message));

