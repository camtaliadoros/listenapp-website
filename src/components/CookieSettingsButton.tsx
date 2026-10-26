"use client";

import { resetCookieConsent } from "@/lib/cookieConsent";

export default function CookieSettingsButton() {
  return (
    <button
      type="button"
      onClick={resetCookieConsent}
      className="text-sm text-muted-light hover:text-white transition-colors"
    >
      Cookie settings
    </button>
  );
}
