import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "legalPage",
  title: "App Legal Page",
  type: "document",
  groups: [
    { name: "header", title: "Header" },
    { name: "content", title: "Sections" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string", group: "header", initialValue: "Legal information" }),
    defineField({ name: "title", title: "Title", type: "string", group: "header", validation: (r) => r.required() }),
    defineField({ name: "effectiveDate", title: "Effective date", type: "string", group: "header", description: "e.g. 01 September 2026" }),
    defineField({ name: "metaLabel", title: "Extra label", type: "string", group: "header", description: "Shown next to the effective date, e.g. 'Controller: ListenApp CIC'." }),
    defineField({
      name: "sections",
      title: "Sections",
      type: "array",
      group: "content",
      description: "Numbered automatically in this order. Drag to reorder.",
      of: [
        defineArrayMember({
          type: "object",
          name: "legalSection",
          fields: [
            defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
            defineField({ name: "navTitle", title: "Short title for 'On this page'", type: "string", description: "Optional. Falls back to the title." }),
            defineField({
              name: "body",
              title: "Body",
              type: "array",
              of: [
                defineArrayMember({
                  type: "block",
                  styles: [
                    { title: "Normal", value: "normal" },
                    { title: "Subheading", value: "h3" },
                    { title: "Callout", value: "callout" },
                    { title: "Warning", value: "critical" },
                    { title: "Note (grey box)", value: "note" },
                  ],
                  lists: [{ title: "Bullet", value: "bullet" }],
                  marks: {
                    decorators: [{ title: "Bold", value: "strong" }],
                    annotations: [
                      {
                        name: "link",
                        type: "object",
                        title: "Link",
                        fields: [{ name: "href", type: "string", title: "URL (https:// or mailto:)" }],
                      },
                    ],
                  },
                }),
              ],
            }),
          ],
          preview: { select: { title: "title" } },
        }),
      ],
    }),
    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
  ],
  preview: { select: { title: "title" } },
});
