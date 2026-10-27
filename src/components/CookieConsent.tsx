"use client";

import { setCookieConsent, useCookieConsent } from "@/lib/cookieConsent";

export default function CookieConsent() {
  const consent = useCookieConsent();

  const accept = () => setCookieConsent("accepted");
  const decline = () => setCookieConsent("declined");

  if (consent !== null) return null;

  const button =
    "flex-1 py-2.5 rounded-lg border-2 border-ink dark:border-white text-sm font-semibold text-ink dark:text-white hover:bg-surface dark:hover:bg-surface-night transition-colors";

  return (
    // Mobile: sits above the fixed Quick exit button. sm+: bottom-left, clear of it.
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed z-50 inset-x-2 bottom-20 sm:inset-x-auto sm:left-5 sm:bottom-6 sm:w-80 p-4 sm:p-5 rounded-2xl bg-white dark:bg-surface-raised-night shadow-[0_4px_24px_rgba(0,0,0,0.15)]"
    >
      <p className="text-sm text-ink dark:text-white leading-relaxed mb-4">
        We use cookies to understand how people use this site.{" "}
        <a href="/privacy-policy" className="underline hover:text-brand transition-colors">
          Privacy policy
        </a>
      </p>
      <div className="flex gap-2">
        <button onClick={decline} className={button}>
          Decline
        </button>
        <button onClick={accept} className={button}>
          Accept
        </button>
      </div>
    </div>
  );
}
