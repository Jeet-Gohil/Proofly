'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check } from 'lucide-react'

const plans = {
  monthly: {
    title: 'Pro Monthly',
    price: 79,
    subtitle: 'Billed monthly',
    highlight: '',
  },
  annual: {
    title: 'Pro Annual',
    price: 66,
    subtitle: 'Billed annually',
    highlight: 'You save $158/year',
  },
}

const features = [
  '10,000 unique visitors',
  'Unlimited domains',
  'Unlimited notifications',
  'A/B testing',
  'Conversion analytics',
  'Live chat support',
  'Recent Activity notification',
  'Live Visitor Count notification',
  'Hot Streaks notification',
]

export default function PricingPlans() {
  const [selected, setSelected] = useState<'monthly' | 'annual'>('monthly')
  const currentPlan = plans[selected]

  return (
    <section className="w-full py-16 px-4 md:px-8 bg-gray-50 dark:bg-[#0a0a0a] transition-colors">
      <div className="max-w-3xl mx-auto text-center">
        <div className="inline-flex mb-8 rounded-full border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-inner">
          {(['monthly', 'annual'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setSelected(type)}
              className={`px-5 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                selected === type
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-8 md:p-10 border border-gray-200 dark:border-zinc-700 transition-all"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {currentPlan.title}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Show social proof notifications to increase leads and sales.
            </p>

            <div className="text-5xl font-extrabold text-indigo-600 dark:text-indigo-400 mb-1">
              ${currentPlan.price}
              <span className="text-lg font-medium text-gray-600 dark:text-gray-400">/mo</span>
            </div>

            <p className="text-sm text-green-600 dark:text-green-400 mb-6">
              {currentPlan.highlight}
            </p>

            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-3 rounded-lg transition mb-6">
              Start your free 14-day trial
            </button>

            <hr className="my-6 border-gray-300 dark:border-zinc-700" />

            <ul className="grid gap-3 text-left text-sm md:text-base">
              {features.map((feat) => (
                <li key={feat} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                  <Check className="text-green-500 mt-1" size={18} />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>

        <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
          No credit card required. Cancel anytime during trial.
        </p>
      </div>
    </section>
  )
}
