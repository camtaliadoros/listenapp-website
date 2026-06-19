import { client } from "@/sanity/client";
import { buildMetadata } from "@/lib/metadata";
import QuestionnaireForm from "./QuestionnaireForm";
import type { Metadata } from "next";

type QPage = {
  heading: string;
  intro: string;
  web3formsKey: string;
  seo?: object;
};

async function getData() {
  return client.fetch<QPage>(`*[_type == "questionnairePage"][0]`, {}, { next: { revalidate: 60 } });
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await client.fetch<{ seo?: object }>(`*[_type == "questionnairePage"][0]{ seo }`, {}, { next: { revalidate: 3600 } });
  return buildMetadata(page?.seo as Parameters<typeof buildMetadata>[0]);
}

export default async function QuestionnairePage() {
  const page = await getData();

  return (
    <QuestionnaireForm
      heading={page?.heading ?? "Help us build this the right way."}
      intro={page?.intro ?? "We've devised a short questionnaire for charities and people with lived experience of domestic abuse. Your input directly shapes how ListenApp is developed — it takes less than 5 minutes."}
    />
  );
}
