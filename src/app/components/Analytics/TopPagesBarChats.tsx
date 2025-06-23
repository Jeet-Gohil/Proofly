'use client'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

type TopPagesBarProps = {
  data: { page: string; views: number }[];
};

const TopPagesBar: React.FC<TopPagesBarProps> = ({ data }) => (
  <div className="p-4 rounded-xl shadow-md bg-white dark:bg-zinc-900">
    <h2 className="text-lg font-semibold mb-2">Top Pages</h2>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="page" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="views" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export default TopPagesBar;
