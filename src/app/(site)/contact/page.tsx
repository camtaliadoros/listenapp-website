import { client } from "@/sanity/client";
import { sanityFetch } from "@/sanity/live";
import { buildMetadata } from "@/lib/metadata";
import ContactForm from "./ContactForm";
import type { Metadata } from "next";

export const revalidate = 0;

type ContactPage = {
  heading: string;
  intro: string;
  contactEmail: string;
  asideHeading: string;
  enquiryCategories: string[];
  successMessage: { heading: string; body: string };
  seo?: object;
};
type SiteSettings = { demoEmail: string; companyNumber: string; companyLocations: string };

async function getData() {
  const [{ data: page }, { data: settings }] = await Promise.all([
    sanityFetch({ query: `*[_type == "contactPage"][0]` }),
    sanityFetch({ query: `*[_type == "siteSettings"][0]{ demoEmail, companyNumber, companyLocations }` }),
  ]);
  return { page: page as ContactPage | null, settings: settings as SiteSettings | null };
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await client.fetch<{ seo?: object }>(`*[_type == "contactPage"][0]{ seo }`, {}, { next: { revalidate: 3600 } });
  return buildMetadata(page?.seo as Parameters<typeof buildMetadata>[0]);
}

export default async function ContactPage() {
  const { page, settings } = await getData();

  return (
    <>
      {/* ── Hero ── */}
      <div className="bg-ink py-12 md:py-14">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <p className="text-sm font-bold uppercase tracking-widest text-brand mb-3">Contact</p>
          <h1 className="font-graphik text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-4">
            {page?.heading ?? "Get in touch"}
          </h1>
          <p className="text-white/75 text-base max-w-xl leading-relaxed">{page?.intro}</p>
        </div>
      </div>

      <section className="max-w-5xl mx-auto px-4 md:px-8 py-12 md:py-14 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
        {/* Form */}
        <ContactForm
          enquiryCategories={page?.enquiryCategories ?? []}
          successMessage={page?.successMessage}
        />

        {/* Aside */}
        <div className="pt-1">
          <h2 className="font-graphik text-xl font-bold text-ink dark:text-white mb-4">{page?.asideHeading ?? "Other ways to reach us"}</h2>
          <div className="space-y-5">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-brand mb-1">Email</p>
              <a
                href={`mailto:${page?.contactEmail ?? "info@listenapp.org"}`}
                className="text-sm text-ink dark:text-white font-medium hover:text-brand transition-colors"
              >
                {page?.contactEmail ?? "info@listenapp.org"}
              </a>
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-brand mb-1">Request a demo</p>
              <a
                href={`mailto:${settings?.demoEmail ?? "natasha@listenapp.org"}`}
                className="text-sm text-ink dark:text-white font-medium hover:text-brand transition-colors"
              >
                {settings?.demoEmail ?? "natasha@listenapp.org"}
              </a>
            </div>
            <div className="bg-surface dark:bg-surface-night rounded-2xl p-5 mt-6">
              <p className="text-sm font-semibold text-ink dark:text-white mb-1">ListenApp CIC</p>
              <p className="text-xs text-muted dark:text-muted-night leading-relaxed">
                A non-profit Community Interest Company<br />
                Company no. {settings?.companyNumber}<br />
                {settings?.companyLocations}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
