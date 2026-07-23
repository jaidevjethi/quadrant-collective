import { Reveal } from "@/components/motion/reveal";
import { problems } from "@/lib/problems";
import { disciplines } from "@/lib/capabilities";

/**
 * Beat 2 — The problem (design system: problem-first). The hero states the
 * thesis (a systems problem); this beat makes it concrete by naming the
 * problems a business actually arrives with, in its own words, then reframing
 * each to what it is underneath. Every problem is tagged with the disciplines
 * its real fix spans: almost none live in one place, which is the argument for
 * the system that follows in "What we solve". Value contrast (muted symptom ->
 * clarity stance) carries emphasis; no second accent colour. The gradient
 * registration rule ties the beat to the brand system.
 */
export function ProblemSection() {
  return (
    <section className="px-gutter py-section">
      <div className="mx-auto flex max-w-5xl flex-col gap-12">
        <div className="flex gap-6 lg:gap-10">
          <span
            aria-hidden
            className="w-px shrink-0 self-stretch bg-gradient-to-b from-vision via-intelligence to-growth opacity-60"
          />
          <Reveal className="flex max-w-3xl flex-col gap-6">
            <span data-reveal className="label-mono text-muted-2">
              02 · The problem
            </span>
            <h2
              data-reveal
              className="text-headline font-medium tracking-tight text-muted-2"
            >
              Most business websites are expenses dressed up as assets.{" "}
              <span className="text-clarity">
                The cause is almost always the same.
              </span>
            </h2>
            <p data-reveal className="max-w-xl text-lead text-muted-2">
              The pieces behind them do not work as one system. In practice,
              that shows up as one of these.
            </p>
          </Reveal>
        </div>

        <Reveal className="flex flex-col gap-4">
          <ul
            data-reveal
            className="grid gap-px overflow-hidden rounded-lg border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3"
          >
            {problems.map((p) => (
              <li key={p.id} className="flex flex-col gap-3 bg-depth p-6">
                <h3 className="text-title font-medium text-clarity">
                  {`“${p.symptom}”`}
                </h3>
                <p className="text-sm leading-relaxed text-muted-2">
                  {p.reframe}
                </p>
                <div
                  aria-hidden
                  className="mt-auto flex items-center gap-1.5 pt-2"
                >
                  {p.disciplines.map((d) => (
                    <span
                      key={d}
                      className="size-1.5 rounded-full"
                      style={{ backgroundColor: disciplines[d].color }}
                    />
                  ))}
                </div>
                <span className="sr-only">
                  Disciplines the fix spans:{" "}
                  {p.disciplines.map((d) => disciplines[d].label).join(", ")}
                </span>
              </li>
            ))}
          </ul>
          <p data-reveal className="label-mono text-faint">
            Each dot marks a discipline the real fix touches
          </p>
        </Reveal>

        <Reveal className="max-w-2xl">
          <p data-reveal className="text-lead text-muted-2">
            Almost none of these live in a single discipline. That is why we
            build across{" "}
            <span className="text-clarity">
              strategy, design, technology and growth
            </span>{" "}
            at once, not one service at a time.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
