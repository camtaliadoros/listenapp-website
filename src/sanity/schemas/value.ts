import { defineField, defineType } from "sanity";

export default defineType({
  name: "value",
  title: "Company Value",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "body", title: "Body text", type: "text", rows: 3, validation: (r) => r.required() }),
    defineField({ name: "icon", title: "Icon name (Tabler Icons)", type: "string", description: "e.g. ti-heart" }),
    defineField({ name: "order", title: "Display order", type: "number" }),
  ],
  orderings: [{ title: "Display order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "body" } },
});
