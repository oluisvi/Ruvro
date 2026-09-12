"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type FocusEvent as ReactFocusEvent, type KeyboardEvent as ReactKeyboardEvent, type PointerEvent as ReactPointerEvent } from "react";

const FRAMES = [
  "/media/watch360/frame-01.webp",
  "/media/watch360/frame-02.webp",
  "/media/watch360/frame-05.webp",
  "/media/watch360/frame-04.webp",
  "/media/watch360/frame-03.webp",
  "/media/watch360/frame-06.webp",
] as const;

const AUTOROTATE_MS = 1150;
const DRAG_STEP_PX = 44;

function wrapFrame(value: number) {
  return (value + FRAMES.length) % FRAMES.length;
}

export function Watch360Viewer() {
  const rootRef = useRef<HTMLDivElement>(null);
  const dragXRef = useRef<number | null>(null);
  const dragFrameRef = useRef(0);
  const [frame, setFrame] = useState(0);
  const [visible, setVisible] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [focusWithin, setFocusWithin] = useState(false);
  const [reduced, setReduced] = useState(false);
  const running = visible && !hovered && !dragging && !focusWithin && !reduced;

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.08 });
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!window.matchMedia) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => setFrame((value) => wrapFrame(value + 1)), AUTOROTATE_MS);
    return () => window.clearInterval(timer);
  }, [running]);

  const step = (direction: -1 | 1) => setFrame((value) => wrapFrame(value + direction));

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.button !== 0 || (event.target instanceof Element && event.target.closest("button"))) return;
    dragXRef.current = event.clientX;
    dragFrameRef.current = frame;
    setDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (dragXRef.current === null) return;
    const delta = event.clientX - dragXRef.current;
    const steps = Math.trunc(delta / DRAG_STEP_PX);
    if (steps !== 0) setFrame(wrapFrame(dragFrameRef.current - steps));
  };

  const endDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    dragXRef.current = null;
    setDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  };

  const onKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      step(-1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      step(1);
    }
  };

  return (
    <div
      ref={rootRef}
      className="detail-image watch360-viewer"
      role="region"
      aria-label="Visualizador 360 do relógio"
      tabIndex={0}
      data-watch-frame={frame + 1}
      data-autorotate={running ? "running" : "paused"}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={(event: ReactFocusEvent<HTMLDivElement>) => {
        const target = event.target instanceof HTMLElement ? event.target : null;
        if (target?.matches(":focus-visible")) setFocusWithin(true);
      }}
      onBlurCapture={(event: ReactFocusEvent<HTMLDivElement>) => {
        const next = event.relatedTarget instanceof Node ? event.relatedTarget : null;
        if (!event.currentTarget.contains(next)) setFocusWithin(false);
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onKeyDown={onKeyDown}
    >
      <div className="watch360-head" aria-hidden="true">
        <span>360°</span>
        <span>Arraste para explorar</span>
      </div>

      <div className="watch360-stage" aria-hidden="true" data-watch-frame={frame + 1}>
        <div className="watch360-halo" />
        {FRAMES.map((src, index) => (
          <Image
            key={src}
            src={src}
            alt=""
            fill
            sizes="(max-width: 900px) 100vw, 54vw"
            className={`watch360-frame${index === frame ? " is-active" : ""}`}
            priority={index === 0}
          />
        ))}
      </div>

      <div className="watch360-footer">
        <button type="button" className="watch360-arrow" aria-label="Ângulo anterior" onClick={() => step(-1)}>
          <span aria-hidden="true">←</span>
        </button>
        <div className="watch360-progress" aria-hidden="true">
          <span>{String(frame + 1).padStart(2, "0")}</span>
          <i><b style={{ width: `${((frame + 1) / FRAMES.length) * 100}%` }} /></i>
          <span>{String(FRAMES.length).padStart(2, "0")}</span>
        </div>
        <button type="button" className="watch360-arrow" aria-label="Próximo ângulo" onClick={() => step(1)}>
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  );
}
