"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const httpServer = (0, http_1.createServer)();
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    },
});
io.on('connection', (socket) => {
    console.log(`🔌 New client connected: ${socket.id}`);
    socket.on('message', (msg) => {
        console.log(`📩 Received message: ${msg}`);
        socket.broadcast.emit('message', msg);
    });
    socket.on('disconnect', () => {
        console.log(`❌ Client disconnected: ${socket.id}`);
    });
});
httpServer.listen(3001, () => {
    console.log('✅ Socket.IO server is running on http://localhost:3001');
});
