"use client";
import { useState } from "react";

export default function PartnerForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    formData.append("access_key", "8b52a967-01b5-4fa1-83d2-4f7160d218ed");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
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
      <div className="bg-surface-deep dark:bg-surface-deep-night rounded-2xl p-8 text-center max-w-lg">
        <div className="w-12 h-12 bg-brand rounded-full flex items-center justify-center text-white text-xl mx-auto mb-4">✓</div>
        <h3 className="font-gilroy text-xl font-bold text-ink dark:text-white mb-2">Enquiry sent</h3>
        <p className="text-sm text-muted dark:text-muted-night">Thanks for getting in touch. We'll be in contact to arrange a demo at a time that works for you.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg space-y-5">
      <input type="hidden" name="subject" value="New partnership enquiry — ListenApp" />
      <input type="hidden" name="from_name" value="ListenApp Website" />

      {[
        { label: "Full name", name: "name", type: "text", placeholder: "Your name", required: true },
        { label: "Organisation", name: "organisation", type: "text", placeholder: "Your charity or organisation", required: true },
        { label: "Email address", name: "email", type: "email", placeholder: "you@organisation.org", required: true },
        { label: "How did you hear about ListenApp?", name: "referral", type: "text", placeholder: "e.g. referral, event, search", required: false },
      ].map((f) => (
        <div key={f.name}>
          <label className="block text-sm font-semibold text-ink dark:text-white mb-1.5">
            {f.label} {f.required && <span className="text-brand">*</span>}
          </label>
          <input
            type={f.type}
            name={f.name}
            placeholder={f.placeholder}
            required={f.required}
            className="w-full px-3.5 py-2.5 border border-border dark:border-border-night rounded-lg text-sm text-ink dark:text-white placeholder:text-muted-light dark:bg-surface-night focus:outline-none focus:border-brand transition-colors"
          />
        </div>
      ))}

      {error && <p className="text-sm text-brand">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="btn-arrow inline-flex items-center gap-2 bg-brand text-white font-semibold text-sm px-6 py-3 rounded-lg hover:bg-brand-dark hover:text-white transition-colors disabled:opacity-60"
      >
        {loading ? "Sending…" : <><span>Send enquiry</span> <span className="arrow">→</span></>}
      </button>
    </form>
  );
}
