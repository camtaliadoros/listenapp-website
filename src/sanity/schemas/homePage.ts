import { defineField, defineType } from "sanity";

export default defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "stats", title: "Stats bar" },
    { name: "features", title: "Features" },
    { name: "security", title: "Security section" },
    { name: "partners", title: "Partners & supporters" },
    { name: "cta", title: "Bottom CTA" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    // ── Hero ──
    defineField({ name: "heroEyebrowBadge", title: "Eyebrow badge text", type: "string", group: "hero", initialValue: "Safety technology" }),
    defineField({ name: "heroHeading", title: "Heading", type: "string", group: "hero" }),
    defineField({ name: "heroDescription", title: "Description", type: "text", rows: 2, group: "hero" }),
    defineField({ name: "heroPrimaryCtaLabel", title: "Primary CTA label", type: "string", group: "hero" }),
    defineField({ name: "heroSecondaryCtaLabel", title: "Secondary CTA label", type: "string", group: "hero" }),

    // ── Stats bar ──
    defineField({
      name: "stats",
      title: "Stats",
      type: "array",
      group: "stats",
      description: "Shown in the dark stats bar below the hero. Drag to reorder.",
      of: [
        {
          type: "object",
          name: "stat",
          fields: [
            defineField({ name: "number", title: "Number (e.g. 100%)", type: "string", validation: (r) => r.required() }),
            defineField({ name: "label", title: "Label", type: "string", validation: (r) => r.required() }),
          ],
          preview: { select: { title: "number", subtitle: "label" } },
        },
      ],
    }),

    // ── Features ──
    defineField({ name: "featuresEyebrow", title: "Eyebrow", type: "string", group: "features", initialValue: "How it works" }),
    defineField({ name: "featuresHeading", title: "Heading", type: "string", group: "features", initialValue: "Critical features, hidden in plain sight" }),
    defineField({ name: "featuresIntro", title: "Intro text", type: "text", rows: 2, group: "features" }),
    defineField({
      name: "features",
      title: "Feature cards",
      type: "array",
      group: "features",
      description: "Drag to reorder.",
      of: [
        {
          type: "object",
          name: "feature",
          fields: [
            defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
            defineField({ name: "description", title: "Description", type: "text", rows: 3, validation: (r) => r.required() }),
            defineField({ name: "icon", title: "Icon name (Tabler Icons)", type: "string", description: "e.g. ti-microphone" }),
          ],
          preview: { select: { title: "title", subtitle: "description" } },
        },
      ],
    }),

    // ── Security section ──
    defineField({ name: "securityEyebrow", title: "Eyebrow", type: "string", group: "security", initialValue: "Security by design" }),
    defineField({ name: "securityHeading", title: "Heading", type: "string", group: "security", initialValue: "Built to protect, not attract attention" }),
    defineField({ name: "securityBody", title: "Body text", type: "text", rows: 3, group: "security" }),
    defineField({
      name: "securityChecklist",
      title: "Checklist items",
      type: "array",
      group: "security",
      of: [{ type: "string" }],
      initialValue: [
        "Appears as a standard calculator on your home screen",
        "Secret code unlocks the real ListenApp interface",
        "No visible alerts, notifications, or signs of use",
        "Works even when you cannot speak",
      ],
    }),
    defineField({ name: "secretCodeHeading", title: "Keypad mockup heading", type: "string", group: "security", initialValue: "Enter your secret code" }),
    defineField({ name: "secretCodeSubtext", title: "Keypad mockup subtext", type: "string", group: "security", initialValue: "Looks like a calculator. Acts as your guardian." }),

    // ── Partners ──
    defineField({ name: "partnersHeading", title: "Section heading", type: "string", group: "partners", initialValue: "Proud to work alongside" }),
    defineField({ name: "partnersThanksNote", title: "Thanks note", type: "string", group: "partners", description: "Small text below the grid, e.g. naming supporters." }),
    defineField({
      name: "partners",
      title: "Partners & supporters",
      type: "array",
      group: "partners",
      description: "Shown in the partners grid. Drag to reorder.",
      of: [
        {
          type: "object",
          name: "partner",
          fields: [
            defineField({ name: "name", title: "Organisation name", type: "string", validation: (r) => r.required() }),
            defineField({
              name: "type",
              title: "Type",
              type: "string",
              options: { list: ["Partner charity", "Supporter"] },
              validation: (r) => r.required(),
            }),
            defineField({ name: "logo", title: "Logo", type: "image", options: { hotspot: true } }),
            defineField({ name: "url", title: "Website URL", type: "url", description: "If set, the card links out to this URL." }),
          ],
          preview: {
            select: { title: "name", subtitle: "type", media: "logo" },
          },
        },
      ],
    }),

    // ── Bottom CTA ──
    defineField({ name: "ctaEyebrow", title: "Eyebrow", type: "string", group: "cta", initialValue: "Get involved" }),
    defineField({ name: "ctaHeading", title: "Heading", type: "string", group: "cta", initialValue: "Ready to protect more people?" }),
    defineField({ name: "ctaBody", title: "Body text", type: "text", rows: 2, group: "cta" }),
    defineField({ name: "ctaPrimaryLabel", title: "Primary button label", type: "string", group: "cta", initialValue: "Request a demo" }),
    defineField({ name: "ctaSecondaryLabel", title: "Secondary button label", type: "string", group: "cta", initialValue: "Partnership info" }),

    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
  ],
  preview: { select: {}, prepare: () => ({ title: "Home Page" }) },
});
