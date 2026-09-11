import Link from "next/link";
import { SITE_LINKS } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div><p className="wordmark">RUVRO <span>&amp; CO</span></p><p>Curadoria privada de relógios.</p></div>
      <nav aria-label="Rodapé">
        <Link href="/collection">Curadoria</Link><Link href="/private">Ruvro Private</Link><Link href="/about">Sobre</Link>
        <a href={SITE_LINKS.instagram} target="_blank" rel="noreferrer">Instagram</a><Link href="/privacy">Privacidade</Link><Link href="/terms">Termos</Link>
      </nav>
      <p className="footer-note">© {new Date().getFullYear()} Ruvro &amp; Co.</p>
    </footer>
  );
}
