import { defineField, defineType } from "sanity";

export default defineType({
  name: "stat",
  title: "Statistic",
  type: "document",
  fields: [
    defineField({ name: "number", title: "Number/value (e.g. 2.3M, 1 in 4)", type: "string", validation: (r) => r.required() }),
    defineField({ name: "label", title: "Label", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "context",
      title: "Context",
      type: "string",
      options: { list: ["home", "problem"] },
      description: "Where this stat appears",
      validation: (r) => r.required(),
    }),
    defineField({ name: "order", title: "Display order", type: "number" }),
  ],
  orderings: [{ title: "Display order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "number", subtitle: "label" } },
});
