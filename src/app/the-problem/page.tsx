import Link from "next/link";
import { client } from "@/sanity/client";
import FadeUp from "@/components/FadeUp";
import { buildMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

type Stat        = { _id: string; number: string; label: string };
type ProblemPage = { heading: string; intro: string; pullQuote: string; seo?: object };

async function getData() {
  const [page, stats] = await Promise.all([
    client.fetch<ProblemPage>(`*[_type == "problemPage"][0]`, {}, { next: { revalidate: 60 } }),
    client.fetch<Stat[]>(`*[_type == "stat" && context == "problem"] | order(order asc)`, {}, { next: { revalidate: 3600 } }),
  ]);
  return { page, stats };
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await client.fetch<{ seo?: object }>(`*[_type == "problemPage"][0]{ seo }`, {}, { next: { revalidate: 3600 } });
  return buildMetadata(page?.seo as Parameters<typeof buildMetadata>[0]);
}

export default async function ProblemPage() {
  const { page, stats } = await getData();

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
      {stats && stats.length > 0 && (
        <section className="max-w-5xl mx-auto px-4 md:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s, i) => (
              <FadeUp key={s._id} delay={i * 80}>
              <div className="bg-surface rounded-xl p-5 card-hover">
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
      <section className="max-w-5xl mx-auto px-4 md:px-8 pb-12 md:pb-16 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
        <div>
          <h2 className="font-graphik text-2xl font-bold text-ink tracking-tight mb-3">The gap nobody is filling</h2>
          <p className="text-sm text-muted leading-relaxed mb-4">We live in a time of extraordinary technology, yet almost nothing exists to connect people in danger to the help they need — silently, instantly, when no one is around.</p>
          <p className="text-sm text-muted leading-relaxed">The charging rate by the Crown Prosecution Service for domestic abuse cases was 73% lower than in the previous two years — partly because evidence is so hard to gather. ListenApp directly addresses this by creating a discreet record.</p>
        </div>
        <div>
          <h2 className="font-graphik text-2xl font-bold text-ink tracking-tight mb-3">Children bear the cost too</h2>
          <p className="text-sm text-muted leading-relaxed mb-4">1 in 7 children suffer from domestic abuse in their lifetime. On a single Day to Count in 2017, 61.7% of women in refuge had children under 18 with them.</p>
          <p className="text-sm text-muted leading-relaxed">Over two years, 274 women and 83 men were killed through domestic abuse. Approximately 400 people die by suicide each year as a direct result.</p>
        </div>
      </section>

      {/* ── What ListenApp does ── */}
      <section className="bg-surface py-12 md:py-14">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <p className="text-sm font-bold uppercase tracking-widest text-brand mb-2">What ListenApp does about it</p>
          <h2 className="font-graphik text-3xl md:text-4xl font-bold text-ink tracking-tight mb-2">Closing the gap with technology</h2>
          <p className="text-muted text-base mb-10 max-w-lg">ListenApp puts a discreet safety tool into the hands of every person at risk — through the charities already serving them.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {[
              { title: "Instant connection", body: "Connects users to contacts and helplines without needing to visibly make a call — by touch or voice trigger." },
              { title: "Tangible evidence", body: "Discreet audio recordings provide proof of abuse — helping close the evidence gap that keeps charging rates low." },
              { title: "Hidden in plain sight", body: "The app is disguised as a calculator, protecting users from abusers who may check their phone." },
            ].map((c) => (
              <div key={c.title} className="bg-white rounded-2xl p-6">
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
