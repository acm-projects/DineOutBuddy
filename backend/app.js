import express from 'express';
import {} from 'dotenv/config';
import mongoose from 'mongoose';
import userRoute from './routes/user.js';

const app = express();

// Middleware
app.use(express.json());
app.use(userRoute)

app.get("/", (req,res)=>{
  res.send("<h1>Hello World</h1>");
});

mongoose.connect(process.env.MONGO_URI).then(()=>{
  console.log("App is connect to Database");
  app.listen(8000, ()=>{
    console.log("Port is now listening to 8000");
  });
}).catch(err => console.log(err.message));

