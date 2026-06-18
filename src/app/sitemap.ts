import { MetadataRoute } from "next";
import { client } from "@/sanity/client";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const settings = await client.fetch<{ siteUrl?: string }>(
    `*[_type == "siteSettings"][0]{ siteUrl }`,
    {},
    { next: { revalidate: 3600 } }
  );

  const base = settings?.siteUrl ?? "https://listenapp.org";

  const routes = ["/", "/the-problem", "/partner", "/about", "/contact"];

  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "/" ? 1 : 0.8,
  }));
}
