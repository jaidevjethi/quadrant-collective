/**
 * The canonical problem set. The site is organised around the problems a
 * business actually feels, not the services we sell (see the design system,
 * "problem-first"). This is the single source: the homepage problem beat, and
 * later the problem-led entries into /services, both read from here, so the
 * language stays identical everywhere a visitor meets it.
 *
 * Each problem is stated in the visitor's own words (`symptom`), then reframed
 * to what it usually is underneath and why a quick fix misses it (`reframe`).
 * `disciplines` names which parts of the system the real fix spans, which is
 * the whole argument: almost nothing lives in one discipline. Copy obeys the
 * hard bans (no em/en dashes, no slop vocabulary).
 */

import type { DisciplineId } from "@/lib/capabilities";

export type Problem = {
  id: string;
  /** The symptom, in the visitor's own words. */
  symptom: string;
  /** What it usually is underneath, and why a surface fix misses it. */
  reframe: string;
  /** The disciplines the real fix spans (drives the discipline tags). */
  disciplines: DisciplineId[];
};

export const problems: Problem[] = [
  {
    id: "found",
    symptom: "We're hard to find.",
    reframe:
      "Usually a structure problem before a marketing one. Search cannot rank a site it cannot read.",
    disciplines: ["technology", "growth"],
  },
  {
    id: "convert",
    symptom: "People visit, then leave.",
    reframe:
      "Traffic is rarely the gap. The path from landing to action is unclear, so visitors stall.",
    disciplines: ["design", "strategy"],
  },
  {
    id: "unclear",
    symptom: "No one quite gets what we do.",
    reframe:
      "A positioning problem. When the offer is fuzzy, every visitor has to work to understand it, and most will not.",
    disciplines: ["strategy", "design"],
  },
  {
    id: "manual",
    symptom: "Everything runs by hand.",
    reframe:
      "Leads and follow-ups sit in inboxes and spreadsheets, so enquiries slip and people wait.",
    disciplines: ["technology"],
  },
  {
    id: "scattered",
    symptom: "The brand feels scattered.",
    reframe:
      "Site, social and search each tell a slightly different story, so trust leaks at every edge.",
    disciplines: ["strategy", "design", "technology"],
  },
  {
    id: "flat",
    symptom: "Growth has flattened.",
    reframe:
      "The parts work in isolation, so nothing compounds. Effort goes in and little comes back.",
    disciplines: ["growth", "strategy"],
  },
];
