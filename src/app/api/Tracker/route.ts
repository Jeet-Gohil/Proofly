import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const jsCode = `
(function () {
  const script = document.currentScript;
  const userId = script.getAttribute('data-user-id');
  const siteId = script.getAttribute('data-site-id');

  if (!siteId) {
    console.warn('[tracker] Missing siteId');
    return;
  }

  let sessionId = sessionStorage.getItem('proofly_session_id');
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    sessionStorage.setItem('proofly_session_id', sessionId);
  }

  // Load socket.io
  const socketScript = document.createElement('script');
  socketScript.src = "https://cdn.socket.io/4.7.2/socket.io.min.js";
  socketScript.onload = function () {
    const socket = io('https://proofly-socket-server-1.onrender.com', {
      transports: ['websocket'],
    });

    socket.on('connect', () => {
      console.log('[tracker] Connected to socket', socket.id);
      socket.emit('join_site', siteId);
      emitPageView();

      setupNavigationTracking();
      document.addEventListener('click', emitClick);
      window.addEventListener('scroll', emitScroll);

      // ✅ After connect, also fetch widgets & render
      fetchWidgetsAndRender();
    });

    socket.on('connect_error', (err) => {
      console.error('[tracker] socket connection error:', err);
    });

    function emitPageView() {
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
    }

    function emitClick(e) {
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
    }

    let maxScrollDepth = 0;
    function emitScroll() {
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
    }

    function setupNavigationTracking() {
      const originalPushState = history.pushState;
      const originalReplaceState = history.replaceState;

      const handleNavigation = () => {
        setTimeout(() => {
          emitPageView();
          maxScrollDepth = 0; // reset
          fetchWidgetsAndRender(); // re-render widgets on route change
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
    }

   function fetchWidgetsAndRender() {
  fetch(\`http://localhost:3000/api/sites/\${siteId}/Widgets\`)
    .then(res => res.json())
    .then(widgets => {
      widgets.forEach(widget => {
        switch (widget.type) {
          case 'social-proof':
            renderSocialProof(widget.config);
            break;
          case 'countdown':
            renderCountdown(widget.config);
            break;
          default:
            console.warn('[tracker] Unknown widget type:', widget.type);
        }
      });
    })
    .catch(err => console.error('[tracker] Failed to fetch widgets', err));
}


    function renderSocialProof(config) {
      const el = document.createElement('div');
      el.innerText = config.textTemplate.replace('{count}', '123'); // TODO: dynamic
      styleWidget(el, config.position);
      el.style.background = '#000';
      el.style.color = '#fff';
      el.style.padding = '12px 20px';
      el.style.borderRadius = '8px';
      el.style.zIndex = '9999';
      el.style.fontFamily = 'sans-serif';
      el.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
      document.body.appendChild(el);
    }

    function renderCountdown(config) {
      const el = document.createElement('div');
      styleWidget(el, config.position);
      el.style.background = '#000';
      el.style.color = '#fff';
      el.style.padding = '12px 20px';
      el.style.borderRadius = '8px';
      el.style.zIndex = '9999';
      el.style.fontFamily = 'sans-serif';
      el.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
      document.body.appendChild(el);

      function update() {
        const end = new Date(config.endTime).getTime();
        const now = Date.now();
        const remaining = Math.max(0, end - now);
        const seconds = Math.floor(remaining / 1000) % 60;
        const minutes = Math.floor(remaining / (1000 * 60)) % 60;
        const hours = Math.floor(remaining / (1000 * 60 * 60)) % 24;
        const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
        el.innerText = \`Offer ends in \${days}d \${hours}h \${minutes}m \${seconds}s\`;
        if (remaining > 0) {
          requestAnimationFrame(update);
        } else {
          el.innerText = 'Offer expired.';
        }
      }
      update();
    }

    function styleWidget(el, position) {
      el.style.position = 'fixed';
      if (position.includes('top')) el.style.top = '20px';
      if (position.includes('bottom')) el.style.bottom = '20px';
      if (position.includes('left')) el.style.left = '20px';
      if (position.includes('right')) el.style.right = '20px';
      if (position.includes('center')) {
        el.style.left = '50%';
        el.style.transform = 'translateX(-50%)';
      }
    }
  };

  document.head.appendChild(socketScript);
})();
`;

  return new Response(jsCode, {
    status: 200,
    headers: {
      "Content-Type": "application/javascript",
    },
  });
}
