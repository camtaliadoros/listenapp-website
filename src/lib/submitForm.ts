import type { FormKind } from "@/lib/monday";

/**
 * Sends a website form to the email service (Web3Forms) and to Monday.com in parallel.
 * Resolves true if at least one of them recorded the enquiry, so a Monday outage
 * never loses an email and vice versa.
 */
export async function submitForm(kind: FormKind, form: FormData, web3formsKey: string): Promise<boolean> {
  const emailData = new FormData();
  form.forEach((value, key) => emailData.append(key, value));
  emailData.append("access_key", web3formsKey);

  const [email, monday] = await Promise.allSettled([
    fetch("https://api.web3forms.com/submit", { method: "POST", body: emailData })
      .then((res) => res.json())
      .then((data) => data.success === true),
    fetch(`/api/forms/${kind}`, { method: "POST", body: form })
      .then((res) => res.json())
      .then((data) => data.ok === true),
  ]);

  return (email.status === "fulfilled" && email.value) || (monday.status === "fulfilled" && monday.value);
}
