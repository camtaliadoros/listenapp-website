import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-ink flex items-center">
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-24">
        <p className="text-sm font-bold uppercase tracking-widest text-brand mb-3">404</p>
        <h1 className="font-graphik text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-4">
          Page not found.
        </h1>
        <p className="text-white/75 text-base max-w-md leading-relaxed mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-brand text-white font-semibold text-sm px-6 py-3 rounded-lg hover:bg-brand-dark transition-colors"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
