import { defineField, defineType } from "sanity";

export default defineType({
  name: "partnershipStep",
  title: "Partnership Step",
  type: "document",
  fields: [
    defineField({ name: "stepNumber", title: "Step number", type: "number", validation: (r) => r.required().min(1) }),
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "body", title: "Body text", type: "text", rows: 3, validation: (r) => r.required() }),
  ],
  orderings: [{ title: "Step order", name: "stepAsc", by: [{ field: "stepNumber", direction: "asc" }] }],
  preview: {
    select: { title: "title", num: "stepNumber" },
    prepare: ({ title, num }) => ({ title: `${num}. ${title}` }),
  },
});
