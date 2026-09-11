import { SITE_LINKS } from "@/content/site";

export function CommunityCta({ inverse = false }: { inverse?: boolean }) {
  return <a className={`button ${inverse ? "button-light" : "button-dark"}`} href={SITE_LINKS.community} target="_blank" rel="noreferrer">Entrar na comunidade <span aria-hidden="true">↗</span></a>;
}
