import { defineField, defineType } from "sanity";

export default defineType({
  name: "partnerPage",
  title: "Partner With Us Page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "steps", title: "How it works" },
    { name: "trust", title: "Trust cards" },
    { name: "register", title: "Register interest" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "heading", title: "Hero heading", type: "string", group: "hero" }),
    defineField({ name: "intro", title: "Hero intro", type: "text", rows: 2, group: "hero" }),

    defineField({ name: "stepsEyebrow", title: "Eyebrow", type: "string", group: "steps", initialValue: "How it works" }),
    defineField({ name: "stepsHeading", title: "Heading", type: "string", group: "steps", initialValue: "Simple to adopt, built to last" }),
    defineField({
      name: "steps",
      title: "Steps",
      type: "array",
      group: "steps",
      description: "Drag to reorder — step numbers follow the order here.",
      of: [
        {
          type: "object",
          name: "partnershipStep",
          fields: [
            defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
            defineField({ name: "body", title: "Body text", type: "text", rows: 3, validation: (r) => r.required() }),
          ],
          preview: { select: { title: "title" } },
        },
      ],
    }),

    defineField({
      name: "trustCards",
      title: "Trust cards",
      type: "array",
      group: "trust",
      description: "Shown as dark cards below the steps (e.g. GDPR compliance, experience).",
      of: [
        {
          type: "object",
          name: "trustCard",
          fields: [
            defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
            defineField({ name: "body", title: "Body text", type: "text", rows: 3, validation: (r) => r.required() }),
          ],
          preview: { select: { title: "title", subtitle: "body" } },
        },
      ],
      initialValue: [
        { title: "Fully GDPR compliant", body: "Personal data is saved only to the user's device — never to external servers. Anonymous usage data is available solely for your organisation's insight, never for marketing." },
        { title: "15+ years in digital for charities", body: "Our development team has spent over 15 years building digital solutions for the charitable sector — we understand your constraints and your users." },
      ],
    }),

    defineField({ name: "registerEyebrow", title: "Eyebrow", type: "string", group: "register", initialValue: "Register interest" }),
    defineField({ name: "registerHeading", title: "Heading", type: "string", group: "register", initialValue: "Get in touch" }),
    defineField({ name: "registerIntro", title: "Intro text", type: "text", rows: 2, group: "register" }),

    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
  ],
  preview: { select: {}, prepare: () => ({ title: "Partner With Us Page" }) },
});
