"use client";

import { useEffect, useState } from "react";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) setVisible(true);
  }, []);

  function accept() {
    localStorage.setItem("cookieConsent", "accepted");
    setVisible(false);
    window.dispatchEvent(new Event("cookieConsentAccepted"));
  }

  function decline() {
    localStorage.setItem("cookieConsent", "declined");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 bg-ink border-t border-white/10">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
        <p className="text-sm text-white/75 leading-relaxed max-w-2xl">
          We use cookies to analyse how people use our site. This helps us improve the experience for everyone.
          Read our{" "}
          <a href="/privacy" className="underline text-white hover:text-brand transition-colors">
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
            className="text-sm font-semibold bg-brand text-white px-5 py-2 rounded-lg hover:bg-brand-dark transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
