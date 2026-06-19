import { client } from "@/sanity/client";
import { buildMetadata } from "@/lib/metadata";
import ContactForm from "./ContactForm";
import type { Metadata } from "next";

type ContactPage = {
  heading: string;
  intro: string;
  contactEmail: string;
  enquiryCategories: string[];
  successMessage: { heading: string; body: string };
  seo?: object;
};

async function getData() {
  return client.fetch<ContactPage>(`*[_type == "contactPage"][0]`, {}, { next: { revalidate: 60 } });
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await client.fetch<{ seo?: object }>(`*[_type == "contactPage"][0]{ seo }`, {}, { next: { revalidate: 3600 } });
  return buildMetadata(page?.seo as Parameters<typeof buildMetadata>[0]);
}

export default async function ContactPage() {
  const page = await getData();

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
          <h2 className="font-graphik text-xl font-bold text-ink mb-4">Other ways to reach us</h2>
          <div className="space-y-5">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-brand mb-1">Email</p>
              <a
                href={`mailto:${page?.contactEmail ?? "info@listenapp.org"}`}
                className="text-sm text-ink font-medium hover:text-brand transition-colors"
              >
                {page?.contactEmail ?? "info@listenapp.org"}
              </a>
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-brand mb-1">Request a demo</p>
              <a
                href="mailto:natasha@listenapp.org"
                className="text-sm text-ink font-medium hover:text-brand transition-colors"
              >
                natasha@listenapp.org
              </a>
            </div>
            <div className="bg-surface rounded-2xl p-5 mt-6">
              <p className="text-sm font-semibold text-ink mb-1">ListenApp CIC</p>
              <p className="text-xs text-muted leading-relaxed">
                A non-profit Community Interest Company<br />
                Company no. 13740982<br />
                Liverpool and London
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
