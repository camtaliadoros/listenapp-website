import { NextRequest, NextResponse } from "next/server";

const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN!;
const BASE_ID = "appC6xFq5hYl1vyoo";
const TABLE_ID = "tblsV7S4AqTK8iY5F";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const res = await fetch(`https://api.airtable.com/v0/${BASE_ID}/${TABLE_ID}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${AIRTABLE_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fields: {
        Role: body.role,
        Organisation: body.orgName || "",
        "Service gap exists": body.serviceGap,
        "ListenApp beneficial": body.beneficial,
        "Suggested features": body.features,
        "Pricing comments": body.pricing,
        "Useful analytics": body.analytics,
        "Other benefits": body.otherBenefits || "",
        "Respondent name": body.contactName || "",
        "Respondent email": body.contactEmail || "",
        "Submitted at": new Date().toISOString().slice(0, 10),
      },
    }),
  });

  if (!res.ok) {
    const error = await res.json();
    console.error("Airtable error:", JSON.stringify(error));
    return NextResponse.json({ success: false }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
