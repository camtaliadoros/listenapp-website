"use client";

import { useSyncExternalStore } from "react";

export type CookieConsent = "accepted" | "declined" | null;

const KEY = "cookieConsent";
const CHANGE_EVENT = "cookieConsentChange";

// Fallback for this page view when storage is blocked.
let memory: CookieConsent = null;

function read(): CookieConsent {
  try {
    const value = localStorage.getItem(KEY);
    return value === "accepted" || value === "declined" ? value : memory;
  } catch {
    return memory;
  }
}

function subscribe(onChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

export function setCookieConsent(value: "accepted" | "declined") {
  memory = value;
  try {
    localStorage.setItem(KEY, value);
  } catch {
    // Storage blocked: `memory` keeps the choice for this page view.
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

/** Current consent choice. Returns "unknown" during server render so nothing consent-dependent renders there. */
export function useCookieConsent(): CookieConsent | "unknown" {
  return useSyncExternalStore(subscribe, read, () => "unknown");
}
