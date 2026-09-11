"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SITE_LINKS } from "@/content/site";

const nav = [
  ["Curadoria", "/collection"],
  ["Ruvro Private", "/private"],
  ["Sobre", "/about"],
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const isDarkContext = pathname === "/" || pathname.startsWith("/private");

  return (
    <header className={`site-header ${isDarkContext ? "site-header--dark" : "site-header--light"}`}>
      <Link className="wordmark" href="/" aria-label="Ruvro & Co — início">
        RUVRO <span>&amp; CO</span>
      </Link>
      <nav className="desktop-nav" aria-label="Navegação principal">
        {nav.map(([label, href]) => {
          const isCurrent = pathname === href || pathname.startsWith(`${href}/`);
          return (
            <Link href={href} key={href} aria-current={isCurrent ? "page" : undefined}>
              {label}
            </Link>
          );
        })}
      </nav>
      <a className="header-cta" href={SITE_LINKS.community} target="_blank" rel="noreferrer">
        Entrar na comunidade
      </a>
      <details className="mobile-menu">
        <summary className="menu-button" role="button" aria-controls="mobile-nav">
          Menu
        </summary>
        <nav id="mobile-nav" className="mobile-nav" aria-label="Navegação móvel">
          {nav.map(([label, href]) => {
            const isCurrent = pathname === href || pathname.startsWith(`${href}/`);
            return (
              <Link href={href} key={href} aria-current={isCurrent ? "page" : undefined}>
                {label}
              </Link>
            );
          })}
          <a href={SITE_LINKS.community} target="_blank" rel="noreferrer">
            Entrar na comunidade
          </a>
        </nav>
      </details>
    </header>
  );
}
