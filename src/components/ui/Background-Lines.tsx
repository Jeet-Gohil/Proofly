import React from "react";
import { cn } from "@/lib/utils"; // Optional className merging util

interface BackgroundLinesProps {
  children: React.ReactNode;
  className?: string;
}

export function BackgroundLines({ children, className }: BackgroundLinesProps) {
  return (
    <div className={cn("relative w-full bg-black", className)}>
      {/* Background Lines */}
      <div className="absolute inset-0 z-0 opacity-20">
        {/* Your background SVG or canvas lines */}
      </div>

      {/* Foreground content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

