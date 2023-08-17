const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("User connected with ID: ", socket.id);

  socket.on("join_room", (data) => {
    socket.join(data.room);
  });

  socket.on("send_message", (messageData) => {
    socket.to(messageData.room).emit("message_received", messageData);
    console.log("Message Data: ", messageData);
  });
  socket.on("disconnect", () => {
    console.log("User with ID disconnected: ", socket.id);
  });
});

server.listen(3001, () => {
  console.log("Connected");
});
