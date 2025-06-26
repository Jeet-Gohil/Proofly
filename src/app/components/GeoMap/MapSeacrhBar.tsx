'use client';

import { motion } from 'framer-motion';

type Props = {
  value: string;
  onChange: (val: string) => void;
};

export default function MapSearchBar({ value, onChange }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto mt-4 px-4"
    >
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="🔍 Search for any country (e.g. India)"
        className="w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm md:text-base"
      />
    </motion.div>
  );
}
