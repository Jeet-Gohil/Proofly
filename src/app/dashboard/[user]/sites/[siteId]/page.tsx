'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import io, { Socket } from 'socket.io-client';
import AnalyticsOverview from '@/app/components/AnalyticsOverview';
import TrackerEmbed from '@/app/components/ScriptDisplay';
import { Eye } from 'lucide-react';
import { fetchWithLoader } from '@/app/lib/FetchWithLoader';

interface PageViewData {
  siteId: string;
  path: string;
  timestamp: string;
  referrer: string;
  userId: string;
  ip_address: string;
  sessionId: string;
}

interface SiteData {
  ok: any;
  site: {
    site_id: string;
    site_name: string;
    domain: string;
  };
  total_users: number;
  total_visits: number;
  active_users: number;
}

let socket: Socket | null = null;

export default function AnalyticsPage() {
  const { siteId, user } = useParams();
  const [views, setViews] = useState<PageViewData[]>([]);
  const [siteInfo, setSiteInfo] = useState<SiteData | null>(null);
  const [showScript, setShowScript] = useState(false);

  useEffect(() => {
    if (!siteId) return;

    if (!socket) {
      socket = io('https://proofly-socket-server-4.onrender.com', {
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
      const res = await fetchWithLoader<SiteData>(`/api/sites/${siteId}`);
      setSiteInfo(res);
    };

    fetchSiteInfo();
  }, [siteId]);

  return (
    <div className="p-6 min-h-screen bg-black text-white">
      {/* Site Header with Script Button */}
      <div className="w-full rounded-xl bg-gradient-to-br from-[#111827] via-[#1f2937] to-[#0f172a] p-4 mb-6 shadow-md border border-[#2a2e36] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-white tracking-wide">
          <span className="ml-2 inline-block text-indigo-400 font-bold px-3 py-1">
            {siteInfo?.site?.site_name}
          </span>
        </h2>

        <button
          onClick={() => setShowScript((prev) => !prev)}
          className={`
            group flex items-center gap-2 px-3 py-2 rounded-md
            bg-purple-700 hover:bg-purple-800 text-white font-small
            transition-all duration-300 ease-in-out shadow-md
            hover:scale-105
          `}
        >
          <Eye size={18} />
          <span
            className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 ease-in-out whitespace-nowrap"
          >
            View Tracking Script
          </span>
        </button>
      </div>

      {/* Script block toggle */}
      {showScript && (
        <div className="mb-6">
          <TrackerEmbed userId={user as string} siteId={siteId as string} />
        </div>
      )}

      {/* Analytics Overview */}
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
