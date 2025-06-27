'use client'

import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'
import { Sun, Moon, Rocket } from 'lucide-react'
import { TextGenerateEffectDemo } from './ui/GenerateText'
import { useRouter } from 'next/navigation'
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

export default function Hero() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const router = useRouter();

  useEffect(() => setMounted(true), [])

  if (!mounted) return null // Prevent hydration mismatch

  return (
    <section className="min-h-screen flex items-center mb-16 justify-center px-4 py-10 bg-gray-400 dark:bg-black transition-colors duration-300">

      <motion.div
        className="w-full max-w-md text-center space-y-6"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
      >

        

        <motion.p className="text-sm text-gray-600 dark:text-gray-400">
          👋 Welcome to Proofly.
        </motion.p>

        <h1 className="text-3xl font-bold leading-snug text-black dark:text-white">
          <TextGenerateEffectDemo />
        </h1>

        <motion.p className="text-sm px-4 text-gray-500 dark:text-gray-300">
          Customer-obsessed marketing is the future. Proofly makes your website feel
          delightfully human.
        </motion.p>

        <motion.form
          onSubmit={(e) => {
            e.preventDefault()
          
          }}
          className="flex flex-col gap-3 w-full"
        >
          <input
            type="email"
            placeholder="Enter work email..."
            className="px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-zinc-900 text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600"
            required
          />
          <button
          onClick={()=>{router.push(`/SignUp`)}}
            type="submit"
            className="bg-primary hover:bg-primary/90 text-gray-500 font-medium py-3 rounded-lg transition-all flex items-center justify-center gap-2"
          >
            <Rocket size={16} />
            Get Started
          </button>
        </motion.form>

        <motion.div className="text-xs text-gray-600 dark:text-gray-400 mt-2">
          <span className="inline-flex items-center gap-1 bg-green-100 dark:bg-green-800/30 text-green-700 dark:text-green-300 px-2 py-1 rounded-full text-[11px] font-medium">
            ✅ 1,000+
          </span>{' '}
          people started a free trial in the last 30 days
        </motion.div>
      </motion.div>
    </section>
  )
}
