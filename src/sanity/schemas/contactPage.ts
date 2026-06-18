import { defineField, defineType } from "sanity";

export default defineType({
  name: "contactPage",
  title: "Contact Page",
  type: "document",
  fields: [
    defineField({ name: "heading", title: "Heading", type: "string", initialValue: "Get in touch" }),
    defineField({ name: "intro", title: "Intro text", type: "text", rows: 2 }),
    defineField({ name: "contactEmail", title: "Display email address", type: "string" }),
    defineField({
      name: "enquiryCategories",
      title: "Enquiry categories",
      type: "array",
      of: [{ type: "string" }],
      description: "Options shown in the enquiry type dropdown",
      initialValue: [
        "General enquiry",
        "Seeking support",
        "ListenApp",
        "Partnership / Collaboration",
        "Media & Press",
        "Donating / Fundraising",
        "Other",
      ],
    }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
    defineField({
      name: "successMessage",
      title: "Success message",
      type: "object",
      fields: [
        defineField({ name: "heading", title: "Heading", type: "string", initialValue: "Message sent" }),
        defineField({ name: "body", title: "Body", type: "string", initialValue: "We'll be in touch as soon as possible." }),
      ],
    }),
  ],
  preview: { select: {}, prepare: () => ({ title: "Contact Page" }) },
});
