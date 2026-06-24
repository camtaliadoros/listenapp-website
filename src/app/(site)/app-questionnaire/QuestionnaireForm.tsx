"use client";
import { useState } from "react";

const TOTAL = 4;

interface Props {
  heading: string;
  intro: string;
}

export default function QuestionnaireForm({ heading, intro }: Props) {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Section 1
  const [role, setRole] = useState("");
  const [orgName, setOrgName] = useState("");

  // Section 2
  const [serviceGap, setServiceGap] = useState("");
  const [beneficial, setBeneficial] = useState("");

  // Section 3
  const [features, setFeatures] = useState("");
  const [pricing, setPricing] = useState("");

  // Section 4
  const [analytics, setAnalytics] = useState("");
  const [otherBenefits, setOtherBenefits] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");

  function goNext() {
    setStep((s) => s + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goBack() {
    setStep((s) => s - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/questionnaire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, orgName, serviceGap, beneficial, features, pricing, analytics, otherBenefits, contactName, contactEmail }),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const progress = submitted ? 100 : ((step - 1) / TOTAL) * 100;

  const roles = [
    { icon: "🏢", label: "A charity or organisation", sub: "Working with people affected by abuse" },
    { icon: "🤝", label: "Someone with lived experience", sub: "Personal experience of domestic abuse" },
    { icon: "💡", label: "Other", sub: "Supporter, researcher, or professional" },
  ];

  return (
    <>
      {/* ── Hero ── */}
      <div className="bg-ink py-12 md:py-14">
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          <p className="text-sm font-bold uppercase tracking-widest text-brand mb-3">App Questionnaire</p>
          <h1 className="font-graphik text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-4">{heading}</h1>
          <p className="text-white/75 text-base max-w-xl leading-relaxed">{intro}</p>
        </div>
      </div>

      {/* ── Progress bar ── */}
      <div className="sticky top-[61px] z-40 bg-surface-deep border-b border-border py-3">
        <div className="max-w-3xl mx-auto px-4 md:px-8 flex items-center gap-4">
          {/* Step dots */}
          <div className="flex items-center gap-1.5">
            {Array.from({ length: TOTAL }, (_, i) => {
              const n = i + 1;
              const isDone = submitted || n < step;
              const isActive = !submitted && n === step;
              return (
                <div
                  key={n}
                  className={`h-1.5 rounded-full transition-all duration-200 ${
                    isActive ? "w-5 bg-brand" : isDone ? "w-1.5 bg-brand/40" : "w-1.5 bg-border"
                  }`}
                />
              );
            })}
          </div>
          {/* Bar */}
          <div className="flex-1 h-1 bg-border rounded-full overflow-hidden">
            <div
              className="h-full bg-brand rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-xs font-semibold text-muted whitespace-nowrap">
            {submitted ? "Complete" : `Step ${step} of ${TOTAL}`}
          </span>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 md:px-8 py-10 md:py-14">
        {submitted ? (
          /* ── Success ── */
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-surface-deep rounded-full flex items-center justify-center text-brand text-2xl mx-auto mb-5">♥</div>
            <h2 className="font-graphik text-3xl font-bold text-ink tracking-tight mb-3">Thank you — this means a lot.</h2>
            <p className="text-muted text-base max-w-md mx-auto leading-relaxed mb-8">Your responses will directly shape how ListenApp develops. We're grateful for every person who takes the time to help us get this right.</p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => { setStep(1); setRole(""); setOrgName(""); setServiceGap(""); setBeneficial(""); setFeatures(""); setPricing(""); setAnalytics(""); setOtherBenefits(""); setContactName(""); setContactEmail(""); setSubmitted(false); }}
                className="btn-arrow bg-brand text-white font-semibold text-sm px-6 py-3 rounded-lg hover:bg-brand-dark hover:text-white transition-colors"
              >
                Submit another response
              </button>
              <a href="/" className="btn-arrow border border-border text-muted font-semibold text-sm px-6 py-3 rounded-lg hover:border-ink hover:text-ink transition-colors">
                Back to ListenApp <span className="arrow">→</span>
              </a>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>

            {/* ── Section 1: About you ── */}
            {step === 1 && (
              <div>
                <SectionHeader num={1} title="About you" sub="Help us understand where you're coming from so we can contextualise your responses." />
                <div className="mb-7">
                  <label className="block text-sm font-semibold text-ink mb-3">
                    I am completing this as <span className="text-brand">*</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {roles.map((r) => (
                      <button
                        key={r.label}
                        type="button"
                        onClick={() => setRole(r.label)}
                        className={`border rounded-xl p-4 text-center transition-all ${
                          role === r.label
                            ? "border-brand bg-surface-deep"
                            : "border-border bg-white hover:border-brand hover:bg-surface-deep"
                        }`}
                      >
                        <div className="text-2xl mb-2">{r.icon}</div>
                        <div className="text-sm font-semibold text-ink">{r.label}</div>
                        <div className="text-xs text-muted mt-0.5">{r.sub}</div>
                      </button>
                    ))}
                  </div>
                </div>
                {role === "A charity or organisation" && (
                  <div className="mb-7">
                    <label className="block text-sm font-semibold text-ink mb-1.5">Organisation name</label>
                    <input
                      type="text"
                      value={orgName}
                      onChange={(e) => setOrgName(e.target.value)}
                      placeholder="e.g. Cranstoun, Her Centre..."
                      className="w-full px-3.5 py-2.5 border border-border rounded-lg text-sm text-ink placeholder:text-muted-light focus:outline-none focus:border-brand transition-colors"
                    />
                  </div>
                )}
                <FormNav onNext={goNext} nextDisabled={!role} />
              </div>
            )}

            {/* ── Section 2: The need ── */}
            {step === 2 && (
              <div>
                <SectionHeader num={2} title="The need" sub="Your view on whether a gap exists — and whether ListenApp addresses it." />
                <div className="mb-7">
                  <label className="block text-sm font-semibold text-ink mb-1.5">
                    Do you feel there is a gap in service provision for the protection of victims of abuse? <span className="text-brand">*</span>
                  </label>
                  <RadioGroup value={serviceGap} onChange={setServiceGap} options={["Yes", "No"]} name="gap" />
                </div>
                <div className="mb-7">
                  <label className="block text-sm font-semibold text-ink mb-1">
                    Do you feel ListenApp would be beneficial to victims of domestic abuse? <span className="text-brand">*</span>
                  </label>
                  <p className="text-xs text-muted italic mb-3">Current features include a secret recorder, automatic messaging service and direct call to the partner helpline.</p>
                  <RadioGroup value={beneficial} onChange={setBeneficial} options={["Yes", "No"]} name="beneficial" />
                </div>
                <FormNav onBack={goBack} onNext={goNext} nextDisabled={!serviceGap || !beneficial} />
              </div>
            )}

            {/* ── Section 3: Features & pricing ── */}
            {step === 3 && (
              <div>
                <SectionHeader num={3} title="Features & pricing" sub="Your thoughts on how ListenApp could be strengthened — and your view on the licensing approach." />
                <div className="mb-7">
                  <label className="block text-sm font-semibold text-ink mb-1.5">
                    Are there any features or functions you feel may strengthen ListenApp? <span className="text-brand">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={features}
                    onChange={(e) => setFeatures(e.target.value)}
                    placeholder="e.g. panic button on the lock screen, live location sharing, integration with 999..."
                    className="w-full px-3.5 py-2.5 border border-border rounded-lg text-sm text-ink placeholder:text-muted-light focus:outline-none focus:border-brand transition-colors resize-none"
                  />
                </div>
                <div className="mb-7">
                  <label className="block text-sm font-semibold text-ink mb-1">
                    Any comments on the tiered pricing structure for charity licences? <span className="text-brand">*</span>
                  </label>
                  <p className="text-xs text-muted italic mb-3">After the first pilot year, licences will be offered on a tiered structure — each tier providing more detailed analytics of account usage.</p>
                  <textarea
                    required
                    rows={4}
                    value={pricing}
                    onChange={(e) => setPricing(e.target.value)}
                    placeholder="Your thoughts on this approach..."
                    className="w-full px-3.5 py-2.5 border border-border rounded-lg text-sm text-ink placeholder:text-muted-light focus:outline-none focus:border-brand transition-colors resize-none"
                  />
                </div>
                <FormNav onBack={goBack} onNext={goNext} nextDisabled={!features || !pricing} />
              </div>
            )}

            {/* ── Section 4: Analytics & details ── */}
            {step === 4 && (
              <div>
                <SectionHeader num={4} title="Analytics & your details" sub="Help us understand what data would be most useful — and optionally leave your details if you'd like us to follow up." />
                <div className="mb-7">
                  <label className="block text-sm font-semibold text-ink mb-1">
                    Which analytics would be of most benefit to your organisation? <span className="text-brand">*</span>
                  </label>
                  <p className="text-xs text-muted italic mb-3">ListenApp will never capture user information that is not compliant with GDPR requirements.</p>
                  <textarea
                    required
                    rows={4}
                    value={analytics}
                    onChange={(e) => setAnalytics(e.target.value)}
                    placeholder="e.g. number of alerts sent, age range of users, helpline call frequency, time of use..."
                    className="w-full px-3.5 py-2.5 border border-border rounded-lg text-sm text-ink placeholder:text-muted-light focus:outline-none focus:border-brand transition-colors resize-none"
                  />
                </div>
                <div className="mb-7">
                  <label className="block text-sm font-semibold text-ink mb-1.5">Any other user or partnership benefits you feel would be valuable?</label>
                  <textarea
                    rows={3}
                    value={otherBenefits}
                    onChange={(e) => setOtherBenefits(e.target.value)}
                    placeholder="Any other suggestions or thoughts..."
                    className="w-full px-3.5 py-2.5 border border-border rounded-lg text-sm text-ink placeholder:text-muted-light focus:outline-none focus:border-brand transition-colors resize-none"
                  />
                </div>
                {/* Optional contact details */}
                <div className="bg-surface rounded-xl p-5 mb-7">
                  <p className="text-xs font-bold uppercase tracking-widest text-muted mb-4">Optional — your details</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-ink mb-1.5">Name</label>
                      <input
                        type="text"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="Your name"
                        className="w-full px-3.5 py-2.5 border border-border rounded-lg text-sm text-ink placeholder:text-muted-light focus:outline-none focus:border-brand transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-ink mb-1.5">Email address</label>
                      <input
                        type="email"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full px-3.5 py-2.5 border border-border rounded-lg text-sm text-ink placeholder:text-muted-light focus:outline-none focus:border-brand transition-colors"
                      />
                    </div>
                  </div>
                  <p className="text-xs text-muted mt-3">Only needed if you'd like us to follow up. We'll never share your details.</p>
                </div>
                {error && <p className="text-sm text-brand mb-4">{error}</p>}
                <div className="flex items-center justify-between pt-6 border-t border-border">
                  <button
                    type="button"
                    onClick={goBack}
                    className="border border-border text-muted font-semibold text-sm px-5 py-2.5 rounded-lg hover:border-ink hover:text-ink transition-colors"
                  >
                    ← Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading || !analytics}
                    className="btn-arrow bg-ink text-white font-semibold text-sm px-6 py-2.5 rounded-lg hover:opacity-80 transition-opacity disabled:opacity-50 flex items-center gap-2"
                  >
                    {loading ? "Submitting…" : <><span>Submit questionnaire</span> <span className="arrow">→</span></>}
                  </button>
                </div>
              </div>
            )}

          </form>
        )}
      </div>
    </>
  );
}

function SectionHeader({ num, title, sub }: { num: number; title: string; sub: string }) {
  return (
    <div className="mb-8 pb-5 border-b border-border">
      <div className="w-7 h-7 bg-brand rounded-full flex items-center justify-center text-white text-xs font-bold mb-3">{num}</div>
      <h2 className="font-graphik text-2xl font-bold text-ink tracking-tight">{title}</h2>
      <p className="text-sm text-muted mt-1 leading-relaxed">{sub}</p>
    </div>
  );
}

function RadioGroup({ value, onChange, options, name }: { value: string; onChange: (v: string) => void; options: string[]; name: string }) {
  return (
    <div className="flex gap-3 flex-wrap">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={`flex items-center gap-2.5 border rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${
            value === opt
              ? "border-brand bg-surface-deep text-brand font-semibold"
              : "border-border bg-white text-muted hover:border-brand hover:bg-surface-deep hover:text-brand"
          }`}
        >
          <span className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 transition-all ${value === opt ? "border-brand" : "border-border"}`}>
            {value === opt && <span className="w-2 h-2 rounded-full bg-brand block" />}
          </span>
          {opt}
        </button>
      ))}
    </div>
  );
}

function FormNav({ onBack, onNext, nextDisabled }: { onBack?: () => void; onNext?: () => void; nextDisabled?: boolean }) {
  return (
    <div className="flex items-center justify-between pt-6 border-t border-border mt-2">
      {onBack ? (
        <button type="button" onClick={onBack} className="border border-border text-muted font-semibold text-sm px-5 py-2.5 rounded-lg hover:border-ink hover:text-ink transition-colors">
          ← Back
        </button>
      ) : <div />}
      {onNext && (
        <button
          type="button"
          onClick={onNext}
          disabled={nextDisabled}
          className="btn-arrow bg-brand text-white font-semibold text-sm px-6 py-2.5 rounded-lg hover:bg-brand-dark hover:text-white transition-colors disabled:opacity-40 flex items-center gap-2"
        >
          Continue <span className="arrow">→</span>
        </button>
      )}
    </div>
  );
}
