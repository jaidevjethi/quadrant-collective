/**
 * Image loader for static export: assets in /public are pre-optimized WebP,
 * so the only job here is prefixing the GitHub Pages basePath (next/image
 * does not apply basePath to src on export). No-op without a basePath.
 */
export default function imageLoader({ src }: { src: string }): string {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  if (src.startsWith("/")) return `${basePath}${src}`;
  return src;
}
