import { client } from "@/sanity/client";
import FadeUp from "@/components/FadeUp";
import { buildMetadata } from "@/lib/metadata";
import PartnerForm from "./PartnerForm";
import type { Metadata } from "next";

type Step        = { _id: string; stepNumber: number; title: string; body: string };
type PartnerPage = { heading: string; intro: string; seo?: object };

async function getData() {
  const [page, steps] = await Promise.all([
    client.fetch<PartnerPage>(`*[_type == "partnerPage"][0]`, {}, { next: { revalidate: 60 } }),
    client.fetch<Step[]>(`*[_type == "partnershipStep"] | order(stepNumber asc)`, {}, { next: { revalidate: 3600 } }),
  ]);
  return { page, steps };
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await client.fetch<{ seo?: object }>(`*[_type == "partnerPage"][0]{ seo }`, {}, { next: { revalidate: 3600 } });
  return buildMetadata(page?.seo as Parameters<typeof buildMetadata>[0]);
}

export default async function PartnerPage() {
  const { page, steps } = await getData();

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
        <p className="text-sm font-bold uppercase tracking-widest text-brand mb-2">How it works</p>
        <h2 className="font-graphik text-3xl md:text-4xl font-bold text-ink tracking-tight mb-10">Simple to adopt, built to last</h2>
        <div className="flex flex-col gap-4">
          {steps?.map((s, i) => (
            <FadeUp key={s._id} delay={i * 80}>
            <div className="grid grid-cols-[48px_1fr] gap-5 bg-surface rounded-2xl p-6 items-start card-hover">
              <div className="w-9 h-9 bg-brand rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                {s.stepNumber}
              </div>
              <div>
                <h3 className="text-base font-semibold text-ink mb-1">{s.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{s.body}</p>
              </div>
            </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── Trust cards ── */}
      <section className="bg-surface py-12 md:py-14">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-ink rounded-2xl p-7">
              <h3 className="font-gilroy text-base font-bold text-white mb-3">Fully GDPR compliant</h3>
              <p className="text-sm text-white/75 leading-relaxed">Personal data is saved only to the user's device — never to external servers. Anonymous usage data is available solely for your organisation's insight, never for marketing.</p>
            </div>
            <div className="bg-ink rounded-2xl p-7">
              <h3 className="font-gilroy text-base font-bold text-white mb-3">15+ years in digital for charities</h3>
              <p className="text-sm text-white/75 leading-relaxed">Our development team has spent over 15 years building digital solutions for the charitable sector — we understand your constraints and your users.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact form ── */}
      <section className="max-w-5xl mx-auto px-4 md:px-8 py-12 md:py-14" id="register">
        <p className="text-sm font-bold uppercase tracking-widest text-brand mb-2">Register interest</p>
        <h2 className="font-graphik text-3xl md:text-4xl font-bold text-ink tracking-tight mb-2">Get in touch</h2>
        <p className="text-muted text-base mb-8 max-w-lg">Tell us about your organisation and we'll arrange a demo at a time that works for you.</p>
        <PartnerForm />
      </section>
    </>
  );
}
