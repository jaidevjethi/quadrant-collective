import { LogoMark } from "@/components/brand/logo-mark";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-10 px-gutter py-section text-center">
      <LogoMark size={140} variant="construction" glow />
      <div className="flex flex-col gap-4">
        <h1 className="text-headline font-medium text-clarity">
          Quadrant Collective
        </h1>
        <p className="mx-auto max-w-md text-lead text-muted-2">
          Strategy. Design. Technology. Growth.
          <br />
          Four disciplines. One impact.
        </p>
      </div>
      <span className="label-mono text-faint">
        Digital headquarters — under construction
      </span>
    </main>
  );
}
