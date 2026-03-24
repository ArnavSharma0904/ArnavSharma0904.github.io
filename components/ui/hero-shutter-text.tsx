"use client";

import React from "react";
import { motion } from "framer-motion";

interface HeroTextProps {
  text?: string;
  className?: string;
}

export default function HeroText({
  text = "ARNAV SHARMA",
  className = "",
}: HeroTextProps) {
  const characters = text.split("");

  return (
    <div
      className={`relative flex flex-col items-center justify-center h-full w-full bg-background transition-colors duration-700 ${className}`}
    >
      <div className="relative z-10 w-full px-4 flex flex-col items-center">
        <motion.div className="flex flex-wrap justify-center items-center w-full">
          {characters.map((char, i) =>
            char === " " ? (
              <div key={i} className="basis-full h-0" />
            ) : (
              <div key={i} className="relative px-[0.1vw] overflow-hidden">
                <motion.span
                  initial={{ opacity: 0, filter: "blur(10px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  transition={{ delay: i * 0.04 + 0.3, duration: 0.8 }}
                  className="text-[13vw] md:text-[15vw] leading-none font-black text-foreground tracking-tighter"
                >
                  {char}
                </motion.span>

                <motion.span
                  initial={{ x: "-100%", opacity: 0 }}
                  animate={{ x: "100%", opacity: [0, 1, 0] }}
                  transition={{
                    duration: 0.7,
                    delay: i * 0.04,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 text-[13vw] md:text-[15vw] leading-none font-black text-accent z-10 pointer-events-none"
                  style={{
                    clipPath: "polygon(0 0, 100% 0, 100% 35%, 0 35%)",
                  }}
                >
                  {char}
                </motion.span>

                <motion.span
                  initial={{ x: "100%", opacity: 0 }}
                  animate={{ x: "-100%", opacity: [0, 1, 0] }}
                  transition={{
                    duration: 0.7,
                    delay: i * 0.04 + 0.1,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 text-[13vw] md:text-[15vw] leading-none font-black text-foreground z-10 pointer-events-none"
                  style={{
                    clipPath:
                      "polygon(0 35%, 100% 35%, 100% 65%, 0 65%)",
                  }}
                >
                  {char}
                </motion.span>

                <motion.span
                  initial={{ x: "-100%", opacity: 0 }}
                  animate={{ x: "100%", opacity: [0, 1, 0] }}
                  transition={{
                    duration: 0.7,
                    delay: i * 0.04 + 0.2,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 text-[13vw] md:text-[15vw] leading-none font-black text-accent z-10 pointer-events-none"
                  style={{
                    clipPath:
                      "polygon(0 65%, 100% 65%, 100% 100%, 0 100%)",
                  }}
                >
                  {char}
                </motion.span>
              </div>
            )
          )}
        </motion.div>
      </div>

      <div className="absolute top-8 left-8 border-l border-t border-zinc-200 dark:border-zinc-800 w-12 h-12" />
      <div className="absolute bottom-8 right-8 border-r border-b border-zinc-200 dark:border-zinc-800 w-12 h-12" />
    </div>
  );
}
