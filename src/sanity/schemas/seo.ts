import { defineField, defineType } from "sanity";

export default defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Page title", type: "string", description: "Overrides the default title. Keep under 60 characters." }),
    defineField({ name: "description", title: "Meta description", type: "text", rows: 2, description: "Keep between 140–160 characters." }),
    defineField({ name: "ogImage", title: "Social share image", type: "image", description: "Recommended: 1200×630px" }),
    defineField({ name: "noIndex", title: "Hide from search engines", type: "boolean", initialValue: false }),
  ],
});
