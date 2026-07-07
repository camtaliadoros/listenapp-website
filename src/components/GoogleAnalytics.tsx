"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

const GA_ID = "G-EG59VZ9S98";

export default function GoogleAnalytics() {
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("cookieConsent") === "accepted") {
      setConsented(true);
    }
    const handler = () => setConsented(true);
    window.addEventListener("cookieConsentAccepted", handler);
    return () => window.removeEventListener("cookieConsentAccepted", handler);
  }, []);

  if (!consented) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  );
}
