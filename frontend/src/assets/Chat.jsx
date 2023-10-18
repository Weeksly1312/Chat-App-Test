// import React, { useState, useEffect } from 'react';
// import io from 'socket.io-client';

// const socket = io('http://localhost:3001'); // Update the URL accordingly

// function Chat() {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');

//   useEffect(() => {
//     // Listen for incoming messages
//     socket.on('chat message', (msg) => {
//       setMessages((prevMessages) => [...prevMessages, msg]); // Use a functional update
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, []); // Empty dependency array to run this effect only once

//   const sendMessage = () => {
//     socket.emit('chat message', input);
//     setInput('');
//   };

//   return (
//     <div>
//       <div style={{ height: '400px', overflowY: 'scroll', border: '1px solid #ccc' }}>
//         {messages.map((msg, index) => (
//           <div key={index}>{msg}</div>
//         ))}
//       </div>
//       <div>
//         <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
//         <button onClick={sendMessage}>Send</button>
//       </div>
//     </div>
//   );
// }

// export default Chat;
// Chat.js

import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [room, setRoom] = useState('default'); // Default room

  useEffect(() => {
    // Listen for incoming messages
    socket.on('chat message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.disconnect();
    };
  }, []); // Empty dependency array to run this effect only once

  const sendMessage = () => {
    socket.emit('chat message', { room, msg: input });
    setInput('');
  };

  const joinRoom = (newRoom) => {
    socket.emit('join room', newRoom);
    setRoom(newRoom);
  };

  return (
    <div>
      <div>
        <label>Room:</label>
        <input type="text" value={room} onChange={(e) => setRoom(e.target.value)} />
        <button onClick={() => joinRoom(room)}>Join Room</button>
      </div>
      <div style={{ height: '400px', overflowY: 'scroll', border: '1px solid #ccc' }}>
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <div>
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Chat;
