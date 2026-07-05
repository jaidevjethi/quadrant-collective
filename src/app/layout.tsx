import type { Metadata } from "next";
import { archivo, geistSans, geistMono } from "@/lib/fonts";
import { LenisProvider } from "@/components/providers/lenis-provider";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/sections/site-footer";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Quadrant Collective. Strategy. Design. Technology. Growth.",
    template: "%s · Quadrant Collective",
  },
  description:
    "Quadrant Collective is a digital engineering and growth firm. We bring strategy, design, technology and growth together as one system, so businesses don't just grow, they scale.",
  alternates: { canonical: "/" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${archivo.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <LenisProvider>
          <SiteHeader />
          {children}
          <SiteFooter />
        </LenisProvider>
      </body>
    </html>
  );
}
