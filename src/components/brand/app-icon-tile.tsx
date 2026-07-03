import { LogoMark } from "./logo-mark";

/**
 * App-icon presentation of the mark: dark rounded tile with a faint
 * coordinate grid and a soft top light, per the board's icon panel.
 */
export function AppIconTile({
  size = 96,
  tone = "color",
  className,
}: {
  size?: number;
  tone?: "color" | "mono";
  className?: string;
}) {
  return (
    <div
      style={{ width: size, height: size }}
      className={`relative flex items-center justify-center overflow-hidden rounded-[22%] border border-hairline bg-[#0b0d11] ${className ?? ""}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
          backgroundSize: `${size / 4}px ${size / 4}px`,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.07] via-transparent to-transparent"
      />
      <LogoMark size={size * 0.58} tone={tone} decorative />
    </div>
  );
}
