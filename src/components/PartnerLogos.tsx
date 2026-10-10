import Image from "next/image";
import { urlForImage } from "@/sanity/image";

export type Partner = {
  _key: string;
  name: string;
  type: string;
  url?: string;
  logo?: { asset?: { _ref: string } };
  logoDark?: { asset?: { _ref: string } };
};

// Partner charity logo grid plus the supporters thank-you line.
// Data lives on the Home Page document; the Partner page reuses it.
export default function PartnerLogos({
  partners: all,
  heading,
  thanksNote,
}: {
  partners: Partner[];
  heading?: string;
  thanksNote?: string;
}) {
  const partners = all.filter((p) => p.type === "Partner charity");
  const supporters = all.filter((p) => p.type === "Supporter");
  if (partners.length === 0) return null;

  return (
    <section className="py-12">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        <p className="text-xs font-bold uppercase tracking-widest text-muted-light dark:text-muted-light-night text-center mb-7">{heading ?? "Proud to work alongside"}</p>
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
        ) : thanksNote && (
          <p className="text-center text-xs text-muted-light dark:text-muted-light-night mt-5">{thanksNote}</p>
        )}
      </div>
    </section>
  );
}
