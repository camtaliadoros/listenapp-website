import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/client";

async function getSettings() {
  return client.fetch(
    `*[_type == "siteSettings"][0]{
      contactEmail, companyNumber, companyLocations, privacyPolicyUrl
    }`,
    {},
    { next: { revalidate: 3600 } }
  );
}

export default async function Footer() {
  const settings = await getSettings();

  return (
    <footer className="bg-ink text-white mt-auto">
      <div className="max-w-5xl mx-auto px-8 py-10 flex items-center justify-between flex-wrap gap-6">
        <div>
          <Image
            src="/ListenAppLogo-White-Version.svg"
            alt="ListenApp"
            width={140}
            height={28}
            className="mb-3"
          />
          <p className="text-sm text-muted-light leading-relaxed">
            ListenApp CIC · Company no. {settings?.companyNumber}<br />
            {settings?.companyLocations}<br />
            <a href={`mailto:${settings?.contactEmail}`} className="hover:text-white transition-colors">
              {settings?.contactEmail}
            </a>
          </p>
        </div>

        <div className="flex gap-8">
          <Link href="/the-problem" className="text-sm text-muted-light hover:text-white transition-colors">The Problem</Link>
          <Link href="/partner" className="text-sm text-muted-light hover:text-white transition-colors">Partner with us</Link>
          <Link href="/about" className="text-sm text-muted-light hover:text-white transition-colors">About</Link>
          <Link href="/contact" className="text-sm text-muted-light hover:text-white transition-colors">Contact</Link>
          {settings?.privacyPolicyUrl && (
            <a href={settings.privacyPolicyUrl} className="text-sm text-muted-light hover:text-white transition-colors">
              Privacy policy
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
