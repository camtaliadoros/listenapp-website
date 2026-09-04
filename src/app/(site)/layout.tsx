import { draftMode } from "next/headers";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import QuickExit from "@/components/QuickExit";
import { sanityFetch } from "@/sanity/live";
import { SanityLive } from "@/sanity/live";
import { VisualEditing } from "next-sanity/visual-editing";

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [{ isEnabled: isDraftMode }, { data: settings }] = await Promise.all([
    draftMode(),
    sanityFetch({ query: `*[_type == "siteSettings"][0]{ demoEmail }` }),
  ]);
  const demoEmail = (settings as { demoEmail?: string } | null)?.demoEmail ?? "info@listenapp.org";

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-brand focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-semibold"
      >
        Skip to content
      </a>
      <Nav demoEmail={demoEmail} />
      <main id="main-content" className="flex-1 pt-16">{children}</main>
      <Footer />
      <QuickExit />
      <CookieConsent />
      <SanityLive />
      {isDraftMode && <VisualEditing />}
    </>
  );
}
