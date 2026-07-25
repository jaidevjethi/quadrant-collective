/**
 * What we hold to. The single source for the three principles, which the
 * homepage difference beat and the About page both render.
 *
 * The test each one has to pass: a competent competitor could honestly
 * disagree with it. "We value quality" fails that test, which is why it is
 * on every agency site. Each principle here costs us something, and the body
 * says what it costs. Copy obeys the hard bans (no dashes, no slop, and no
 * "X, not Y", which had become the site's default sentence shape).
 */

export type Principle = {
  n: string;
  title: string;
  body: string;
};

export const principles: Principle[] = [
  {
    n: "01",
    title: "It has to still be good in five years",
    body: "That rules out trends, template shortcuts, and anything we could not maintain ourselves. It also means we turn down work that would only look good on launch day.",
  },
  {
    n: "02",
    title: "We will not sell you one piece and call it a plan",
    body: "If your positioning is the real problem, a new website will not fix it, and we will say so before you spend. Plenty of studios would take the project anyway.",
  },
  {
    n: "03",
    title: "We only claim what a client can confirm",
    body: "Every number on this site belongs to a business that can verify it. If we cannot source a claim, it does not go up. That is why you will see fewer logos here than on most agency sites.",
  },
];
