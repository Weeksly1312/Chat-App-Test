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

const socket = new WebSocket("wss://localhost:3001");

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
    if (socket && socket.readyState === WebSocket.OPEN) {
      const data = { type: "send_message", message, room };
      socket.send(JSON.stringify(data));
    } else {
      console.error("WebSocket is not open.");
    }
  };
  

  useEffect(() => {
    const handleIncomingMessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "receive_message") {
        setMessageReceived(data.message);
      }
    };
  
    const openWebSocket = () => {
      const newSocket = new WebSocket("wss://chat-app-test-chi.vercel.app/");
  
      newSocket.addEventListener("open", () => {
        console.log("WebSocket connection opened");
      });
  
      newSocket.addEventListener("message", handleIncomingMessage);
  
      newSocket.addEventListener("close", () => {
        console.log("WebSocket connection closed");
      });
  
      setSocket(newSocket);
    };
  
    if (!socket || socket.readyState === WebSocket.CLOSED) {
      openWebSocket();
    }
  
    return () => {
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
    };
  }, [socket]);
  
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
