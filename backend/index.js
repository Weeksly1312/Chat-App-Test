const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
  },
});

app.use(cors()); // Enable CORS for all routes

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('A user connected');

  // Listen for joining a room
  socket.on('join room', (room) => {
    socket.join(room);
    console.log(`User joined room: ${room}`);
  });

  // Listen for messages in a specific room
  socket.on('chat message', ({ room, msg }) => {
    io.to(room).emit('chat message', msg);
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
