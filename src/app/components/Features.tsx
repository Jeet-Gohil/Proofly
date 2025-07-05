'use client';

import React, { JSX } from 'react';
import { motion } from 'framer-motion';
import { Radar, Zap, Activity, Eye } from 'lucide-react';

interface Feature {
  title: string;
  description: string;
  icon: JSX.Element;
}

const features: Feature[] = [
  {
    title: 'Real-time Visitor Tracking',
    description: 'See who is visiting your site as it happens with detailed geo and device insights.',
    icon: <Radar className="w-6 h-6 text-purple-500" />,
  },
  {
    title: 'Live Notification Banners',
    description: 'Boost conversions with live social proof banners showing real-time user activity.',
    icon: <Zap className="w-6 h-6 text-purple-500" />,
  },
  {
    title: 'Actionable Analytics',
    description: 'Visualize and understand user behavior with beautiful and intuitive dashboards.',
    icon: <Activity className="w-6 h-6 text-purple-500" />,
  },
  {
    title: 'Easy Integration',
    description: 'Drop-in tracking script with zero configuration. Start seeing insights instantly.',
    icon: <Eye className="w-6 h-6 text-purple-500" />,
  },
];

export default function WhyProofly() {
  return (
    <section
      className="
        relative w-full overflow-hidden
        bg-black dark:bg-black text-white
        py-16 px-4 md:px-12
        before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-16
        before:bg-gradient-to-b before:from-white dark:before:from-gray-900 before:to-transparent
        after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-16
        after:bg-gradient-to-t after:from-white dark:after:from-gray-900 after:to-transparent
        pointer-events-none
      "
    >
      <div className="relative pointer-events-auto max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Left */}
        <div className="flex-1 max-w-lg">
          <h2 className="uppercase tracking-widest text-gray-400 mb-4">WHY PROOFLY</h2>
          <h3 className="text-4xl md:text-5xl font-bold mb-6">
            Don&apos;t just trust <span className="text-purple-500">our data</span> — see the <span className="text-purple-500">proof</span> in real-time!
          </h3>
          <p className="text-gray-400 text-lg">
            Proofly gives you live visitor tracking and real-time social proof.
            Show your growth, build trust, and boost your conversions effortlessly.
          </p>
        </div>

        {/* Right: Infinite sliding cards */}
        <div className="flex-1 w-full overflow-hidden relative">
          <motion.div
            className="flex gap-6"
            animate={{ x: ['0%', '-100%'] }}
            transition={{ repeat: Infinity, ease: 'linear', duration: 20 }}
          >
            {[...features, ...features].map((feature, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                className="min-w-[250px] max-w-[250px] bg-neutral-900 dark:bg-neutral-800 border border-neutral-700 p-6 rounded-xl shadow-md"
              >
                <div className="mb-4">{feature.icon}</div>
                <h4 className="text-xl font-semibold mb-2">{feature.title}</h4>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
