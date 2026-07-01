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
    defineField({ name: "companyNumber", title: "Company number", type: "string" }),
  ],
  preview: { select: { title: "contactEmail" }, prepare: () => ({ title: "Site Settings" }) },
});
