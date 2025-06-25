'use client'
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip
} from 'recharts'
import { motion } from 'framer-motion'

type DevicePieChartProps = {
  data: { device: string; percentage: number }[]
}

const COLORS = ['#10b981', '#3b82f6', '#f97316']

const DevicePieChart: React.FC<DevicePieChartProps> = ({ data }) => {
  return (
    <motion.div
      className="relative p-6 bg-white dark:bg-zinc-900 rounded-2xl shadow-md border border-zinc-200 dark:border-zinc-800"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="percentage"
            nameKey="device"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>

      <div className="absolute bottom-4 left-4 text-sm font-semibold text-zinc-500 dark:text-zinc-400">
        📱 Device Distribution
      </div>
    </motion.div>
  )
}

export default DevicePieChart
