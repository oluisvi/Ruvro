"use client";

import { useEffect, useRef, useState, type FocusEvent as ReactFocusEvent, type PointerEvent as ReactPointerEvent } from "react";
import type { Watch } from "@/data/watches";
import { WatchCard } from "@/components/watch/WatchCard";

const AUTOPLAY_SPEED_PX_PER_MS = 0.028;
const MANUAL_STEP_PAUSE_MS = 420;

function MotionIcon({ paused }: { paused: boolean }) {
  return paused ? (
    <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M5.25 3.5 12 8l-6.75 4.5z" fill="currentColor" /></svg>
  ) : (
    <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4.75 3.5h2v9h-2zm4.5 0h2v9h-2z" fill="currentColor" /></svg>
  );
}

function railGap(element: HTMLElement) {
  const style = getComputedStyle(element);
  return Number.parseFloat(style.columnGap || style.gap) || 0;
}

export function CuratedWatchRail({ watches }: { watches: ReadonlyArray<Watch> }) {
  const regionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const firstSetRef = useRef<HTMLDivElement>(null);
  const stepResumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [explicitPaused, setExplicitPaused] = useState(false);
  const [hoverPaused, setHoverPaused] = useState(false);
  const [focusPaused, setFocusPaused] = useState(false);
  const [stepPaused, setStepPaused] = useState(false);
  const [visible, setVisible] = useState(true);
  const [reduced, setReduced] = useState(false);
  const running = !explicitPaused && !hoverPaused && !focusPaused && !stepPaused && visible && !reduced;

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

  useEffect(() => () => {
    if (stepResumeTimerRef.current) clearTimeout(stepResumeTimerRef.current);
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
      const track = firstSet.parentElement;
      const boundary = firstSet.offsetWidth + (track instanceof HTMLElement ? railGap(track) : 0);
      let position = viewport.scrollLeft + elapsed * AUTOPLAY_SPEED_PX_PER_MS;
      if (boundary > 0 && position >= boundary) position -= boundary;
      viewport.scrollLeft = position;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [running]);

  const stepRail = (direction: -1 | 1) => {
    const viewport = viewportRef.current;
    const firstSet = firstSetRef.current;
    if (!viewport || !firstSet) return;
    const track = firstSet.parentElement;
    const boundary = firstSet.offsetWidth + (track instanceof HTMLElement ? railGap(track) : 0);
    const firstCard = firstSet.querySelector<HTMLElement>(".watch-card");
    const step = (firstCard?.getBoundingClientRect().width ?? Math.min(viewport.clientWidth * 0.8, 340)) + railGap(firstSet);
    if (boundary <= 0 || step <= 0) return;

    setStepPaused(true);
    if (stepResumeTimerRef.current) clearTimeout(stepResumeTimerRef.current);

    let current = viewport.scrollLeft % boundary;
    if (current < 0) current += boundary;
    if (direction < 0 && current < step) current += boundary;
    viewport.scrollLeft = current;
    viewport.scrollTo({ left: current + direction * step, behavior: reduced ? "auto" : "smooth" });

    stepResumeTimerRef.current = setTimeout(() => setStepPaused(false), reduced ? 0 : MANUAL_STEP_PAUSE_MS);
  };

  if (watches.length === 0) return null;

  return (
    <section
      ref={regionRef}
      className="watch-rail"
      aria-label="Curadoria em destaque"
      data-autoplay={running ? "running" : "paused"}
      onMouseEnter={() => setHoverPaused(true)}
      onMouseLeave={() => setHoverPaused(false)}
      onFocusCapture={(event: ReactFocusEvent<HTMLElement>) => {
        const target = event.target instanceof Element ? event.target : null;
        setFocusPaused(!target?.closest(".watch-rail-toolbar"));
      }}
      onBlurCapture={(event: ReactFocusEvent<HTMLElement>) => {
        const nextTarget = event.relatedTarget instanceof Node ? event.relatedTarget : null;
        if (!event.currentTarget.contains(nextTarget)) setFocusPaused(false);
      }}
      onPointerDown={(event: ReactPointerEvent<HTMLElement>) => {
        if (!(event.target instanceof Element) || !event.target.closest(".watch-rail-toolbar")) setExplicitPaused(true);
      }}
    >
      <div className="watch-rail-toolbar">
        <p>Seleção em movimento</p>
        <div className="rail-controls" role="group" aria-label="Controles da curadoria">
          <button type="button" className="rail-step-control rail-step-control--previous" onClick={() => stepRail(-1)} aria-label="Relógio anterior">
            <span aria-hidden="true">←</span>
          </button>
          <button type="button" className="rail-step-control rail-step-control--next" onClick={() => stepRail(1)} aria-label="Próximo relógio">
            <span aria-hidden="true">→</span>
          </button>
          <button type="button" className="rail-motion-control" onClick={() => setExplicitPaused((value) => !value)} aria-label={explicitPaused ? "Reproduzir movimento" : "Pausar movimento"}>
            <MotionIcon paused={explicitPaused} />
            <span>{explicitPaused ? "Reproduzir" : "Pausar"}</span>
          </button>
        </div>
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
