import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LogoMark } from "@/components/brand/logo-mark";

/**
 * 404 in the brand's own vocabulary: the construction-variant mark (the
 * engineering drawing of the Q) and coordinate language. Static, zero extra
 * JS, two exits: home and the work.
 */
export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-gutter text-center">
      <div aria-hidden className="mb-10 opacity-80">
        <LogoMark size={88} variant="construction" tone="mono" decorative />
      </div>
      <span className="label-mono mb-6 text-muted-2">404 · Off the plane</span>
      <h1 className="mb-4 font-heading text-display font-medium tracking-tight text-clarity">
        These coordinates do not exist.
      </h1>
      <p className="mb-10 max-w-md text-lead text-muted-2">
        The page may have moved, or the address has a typo. Everything that
        does exist is one step away.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
        <Button
          asChild
          size="lg"
          className="h-11 gap-2 rounded-sm border border-hairline-strong bg-transparent px-6 text-clarity shadow-none transition-colors duration-200 ease-[var(--ease-precision)] hover:border-clarity hover:bg-raised"
        >
          <Link href="/">
            Return home
            <ArrowRight className="size-4 transition-transform duration-200 group-hover/button:translate-x-0.5" />
          </Link>
        </Button>
        <Link
          href="/work"
          className="text-sm text-muted-2 underline decoration-hairline-strong underline-offset-4 transition-colors duration-200 hover:text-clarity"
        >
          See the work
        </Link>
      </div>
    </div>
  );
}
