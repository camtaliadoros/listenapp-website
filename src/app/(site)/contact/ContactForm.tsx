"use client";
import { useState } from "react";

interface Props {
  enquiryCategories: string[];
  successMessage?: { heading: string; body: string };
}

export default function ContactForm({ enquiryCategories, successMessage }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    formData.append("access_key", "f38fe4b1-cd56-4dea-80bd-a7884ac1471f");

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
      <div className="bg-surface-deep dark:bg-surface-deep-night rounded-2xl p-8 text-center flex flex-col items-center justify-center min-h-[320px]">
        <div className="w-12 h-12 bg-brand rounded-full flex items-center justify-center text-white text-xl mx-auto mb-4">✓</div>
        <h3 className="font-gilroy text-xl font-bold text-ink dark:text-white mb-2">
          {successMessage?.heading ?? "Message sent"}
        </h3>
        <p className="text-sm text-muted dark:text-muted-night">{successMessage?.body ?? "We'll be in touch as soon as possible."}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <input type="hidden" name="subject" value="New contact enquiry — ListenApp" />
      <input type="hidden" name="from_name" value="ListenApp Website" />
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-ink dark:text-white mb-1.5">First name <span className="text-brand">*</span></label>
          <input required type="text" name="first_name" placeholder="First name" className="w-full px-3.5 py-2.5 border border-border dark:border-border-night rounded-lg text-sm text-ink dark:text-white placeholder:text-muted-light dark:bg-surface-night focus:outline-none focus:border-brand transition-colors" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-ink dark:text-white mb-1.5">Last name <span className="text-brand">*</span></label>
          <input required type="text" name="last_name" placeholder="Last name" className="w-full px-3.5 py-2.5 border border-border dark:border-border-night rounded-lg text-sm text-ink dark:text-white placeholder:text-muted-light dark:bg-surface-night focus:outline-none focus:border-brand transition-colors" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-ink dark:text-white mb-1.5">Email address <span className="text-brand">*</span></label>
        <input required type="email" name="email" placeholder="you@example.com" className="w-full px-3.5 py-2.5 border border-border dark:border-border-night rounded-lg text-sm text-ink dark:text-white placeholder:text-muted-light dark:bg-surface-night focus:outline-none focus:border-brand transition-colors" />
      </div>

      <div>
        <label className="block text-sm font-semibold text-ink dark:text-white mb-1.5">Enquiry type <span className="text-brand">*</span></label>
        <select required name="enquiry_type" defaultValue="" className="w-full px-3.5 py-2.5 border border-border dark:border-border-night rounded-lg text-sm text-ink dark:text-white focus:outline-none focus:border-brand transition-colors appearance-none bg-white dark:bg-surface-night">
          <option value="" disabled>Select a category</option>
          {enquiryCategories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-ink dark:text-white mb-1.5">Organisation</label>
        <input type="text" name="organisation" placeholder="Your organisation (optional)" className="w-full px-3.5 py-2.5 border border-border dark:border-border-night rounded-lg text-sm text-ink dark:text-white placeholder:text-muted-light dark:bg-surface-night focus:outline-none focus:border-brand transition-colors" />
      </div>

      <div>
        <label className="block text-sm font-semibold text-ink dark:text-white mb-1.5">Message <span className="text-brand">*</span></label>
        <textarea required name="message" rows={4} placeholder="How can we help?" className="w-full px-3.5 py-2.5 border border-border dark:border-border-night rounded-lg text-sm text-ink dark:text-white placeholder:text-muted-light dark:bg-surface-night focus:outline-none focus:border-brand transition-colors resize-none" />
      </div>

      <div className="flex items-start gap-3">
        <input required type="checkbox" id="consent" name="consent" className="mt-0.5 accent-brand" />
        <label htmlFor="consent" className="text-xs text-muted dark:text-muted-night leading-relaxed">
          I consent to ListenApp storing my data in accordance with the{" "}
          <a href="/privacy-policy" className="text-brand font-medium hover:underline">Privacy Policy</a>.
        </label>
      </div>

      {error && <p className="text-sm text-brand">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="btn-arrow inline-flex items-center gap-2 bg-brand text-white font-semibold text-sm px-6 py-3 rounded-lg hover:bg-brand-dark hover:text-white transition-colors disabled:opacity-60"
      >
        {loading ? "Sending…" : <><span>Send message</span> <span className="arrow">→</span></>}
      </button>
    </form>
  );
}
