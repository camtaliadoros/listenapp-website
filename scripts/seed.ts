import { createClient } from "@sanity/client";
import * as dotenv from "dotenv";
import * as path from "path";
import { randomUUID } from "crypto";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

const key = () => randomUUID();

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
    asideHeading: "Other ways to reach us",
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

  // ── Home Page ─────────────────────────────────────────────────
  const features = [
    { title: "Instant alert messages", description: "Sends SMS alerts with real-time location to chosen contacts via touch or voice trigger — no phone call needed.", icon: "ti-alert-triangle" },
    { title: "Discreet audio recording", description: "Records audio automatically in the background. Saved privately to your device as tangible evidence of abuse.", icon: "ti-microphone" },
    { title: "Direct helpline access", description: "One-tap connection to your charity's dedicated helpline, configured by your support organisation.", icon: "ti-phone-call" },
    { title: "Multiple voice triggers", description: "Set different phrases to send different messages to multiple contacts — tailored to your situation.", icon: "ti-message-circle" },
    { title: "All data stays on device", description: "Recordings and personal data are saved only to your phone. Never uploaded to external servers.", icon: "ti-device-mobile" },
    { title: "Charity-licensed platform", description: "Provided free to selected partner charities — ensuring it reaches the people who need it most.", icon: "ti-heart" },
  ];

  const partners = [
    { name: "Cranstoun", type: "Partner charity" },
    { name: "Her Centre", type: "Partner charity" },
    { name: "DASH Charity", type: "Partner charity" },
    { name: "Savera UK", type: "Partner charity" },
    { name: "The Paul Lavelle Foundation", type: "Partner charity" },
    { name: "Tomorrow's Women", type: "Partner charity" },
    { name: "ManKind Initiative", type: "Supporter" },
    { name: "SafeLives", type: "Supporter" },
    { name: "Ask for Angela", type: "Supporter" },
  ];

  const homeStats = [
    { number: "100%", label: "confirmed need & benefit" },
    { number: "8+ yrs", label: "working against abuse" },
    { number: "6", label: "charity partners" },
  ];

  await client.createOrReplace({
    _id: "homePage",
    _type: "homePage",
    heroEyebrowBadge: "Safety technology",
    heroHeading: "Protect yourself silently. Even when you can't speak.",
    heroDescription: "ListenApp is a mobile app revolutionising the support available to vulnerable people. Voice and touch triggers connect users to help — discreetly, instantly, without picking up the phone.",
    heroPrimaryCtaLabel: "Request a demo",
    heroSecondaryCtaLabel: "Learn how it works",
    stats: homeStats.map((s) => ({ _key: key(), _type: "stat", ...s })),
    featuresEyebrow: "How it works",
    featuresHeading: "Critical features, hidden in plain sight",
    featuresIntro: "Every feature is designed to be used without raising suspicion — so you can get help exactly when you need it most.",
    features: features.map((f) => ({ _key: key(), _type: "feature", ...f })),
    securityEyebrow: "Security by design",
    securityHeading: "Built to protect, not attract attention",
    securityBody: "The app is disguised as a fully working calculator. The real ListenApp is only revealed by the user's secret code — invisible to anyone else who picks up the phone.",
    securityChecklist: [
      "Appears as a standard calculator on your home screen",
      "Secret code unlocks the real ListenApp interface",
      "No visible alerts, notifications, or signs of use",
      "Works even when you cannot speak",
    ],
    secretCodeHeading: "Enter your secret code",
    secretCodeSubtext: "Looks like a calculator. Acts as your guardian.",
    partnersHeading: "Proud to work alongside",
    partnersThanksNote: "Special thanks to ManKind Initiative, SafeLives, and Ask for Angela for their support.",
    partners: partners.map((p) => ({ _key: key(), _type: "partner", ...p })),
    ctaEyebrow: "Get involved",
    ctaHeading: "Ready to protect more people?",
    ctaBody: "Charity partners are selected to license ListenApp for free. If you work with vulnerable people, we'd love to hear from you.",
    ctaPrimaryLabel: "Request a demo",
    ctaSecondaryLabel: "Partnership info",
    seo: {
      title: "ListenApp — Discreet Safety Technology for Domestic Abuse Victims",
      description: "ListenApp connects people at risk to help instantly and discreetly. Voice and touch triggers, disguised as a calculator. Free for partner charities.",
    },
  });
  console.log("✓ homePage");

  // ── The Problem Page ──────────────────────────────────────────
  const problemStats = [
    { number: "2.3M", label: "people suffer domestic abuse in England and Wales" },
    { number: "1 in 4", label: "women affected globally in their lifetime" },
    { number: "1 in 6", label: "men affected globally in their lifetime" },
    { number: "16%", label: "of all violent crime is domestic abuse" },
  ];

  await client.createOrReplace({
    _id: "problemPage",
    _type: "problemPage",
    heading: "The scale of domestic abuse is staggering.",
    intro: "Domestic abuse affects millions every year, yet the systems meant to protect victims remain difficult to access discreetly.",
    stats: problemStats.map((s) => ({ _key: key(), _type: "stat", ...s })),
    pullQuote: "The charging rate by the Crown Prosecution Service for domestic abuse cases was 73% lower than in the previous two years.",
    bodyColumns: [
      {
        _key: key(),
        _type: "bodyColumn",
        heading: "The gap nobody is filling",
        paragraphs: [
          "We live in a time of extraordinary technology, yet almost nothing exists to connect people in danger to the help they need — silently, instantly, when no one is around.",
          "The charging rate by the Crown Prosecution Service for domestic abuse cases was 73% lower than in the previous two years — partly because evidence is so hard to gather. ListenApp directly addresses this by creating a discreet record.",
        ],
      },
      {
        _key: key(),
        _type: "bodyColumn",
        heading: "Children bear the cost too",
        paragraphs: [
          "1 in 7 children suffer from domestic abuse in their lifetime. On a single Day to Count in 2017, 61.7% of women in refuge had children under 18 with them.",
          "Over two years, 274 women and 83 men were killed through domestic abuse. Approximately 400 people die by suicide each year as a direct result.",
        ],
      },
    ],
    solutionEyebrow: "What ListenApp does about it",
    solutionHeading: "Closing the gap with technology",
    solutionIntro: "ListenApp puts a discreet safety tool into the hands of every person at risk — through the charities already serving them.",
    solutionCards: [
      { _key: key(), _type: "solutionCard", title: "Instant connection", body: "Connects users to contacts and helplines without needing to visibly make a call — by touch or voice trigger." },
      { _key: key(), _type: "solutionCard", title: "Tangible evidence", body: "Discreet audio recordings provide proof of abuse — helping close the evidence gap that keeps charging rates low." },
      { _key: key(), _type: "solutionCard", title: "Hidden in plain sight", body: "The app is disguised as a calculator, protecting users from abusers who may check their phone." },
    ],
  });
  console.log("✓ problemPage");

  // ── Partner Page ──────────────────────────────────────────────
  const steps = [
    { title: "Register your interest", body: "Fill in the short form below. Tell us about your organisation and the people you support. We'll be in touch within a few days." },
    { title: "Demo & discovery", body: "We walk you through the app, discuss your beneficiaries' needs, and confirm how ListenApp fits your service delivery." },
    { title: "White-label setup", body: "We configure ListenApp under your branding and helpline. Your beneficiaries experience it as your tool — not ours." },
    { title: "Free pilot year", body: "Your organisation licenses ListenApp at no cost for the first year. After that, a tiered pricing structure will apply based on scale and analytics needs." },
  ];

  await client.createOrReplace({
    _id: "partnerPage",
    _type: "partnerPage",
    heading: "Bring ListenApp to your beneficiaries.",
    intro: "We license ListenApp free to partner charities for the first year — fully white-labelled under your branding and helpline.",
    stepsEyebrow: "How it works",
    stepsHeading: "Simple to adopt, built to last",
    steps: steps.map((s) => ({ _key: key(), _type: "partnershipStep", ...s })),
    trustCards: [
      { _key: key(), _type: "trustCard", title: "Fully GDPR compliant", body: "Personal data is saved only to the user's device — never to external servers. Anonymous usage data is available solely for your organisation's insight, never for marketing." },
      { _key: key(), _type: "trustCard", title: "15+ years in digital for charities", body: "Our development team has spent over 15 years building digital solutions for the charitable sector — we understand your constraints and your users." },
    ],
    registerEyebrow: "Register interest",
    registerHeading: "Get in touch",
    registerIntro: "Tell us about your organisation and we'll arrange a demo at a time that works for you.",
  });
  console.log("✓ partnerPage");

  // ── About Page ──────────────────────────────────────────────────
  const values = [
    { title: "Protection first", body: "Every decision we make starts with one question: does this keep vulnerable people safer?", icon: "ti-heart" },
    { title: "Privacy by design", body: "Data lives on the user's device. Full stop. We will never compromise that for commercial gain.", icon: "ti-lock" },
    { title: "Built with charities", body: "ListenApp is developed in partnership with the organisations closest to the people it serves.", icon: "ti-building-community" },
    { title: "End the cycle", body: "Supporting victims matters. So does prevention. Both ListenApp and Think Different work toward the same goal.", icon: "ti-refresh" },
    { title: "Always free to users", body: "We are committed to ensuring the end user — the person at risk — never pays. That commitment will not change.", icon: "ti-accessible" },
    { title: "Global in ambition", body: "Abuse affects every country. We've already taken Think Different to South Africa and plan to grow our reach.", icon: "ti-world" },
  ];

  await client.createOrReplace({
    _id: "aboutPage",
    _type: "aboutPage",
    heading: "Built by people who know what's at stake.",
    intro: "Our team combines direct clinical work with survivors, technological expertise, and experience in the philanthropic sector.",
    experienceEyebrow: "Our experience",
    experienceHeading: "Three disciplines, one mission",
    experienceBody: "Our team combines direct clinical work with survivors, technological expertise, and experience in the philanthropic sector. This isn't a tech company that discovered a social problem — it's a team that lived the problem first.",
    experienceStats: [
      { _key: key(), _type: "experienceStat", number: "18 yrs", label: "technological & digital experience" },
      { _key: key(), _type: "experienceStat", number: "15 yrs", label: "in the philanthropic sector" },
      { _key: key(), _type: "experienceStat", number: "8+ yrs", label: "working directly against abuse" },
    ],
    expertiseEyebrow: "Our expertise",
    expertiseHeading: "Qualified across disciplines",
    expertiseParagraphs: [
      "Team members are qualified in Counselling, Hypnotherapy, and Trauma Recovery — with direct experience supporting victims of abuse and working alongside domestic abuse charities.",
      "We are proud to work with IT and philanthropic consultants from Direction Forward, Metric, and Canvas Philanthropy.",
      "Through both professional and personal experience of abuse, the need for further support is clear — and that's what drives everything we build.",
    ],
    valuesEyebrow: "What we believe",
    valuesHeading: "Our values",
    values: values.map((v) => ({ _key: key(), _type: "value", ...v })),
  });
  console.log("✓ aboutPage");

  console.log("\nAll done.");
}

seed().catch((err) => { console.error(err); process.exit(1); });
