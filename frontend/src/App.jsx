// import io from "socket.io-client";
// import { useEffect, useState } from "react";

// // const socket = io.connect("http://localhost:3001");
// // const socket = io.connect("https://chat-app-test-chi.vercel.app/");
// const socket = new WebSocket('ws://some-websocket-website.com');

// function App() {
//   //Room State
//   const [room, setRoom] = useState("");

//   // Messages States
//   const [message, setMessage] = useState("");
//   const [messageReceived, setMessageReceived] = useState("");

//   const joinRoom = () => {
//     if (room !== "") {
//       socket.emit("join_room", room);
//     }
//   };

//   const sendMessage = () => {
//     socket.emit("send_message", { message, room });
//   };

//   useEffect(() => {
//     socket.on("receive_message", (data) => {
//       setMessageReceived(data.message);
//     });
//   }, []);
//   return (
//     <div className="App">
//       <input
//         placeholder="Room Number..."
//         onChange={(event) => {
//           setRoom(event.target.value);
//         }}
//       />
//       <button onClick={joinRoom}> Join Room</button>
//       <input
//         placeholder="Message..."
//         onChange={(event) => {
//           setMessage(event.target.value);
//         }}
//       />
//       <button onClick={sendMessage}> Send Message</button>
//       <h1> Message:</h1>
//       {messageReceived}
//     </div>
//   );
// }

// export default App;

import { useEffect, useState } from "react";

const socket = new WebSocket("wss://chat-app-test-chi.vercel.app/");

function App() {
  // Room State
  const [room, setRoom] = useState("");

  // Messages States
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");

  const joinRoom = () => {
    if (room !== "") {
      // Use JSON.stringify to send data as a JSON string
      socket.send(JSON.stringify({ type: "join_room", room }));
    }
  };

  const sendMessage = () => {
    // Use JSON.stringify to send data as a JSON string
    socket.send(JSON.stringify({ type: "send_message", message, room }));
  };

  useEffect(() => {
    // Handle incoming messages
    const handleIncomingMessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "receive_message") {
        setMessageReceived(data.message);
      }
    };

    // Add the event listener
    socket.addEventListener("message", handleIncomingMessage);

    // Clean up the event listener on component unmount
    return () => {
      socket.removeEventListener("message", handleIncomingMessage);
    };
  }, []);

  return (
    <div className="App">
      <input
        placeholder="Room Number..."
        onChange={(event) => {
          setRoom(event.target.value);
        }}
      />
      <button onClick={joinRoom}> Join Room</button>
      <input
        placeholder="Message..."
        onChange={(event) => {
          setMessage(event.target.value);
        }}
      />
      <button onClick={sendMessage}> Send Message</button>
      <h1> Message:</h1>
      {messageReceived}
    </div>
  );
}

export default App;
