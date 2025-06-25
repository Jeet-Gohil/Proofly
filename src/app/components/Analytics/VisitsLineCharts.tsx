'use client'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from 'recharts'
import { motion } from 'framer-motion'

type VisitsLineChartProps = {
  data: { date: string; visits: number }[]
}

const VisitsLineChart: React.FC<VisitsLineChartProps> = ({ data }) => {
  return (
    <motion.div
      className="relative p-6 bg-white dark:bg-zinc-900 rounded-2xl shadow-md border border-zinc-200 dark:border-zinc-800"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="date" stroke="#9ca3af" />
          <YAxis stroke="#9ca3af" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="visits"
            stroke="#6366f1"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="absolute bottom-4 left-4 text-sm font-semibold text-zinc-500 dark:text-zinc-400">
        📈 Website Visits Over Time
      </div>
    </motion.div>
  )
}

export default VisitsLineChart
