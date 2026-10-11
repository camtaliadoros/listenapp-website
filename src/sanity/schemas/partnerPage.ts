import { defineField, defineType } from "sanity";

export default defineType({
  name: "partnerPage",
  title: "Partner With Us Page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "why", title: "Why partner" },
    { name: "status", title: "Current status" },
    { name: "limitations", title: "Getting the best" },
    { name: "licences", title: "Licence options" },
    { name: "register", title: "Register interest" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "heading", title: "Hero heading", type: "string", group: "hero" }),
    defineField({ name: "intro", title: "Hero intro", type: "text", rows: 2, group: "hero" }),

    defineField({ name: "whyEyebrow", title: "Eyebrow", type: "string", group: "why", initialValue: "Partnership" }),
    defineField({ name: "whyHeading", title: "Heading", type: "string", group: "why", initialValue: "Why partner with ListenApp" }),
    defineField({ name: "whyIntro", title: "Intro text", type: "text", rows: 2, group: "why", initialValue: "We work with charities and support organisations to bring ListenApp to the people who need it most." }),
    defineField({ name: "whyCtaLabel", title: "Button label", type: "string", group: "why", initialValue: "Register your interest", description: "Links to the register form further down the page." }),
    defineField({
      name: "whyPoints",
      title: "Reasons",
      type: "array",
      group: "why",
      description: "Shown as a numbered list. Drag to reorder. Leave empty to use the built-in copy.",
      of: [
        {
          type: "object",
          name: "whyPoint",
          fields: [
            defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
            defineField({ name: "body", title: "Body text", type: "text", rows: 2, validation: (r) => r.required() }),
            defineField({ name: "icon", title: "Icon name (Tabler Icons)", type: "string", description: "e.g. ti-shield-check" }),
          ],
          preview: { select: { title: "title", subtitle: "body" } },
        },
      ],
    }),

    defineField({ name: "statusHeading", title: "Heading", type: "string", group: "status", initialValue: "Live on Android and in frontline use" }),
    defineField({ name: "statusPoints", title: "Bullet points", type: "array", group: "status", of: [{ type: "text", rows: 2 }], description: "Leave empty to use the built-in copy." }),

    defineField({ name: "limitationsEyebrow", title: "Eyebrow", type: "string", group: "limitations", initialValue: "Safety & current limitations" }),
    defineField({ name: "limitationsHeading", title: "Heading", type: "string", group: "limitations", initialValue: "Getting the best from ListenApp" }),
    defineField({ name: "limitationsIntro", title: "Intro text", type: "text", rows: 2, group: "limitations" }),
    defineField({ name: "requirementsIntro", title: "Checklist 1 heading", type: "string", group: "limitations", initialValue: "For ListenApp to work as well as possible:" }),
    defineField({ name: "requirements", title: "Checklist 1 items", type: "array", group: "limitations", of: [{ type: "text", rows: 2 }], description: "Leave empty to use the built-in copy." }),
    defineField({ name: "awarenessIntro", title: "Checklist 2 heading", type: "string", group: "limitations", initialValue: "Also be aware that:" }),
    defineField({ name: "awareness", title: "Checklist 2 items", type: "array", group: "limitations", of: [{ type: "text", rows: 2 }], description: "Leave empty to use the built-in copy." }),
    defineField({ name: "limitationsOutro", title: "Closing text", type: "text", rows: 2, group: "limitations" }),

    defineField({ name: "licencesEyebrow", title: "Eyebrow", type: "string", group: "licences", initialValue: "Pricing" }),
    defineField({ name: "licencesHeading", title: "Heading", type: "string", group: "licences", initialValue: "Licence options" }),
    defineField({
      name: "licences",
      title: "Licences",
      type: "array",
      group: "licences",
      description: "Shown as cards, in this order. Drag to reorder.",
      of: [
        {
          type: "object",
          name: "licence",
          fields: [
            defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
            defineField({ name: "price", title: "Price", type: "string", description: "e.g. £499/month", validation: (r) => r.required() }),
            defineField({ name: "description", title: "Description", type: "text", rows: 3, validation: (r) => r.required() }),
          ],
          preview: { select: { title: "name", subtitle: "price" } },
        },
      ],
    }),
    defineField({ name: "licencesHelpHeading", title: "Help box heading", type: "string", group: "licences", initialValue: "Supporting 500+ users or not sure which licence is right for your service?" }),
    defineField({ name: "licencesHelpBody", title: "Help box text", type: "text", rows: 2, group: "licences" }),
    defineField({ name: "licencesHelpCtaLabel", title: "Help box button label", type: "string", group: "licences", initialValue: "Register your interest" }),

    defineField({ name: "registerEyebrow", title: "Eyebrow", type: "string", group: "register", initialValue: "Register interest" }),
    defineField({ name: "registerHeading", title: "Heading", type: "string", group: "register", initialValue: "Get in touch" }),
    defineField({ name: "registerIntro", title: "Intro text", type: "text", rows: 2, group: "register" }),

    defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" }),
  ],
  preview: { select: {}, prepare: () => ({ title: "Partner With Us Page" }) },
});
