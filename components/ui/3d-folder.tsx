"use client";

import React, { useState, useRef, useEffect, useLayoutEffect, useCallback, forwardRef } from "react";
import { X, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FolderProject {
  id: string;
  image: string;
  title: string;
}

const PLACEHOLDER = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800";

const ProjectCard = forwardRef<HTMLDivElement, {
  image: string; title: string; delay: number; isVisible: boolean;
  index: number; totalCount: number; onClick: () => void; isSelected: boolean;
}>(({ image, title, delay, isVisible, index, totalCount, onClick, isSelected }, ref) => {
  const mid = (totalCount - 1) / 2;
  const f = totalCount > 1 ? (index - mid) / mid : 0;
  const rot = f * 25, tx = f * 85, ty = Math.abs(f) * 12;

  return (
    <div ref={ref} className={cn("absolute w-20 h-28 cursor-pointer group/card", isSelected && "opacity-0")}
      style={{
        transform: isVisible ? `translateY(calc(-100px + ${ty}px)) translateX(${tx}px) rotate(${rot}deg) scale(1)` : "translateY(0px) translateX(0px) rotate(0deg) scale(0.4)",
        opacity: isSelected ? 0 : isVisible ? 1 : 0,
        transition: `all 700ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        zIndex: 10 + index, left: "-40px", top: "-56px",
      }}
      onClick={(e) => { e.stopPropagation(); onClick(); }}
    >
      <div className={cn("w-full h-full rounded-lg overflow-hidden shadow-xl bg-card border border-zinc-200/20 dark:border-white/5 relative transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/card:-translate-y-6 group-hover/card:shadow-2xl group-hover/card:shadow-accent/40 group-hover/card:ring-2 group-hover/card:ring-accent group-hover/card:scale-125")}>
        <img src={image || PLACEHOLDER} alt={title} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = PLACEHOLDER; }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
        <p className="absolute bottom-1.5 left-1.5 right-1.5 text-[9px] font-black uppercase tracking-tighter text-white truncate drop-shadow-md">{title}</p>
      </div>
    </div>
  );
});
ProjectCard.displayName = "ProjectCard";

const ImageLightbox: React.FC<{
  projects: FolderProject[]; currentIndex: number; isOpen: boolean;
  onClose: () => void; sourceRect: DOMRect | null; onCloseComplete?: () => void; onNavigate: (i: number) => void;
}> = ({ projects, currentIndex, isOpen, onClose, sourceRect, onCloseComplete, onNavigate }) => {
  const [phase, setPhase] = useState<"initial" | "animating" | "complete">("initial");
  const [closing, setClosing] = useState(false);
  const [render, setRender] = useState(false);
  const [idx, setIdx] = useState(currentIndex);
  const [sliding, setSliding] = useState(false);

  const cur = projects[idx];
  const hasNext = idx < projects.length - 1;
  const hasPrev = idx > 0;

  useEffect(() => { if (isOpen) { setIdx(currentIndex); setSliding(false); } }, [isOpen, currentIndex]);
  useEffect(() => {
    if (isOpen && currentIndex !== idx && !sliding) {
      setSliding(true);
      const t = setTimeout(() => { setIdx(currentIndex); setSliding(false); }, 400);
      return () => clearTimeout(t);
    }
  }, [currentIndex, isOpen, idx, sliding]);

  const goNext = useCallback(() => { if (idx < projects.length - 1 && !sliding) onNavigate(idx + 1); }, [idx, projects.length, sliding, onNavigate]);
  const goPrev = useCallback(() => { if (idx > 0 && !sliding) onNavigate(idx - 1); }, [idx, sliding, onNavigate]);

  const close = useCallback(() => {
    setClosing(true); onClose();
    setTimeout(() => { setClosing(false); setRender(false); setPhase("initial"); onCloseComplete?.(); }, 500);
  }, [onClose, onCloseComplete]);

  useEffect(() => {
    const kd = (e: KeyboardEvent) => { if (!isOpen) return; if (e.key === "Escape") close(); if (e.key === "ArrowRight") goNext(); if (e.key === "ArrowLeft") goPrev(); };
    window.addEventListener("keydown", kd);
    if (isOpen) document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", kd); document.body.style.overflow = ""; };
  }, [isOpen, close, goNext, goPrev]);

  useLayoutEffect(() => {
    if (isOpen && sourceRect) {
      setRender(true); setPhase("initial"); setClosing(false);
      requestAnimationFrame(() => requestAnimationFrame(() => setPhase("animating")));
      const t = setTimeout(() => setPhase("complete"), 700);
      return () => clearTimeout(t);
    }
  }, [isOpen, sourceRect]);

  if (!render || !cur) return null;

  const initStyle = (): React.CSSProperties => {
    if (!sourceRect) return {};
    const vw = window.innerWidth, vh = window.innerHeight;
    const tw = Math.min(800, vw - 64), th = Math.min(vh * 0.85, 600);
    const tx = (vw - tw) / 2, ty = (vh - th) / 2;
    const s = Math.max(sourceRect.width / tw, sourceRect.height / th);
    return { transform: `translate(${sourceRect.left + sourceRect.width / 2 - (tx + tw / 2)}px, ${sourceRect.top + sourceRect.height / 2 - (ty + th / 2)}px) scale(${s})`, opacity: 0.5, borderRadius: "12px" };
  };
  const finalStyle: React.CSSProperties = { transform: "translate(0, 0) scale(1)", opacity: 1, borderRadius: "24px" };
  const style = phase === "initial" && !closing ? initStyle() : finalStyle;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 md:p-8" onClick={close}
      style={{ opacity: closing ? 0 : 1, transition: "opacity 500ms cubic-bezier(0.16, 1, 0.3, 1)" }}>
      <div className="absolute inset-0 bg-background/90 backdrop-blur-2xl" style={{ opacity: phase === "initial" && !closing ? 0 : 1, transition: "opacity 600ms cubic-bezier(0.16, 1, 0.3, 1)" }} />
      <button onClick={(e) => { e.stopPropagation(); close(); }}
        className="absolute top-6 right-6 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-zinc-100/30 dark:bg-zinc-800/30 backdrop-blur-xl border border-zinc-200/20 dark:border-white/10 shadow-2xl text-foreground hover:bg-muted transition-all duration-300"
        style={{ opacity: phase === "complete" && !closing ? 1 : 0, transform: phase === "complete" && !closing ? "translateY(0)" : "translateY(-30px)", transition: "opacity 400ms ease-out 400ms, transform 500ms cubic-bezier(0.16, 1, 0.3, 1) 400ms" }}>
        <X className="w-5 h-5" strokeWidth={2.5} />
      </button>
      <button onClick={(e) => { e.stopPropagation(); goPrev(); }} disabled={!hasPrev || sliding}
        className="absolute left-4 md:left-10 z-50 w-14 h-14 flex items-center justify-center rounded-full bg-zinc-100/30 dark:bg-zinc-800/30 backdrop-blur-xl border border-zinc-200/20 dark:border-white/10 text-foreground hover:scale-110 active:scale-95 transition-all duration-300 disabled:opacity-0 disabled:pointer-events-none shadow-2xl"
        style={{ opacity: phase === "complete" && !closing && hasPrev ? 1 : 0, transition: "opacity 400ms ease-out 600ms" }}>
        <ChevronLeft className="w-6 h-6" strokeWidth={3} />
      </button>
      <button onClick={(e) => { e.stopPropagation(); goNext(); }} disabled={!hasNext || sliding}
        className="absolute right-4 md:right-10 z-50 w-14 h-14 flex items-center justify-center rounded-full bg-zinc-100/30 dark:bg-zinc-800/30 backdrop-blur-xl border border-zinc-200/20 dark:border-white/10 text-foreground hover:scale-110 active:scale-95 transition-all duration-300 disabled:opacity-0 disabled:pointer-events-none shadow-2xl"
        style={{ opacity: phase === "complete" && !closing && hasNext ? 1 : 0, transition: "opacity 400ms ease-out 600ms" }}>
        <ChevronRight className="w-6 h-6" strokeWidth={3} />
      </button>
      <div className="relative z-10 w-full max-w-4xl" onClick={(e) => e.stopPropagation()}
        style={{ ...style, transform: closing ? "translate(0, 0) scale(0.92)" : style.transform, transition: phase === "initial" && !closing ? "none" : "transform 700ms cubic-bezier(0.16, 1, 0.3, 1), opacity 600ms ease-out, border-radius 700ms ease", transformOrigin: "center center" }}>
        <div className="relative overflow-hidden rounded-[inherit] bg-card border border-zinc-200 dark:border-white/10 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
          <div className="relative overflow-hidden aspect-[4/3] md:aspect-[16/10]">
            <div className="flex w-full h-full" style={{ transform: `translateX(-${idx * 100}%)`, transition: sliding ? "transform 500ms cubic-bezier(0.16, 1, 0.3, 1)" : "none" }}>
              {projects.map((p) => (
                <div key={p.id} className="min-w-full h-full relative">
                  <img src={p.image || PLACEHOLDER} alt={p.title} className="w-full h-full object-cover select-none" onError={(e) => { (e.target as HTMLImageElement).src = PLACEHOLDER; }} />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 pointer-events-none" />
                </div>
              ))}
            </div>
          </div>
          <div className="px-8 py-7 bg-card border-t border-zinc-200 dark:border-white/5"
            style={{ opacity: phase === "complete" && !closing ? 1 : 0, transform: phase === "complete" && !closing ? "translateY(0)" : "translateY(40px)", transition: "opacity 500ms ease-out 500ms, transform 600ms cubic-bezier(0.16, 1, 0.3, 1) 500ms" }}>
            <div className="flex items-center justify-between gap-6">
              <div className="flex-1 min-w-0">
                <h3 className="text-2xl font-bold text-foreground tracking-tight truncate">{cur?.title}</h3>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 bg-muted rounded-full border border-zinc-200/20 dark:border-white/5">
                    {projects.map((_, i) => (
                      <button key={i} onClick={() => !sliding && i !== idx && onNavigate(i)}
                        className={cn("w-1.5 h-1.5 rounded-full transition-all duration-500", i === idx ? "bg-foreground scale-150" : "bg-foreground/20 hover:bg-foreground/50")} />
                    ))}
                  </div>
                  <p className="text-xs font-bold uppercase tracking-widest text-foreground/40">{idx + 1} / {projects.length}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface AnimatedFolderProps {
  title: string;
  projects: FolderProject[];
  className?: string;
  gradient?: string;
}

export const AnimatedFolder: React.FC<AnimatedFolderProps> = ({ title, projects, className, gradient }) => {
  const [hovered, setHovered] = useState(false);
  const [selIdx, setSelIdx] = useState<number | null>(null);
  const [srcRect, setSrcRect] = useState<DOMRect | null>(null);
  const [hiddenId, setHiddenId] = useState<string | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const preview = projects.slice(0, 5);

  const clickCard = (p: FolderProject, i: number) => {
    const el = cardRefs.current[i];
    if (el) setSrcRect(el.getBoundingClientRect());
    setSelIdx(i); setHiddenId(p.id);
  };

  const backBg = gradient || "linear-gradient(135deg, var(--folder-back) 0%, var(--folder-tab) 100%)";
  const tabBg = gradient || "var(--folder-tab)";
  const frontBg = gradient || "linear-gradient(135deg, var(--folder-front) 0%, var(--folder-back) 100%)";

  return (
    <>
      <div className={cn("relative flex flex-col items-center justify-center p-8 rounded-2xl cursor-pointer bg-card border border-zinc-200 dark:border-zinc-800 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:shadow-2xl hover:shadow-accent/20 hover:border-accent/40 group", className)}
        style={{ minWidth: "240px", minHeight: "280px", perspective: "1200px", transform: hovered ? "scale(1.04) rotate(-1.5deg)" : "scale(1) rotate(0deg)" }}
        onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
        <div className="absolute inset-0 rounded-2xl transition-opacity duration-700"
          style={{ background: gradient ? `radial-gradient(circle at 50% 70%, ${gradient.match(/#[a-fA-F0-9]{3,6}/)?.[0] || "var(--accent)"} 0%, transparent 70%)` : "radial-gradient(circle at 50% 70%, var(--accent) 0%, transparent 70%)", opacity: hovered ? 0.12 : 0 }} />
        <div className="relative flex items-center justify-center mb-4" style={{ height: "140px", width: "180px" }}>
          <div className="absolute w-28 h-20 rounded-lg shadow-md border border-zinc-200/20 dark:border-white/10" style={{ background: backBg, transformOrigin: "bottom center", transform: hovered ? "rotateX(-20deg) scaleY(1.05)" : "rotateX(0deg) scaleY(1)", transition: "transform 700ms cubic-bezier(0.16, 1, 0.3, 1)", zIndex: 10 }} />
          <div className="absolute w-10 h-3 rounded-t-md border-t border-x border-zinc-200/20 dark:border-white/10" style={{ background: tabBg, top: "calc(50% - 40px - 10px)", left: "calc(50% - 56px + 14px)", transformOrigin: "bottom center", transform: hovered ? "rotateX(-30deg) translateY(-3px)" : "rotateX(0deg) translateY(0)", transition: "transform 700ms cubic-bezier(0.16, 1, 0.3, 1)", zIndex: 10 }} />
          <div className="absolute" style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 20 }}>
            {preview.map((p, i) => (
              <ProjectCard key={p.id} ref={(el) => { cardRefs.current[i] = el; }} image={p.image} title={p.title} delay={i * 50} isVisible={hovered} index={i} totalCount={preview.length} onClick={() => clickCard(p, i)} isSelected={hiddenId === p.id} />
            ))}
          </div>
          <div className="absolute w-28 h-20 rounded-lg shadow-lg border border-zinc-300/30 dark:border-white/20" style={{ background: frontBg, top: "calc(50% - 40px + 4px)", transformOrigin: "bottom center", transform: hovered ? "rotateX(35deg) translateY(12px)" : "rotateX(0deg) translateY(0)", transition: "transform 700ms cubic-bezier(0.16, 1, 0.3, 1)", zIndex: 30 }} />
          <div className="absolute w-28 h-20 rounded-lg overflow-hidden pointer-events-none" style={{ top: "calc(50% - 40px + 4px)", background: "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 60%)", transformOrigin: "bottom center", transform: hovered ? "rotateX(35deg) translateY(12px)" : "rotateX(0deg) translateY(0)", transition: "transform 700ms cubic-bezier(0.16, 1, 0.3, 1)", zIndex: 31 }} />
        </div>
        <h3 className="text-base font-bold text-foreground mt-3 transition-all duration-500" style={{ transform: hovered ? "translateY(2px)" : "translateY(0)" }}>{title}</h3>
        <p className="text-xs font-medium text-foreground/60 transition-all duration-500">{projects.length} {projects.length === 1 ? "image" : "images"}</p>
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[9px] font-semibold uppercase tracking-widest text-foreground/30 transition-all duration-500" style={{ opacity: hovered ? 0 : 1, transform: hovered ? "translateY(10px)" : "translateY(0)" }}>Hover</div>
      </div>
      <ImageLightbox projects={projects} currentIndex={selIdx ?? 0} isOpen={selIdx !== null}
        onClose={() => { setSelIdx(null); setSrcRect(null); }} sourceRect={srcRect}
        onCloseComplete={() => setHiddenId(null)} onNavigate={(i) => { setSelIdx(i); setHiddenId(projects[i]?.id || null); }} />
    </>
  );
};
