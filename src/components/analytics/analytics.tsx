import Script from "next/script";

/**
 * Google Analytics 4 + Microsoft Clarity, wired for the fixed stack but inert
 * until their IDs are provided. Set these in the build environment (they are
 * NEXT_PUBLIC_*, so they are public by design and safe to expose in client JS):
 *
 *   NEXT_PUBLIC_GA_ID       e.g. G-XXXXXXXXXX   (GA4 Measurement ID)
 *   NEXT_PUBLIC_CLARITY_ID  e.g. abcdefghij     (Clarity project ID)
 *
 * With neither set, this renders nothing and ships zero third-party bytes.
 *
 * Loading strategy protects the quality bars (Lighthouse Perf 95+):
 *   - GA uses `afterInteractive`: loads after hydration, never blocks paint.
 *   - Clarity uses `lazyOnload`: loads during browser idle, lowest priority.
 *
 * Client-side route changes: GA4 Enhanced Measurement (on by default) tracks
 * page views from History API changes, which is exactly how Next's client
 * router navigates, so SPA navigations are captured without a manual tracker.
 * If Enhanced Measurement is ever disabled, add a usePathname effect that
 * fires a `page_view` event. Clarity tracks SPA navigation on its own.
 */

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;

export function Analytics() {
  return (
    <>
      {GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
          </Script>
        </>
      )}

      {CLARITY_ID && (
        <Script id="ms-clarity" strategy="lazyOnload">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${CLARITY_ID}");`}
        </Script>
      )}
    </>
  );
}
