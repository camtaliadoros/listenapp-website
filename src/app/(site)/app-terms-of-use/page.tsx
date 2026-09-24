import LegalPage, { getLegalPage, legalPageMetadata } from "@/components/LegalPage";
import type { Metadata } from "next";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  return legalPageMetadata("appTermsOfUse", "App Terms of Use");
}

export default async function AppTermsOfUsePage() {
  const page = await getLegalPage("appTermsOfUse");
  return <LegalPage page={page} fallbackTitle="App Terms of Use" />;
}
