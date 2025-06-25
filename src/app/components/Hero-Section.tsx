'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const stats = [
  { value: '1,200+', label: 'Problems solved' },
  { value: '300+', label: 'Interview Kits' },
  { value: '50+', label: 'New Challenges' },
  { value: '100+', label: 'AI-powered Hints' },
]

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-[90vh] bg-black overflow-hidden text-white">
      {/* Background image with curved clipping */}
      <div className="absolute bottom-0 right-0 w-full max-w-7xl h-full mx-auto z-0">
        <Image
          src="/HeroSection.png"
          alt="Background"
          fill
          className="object-cover object-right clip-curved"
          priority
        />
      </div>

      {/* Content section */}
      <div className="relative z-10 px-6 md:px-12 lg:px-24 py-24 max-w-6xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-extrabold leading-tight max-w-2xl"
        >
          Elevate your{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
            coding
          </span>{' '}
          game
        </motion.h1>

        <p className="mt-6 max-w-md text-gray-300 text-lg">
          Master algorithms and data structures with our comprehensive platform
          designed for coding excellence.
        </p>

        <button className="mt-6 w-fit px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full flex items-center gap-2 shadow-lg hover:scale-105 transition-all">
          Explore AlgoPrepX <ArrowRight size={18} />
        </button>
      </div>

      {/* Auto sliding stat cards */}
      <div className="absolute bottom-6 left-6 w-[90vw] max-w-md overflow-hidden">
        <div className="animate-slide flex gap-4">
          {Array(2)
            .fill(stats)
            .flat()
            .map((stat, i) => (
              <div
                key={i}
                className="min-w-[220px] bg-[#111827] text-white px-6 py-4 rounded-xl shadow-md flex flex-col items-center justify-center"
              >
                <span className="text-2xl font-bold text-purple-400">{stat.value}</span>
                <span className="text-sm text-gray-400">{stat.label}</span>
              </div>
            ))}
        </div>
      </div>
    </section>
  )
}
