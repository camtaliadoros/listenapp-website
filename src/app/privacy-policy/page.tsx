import { buildMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "Privacy Policy",
    description: "How ListenApp CIC collects, uses, and protects your personal information.",
    noIndex: true,
  } as Parameters<typeof buildMetadata>[0]);
}

const sections = [
  {
    title: "Log Data",
    body: "When you visit our website, our servers may automatically log standard data provided by your web browser. This may include your device's Internet Protocol (IP) address, browser type and version, the pages you visit, the time and date of your visit, and other details about your visit. This data is used solely to understand how visitors use our services and to improve the user experience. We do not share data specifics publicly, but may disclose aggregated, anonymised information.",
  },
  {
    title: "Personal Information",
    body: "We may ask for personal information — such as your name, email address, or organisation details — only when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We only retain collected information for as long as necessary to provide you with your requested service. You may decline to provide personal information, understanding that this may limit some of the services we can offer.",
  },
  {
    title: "Cookies",
    body: "We use cookies to collect information about your activity on our site. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, some parts of our service may not function properly. This policy covers only the use of cookies between your computer and our website; it does not cover the use of cookies by any advertisers or third-party websites we link to.",
  },
  {
    title: "Third-Party Services",
    body: "We may employ third-party companies and individuals — for example, for analytics or content delivery — due to their expertise or to allow us to focus on our core work. These third parties have access to your personal information only to perform specific tasks on our behalf and are obligated not to disclose or use it for any other purpose.",
  },
  {
    title: "Security",
    body: "We take commercially acceptable means to protect your personal information from loss, theft, unauthorised access, disclosure, copying, use, or modification. However, no method of electronic transmission or storage is 100% secure, and we cannot guarantee absolute security.",
  },
  {
    title: "Links to Other Sites",
    body: "Our website may contain links to external sites that are not operated by us. Please be aware that we have no control over the content and practices of those sites and cannot accept responsibility or liability for their respective privacy policies.",
  },
  {
    title: "Changes to This Policy",
    body: "We may update this Privacy Policy from time to time. Any changes will be posted on this page. Your continued use of our website following the posting of changes constitutes your acceptance of those changes.",
  },
  {
    title: "Business Transfers",
    body: "If ListenApp CIC is acquired by or merged with another organisation, or if we face insolvency, your information may be transferred to the acquiring party. That party may continue to use your data in accordance with the terms of this policy.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <div className="bg-ink py-12 md:py-14">
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          <p className="text-sm font-bold uppercase tracking-widest text-brand mb-3">Legal</p>
          <h1 className="font-graphik text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-white/75 text-base leading-relaxed">
            Your privacy is important to us. We don't ask for your personal information unless we truly need it.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 md:px-8 py-12 md:py-16">
        <p className="text-sm text-muted mb-10">
          This policy applies to all information collected or submitted on the ListenApp CIC website and services.
          ListenApp CIC · Company no. 13740982 · Liverpool and London.
        </p>

        <div className="space-y-10">
          {sections.map((s) => (
            <div key={s.title}>
              <h2 className="font-graphik text-lg font-bold text-ink mb-3">{s.title}</h2>
              <p className="text-sm text-muted leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-xs text-muted">
            Questions about this policy? Contact us at{" "}
            <a href="mailto:info@listenapp.org" className="text-brand font-medium hover:underline">
              info@listenapp.org
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
