// server.ts or index.ts
import { createServer } from 'http';
import { Server } from 'socket.io';

const httpServer = createServer();

const io = new Server(httpServer, {
  cors: {
    origin: '*', // Use '*' temporarily for debugging. Restrict to 'http://localhost:3000' later
    methods: ['GET', 'POST'],
    credentials : true
  },
});

io.on('connection', (socket) => {
  console.log(`✅ Client connected: ${socket.id}`);

  // Debug all incoming events from client
  socket.onAny((event, ...args) => {
    console.log(`📩 [${socket.id}] Event received: '${event}'`, args);
  });

  // Optional: Join room based on siteId for grouped live events
  socket.on('join_site', (siteId) => {
    socket.join(siteId);
    console.log(`🏠 Socket ${socket.id} joined site room ${siteId}`);
  });

  // Actual page view tracking event
  socket.on('page_view', async (data) => {
    console.log('📄 page_view received!');
    console.log(data);
    try {
        console.log('📄 page_view received!');
        const { userId, siteId, path, referrer, timestamp } = data;

      console.log(`📄 Page view logged for site ${siteId}:`, {
        siteId,
        userId,
        path,
        referrer,
        timestamp,
      });

      // Broadcast to other users in the same site room
      io.to(siteId).emit('live_view', {
        siteId,
        path,
        timestamp,
      });

      // Future: Save to DB here if needed
      // await db.insert('page_views', { userId, siteId, path, referrer, timestamp });

    } catch (error) {
      console.error('❌ Error in page_view handler:', error);
    }
  });

  socket.on('disconnect', (reason) => {
    console.log(`❎ Client disconnected: ${socket.id}. Reason: ${reason}`);
  });
});

httpServer.listen(3001, '0.0.0.0', () => {
  console.log('🚀 Socket.IO server running at http://localhost:3001');
});
