import { MetadataRoute } from "next";
import { client } from "@/sanity/client";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const settings = await client.fetch<{ siteUrl?: string }>(
    `*[_type == "siteSettings"][0]{ siteUrl }`,
    {},
    { next: { revalidate: 3600 } }
  );

  const base = settings?.siteUrl ?? "https://listenapp.org";

  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: "/studio/" },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}
