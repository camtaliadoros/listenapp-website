"use client";

import { useEffect } from "react";

const SAFE_URL = "https://www.bbc.co.uk/weather";

function exit() {
  // Replace current history entry so back button doesn't return here
  window.location.replace(SAFE_URL);
}

export default function QuickExit() {
  // Also trigger on pressing Escape key twice quickly
  useEffect(() => {
    let lastEsc = 0;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        const now = Date.now();
        if (now - lastEsc < 1000) {
          exit();
        }
        lastEsc = now;
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <button
      onClick={exit}
      aria-label="Quick exit — leave this site immediately"
      className="fixed bottom-6 right-6 z-[200] flex items-center gap-2 bg-brand hover:bg-brand-dark text-white text-xs font-bold uppercase tracking-widest px-4 py-2.5 rounded-full shadow-lg transition-colors"
    >
      <span aria-hidden="true">✕</span>
      Quick exit
    </button>
  );
}
