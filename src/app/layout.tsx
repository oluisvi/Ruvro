import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { SiteMotion } from "@/components/common/SiteMotion";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { siteUrl } from "@/lib/site-url";
import "@/styles/global.css";
import "@/styles/motion.css";
import "@/styles/content-refresh.css";
import "@/styles/motion-enhancements.css";

const display = Cormorant_Garamond({ subsets: ["latin"], variable: "--font-display", weight: ["400", "500", "600"], display: "swap" });
const sans = Manrope({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl), title: { default: "Ruvro & Co — Curadoria privada", template: "%s — Ruvro & Co" },
  description: "Curadoria privada e acesso em primeira mão para clientes e colecionadores de relógios.",
  openGraph: { title: "Ruvro & Co", description: "Curadoria privada. Acesso em primeira mão.", type: "website", locale: "pt_BR" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR" data-scroll-behavior="smooth" className={`${display.variable} ${sans.variable}`}><body><a className="skip-link" href="#conteudo">Pular para o conteúdo</a><SiteMotion /><SiteHeader />{children}<SiteFooter /></body></html>;
}
