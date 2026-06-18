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
  console.log("Seeding Sanity...");

  // ── Site Settings ──────────────────────────────────────────────
  await client.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    contactEmail: "info@listenapp.org",
    demoEmail: "natasha@listenapp.org",
    companyNumber: "13740982",
    companyLocations: "Liverpool and London",
    thinkDifferentUrl: "https://think-different.org/",
    privacyPolicyUrl: "https://listenapp.org/about-us/privacy-policy",
    researchBand: {
      stat: "100%",
      heading: "Validated by those who need it most",
      body: "Every participant in our research — including charities and survivors of abuse — confirmed the need and benefit of ListenApp. Help us keep building.",
      ctaLabel: "Fill out the questionnaire",
      ctaUrl: "https://listenapp.org/app-questionnaire",
    },
  });
  console.log("✓ siteSettings");

  // ── Contact Page ───────────────────────────────────────────────
  await client.createOrReplace({
    _id: "contactPage",
    _type: "contactPage",
    heading: "Get in touch",
    intro: "We'd love to hear from you. Whether you're a charity, a survivor, or just want to learn more — reach out and we'll get back to you as soon as possible.",
    contactEmail: "info@listenapp.org",
    enquiryCategories: [
      "General enquiry",
      "Seeking support",
      "ListenApp",
      "Partnership / Collaboration",
      "Media & Press",
      "Donating / Fundraising",
      "Other",
    ],
    successMessage: {
      heading: "Message sent",
      body: "We'll be in touch as soon as possible.",
    },
  });
  console.log("✓ contactPage");

  // ── App Features ───────────────────────────────────────────────
  const features = [
    { title: "Instant alert messages", description: "Sends SMS alerts with real-time location to chosen contacts via touch or voice trigger — no phone call needed.", icon: "ti-alert-triangle", order: 1 },
    { title: "Discreet audio recording", description: "Records audio automatically in the background. Saved privately to your device as tangible evidence of abuse.", icon: "ti-microphone", order: 2 },
    { title: "Direct helpline access", description: "One-tap connection to your charity's dedicated helpline, configured by your support organisation.", icon: "ti-phone-call", order: 3 },
    { title: "Multiple voice triggers", description: "Set different phrases to send different messages to multiple contacts — tailored to your situation.", icon: "ti-message-circle", order: 4 },
    { title: "All data stays on device", description: "Recordings and personal data are saved only to your phone. Never uploaded to external servers.", icon: "ti-device-mobile", order: 5 },
    { title: "Charity-licensed platform", description: "Provided free to selected partner charities — ensuring it reaches the people who need it most.", icon: "ti-heart", order: 6 },
  ];
  for (const f of features) {
    await client.createOrReplace({ _id: `feature-${f.order}`, _type: "feature", ...f });
  }
  console.log("✓ features");

  // ── Stats ──────────────────────────────────────────────────────
  const stats = [
    { _id: "stat-home-1", context: "home", number: "100%", label: "confirmed need & benefit", order: 1 },
    { _id: "stat-home-2", context: "home", number: "8+ yrs", label: "working against abuse", order: 2 },
    { _id: "stat-home-3", context: "home", number: "6", label: "charity partners", order: 3 },
    { _id: "stat-problem-1", context: "problem", number: "2.3M", label: "people suffer domestic abuse in England and Wales", order: 1 },
    { _id: "stat-problem-2", context: "problem", number: "1 in 4", label: "women affected globally in their lifetime", order: 2 },
    { _id: "stat-problem-3", context: "problem", number: "1 in 6", label: "men affected globally in their lifetime", order: 3 },
    { _id: "stat-problem-4", context: "problem", number: "16%", label: "of all violent crime is domestic abuse", order: 4 },
  ];
  for (const s of stats) {
    await client.createOrReplace({ _type: "stat", ...s });
  }
  console.log("✓ stats");

  // ── Partners ───────────────────────────────────────────────────
  const partners = [
    { _id: "partner-1", name: "Cranstoun", type: "Partner charity", order: 1 },
    { _id: "partner-2", name: "Her Centre", type: "Partner charity", order: 2 },
    { _id: "partner-3", name: "DASH Charity", type: "Partner charity", order: 3 },
    { _id: "partner-4", name: "Savera UK", type: "Partner charity", order: 4 },
    { _id: "partner-5", name: "The Paul Lavelle Foundation", type: "Partner charity", order: 5 },
    { _id: "partner-6", name: "Tomorrow's Women", type: "Partner charity", order: 6 },
    { _id: "partner-7", name: "ManKind Initiative", type: "Supporter", order: 7 },
    { _id: "partner-8", name: "SafeLives", type: "Supporter", order: 8 },
    { _id: "partner-9", name: "Ask for Angela", type: "Supporter", order: 9 },
  ];
  for (const p of partners) {
    await client.createOrReplace({ _type: "partner", ...p });
  }
  console.log("✓ partners");

  // ── Partnership Steps ──────────────────────────────────────────
  const steps = [
    { _id: "step-1", stepNumber: 1, title: "Register your interest", body: "Fill in the short form below. Tell us about your organisation and the people you support. We'll be in touch within a few days." },
    { _id: "step-2", stepNumber: 2, title: "Demo & discovery", body: "We walk you through the app, discuss your beneficiaries' needs, and confirm how ListenApp fits your service delivery." },
    { _id: "step-3", stepNumber: 3, title: "White-label setup", body: "We configure ListenApp under your branding and helpline. Your beneficiaries experience it as your tool — not ours." },
    { _id: "step-4", stepNumber: 4, title: "Free pilot year", body: "Your organisation licenses ListenApp at no cost for the first year. After that, a tiered pricing structure will apply based on scale and analytics needs." },
  ];
  for (const s of steps) {
    await client.createOrReplace({ _type: "partnershipStep", ...s });
  }
  console.log("✓ partnershipSteps");

  // ── Company Values ─────────────────────────────────────────────
  const values = [
    { _id: "value-1", title: "Protection first", body: "Every decision we make starts with one question: does this keep vulnerable people safer?", icon: "ti-heart", order: 1 },
    { _id: "value-2", title: "Privacy by design", body: "Data lives on the user's device. Full stop. We will never compromise that for commercial gain.", icon: "ti-lock", order: 2 },
    { _id: "value-3", title: "Built with charities", body: "ListenApp is developed in partnership with the organisations closest to the people it serves.", icon: "ti-building-community", order: 3 },
    { _id: "value-4", title: "End the cycle", body: "Supporting victims matters. So does prevention. Both ListenApp and Think Different work toward the same goal.", icon: "ti-refresh", order: 4 },
    { _id: "value-5", title: "Always free to users", body: "We are committed to ensuring the end user — the person at risk — never pays. That commitment will not change.", icon: "ti-accessible", order: 5 },
    { _id: "value-6", title: "Global in ambition", body: "Abuse affects every country. We've already taken Think Different to South Africa and plan to grow our reach.", icon: "ti-world", order: 6 },
  ];
  for (const v of values) {
    await client.createOrReplace({ _type: "value", ...v });
  }
  console.log("✓ values");

  console.log("\nAll done.");
}

seed().catch((err) => { console.error(err); process.exit(1); });
