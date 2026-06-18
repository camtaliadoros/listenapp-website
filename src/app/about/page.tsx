import { client } from "@/sanity/client";
import { buildMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

type Value     = { _id: string; title: string; body: string; icon: string };
type AboutPage = { heading: string; intro: string; seo?: object };
type SiteSettings = { contactEmail: string; companyNumber: string; companyLocations: string };

async function getData() {
  const [page, values, settings] = await Promise.all([
    client.fetch<AboutPage>(`*[_type == "aboutPage"][0]`, {}, { next: { revalidate: 60 } }),
    client.fetch<Value[]>(`*[_type == "value"] | order(order asc)`, {}, { next: { revalidate: 3600 } }),
    client.fetch<SiteSettings>(
      `*[_type == "siteSettings"][0]{ contactEmail, companyNumber, companyLocations }`,
      {},
      { next: { revalidate: 3600 } }
    ),
  ]);
  return { page, values, settings };
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await client.fetch<{ seo?: object }>(`*[_type == "aboutPage"][0]{ seo }`, {}, { next: { revalidate: 3600 } });
  return buildMetadata(page?.seo as Parameters<typeof buildMetadata>[0]);
}

export default async function AboutPage() {
  const { page, values, settings } = await getData();

  const teamStats = [
    { num: "18 yrs", label: "technological & digital experience" },
    { num: "15 yrs", label: "in the philanthropic sector" },
    { num: "8+ yrs", label: "working directly against abuse" },
  ];

  return (
    <>
      {/* ── Hero ── */}
      <div className="bg-ink py-14">
        <div className="max-w-5xl mx-auto px-8">
          <p className="text-xs font-bold uppercase tracking-widest text-border mb-3">About us</p>
          <h1 className="font-graphik text-5xl font-bold text-white tracking-tight leading-tight mb-4">
            {page?.heading ?? "Built by people who know what's at stake."}
          </h1>
          <p className="text-muted-light text-base max-w-xl leading-relaxed">{page?.intro}</p>
        </div>
      </div>

      {/* ── Team ── */}
      <section className="max-w-5xl mx-auto px-8 py-14 grid grid-cols-2 gap-12">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-brand mb-2">Our experience</p>
          <h2 className="font-graphik text-3xl font-bold text-ink tracking-tight mb-4">Three disciplines, one mission</h2>
          <p className="text-sm text-muted leading-relaxed mb-8">Our team combines direct clinical work with survivors, technological expertise, and experience in the philanthropic sector. This isn't a tech company that discovered a social problem — it's a team that lived the problem first.</p>
          <div className="flex flex-col gap-6">
            {teamStats.map((s) => (
              <div key={s.label} className="border-l-4 border-brand pl-5">
                <div className="font-tungsten text-4xl font-bold text-brand leading-none">{s.num}</div>
                <div className="text-sm text-muted mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-brand mb-2">Our expertise</p>
          <h2 className="font-graphik text-3xl font-bold text-ink tracking-tight mb-4">Qualified across disciplines</h2>
          <p className="text-sm text-muted leading-relaxed mb-4">Team members are qualified in Counselling, Hypnotherapy, and Trauma Recovery — with direct experience supporting victims of abuse and working alongside domestic abuse charities.</p>
          <p className="text-sm text-muted leading-relaxed mb-4">We are proud to work with IT and philanthropic consultants from Direction Forward, Metric, and Canvas Philanthropy.</p>
          <p className="text-sm text-muted leading-relaxed">Through both professional and personal experience of abuse, the need for further support is clear — and that's what drives everything we build.</p>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="bg-surface border-t border-border py-14">
        <div className="max-w-5xl mx-auto px-8">
          <p className="text-xs font-bold uppercase tracking-widest text-brand mb-2">What we believe</p>
          <h2 className="font-graphik text-4xl font-bold text-ink tracking-tight mb-10">Our values</h2>
          <div className="grid grid-cols-3 gap-5">
            {values?.map((v) => (
              <div key={v._id} className="border border-border rounded-2xl p-6">
                <div className="text-2xl text-brand mb-4">
                  <i className={`ti ${v.icon}`} aria-hidden="true" />
                </div>
                <h3 className="text-sm font-semibold text-ink mb-2">{v.title}</h3>
                <p className="text-xs text-muted leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer detail ── */}
      <section className="max-w-5xl mx-auto px-8 py-12 text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-brand mb-2">ListenApp CIC</p>
        <p className="text-sm text-muted">Company no. {settings?.companyNumber} · {settings?.companyLocations}</p>
        <p className="text-sm text-muted mt-1">
          Contact us at{" "}
          <a href={`mailto:${settings?.contactEmail}`} className="text-brand font-semibold hover:underline">
            {settings?.contactEmail}
          </a>
        </p>
      </section>
    </>
  );
}
