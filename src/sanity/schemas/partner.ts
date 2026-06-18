import { defineField, defineType } from "sanity";

export default defineType({
  name: "partner",
  title: "Partner / Supporter",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Organisation name", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      options: { list: ["Partner charity", "Supporter"] },
      validation: (r) => r.required(),
    }),
    defineField({ name: "url", title: "Website URL", type: "url" }),
    defineField({ name: "order", title: "Display order", type: "number" }),
  ],
  orderings: [{ title: "Display order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "name", subtitle: "type" } },
});
