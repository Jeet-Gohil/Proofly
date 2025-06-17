// components/MosaicImage.tsx
'use client';
import { motion } from 'framer-motion';

import { useEffect, useState } from 'react';

const MosaicImage = ({ src, gridSize = 10 }: { src: string; gridSize?: number }) => {
  const [tiles, setTiles] = useState<number[]>([]);

  useEffect(() => {
    setTiles(Array.from({ length: gridSize * gridSize }, (_, i) => i));
  }, [gridSize]);

  return (
    <div
      className="relative w-[40rem] h-[30rem] overflow-hidden rounded-[40px] shadow-2xl"
      style={{ display: 'grid', gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}
    >
      {tiles.map((_, index) => {
        const row = Math.floor(index / gridSize);
        const col = index % gridSize;
        return (
          <motion.div
            key={index}
            className="relative w-full h-full"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: (row + col) * 0.05, duration: 0.4 }}
            style={{
              backgroundImage: `url(${src})`,
              backgroundPosition: `${(col / (gridSize - 1)) * 100}% ${(row / (gridSize - 1)) * 100}%`,
              backgroundSize: `${gridSize * 100}% ${gridSize * 100}%`,
            }}
          />
        );
      })}
    </div>
  );
};

export default MosaicImage;
