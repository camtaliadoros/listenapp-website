import { Metadata } from "next";
import { client } from "@/sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(client);

interface SeoFields {
  title?: string;
  description?: string;
  ogImage?: { asset: { _ref: string } };
  noIndex?: boolean;
}

interface SiteDefaults {
  siteName?: string;
  siteUrl?: string;
  defaultSeo?: SeoFields;
}

const SITE_DEFAULTS_QUERY = `*[_type == "siteSettings"][0]{
  siteName, siteUrl,
  defaultSeo { title, description, ogImage, noIndex }
}`;

export async function buildMetadata(pageSeo?: SeoFields): Promise<Metadata> {
  const site: SiteDefaults = await client.fetch(SITE_DEFAULTS_QUERY, {}, { next: { revalidate: 3600 } });

  const title = pageSeo?.title ?? site.defaultSeo?.title ?? site.siteName ?? "ListenApp";
  const description = pageSeo?.description ?? site.defaultSeo?.description ?? undefined;
  const ogImageSource = pageSeo?.ogImage ?? site.defaultSeo?.ogImage;
  const noIndex = pageSeo?.noIndex ?? false;

  const ogImageUrl = ogImageSource
    ? builder.image(ogImageSource).width(1200).height(630).url()
    : undefined;

  const siteUrl = site.siteUrl ?? "";
  const siteName = site.siteName ?? "ListenApp";

  return {
    title: { default: title, template: `%s | ${siteName}` },
    description,
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      siteName,
      title,
      description,
      ...(ogImageUrl ? { images: [{ url: ogImageUrl, width: 1200, height: 630 }] } : {}),
      ...(siteUrl ? { url: siteUrl } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(ogImageUrl ? { images: [ogImageUrl] } : {}),
    },
  };
}
