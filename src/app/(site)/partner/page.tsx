import { client } from "@/sanity/client";
import { sanityFetch } from "@/sanity/live";
import FadeUp from "@/components/FadeUp";
import { buildMetadata } from "@/lib/metadata";
import PartnerForm from "./PartnerForm";
import type { Metadata } from "next";

type Step      = { _key: string; title: string; body: string };
type TrustCard = { _key: string; title: string; body: string };
type PartnerPage = {
  heading: string;
  intro: string;
  stepsEyebrow: string;
  stepsHeading: string;
  steps: Step[];
  trustCards: TrustCard[];
  registerEyebrow: string;
  registerHeading: string;
  registerIntro: string;
  seo?: object;
};

async function getData() {
  const { data: page } = await sanityFetch({ query: `*[_type == "partnerPage"][0]` });
  return page as PartnerPage | null;
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await client.fetch<{ seo?: object }>(`*[_type == "partnerPage"][0]{ seo }`, {}, { next: { revalidate: 3600 } });
  return buildMetadata(page?.seo as Parameters<typeof buildMetadata>[0]);
}

export default async function PartnerPage() {
  const page = await getData();
  const steps = page?.steps ?? [];
  const trustCards = page?.trustCards ?? [];

  return (
    <>
      {/* ── Hero ── */}
      <div className="bg-ink py-12 md:py-14">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <p className="text-sm font-bold uppercase tracking-widest text-brand mb-3">Partnership</p>
          <h1 className="font-graphik text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-4">
            {page?.heading ?? "Bring ListenApp to your beneficiaries."}
          </h1>
          <p className="text-white/75 text-base max-w-xl leading-relaxed">{page?.intro}</p>
        </div>
      </div>

      {/* ── Steps ── */}
      <section className="max-w-5xl mx-auto px-4 md:px-8 py-12 md:py-14">
        <p className="text-sm font-bold uppercase tracking-widest text-brand mb-2">{page?.stepsEyebrow ?? "How it works"}</p>
        <h2 className="font-graphik text-3xl md:text-4xl font-bold text-ink dark:text-white tracking-tight mb-10">{page?.stepsHeading ?? "Simple to adopt, built to last"}</h2>
        <div className="flex flex-col gap-4">
          {steps.map((s, i) => (
            <FadeUp key={s._key} delay={i * 80}>
            <div className="grid grid-cols-[48px_1fr] gap-5 bg-surface dark:bg-surface-night rounded-2xl p-6 items-start">
              <div className="w-9 h-9 bg-brand rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                {i + 1}
              </div>
              <div>
                <h3 className="text-base font-semibold text-ink dark:text-white mb-1">{s.title}</h3>
                <p className="text-sm text-muted dark:text-muted-night leading-relaxed">{s.body}</p>
              </div>
            </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── Trust cards ── */}
      {trustCards.length > 0 && (
        <section className="bg-surface dark:bg-surface-night py-12 md:py-14">
          <div className="max-w-5xl mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {trustCards.map((c) => (
                <div key={c._key} className="bg-ink rounded-2xl p-7">
                  <h3 className="font-gilroy text-base font-bold text-white mb-3">{c.title}</h3>
                  <p className="text-sm text-white/75 leading-relaxed">{c.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Contact form ── */}
      <section className="max-w-5xl mx-auto px-4 md:px-8 py-12 md:py-14" id="register">
        <p className="text-sm font-bold uppercase tracking-widest text-brand mb-2">{page?.registerEyebrow ?? "Register interest"}</p>
        <h2 className="font-graphik text-3xl md:text-4xl font-bold text-ink dark:text-white tracking-tight mb-2">{page?.registerHeading ?? "Get in touch"}</h2>
        <p className="text-muted dark:text-muted-night text-base mb-8 max-w-lg">{page?.registerIntro}</p>
        <PartnerForm />
      </section>
    </>
  );
}
