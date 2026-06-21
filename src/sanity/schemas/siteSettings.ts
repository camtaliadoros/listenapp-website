import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "siteUrl", title: "Site URL (no trailing slash)", type: "url", description: "e.g. https://listenapp.org" }),
    defineField({ name: "siteName", title: "Site name", type: "string", initialValue: "ListenApp" }),
    defineField({ name: "defaultSeo", title: "Default SEO (fallback for all pages)", type: "seo" }),
    defineField({ name: "contactEmail", title: "Contact email", type: "string" }),
    defineField({ name: "demoEmail", title: "Demo request email", type: "string" }),
    defineField({ name: "companyNumber", title: "Company number", type: "string" }),
    defineField({ name: "companyLocations", title: "Locations (e.g. Liverpool and London)", type: "string" }),
    defineField({
      name: "researchBand",
      title: "Research band",
      type: "object",
      fields: [
        defineField({ name: "stat", title: "Stat (e.g. 100%)", type: "string" }),
        defineField({ name: "heading", title: "Heading", type: "string" }),
        defineField({ name: "body", title: "Body text", type: "text", rows: 3 }),
        defineField({ name: "ctaLabel", title: "CTA label", type: "string" }),
        defineField({ name: "ctaUrl", title: "CTA URL", type: "url" }),
      ],
    }),
  ],
  preview: { select: { title: "contactEmail" }, prepare: () => ({ title: "Site Settings" }) },
});
