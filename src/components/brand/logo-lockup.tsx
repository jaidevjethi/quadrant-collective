import { LogoMark } from "./logo-mark";

type LogoLockupProps = {
  size?: "sm" | "md" | "lg";
  className?: string;
};

const SIZES = {
  sm: { mark: 32, name: "text-sm", sub: "text-[0.5rem]" },
  md: { mark: 44, name: "text-lg", sub: "text-[0.6rem]" },
  lg: { mark: 64, name: "text-2xl", sub: "text-[0.72rem]" },
} as const;

/**
 * Horizontal lockup: mark + QUADRANT / COLLECTIVE wordmark.
 * The wordmark carries the accessible name; the mark is decorative.
 */
export function LogoLockup({ size = "md", className }: LogoLockupProps) {
  const s = SIZES[size];

  return (
    <span className={`inline-flex items-center gap-3 ${className ?? ""}`}>
      <LogoMark size={s.mark} decorative />
      <span className="flex flex-col">
        <span
          className={`${s.name} font-semibold uppercase leading-none tracking-[0.22em] text-clarity`}
        >
          Quadrant
        </span>
        <span
          className={`${s.sub} mt-1.5 bg-gradient-to-r from-vision via-intelligence to-growth bg-clip-text font-medium uppercase leading-none tracking-[0.46em] text-transparent`}
        >
          Collective
        </span>
      </span>
    </span>
  );
}
