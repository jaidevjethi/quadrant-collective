import { Archivo, Geist, Geist_Mono } from "next/font/google";

/**
 * Geist Sans (Vercel, OFL, variable) — pairs with Geist Mono below as one
 * coherent type family instead of two unrelated ones. Stands in for Aeonik
 * from the brand board; swapping in a licensed Aeonik later only requires
 * changing this declaration.
 */
export const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

/** The monospace "instrument layer": micro-labels, coordinates, numbers. */
export const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

/**
 * The display face — wordmark AND headlines (founder decision 2026-07-04,
 * chosen from a 10-candidate audition at /typefaces, since removed): the
 * extended letterforms that set QUADRANT™ also set hero H1s and section
 * titles — one display voice across the brand. Always rendered with
 * `font-stretch: 125%`; the `font-heading` utility in globals.css applies
 * family and stretch together. Body/UI text stays on Geist Sans; display
 * type is reserved for the highest-weight moments on a page.
 */
export const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  axes: ["wdth"],
  display: "swap",
});
