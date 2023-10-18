// const express = require("express");
// const app = express();
// // const http = require("http");
// const { createServer } = require("http");
// const { Server } = require("socket.io");
// const cors = require("cors");

// app.use(cors());

// // const server = http.createServer(app);
// const httpServer = createServer(app);

// app.get('/home', (req, res) => {
//     res.send('Hello');
// });

// // const io = new Server(httpServer, {
// //   cors: {
// //     origin: "http://localhost:5173",
// //     methods: ["GET", "POST"],
// //   },
// // });

// const io = new Server(httpServer, {
//   cors: {
//     origin: "https://chat-app-front-tau.vercel.app", // Update this to your frontend domain with HTTPS
//     methods: ["GET", "POST"],
//   },
//   allowEIO3: true, // Add this line
// });

// console.log("CORS configuration:", io.cors);
  
// io.use((socket, next) => {
//     // Implement your own CORS logic here
//     const allowedOrigins = ["https://chat-app-front-tau.vercel.app"];
//     const origin = socket.handshake.headers.origin;
  
//     if (allowedOrigins.includes(origin)) {
//       return next();
//     }
  
//     return next(new Error("Invalid origin"));
//   });
  

//   io.on("connection", (socket) => {
//     console.log(`User Connected: ${socket.id}`);
  
//     socket.on("join_room", (data) => {
//       socket.join(data);
//     });
  
//     socket.on("send_message", (data) => {
//       socket.to(data.room).emit("receive_message", data);
//     });
  
//     // Add disconnect event handling
//     socket.on("disconnect", () => {
//       console.log(`User Disconnected: ${socket.id}`);
//     });
//   });


  

//   httpServer.listen(3001, () => {
//   console.log("SERVER IS RUNNING");
// });


const express = require("express");
const app = express();
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "https://chat-app-front-tau.vercel.app",
    methods: ["GET", "POST"],
  },
  allowEIO3: true,
});

io.use((socket, next) => {
  const allowedOrigins = ["https://chat-app-front-tau.vercel.app"];
  const origin = socket.handshake.headers.origin;

  if (allowedOrigins.includes(origin)) {
    return next();
  }

  return next(new Error("Invalid origin"));
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log(`User Disconnected: ${socket.id}`);
  });
});

httpServer.listen(3001, () => {
  console.log("SERVER IS RUNNING");
});