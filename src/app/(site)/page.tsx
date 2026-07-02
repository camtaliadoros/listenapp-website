import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/client";
import { sanityFetch } from "@/sanity/live";
import { urlForImage } from "@/sanity/image";
import { buildMetadata } from "@/lib/metadata";
import FadeUp from "@/components/FadeUp";
import Icon from "@/components/Icon";
import type { Metadata } from "next";

export const revalidate = 0;

type Feature = { _key: string; title: string; description: string; icon: string };
type Stat    = { _key: string; number: string; label: string };
type Partner = { _key: string; name: string; type: string; url?: string; logo?: { asset?: { _ref: string } }; logoDark?: { asset?: { _ref: string } } };
type HomePage = {
  heroImage?: { asset?: { _ref: string } };
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
};

async function getData() {
  const [{ data: page }, { data: settings }] = await Promise.all([
    sanityFetch({ query: `*[_type == "homePage"][0]` }),
    sanityFetch({ query: `*[_type == "siteSettings"][0]{ demoEmail }` }),
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
      <section className="-mt-16 relative min-h-screen flex items-end overflow-hidden">
        {/* Background image */}
        {page?.heroImage?.asset && (
          <Image
            src={urlForImage(page.heroImage)?.width(1920).fit("max").url() ?? ""}
            alt="ListenApp hero"
            fill
            className="object-cover object-[center_20%]"
            priority
          />
        )}
        {/* Fallback if no image uploaded yet */}
        {!page?.heroImage?.asset && (
          <div className="absolute inset-0 bg-gradient-to-br from-ink via-[#2a0a14] to-[#1a0508]" />
        )}
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/10 to-ink/85" />

        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-12 pb-16 md:pb-24 grid grid-cols-1 md:grid-cols-2">
          <div className="md:col-start-2">
          <div className="inline-flex items-center gap-2 bg-brand/85 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider mb-6">
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
            {page?.heroEyebrowBadge ?? "Safety technology"}
          </div>
          <h1 className="font-graphik text-4xl md:text-6xl font-bold text-white leading-tight tracking-tight mb-5 max-w-2xl [text-shadow:0_2px_30px_rgba(0,0,0,0.25)]">
            {page?.heroHeading ?? "The first UK support app that hears you, even when you can't reach your phone."}
          </h1>
          <p className="text-white/85 text-base md:text-lg leading-relaxed mb-8 max-w-lg">
            {page?.heroDescription}
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={`mailto:${settings?.demoEmail ?? "natasha@listenapp.org"}`}
              className="inline-flex items-center gap-2 bg-brand text-white font-semibold text-sm px-6 py-3.5 rounded-lg hover:bg-brand-dark transition-colors"
            >
              {page?.heroPrimaryCtaLabel ?? "Request a demo"} →
            </a>
            <Link href="/the-problem" className="text-white font-semibold text-sm border-b border-white/60 hover:border-white transition-colors pb-0.5">
              {page?.heroSecondaryCtaLabel ?? "Learn how it works"}
            </Link>
          </div>
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
          <div className="p-8 flex items-center justify-center">
            <svg width="300" height="300" viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Heart */}
              <path d="M100 117C100 112.8 103.1 109.5 107 109.5C108.9 109.5 110.6 110.4 111.7 111.8C112.8 110.4 114.5 109.5 116.4 109.5C120.3 109.5 123.4 112.8 123.4 117C123.4 122.8 111.7 130 111.7 130C111.7 130 100 122.8 100 117Z" fill="#E8184A"/>
              {/* Arc 1 — small */}
              <path d="M90 107 C90 96.5 100 89 111.7 89 C123.4 89 133.4 96.5 133.4 107" stroke="#E8184A" strokeWidth="5" strokeLinecap="butt" fill="none">
                <animate attributeName="opacity" values="0.15;1;0.15" dur="2.4s" repeatCount="indefinite" begin="0s"/>
              </path>
              {/* Arc 2 — medium */}
              <path d="M73 95 C73 79.5 91 68 111.7 68 C132.4 68 150.4 79.5 150.4 95" stroke="#E8184A" strokeWidth="5" strokeLinecap="butt" fill="none">
                <animate attributeName="opacity" values="0.15;1;0.15" dur="2.4s" repeatCount="indefinite" begin="0.4s"/>
              </path>
              {/* Arc 3 — large */}
              <path d="M55 82 C55 61.5 81.5 46 111.7 46 C141.9 46 168.4 61.5 168.4 82" stroke="#E8184A" strokeWidth="5" strokeLinecap="butt" fill="none">
                <animate attributeName="opacity" values="0.15;1;0.15" dur="2.4s" repeatCount="indefinite" begin="0.8s"/>
              </path>
              <text x="111.7" y="165" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="11" fontWeight="600" letterSpacing="2" fill="rgba(0,0,0,0.4)">LISTENING</text>
            </svg>
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

{/* ── CTA ── */}
      <section className="bg-surface dark:bg-surface-night py-16 md:py-20">
      <div className="max-w-5xl mx-auto px-4 md:px-8 text-center">
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
      </div>
      </section>
    </>
  );
}
