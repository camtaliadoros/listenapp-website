"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const links = [
  { label: "The Problem", href: "/the-problem" },
  { label: "Partner with us", href: "/partner" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Nav({ demoEmail }: { demoEmail: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isHome = pathname === "/";
  const transparent = isHome && !scrolled;

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 80);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      transparent
        ? "bg-transparent border-transparent"
        : "bg-white/95 dark:bg-black/95 backdrop-blur-sm border-b border-border dark:border-border-night"
    }`}>
      <div className="flex items-center justify-between px-4 md:px-8 py-4">
        <Link href="/" className="flex items-center" onClick={() => setOpen(false)}>
          <Image
            src="/ListenAppLogo-White-Version.svg"
            alt="ListenApp"
            width={80}
            height={16}
            style={{ width: 80, height: "auto" }}
            className={transparent ? "" : "hidden dark:block"}
            priority
          />
          <Image
            src="/ListenAppLogo-For-Light-Background.svg"
            alt="ListenApp"
            width={80}
            height={16}
            style={{ width: 80, height: "auto" }}
            className={transparent ? "hidden" : "dark:hidden"}
            priority
          />
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {links.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm font-medium transition-colors ${
                transparent
                  ? "text-white/90 hover:text-white"
                  : pathname === href
                    ? "text-brand"
                    : "text-muted dark:text-muted-night hover:text-brand"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={`mailto:${demoEmail}`}
            className={`hidden md:inline-flex text-sm font-semibold px-5 py-2.5 rounded-lg transition-all hover:scale-105 active:scale-95 ${
              transparent
                ? "bg-white/15 border border-white/50 text-white hover:bg-white/25"
                : "bg-brand text-white hover:bg-brand-dark hover:text-white"
            }`}
          >
            Request demo
          </Link>

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col justify-center gap-1.5 w-8 h-8"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <span className={`block h-0.5 transition-all duration-300 ${transparent ? "bg-white" : "bg-ink dark:bg-white"} ${open ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block h-0.5 transition-all duration-300 ${transparent ? "bg-white" : "bg-ink dark:bg-white"} ${open ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 transition-all duration-300 ${transparent ? "bg-white" : "bg-ink dark:bg-white"} ${open ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border dark:border-border-night px-4 py-4 flex flex-col gap-1 bg-white dark:bg-black">
          {links.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`text-sm font-medium py-2.5 border-b border-border dark:border-border-night last:border-0 transition-colors ${
                pathname === href ? "text-brand" : "text-ink dark:text-white hover:text-brand"
              }`}
            >
              {label}
            </Link>
          ))}
          <Link
            href={`mailto:${demoEmail}`}
            onClick={() => setOpen(false)}
            className="mt-3 bg-brand text-white text-sm font-semibold px-5 py-3 rounded-lg text-center hover:bg-brand-dark transition-colors"
          >
            Request demo
          </Link>
        </div>
      )}
    </nav>
  );
}
