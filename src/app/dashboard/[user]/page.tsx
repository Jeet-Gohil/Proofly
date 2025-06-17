// pages/dashboard/[uuid]/sites/page.tsx
"use client";

import UserSites from "@/app/components/SiteList";
import { useEffect, useState } from "react";

// ✅ Define Site interface here or import it if already defined elsewhere
interface Site {
  created_at: string;
  description: string;
  domain_verified: boolean;
  email: string;
  geo_tracking_enabled: boolean;
  logo_url: string;
  site_id: string;
  site_name: string;
  site_url: string;
  status: string;
  tags: string;
  tracking_script_injected: boolean;
  tracking_type: string;
}

export default function SitesPage() {
  // ✅ Correctly type the state
  const [sitesData, setSites] = useState<Site[]>([]);

  useEffect(() => {
    const fetchSites = async () => {
      const res = await fetch("/api/sites");
      const data: Site[] = await res.json();
      setSites(data);
    };

    fetchSites();
  }, []);

  return (
    <div>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          <UserSites sites={sitesData} />
        </div>
      </div>
    </div>
  );
}
