import localFont from "next/font/local";
import { Geist_Mono } from "next/font/google";

/**
 * General Sans (Fontshare, free for commercial use — license in src/fonts/).
 * Stands in for Aeonik from the brand board; swapping in a licensed Aeonik
 * later only requires changing this declaration.
 */
export const generalSans = localFont({
  src: "../fonts/GeneralSans-Variable.woff2",
  variable: "--font-general-sans",
  weight: "200 700",
  display: "swap",
});

/** The monospace "instrument layer": micro-labels, coordinates, numbers. */
export const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});
