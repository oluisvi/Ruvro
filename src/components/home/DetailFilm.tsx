"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

type Connection = EventTarget & { saveData?: boolean; effectiveType?: string };

export function DetailFilm() {
  const frameRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    const video = videoRef.current;
    if (!frame || !video || !window.matchMedia || !("IntersectionObserver" in window)) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const compact = window.matchMedia("(max-width: 900px)");
    const connection = (navigator as Navigator & { connection?: Connection }).connection;
    let visible = false;
    let disposed = false;
    let failed = false;
    let suspended = false;
    let userPaused = false;
    let started = false;
    let finished = false;
    let loadedPage = document.readyState === "complete";
    const allowed = () => !reduced.matches && !connection?.saveData && !["slow-2g", "2g"].includes(connection?.effectiveType ?? "");
    const suspend = () => {
      suspended = true;
      video.pause();
    };
    const update = () => {
      if (disposed) return;
      if (!allowed()) {
        suspend();
        delete frame.dataset.filmReady;
        // Abort pending media requests when motion/data preferences change.
        if (video.hasAttribute("src")) {
          video.removeAttribute("src");
          video.load();
        }
        return;
      }
      if (!visible || document.hidden) { suspend(); return; }
      if (!loadedPage || failed) return;
      if (!video.hasAttribute("src")) {
        video.src = compact.matches ? "/media/detail-film-mobile.mp4" : "/media/detail-film.mp4";
      }
      if (finished || userPaused) return;
      suspended = false;
      void video.play().catch(() => {
        // Autoplay denial leaves a usable poster and native manual controls.
        if (!disposed && allowed()) userPaused = true;
      });
    };
    const ready = () => { if (!disposed && allowed() && !failed) frame.dataset.filmReady = "true"; };
    const playing = () => { started = true; userPaused = false; finished = false; ready(); };
    const pause = () => { if (!suspended && started && !video.ended) userPaused = true; };
    const ended = () => { finished = true; };
    const error = () => { failed = true; suspend(); delete frame.dataset.filmReady; };
    const pageLoaded = () => { loadedPage = true; update(); };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting && entry.intersectionRatio >= .2;
      update();
    }, { threshold: [0, .2] });
    video.addEventListener("loadeddata", ready);
    video.addEventListener("playing", playing);
    video.addEventListener("pause", pause);
    video.addEventListener("ended", ended);
    video.addEventListener("error", error);
    reduced.addEventListener("change", update);
    connection?.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    window.addEventListener("load", pageLoaded);
    observer.observe(frame);
    return () => {
      disposed = true;
      observer.disconnect();
      reduced.removeEventListener("change", update);
      connection?.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", update);
      window.removeEventListener("load", pageLoaded);
      video.removeEventListener("loadeddata", ready);
      video.removeEventListener("playing", playing);
      video.removeEventListener("pause", pause);
      video.removeEventListener("ended", ended);
      video.removeEventListener("error", error);
      video.pause();
      video.removeAttribute("src");
      video.load();
      delete frame.dataset.filmReady;
    };
  }, []);

  return (
    <figure className="detail-film" ref={frameRef}>
      <div className="detail-film-frame">
        <Image src="/media/detail-film-poster.jpg" alt="Estudo demonstrativo do mostrador grafite, aro e coroa de um relógio de aço sem marca" fill sizes="(max-width: 900px) 100vw, 63vw" />
        <video ref={videoRef} muted playsInline controls preload="none" aria-label="Estudo visual do detalhe do relógio, sem áudio" />
      </div>
      <figcaption>Estudo visual em movimento · demonstração</figcaption>
    </figure>
  );
}
