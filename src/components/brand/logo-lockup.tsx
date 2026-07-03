import { LogoMark } from "./logo-mark";

type LogoLockupProps = {
  size?: "sm" | "md" | "lg";
  orientation?: "horizontal" | "stacked";
  tone?: "color" | "mono";
  className?: string;
};

const SIZES = {
  sm: { mark: 32, name: "text-sm", sub: "text-[0.5rem]" },
  md: { mark: 44, name: "text-xl", sub: "text-[0.6rem]" },
  lg: { mark: 72, name: "text-4xl", sub: "text-[0.8rem]" },
} as const;

/**
 * Wordmark lockup per the brand board: QUADRANT™ in Archivo Expanded,
 * COLLECTIVE letter-spaced in the vision→intelligence→growth gradient.
 * The wordmark carries the accessible name; the mark is decorative.
 */
export function LogoLockup({
  size = "md",
  orientation = "horizontal",
  tone = "color",
  className,
}: LogoLockupProps) {
  const s = SIZES[size];
  const mono = tone === "mono";

  const name = (
    <span
      className={`${s.name} font-display font-bold uppercase leading-none tracking-[0.14em] text-clarity [font-stretch:125%]`}
    >
      Quadrant
      <sup className="ml-0.5 align-super text-[0.4em] font-medium opacity-50">
        ™
      </sup>
    </span>
  );

  const sub = (
    <span
      className={`${s.sub} font-medium uppercase leading-none tracking-[0.5em] ${
        mono
          ? "text-clarity/60"
          : "bg-gradient-to-r from-vision via-intelligence to-growth bg-clip-text text-transparent"
      }`}
    >
      Collective
    </span>
  );

  if (orientation === "stacked") {
    return (
      <span className={`inline-flex flex-col items-center ${className ?? ""}`}>
        <LogoMark size={s.mark * 1.6} tone={tone} decorative />
        <span className="mt-5">{name}</span>
        <span className="mt-2.5">{sub}</span>
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center gap-3 ${className ?? ""}`}>
      <LogoMark size={s.mark} tone={tone} decorative />
      <span className="flex flex-col">
        {name}
        <span className="mt-1.5">{sub}</span>
      </span>
    </span>
  );
}
