'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area
} from 'recharts';
import { motion } from 'framer-motion';

type VisitsLineChartProps = {
  data: { date: string; visits: number }[];
};

const VisitsLineChart: React.FC<VisitsLineChartProps> = ({ data }) => {
  return (
    <motion.div
      className="relative p-6 bg-white dark:bg-zinc-900 rounded-2xl shadow-md border border-zinc-200 dark:border-zinc-800 overflow-x-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Make chart wide to enable scroll on small screens */}
      <div className="min-w-[800px]">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <defs>
              <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
              <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
              <filter id="glow">
                <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#6366f1" floodOpacity="0.6" />
              </filter>
            </defs>

            <XAxis dataKey="date" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip />

            <Area
              type="monotone"
              dataKey="visits"
              stroke="none"
              fill="url(#areaGradient)"
            />

            <Line
              type="monotone"
              dataKey="visits"
              stroke="url(#lineGradient)"
              strokeWidth={3}
              filter="url(#glow)"
              dot={{ r: 5, fill: '#8b5cf6', stroke: '#fff', strokeWidth: 2 }}
              activeDot={{ r: 8, fill: '#6366f1', stroke: '#fff', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="absolute bottom-4 left-4 text-sm font-semibold text-zinc-500 dark:text-zinc-400">
        📈 Website Visits Over Time
      </div>
    </motion.div>
  );
};

export default VisitsLineChart;
