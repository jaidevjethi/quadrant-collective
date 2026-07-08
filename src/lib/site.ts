/**
 * Canonical site origin — used for metadataBase, canonical URLs, schema, and
 * sitemap. While the brand domain (quadrantcollective.in, STRATEGY open
 * decision #1) is unregistered, CI points this at the live GitHub Pages URL
 * via NEXT_PUBLIC_SITE_URL so shares and canonicals resolve today; when the
 * domain goes live, update the workflow env (or drop it) and redeploy.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://quadrantcollective.in";
