import type { Metadata } from "next";
import type { ReactNode } from "react";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Header from "@/components/layout/Header";
import "./globals.css";
import Preloader from "@/components/layout/Preloader";
import ScrollProgress from "@/components/layout/ScrollProgress";
import CookieConsent from "@/components/layout/CookieConsent";

export const metadata: Metadata = {
  title: "ERA Residence — A place to return to",
  description: "Contemporary Mediterranean residences in Estepona.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-era-cream font-body text-era-ink antialiased">
        <a
          href="#main-content"
          className="fixed left-4 top-4 z-[100] -translate-y-24 bg-era-cream px-4 py-3 text-sm focus:translate-y-0"
        >
          Skip to content
        </a>
        <SmoothScroll>
          <Header />
          <ScrollProgress />
          <Preloader />
          <CookieConsent />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
