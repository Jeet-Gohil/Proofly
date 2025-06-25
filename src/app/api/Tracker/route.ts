import { NextRequest } from "next/server";

export async function GET() {
  const jsCode = `
(function () {
  const script = document.currentScript;
  const userId = script.getAttribute('data-user-id');
  const siteId = script.getAttribute('data-site-id');

  let sessionId = sessionStorage.getItem('proofly_session_id');
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    sessionStorage.setItem('proofly_session_id', sessionId);
  }

  const socketScript = document.createElement('script');
  socketScript.src = "https://cdn.socket.io/4.7.2/socket.io.min.js";
  socketScript.onload = function () {
    const socket = io('http://localhost:3001', {
      transports: ['websocket'],
    });

    const emitPageView = () => {
      if (!userId || !siteId) {
        console.warn('[tracker] Missing userId or siteId');
        return;
      }

      socket.emit('page_view', {
        userId,
        siteId,
        sessionId,
        path: window.location.pathname,
        referrer: document.referrer,
        timestamp: new Date().toISOString(),
      });

      console.log('[tracker] Emitted page_view:', {
        userId,
        siteId,
        sessionId,
        path: window.location.pathname
      });
    };

    const emitClick = (e) => {
      socket.emit('heatmap_event', {
        userId,
        siteId,
        sessionId,
        path: window.location.pathname,
        event_type: 'click',
        x: e.clientX,
        y: e.clientY,
        timestamp: new Date().toISOString(),
      });
    };

    let maxScrollDepth = 0;
    const emitScroll = () => {
      const scrollTop = window.scrollY + window.innerHeight;
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollPercent = Math.round((scrollTop / scrollHeight) * 100);

      if (scrollPercent > maxScrollDepth) {
        maxScrollDepth = scrollPercent;

        socket.emit('heatmap_event', {
          userId,
          siteId,
          sessionId,
          path: window.location.pathname,
          event_type: 'scroll',
          scroll_depth: maxScrollDepth,
          timestamp: new Date().toISOString(),
        });
      }
    };

    socket.on('connect', () => {
      console.log('[tracker] Connected to socket', socket.id);
      socket.emit('join_site', siteId);
      emitPageView();

      // Navigation tracking for SPAs
      const originalPushState = history.pushState;
      const originalReplaceState = history.replaceState;

      const handleNavigation = () => {
        setTimeout(() => {
          emitPageView();
          maxScrollDepth = 0; // reset scroll depth per new page
        }, 100);
      };

      history.pushState = function () {
        originalPushState.apply(this, arguments);
        handleNavigation();
      };

      history.replaceState = function () {
        originalReplaceState.apply(this, arguments);
        handleNavigation();
      };

      window.addEventListener('popstate', handleNavigation);

      // Add click and scroll listeners
      document.addEventListener('click', emitClick);
      window.addEventListener('scroll', emitScroll);
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
