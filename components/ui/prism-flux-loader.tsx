"use client";

import React, { useState, useEffect } from "react";
import { PlusIcon } from "lucide-react";

interface CubeLoaderProps {
  size?: number;
  speed?: number;
  textSize?: number;
}

export const PrismFluxLoader: React.FC<CubeLoaderProps> = ({
  size = 30,
  speed = 5,
  textSize = 50,
}) => {
  const [time, setTime] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);

  const statuses = [
    "Fetching",
    "Fixing",
    "Updating",
    "Placing",
    "Syncing",
    "Processing",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => prev + 0.02 * speed);
    }, 16);
    return () => clearInterval(interval);
  }, [speed]);

  useEffect(() => {
    const statusInterval = setInterval(() => {
      setStatusIndex((prev) => (prev + 1) % statuses.length);
    }, 600);
    return () => clearInterval(statusInterval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const half = size / 2;

  return (
    <div className="flex flex-col items-center justify-center gap-4 h-[220px]">
      <div
        className="relative"
        style={{
          width: size,
          height: size,
          transformStyle: "preserve-3d",
          transform: `rotateY(${time * 30}deg) rotateX(${time * 30}deg)`,
        }}
      >
        {statuses.slice(0, 6).map((_, i) => {
          const faceTransforms = [
            `rotateY(0deg) translateZ(${half}px)`,
            `rotateY(180deg) translateZ(${half}px)`,
            `rotateY(90deg) translateZ(${half}px)`,
            `rotateY(-90deg) translateZ(${half}px)`,
            `rotateX(90deg) translateZ(${half}px)`,
            `rotateX(-90deg) translateZ(${half}px)`,
          ];

          return (
            <div
              key={i}
              className="absolute flex items-center justify-center font-semibold text-foreground"
              style={{
                width: size,
                height: size,
                fontSize: textSize,
                border: "1px solid var(--foreground)",
                transform: faceTransforms[i],
                backfaceVisibility: "hidden",
              }}
            >
              <PlusIcon />
            </div>
          );
        })}
      </div>

      <div className="text-sm font-semibold text-foreground tracking-wide">
        {statuses[statusIndex]}...
      </div>
    </div>
  );
};
