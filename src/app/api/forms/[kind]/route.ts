import { cleanFields, createMondayItem, FormError, type FormKind } from "@/lib/monday";

const KINDS: FormKind[] = ["partner", "contact"];

// Receives website form submissions and records them on the matching Monday.com board.
export async function POST(request: Request, { params }: { params: Promise<{ kind: string }> }) {
  const { kind } = await params;
  if (!KINDS.includes(kind as FormKind)) return Response.json({ ok: false }, { status: 404 });

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return Response.json({ ok: false, error: "Invalid form data" }, { status: 400 });
  }

  // Honeypot: bots tick the hidden checkbox. Pretend it worked.
  if (form.get("botcheck")) return Response.json({ ok: true });

  try {
    const fields = cleanFields(kind as FormKind, form);
    await createMondayItem(kind as FormKind, fields);
    return Response.json({ ok: true });
  } catch (err) {
    if (err instanceof FormError) return Response.json({ ok: false, error: err.message }, { status: 400 });
    console.error("[forms] Monday submission failed:", err);
    return Response.json({ ok: false }, { status: 502 });
  }
}
