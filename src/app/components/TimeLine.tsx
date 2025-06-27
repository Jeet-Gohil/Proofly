'use client'

import { motion } from 'framer-motion'
import { User, CheckCircle2, Radar, TrendingUp } from 'lucide-react'

// Step positions are in percentages of container size
const steps = [
  {
    id: 'visitor',
    label: 'Visitor Detected',
    icon: <User className="w-6 h-6 md:w-7 md:h-7 text-white" />,
    xPct: 12,
    yPct: 25,
  },
  {
    id: 'signup',
    label: 'Signed Up',
    icon: <CheckCircle2 className="w-6 h-6 md:w-7 md:h-7 text-white" />,
    xPct: 75,
    yPct: 15,
  },
  {
    id: 'tracked',
    label: 'Tracking On',
    icon: <Radar className="w-6 h-6 md:w-7 md:h-7 text-white" />,
    xPct: 75,
    yPct: 45,
  },
  {
    id: 'growth',
    label: 'Growth Unlocked',
    icon: <TrendingUp className="w-6 h-6 md:w-7 md:h-7 text-white" />,
    xPct: 40,
    yPct: 75,
  },
]

// Calculates pixel coordinates based on % and container size
const createSmoothPath = (points: { x: number; y: number }[]) => {
  if (points.length < 2) return ''
  const path = [`M ${points[0].x} ${points[0].y}`]
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1]
    const curr = points[i]
    const midX = (prev.x + curr.x) / 2
    const midY = (prev.y + curr.y) / 2
    path.push(`Q ${prev.x} ${prev.y}, ${midX} ${midY}`)
    path.push(`T ${curr.x} ${curr.y}`)
  }
  return path.join(' ')
}

export default function AnimatedJourney() {
  const width = 800
  const height = 650

  const points = steps.map(step => ({
    x: (step.xPct / 100) * width,
    y: (step.yPct / 100) * height,
  }))

  const path = createSmoothPath(points)

  return (
    <div className="relative w-full h-[450px] md:h-[600px] lg:h-[700px]">
      {/* Animated curved path */}
      <motion.svg
  viewBox={`0 0 ${width} ${height}`}
  preserveAspectRatio="none"
  className="absolute inset-0 w-full h-full pointer-events-none"
  xmlns="http://www.w3.org/2000/svg"
>
  {/* Thinner glowing dotted path */}
  <motion.path
    d={path}
    fill="none"
    stroke="url(#gradient)"
    strokeWidth={2} // thinner line
    strokeDasharray="6 10"
    initial={{ pathLength: 0 }}
    animate={{ pathLength: 1 }}
    transition={{ duration: 2.5, ease: 'easeInOut' }}
    style={{
      filter: 'url(#glow)',
    }}
  />

  <defs>
    {/* Multicolor Gradient */}
    <linearGradient id="gradient" x1="0" y1="0" x2={width} y2={height} gradientUnits="userSpaceOnUse">
      <stop offset="0%" stopColor="#00f0ff" />
      <stop offset="50%" stopColor="#3b82f6" />
      <stop offset="100%" stopColor="#a855f7" />
    </linearGradient>

    {/* Glow Filter */}
    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#60a5fa" floodOpacity="1" />
      <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#a855f7" floodOpacity="0.4" />
    </filter>
  </defs>
</motion.svg>



      {/* Nodes */}
      {steps.map((step, i) => (
        <motion.div
          key={step.id}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.2 }}
          viewport={{ once: true }}
          className="absolute flex flex-col items-center"
          style={{
            left: `${step.xPct}%`,
            top: `${step.yPct}%`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div className="relative p-4 rounded-full bg-transparent">
            {/* Glowing effect */}
            <motion.div
              className="absolute inset-0 rounded-full blur-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-500 z-[-1]"
              animate={{
                opacity: [0.4, 1],
                scale: [1, 1.15],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
              }}
            />
            {step.icon}
          </div>
          <span className="mt-2 text-xs md:text-sm text-white font-semibold whitespace-nowrap text-center">
            {step.label}
          </span>
        </motion.div>
      ))}
    </div>
  )
}
