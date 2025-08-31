const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join", (username) => {
    socket.username = username;
    io.emit("chatMessage", { user: "System", text: `${username} joined the chat` });
  });

  socket.on("chatMessage", (msg) => {
    io.emit("chatMessage", { user: socket.username, text: msg });
  });

  socket.on("disconnect", () => {
    if (socket.username) {
      io.emit("chatMessage", { user: "System", text: `${socket.username} left the chat` });
    }
    console.log("User disconnected:", socket.id);
  });
});

server.listen(5000, () => {
  console.log("🚀 Backend running on http://localhost:5000");
});
