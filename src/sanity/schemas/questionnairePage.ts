import { defineField, defineType } from "sanity";

export default defineType({
  name: "questionnairePage",
  title: "Questionnaire Page",
  type: "document",
  fields: [
    defineField({ name: "heading", title: "Heading", type: "string", initialValue: "Help us build this the right way." }),
    defineField({ name: "intro", title: "Intro text", type: "text", rows: 3, initialValue: "We've devised a short questionnaire for charities and people with lived experience of domestic abuse. Your input directly shapes how ListenApp is developed — it takes less than 5 minutes." }),
    defineField({ name: "web3formsKey", title: "Web3Forms access key", type: "string", description: "From web3forms.com — submissions are sent to the email linked to this key." }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
  ],
  preview: { select: {}, prepare: () => ({ title: "Questionnaire Page" }) },
});
