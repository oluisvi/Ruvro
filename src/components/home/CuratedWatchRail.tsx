"use client";

import { useEffect, useRef, useState } from "react";
import type { Watch } from "@/data/watches";
import { WatchCard } from "@/components/watch/WatchCard";

function MotionIcon({ paused }: { paused: boolean }) {
  return paused ? (
    <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M5.25 3.5 12 8l-6.75 4.5z" fill="currentColor" /></svg>
  ) : (
    <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4.75 3.5h2v9h-2zm4.5 0h2v9h-2z" fill="currentColor" /></svg>
  );
}

export function CuratedWatchRail({ watches }: { watches: ReadonlyArray<Watch> }) {
  const regionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const firstSetRef = useRef<HTMLDivElement>(null);
  const [explicitPaused, setExplicitPaused] = useState(false);
  const [interactionPaused, setInteractionPaused] = useState(false);
  const [visible, setVisible] = useState(true);
  const [reduced, setReduced] = useState(false);
  const running = !explicitPaused && !interactionPaused && visible && !reduced;

  useEffect(() => {
    const region = regionRef.current;
    if (!region || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.05 });
    observer.observe(region);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!window.matchMedia) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(preference.matches);
    sync();
    preference.addEventListener("change", sync);
    return () => preference.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!running) return;
    const viewport = viewportRef.current;
    const firstSet = firstSetRef.current;
    if (!viewport || !firstSet) return;
    let frame = 0;
    let previous = performance.now();
    const tick = (now: number) => {
      const elapsed = Math.min(now - previous, 32);
      previous = now;
      viewport.scrollLeft += elapsed * 0.016;
      const boundary = firstSet.offsetWidth + 24;
      if (viewport.scrollLeft >= boundary) viewport.scrollLeft -= boundary;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [running]);

  if (watches.length === 0) return null;

  return (
    <section
      ref={regionRef}
      className="watch-rail"
      aria-label="Curadoria em destaque"
      data-autoplay={running ? "running" : "paused"}
      onMouseEnter={() => setInteractionPaused(true)}
      onMouseLeave={() => setInteractionPaused(false)}
      onFocusCapture={() => setInteractionPaused(true)}
      onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setInteractionPaused(false); }}
      onPointerDown={() => setExplicitPaused(true)}
    >
      <div className="watch-rail-toolbar">
        <p>Seleção em movimento</p>
        <button type="button" className="rail-motion-control" onPointerDown={(event) => event.stopPropagation()} onClick={() => setExplicitPaused((value) => !value)} aria-label={explicitPaused ? "Reproduzir movimento" : "Pausar movimento"}>
          <MotionIcon paused={explicitPaused} />
          <span>{explicitPaused ? "Reproduzir" : "Pausar"}</span>
        </button>
      </div>
      <div className="watch-rail-viewport" ref={viewportRef}>
        <div className="watch-rail-track">
          <div className="watch-rail-set" data-rail-set="original" ref={firstSetRef}>
            {watches.map((watch, index) => <WatchCard key={watch.slug} watch={watch} index={index} compact />)}
          </div>
          <div className="watch-rail-set" data-rail-set="clone" aria-hidden="true" inert>
            {watches.map((watch, index) => <WatchCard key={`${watch.slug}-clone`} watch={watch} index={index} compact interactive={false} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
