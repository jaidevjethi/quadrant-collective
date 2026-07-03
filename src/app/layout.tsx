import type { Metadata } from "next";
import { archivo, generalSans, geistMono } from "@/lib/fonts";
import { LenisProvider } from "@/components/providers/lenis-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Quadrant Collective — Strategy. Design. Technology. Growth.",
    template: "%s — Quadrant Collective",
  },
  description:
    "Quadrant Collective is a digital engineering and growth firm. Four disciplines — strategy, design, technology and growth — working as one system, so businesses don't just grow, they scale.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${generalSans.variable} ${geistMono.variable} ${archivo.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
