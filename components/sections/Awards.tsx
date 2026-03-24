"use client";

import { motion } from "framer-motion";
import { awards } from "@/data/site";

export function Awards() {
  return (
    <section id="awards" className="relative py-32 px-6">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <p className="text-[11px] font-mono uppercase tracking-[0.3em] text-accent mb-4">
            Recognition
          </p>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground">
            Awards
          </h2>
        </motion.div>

        <div>
          {awards.map((award, i) => (
            <motion.div
              key={award.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="group border-t border-zinc-200 dark:border-zinc-800 last:border-b py-6 md:py-8 flex items-start gap-6"
            >
              <span className="text-xs font-mono text-accent w-8 shrink-0 pt-1">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-lg md:text-xl font-bold text-foreground group-hover:text-accent transition-colors duration-300">
                  {award.title}
                </h3>
                <p className="text-sm text-foreground mt-1">{award.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
