"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect } from "react";

type MotionVariant = "soft" | "title" | "card" | "line";

type MotionGroup = {
  selector: string;
  variant?: MotionVariant;
};

// Motion follows reading order. The hero is intentionally absent from every selector.
const MOTION_GROUPS: MotionGroup[] = [
  { selector: ".manifesto > .section-kicker, .manifesto > h2, .manifesto > p:last-child" },
  { selector: ".featured .section-heading .section-kicker, .featured .section-heading h2, .featured .section-heading > p" },
  { selector: ".watch-rail-toolbar, [data-rail-set=\"original\"] > .watch-card" },
  { selector: ".detail-copy > .section-kicker, .detail-copy > h2, .detail-copy > p, .detail-lines > span" },
  { selector: ".private-scene > div > .section-kicker, .private-scene > div > h2, .private-scene > div > p, .private-scene > div > .button, .private-scene > aside" },
  { selector: ".founders > .section-kicker, .founder-layout > h2, .founder-layout > div" },
  { selector: ".final-cta > *" },
  { selector: ".page-shell > .page-back-link, .page-intro > *, .page-shell > .watch-grid > .watch-card" },
  { selector: ".watch-detail-copy > *" },
  { selector: ".legal-copy > *" },
  { selector: ".site-footer > *" },
];

function motionVariant(node: HTMLElement): MotionVariant {
  if (node.matches("h1, h2, .page-title")) return "title";
  if (node.matches(".watch-card")) return "card";
  if (node.matches(".detail-lines > span, .fact-row")) return "line";
  return "soft";
}

export function SiteMotion() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (!window.matchMedia || !("IntersectionObserver" in window)) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const nodeOrder = new Map<HTMLElement, number>();
    const nodes: HTMLElement[] = [];

    MOTION_GROUPS.forEach((group) => {
      document.querySelectorAll<HTMLElement>(group.selector).forEach((node, index) => {
        if (!nodeOrder.has(node)) nodes.push(node);
        nodeOrder.set(node, index);
        node.dataset.motionVariant = group.variant ?? motionVariant(node);
      });
    });

    let observer: IntersectionObserver | undefined;
    let initialFrame = 0;
    const reveal = (node: HTMLElement) => {
      node.dataset.motionState = "visible";
      observer?.unobserve(node);
    };
    const configure = () => {
      observer?.disconnect();
      cancelAnimationFrame(initialFrame);
      if (preference.matches) {
        nodes.forEach(reveal);
        document.body.classList.remove("motion-ready");
        return;
      }

      nodes.forEach((node) => {
        delete node.dataset.motionState;
        node.dataset.motion = "reveal";
        node.style.setProperty("--motion-order", String(nodeOrder.get(node) ?? 0));
      });
      document.body.classList.add("motion-ready");

      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) reveal(entry.target as HTMLElement);
        });
      }, { threshold: 0.08, rootMargin: "0px 0px -7% 0px" });

      initialFrame = requestAnimationFrame(() => {
        nodes.forEach((node) => {
          if (node.getBoundingClientRect().top < innerHeight * 0.96 || node.contains(document.activeElement)) reveal(node);
          else observer?.observe(node);
        });
      });
    };
    const onFocus = (event: FocusEvent) => {
      if (!(event.target instanceof Element)) return;
      const node = event.target.closest<HTMLElement>('[data-motion="reveal"]');
      if (node) reveal(node);
    };
    configure();
    preference.addEventListener("change", configure);
    document.addEventListener("focusin", onFocus);
    return () => {
      observer?.disconnect();
      cancelAnimationFrame(initialFrame);
      preference.removeEventListener("change", configure);
      document.removeEventListener("focusin", onFocus);
      document.body.classList.remove("motion-ready");
      nodes.forEach((node) => {
        delete node.dataset.motion;
        delete node.dataset.motionState;
        delete node.dataset.motionVariant;
        node.style.removeProperty("--motion-order");
      });
    };
  }, [pathname]);

  return null;
}
