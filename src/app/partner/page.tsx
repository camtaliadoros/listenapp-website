import { client } from "@/sanity/client";
import { buildMetadata } from "@/lib/metadata";
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
      <div className="bg-ink py-14">
        <div className="max-w-5xl mx-auto px-8">
          <p className="text-xs font-bold uppercase tracking-widest text-border mb-3">Partnership</p>
          <h1 className="font-graphik text-5xl font-bold text-white tracking-tight leading-tight mb-4">
            {page?.heading ?? "Bring ListenApp to your beneficiaries."}
          </h1>
          <p className="text-muted-light text-base max-w-xl leading-relaxed">{page?.intro}</p>
        </div>
      </div>

      {/* ── Steps ── */}
      <section className="max-w-5xl mx-auto px-8 py-14">
        <p className="text-xs font-bold uppercase tracking-widest text-brand mb-2">How it works</p>
        <h2 className="font-graphik text-4xl font-bold text-ink tracking-tight mb-10">Simple to adopt, built to last</h2>
        <div className="flex flex-col gap-4">
          {steps?.map((s) => (
            <div key={s._id} className="grid grid-cols-[48px_1fr] gap-5 bg-surface border border-border rounded-2xl p-6 items-start">
              <div className="w-9 h-9 bg-brand rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                {s.stepNumber}
              </div>
              <div>
                <h3 className="text-base font-semibold text-ink mb-1">{s.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Trust cards ── */}
      <section className="bg-surface border-t border-border py-14">
        <div className="max-w-5xl mx-auto px-8">
          <div className="grid grid-cols-2 gap-5">
            <div className="bg-ink rounded-2xl p-7">
              <h3 className="font-gilroy text-base font-bold text-white mb-3">Fully GDPR compliant</h3>
              <p className="text-sm text-muted-light leading-relaxed">Personal data is saved only to the user's device — never to external servers. Anonymous usage data is available solely for your organisation's insight, never for marketing.</p>
            </div>
            <div className="bg-ink rounded-2xl p-7">
              <h3 className="font-gilroy text-base font-bold text-white mb-3">15+ years in digital for charities</h3>
              <p className="text-sm text-muted-light leading-relaxed">Our development team has spent over 15 years building digital solutions for the charitable sector — we understand your constraints and your users.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact form ── */}
      <section className="max-w-5xl mx-auto px-8 py-14" id="register">
        <p className="text-xs font-bold uppercase tracking-widest text-brand mb-2">Register interest</p>
        <h2 className="font-graphik text-4xl font-bold text-ink tracking-tight mb-2">Get in touch</h2>
        <p className="text-muted text-base mb-8 max-w-lg">Tell us about your organisation and we'll arrange a demo at a time that works for you.</p>
        <form className="max-w-lg space-y-5">
          {[
            { label: "Full name", type: "text", placeholder: "Your name", required: true },
            { label: "Organisation", type: "text", placeholder: "Your charity or organisation", required: true },
            { label: "Email address", type: "email", placeholder: "you@organisation.org", required: true },
            { label: "How did you hear about ListenApp?", type: "text", placeholder: "e.g. referral, event, search", required: false },
          ].map((f) => (
            <div key={f.label}>
              <label className="block text-sm font-semibold text-ink mb-1.5">
                {f.label} {f.required && <span className="text-brand">*</span>}
              </label>
              <input
                type={f.type}
                placeholder={f.placeholder}
                required={f.required}
                className="w-full px-3.5 py-2.5 border border-border rounded-lg text-sm text-ink placeholder:text-muted-light focus:outline-none focus:border-brand transition-colors"
              />
            </div>
          ))}
          <button
            type="submit"
            className="inline-flex items-center gap-2 bg-brand text-white font-semibold text-sm px-6 py-3 rounded-lg hover:bg-brand-dark transition-colors"
          >
            Send enquiry →
          </button>
        </form>
      </section>
    </>
  );
}
