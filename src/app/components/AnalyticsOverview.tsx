'use client';
import { Globe, User, Eye, Zap } from 'lucide-react';
import { JSX, useEffect, useState } from 'react';

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
  const [animateUsers, setAnimateUsers] = useState(0);
  const [animateVisits, setAnimateVisits] = useState(0);
  const [animateActive, setAnimateActive] = useState(0);

  // Animate counters
  useEffect(() => {
    const animateValue = (setter: any, end: number, delay: number) => {
      let start = 0;
      const step = Math.ceil(end / 30);
      const interval = setInterval(() => {
        start += step;
        if (start >= end) {
          setter(end);
          clearInterval(interval);
        } else {
          setter(start);
        }
      }, delay);
    };

    animateValue(setAnimateUsers, totalUsers, 20);
    animateValue(setAnimateActive, activeUsers, 20);
    animateValue(setAnimateVisits, totalVisits, 20);
  }, [totalUsers, activeUsers, totalVisits]);

  return (
    <div className="space-y-8 mt-6">
      {/* Top metrics - radial layout */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-6 text-white">
        <MetricBubble icon={<User />} label="Users" value={animateUsers} color="bg-indigo-500" />
        <MetricBubble icon={<Zap />} label="Active" value={animateActive} color="bg-green-500" />
        <MetricBubble icon={<Eye />} label="Visits" value={animateVisits} color="bg-pink-500" />
      </div>

      {/* Real-time Activity Timeline */}
      <div className="relative p-6 bg-black/20 backdrop-blur-xl rounded-xl border border-white/10 shadow-xl">
        <div className="flex items-center gap-2 text-purple-300 mb-4">
          <Globe size={18} />
          <h2 className="text-xl font-semibold tracking-wide">Real-time User Activity</h2>
        </div>

        {liveTracking.length === 0 ? (
          <p className="text-neutral-400 text-sm">No recent activity yet.</p>
        ) : (
          <ol className="relative border-l border-purple-700 ml-2 pl-4 space-y-4">
            {liveTracking.map((view, index) => (
              <li key={index} className="ml-2">
                <div className="absolute w-3 h-3 bg-purple-500 rounded-full -left-[7px] top-1.5"></div>
                <div className="text-white text-sm">
                  <span className="font-medium text-blue-300">Page:</span>{' '}
                  <span className="break-words">{view.page}</span>
                </div>
                <time className="block text-xs text-gray-400 mt-1">{view.timestamp}</time>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}

type MetricProps = {
  icon: JSX.Element;
  label: string;
  value: number;
  color: string;
};

function MetricBubble({ icon, label, value, color }: MetricProps) {
  return (
    <div
      className={`
        relative flex flex-col justify-center items-center 
        w-40 h-40 rounded-full bg-white/10 backdrop-blur-xl 
        border border-white/10 shadow-xl text-white
        transition-all duration-300 ease-out 
        hover:scale-105 hover:shadow-[0_0_15px_4px_rgba(255,255,255,0.1)]
      `}
    >
      <div className={`p-3 rounded-full ${color} text-white shadow-md mb-2`}>
        {icon}
      </div>
      <div className="text-3xl font-bold">{value}</div>
      <div className="text-sm text-neutral-300 mt-1">{label}</div>
    </div>
  );
}

