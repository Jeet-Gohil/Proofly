// components/UserSites.tsx
"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
type TrackingType = "Analytics" | "Heatmap" | "Live Session";

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

interface Props {
  sites: Site[];
}

export default function UserSites({sites}: Props) {
  const [formattedDates, setFormattedDates] = useState<Record<string, string>>(
    {}
  );
  const router = useRouter();
  const {data : session} = useSession();
  
  useEffect(() => {
    const dateMap: Record<string, string> = {};
    sites.forEach((site) => {
      const date = new Date(site.created_at);
      dateMap[site.site_id] = date.toLocaleDateString();
    });
    setFormattedDates(dateMap);
  }, [sites]);
  

  return (
  <>
       {
        sites.map((site, Index) => (
            <div key={site.site_id || Index}>
            <div className="bg-black shadow-lg transform hover:scale-[1.03] transition-transform w-90 h-50">
            <div className="p-5 space-y-2">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-bold text-white">{site.site_name}</h2>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      site.domain_verified
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {site.domain_verified ? "Verified" : "Pending"}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{site.site_url}</p>
                <p className="text-sm text-gray-500">
                  Tracking: <strong>{site.tracking_type}</strong>
                </p>
                <p className="text-sm text-gray-400">
                  Added on: {formattedDates[site.site_id] || "Loading..."}
                </p>

                <div className="flex justify-end gap-3 pt-3">
                  <button className="text-sm px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700" onClick={()=> {
                    router.push(`/dashboard/${session?.user?.uuid}/sites/${site.site_id}`);
                  }}>
                    View
                  </button>
                </div>
              </div>
          </div>
          </div>
        ))
       }
      </>
    
  );
}

const Step = ({ title }: { title: string }) => {
  return (
    <li className="flex gap-2 items-start">
      <CheckIcon />
      <p className="text-white">{title}</p>
    </li>
  );
};

const CheckIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-4 w-4 text-blue-500 mt-1 shrink-0"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path
        d="M12 2c-.218 0 -.432 .002 -.642 .005l-.616 .017l-.299 .013l-.579 .034l-.553 .046c-4.785 .464 -6.732 2.411 -7.196 7.196l-.046 .553l-.034 .579c-.005 .098 -.01 .198 -.013 .299l-.017 .616l-.004 .318l-.001 .324c0 .218 .002 .432 .005 .642l.017 .616l.013 .299l.034 .579l.046 .553c.464 4.785 2.411 6.732 7.196 7.196l.553 .046l.579 .034c.098 .005 .198 .01 .299 .013l.616 .017l.642 .005l.642 -.005l.616 -.017l.299 -.013l.579 -.034l.553 -.046c4.785 -.464 6.732 -2.411 7.196 -7.196l.046 -.553l.034 -.579c.005 -.098 .01 -.198 .013 -.299l.017 -.616l.005 -.642l-.005 -.642l-.017 -.616l-.013 -.299l-.034 -.579l-.046 -.553c-.464 -4.785 -2.411 -6.732 -7.196 -7.196l-.553 -.046l-.579 -.034a28.058 28.058 0 0 0 -.299 -.013l-.616 -.017l-.318 -.004l-.324 -.001zm2.293 7.293a1 1 0 0 1 1.497 1.32l-.083 .094l-4 4a1 1 0 0 1 -1.32 .083l-.094 -.083l-2 -2a1 1 0 0 1 1.32 -1.497l.094 .083l1.293 1.292l3.293 -3.292z"
        fill="currentColor"
        strokeWidth="0"
      />
    </svg>
  );
};
