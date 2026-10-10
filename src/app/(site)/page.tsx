import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/client";
import { sanityFetch } from "@/sanity/live";
import { urlForImage } from "@/sanity/image";
import { buildMetadata } from "@/lib/metadata";
import FadeUp from "@/components/FadeUp";
import PartnerLogos, { type Partner } from "@/components/PartnerLogos";
import Icon from "@/components/Icon";
import type { Metadata } from "next";

export const revalidate = 60;

type Feature = { _key: string; title: string; description: string; icon: string };
type AppScreen = { _key: string; caption: string; alt?: string; asset?: { _ref: string } };
type HomePage = {
  heroImage?: { asset?: { _ref: string } };
  heroEyebrowBadge: string;
  heroHeading: string;
  heroDescription: string;
  heroPrimaryCtaLabel: string;
  heroSecondaryCtaLabel: string;
  demoEyebrow?: string;
  demoHeading?: string;
  demoVimeoId?: string;
  featuresEyebrow: string;
  featuresHeading: string;
  featuresIntro: string;
  features: Feature[];
  screensEyebrow: string;
  screensHeading: string;
  screensIntro: string;
  appScreens: AppScreen[];
  disclaimerHeading: string;
  disclaimerBody: string;
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
const DEFAULT_DEMO_VIMEO_ID = "1233840659";

// Temporary icon overrides, keyed by feature _key, so staging can show new icons
// without editing the shared Sanity dataset. Once live, set the icon in Studio and remove.
const FEATURE_ICON_OVERRIDES: Record<string, string> = {
  "6a34a26f-9935-4fc6-a02a-74e2bafbb7df": "ti-ear", // "On when it matters."
};

async function getData() {
  const { data: page } = await sanityFetch({ query: `*[_type == "homePage"][0]` });
  return page as HomePage | null;
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await client.fetch<{ seo?: object }>(`*[_type == "homePage"][0]{ seo }`, {}, { next: { revalidate: 3600 } });
  return buildMetadata(page?.seo as Parameters<typeof buildMetadata>[0]);
}

export default async function HomePage() {
  const page = await getData();
  const features = page?.features ?? [];
  const appScreens = (page?.appScreens ?? []).filter((s) => s.asset);

  return (
    <>
      {/* ── Hero ── */}
      <section className="-mt-16 relative min-h-screen flex items-end overflow-hidden bg-ink">
        {page?.heroImage?.asset && (
          <div className="absolute inset-0">
            <Image
              src={urlForImage(page.heroImage)?.width(1920).fit("max").url() ?? ""}
              alt="ListenApp hero"
              fill
              className="object-cover object-center"
              priority
            />
          </div>
        )}
        {/* Light shading on the left so the text stays readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink/60 via-ink/25 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/20 via-transparent to-ink/50" />

        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-12 pb-16 md:pb-24 grid grid-cols-1 md:grid-cols-2">
          <div className="md:col-start-1">
          <div className="inline-flex items-center gap-2 bg-brand/85 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider mb-6">
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
            {page?.heroEyebrowBadge ?? "Safety technology"}
          </div>
          <h1 className="font-graphik text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-5 max-w-2xl [text-shadow:0_2px_30px_rgba(0,0,0,0.25)]">
            {page?.heroHeading ?? "The first UK support app that hears you, even when you can't reach your phone."}
          </h1>
          <p className="text-white/85 text-base md:text-lg leading-relaxed mb-8 max-w-lg">
            {page?.heroDescription}
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/partner#register"
              className="inline-flex items-center gap-2 bg-brand text-white font-semibold text-sm px-6 py-3.5 rounded-lg hover:bg-brand-hover transition-colors"
            >
              {page?.heroPrimaryCtaLabel ?? "Register interest"} →
            </Link>
            <Link href="#demo" className="text-white font-semibold text-sm border-b border-white/60 hover:border-white transition-colors pb-0.5">
              {page?.heroSecondaryCtaLabel ?? "Learn how it works"}
            </Link>
          </div>
          </div>
        </div>
      </section>

      {/* ── Demo video ── */}
      <section id="demo" className="scroll-mt-20 max-w-5xl mx-auto px-4 md:px-8 pt-12 md:pt-16">
        <p className="text-sm font-bold uppercase tracking-widest text-brand mb-2">{page?.demoEyebrow ?? "Demo"}</p>
        <h2 className="font-graphik text-3xl md:text-4xl font-bold text-ink dark:text-white tracking-tight mb-8">{page?.demoHeading ?? "See ListenApp in action"}</h2>
        <div className="relative aspect-video rounded-2xl overflow-hidden bg-ink">
          <iframe
            src={`https://player.vimeo.com/video/${page?.demoVimeoId ?? DEFAULT_DEMO_VIMEO_ID}?dnt=1&title=0&byline=0&portrait=0`}
            title="ListenApp demo video"
            allow="fullscreen; picture-in-picture"
            allowFullScreen
            loading="lazy"
            className="absolute inset-0 w-full h-full"
          />
        </div>
      </section>

      {/* ── Features ── */}
      <section className="max-w-5xl mx-auto px-4 md:px-8 py-12 md:py-16">
        <p className="text-sm font-bold uppercase tracking-widest text-brand mb-2">{page?.featuresEyebrow ?? "How it works"}</p>
        <h2 className="font-graphik text-3xl md:text-4xl font-bold text-ink dark:text-white tracking-tight mb-2">{page?.featuresHeading ?? "Critical features, hidden in plain sight"}</h2>
        <p className="text-muted dark:text-muted-night text-base mb-10 max-w-lg">{page?.featuresIntro}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => (
            <FadeUp key={f._key} delay={i * 80}>
              <div className="bg-surface dark:bg-surface-night rounded-2xl p-6 h-full">
                <div className="w-10 h-10 bg-surface-deep dark:bg-surface-deep-night rounded-xl flex items-center justify-center mb-4 text-brand">
                  <Icon name={FEATURE_ICON_OVERRIDES[f._key] ?? f.icon} size={20} stroke={2} />
                </div>
                <h3 className="text-sm font-semibold text-ink dark:text-white mb-1.5">{f.title}</h3>
                <p className="text-xs text-muted dark:text-muted-night leading-relaxed">{f.description}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── App screenshots ── */}
      {appScreens.length > 0 && (
        <section className="max-w-5xl mx-auto px-4 md:px-8 pb-12 md:pb-16">
          <p className="text-sm font-bold uppercase tracking-widest text-brand mb-2">{page?.screensEyebrow ?? "Inside the app"}</p>
          <h2 className="font-graphik text-3xl md:text-4xl font-bold text-ink dark:text-white tracking-tight mb-2">{page?.screensHeading ?? "Simple to set up, quick to use"}</h2>
          {page?.screensIntro && <p className="text-muted dark:text-muted-night text-base max-w-lg">{page.screensIntro}</p>}
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 md:gap-8">
            {appScreens.map((s, i) => (
              <FadeUp key={s._key} delay={i * 80}>
                <figure className="max-w-[180px] mx-auto">
                  <div className="relative aspect-[716/1600] rounded-[2rem] overflow-hidden border-[5px] border-ink shadow-xl bg-ink">
                    <Image
                      src={urlForImage(s)?.width(480).fit("max").url() ?? ""}
                      alt={s.alt ?? s.caption}
                      fill
                      sizes="180px"
                      className="object-cover object-top"
                    />
                  </div>
                  <figcaption className="text-sm font-semibold text-ink dark:text-white text-center mt-4">{s.caption}</figcaption>
                </figure>
              </FadeUp>
            ))}
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
          <Link href="/partner#register" className="w-full sm:w-auto bg-brand text-white font-semibold text-sm px-7 py-3.5 rounded-lg hover:bg-brand-hover hover:text-white transition-colors text-center">
            {page?.ctaPrimaryLabel ?? "Register interest"}
          </Link>
          <Link href="/partner" className="w-full sm:w-auto bg-ink text-white font-semibold text-sm px-7 py-3.5 rounded-lg hover:opacity-85 transition-opacity text-center border border-transparent dark:border-border-night">
            {page?.ctaSecondaryLabel ?? "Partnership info"}
          </Link>
        </div>
      </div>
      </section>

      {/* ── Disclaimer ── */}
      <section className="max-w-5xl mx-auto px-4 md:px-8 pt-12 md:pt-14">
        <div className="border-l-4 border-brand bg-surface dark:bg-surface-night rounded-r-2xl p-6 md:p-8">
          <h2 className="font-graphik text-xl md:text-2xl font-bold text-ink dark:text-white tracking-tight mb-3">
            {page?.disclaimerHeading ?? "Designed to support, not replace, existing safety planning"}
          </h2>
          <p className="text-sm text-muted dark:text-muted-night leading-relaxed max-w-3xl">
            {page?.disclaimerBody ?? "ListenApp is an additional safety tool and does not replace emergency services or professional domestic abuse support. Voice recognition and message delivery can be affected by factors such as connectivity, background noise and phone settings."}
          </p>
        </div>
      </section>

      {/* ── Partners ── */}
      <PartnerLogos partners={page?.partners ?? []} heading={page?.partnersHeading} thanksNote={page?.partnersThanksNote} />
    </>
  );
}
