import express from 'express';
import {} from 'dotenv/config';
import mongoose from 'mongoose';
import userRoute from './routes/user.js';
import chatRoute from './routes/chat.js';
import { chats } from './data/data.js';

const app = express();

// Middleware
app.use(express.json());
app.use('/api/user',userRoute);
app.use('/api/chat',chatRoute);

app.get("/", (req,res)=>{
  res.send("<h1>DineOutBuddy On Top</h1>");
});

app.get("/api/chat", (req, res) =>{
  res.send(chats);
})

app.get("/api/chat/:id", (req, res) =>{
  const { id } = req.params
  const singleChat = chats.find(chat => chat._id === id)
  res.send(singleChat);
})



mongoose.connect(process.env.MONGO_URI).then(()=>{
  console.log("App is connect to Database");
  app.listen(8000, ()=>{
    console.log("Port is now listening to 8000");
  });
}).catch(err => console.log(err.message));

