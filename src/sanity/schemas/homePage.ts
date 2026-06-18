import { defineField, defineType } from "sanity";

export default defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  fields: [
    defineField({ name: "heroHeading", title: "Hero heading", type: "string" }),
    defineField({ name: "heroDescription", title: "Hero description", type: "text", rows: 2 }),
    defineField({ name: "heroPrimaryCtaLabel", title: "Primary CTA label", type: "string" }),
    defineField({ name: "heroSecondaryCtaLabel", title: "Secondary CTA label", type: "string" }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
  preview: { select: {}, prepare: () => ({ title: "Home Page" }) },
});
