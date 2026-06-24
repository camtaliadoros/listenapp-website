import { draftMode } from "next/headers";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
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
  const demoEmail = (settings as { demoEmail?: string } | null)?.demoEmail ?? "natasha@listenapp.org";

  return (
    <>
      <Nav demoEmail={demoEmail} />
      <main className="flex-1">{children}</main>
      <Footer />
      <SanityLive />
      {isDraftMode && <VisualEditing />}
    </>
  );
}
