import Link from "next/link";
import { client } from "@/sanity/client";
import { sanityFetch } from "@/sanity/live";
import FadeUp from "@/components/FadeUp";
import { buildMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

type Stat        = { _key: string; number: string; label: string };
type BodyColumn  = { _key: string; heading: string; paragraphs: string[] };
type SolutionCard = { _key: string; title: string; body: string };
type ProblemPage = {
  heading: string;
  intro: string;
  stats: Stat[];
  pullQuote: string;
  bodyColumns: BodyColumn[];
  solutionEyebrow: string;
  solutionHeading: string;
  solutionIntro: string;
  solutionCards: SolutionCard[];
  seo?: object;
};

async function getData() {
  const { data: page } = await sanityFetch({ query: `*[_type == "problemPage"][0]` });
  return page as ProblemPage | null;
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await client.fetch<{ seo?: object }>(`*[_type == "problemPage"][0]{ seo }`, {}, { next: { revalidate: 3600 } });
  return buildMetadata(page?.seo as Parameters<typeof buildMetadata>[0]);
}

export default async function ProblemPage() {
  const page = await getData();
  const stats = page?.stats ?? [];
  const bodyColumns = page?.bodyColumns ?? [];
  const solutionCards = page?.solutionCards ?? [];

  return (
    <>
      {/* ── Hero ── */}
      <div className="bg-ink py-12 md:py-14">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <p className="text-sm font-bold uppercase tracking-widest text-brand mb-3">The Problem</p>
          <h1 className="font-graphik text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-4">
            {page?.heading ?? "The scale of domestic abuse is staggering."}
          </h1>
          <p className="text-white/75 text-base max-w-xl leading-relaxed">
            {page?.intro}
          </p>
        </div>
      </div>

      {/* ── Stats grid ── */}
      {stats.length > 0 && (
        <section className="max-w-5xl mx-auto px-4 md:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s, i) => (
              <FadeUp key={s._key} delay={i * 80}>
              <div className="bg-surface rounded-xl p-5">
                <div className="font-tungsten text-5xl font-semibold text-brand leading-none tracking-normal">{s.number}</div>
                <div className="text-xs text-muted mt-2 leading-snug">{s.label}</div>
              </div>
              </FadeUp>
            ))}
          </div>
        </section>
      )}

      {/* ── Pull quote ── */}
      {page?.pullQuote && (
        <div className="max-w-5xl mx-auto px-4 md:px-8 mb-10">
          <blockquote className="border-l-4 border-brand pl-6 py-3 bg-surface rounded-r-xl">
            <p className="font-gilroy text-lg font-semibold text-ink leading-snug">&ldquo;{page.pullQuote}&rdquo;</p>
          </blockquote>
        </div>
      )}

      {/* ── Body copy ── */}
      {bodyColumns.length > 0 && (
        <section className="max-w-5xl mx-auto px-4 md:px-8 pb-12 md:pb-16 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {bodyColumns.map((col) => (
            <div key={col._key}>
              <h2 className="font-graphik text-2xl font-bold text-ink tracking-tight mb-3">{col.heading}</h2>
              {(col.paragraphs ?? []).map((p, i) => (
                <p key={i} className={`text-sm text-muted leading-relaxed ${i < col.paragraphs.length - 1 ? "mb-4" : ""}`}>{p}</p>
              ))}
            </div>
          ))}
        </section>
      )}

      {/* ── What ListenApp does ── */}
      <section className="bg-surface py-12 md:py-14">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <p className="text-sm font-bold uppercase tracking-widest text-brand mb-2">{page?.solutionEyebrow ?? "What ListenApp does about it"}</p>
          <h2 className="font-graphik text-3xl md:text-4xl font-bold text-ink tracking-tight mb-2">{page?.solutionHeading ?? "Closing the gap with technology"}</h2>
          <p className="text-muted text-base mb-10 max-w-lg">{page?.solutionIntro}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {solutionCards.map((c) => (
              <div key={c._key} className="bg-white rounded-2xl p-6">
                <h3 className="text-sm font-semibold text-ink mb-2">{c.title}</h3>
                <p className="text-xs text-muted leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>
          <Link
            href="/partner"
            className="btn-arrow inline-flex items-center gap-2 bg-brand text-white font-semibold text-sm px-6 py-3 rounded-lg hover:bg-brand-dark hover:text-white transition-colors"
          >
            Partner with us <span className="arrow">→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
