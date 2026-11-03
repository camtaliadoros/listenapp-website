import { client } from "@/sanity/client";
import { sanityFetch } from "@/sanity/live";
import FadeUp from "@/components/FadeUp";
import PartnerLogos, { type Partner } from "@/components/PartnerLogos";
import { buildMetadata } from "@/lib/metadata";
import PartnerForm from "./PartnerForm";
import { IconCheck, IconAlertCircle } from "@tabler/icons-react";
import type { Metadata } from "next";

export const revalidate = 60;

type WhyPoint  = { _key: string; title: string; body: string; icon?: string };
type PartnerPage = {
  heading: string;
  intro: string;
  whyEyebrow?: string;
  whyHeading?: string;
  whyIntro?: string;
  whyCtaLabel?: string;
  whyPoints?: WhyPoint[];
  statusHeading?: string;
  statusPoints?: string[];
  limitationsEyebrow?: string;
  limitationsHeading?: string;
  limitationsIntro?: string;
  requirementsIntro?: string;
  requirements?: string[];
  awarenessIntro?: string;
  awareness?: string[];
  limitationsOutro?: string;
  licencesEyebrow?: string;
  licencesHeading?: string;
  packageIntro?: string;
  packagePrice?: string;
  packagePriceUnit?: string;
  packageIncludesHeading?: string;
  packageIncludes?: string[];
  packageNote?: string;
  licencesHelpHeading?: string;
  packageClosing?: string;
  registerEyebrow: string;
  registerHeading: string;
  registerIntro?: string;
  seo?: object;
};
type HomePartners = { partners?: Partner[]; partnersHeading?: string; partnersThanksNote?: string };

const DEFAULT_WHY_POINTS: WhyPoint[] = [
  { _key: "reach", icon: "ti-heart-handshake", title: "Extend your support and reach.", body: "A discreet safety tool for the people you already support, alongside your safety planning." },
  { _key: "safeguarding", icon: "ti-shield-check", title: "Add a layer of safeguarding.", body: "Extra protection behind closed doors, when it's unsafe to reach out." },
  { _key: "benefit", icon: "ti-building-community", title: "Further your public benefit.", body: "Offering ListenApp to the people you support furthers your organisation's public benefit." },
];

const DEFAULT_STATUS_POINTS = [
  "ListenApp is available on Android and is being introduced through partner organisations to people accessing domestic abuse and support services.",
  "Languages: English, Arabic, Pashto, Persian (Farsi) and Urdu.",
  "iOS: in development.",
];

const DEFAULT_REQUIREMENTS = [
  "Internet and location need to be switched on.",
  "App permissions need to be allowed during setup.",
  "Listening Mode must be active for voice triggers to work.",
  "Keep the phone nearby and uncovered while listening or recording, and away from loud music or background noise.",
];

const DEFAULT_AWARENESS = [
  "Calls to 999 made through the app appear in the phone's call history.",
  "A green dot appears in the corner of the screen while the microphone is listening or recording. This is a standard Android privacy indicator.",
];

const DEFAULT_PACKAGE_INCLUDES = [
  "ListenApp for the people you support",
  "Onboarding and ongoing support",
  "Usage reporting: active users, alerts sent and a monthly summary",
  "Demographic insights: anonymised, aggregate age bands, gender and broad location",
  "Opportunities for marketing and promotional collaboration",
];

async function getData() {
  const [{ data: page }, { data: home }] = await Promise.all([
    sanityFetch({ query: `*[_type == "partnerPage"][0]` }),
    // Partner logos are edited on the Home Page document.
    sanityFetch({ query: `*[_type == "homePage"][0]{ partners, partnersHeading, partnersThanksNote }` }),
  ]);
  return { page: page as PartnerPage | null, home: home as HomePartners | null };
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await client.fetch<{ seo?: object }>(`*[_type == "partnerPage"][0]{ seo }`, {}, { next: { revalidate: 3600 } });
  return buildMetadata(page?.seo as Parameters<typeof buildMetadata>[0]);
}

function Checklist({ items, variant }: { items: string[]; variant: "check" | "alert" }) {
  const ItemIcon = variant === "check" ? IconCheck : IconAlertCircle;
  return (
    <ul className="space-y-4">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-[15px] text-ink dark:text-white leading-relaxed">
          <ItemIcon
            aria-hidden
            size={20}
            stroke={2}
            className={`flex-shrink-0 mt-0.5 ${variant === "check" ? "text-[#2E7D32] dark:text-[#81C784]" : "text-brand-hover dark:text-[#FF6B81]"}`}
          />
          {item}
        </li>
      ))}
    </ul>
  );
}

export default async function PartnerPage() {
  const { page, home } = await getData();
  const whyPoints = page?.whyPoints?.length ? page.whyPoints : DEFAULT_WHY_POINTS;
  const statusPoints = page?.statusPoints?.length ? page.statusPoints : DEFAULT_STATUS_POINTS;
  // "Label: value." points become the fact columns; anything else is body text.
  const statusFacts = statusPoints.flatMap((p) => {
    const m = p.match(/^([^:]{1,24}):\s*(.+?)\.?$/);
    return m ? [{ label: m[1], value: m[2].charAt(0).toUpperCase() + m[2].slice(1) }] : [];
  });
  const statusText = statusPoints.filter((p) => !/^[^:]{1,24}:/.test(p));
  const requirements = page?.requirements?.length ? page.requirements : DEFAULT_REQUIREMENTS;
  const awareness = page?.awareness?.length ? page.awareness : DEFAULT_AWARENESS;
  const packageIncludes = page?.packageIncludes?.length ? page.packageIncludes : DEFAULT_PACKAGE_INCLUDES;
  const priceLine = `${page?.packageIntro ?? "ListenApp packages start from"} ${page?.packagePrice ?? "£499"} ${page?.packagePriceUnit ?? "a month"}.`;
  const contactLine = (page?.licencesHelpHeading ?? "Get in touch for pricing and partner rates").replace(/\.?$/, ".");
  const closingText = page?.packageClosing ??"Contact us for a quote, partner rates and current discounts. We also work with councils, PCCs and consortiums on area licences. We’re happy to arrange a free demo at a time that suits you.";
  // A leading "Contact us" becomes an email link.
  const closingMatch = closingText.match(/^(contact us)([\s\S]*)$/i);

  return (
    <>
      {/* ── Hero ── */}
      <div className="bg-panel py-12 md:py-14">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <p className="text-sm font-bold uppercase tracking-widest text-panel-accent mb-3">For organisations</p>
          <h1 className="font-graphik text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-4">
            {page?.heading ?? "Bring ListenApp to your beneficiaries."}
          </h1>
          <p className="text-white text-base max-w-xl leading-relaxed">{page?.intro}</p>
        </div>
      </div>

      {/* ── Why partner ── */}
      <section className="max-w-5xl mx-auto px-4 md:px-8 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-10 lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-sm font-bold uppercase tracking-widest text-brand mb-3">{page?.whyEyebrow ?? "Partnership"}</p>
            <h2 className="font-graphik text-4xl md:text-5xl font-bold text-ink dark:text-white tracking-tight leading-[1.05] mb-6">{page?.whyHeading ?? "Why partner with ListenApp"}</h2>
            <p className="text-base text-muted dark:text-muted-night leading-relaxed max-w-md mb-8">
              {page?.whyIntro ?? "We work with charities and support organisations to bring ListenApp to the people who need it most."}
            </p>
            <a href="#register" className="btn-arrow inline-flex items-center gap-2 bg-brand text-white font-semibold text-sm px-7 py-3.5 rounded-full hover:bg-brand-hover hover:text-white transition-colors">
              <span>{page?.whyCtaLabel ?? "Register your interest"}</span> <span className="arrow">→</span>
            </a>
          </div>
          <div className="border-t border-border dark:border-border-night">
            {whyPoints.map((w, i) => (
              <FadeUp key={w._key} delay={i * 80}>
                <div className="grid grid-cols-[3.5rem_1fr] md:grid-cols-[6rem_1fr] gap-4 py-8 md:py-10 border-b border-border dark:border-border-night">
                  <span className="font-graphik text-3xl md:text-4xl font-bold text-brand tracking-tight leading-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-graphik text-xl md:text-2xl font-bold text-ink dark:text-white tracking-tight mb-2">{w.title.replace(/\.$/, "")}</h3>
                    <p className="text-base text-muted dark:text-muted-night leading-relaxed">{w.body}</p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Current status ── */}
      <section className="max-w-5xl mx-auto px-4 md:px-8">
        <div className="bg-panel rounded-3xl p-6 md:p-8">
          <div className="inline-flex items-center gap-2 bg-white/20 text-white text-xs font-bold px-3.5 py-2 rounded-full uppercase tracking-[0.15em] mb-4">
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
            Current status
          </div>
          <h3 className="font-graphik text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight mb-3">{page?.statusHeading ?? "Live on Android and in frontline use"}</h3>
          {statusText.map((p) => (
            <p key={p} className="text-base text-white leading-relaxed max-w-2xl mb-2 last:mb-0">{p}</p>
          ))}
          {statusFacts.length > 0 && (
            <dl className="flex flex-col md:flex-row gap-y-5 mt-6 pt-6 border-t border-white/30">
              {statusFacts.map((f, i) => (
                <div key={f.label} className={`md:px-8 md:first:pl-0 ${i > 0 ? "md:border-l md:border-white/30" : ""}`}>
                  {/* Brand names like "iOS" keep their casing. */}
                  <dt className={`text-xs font-bold tracking-[0.15em] text-white mb-1.5 ${/^[a-z]/.test(f.label) ? "" : "uppercase"}`}>{f.label}</dt>
                  <dd className="font-graphik text-base font-semibold text-white leading-snug md:whitespace-nowrap">{f.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </section>

      {/* ── Getting the best from ListenApp ── */}
      <section className="py-14 md:py-20">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand mb-3">{page?.limitationsEyebrow ?? "Safety & current limitations"}</p>
          <h2 className="font-graphik text-4xl md:text-5xl font-bold text-ink dark:text-white tracking-tight leading-[1.05] mb-5 max-w-xl">{page?.limitationsHeading ?? "Getting the best from ListenApp"}</h2>
          <p className="text-base text-muted dark:text-muted-night leading-relaxed max-w-xl mb-10">
            {page?.limitationsIntro ?? "ListenApp is an additional safety tool. It does not replace professional support, emergency services or an individual's safety plan."}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FadeUp className="h-full">
              <div className="bg-white dark:bg-surface-night border border-border dark:border-border-night rounded-2xl p-7 md:p-8 h-full">
                <h3 className="font-graphik text-lg font-semibold text-ink dark:text-white mb-5">{(page?.requirementsIntro ?? "For ListenApp to work as well as possible").replace(/:$/, "")}</h3>
                <Checklist items={requirements} variant="check" />
              </div>
            </FadeUp>
            <FadeUp className="h-full" delay={80}>
              <div className="bg-white dark:bg-surface-night border border-border dark:border-border-night rounded-2xl p-7 md:p-8 h-full flex flex-col">
                <h3 className="font-graphik text-lg font-semibold text-ink dark:text-white mb-5">{(page?.awarenessIntro ?? "Also be aware that").replace(/:$/, "")}</h3>
                <Checklist items={awareness} variant="alert" />
                <p className="mt-7 bg-[#FBF0F0] dark:bg-surface-deep-night rounded-xl px-4 py-4 text-sm text-ink dark:text-white leading-relaxed">
                  {page?.limitationsOutro ?? "We go through all of this with partner organisations, so it can be built into safe onboarding and individual safety planning."}
                </p>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── Contact form ── */}
      <section className="scroll-mt-20 bg-[#FBF0F0] dark:bg-surface-night py-14 md:py-20" id="register">
        <div className="max-w-5xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-10 lg:gap-16 items-start">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand mb-3">{page?.registerEyebrow ?? "Register interest"}</p>
            <h2 className="font-graphik text-4xl md:text-5xl font-bold text-ink dark:text-white tracking-tight leading-[1.05] mb-5">{page?.registerHeading ?? "Get in touch"}</h2>
            <p className="text-base text-muted dark:text-muted-night leading-relaxed max-w-sm">{page?.registerIntro ?? "Tell us about your organisation and we'll arrange a demo at a time that works for you."}</p>
          </div>
          <div className="bg-white dark:bg-surface-raised-night rounded-3xl p-6 md:p-8 shadow-[0_12px_40px_-12px_rgba(119,0,0,0.12)]">
            <PartnerForm />
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section id="pricing" className="scroll-mt-20 max-w-5xl mx-auto px-4 md:px-8 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-10 lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-sm font-bold uppercase tracking-widest text-brand mb-3">{page?.licencesEyebrow ?? "Pricing"}</p>
            <h2 className="font-graphik text-4xl md:text-5xl font-bold text-ink dark:text-white tracking-tight leading-[1.05] mb-6">{page?.licencesHeading ?? "Licence options"}</h2>
            <p className="text-base text-muted dark:text-muted-night leading-relaxed max-w-md mb-4">
              <strong className="font-semibold text-ink dark:text-white">{priceLine}</strong> {contactLine}
            </p>
            <p className="text-base text-muted dark:text-muted-night leading-relaxed max-w-md">
              {closingMatch ? (
                <>
                  <a href="mailto:info@listenapp.org" className="font-semibold text-brand hover:text-brand-hover underline underline-offset-2">{closingMatch[1]}</a>
                  {closingMatch[2]}
                </>
              ) : closingText}
            </p>
          </div>
          <div>
            <h3 className="font-graphik text-xl md:text-2xl font-bold text-ink dark:text-white tracking-tight mb-4">{(page?.packageIncludesHeading ?? "All packages include:").replace(/:$/, "")}</h3>
            <ul className="border-t border-border dark:border-border-night">
              {packageIncludes.map((item) => (
                <li key={item} className="flex items-start gap-4 py-5 border-b border-border dark:border-border-night text-base text-ink dark:text-white leading-relaxed">
                  <IconCheck aria-hidden size={20} stroke={2} className="flex-shrink-0 mt-0.5 text-brand" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-muted dark:text-muted-night leading-relaxed">{page?.packageNote ?? "Additional impact reporting available."}</p>
          </div>
        </div>
      </section>

      {/* ── Partners ── */}
      <PartnerLogos partners={home?.partners ?? []} heading={home?.partnersHeading} thanksNote={home?.partnersThanksNote} />
    </>
  );
}
