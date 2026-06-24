import { defineField, defineType } from "sanity";

export default defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "experience", title: "Our experience" },
    { name: "expertise", title: "Our expertise" },
    { name: "values", title: "Values" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "heading", title: "Hero heading", type: "string", group: "hero" }),
    defineField({ name: "intro", title: "Hero intro", type: "text", rows: 2, group: "hero" }),

    defineField({ name: "experienceEyebrow", title: "Eyebrow", type: "string", group: "experience", initialValue: "Our experience" }),
    defineField({ name: "experienceHeading", title: "Heading", type: "string", group: "experience", initialValue: "Three disciplines, one mission" }),
    defineField({ name: "experienceBody", title: "Body text", type: "text", rows: 4, group: "experience" }),
    defineField({
      name: "experienceStats",
      title: "Stats",
      type: "array",
      group: "experience",
      description: "Shown as the bordered stat list (e.g. '18 yrs — technological & digital experience').",
      of: [
        {
          type: "object",
          name: "experienceStat",
          fields: [
            defineField({ name: "number", title: "Number (e.g. 18 yrs)", type: "string", validation: (r) => r.required() }),
            defineField({ name: "label", title: "Label", type: "string", validation: (r) => r.required() }),
          ],
          preview: { select: { title: "number", subtitle: "label" } },
        },
      ],
      initialValue: [
        { number: "18 yrs", label: "technological & digital experience" },
        { number: "15 yrs", label: "in the philanthropic sector" },
        { number: "8+ yrs", label: "working directly against abuse" },
      ],
    }),

    defineField({ name: "expertiseEyebrow", title: "Eyebrow", type: "string", group: "expertise", initialValue: "Our expertise" }),
    defineField({ name: "expertiseHeading", title: "Heading", type: "string", group: "expertise", initialValue: "Qualified across disciplines" }),
    defineField({
      name: "expertiseParagraphs",
      title: "Paragraphs",
      type: "array",
      group: "expertise",
      of: [{ type: "text", rows: 3 }],
    }),

    defineField({ name: "valuesEyebrow", title: "Eyebrow", type: "string", group: "values", initialValue: "What we believe" }),
    defineField({ name: "valuesHeading", title: "Heading", type: "string", group: "values", initialValue: "Our values" }),
    defineField({
      name: "values",
      title: "Value cards",
      type: "array",
      group: "values",
      description: "Shown in the 'Our values' grid. Drag to reorder.",
      of: [
        {
          type: "object",
          name: "value",
          fields: [
            defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
            defineField({ name: "body", title: "Body text", type: "text", rows: 3, validation: (r) => r.required() }),
            defineField({ name: "icon", title: "Icon name (Tabler Icons)", type: "string", description: "e.g. ti-heart" }),
          ],
          preview: { select: { title: "title", subtitle: "body" } },
        },
      ],
    }),

    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
  ],
  preview: { select: {}, prepare: () => ({ title: "About Page" }) },
});
