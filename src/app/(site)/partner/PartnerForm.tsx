"use client";
import { useState } from "react";
import { submitForm } from "@/lib/submitForm";

export default function PartnerForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);

    try {
      if (await submitForm("partner", formData, "8b52a967-01b5-4fa1-83d2-4f7160d218ed")) {
        setSubmitted(true);
      } else {
        setError("Something went wrong. Please try again or email us directly.");
      }
    } catch {
      setError("Something went wrong. Please try again or email us directly.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="bg-surface-deep dark:bg-surface-deep-night rounded-2xl p-8 text-center">
        <div className="w-12 h-12 bg-brand rounded-full flex items-center justify-center text-white text-xl mx-auto mb-4">✓</div>
        <h3 className="font-graphik text-xl font-bold text-ink dark:text-white mb-2">Enquiry sent</h3>
        <p className="text-sm text-muted dark:text-muted-night">Thanks for getting in touch. We&apos;ll be in contact to arrange a demo at a time that works for you.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <input type="hidden" name="subject" value="New partnership enquiry — ListenApp" />
      <input type="hidden" name="from_name" value="ListenApp Website" />

      <input type="checkbox" name="botcheck" className="hidden" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-4">
        {[
          { label: "Full name", name: "name", type: "text", placeholder: "Your name", required: true },
          { label: "Organisation", name: "organisation", type: "text", placeholder: "Your charity or organisation", required: true },
          { label: "Email address", name: "email", type: "email", placeholder: "you@organisation.org", required: true, wide: true },
          { label: "How many beneficiaries do you support?", name: "beneficiaries", type: "number", placeholder: "e.g. 250", required: false, min: 0 },
          { label: "How did you hear about ListenApp?", name: "referral", type: "text", placeholder: "e.g. referral, event, search", required: false },
        ].map((f) => (
          <div key={f.name} className={`flex flex-col justify-end ${f.wide ? "sm:col-span-2" : ""}`}>
            <label htmlFor={f.name} className="block text-xs font-semibold text-ink dark:text-white mb-1.5">
              {f.label} {f.required && <span className="text-brand">*</span>}
            </label>
            <input
              id={f.name}
              type={f.type}
              name={f.name}
              placeholder={f.placeholder}
              required={f.required}
              min={f.min}
              className="w-full px-3.5 py-3 bg-white border border-border dark:border-border-night rounded-lg text-sm text-ink dark:text-white placeholder:text-muted-light dark:bg-surface-night focus:outline-none focus:border-brand transition-colors"
            />
          </div>
        ))}
      </div>

      <div className="flex items-start gap-3">
        <input required type="checkbox" id="consent" name="consent" className="mt-0.5 w-4 h-4 flex-shrink-0 accent-brand" />
        <label htmlFor="consent" className="text-xs text-muted dark:text-muted-night leading-relaxed">
          I consent to ListenApp storing my data in accordance with the{" "}
          <a href="/privacy-policy" className="text-brand font-medium underline underline-offset-2 hover:no-underline">Privacy Policy</a>.
        </label>
      </div>

      {error && <p className="text-sm text-brand">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="btn-arrow inline-flex items-center gap-2 bg-brand text-white font-semibold text-sm px-7 py-3 rounded-full hover:bg-brand-hover hover:text-white transition-colors disabled:opacity-60"
      >
        {loading ? "Sending…" : <><span>Submit</span> <span className="arrow">→</span></>}
      </button>
    </form>
  );
}
