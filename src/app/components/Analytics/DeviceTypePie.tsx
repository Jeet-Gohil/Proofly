'use client'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

type DevicePieChartProps = {
  data: { device: string; percentage: number }[];
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const DevicePieChart: React.FC<DevicePieChartProps> = ({ data }) => (
  <div className="p-4 rounded-xl shadow-md bg-white dark:bg-zinc-900">
    <h2 className="text-lg font-semibold mb-2">Device Usage</h2>
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie data={data} dataKey="percentage" nameKey="device" cx="50%" cy="50%" outerRadius={100} label>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  </div>
);

export default DevicePieChart;
