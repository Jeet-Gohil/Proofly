'use client'
import { Globe } from "lucide-react";

type LiveView = {
  page: string;
  timestamp: string;
};

type Props = {
  totalUsers: number;
  activeUsers: number;
  totalVisits: number;
  liveTracking: LiveView[];
};

export default function AnalyticsOverview({


  totalUsers,
  activeUsers,
  totalVisits,
  liveTracking,
}: Props) {
  return (
    <div className="space-y-6 mt-4">
      {/* Stats section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-neutral-900 p-6 rounded-2xl shadow">
          <h3 className="text-white text-lg">Total Users</h3>
          <p className="text-3xl font-bold text-purple-400">{totalUsers}</p>
        </div>
        <div className="bg-neutral-900 p-6 rounded-2xl shadow">
          <h3 className="text-white text-lg">Active Users</h3>
          <p className="text-3xl font-bold text-purple-400">{activeUsers}</p>
        </div>
        <div className="bg-neutral-900 p-6 rounded-2xl shadow">
          <h3 className="text-white text-lg">Total Visits</h3>
          <p className="text-3xl font-bold text-purple-400">{totalVisits}</p>
        </div>
      </div>

      {/* Real-time user activity */}
      <div className="bg-neutral-900 p-6 rounded-2xl shadow">
        <Globe size={16} color="violet"/>
        <h2 className="text-white text-xl font-bold mb-4">Real-time User Activity</h2>
        <div className="space-y-3">
          {liveTracking.length === 0 ? (
            <p className="text-neutral-400">No recent activity yet.</p>
          ) : (
            liveTracking.map((view, idx) => (
              <div
                key={idx}
                className="bg-neutral-800 p-4 rounded-xl flex justify-between items-center text-white text-sm"
              >
                <span className="truncate">
                  Page: <span className="text-blue-300 break-all">{view.page}</span>
                </span>
                <span className="text-xs text-neutral-400 whitespace-nowrap">
                  {view.timestamp}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
