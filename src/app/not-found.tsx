import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-gutter text-center">
      <span className="label-mono text-muted-2 mb-6">404 Error</span>
      <h1 className="font-heading text-display font-medium text-clarity mb-4">
        Page not found.
      </h1>
      <p className="max-w-md text-lg text-muted-2 mb-10">
        The system couldn't locate this route. It may have been moved or removed.
      </p>
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
    </div>
  );
}
