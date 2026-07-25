/**
 * Copy linter. Reads the BUILT HTML in out/ so it only ever judges what a
 * visitor actually sees: code comments, unrendered data and JSDoc are not
 * copy and are not linted.
 *
 * The dash ban was being observed perfectly while the formula bans were the
 * least-observed rule in CLAUDE.md, which is exactly what an unenforced rule
 * looks like. This makes them checkable.
 *
 *   node scripts/copy-lint.mjs
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOT = "out";
const IGNORE_ROUTES = [/\/styleguide\//];

/** Strip tags, scripts, styles and JSON-LD; return visible prose. */
function visibleText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#x27;|&apos;|&rsquo;/g, "'")
    .replace(/&ldquo;|&rdquo;|&quot;/g, '"')
    .replace(/&middot;/g, "·")
    .replace(/\s+/g, " ")
    .trim();
}

const SLOP = [
  "delve", "leverage", "robust", "seamless", "elevate", "unlock", "unleash",
  "empower", "harness", "cutting-edge", "world-class", "transformative",
  "holistic", "realm", "testament", "myriad", "plethora", "vibrant",
  "dynamic", "innovative", "supercharge", "results-driven", "one-stop",
  "end-to-end", "digital transformation", "industry-leading",
  "premium solutions", "creative excellence", "passionate",
];

const RULES = [
  {
    id: "dash",
    label: "em/en dash or double hyphen",
    test: (t) => [...t.matchAll(/[^\s]*\s?[—–]\s?[^\s]*|\S+--\S+/g)].map((m) => m[0]),
  },
  {
    id: "slop",
    label: "banned vocabulary",
    test: (t) => {
      const hits = [];
      for (const w of SLOP) {
        const re = new RegExp(`\\b${w.replace(/[-]/g, "[- ]")}\\b`, "gi");
        for (const m of t.matchAll(re)) hits.push(m[0]);
      }
      return hits;
    },
  },
  {
    id: "antithesis",
    label: '"X, not Y" antithesis (cap: 1 per page)',
    max: 1,
    test: (t) =>
      [...t.matchAll(/[^.!?]{0,70}\b,\s+not\s+(?:just\s+)?[a-z][^.!?]{0,40}[.!?]/gi)].map((m) =>
        m[0].trim(),
      ),
  },
  {
    id: "notjust",
    label: '"not just X" / "don\'t just X"',
    test: (t) => [...t.matchAll(/\b(?:not|don't|doesn't)\s+just\s+[^.!?]{0,45}/gi)].map((m) => m[0].trim()),
  },
  {
    id: "sweep",
    label: '"from X to Y" sweep',
    test: (t) => [...t.matchAll(/\bfrom\s+(?:a\s+|an\s+|the\s+)?[a-z][^.!?]{3,40}?\s+to\s+(?:a\s+|an\s+|the\s+)[a-z][^.!?]{3,40}?[.,]/gi)].map((m) => m[0].trim()),
  },
  {
    id: "opener",
    label: "hollow opener",
    test: (t) => [...t.matchAll(/\b(?:In a world where|Imagine (?:a|if|the)|not only[^.!?]{0,40}but also)\b/gi)].map((m) => m[0]),
  },
];

function walk(dir, out = []) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (e.endsWith(".html")) out.push(p);
  }
  return out;
}

let files;
try {
  files = walk(ROOT).filter((f) => !IGNORE_ROUTES.some((re) => re.test(f.replace(/\\/g, "/"))));
} catch {
  console.error(`No ${ROOT}/ directory. Run \`npx next build\` first.`);
  process.exit(2);
}

let violations = 0;
for (const file of files) {
  const text = visibleText(readFileSync(file, "utf8"));
  for (const rule of RULES) {
    const hits = rule.test(text);
    const allowed = rule.max ?? 0;
    if (hits.length > allowed) {
      violations += hits.length - allowed;
      console.log(`\n${file.replace(/\\/g, "/")}`);
      console.log(`  ${rule.label}: ${hits.length} (allowed ${allowed})`);
      for (const h of hits.slice(0, 6)) console.log(`    "${h}"`);
    }
  }
}

console.log(
  violations === 0
    ? `\nCopy lint clean across ${files.length} pages.`
    : `\n${violations} copy violation(s) across ${files.length} pages.`,
);
process.exit(violations === 0 ? 0 : 1);
