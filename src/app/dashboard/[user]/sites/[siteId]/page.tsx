'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import io from 'socket.io-client';
import  { Socket } from 'socket.io-client'; // import as type
import AnalyticsOverview from '@/app/components/AnalyticsOverview';
import TrackerEmbed from '@/app/components/ScriptDisplay';

interface PageViewData {
  siteId: string;
  path: string;
  timestamp: string;
  referrer: string;
  userId: string;
  ip_address : string,
  sessionId : string,
}

interface SiteData {
  site: {
    site_id: string;
    site_name: string;
    domain: string;
  };
  total_users: number;
  total_visits: number;
  active_users: number;
}

// ✅ Declare socket with correct type
let socket: Socket | null = null;

export default function AnalyticsPage() {
  const { siteId, user } = useParams();
  const [views, setViews] = useState<PageViewData[]>([]);
  const [siteInfo, setSiteInfo] = useState<SiteData | null>(null);

  useEffect(() => {
    if (!siteId) return;

    if (!socket) {
      socket = io('http://localhost:3001', {
        transports: ['websocket'],
      });
    }

    socket.on('connect', () => {
      console.log('[client] connected:', socket?.id);
      socket?.emit('join_site', siteId);
    });

    socket.on('live_view', async (data: PageViewData) => {
      if (data.siteId !== siteId) return;

      setViews((prev) => {
        const updated = [data, ...prev];
        return updated.slice(0, 5);
      });

      await fetch('/api/tracking_info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
  });
    });

    socket.on('connect_error', (err) => {
      console.error('[client] connection error:', err);
    });

    return () => {
      socket?.off('live_view');
      socket?.disconnect();
      socket = null;
    };
  }, [siteId]);

  useEffect(() => {
    if (!siteId) return;

    const fetchSiteInfo = async () => {
      const res = await fetch(`/api/sites/${siteId}`);
      const data = await res.json();
      if (res.ok) {
        setSiteInfo(data);
      }
    };

    fetchSiteInfo();
  }, [siteId]);

  return (
    <div className="p-6 min-h-screen bg-black text-white">
      <div className="w-full rounded-xl bg-gradient-to-br from-[#111827] via-[#1f2937] to-[#0f172a] p-4 mb-6 shadow-md border border-[#2a2e36]">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-white tracking-wide">
          <p className="ml-2 inline-block text-indigo-400 font-bold px-3 py-1">
            {siteInfo?.site?.site_name}
          </p>
        </h2>
      </div>
      <TrackerEmbed userId={user as string} siteId={siteId as string} />
      <AnalyticsOverview
        totalUsers={siteInfo?.total_users || 0}
        activeUsers={siteInfo?.active_users || 0}
        totalVisits={siteInfo?.total_visits || 0}
        liveTracking={views.map((v) => ({
          page: v.path,
          timestamp: v.timestamp,
        }))}
      />
    </div>
  );
}
