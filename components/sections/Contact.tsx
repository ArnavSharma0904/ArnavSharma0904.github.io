"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Copy, Check, ArrowUpRight } from "lucide-react";
import { profile } from "@/data/site";

export function Contact() {
  const [copied, setCopied] = useState(false);
  const [footerHover, setFooterHover] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="relative py-32 px-6">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <p className="text-[11px] font-mono uppercase tracking-[0.3em] text-accent mb-4">
            Get in touch
          </p>
          <h2 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-foreground leading-none">
            Let&apos;s
            <br />
            <span className="text-accent">Build.</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex flex-col gap-6"
        >
          <button
            onClick={copyEmail}
            className="group inline-flex items-center gap-3 text-left w-fit focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
          >
            <span className="text-lg md:text-xl font-mono text-foreground group-hover:text-accent transition-colors duration-300">
              {profile.email}
            </span>
            {copied ? (
              <Check size={16} className="text-accent" />
            ) : (
              <Copy
                size={16}
                className="text-foreground group-hover:text-accent transition-colors"
              />
            )}
          </button>

          <div className="flex items-center gap-6">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-sm font-mono text-foreground hover:text-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
            >
              <Github size={16} />
              GitHub
              <ArrowUpRight
                size={12}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>

            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-sm font-mono text-foreground hover:text-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
            >
              <Linkedin size={16} />
              LinkedIn
              <ArrowUpRight
                size={12}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-32 pt-8 border-t border-zinc-200 dark:border-zinc-800"
        >
          <p
            className="text-[10px] font-mono uppercase tracking-[0.3em] text-foreground cursor-default select-none"
            onMouseEnter={() => setFooterHover(true)}
            onMouseLeave={() => setFooterHover(false)}
          >
            {footerHover
              ? "still building..."
              : `© ${new Date().getFullYear()} Arnav Sharma`}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
