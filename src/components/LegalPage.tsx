import { PortableText, type PortableTextBlock, type PortableTextComponents } from "@portabletext/react";
import { client } from "@/sanity/client";
import { sanityFetch } from "@/sanity/live";
import { buildMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

type LegalSection = { _key: string; title: string; navTitle?: string; body: PortableTextBlock[] };
export type LegalPageDoc = {
  eyebrow?: string;
  title: string;
  effectiveDate?: string;
  metaLabel?: string;
  sections?: LegalSection[];
  seo?: object;
};

export async function getLegalPage(id: string) {
  const { data } = await sanityFetch({ query: `*[_id == $id][0]`, params: { id } });
  return data as LegalPageDoc | null;
}

export async function legalPageMetadata(id: string, fallbackTitle: string): Promise<Metadata> {
  const page = await client.fetch<{ title?: string; seo?: { title?: string } }>(
    `*[_id == $id][0]{ title, seo }`,
    { id },
    { next: { revalidate: 3600 } }
  );
  return buildMetadata({ title: page?.title ?? fallbackTitle, ...page?.seo } as Parameters<typeof buildMetadata>[0]);
}

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="text-sm text-muted dark:text-muted-night leading-relaxed mb-3.5">{children}</p>,
    h3: ({ children }) => <h3 className="text-base font-semibold text-ink dark:text-white mt-6 mb-2">{children}</h3>,
    note: ({ children }) => (
      <p className="bg-surface dark:bg-surface-night rounded-xl p-5 text-sm text-muted dark:text-muted-night leading-relaxed my-5">{children}</p>
    ),
    callout: ({ children }) => (
      <p className="border-l-4 border-brand bg-surface dark:bg-surface-night rounded-r-xl p-5 text-sm text-ink dark:text-white leading-relaxed my-5">{children}</p>
    ),
    critical: ({ children }) => (
      <p className="bg-brand text-white rounded-xl p-5 text-sm leading-relaxed my-5 [&_strong]:text-white">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc pl-5 mb-4 space-y-1.5 text-sm text-muted dark:text-muted-night leading-relaxed marker:text-brand">{children}</ul>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-ink dark:text-white">{children}</strong>,
    link: ({ children, value }) => (
      <a href={value?.href} className="text-brand font-medium hover:underline">{children}</a>
    ),
  },
};

const slugify = (s: string) => s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export default function LegalPage({ page, fallbackTitle }: { page: LegalPageDoc | null; fallbackTitle: string }) {
  const sections = (page?.sections ?? []).map((s) => ({ ...s, anchor: slugify(s.navTitle ?? s.title) }));

  return (
    <>
      {/* ── Hero ── */}
      <div className="bg-panel py-12 md:py-14">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <p className="text-sm font-bold uppercase tracking-widest text-panel-accent mb-3">{page?.eyebrow ?? "Legal information"}</p>
          <h1 className="font-graphik text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-5">
            {page?.title ?? fallbackTitle}
          </h1>
          <div className="flex flex-wrap gap-2">
            {[page?.effectiveDate && `Effective date: ${page.effectiveDate}`, page?.metaLabel].filter(Boolean).map((label) => (
              <span key={label as string} className="bg-white/10 text-white/80 text-xs font-medium px-3 py-1.5 rounded-full">{label}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-12 md:py-14 grid grid-cols-1 md:grid-cols-[220px_1fr] gap-10 md:gap-12 items-start">
        <nav aria-label="On this page" className="md:sticky md:top-24 md:max-h-[calc(100vh-7rem)] md:overflow-y-auto bg-surface dark:bg-surface-night rounded-2xl p-5">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-light dark:text-muted-light-night mb-3">On this page</p>
          <ol className="space-y-1">
            {sections.map((s) => (
              <li key={s._key}>
                <a href={`#${s.anchor}`} className="block text-sm text-muted dark:text-muted-night hover:text-brand transition-colors py-1 leading-snug">
                  {s.navTitle ?? s.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <article className="min-w-0">
          {sections.map((s, i) => (
            <section key={s._key} id={s.anchor} className="scroll-mt-24 pb-8 mb-8 border-b border-border dark:border-border-night last:border-0">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-9 h-9 bg-brand rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">{i + 1}</div>
                <h2 className="font-graphik text-xl md:text-2xl font-bold text-ink dark:text-white tracking-tight pt-1">{s.title}</h2>
              </div>
              <PortableText value={s.body ?? []} components={components} />
            </section>
          ))}
        </article>
      </div>
    </>
  );
}
