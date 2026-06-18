import Link from "next/link";
import { client } from "@/sanity/client";
import { buildMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

// ── Types ──────────────────────────────────────────────────────────────────────

type Feature  = { _id: string; title: string; description: string; icon: string };
type Stat     = { _id: string; number: string; label: string };
type Partner  = { _id: string; name: string; type: string };
type HomePage = {
  heroHeading: string;
  heroDescription: string;
  heroPrimaryCtaLabel: string;
  heroSecondaryCtaLabel: string;
  seo?: { title?: string; description?: string; ogImage?: object; noIndex?: boolean };
};
type SiteSettings = {
  demoEmail: string;
  researchBand: { stat: string; heading: string; body: string; ctaLabel: string; ctaUrl: string };
};

// ── Data fetching ──────────────────────────────────────────────────────────────

async function getData() {
  const [page, settings, features, stats, partners] = await Promise.all([
    client.fetch<HomePage>(`*[_type == "homePage"][0]`, {}, { next: { revalidate: 60 } }),
    client.fetch<SiteSettings>(
      `*[_type == "siteSettings"][0]{ demoEmail, researchBand }`,
      {},
      { next: { revalidate: 3600 } }
    ),
    client.fetch<Feature[]>(`*[_type == "feature"] | order(order asc)`, {}, { next: { revalidate: 3600 } }),
    client.fetch<Stat[]>(`*[_type == "stat" && context == "home"] | order(order asc)`, {}, { next: { revalidate: 3600 } }),
    client.fetch<Partner[]>(
      `*[_type == "partner" && type == "Partner charity"] | order(order asc)`,
      {},
      { next: { revalidate: 3600 } }
    ),
  ]);
  return { page, settings, features, stats, partners };
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await client.fetch<{ seo?: object }>(
    `*[_type == "homePage"][0]{ seo }`,
    {},
    { next: { revalidate: 3600 } }
  );
  return buildMetadata(page?.seo as Parameters<typeof buildMetadata>[0]);
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default async function HomePage() {
  const { page, settings, features, stats, partners } = await getData();

  return (
    <>
      {/* ── Hero ── */}
      <section className="max-w-5xl mx-auto px-8 py-16 grid grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 bg-surface-deep text-brand-dark text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider mb-6">
            <span className="w-1.5 h-1.5 bg-brand rounded-full" />
            Safety technology
          </div>
          <h1 className="font-graphik text-5xl font-bold text-ink leading-tight tracking-tight mb-5">
            {page?.heroHeading ?? "Protect yourself silently. Even when you can't speak."}
          </h1>
          <p className="text-muted text-base leading-relaxed mb-8 max-w-md">
            {page?.heroDescription}
          </p>
          <div className="flex items-center gap-4">
            <a
              href={`mailto:${settings?.demoEmail ?? "natasha@listenapp.org"}`}
              className="inline-flex items-center gap-2 bg-brand text-white font-semibold text-sm px-6 py-3 rounded-lg hover:bg-brand-dark transition-colors"
            >
              {page?.heroPrimaryCtaLabel ?? "Request a demo"} →
            </a>
            <Link
              href="/the-problem"
              className="text-brand font-semibold text-sm border-b border-brand pb-px hover:opacity-75 transition-opacity"
            >
              {page?.heroSecondaryCtaLabel ?? "Learn how it works"}
            </Link>
          </div>
        </div>

        {/* Phone mockup */}
        <div className="flex justify-center relative">
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
                  <div
                    key={k}
                    className={`rounded-md py-2 text-center text-xs font-medium ${
                      ["÷", "×", "−", "+"].includes(k)
                        ? "bg-surface-deep text-brand-dark"
                        : "bg-[#ecdde1] text-ink"
                    }`}
                  >
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
      {stats && stats.length > 0 && (
        <div className="bg-ink py-8">
          <div className="max-w-5xl mx-auto px-8 grid grid-cols-3 gap-4 text-center">
            {stats.map((s) => (
              <div key={s._id}>
                <div className="font-tungsten text-6xl font-bold text-white tracking-tight leading-none">
                  {s.number}
                </div>
                <div className="text-xs text-muted-light uppercase tracking-wider font-medium mt-2">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Features ── */}
      <section className="max-w-5xl mx-auto px-8 py-16">
        <p className="text-xs font-bold uppercase tracking-widest text-brand mb-2">How it works</p>
        <h2 className="font-graphik text-4xl font-bold text-ink tracking-tight mb-2">Critical features, hidden in plain sight</h2>
        <p className="text-muted text-base mb-10 max-w-lg">Every feature is designed to be used without raising suspicion — so you can get help exactly when you need it most.</p>
        <div className="grid grid-cols-3 gap-5">
          {features?.map((f) => (
            <div key={f._id} className="bg-surface border border-border rounded-2xl p-6">
              <div className="w-10 h-10 bg-surface-deep rounded-xl flex items-center justify-center mb-4 text-brand text-lg">
                <i className={`ti ${f.icon}`} aria-hidden="true" />
              </div>
              <h3 className="text-sm font-semibold text-ink mb-1.5">{f.title}</h3>
              <p className="text-xs text-muted leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Security section ── */}
      <section className="bg-surface border-t border-border py-14">
        <div className="max-w-5xl mx-auto px-8 grid grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-brand mb-2">Security by design</p>
            <h2 className="font-graphik text-4xl font-bold text-ink tracking-tight mb-4 leading-tight">
              Built to protect,<br />not attract attention
            </h2>
            <p className="text-sm text-muted leading-relaxed mb-6">
              The app is disguised as a fully working calculator. The real ListenApp is only revealed by the user's secret code — invisible to anyone else who picks up the phone.
            </p>
            <ul className="space-y-3">
              {[
                "Appears as a standard calculator on your home screen",
                "Secret code unlocks the real ListenApp interface",
                "No visible alerts, notifications, or signs of use",
                "Works even when you cannot speak",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-ink">
                  <span className="w-5 h-5 bg-surface-deep rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-[10px] text-brand font-bold">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-ink rounded-2xl p-7 text-white">
            <p className="text-sm font-bold mb-1">Enter your secret code</p>
            <p className="text-xs text-muted-light mb-5">Looks like a calculator. Acts as your guardian.</p>
            <div className="bg-white/5 rounded-xl p-3 text-right mb-4">
              <span className="text-3xl font-light tracking-[0.3em]">••••</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {([["1",""], ["2","ABC"], ["3","DEF"], ["4","GHI"], ["5","JKL"], ["6","MNO"], ["7","PQRS"], ["8","TUV"], ["9","WXYZ"], ["*",""], ["0","+"], ["#",""]] as [string,string][]).map(([num, sub], i) => (
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
      {partners && partners.length > 0 && (
        <section className="border-t border-border py-12">
          <div className="max-w-5xl mx-auto px-8">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-light text-center mb-7">Proud to work alongside</p>
            <div className="grid grid-cols-3 gap-3">
              {partners.map((p) => (
                <div key={p._id} className="bg-surface border border-border rounded-lg px-4 py-3 text-center">
                  <p className="text-sm font-bold text-ink">{p.name}</p>
                  <p className="text-[10px] text-muted-light mt-0.5">{p.type}</p>
                </div>
              ))}
            </div>
            <p className="text-center text-xs text-muted-light mt-5">Special thanks to ManKind Initiative, SafeLives, and Ask for Angela for their support.</p>
          </div>
        </section>
      )}

      {/* ── Research band ── */}
      {settings?.researchBand && (
        <section className="bg-brand py-12">
          <div className="max-w-5xl mx-auto px-8 flex items-center gap-10">
            <div className="font-tungsten text-[6rem] font-bold text-white leading-none tracking-tighter flex-shrink-0">
              {settings.researchBand.stat}
            </div>
            <div>
              <h3 className="font-gilroy text-xl font-bold text-white mb-2">{settings.researchBand.heading}</h3>
              <p className="text-sm text-white/80 leading-relaxed mb-4">{settings.researchBand.body}</p>
              {settings.researchBand.ctaUrl && (
                <a
                  href={settings.researchBand.ctaUrl}
                  className="text-white font-semibold text-sm border-b border-white/50 pb-px hover:border-white transition-colors"
                >
                  {settings.researchBand.ctaLabel} →
                </a>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="max-w-5xl mx-auto px-8 py-20 text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-brand mb-3">Get involved</p>
        <h2 className="font-graphik text-4xl font-bold text-ink tracking-tight mb-4">Ready to protect more people?</h2>
        <p className="text-muted text-base mb-8 max-w-md mx-auto">Charity partners are selected to license ListenApp for free. If you work with vulnerable people, we'd love to hear from you.</p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <a
            href={`mailto:${settings?.demoEmail ?? "natasha@listenapp.org"}`}
            className="bg-brand text-white font-semibold text-sm px-7 py-3.5 rounded-lg hover:bg-brand-dark transition-colors"
          >
            Request a demo
          </a>
          <Link
            href="/partner"
            className="bg-ink text-white font-semibold text-sm px-7 py-3.5 rounded-lg hover:opacity-80 transition-opacity"
          >
            Partnership info
          </Link>
        </div>
      </section>
    </>
  );
}
