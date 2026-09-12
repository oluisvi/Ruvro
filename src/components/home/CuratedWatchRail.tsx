"use client";

import { useCallback, useEffect, useRef, useState, type FocusEvent as ReactFocusEvent, type PointerEvent as ReactPointerEvent } from "react";
import type { Watch } from "@/data/watches";
import { WatchCard } from "@/components/watch/WatchCard";

const AUTOPLAY_SPEED_PX_PER_MS = 0.03;
const MANUAL_STEP_PAUSE_MS = 420;

type PauseReason = "hover" | "focus" | "pointer" | "step" | "offscreen" | "reduced";
type PauseState = Record<PauseReason, boolean>;

function railGap(element: HTMLElement) {
  const style = getComputedStyle(element);
  return Number.parseFloat(style.columnGap || style.gap) || 0;
}

export function CuratedWatchRail({ watches }: { watches: ReadonlyArray<Watch> }) {
  const regionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const firstSetRef = useRef<HTMLDivElement>(null);
  const stepResumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pauseStateRef = useRef<PauseState>({
    hover: false,
    focus: false,
    pointer: false,
    step: false,
    offscreen: true,
    reduced: false,
  });
  const reducedRef = useRef(false);
  const [autoplayState, setAutoplayState] = useState<"running" | "paused">("paused");

  const syncAutoplayState = useCallback(() => {
    const paused = Object.values(pauseStateRef.current).some(Boolean);
    setAutoplayState(paused ? "paused" : "running");
  }, []);

  const setPause = useCallback((reason: PauseReason, paused: boolean) => {
    if (pauseStateRef.current[reason] === paused) return;
    pauseStateRef.current[reason] = paused;
    syncAutoplayState();
  }, [syncAutoplayState]);

  useEffect(() => {
    const region = regionRef.current;
    if (!region || !("IntersectionObserver" in window)) {
      setPause("offscreen", false);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      setPause("offscreen", !entry.isIntersecting);
    }, { threshold: 0.05 });
    observer.observe(region);
    return () => observer.disconnect();
  }, [setPause]);

  useEffect(() => {
    if (!window.matchMedia) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      reducedRef.current = preference.matches;
      setPause("reduced", preference.matches);
    };
    sync();
    preference.addEventListener("change", sync);
    return () => preference.removeEventListener("change", sync);
  }, [setPause]);

  useEffect(() => () => {
    if (stepResumeTimerRef.current) clearTimeout(stepResumeTimerRef.current);
  }, []);

  // Keep one RAF alive for the lifetime of the rail. Interaction only flips refs,
  // so autoplay cannot get stranded because an effect failed to restart.
  useEffect(() => {
    const viewport = viewportRef.current;
    const firstSet = firstSetRef.current;
    if (!viewport || !firstSet) return;

    let frame = 0;
    let previous = performance.now();
    let position = viewport.scrollLeft;

    const tick = (now: number) => {
      const elapsed = Math.min(now - previous, 32);
      previous = now;

      if (Object.values(pauseStateRef.current).some(Boolean)) {
        // Keep the accumulator in sync with drag/arrow/native scrolling while paused.
        position = viewport.scrollLeft;
      } else {
        const track = firstSet.parentElement;
        const boundary = firstSet.offsetWidth + (track instanceof HTMLElement ? railGap(track) : 0);
        if (boundary > 0) {
          // Accumulate sub-pixel movement in JS instead of reading scrollLeft every
          // frame; some browsers quantize scrollLeft and can otherwise stall.
          position += elapsed * AUTOPLAY_SPEED_PX_PER_MS;
          if (position >= boundary) position -= boundary;
          viewport.scrollLeft = position;
        }
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  const stepRail = (direction: -1 | 1) => {
    const viewport = viewportRef.current;
    const firstSet = firstSetRef.current;
    if (!viewport || !firstSet) return;
    const track = firstSet.parentElement;
    const boundary = firstSet.offsetWidth + (track instanceof HTMLElement ? railGap(track) : 0);
    const firstCard = firstSet.querySelector<HTMLElement>(".watch-card");
    const step = (firstCard?.getBoundingClientRect().width ?? Math.min(viewport.clientWidth * 0.8, 340)) + railGap(firstSet);
    if (boundary <= 0 || step <= 0) return;

    setPause("step", true);
    if (stepResumeTimerRef.current) clearTimeout(stepResumeTimerRef.current);

    let current = viewport.scrollLeft % boundary;
    if (current < 0) current += boundary;
    if (direction < 0 && current < step) current += boundary;
    viewport.scrollLeft = current;
    viewport.scrollTo({ left: current + direction * step, behavior: reducedRef.current ? "auto" : "smooth" });

    stepResumeTimerRef.current = setTimeout(
      () => setPause("step", false),
      reducedRef.current ? 0 : MANUAL_STEP_PAUSE_MS,
    );
  };

  const releasePointerPause = (event: ReactPointerEvent<HTMLDivElement>) => {
    setPause("pointer", false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  };

  if (watches.length === 0) return null;

  return (
    <section
      ref={regionRef}
      className="watch-rail"
      aria-label="Curadoria em destaque"
      data-autoplay={autoplayState}
      onMouseEnter={() => setPause("hover", true)}
      onMouseLeave={() => setPause("hover", false)}
      onFocusCapture={(event: ReactFocusEvent<HTMLElement>) => {
        const target = event.target instanceof HTMLElement ? event.target : null;
        if (target?.matches(":focus-visible")) setPause("focus", true);
      }}
      onBlurCapture={(event: ReactFocusEvent<HTMLElement>) => {
        const nextTarget = event.relatedTarget instanceof Node ? event.relatedTarget : null;
        if (!event.currentTarget.contains(nextTarget)) setPause("focus", false);
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
        </div>
      </div>
      <div
        className="watch-rail-viewport"
        ref={viewportRef}
        onPointerDown={(event: ReactPointerEvent<HTMLDivElement>) => {
          setPause("pointer", true);
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerUp={releasePointerPause}
        onPointerCancel={releasePointerPause}
        onLostPointerCapture={() => setPause("pointer", false)}
      >
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
