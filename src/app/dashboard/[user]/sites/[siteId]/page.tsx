'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import io, { Socket } from 'socket.io-client';
import AnalyticsOverview from '@/app/components/AnalyticsOverview';
import TrackerEmbed from '@/app/components/ScriptDisplay';
import { Eye } from 'lucide-react';
import { fetchWithLoader } from '@/app/lib/FetchWithLoader';
import AnalyticsWrapper from '@/app/components/AnalyticsWrapper';
import DashboardHeader from '@/app/components/CurrentSiteHeader';

const visitsData = [
  { date: '2025-06-01', visits: 40 },
  { date: '2025-06-02', visits: 60 },
  { date: '2025-06-03', visits: 30 },
];

const deviceData = [
  { device: 'Desktop', percentage: 55 },
  { device: 'Mobile', percentage: 35 },
  { device: 'Tablet', percentage: 10 },
];

const topPagesData = [
  { page: '/home', views: 100 },
  { page: '/pricing', views: 80 },
  { page: '/features', views: 60 },
];

export interface DeviceData {
  device: 'Desktop' | 'Mobile' | 'Tablet';
  percentage: number;
}


interface PageViewData {
  siteId: string;
  path: string;
  timestamp: string;
  referrer: string;
  userId: string;
  ip_address: string;
  user_agent : string;
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

interface visitsLine {
  ok : any;
  date : string;
  visits : number;
}

interface TopPagesData {
  ok : any;
  page : string;
  views : Number;
}

let socket: Socket | null = null;

export default function AnalyticsPage() {
  const { siteId, user } = useParams();
  const [views, setViews] = useState<PageViewData[]>([]);
  const [siteInfo, setSiteInfo] = useState<SiteData | null>(null);
  const [showScript, setShowScript] = useState(false);
  const [Visits, SetVisits] = useState<visitsLine[]>([]);
  const [TopPages, setTopPages] = useState<TopPagesData[]>([]);
  const [Device, setDevice] = useState<DeviceData[]>([]);
  

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
      console.log(data);
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

  useEffect(() => {
    const fetchAnalytics = async() => {
      const visits = await fetchWithLoader<visitsLine[]>(`/api/sites/${siteId}/Analytics/VisitsVsDate`);
      const device = await fetchWithLoader<DeviceData[]>(`/api/sites/${siteId}/Analytics/DeviceType`);
        SetVisits(visits);
        setDevice(device);
    };
    fetchAnalytics();
    }, []);

   

    console.log(TopPages);


  return (
    <div className="p-6 min-h-screen bg-black text-white">
      <DashboardHeader siteName={siteInfo?.site?.site_name as string} trackingScriptComponent={<TrackerEmbed userId={user as string} siteId={siteId as string}/>}/>
    
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
      {/* Chartings*/}
      <div className='pt-4 pb-4'>
        <AnalyticsWrapper visitsData={Visits} deviceData={Device} topPagesData={topPagesData}/>
      </div>
    </div>
  );
}
