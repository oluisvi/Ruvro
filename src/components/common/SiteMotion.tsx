"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect } from "react";

const REVEAL_SELECTORS = [
  ".manifesto > .section-kicker",
  ".manifesto > h2",
  ".manifesto > p:last-child",
  ".section-heading > div",
  ".section-heading > p",
  ".featured > .dark-link",
  ".detail-copy > .section-kicker",
  ".detail-copy > h2",
  ".detail-copy > p",
  ".detail-lines > span",
  ".private-scene > div > .section-kicker",
  ".private-scene > div > h2",
  ".private-scene > div > p",
  ".private-scene > div > a",
  ".private-scene > aside",
  ".founders > .section-kicker",
  ".founder-layout > h2",
  ".founder-layout > div",
  ".final-cta > .section-kicker",
  ".final-cta > h2",
  ".final-cta > a",
  ".page-intro > div",
  ".page-intro > p",
  ".page-intro > .page-lede",
  ".page-back-link",
  ".watch-detail-copy > .section-kicker",
  ".watch-detail-copy > h1",
  ".watch-detail-copy > p",
  ".watch-detail-copy > .fact-list",
  ".watch-detail-copy > a",
].join(",");

const PROGRESS_SELECTORS = [".detail-scene", ".private-scene", ".final-cta"];

function clamp(value: number) {
  return Math.min(1, Math.max(0, value));
}

export function SiteMotion() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    const body = document.body;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealNodes = Array.from(document.querySelectorAll<HTMLElement>(REVEAL_SELECTORS));
    const cards = Array.from(document.querySelectorAll<HTMLElement>(".watch-card"));

    revealNodes.forEach((node) => {
      node.dataset.motion = "reveal";
    });

    cards.forEach((card, index) => {
      card.dataset.motion = "reveal";
      card.style.setProperty("--motion-order", String(index % 3));
    });

    if (reduceMotion) {
      [...revealNodes, ...cards].forEach((node) => {
        node.dataset.motionState = "visible";
      });
      body.classList.remove("motion-ready");
      return;
    }

    body.classList.add("motion-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const node = entry.target as HTMLElement;
          node.dataset.motionState = "visible";
          observer.unobserve(node);
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 },
    );

    [...revealNodes, ...cards].forEach((node) => observer.observe(node));

    const progressNodes = PROGRESS_SELECTORS.flatMap((selector) =>
      Array.from(document.querySelectorAll<HTMLElement>(selector)),
    );

    let frame = 0;
    const updateProgress = () => {
      frame = 0;
      const viewport = window.innerHeight;

      progressNodes.forEach((node) => {
        const rect = node.getBoundingClientRect();
        const progress = clamp((viewport - rect.top) / Math.max(viewport + rect.height, 1));
        node.style.setProperty("--scene-progress", progress.toFixed(4));
      });
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
      body.classList.remove("motion-ready");
      [...revealNodes, ...cards].forEach((node) => {
        delete node.dataset.motion;
        delete node.dataset.motionState;
        node.style.removeProperty("--motion-order");
      });
      progressNodes.forEach((node) => node.style.removeProperty("--scene-progress"));
    };
  }, [pathname]);

  return null;
}
