import { createClient } from "@sanity/client";
import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

async function seed() {
  console.log("Seeding SEO content...");

  // Update siteSettings with global SEO defaults + siteUrl
  await client
    .patch("siteSettings")
    .set({
      siteUrl: "https://listenapp.org",
      siteName: "ListenApp",
      defaultSeo: {
        title: "ListenApp — Discreet Safety Technology for Domestic Abuse Victims",
        description:
          "ListenApp is a free mobile safety app that connects domestic abuse victims to help instantly and discreetly — through voice and touch triggers, disguised as a calculator.",
        noIndex: false,
      },
    })
    .commit();
  console.log("✓ siteSettings — global SEO + siteUrl");

  // Home page
  await client.createOrReplace({
    _id: "homePage",
    _type: "homePage",
    heroHeading: "Protect yourself silently. Even when you can't speak.",
    heroDescription:
      "ListenApp is a mobile app revolutionising the support available to vulnerable people. Voice and touch triggers connect users to help — discreetly, instantly, without picking up the phone.",
    heroPrimaryCtaLabel: "Request a demo",
    heroSecondaryCtaLabel: "Learn how it works",
    seo: {
      title: "ListenApp — Discreet Safety Technology for Domestic Abuse Victims",
      description:
        "ListenApp connects people at risk to help instantly and discreetly. Voice and touch triggers, disguised as a calculator. Free for partner charities.",
    },
  });
  console.log("✓ homePage");

  // Problem page
  await client.createOrReplace({
    _id: "problemPage",
    _type: "problemPage",
    heading: "The scale of domestic abuse is staggering.",
    intro:
      "Millions of people suffer in silence every day. Technology has advanced enormously — but almost nothing exists to connect vulnerable people to help in the moment they need it most.",
    pullQuote: "Domestic abuse is still the violent crime least likely to be reported to the police.",
    seo: {
      title: "The Problem — Domestic Abuse Statistics & the Gap in Support",
      description:
        "2.3 million people suffer domestic abuse in England and Wales. ListenApp directly addresses the evidence gap and connects victims to help instantly.",
    },
  });
  console.log("✓ problemPage");

  // Partner page
  await client.createOrReplace({
    _id: "partnerPage",
    _type: "partnerPage",
    heading: "Bring ListenApp to your beneficiaries.",
    intro:
      "We're selecting charity partners for our pilot programme. ListenApp is free for the first year — and can be fully white-labelled under your organisation's own brand.",
    seo: {
      title: "Partner With Us — ListenApp for Charities",
      description:
        "Charities can license ListenApp free for the first year. White-labelled under your brand, GDPR compliant, built by a team with 15+ years in the charitable sector.",
    },
  });
  console.log("✓ partnerPage");

  // About page
  await client.createOrReplace({
    _id: "aboutPage",
    _type: "aboutPage",
    heading: "Built by people who know what's at stake.",
    intro:
      "We're a non-profit Community Interest Company. Our work against abuse spans over 8 years — combining therapeutic expertise with deep technological and philanthropic experience.",
    seo: {
      title: "About ListenApp — Our Mission & Team",
      description:
        "ListenApp CIC is a non-profit combining 18 years of tech experience with 8+ years working directly against domestic abuse. Company no. 13740982, Liverpool and London.",
    },
  });
  console.log("✓ aboutPage");

  // Contact page SEO
  await client
    .patch("contactPage")
    .set({
      seo: {
        title: "Contact ListenApp",
        description:
          "Get in touch with the ListenApp team. Whether you're a charity, a survivor, or want to learn more — we'd love to hear from you.",
      },
    })
    .commit();
  console.log("✓ contactPage — SEO");

  console.log("\nAll done.");
}

seed().catch((err) => { console.error(err); process.exit(1); });
