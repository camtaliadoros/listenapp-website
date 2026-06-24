import { defineField, defineType } from "sanity";

export default defineType({
  name: "problemPage",
  title: "The Problem Page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "stats", title: "Stats grid" },
    { name: "body", title: "Body copy" },
    { name: "solution", title: "What ListenApp does" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "heading", title: "Hero heading", type: "string", group: "hero" }),
    defineField({ name: "intro", title: "Hero intro", type: "text", rows: 2, group: "hero" }),

    defineField({
      name: "stats",
      title: "Stats",
      type: "array",
      group: "stats",
      description: "Shown in the stats grid. Drag to reorder.",
      of: [
        {
          type: "object",
          name: "stat",
          fields: [
            defineField({ name: "number", title: "Number (e.g. 2.3M)", type: "string", validation: (r) => r.required() }),
            defineField({ name: "label", title: "Label", type: "string", validation: (r) => r.required() }),
          ],
          preview: { select: { title: "number", subtitle: "label" } },
        },
      ],
    }),

    defineField({ name: "pullQuote", title: "Pull quote", type: "string", group: "body" }),
    defineField({
      name: "bodyColumns",
      title: "Body columns",
      type: "array",
      group: "body",
      description: "The two-column body copy beneath the pull quote.",
      of: [
        {
          type: "object",
          name: "bodyColumn",
          fields: [
            defineField({ name: "heading", title: "Heading", type: "string", validation: (r) => r.required() }),
            defineField({
              name: "paragraphs",
              title: "Paragraphs",
              type: "array",
              of: [{ type: "text", rows: 3 }],
            }),
          ],
          preview: { select: { title: "heading" } },
        },
      ],
      validation: (r) => r.max(2),
    }),

    defineField({ name: "solutionEyebrow", title: "Eyebrow", type: "string", group: "solution", initialValue: "What ListenApp does about it" }),
    defineField({ name: "solutionHeading", title: "Heading", type: "string", group: "solution", initialValue: "Closing the gap with technology" }),
    defineField({ name: "solutionIntro", title: "Intro text", type: "text", rows: 2, group: "solution" }),
    defineField({
      name: "solutionCards",
      title: "Cards",
      type: "array",
      group: "solution",
      of: [
        {
          type: "object",
          name: "solutionCard",
          fields: [
            defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
            defineField({ name: "body", title: "Body text", type: "text", rows: 3, validation: (r) => r.required() }),
          ],
          preview: { select: { title: "title", subtitle: "body" } },
        },
      ],
    }),

    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
  ],
  preview: { select: {}, prepare: () => ({ title: "The Problem Page" }) },
});
