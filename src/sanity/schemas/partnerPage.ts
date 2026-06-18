import { defineField, defineType } from "sanity";

export default defineType({
  name: "partnerPage",
  title: "Partner With Us Page",
  type: "document",
  fields: [
    defineField({ name: "heading", title: "Hero heading", type: "string" }),
    defineField({ name: "intro", title: "Hero intro", type: "text", rows: 2 }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
  preview: { select: {}, prepare: () => ({ title: "Partner With Us Page" }) },
});
