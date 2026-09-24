import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { presentationTool } from "sanity/presentation";
import { schemaTypes } from "./schemas";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

const ROUTE_BY_TYPE: Record<string, string> = {
  homePage: "/",
  problemPage: "/the-problem",
  partnerPage: "/partner",
  aboutPage: "/about",
  contactPage: "/contact",
};

const ROUTE_BY_ID: Record<string, string> = {
  appPrivacyPolicy: "/app-privacy-policy",
  appTermsOfUse: "/app-terms-of-use",
};

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  title: "ListenApp Studio",
  schema: { types: schemaTypes },
  plugins: [
    structureTool(),
    visionTool(),
    presentationTool({
      previewUrl: {
        previewMode: {
          enable: "/api/draft-mode/enable",
        },
      },
      resolve: {
        locations: (params) => {
          const href = ROUTE_BY_ID[params.id.replace(/^drafts\./, "")] ?? ROUTE_BY_TYPE[params.type];
          if (!href) return null;
          return { locations: [{ title: "Live page", href }] };
        },
      },
    }),
  ],
});
