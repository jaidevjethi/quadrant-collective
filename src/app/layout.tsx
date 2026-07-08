import type { Metadata } from "next";
import { archivo, geistSans, geistMono } from "@/lib/fonts";
import { LenisProvider } from "@/components/providers/lenis-provider";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/sections/site-footer";
import { WhatsAppFab } from "@/components/ui/whatsapp-fab";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Quadrant Collective. Strategy. Design. Technology. Growth.",
    template: "%s | Quadrant Collective",
  },
  description:
    "Quadrant Collective is a digital engineering and growth firm. We bring strategy, design, technology and growth together as one system, so businesses don't just grow, they scale.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Quadrant Collective",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og.png"],
  },
};

import { DeepSpaceBg } from "@/components/motion/deep-space-bg";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${archivo.variable} h-full antialiased dark`}
    >
      <body className="flex min-h-full flex-col bg-[#0A0A0A] text-foreground">
        <DeepSpaceBg />
        <LenisProvider>
          <SiteHeader />
          <main className="flex flex-1 flex-col pb-28 md:pb-0 relative z-10">
            {children}
          </main>
          <SiteFooter />
          <WhatsAppFab />
        </LenisProvider>
      </body>
    </html>
  );
}
