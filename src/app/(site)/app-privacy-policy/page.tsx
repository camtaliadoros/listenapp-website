import LegalPage, { getLegalPage, legalPageMetadata } from "@/components/LegalPage";
import type { Metadata } from "next";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  return legalPageMetadata("appPrivacyPolicy", "App Privacy Policy");
}

export default async function AppPrivacyPolicyPage() {
  const page = await getLegalPage("appPrivacyPolicy");
  return <LegalPage page={page} fallbackTitle="App Privacy Policy" />;
}
