"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { SITE_COPY, SITE_LINKS } from "@/content/site";

export function CuratorsLightHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const watchRef = useRef<HTMLDivElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const section = sectionRef.current;
      if (!section || !watchRef.current) return;
      const max = section.offsetHeight - innerHeight;
      const progress = Math.min(1, Math.max(0, -section.getBoundingClientRect().top / Math.max(max, 1)));
      watchRef.current.style.setProperty("--hero-progress", progress.toString());
      lightRef.current?.style.setProperty("--hero-progress", progress.toString());
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update(); addEventListener("scroll", onScroll, { passive: true });
    return () => { removeEventListener("scroll", onScroll); if (frame) cancelAnimationFrame(frame); };
  }, []);

  return (
    <section className="hero-timeline" ref={sectionRef} aria-labelledby="hero-title">
      <div className="hero-sticky">
        <div className="hero-light" ref={lightRef} />
        <div className="hero-copy">
          <p className="hero-note">Ruvro &amp; Co</p>
          <h1 id="hero-title">{SITE_COPY.heroTitle}</h1>
          <p className="hero-body">{SITE_COPY.heroBody}</p>
          <div className="hero-actions"><Link className="button button-light" href="/collection">Explorar a curadoria <span aria-hidden="true">→</span></Link><a className="text-link" href={SITE_LINKS.community} target="_blank" rel="noreferrer">Entrar na comunidade <span aria-hidden="true">↗</span></a></div>
        </div>
        <div className="hero-watch" ref={watchRef}>
          <Image src="/media/hero-watch.png" alt="Estudo visual demonstrativo de um relógio de aço sem marca" priority fill sizes="(max-width: 767px) 88vw, 50vw" />
        </div>
        <div className="hero-state" aria-hidden="true"><span>01</span><p>Silhueta<br />Luz<br />Matéria<br />Presença</p></div>
        <p className="hero-demo">Imagem conceitual · demonstração</p>
        <div className="scroll-cue" aria-hidden="true"><span /> Role para revelar</div>
      </div>
    </section>
  );
}
