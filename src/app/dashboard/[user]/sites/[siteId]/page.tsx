'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import io, { Socket } from 'socket.io-client';
import DevicePieChart from '@/app/components/Analytics/DeviceTypePie';
import LatestEvents from '@/app/components/Analytics/LiveEvents';
import TopPagesBar from '@/app/components/Analytics/TopPagesBarChats';
import VisitsLineChart from '@/app/components/Analytics/VisitsLineCharts';
import DashboardHeader from '@/app/components/CurrentSiteHeader';
import TrackerEmbed from '@/app/components/ScriptDisplay';
import { fetchWithLoader } from '@/app/lib/FetchWithLoader';

let socket: Socket | null = null;
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
    Geo_track : boolean
  };
  total_users: number;
  total_visits: number;
  active_users: number;
}

interface GeoData {
  latitude: number;
  longitude: number;
  city: string;
  region: string;
  country: string;
}
 interface DeviceData {
  device: 'Desktop' | 'Mobile' | 'Tablet';
  percentage: number;
}
interface visitsLine {
  ok : any;
  date : string;
  visits : number;
}

interface TopPagesData {
  page : string;
  views : number;
}


export default function AnalyticsPage() {
  const {siteId, user} = useParams();
   const [views, setViews] = useState<PageViewData[]>([]);
   const [siteInfo, setSiteInfo] = useState<SiteData | null>(null);
   const [Visits, SetVisits] = useState<visitsLine[]>([]);
     const [TopPages, setTopPages] = useState<TopPagesData[]>([]);
     const [Device, setDevice] = useState<DeviceData[]>([]);
     const [liveGeo, setLiveGeo] = useState<GeoData[]>([]);
  // const performanceData = [
  //   { month: 'Jan', users: 8000 },
  //   { month: 'Feb', users: 10000 },
  //   { month: 'Mar', users: 12500 },
  // ];

  // const deviceData = [
  //   { device: 'Desktop', percentage: 55 },
  //   { device: 'Mobile', percentage: 35 },
  //   { device: 'Tablet', percentage: 10 },
  // ];

  // const metrics = [
  //   { label: 'Users', value: '72.6k', change: '+25%' },
  //   { label: 'Sessions', value: '87.2k', change: '+47%' },
  //   { label: 'Bounce Rate', value: '26.3%', change: '-28%' },
  //   { label: 'Session Duration', value: '2m 18s', change: '+33%' },
  // ];
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
  
      socket.on('live_view', async (data: PageViewData & { geo: GeoData }) => {
        if (data.siteId !== siteId) return;
        console.log(data);
        setLiveGeo((prev) => [data.geo, ...prev].slice(0, 10));
        setViews((prev) => {
          const updated = [data, ...prev];
          return updated.slice(0, 5);
        });
  
        const { latitude, longitude } = data.geo;
        console.log(data.geo)
  
    if (
      typeof latitude === 'number' &&
      typeof longitude === 'number' &&
      !isNaN(latitude) &&
      !isNaN(longitude)
    ) {
      setLiveGeo((prev) => [data.geo, ...prev].slice(0, 10));
    } else {
      console.warn('Invalid geo:', data.geo);
    }
  
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

      console.log(siteInfo);

        useEffect(() => {
          const fetchAnalytics = async() => {
            const visits = await fetchWithLoader<visitsLine[]>(`/api/sites/${siteId}/Analytics/VisitsVsDate`);
            const device = await fetchWithLoader<DeviceData[]>(`/api/sites/${siteId}/Analytics/DeviceType`);
            const TopPages = await fetchWithLoader<TopPagesData[]>(`/api/sites/${siteId}/Analytics/TopPages`);
              SetVisits(visits);
              setDevice(device);
              setTopPages(TopPages);
          };
          fetchAnalytics();
          }, []);

  return (
     <main className="min-h-screen p-6 bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-black dark:via-zinc-900 dark:to-black text-gray-900 dark:text-white">
     {siteInfo && (
           <DashboardHeader   siteName={siteInfo.site.site_name}
              trackingScriptComponent={<TrackerEmbed userId={user as string} siteId={siteId as string}/>}
                         />
                              )}
      <div className="mt-8 grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* MAIN LEFT GRID */}
        <div className="xl:col-span-2 space-y-6">
          {/* Visits Chart */}
          <VisitsLineChart data={Visits} />

          {/* Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <MetricCard label="Total Users" value={siteInfo?.total_users || 0} />
            <MetricCard label="Total Visits" value={siteInfo?.total_visits || 0} />
            <MetricCard label="Active Users" value={siteInfo?.active_users || 0} />
          </div>
          <TopPagesBar data={TopPages}/>
        </div>

        {/* RIGHT GRID */}
        <div className="flex flex-col gap-6">
          <DevicePieChart data={Device} />
          <LatestEvents liveTracking={views.map((v)=> ({
            page: v.path,
          timestamp: v.timestamp,
          }))}/>
        </div>
      </div>
    </main>
  );
}

type MetricCardProps = {
  label: string;
  value: number;
};

const MetricCard = ({ label, value }: MetricCardProps) => (
  <div className="p-5 bg-white dark:bg-zinc-900 rounded-xl shadow border border-zinc-200 dark:border-zinc-800">
    <h4 className="text-sm text-zinc-500 dark:text-zinc-400">{label}</h4>
    <p className="text-3xl font-bold text-zinc-900 dark:text-white">{value}</p>
  </div>
);

type LatestEventsProps = {
  events: PageViewData[];
};














// 'use client';

// import { useEffect, useState } from 'react';
// import { useParams } from 'next/navigation';
// import io, { Socket } from 'socket.io-client';
// import AnalyticsOverview from '@/app/components/AnalyticsOverview';
// import TrackerEmbed from '@/app/components/ScriptDisplay';
// import { fetchWithLoader } from '@/app/lib/FetchWithLoader';
// import AnalyticsWrapper from '@/app/components/AnalyticsWrapper';
// import DashboardHeader from '@/app/components/CurrentSiteHeader';
// import dynamic from 'next/dynamic';


// const MapTracker = dynamic(() => import('@/app/components/GeoMap/GeoMap.client'), {
//   ssr: false,
// });


// interface GeoData {
//   latitude: number;
//   longitude: number;
//   city: string;
//   region: string;
//   country: string;
// }

// const visitsData = [
//   { date: '2025-06-01', visits: 40 },
//   { date: '2025-06-02', visits: 60 },
//   { date: '2025-06-03', visits: 30 },
// ];

// const deviceData = [
//   { device: 'Desktop', percentage: 55 },
//   { device: 'Mobile', percentage: 35 },
//   { device: 'Tablet', percentage: 10 },
// ];

// const topPagesData = [
//   { page: '/home', views: 100 },
//   { page: '/pricing', views: 80 },
//   { page: '/features', views: 60 },
// ];

// export interface DeviceData {
//   device: 'Desktop' | 'Mobile' | 'Tablet';
//   percentage: number;
// }


// interface PageViewData {
//   siteId: string;
//   path: string;
//   timestamp: string;
//   referrer: string;
//   userId: string;
//   ip_address: string;
//   user_agent : string;
//   sessionId: string;
// }

// interface SiteData {
//   ok: any;
//   site: {
//     site_id: string;
//     site_name: string;
//     domain: string;
//     Geo_track : boolean
//   };
//   total_users: number;
//   total_visits: number;
//   active_users: number;
// }

// interface visitsLine {
//   ok : any;
//   date : string;
//   visits : number;
// }

// interface TopPagesData {
//   page : string;
//   views : number;
// }




// let socket: Socket | null = null;

// export default function AnalyticsPage() {
//   const { siteId, user } = useParams();
//   const [views, setViews] = useState<PageViewData[]>([]);
//   const [siteInfo, setSiteInfo] = useState<SiteData | null>(null);
//   const [Visits, SetVisits] = useState<visitsLine[]>([]);
//   const [TopPages, setTopPages] = useState<TopPagesData[]>([]);
//   const [Device, setDevice] = useState<DeviceData[]>([]);
//   const [liveGeo, setLiveGeo] = useState<GeoData[]>([]);
  

//   useEffect(() => {
//     if (!siteId) return;

//     if (!socket) {
//       socket = io('http://localhost:3001', {
//         transports: ['websocket'],
//       });
//     }

//     socket.on('connect', () => {
//       console.log('[client] connected:', socket?.id);
//       socket?.emit('join_site', siteId);
//     });

//     socket.on('live_view', async (data: PageViewData & { geo: GeoData }) => {
//       if (data.siteId !== siteId) return;
//       console.log(data);
//       setLiveGeo((prev) => [data.geo, ...prev].slice(0, 10));
//       setViews((prev) => {
//         const updated = [data, ...prev];
//         return updated.slice(0, 5);
//       });

//       const { latitude, longitude } = data.geo;
//       console.log(data.geo)

//   if (
//     typeof latitude === 'number' &&
//     typeof longitude === 'number' &&
//     !isNaN(latitude) &&
//     !isNaN(longitude)
//   ) {
//     setLiveGeo((prev) => [data.geo, ...prev].slice(0, 10));
//   } else {
//     console.warn('Invalid geo:', data.geo);
//   }

//       await fetch('/api/tracking_info', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(data),
//       });
//     });

//     socket.on('connect_error', (err) => {
//       console.error('[client] connection error:', err);
//     });

//     return () => {
//       socket?.off('live_view');
//       socket?.disconnect();
//       socket = null;
//     };
//   }, [siteId]);

//   useEffect(() => {
//     if (!siteId) return;

//     const fetchSiteInfo = async () => {
//       const res = await fetchWithLoader<SiteData>(`/api/sites/${siteId}`);
//       setSiteInfo(res);
//     };

//     fetchSiteInfo();
//   }, [siteId]);

//   console.log(siteInfo?.site);

//   useEffect(() => {
//     const fetchAnalytics = async() => {
//       const visits = await fetchWithLoader<visitsLine[]>(`/api/sites/${siteId}/Analytics/VisitsVsDate`);
//       const device = await fetchWithLoader<DeviceData[]>(`/api/sites/${siteId}/Analytics/DeviceType`);
//       const TopPages = await fetchWithLoader<TopPagesData[]>(`/api/sites/${siteId}/Analytics/TopPages`);
//         SetVisits(visits);
//         setDevice(device);
//         setTopPages(TopPages);
//     };
//     fetchAnalytics();
//     }, []);

//   return (
//     <div className="p-6 min-h-screen bg-black text-white">
//       <DashboardHeader siteName={siteInfo?.site?.site_name as string} trackingScriptComponent={<TrackerEmbed userId={user as string} siteId={siteId as string}/>}/>
    
//       {/* Analytics Overview */}
//       <AnalyticsOverview
//         totalUsers={siteInfo?.total_users || 0}
//         activeUsers={siteInfo?.active_users || 0}
//         totalVisits={siteInfo?.total_visits || 0}
//         liveTracking={views.map((v) => ({
//           page: v.path,
//           timestamp: v.timestamp,
//         }))}
//       />
//       {/* Chartings*/}
//       <div className='pt-4 pb-4'>
//         <AnalyticsWrapper visitsData={Visits} deviceData={Device} liveLocations={liveGeo} topPagesData={TopPages}/>
//       </div>
     
//     </div>
//   );
// }


