import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export const initSocket = (): Socket => {
  if (!socket) {
    socket = io('http://localhost:3001'); // Connect to Socket.IO backend
    socket.on('connect', () => {
      console.log(`✅ Connected to socket server: ${socket?.id}`);
    });
  }
  return socket;
};
