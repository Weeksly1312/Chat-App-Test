// const express = require("express");
// const app = express();
// const http = require("http");
// const { Server } = require("socket.io");
// const cors = require("cors");

// app.use(cors());

// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST"],
//   },
// });

// io.on("connection", (socket) => {
//   console.log(`User Connected: ${socket.id}`);

//   socket.on("join_room", (data) => {
//     socket.join(data);
//   });

//   socket.on("send_message", (data) => {
//     socket.to(data.room).emit("receive_message", data);
//   });
// });

// server.listen(3001, () => {
//   console.log("SERVER IS RUNNING");
// });

// app.js

const express = require('express');
const app = express();
const port = 3000;
// Add this middleware before your routes
app.get('/favicon.ico', (req, res) => res.status(204).end());

// Define a route that displays "Hello"
app.get('/', (req, res) => {
    res.send('Hello');
});

// Start the server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
