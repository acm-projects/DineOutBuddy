import express from "express";
import {} from "dotenv/config";
import mongoose from "mongoose";
import userRoutes from "./routes/user.js";
import chatRoutes from "./routes/chat.js";
import messageRoutes from "./routes/message.js";
import aichatRoute from './routes/aichat.js';
import googleRoute from './routes/google.js';
import travelRoute from './routes/travel.js'

import { chats } from "./data/data.js";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("App is connect to Database");
    const httpServer = createServer(app);

    const io = new Server(httpServer, {
      pingTimeout: 60000,
      cors: {
        origin: "http://10.178.162.233:8081",
      },
    });

    io.on("connection", (socket) => {
      console.log("Connected to Socket.io");

      socket.on("setup", (userData) => {
        socket.join(userData._id);
        socket.emit("connected");
      });

      socket.on("join chat", (room) => {
        socket.join(room);
        console.log("User joined Room: " + room);
      });

      socket.on("new message", (newMessageReceived) => {
        console.log(newMessageReceived);
        var chat = newMessageReceived.chat;
        if (!chat.users) return console.log("chat.users not defined");

        chat.users.forEach((user) => {
          if (user._id == newMessageReceived.sender._id) {
            return;
          }
          socket.in(user._id).emit("message recieved", newMessageReceived);
        });
      });

      socket.on("typing", (room) => socket.in(room).emit("typing"));
      socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

      socket.off("setup", () => {
        console.log("user disconnected");
        socket.leave(userData._id);
      });
    });

    httpServer.listen(8000, () => {
      console.log("Port is now listening to 8000");
    });
  })
  .catch((err) => console.log(err.message));

// Middleware
app.use(express.json());
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);
app.use(aichatRoute);
app.use(googleRoute);
app.use(travelRoute);

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

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("App is connected to Database");
    app.listen(6000, () => {
      console.log("Port is now listening to 8000");
    });
    
  })
  .catch(err => console.log(err.message));
