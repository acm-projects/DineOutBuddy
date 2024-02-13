const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const userRouter = require('./routes/user')

const app = express();

const User = require('./models/user');

// Middleware
app.use(express.json());
app.use(userRouter)

app.get("/", (req,res)=>{
  res.send("<h1>Hello World</h1>");
});

mongoose.connect(process.env.MONGO_URI).then(()=>{
  console.log("App is connect to Database");
  app.listen(8000, ()=>{
    console.log("Port is now listening to 8000");
  });
}).catch(err => console.log(err.message));

