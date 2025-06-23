'use client';

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

type Props = {
  data: { label: string; value: number }[];
};



const COLORS = ['#10b981', '#f43f5e']; // Green, Red

export function UsersPieChart({ data }: Props) {
  return (
    <div className="bg-neutral-900 p-4 rounded-xl shadow-md w-full">
      <h3 className="text-white text-lg mb-4">New vs Returning Users</h3>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="label"
            cx="50%"
            cy="50%"
            outerRadius={90}
            labelLine={false}
            label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip contentStyle={{ backgroundColor: '#1f1f1f', borderColor: '#888' }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
