import express from "express";
import {} from "dotenv/config";
import mongoose from "mongoose";
import userRoutes from "./routes/user.js";
import chatRoutes from "./routes/chat.js";
import messageRoutes from "./routes/message.js";
import { chats } from "./data/data.js";

const app = express();

// Middleware
app.use(express.json());
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

app.get("/", (req, res) => {
  res.json({ success: true, message: "Welcome to backend DineOutBuddy" });
});

app.get("/api/chat", (req, res) => {
  res.send(chats);
});

app.get("/api/chat/:id", (req, res) => {
  const { id } = req.params;
  const singleChat = chats.find((chat) => chat._id === id);
  res.send(singleChat);
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("App is connect to Database");
    app.listen(8000, () => {
      console.log("Port is now listening to 8000");
    });
  })
  .catch((err) => console.log(err.message));
