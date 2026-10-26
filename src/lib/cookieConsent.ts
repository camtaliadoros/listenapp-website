"use client";

import { useSyncExternalStore } from "react";

export type CookieConsent = "accepted" | "declined" | null;

const KEY = "cookieConsent";
const CHANGE_EVENT = "cookieConsentChange";

// Fallback for this page view when storage is blocked.
let memory: CookieConsent = null;
// Whether analytics has been allowed to load at any point during this page view.
let analyticsLoaded = false;

function read(): CookieConsent {
  let value: CookieConsent;
  try {
    const stored = localStorage.getItem(KEY);
    value = stored === "accepted" || stored === "declined" ? stored : memory;
  } catch {
    value = memory;
  }
  if (value === "accepted") analyticsLoaded = true;
  return value;
}

function subscribe(onChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

// Analytics scripts can't be unloaded once running, so withdrawing consent clears their cookies and reloads.
function withdrawAnalytics() {
  const host = location.hostname;
  const domains = ["", host, `.${host}`, `.${host.split(".").slice(-2).join(".")}`];
  document.cookie.split(";").forEach((c) => {
    const name = c.split("=")[0].trim();
    if (!name.startsWith("_ga") && !name.startsWith("_gid")) return;
    domains.forEach((d) => {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${d ? `; domain=${d}` : ""}`;
    });
  });
  location.reload();
}

export function setCookieConsent(value: "accepted" | "declined") {
  memory = value;
  try {
    localStorage.setItem(KEY, value);
  } catch {
    // Storage blocked: `memory` keeps the choice for this page view.
  }
  if (value === "declined" && analyticsLoaded) return withdrawAnalytics();
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

/** Clears the stored choice so the consent banner shows again. */
export function resetCookieConsent() {
  memory = null;
  try {
    localStorage.removeItem(KEY);
  } catch {
    // Storage blocked: clearing `memory` is enough for this page view.
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

/** Current consent choice. Returns "unknown" during server render so nothing consent-dependent renders there. */
export function useCookieConsent(): CookieConsent | "unknown" {
  return useSyncExternalStore(subscribe, read, () => "unknown");
}
