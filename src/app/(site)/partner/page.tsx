import { client } from "@/sanity/client";
import { sanityFetch } from "@/sanity/live";
import FadeUp from "@/components/FadeUp";
import { buildMetadata } from "@/lib/metadata";
import PartnerForm from "./PartnerForm";
import type { Metadata } from "next";

export const revalidate = 60;

type Step      = { _key: string; title: string; body: string };
type TrustCard = { _key: string; title: string; body: string };
type Licence   = { _key: string; name: string; price: string; description: string };
type PartnerPage = {
  heading: string;
  intro: string;
  stepsEyebrow: string;
  stepsHeading: string;
  steps: Step[];
  trustCards: TrustCard[];
  limitationsEyebrow: string;
  limitationsHeading: string;
  limitationsParagraphs: string[];
  statusHeading: string;
  statusParagraphs: string[];
  licencesEyebrow: string;
  licencesHeading: string;
  licences: Licence[];
  licencesHelpHeading: string;
  licencesHelpBody: string;
  licencesHelpCtaLabel: string;
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
  const limitationsParagraphs = page?.limitationsParagraphs?.length ? page.limitationsParagraphs : [
    "ListenApp is designed as an additional safety tool, not a replacement for professional support, emergency services or an individual's safety plan.",
    "The current version is available on Android. An internet connection is required for voice-trigger processing and SMS alerts. Voice recognition can be affected by factors including background noise, microphone position and connectivity. Calls made to 999 through the app will appear in the phone's normal call history.",
    "We explain these limitations clearly to partner organisations so they can be incorporated into safe onboarding and individual safety planning.",
  ];
  const licences: Licence[] = page?.licences?.length ? page.licences : [
    { _key: "core", name: "Core Partner", price: "£499/month", description: "Up to 500 users, ListenApp access, onboarding/support, plus marketing and promotional collaboration opportunities." },
    { _key: "insights", name: "Insights Partner", price: "£599/month", description: "Everything in Core, plus anonymised aggregate demographic insights such as age bands, gender and broad location." },
    { _key: "impact", name: "Impact Partner", price: "£799/month", description: "Everything in Insights, plus deeper anonymised reporting including usage frequency, cross-feature engagement, alert counts, trigger activity, engagement trends and impact-reporting insights." },
  ];
  const statusParagraphs = page?.statusParagraphs?.length ? page.statusParagraphs : [
    "ListenApp is now available on Android and is being introduced through partner organisations to people accessing domestic abuse and support services.",
    "Alongside delivery, we are gathering partner feedback and anonymised usage information to improve onboarding, accessibility and future development. Further development includes iOS and additional accessibility features.",
  ];

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
                <h3 className="text-base font-semibold text-ink dark:text-white mb-1">
                  {i === 0 ? (
                    <a href="#register" className="hover:text-brand hover:underline transition-colors">{s.title}</a>
                  ) : (
                    s.title
                  )}
                </h3>
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

      {/* ── Safety & current limitations ── */}
      <section className="max-w-5xl mx-auto px-4 md:px-8 py-12 md:py-14">
        <p className="text-sm font-bold uppercase tracking-widest text-brand mb-2">{page?.limitationsEyebrow ?? "Safety & current limitations"}</p>
        <h2 className="font-graphik text-3xl md:text-4xl font-bold text-ink dark:text-white tracking-tight mb-6">{page?.limitationsHeading ?? "What partners need to know"}</h2>
        <div className="max-w-3xl space-y-4 mb-10">
          {limitationsParagraphs.map((p, i) => (
            <p key={i} className="text-base text-muted dark:text-muted-night leading-relaxed">{p}</p>
          ))}
        </div>

        {/* Current status */}
        <div className="bg-ink rounded-2xl p-7 md:p-8">
          <div className="inline-flex items-center gap-2 bg-brand/85 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider mb-4">
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
            Current status
          </div>
          <h3 className="font-gilroy text-xl md:text-2xl font-bold text-white mb-3">{page?.statusHeading ?? "Now moving into frontline use"}</h3>
          <div className="space-y-3 max-w-3xl">
            {statusParagraphs.map((p, i) => (
              <p key={i} className="text-sm text-white/75 leading-relaxed">{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* ── Licence options ── */}
      <section className="bg-surface dark:bg-surface-night py-12 md:py-14">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <p className="text-sm font-bold uppercase tracking-widest text-brand mb-2">{page?.licencesEyebrow ?? "Pricing"}</p>
          <h2 className="font-graphik text-3xl md:text-4xl font-bold text-ink dark:text-white tracking-tight mb-10">{page?.licencesHeading ?? "Licence options"}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {licences.map((l, i) => (
              <FadeUp key={l._key} delay={i * 80}>
                <div className="bg-white dark:bg-surface-raised-night rounded-2xl p-6 h-full flex flex-col">
                  <h3 className="font-gilroy text-lg font-bold text-ink dark:text-white mb-1">{l.name}</h3>
                  <p className="mb-4">
                    <span className="font-tungsten text-4xl font-semibold text-brand tracking-normal leading-none">{l.price.split("/")[0]}</span>
                    {l.price.includes("/") && <span className="text-sm text-muted dark:text-muted-night ml-1">/{l.price.split("/").slice(1).join("/")}</span>}
                  </p>
                  <p className="text-sm text-muted dark:text-muted-night leading-relaxed">{l.description}</p>
                </div>
              </FadeUp>
            ))}
          </div>

          <div className="mt-5 border-l-4 border-brand bg-white dark:bg-surface-raised-night rounded-r-2xl p-6 md:p-7 flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div>
              <h3 className="text-base font-semibold text-ink dark:text-white mb-1">{page?.licencesHelpHeading ?? "Not sure which licence is right for your service?"}</h3>
              <p className="text-sm text-muted dark:text-muted-night leading-relaxed max-w-xl">
                {page?.licencesHelpBody ?? "Register your interest and we'll talk through your user numbers, reporting needs and the most suitable option."}
              </p>
            </div>
            <a href="#register" className="btn-arrow inline-flex items-center gap-2 flex-shrink-0 self-start md:self-auto bg-brand text-white font-semibold text-sm px-6 py-3 rounded-lg hover:bg-brand-dark hover:text-white transition-colors">
              <span>{page?.licencesHelpCtaLabel ?? "Register your interest"}</span> <span className="arrow">→</span>
            </a>
          </div>
        </div>
      </section>

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
