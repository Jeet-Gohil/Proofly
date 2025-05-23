import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const jsCode = `
    (function () {
      const script = document.currentScript;
      const userId = script.getAttribute('data-user-id');
      const siteId = script.getAttribute('data-site-id');
    
      const socketScript = document.createElement('script');
      socketScript.src = "https://cdn.socket.io/4.7.2/socket.io.min.js";
      socketScript.onload = function () {
        const socket = io('http://localhost:3001', {
          transports: ['websocket'],
        });
    
        socket.on('connect', () => {
          console.log('[tracker] socket connected', socket.id, { userId, siteId });
    
          if (!userId || !siteId) {
            console.warn('[tracker] Missing userId or siteId, skipping emit');
            return;
          }
    
          socket.emit('join_site', siteId);
    
          socket.emit('page_view', {
            userId,
            siteId,
            path: window.location.pathname,
            referrer: document.referrer,
            timestamp: new Date().toISOString(),
          });
    
          console.log('[tracker] page_view emitted!');
        });
    
        socket.on('connect_error', (err) => {
          console.error('[tracker] socket connection error:', err);
        });
      };
    
      document.head.appendChild(socketScript);
    })();
    `;
    

  return new Response(jsCode, {
    status: 200,
    headers: {
      'Content-Type': 'application/javascript',
    },
  });
}
