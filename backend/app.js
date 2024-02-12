
const express = require('express');
require('dotenv').config();
require('./models/db');

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

app.listen(8000, ()=>{
  console.log("Port is now listening to 8000");
});
