// frontend/src/App.js

import io from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io.connect("https://chat-app-test-chi.vercel.app/");

function App() {
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

  const sendMessage = () => {
    socket.emit("send_message", { message, room });
  };

  useEffect(() => {
    const handleReceiveMessage = (data) => {
      setMessageReceived(data.message);
    };

    socket.on("receive_message", handleReceiveMessage);

    return () => {
      // Clean up the event listener to avoid memory leaks
      socket.off("receive_message", handleReceiveMessage);
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
