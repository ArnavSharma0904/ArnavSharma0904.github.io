"use client";

import { useEffect, useCallback, useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  X,
  ExternalLink,
  Github,
  ChevronLeft,
  ChevronRight,
  Layers,
  Zap,
  Award,
} from "lucide-react";
import type { Project } from "@/data/site";

function Counter({
  value,
  suffix = "",
}: {
  value: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1000;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setDisplay(Math.round((1 - Math.pow(1 - p, 3)) * value));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [imgIdx, setImgIdx] = useState(0);
  const handleClose = useCallback(() => onClose(), [onClose]);

  useEffect(() => {
    if (!project) return;
    setImgIdx(0);
    document.body.style.overflow = "hidden";
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [project, handleClose]);

  const isEyerobic = project?.title === "Eyerobic";

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="project-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[60]"
        >
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={handleClose}
          />

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-modal="true"
            className="absolute inset-x-3 top-[3%] bottom-[3%] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-[720px] bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-200/80 dark:border-zinc-800 shadow-2xl flex flex-col"
          >
            {/* Hero image */}
            <div className="relative h-64 md:h-80 shrink-0 overflow-hidden">
              <div
                className="flex h-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{ transform: `translateX(-${imgIdx * 100}%)` }}
              >
                {project.images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`${project.title} ${i + 1}`}
                    className="w-full h-full object-cover shrink-0"
                  />
                ))}
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10 pointer-events-none" />

              {/* Title over image */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <p className="text-xs font-mono text-accent uppercase tracking-wider mb-1">
                  {project.role}
                </p>
                <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
                  {project.title}
                </h2>
              </div>

              {/* Nav */}
              {project.images.length > 1 && (
                <>
                  <button
                    onClick={() => setImgIdx((p) => Math.max(0, p - 1))}
                    disabled={imgIdx === 0}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 disabled:opacity-0 transition-all"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={() =>
                      setImgIdx((p) =>
                        Math.min(project.images.length - 1, p + 1)
                      )
                    }
                    disabled={imgIdx === project.images.length - 1}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 disabled:opacity-0 transition-all"
                  >
                    <ChevronRight size={16} />
                  </button>
                  <div className="absolute bottom-8 right-8 flex gap-1.5">
                    {project.images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setImgIdx(i)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${i === imgIdx ? "bg-white w-5" : "bg-white/30 hover:bg-white/50"}`}
                      />
                    ))}
                  </div>
                </>
              )}

              <button
                onClick={handleClose}
                className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all focus:outline-none"
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-8 space-y-8">
                {/* Impact pills */}
                <div className="flex flex-wrap gap-2">
                  {project.impact.map((metric) => (
                    <span
                      key={metric}
                      className="text-xs font-mono font-bold px-3 py-1.5 bg-accent/10 text-accent rounded-lg border border-accent/20"
                    >
                      {metric}
                    </span>
                  ))}
                </div>

                {/* Description */}
                <p className="text-[15px] text-foreground leading-[1.8]">
                  {project.description}
                </p>

                {/* Eyerobic detailed stats */}
                {isEyerobic && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { label: "Funding", val: 916, pre: "$", suf: "K+" },
                      { label: "From entries", val: 1371, pre: "1/", suf: "" },
                      { label: "Frames trained", val: 14000, pre: "", suf: "+" },
                      { label: "PCB cost", val: 31, pre: "$", suf: ".33" },
                    ].map((s) => (
                      <div
                        key={s.label}
                        className="text-center p-4 rounded-xl bg-accent/5 border border-accent/10"
                      >
                        <p className="text-xl font-black text-foreground tracking-tight">
                          {s.pre}
                          <Counter value={s.val} suffix={s.suf} />
                        </p>
                        <p className="text-[9px] font-mono text-foreground mt-1 uppercase tracking-wider">
                          {s.label}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Stack */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Layers size={14} className="text-accent" />
                    <h3 className="text-[11px] font-bold uppercase tracking-wider text-foreground">
                      Tech Stack
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 text-xs font-mono bg-zinc-100 dark:bg-zinc-800 rounded-lg text-foreground border border-zinc-200 dark:border-zinc-700 hover:border-accent/40 hover:bg-accent/5 transition-colors cursor-default"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Highlights */}
                {project.highlights.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Zap size={14} className="text-accent" />
                      <h3 className="text-[11px] font-bold uppercase tracking-wider text-foreground">
                        Highlights
                      </h3>
                    </div>
                    <div className="space-y-3">
                      {project.highlights.map((item, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-4 p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-100 dark:border-zinc-800"
                        >
                          <span className="text-[10px] font-mono font-bold text-accent bg-accent/10 w-6 h-6 rounded-md flex items-center justify-center shrink-0 mt-0.5">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <p className="text-sm text-foreground leading-relaxed">
                            {item}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Links */}
                <div className="flex gap-3 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                  {project.link ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-white rounded-xl text-sm font-medium hover:brightness-110 transition-all"
                    >
                      <ExternalLink size={14} /> Visit project
                    </a>
                  ) : (
                    <button
                      disabled
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-100 dark:bg-zinc-800 text-foreground rounded-xl text-sm font-medium cursor-not-allowed opacity-50"
                    >
                      <ExternalLink size={14} /> Link soon
                    </button>
                  )}
                  {project.repo ? (
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm font-medium text-foreground hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                    >
                      <Github size={14} /> Repository
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-2 px-5 py-2.5 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm font-medium text-foreground opacity-40">
                      <Github size={14} /> Private
                    </span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
