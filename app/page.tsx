"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PrismFluxLoader } from "@/components/ui/prism-flux-loader";
import HeroText from "@/components/ui/hero-shutter-text";
import { TopNav } from "@/components/nav/TopNav";
import { Work } from "@/components/sections/Work";
import { Gallery } from "@/components/sections/Gallery";
import { Awards } from "@/components/sections/Awards";
import { Experience } from "@/components/sections/Experience";
import { Contact } from "@/components/sections/Contact";
import { ChevronDown, Sparkles } from "lucide-react";

function Divider() {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="max-w-[1200px] mx-auto h-px bg-zinc-200 dark:bg-zinc-800 origin-left"
    />
  );
}

function AmbientGlow() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div
        className="absolute rounded-full blur-[200px]"
        style={{
          width: 700,
          height: 700,
          top: "5%",
          right: "-15%",
          background: "var(--accent)",
          opacity: 0.04,
        }}
      />
      <div
        className="absolute rounded-full blur-[180px]"
        style={{
          width: 500,
          height: 500,
          bottom: "10%",
          left: "-10%",
          background: "var(--accent)",
          opacity: 0.03,
        }}
      />
    </div>
  );
}

const KONAMI = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a",
];

function useKonamiCode(onTrigger: () => void) {
  const idx = useRef(0);
  const handler = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === KONAMI[idx.current]) {
        idx.current++;
        if (idx.current === KONAMI.length) {
          idx.current = 0;
          onTrigger();
        }
      } else {
        idx.current = 0;
      }
    },
    [onTrigger]
  );
  useEffect(() => {
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handler]);
}

function KonamiOverlay({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none"
    >
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        exit={{ scale: 0, rotate: 180 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="flex flex-col items-center gap-4 p-10 rounded-3xl bg-white dark:bg-zinc-900 shadow-2xl border border-accent/30"
      >
        <Sparkles size={48} className="text-accent" />
        <p className="text-2xl font-black text-foreground tracking-tight">
          You found it.
        </p>
        <p className="text-sm font-mono text-accent">↑↑↓↓←→←→BA</p>
      </motion.div>
    </motion.div>
  );
}

export default function Home() {
  const [loading, setLoading] = useState(true);
  const cancelledRef = useRef(false);
  const [konami, setKonami] = useState(false);

  useKonamiCode(() => {
    setKonami(true);
    setTimeout(() => setKonami(false), 2500);
  });

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (loading) return;

    const scrollTimer = setTimeout(() => {
      if (!cancelledRef.current) {
        document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
      }
    }, 1800);

    const cancel = () => {
      cancelledRef.current = true;
    };
    window.addEventListener("wheel", cancel, { once: true, passive: true });
    window.addEventListener("touchstart", cancel, { once: true });

    return () => {
      clearTimeout(scrollTimer);
      window.removeEventListener("wheel", cancel);
      window.removeEventListener("touchstart", cancel);
    };
  }, [loading]);

  const skip = () => {
    cancelledRef.current = true;
    setLoading(false);
    requestAnimationFrame(() => {
      document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
    });
  };

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loader"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background"
          >
            <PrismFluxLoader />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        <KonamiOverlay show={konami} />
      </AnimatePresence>

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <AmbientGlow />

          <section className="h-screen relative flex flex-col">
            <div className="flex-1 flex items-center justify-center">
              <HeroText />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="text-center pb-4"
            >
              <p className="text-[11px] font-mono uppercase tracking-[0.4em] text-accent">
                Builder &middot; Founder &middot; Engineer
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="pb-10 flex flex-col items-center gap-3 z-20"
            >
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut",
                }}
              >
                <ChevronDown size={16} className="text-foreground" />
              </motion.div>
              <button
                onClick={skip}
                className="text-[10px] uppercase tracking-[0.2em] text-foreground hover:text-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
              >
                Skip
              </button>
            </motion.div>
          </section>

          <TopNav />
          <main>
            <Work />
            <Divider />
            <Gallery />
            <Divider />
            <Awards />
            <Divider />
            <Experience />
            <Divider />
            <Contact />
          </main>
        </motion.div>
      )}
    </>
  );
}
