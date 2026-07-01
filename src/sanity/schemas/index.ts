import { SchemaTypeDefinition } from "sanity";
import seo from "./seo";
import siteSettings from "./siteSettings";
import homePage from "./homePage";
import problemPage from "./problemPage";
import partnerPage from "./partnerPage";
import aboutPage from "./aboutPage";
import contactPage from "./contactPage";
export const schemaTypes: SchemaTypeDefinition[] = [
  // objects
  seo,
  // singletons
  siteSettings,
  homePage,
  problemPage,
  partnerPage,
  aboutPage,
  contactPage,
];
