"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { SITE_COPY, SITE_LINKS } from "@/content/site";

export function CuratorsLightHero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!window.matchMedia || !("IntersectionObserver" in window)) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const compact = window.matchMedia("(max-width: 900px), (max-height: 700px)");
    const section = sectionRef.current;
    if (!section) return;
    let frame = 0;
    let active = false;
    const update = () => {
      frame = 0;
      const max = section.offsetHeight - innerHeight;
      const progress = Math.min(1, Math.max(0, -section.getBoundingClientRect().top / Math.max(max, 1)));
      section.style.setProperty("--hero-progress", progress.toFixed(4));
      section.dataset.stage = String(Math.min(3, Math.floor(progress * 4)));
      section.dataset.scrolled = String(progress > .02);
    };
    const onScroll = () => { if (active && !frame) frame = requestAnimationFrame(update); };
    const observer = new IntersectionObserver(([entry]) => {
      active = entry.isIntersecting;
      onScroll();
    });
    const configure = () => {
      observer.disconnect();
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      active = false;
      section.style.removeProperty("--hero-progress");
      delete section.dataset.stage;
      delete section.dataset.scrolled;
      if (preference.matches || compact.matches) return;
      observer.observe(section);
      update();
      addEventListener("scroll", onScroll, { passive: true });
      addEventListener("resize", onScroll, { passive: true });
    };
    configure();
    preference.addEventListener("change", configure);
    compact.addEventListener("change", configure);
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", configure);
      compact.removeEventListener("change", configure);
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className="hero-timeline" ref={sectionRef} aria-labelledby="hero-title">
      <div className="hero-sticky">
        <div className="hero-light" aria-hidden="true" />
        <div className="hero-copy">
          <p className="hero-note">Ruvro &amp; Co</p>
          <h1 id="hero-title">{SITE_COPY.heroTitle}</h1>
          <p className="hero-body">{SITE_COPY.heroBody}</p>
          <div className="hero-actions"><Link className="button button-light" href="/collection">Explorar a curadoria <span aria-hidden="true">→</span></Link><a className="text-link" href={SITE_LINKS.community} target="_blank" rel="noreferrer">Entrar na comunidade <span aria-hidden="true">↗</span></a></div>
        </div>
        <div className="hero-watch">
          <Image src="/media/hero-watch.png" alt="Estudo visual demonstrativo de um relógio de aço sem marca" loading="eager" fetchPriority="high" fill sizes="(max-width: 600px) 88vw, (max-width: 900px) 480px, (max-height: 700px) 480px, (min-width: 1636px) 736px, 45vw" />
        </div>
        <ol className="hero-state" aria-hidden="true">{["Silhueta", "Luz", "Matéria", "Presença"].map((label, index) => <li key={label}><span>0{index + 1}</span>{label}</li>)}</ol>
        <p className="hero-demo">Imagem conceitual · demonstração</p>
        <div className="scroll-cue" aria-hidden="true"><span /> Role para revelar</div>
      </div>
    </section>
  );
}
