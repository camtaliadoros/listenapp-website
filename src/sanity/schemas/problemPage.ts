import { defineField, defineType } from "sanity";

export default defineType({
  name: "problemPage",
  title: "The Problem Page",
  type: "document",
  fields: [
    defineField({ name: "heading", title: "Hero heading", type: "string" }),
    defineField({ name: "intro", title: "Hero intro", type: "text", rows: 2 }),
    defineField({ name: "pullQuote", title: "Pull quote", type: "string" }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
  preview: { select: {}, prepare: () => ({ title: "The Problem Page" }) },
});
