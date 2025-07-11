'use client'
import React, { useEffect, useState } from 'react'
import DashboardHeader from '@/app/components/CurrentSiteHeader'
import { useParams } from 'next/navigation';
import { fetchWithLoader } from '@/app/lib/FetchWithLoader';
import TrackerEmbed from '@/app/components/ScriptDisplay';

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

const Layout = ({children,}: Readonly<{children: React.ReactNode}>) => {
    const {user, siteId} = useParams();
    const [siteInfo, setSiteInfo] = useState<SiteData | null>(null);
     useEffect(() => {
            if (!siteId) return;
        
            const fetchSiteInfo = async () => {
              const res = await fetchWithLoader<SiteData>(`/api/sites/${siteId}`);
              setSiteInfo(res);
            };
        
            fetchSiteInfo();
          }, [siteId]);
  return (
    <div>
        {siteInfo && (
           <DashboardHeader   siteName={siteInfo.site.site_name}
              trackingScriptComponent={<TrackerEmbed userId={user as string} siteId={siteId as string}/>}
                         />
                              )}
      {children}
    </div>
  )
}

export default Layout
