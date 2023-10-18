// const express = require("express");
// const app = express();
// // const http = require("http");
// const { createServer } = require("http");
// const { Server } = require("socket.io");
// const cors = require("cors");

// app.use(cors());

// // const server = http.createServer(app);
// const httpServer = createServer(app);

// app.get("/home", (req, res) => {
//   res.send("Hello");
// });

// const io = new Server(httpServer, {
//   cors: {
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST"],
//   },
// });

// // const io = new Server(httpServer, {
// //   cors: {
// //     origin: "https://chat-app-front-tau.vercel.app", // Update this to your frontend domain with HTTPS
// //     methods: ["GET", "POST"],
// //   },
// // });

// io.on("connection", (socket) => {
//   console.log(`User Connected: ${socket.id}`);

//   socket.on("join_room", (data) => {
//     socket.join(data);
//   });

//   socket.on("send_message", (data) => {
//     socket.to(data.room).emit("receive_message", data);
//   });


// //   socket.on("disconnect", () => {
// //     console.log(`User Disconnected: ${socket.id}`);
// //   });
// });

// httpServer.listen(3001, () => {
//   console.log("SERVER IS RUNNING");
// });

const express = require("express");
const app = express();
const { createServer } = require("http");
const WebSocket = require("ws");
const cors = require("cors");

app.use(cors());

const httpServer = createServer(app);

app.get("/home", (req, res) => {
  res.send("Hello");
});

// Create a WebSocket server using the existing HTTP server
const wsServer = new WebSocket.Server({ server: httpServer });

wsServer.on("connection", (socket) => {
  console.log(`User Connected: ${socket._socket.remoteAddress}`);

  socket.on("message", (message) => {
    // Handle incoming messages
    const data = JSON.parse(message);
    if (data.type === "join_room") {
      socket.room = data.room;
      socket.join(data.room);
    } else if (data.type === "send_message") {
      wsServer.clients.forEach((client) => {
        // Broadcast the message to all clients in the same room
        if (client.room === socket.room && client !== socket) {
          client.send(JSON.stringify({ type: "receive_message", ...data }));
        }
      });
    }
  });

  socket.on("close", () => {
    console.log(`User Disconnected: ${socket._socket.remoteAddress}`);
  });
});

httpServer.listen(3001, () => {
  console.log("SERVER IS RUNNING");
});
