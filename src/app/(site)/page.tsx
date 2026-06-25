import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/client";
import { sanityFetch } from "@/sanity/live";
import { urlForImage } from "@/sanity/image";
import { buildMetadata } from "@/lib/metadata";
import FadeUp from "@/components/FadeUp";
import Icon from "@/components/Icon";
import type { Metadata } from "next";

type Feature = { _key: string; title: string; description: string; icon: string };
type Stat    = { _key: string; number: string; label: string };
type Partner = { _key: string; name: string; type: string; url?: string; logo?: { asset?: { _ref: string } }; logoDark?: { asset?: { _ref: string } } };
type HomePage = {
  heroEyebrowBadge: string;
  heroHeading: string;
  heroDescription: string;
  heroPrimaryCtaLabel: string;
  heroSecondaryCtaLabel: string;
  stats: Stat[];
  featuresEyebrow: string;
  featuresHeading: string;
  featuresIntro: string;
  features: Feature[];
  securityEyebrow: string;
  securityHeading: string;
  securityBody: string;
  securityChecklist: string[];
  secretCodeHeading: string;
  secretCodeSubtext: string;
  partnersHeading: string;
  partnersThanksNote: string;
  partners: Partner[];
  ctaEyebrow: string;
  ctaHeading: string;
  ctaBody: string;
  ctaPrimaryLabel: string;
  ctaSecondaryLabel: string;
  seo?: { title?: string; description?: string; ogImage?: object; noIndex?: boolean };
};
type SiteSettings = {
  demoEmail: string;
  researchBand: { stat: string; heading: string; body: string; ctaLabel: string; ctaUrl: string };
};

async function getData() {
  const [{ data: page }, { data: settings }] = await Promise.all([
    sanityFetch({ query: `*[_type == "homePage"][0]` }),
    sanityFetch({ query: `*[_type == "siteSettings"][0]{ demoEmail, researchBand }` }),
  ]);
  const typedPage = page as HomePage | null;
  const partners = (typedPage?.partners ?? []).filter((p) => p.type === "Partner charity");
  const supporters = (typedPage?.partners ?? []).filter((p) => p.type === "Supporter");
  return { page: typedPage, settings: settings as SiteSettings | null, partners, supporters };
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await client.fetch<{ seo?: object }>(`*[_type == "homePage"][0]{ seo }`, {}, { next: { revalidate: 3600 } });
  return buildMetadata(page?.seo as Parameters<typeof buildMetadata>[0]);
}

export default async function HomePage() {
  const { page, settings, partners, supporters } = await getData();
  const features = page?.features ?? [];
  const stats = page?.stats ?? [];

  return (
    <>
      {/* ── Hero ── */}
      <section className="max-w-5xl mx-auto px-4 md:px-8 py-12 md:py-16 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center">
        <div className="animate-fade-up">
          <div className="inline-flex items-center gap-2 bg-surface-deep dark:bg-surface-deep-night text-brand-dark dark:text-brand text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider mb-6">
            <span className="w-1.5 h-1.5 bg-brand rounded-full" />
            {page?.heroEyebrowBadge ?? "Safety technology"}
          </div>
          <h1 className="font-graphik text-4xl md:text-5xl font-bold text-ink dark:text-white leading-tight tracking-tight mb-5">
            {page?.heroHeading ?? "Protect yourself silently. Even when you can't speak."}
          </h1>
          <p className="text-muted dark:text-muted-night text-base leading-relaxed mb-8 max-w-md">
            {page?.heroDescription}
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={`mailto:${settings?.demoEmail ?? "natasha@listenapp.org"}`}
              className="btn-arrow inline-flex items-center gap-2 bg-brand text-white font-semibold text-sm px-6 py-3 rounded-lg hover:bg-brand-dark hover:text-white transition-colors"
            >
              {page?.heroPrimaryCtaLabel ?? "Request a demo"} <span className="arrow">→</span>
            </a>
            <Link href="/the-problem" className="text-brand font-semibold text-sm link-underline">
              {page?.heroSecondaryCtaLabel ?? "Learn how it works"}
            </Link>
          </div>
        </div>

        {/* Phone mockup — hidden on small screens */}
        <div className="hidden md:flex justify-center relative">
          <div className="w-52 bg-ink rounded-3xl p-5 border-4 border-[#2e0f18]">
            <div className="bg-surface rounded-2xl p-4 overflow-hidden">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-semibold text-ink">9:41</span>
                <span className="text-[10px] text-muted">Calculator</span>
              </div>
              <div className="bg-ink rounded-xl p-3 mb-2 text-right">
                <span className="text-2xl text-white font-light tracking-tight">1,247</span>
              </div>
              <div className="grid grid-cols-4 gap-1">
                {["AC", "+/-", "%", "÷", "7", "8", "9", "×", "4", "5", "6", "−", "1", "2", "3", "+"].map((k) => (
                  <div key={k} className={`rounded-md py-2 text-center text-xs font-medium ${["÷","×","−","+"].includes(k) ? "bg-surface-deep text-brand-dark" : "bg-[#ecdde1] text-ink"}`}>
                    {k}
                  </div>
                ))}
                <div className="col-span-2 bg-[#ecdde1] text-ink rounded-md py-2 text-center text-xs font-medium">0</div>
                <div className="bg-[#ecdde1] text-ink rounded-md py-2 text-center text-xs font-medium">.</div>
                <div className="bg-brand text-white rounded-md py-2 text-center text-xs font-bold">=</div>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-2 -right-4 bg-ink text-white rounded-xl px-3 py-2.5 text-xs font-semibold w-32 leading-snug">
            <span className="inline-block w-2 h-2 bg-brand rounded-full mr-1.5 animate-pulse align-middle" />
            Alert sent<br />
            <span className="text-[10px] opacity-75">Location shared · Recording on</span>
          </div>
        </div>
      </section>

      {/* ── Stats bar ── */}
      {stats.length > 0 && (
        <div className="bg-ink py-8">
          <div className="max-w-5xl mx-auto px-4 md:px-8 grid grid-cols-3 gap-4 text-center">
            {stats.map((s) => (
              <div key={s._key}>
                <div className="font-tungsten text-4xl md:text-5xl font-semibold text-white tracking-normal leading-none">{s.number}</div>
                <div className="text-xs text-white/75 uppercase tracking-wider font-medium mt-2">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Features ── */}
      <section className="max-w-5xl mx-auto px-4 md:px-8 py-12 md:py-16">
        <p className="text-sm font-bold uppercase tracking-widest text-brand mb-2">{page?.featuresEyebrow ?? "How it works"}</p>
        <h2 className="font-graphik text-3xl md:text-4xl font-bold text-ink dark:text-white tracking-tight mb-2">{page?.featuresHeading ?? "Critical features, hidden in plain sight"}</h2>
        <p className="text-muted dark:text-muted-night text-base mb-10 max-w-lg">{page?.featuresIntro}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <FadeUp key={f._key} delay={i * 80}>
              <div className="bg-surface dark:bg-surface-night rounded-2xl p-6 h-full">
                <div className="w-10 h-10 bg-surface-deep dark:bg-surface-deep-night rounded-xl flex items-center justify-center mb-4 text-brand">
                  <Icon name={f.icon} size={20} stroke={2} />
                </div>
                <h3 className="text-sm font-semibold text-ink dark:text-white mb-1.5">{f.title}</h3>
                <p className="text-xs text-muted dark:text-muted-night leading-relaxed">{f.description}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── Security section ── */}
      <section className="bg-surface dark:bg-surface-night py-12 md:py-14">
        <div className="max-w-5xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-brand mb-2">{page?.securityEyebrow ?? "Security by design"}</p>
            <h2 className="font-graphik text-3xl md:text-4xl font-bold text-ink dark:text-white tracking-tight mb-4 leading-tight">
              {page?.securityHeading ?? "Built to protect, not attract attention"}
            </h2>
            <p className="text-sm text-muted dark:text-muted-night leading-relaxed mb-6">
              {page?.securityBody}
            </p>
            <ul className="space-y-3">
              {(page?.securityChecklist ?? []).map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-ink dark:text-white">
                  <span className="w-5 h-5 bg-surface-deep dark:bg-surface-deep-night rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-[10px] text-brand font-bold">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-ink rounded-2xl p-7 text-white">
            <p className="text-sm font-bold mb-1">{page?.secretCodeHeading ?? "Enter your secret code"}</p>
            <p className="text-xs text-muted-light mb-5">{page?.secretCodeSubtext ?? "Looks like a calculator. Acts as your guardian."}</p>
            <div className="bg-white/5 rounded-xl p-3 text-right mb-4">
              <span className="text-3xl font-light tracking-[0.3em]">••••</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {([["1",""],["2","ABC"],["3","DEF"],["4","GHI"],["5","JKL"],["6","MNO"],["7","PQRS"],["8","TUV"],["9","WXYZ"],["*",""],["0","+"],["#",""]] as [string,string][]).map(([num, sub], i) => (
                <div key={i} className={`rounded-lg p-3 text-center ${i === 4 ? "bg-brand" : "bg-white/10"}`}>
                  <span className="block text-lg font-light">{num}</span>
                  {sub && <span className="block text-[7px] text-muted-light tracking-widest uppercase">{sub}</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Partners ── */}
      {partners.length > 0 && (
        <section className="py-12">
          <div className="max-w-5xl mx-auto px-4 md:px-8">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-light dark:text-muted-light-night text-center mb-7">{page?.partnersHeading ?? "Proud to work alongside"}</p>
            <div className="flex flex-wrap justify-center gap-3">
              {partners.map((p) => {
                const logoUrl = urlForImage(p.logo)?.height(80).fit("max").url();
                const logoDarkUrl = urlForImage(p.logoDark)?.height(80).fit("max").url() ?? logoUrl;
                const CardTag = p.url ? "a" : "div";
                return (
                  <CardTag
                    key={p._key}
                    {...(p.url ? { href: p.url, target: "_blank", rel: "noopener noreferrer" } : {})}
                    className={`bg-surface dark:bg-surface-night rounded-lg px-4 py-3 text-center flex flex-col items-center justify-center gap-1.5 min-h-[88px] w-[calc(50%-0.375rem)] md:w-[calc(33.333%-0.5rem)] ${p.url ? "card-hover" : ""}`}
                  >
                    {logoUrl ? (
                      <div className="relative w-28 h-10">
                        <Image src={logoUrl} alt={p.name} fill className="object-contain dark:hidden" sizes="112px" />
                        {logoDarkUrl && (
                          <Image src={logoDarkUrl} alt={p.name} fill className="object-contain hidden dark:block" sizes="112px" />
                        )}
                      </div>
                    ) : (
                      <p className="text-sm font-bold text-ink dark:text-white">{p.name}</p>
                    )}
                    <p className="text-[10px] text-muted-light dark:text-muted-light-night mt-0.5">{p.type}</p>
                  </CardTag>
                );
              })}
            </div>
            {supporters.length > 0 ? (
              <p className="text-center text-xs text-muted-light dark:text-muted-light-night mt-5">
                Special thanks to{" "}
                {supporters.map((s, i) => (
                  <span key={s._key}>
                    {s.url ? (
                      <a href={s.url} target="_blank" rel="noopener noreferrer" className="font-medium hover:text-brand transition-colors">
                        {s.name}
                      </a>
                    ) : (
                      s.name
                    )}
                    {i < supporters.length - 2 ? ", " : i === supporters.length - 2 ? ", and " : ""}
                  </span>
                ))}{" "}
                for their support.
              </p>
            ) : page?.partnersThanksNote && (
              <p className="text-center text-xs text-muted-light dark:text-muted-light-night mt-5">{page.partnersThanksNote}</p>
            )}
          </div>
        </section>
      )}

      {/* ── Research band ── */}
      {settings?.researchBand && (
        <section className="bg-brand py-12">
          <div className="max-w-5xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10">
            <div className="font-tungsten text-7xl md:text-8xl font-semibold text-white leading-none tracking-normal flex-shrink-0">
              {settings.researchBand.stat}
            </div>
            <div>
              <h3 className="font-gilroy text-xl font-bold text-white mb-2">{settings.researchBand.heading}</h3>
              <p className="text-sm text-white/80 leading-relaxed mb-4">{settings.researchBand.body}</p>
              {settings.researchBand.ctaUrl && (
                <a href={settings.researchBand.ctaUrl} className="text-white font-semibold text-sm link-underline">
                  {settings.researchBand.ctaLabel} →
                </a>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="max-w-5xl mx-auto px-4 md:px-8 py-16 md:py-20 text-center">
        <p className="text-sm font-bold uppercase tracking-widest text-brand mb-3">{page?.ctaEyebrow ?? "Get involved"}</p>
        <h2 className="font-graphik text-3xl md:text-4xl font-bold text-ink dark:text-white tracking-tight mb-4">{page?.ctaHeading ?? "Ready to protect more people?"}</h2>
        <p className="text-muted dark:text-muted-night text-base mb-8 max-w-md mx-auto">{page?.ctaBody}</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href={`mailto:${settings?.demoEmail ?? "natasha@listenapp.org"}`} className="w-full sm:w-auto bg-brand text-white font-semibold text-sm px-7 py-3.5 rounded-lg hover:bg-brand-dark hover:text-white transition-colors text-center">
            {page?.ctaPrimaryLabel ?? "Request a demo"}
          </a>
          <Link href="/partner" className="w-full sm:w-auto bg-ink text-white font-semibold text-sm px-7 py-3.5 rounded-lg hover:opacity-80 transition-opacity text-center border border-transparent dark:border-border-night">
            {page?.ctaSecondaryLabel ?? "Partnership info"}
          </Link>
        </div>
      </section>
    </>
  );
}
