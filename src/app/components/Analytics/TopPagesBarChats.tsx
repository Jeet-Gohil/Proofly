'use client'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts'
import { motion } from 'framer-motion'

type TopPagesBarProps = {
  data: { page: string; views: number }[]
}

const TopPagesBar: React.FC<TopPagesBarProps> = ({ data }) => {
  return (
    <motion.div
      className="relative p-6 bg-white dark:bg-zinc-900 rounded-2xl shadow-md border border-zinc-200 dark:border-zinc-800"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="page" stroke="#9ca3af" />
          <YAxis stroke="#9ca3af" />
          <Tooltip />
          <Bar dataKey="views" fill="#f59e0b" radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>

      <div className="absolute bottom-4 left-4 text-sm font-semibold text-zinc-500 dark:text-zinc-400">
        📊 Top Performing Pages
      </div>
    </motion.div>
  )
}

export default TopPagesBar
