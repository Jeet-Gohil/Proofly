// 'use client'

// import { useState } from 'react';
// import { Socket } from 'socket.io-client';

// let socket: Socket;

// const HomePage = () => {
//   const [message, setMessage] = useState('');
//   const [chat, setChat] = useState<string[]>([]);

// //   useEffect(() => {
// //     const socket = io('http://localhost:3001');
// //     socket.emit('join_dashboard', { siteId: 'site-uuid' });
  
// //     socket.on('live_view', (data) => {
// //       console.log('live view:', data);
// //     });
  
// //     return () => {
// //       socket.disconnect();
// //     };
// //   }, []);
  

// //   useEffect(() => {
// //     socket = io('http://localhost:3001');

// //     socket.on('connect', () => {
// //       console.log('Connected to server');
// //     });

// //     socket.on('message', (msg: string) => {
// //       setChat((prev) => [...prev, `Received: ${msg}`]);
// //     });

// //     return () => {
// //       socket.disconnect();
// //     };
// //   }, []);

// //   const handleSend = () => {
// //     socket.emit('message', message);
// //     setChat((prev) => [...prev, `You: ${message}`]);
// //     setMessage('');
// //   };

//   return (
//     <div className="p-6">
        
//       {/* <h1 className="text-xl mb-4">Real-time Chat Test</h1>
//       <input
//         className="border px-2 py-1"
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         placeholder="Type a message"
//       />
//       <button className="ml-2 bg-blue-500 text-white px-4 py-1 rounded" onClick={handleSend}>
//         Send
//       </button>

//       <div className="mt-4">
//         {chat.map((msg, idx) => (
//           <div key={idx} className="text-sm">{msg}</div>
//         ))}
//       </div> */}
//     </div>
//   );
// };

// export default HomePage;
