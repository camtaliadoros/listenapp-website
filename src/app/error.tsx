"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-ink flex items-center">
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-24">
        <p className="text-sm font-bold uppercase tracking-widest text-brand mb-3">Error</p>
        <h1 className="font-graphik text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-4">
          Something went wrong.
        </h1>
        <p className="text-white/75 text-base max-w-md leading-relaxed mb-8">
          An unexpected error occurred. Please try again or return home.
        </p>
        <div className="flex gap-4">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 bg-brand text-white font-semibold text-sm px-6 py-3 rounded-lg hover:bg-brand-dark transition-colors"
          >
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 border border-white/30 text-white font-semibold text-sm px-6 py-3 rounded-lg hover:border-white/60 transition-colors"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
