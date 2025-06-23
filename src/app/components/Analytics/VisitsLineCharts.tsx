'use client'
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

type VisitsLineChartProps = {
  data: { date: string; visits: number }[];
};

const VisitsLineChart: React.FC<VisitsLineChartProps> = ({ data }) => (
  <div className="p-4 rounded-xl shadow-md bg-white dark:bg-zinc-900">
    <h2 className="text-lg font-semibold mb-2">Visits Over Time</h2>
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="visits" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export default VisitsLineChart;
