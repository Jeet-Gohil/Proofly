"use client";

import { useState, useEffect, useRef, MouseEvent } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type MaskContainerProps = {
  children?: string | React.ReactNode;
  revealText?: string | React.ReactNode;
  size?: number;
  revealSize?: number;
  className?: string;
};

type MouseCoords = {
  x: number | null;
  y: number | null;
};

export const MaskContainer = ({
  children,
  revealText,
  size = 2,
  revealSize = 600,
  className,
}: MaskContainerProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState<MouseCoords>({ x: null, y: null });
  const containerRef = useRef<HTMLDivElement | null>(null);

  const updateMousePosition = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const maskSize = isHovered ? revealSize : size;

  return (
    <motion.div
      ref={containerRef}
      className={cn("relative h-screen", className)}
      animate={{
        backgroundColor: isHovered ? "var(--slate-900)" : "var(--white)",
      }}
      transition={{
        backgroundColor: { duration: 0.3 },
      }}
      onMouseMove={updateMousePosition} // ✅ Move listener here instead of raw DOM
    >
      <motion.div
        className="absolute flex h-full w-full items-center justify-center bg-black text-6xl [mask-image:url(/mask.svg)] [mask-repeat:no-repeat] [mask-size:40px] dark:bg-white"
        animate={{
          maskPosition: `${(mousePosition.x ?? 0) - maskSize / 2}px ${(mousePosition.y ?? 0) - maskSize / 2}px`,
          maskSize: `${maskSize}px`,
        }}
        transition={{
          maskSize: { duration: 0.3, ease: "easeInOut" },
          maskPosition: { duration: 0.15, ease: "linear" },
        }}
      >
        <div className="absolute inset-0 z-0 h-full w-full bg-black opacity-50 dark:bg-white" />
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative z-20 mx-auto max-w-4xl text-center text-4xl font-bold"
        >
          {children}
        </div>
      </motion.div>

      <div className="flex h-full w-full items-center justify-center">
        {revealText}
      </div>
    </motion.div>
  );
};
