"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { label: "The Problem", href: "/the-problem" },
  { label: "Partner with us", href: "/partner" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-8 py-4 bg-white/95 backdrop-blur-sm border-b border-border">
      <Link href="/" className="flex items-center">
        <Image
          src="/ListenAppLogo-For-Light-Background.svg"
          alt="ListenApp"
          width={160}
          height={32}
          priority
        />
      </Link>

      <div className="flex items-center gap-6">
        {links.map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            className={`text-sm font-medium transition-colors ${
              pathname === href ? "text-brand" : "text-muted hover:text-brand"
            }`}
          >
            {label}
          </Link>
        ))}
      </div>

      <Link
        href="mailto:natasha@listenapp.org"
        className="bg-brand text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-brand-dark transition-colors"
      >
        Request demo
      </Link>
    </nav>
  );
}
