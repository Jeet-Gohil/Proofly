'use client'

import { motion } from 'framer-motion'
import { Radar, Eye, Activity, Zap } from 'lucide-react'
import { JSX } from 'react'

type Feature = {
  title: string
  description: string
  icon: JSX.Element
}

const features: Feature[] = [
  {
    title: 'Real-time Visitor Tracking',
    description: 'See who is visiting your site as it happens with detailed geo and device insights.',
    icon: <Radar className="w-6 h-6" />,
  },
  {
    title: 'Live Notification Banners',
    description: 'Boost conversions with live social proof banners showing real-time user activity.',
    icon: <Zap className="w-6 h-6" />,
  },
  {
    title: 'Actionable Analytics',
    description: 'Visualize and understand user behavior with beautiful and intuitive dashboards.',
    icon: <Activity className="w-6 h-6" />,
  },
  {
    title: 'Easy Integration',
    description: 'Drop-in tracking script with zero configuration. Start seeing insights instantly.',
    icon: <Eye className="w-6 h-6" />,
  },
]

import type { Variants } from 'framer-motion'

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      type: 'spring',
      stiffness: 100,
    },
  },
}

export default function WhyProofly() {
  return (
    <section className="w-full px-6 py-16 md:py-24 bg-gradient-to-tr from-white via-gray-100 to-white dark:from-black dark:via-zinc-900 dark:to-black text-black dark:text-white transition-colors duration-500">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: 'spring' }}
          className="text-4xl md:text-5xl font-bold mb-6 text-indigo-500"
        >
          Why Proofly?
        </motion.h2>
        <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto">
          Proofly helps you boost trust and increase conversions by showing real-time activity and powerful analytics.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
              className="p-6 rounded-2xl shadow-lg bg-white hover:bg-gray-100 dark:bg-zinc-800 dark:hover:bg-zinc-700 transition-all duration-300 border border-transparent hover:border-indigo-400"
            >
              <div className="flex items-center justify-center mb-4 text-indigo-500">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
