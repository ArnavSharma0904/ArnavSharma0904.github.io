"use client";

import { motion } from "framer-motion";
import { experience } from "@/data/site";

export function Experience() {
  return (
    <section id="experience" className="relative py-32 px-6">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <p className="text-[11px] font-mono uppercase tracking-[0.3em] text-accent mb-4">
            Background
          </p>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground">
            Experience
          </h2>
        </motion.div>

        <div>
          {experience.map((exp, i) => (
            <motion.div
              key={exp.org}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="group border-t border-zinc-200 dark:border-zinc-800 last:border-b py-6 md:py-7 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-1 md:gap-8 items-baseline"
            >
              <div className="flex items-baseline gap-4">
                <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors duration-300">
                  {exp.org}
                </h3>
                <span className="text-xs font-mono text-accent">
                  {exp.role}
                </span>
              </div>
              <span className="text-xs font-mono text-foreground">
                {exp.period}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
