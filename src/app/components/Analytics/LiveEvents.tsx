'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

type LiveView = {
  page: string;
  timestamp: string;
};

type LatestEventsProps = {
  liveTracking: LiveView[];
};

const LatestEvents: React.FC<LatestEventsProps> = ({ liveTracking }) => {
  const [visibleEvents, setVisibleEvents] = useState<LiveView[]>([])

  useEffect(() => {
    if (liveTracking.length === 0) return

    // Add new events to visible list, keep latest 10
    setVisibleEvents(prev => {
      const newEvents = liveTracking.filter(e => !prev.find(pe => pe.timestamp === e.timestamp))
      return [...newEvents, ...prev].slice(0, 5)
    })
  }, [liveTracking])

  return (
    <div className="p-6 bg-white dark:bg-zinc-900 rounded-2xl shadow-md border border-zinc-200 dark:border-zinc-800 w-full max-w-full">
      <h2 className="text-lg font-bold mb-4 text-zinc-800 dark:text-zinc-100">
        ⚡ Latest Events
      </h2>

      <div className="space-y-3">
        <AnimatePresence initial={false}>
          {visibleEvents.map(event => (
            <motion.div
              key={event.timestamp}
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="flex items-center justify-between px-4 py-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-700"
            >
              <div className="flex flex-col">
                <span className="font-medium text-zinc-800 dark:text-zinc-100">
                  {event.page}
                </span>
                <span className="text-xs text-zinc-500 dark:text-zinc-400">
                  {new Date(event.timestamp).toLocaleTimeString()}
                </span>
              </div>
              <span className="text-green-500 text-xs font-semibold">● Live</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default LatestEvents
