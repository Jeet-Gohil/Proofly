'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BarChart3 } from 'lucide-react'
import ChartDisplaySection from './ChartDisplay'

type AnalyticsWrapperProps = {
  visitsData: { date: string; visits: number }[]
  deviceData: { device: string; percentage: number }[]
  topPagesData: { page: string; views: number }[]
}

const AnalyticsWrapper: React.FC<AnalyticsWrapperProps> = ({
  visitsData,
  deviceData,
  topPagesData
}) => {
  const [showCharts, setShowCharts] = useState(false)

  return (
    <div className="w-full">
      <div className="flex justify-center my-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowCharts(prev => !prev)}
          className="flex items-center gap-3 px-6 py-3 bg-gray-900 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition"
        >
          <BarChart3 className="w-5 h-5" />
          {showCharts ? 'Hide Analytics' : 'View Analytics'}
        </motion.button>
      </div>

      <AnimatePresence mode="wait">
        {showCharts && (
          <motion.div
            key="charts"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5 }}
            className="mt-6"
          >
            <ChartDisplaySection
              visitsData={visitsData}
              deviceData={deviceData}
              topPagesData={topPagesData}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default AnalyticsWrapper
