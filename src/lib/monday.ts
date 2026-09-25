// Server-only: creates Monday.com items from website form submissions.
// Needs MONDAY_API_TOKEN in the environment (.env.local locally, Netlify env vars when deployed).

const API_URL = "https://api.monday.com/v2";
const API_VERSION = "2025-04";

export type FormKind = "partner" | "contact";

type Board = {
  boardId: string;
  groupId: string;
  /** Builds the item name and column values from the submitted fields. */
  build: (f: Fields) => { name: string; columns: Record<string, unknown> };
};

type Fields = Record<string, string>;

const today = () => new Date().toLocaleDateString("en-CA", { timeZone: "Europe/London" }); // YYYY-MM-DD

const notes = (parts: [string, string | undefined][]) =>
  parts.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join(" · ");

// Column IDs come from the boards in the ListenApp workspace.
const BOARDS: Record<FormKind, Board> = {
  // "Register Interest" board, "New" group
  partner: {
    boardId: "5104780804",
    groupId: "topics",
    build: (f) => ({
      name: f.organisation ? `${f.name} (${f.organisation})` : f.name,
      columns: {
        text_mm7fh67y: f.name, // Full Name
        text_mm7f18df: f.organisation, // Organisation
        email_mm7f9se4: { email: f.email, text: f.email },
        text_mm7f2rfc: f.beneficiaries, // Beneficaries
        date_mm7fzj92: { date: today() }, // Date Registered
        color_mm7ftgjg: { label: "New" },
        text_mm7fr229: notes([["Heard about us via", f.referral], ["Source", "Website partner form"]]),
      },
    }),
  },
  // "Contact Form Submissions" board, "New Submissions" group
  contact: {
    boardId: "5104780801",
    groupId: "topics",
    build: (f) => {
      const name = [f.first_name, f.last_name].filter(Boolean).join(" ");
      return {
        name,
        columns: {
          text_mm7fr0xf: name, // Name
          text_mm7hwa5p: f.sender_type, // I Am
          text_mm7f1cs6: f.organisation, // Organisation
          email_mm7fwwxk: { email: f.email, text: f.email },
          long_text_mm7f5pe3: { text: f.message },
          date_mm7ft462: { date: today() }, // Date Received
          color_mm7fw53z: { label: "New" },
          text_mm7fpemh: notes([["Enquiry type", f.enquiry_type], ["Source", "Website contact form"]]),
        },
      };
    },
  },
};

// Fields each form must include, and the most we'll accept per field.
const REQUIRED: Record<FormKind, string[]> = {
  partner: ["name", "organisation", "email"],
  contact: ["first_name", "last_name", "email", "message"],
};
const MAX_LENGTH = { message: 5000, default: 300 };

export class FormError extends Error {}

export function cleanFields(kind: FormKind, form: FormData): Fields {
  const fields: Fields = {};
  for (const [key, value] of form.entries()) {
    if (typeof value !== "string") continue;
    const max = key === "message" ? MAX_LENGTH.message : MAX_LENGTH.default;
    fields[key] = value.trim().slice(0, max);
  }
  for (const key of REQUIRED[kind]) {
    if (!fields[key]) throw new FormError(`Missing ${key}`);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) throw new FormError("Invalid email");
  if (fields.beneficiaries && !/^\d{1,9}$/.test(fields.beneficiaries)) throw new FormError("Invalid beneficiaries");
  return fields;
}

export async function createMondayItem(kind: FormKind, fields: Fields): Promise<string> {
  const token = process.env.MONDAY_API_TOKEN;
  if (!token) throw new Error("MONDAY_API_TOKEN is not set");

  const board = BOARDS[kind];
  const { name, columns } = board.build(fields);
  // Drop empty values so Monday doesn't reject blank columns.
  const values = Object.fromEntries(Object.entries(columns).filter(([, v]) => v !== undefined && v !== ""));

  const res = await fetch(API_URL, {
    method: "POST",
    headers: { Authorization: token, "Content-Type": "application/json", "API-Version": API_VERSION },
    body: JSON.stringify({
      query: `mutation ($board: ID!, $group: String!, $name: String!, $values: JSON!) {
        create_item(board_id: $board, group_id: $group, item_name: $name, column_values: $values) { id }
      }`,
      variables: { board: board.boardId, group: board.groupId, name: name.slice(0, 255), values: JSON.stringify(values) },
    }),
    cache: "no-store",
  });

  const data = await res.json().catch(() => null);
  const id = data?.data?.create_item?.id;
  if (!res.ok || !id) {
    throw new Error(`Monday create_item failed (${res.status}): ${JSON.stringify(data?.errors ?? data?.error_message ?? data)}`);
  }
  return id;
}
