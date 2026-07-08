/**
 * Route transition: every navigation re-mounts this template, so the page
 * eases in with a short fade-rise. Pure CSS (globals.css .route-enter),
 * export-safe, disabled under prefers-reduced-motion by the global rule.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="route-enter flex flex-1 flex-col">{children}</div>;
}
