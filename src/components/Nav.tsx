"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { label: "The Problem", href: "/the-problem" },
  { label: "Partner with us", href: "/partner" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Nav({ demoEmail }: { demoEmail: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/95 dark:bg-black/95 backdrop-blur-sm border-b border-border dark:border-border-night">
      <div className="flex items-center justify-between px-4 md:px-8 py-4">
        <Link href="/" className="flex items-center" onClick={() => setOpen(false)}>
          <Image
            src="/ListenAppLogo-For-Light-Background.svg"
            alt="ListenApp"
            width={80}
            height={16}
            style={{ width: 80, height: "auto" }}
            className="dark:hidden"
            priority
          />
          <Image
            src="/ListenAppLogo-White-Version.svg"
            alt="ListenApp"
            width={80}
            height={16}
            style={{ width: 80, height: "auto" }}
            className="hidden dark:block"
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
                pathname === href ? "text-brand" : "text-muted dark:text-muted-night hover:text-brand"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={`mailto:${demoEmail}`}
            className="hidden md:inline-flex bg-brand text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-brand-dark hover:text-white transition-all hover:scale-105 active:scale-95"
          >
            Request demo
          </Link>

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col justify-center gap-1.5 w-8 h-8"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <span className={`block h-0.5 bg-ink dark:bg-white transition-all duration-300 ${open ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block h-0.5 bg-ink dark:bg-white transition-all duration-300 ${open ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 bg-ink dark:bg-white transition-all duration-300 ${open ? "-rotate-45 -translate-y-2" : ""}`} />
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
