'use client'

import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'
import { Sun, Moon, Rocket } from 'lucide-react'
import { TextGenerateEffectDemo } from './ui/GenerateText'
import { BackgroundLines } from '@/components/ui/Background-Lines'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

export default function Hero() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return null // Prevent hydration mismatch

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-10 bg-background transition-colors duration-300">
      <motion.div
        className="w-full max-w-md text-center space-y-6"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
      >
        

        <motion.p className="text-sm text-muted-foreground">
          👋 Welcome to Proofly.
        </motion.p>

         <h1 className="text-3xl font-bold leading-snug">
        <TextGenerateEffectDemo/>
      </h1>

        <motion.p className="text-sm text-muted-foreground px-4">
          Customer-obsessed marketing is the future. Proofly makes your website feel
          delightfully human.
        </motion.p>

        <motion.form
          onSubmit={(e) => {
            e.preventDefault()
            alert('Get Started clicked')
          }}
          className="flex flex-col gap-3 w-full"
        >
          <input
            type="email"
            placeholder="Enter work email..."
            className="px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
          <button
            type="submit"
            className="bg-primary hover:bg-primary/90 text-gray-500 font-medium py-3 rounded-lg transition-all flex items-center justify-center gap-2"
          >
            <Rocket size={16} />
            Get Started
          </button>
        </motion.form>

        <motion.div className="text-xs text-muted-foreground mt-2">
          <span className="inline-flex items-center gap-1 bg-green-100 dark:bg-green-800/30 text-green-700 dark:text-green-300 px-2 py-1 rounded-full text-[11px] font-medium">
            ✅ 1,000+
          </span>{' '}
          people started a free trial in the last 30 days
        </motion.div>
      </motion.div>
    </section>
  )
}
