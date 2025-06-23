import { motion } from 'framer-motion';
import { LayoutGrid, Rows3 } from 'lucide-react';

interface ChartLayoutToggleProps {
  isGrid: boolean;
  toggle: () => void;
}

export function ChartLayoutToggle({ isGrid, toggle }: ChartLayoutToggleProps) {
  return (
    <motion.button
      onClick={toggle}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center gap-2 px-3 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg transition text-white shadow"
    >
      {isGrid ? <Rows3 size={18} /> : <LayoutGrid size={18} />}
      <span className="text-sm">{isGrid ? 'Carousel View' : 'Grid View'}</span>
    </motion.button>
  );
}
