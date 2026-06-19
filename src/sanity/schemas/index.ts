import { SchemaTypeDefinition } from "sanity";
import seo from "./seo";
import siteSettings from "./siteSettings";
import homePage from "./homePage";
import problemPage from "./problemPage";
import partnerPage from "./partnerPage";
import aboutPage from "./aboutPage";
import contactPage from "./contactPage";
import questionnairePage from "./questionnairePage";
import feature from "./feature";
import stat from "./stat";
import partner from "./partner";
import partnershipStep from "./partnershipStep";
import value from "./value";

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
  questionnairePage,
  // lists
  feature,
  stat,
  partner,
  partnershipStep,
  value,
];
