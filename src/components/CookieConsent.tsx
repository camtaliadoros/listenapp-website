"use client";

import { setCookieConsent, useCookieConsent } from "@/lib/cookieConsent";

export default function CookieConsent() {
  const consent = useCookieConsent();

  const accept = () => setCookieConsent("accepted");
  const decline = () => setCookieConsent("declined");

  if (consent !== null) return null;

  return (
    // Extra bottom (mobile) / right (sm+) padding keeps the buttons clear of the fixed Quick exit button
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 pb-20 sm:pb-4 sm:pr-48 md:p-6 md:pr-48 bg-ink border-t border-white/10">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
        <p className="text-sm text-white/75 leading-relaxed max-w-2xl">
          We use cookies to analyse how people use our site. This helps us improve the experience for everyone.
          Read our{" "}
          <a href="/privacy-policy" className="underline text-white hover:text-brand transition-colors">
            privacy policy
          </a>
          .
        </p>
        <div className="flex gap-3 flex-shrink-0">
          <button
            onClick={decline}
            className="text-sm font-semibold text-white/60 hover:text-white transition-colors px-4 py-2"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="text-sm font-semibold bg-brand text-white px-5 py-2 rounded-lg hover:bg-brand-hover transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
