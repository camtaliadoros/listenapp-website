import { client } from "@/sanity/client";
import { sanityFetch } from "@/sanity/live";
import FadeUp from "@/components/FadeUp";
import Icon from "@/components/Icon";
import { buildMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const revalidate = 0;

type Value          = { _key: string; title: string; body: string; icon: string };
type ExperienceStat = { _key: string; number: string; label: string };
type AboutPage = {
  heading: string;
  intro: string;
  experienceEyebrow: string;
  experienceHeading: string;
  experienceBody: string;
  experienceStats: ExperienceStat[];
  expertiseEyebrow: string;
  expertiseHeading: string;
  expertiseParagraphs: string[];
  valuesEyebrow: string;
  valuesHeading: string;
  values: Value[];
  seo?: object;
};
async function getData() {
  const { data: page } = await sanityFetch({ query: `*[_type == "aboutPage"][0]` });
  return { page: page as AboutPage | null };
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await client.fetch<{ seo?: object }>(`*[_type == "aboutPage"][0]{ seo }`, {}, { next: { revalidate: 3600 } });
  return buildMetadata(page?.seo as Parameters<typeof buildMetadata>[0]);
}

export default async function AboutPage() {
  const { page } = await getData();
  const experienceStats = page?.experienceStats ?? [];
  const expertiseParagraphs = page?.expertiseParagraphs ?? [];
  const values = page?.values ?? [];

  return (
    <>
      {/* ── Hero ── */}
      <div className="bg-ink py-12 md:py-14">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <p className="text-sm font-bold uppercase tracking-widest text-brand mb-3">About us</p>
          <h1 className="font-graphik text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-4">
            {page?.heading ?? "Built by people who know what's at stake."}
          </h1>
          <p className="text-white/75 text-base max-w-xl leading-relaxed">{page?.intro}</p>
        </div>
      </div>

      {/* ── Team ── */}
      <section className="max-w-5xl mx-auto px-4 md:px-8 py-12 md:py-14 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-brand mb-2">{page?.experienceEyebrow ?? "Our experience"}</p>
          <h2 className="font-graphik text-3xl font-bold text-ink dark:text-white tracking-tight mb-4">{page?.experienceHeading ?? "Three disciplines, one mission"}</h2>
          <p className="text-sm text-muted dark:text-muted-night leading-relaxed mb-8">{page?.experienceBody}</p>
          <div className="flex flex-col gap-6">
            {experienceStats.map((s) => (
              <div key={s._key} className="border-l-4 border-brand pl-5">
                <div className="font-tungsten text-4xl font-semibold text-brand leading-none tracking-normal">{s.number}</div>
                <div className="text-sm text-muted dark:text-muted-night mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-brand mb-2">{page?.expertiseEyebrow ?? "Our expertise"}</p>
          <h2 className="font-graphik text-3xl font-bold text-ink dark:text-white tracking-tight mb-4">{page?.expertiseHeading ?? "Qualified across disciplines"}</h2>
          {expertiseParagraphs.map((p, i) => (
            <p key={i} className={`text-sm text-muted dark:text-muted-night leading-relaxed ${i < expertiseParagraphs.length - 1 ? "mb-4" : ""}`}>{p}</p>
          ))}
        </div>
      </section>

      {/* ── Values ── */}
      {values.length > 0 && (
        <section className="bg-surface dark:bg-surface-night py-12 md:py-14">
          <div className="max-w-5xl mx-auto px-4 md:px-8">
            <p className="text-sm font-bold uppercase tracking-widest text-brand mb-2">{page?.valuesEyebrow ?? "What we believe"}</p>
            <h2 className="font-graphik text-3xl md:text-4xl font-bold text-ink dark:text-white tracking-tight mb-10">{page?.valuesHeading ?? "Our values"}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {values.map((v, i) => (
                <FadeUp key={v._key} delay={i * 80}>
                <div className="bg-surface dark:bg-surface-night rounded-2xl p-6 h-full">
                  <div className="text-brand mb-4">
                    <Icon name={v.icon} size={28} stroke={2} />
                  </div>
                  <h3 className="text-sm font-semibold text-ink dark:text-white mb-2">{v.title}</h3>
                  <p className="text-xs text-muted dark:text-muted-night leading-relaxed">{v.body}</p>
                </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>
      )}

    </>
  );
}
