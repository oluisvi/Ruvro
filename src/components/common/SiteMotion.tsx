"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect } from "react";

// Reveal units of reading, never primary actions or entire tall sections.
const REVEAL_SELECTORS = [
  ".manifesto > h2", ".section-heading", ".watch-card",
  ".detail-copy", ".founder-layout > h2", ".final-cta > h2",
].join(",");

export function SiteMotion() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (!window.matchMedia || !("IntersectionObserver" in window)) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const nodes = Array.from(document.querySelectorAll<HTMLElement>(REVEAL_SELECTORS));
    let observer: IntersectionObserver | undefined;
    const reveal = (node: HTMLElement) => {
      node.dataset.motionState = "visible";
      observer?.unobserve(node);
    };
    const configure = () => {
      observer?.disconnect();
      if (preference.matches) {
        nodes.forEach(reveal);
        document.body.classList.remove("motion-ready");
        return;
      }
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) reveal(entry.target as HTMLElement);
        });
      }, { threshold: 0, rootMargin: "0px 0px -24px 0px" });
      nodes.forEach((node) => {
        node.dataset.motion = "reveal";
        // Initial viewport and restored positions must not flash or wait.
        if (node.getBoundingClientRect().top < innerHeight || node.contains(document.activeElement)) reveal(node);
        if (node.dataset.motionState !== "visible") observer?.observe(node);
      });
      document.body.classList.add("motion-ready");
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
      preference.removeEventListener("change", configure);
      document.removeEventListener("focusin", onFocus);
      document.body.classList.remove("motion-ready");
      nodes.forEach((node) => {
        delete node.dataset.motion;
        delete node.dataset.motionState;
      });
    };
  }, [pathname]);

  return null;
}
