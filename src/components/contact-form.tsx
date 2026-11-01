"use client";

import { useState } from "react";
import { ArrowRight, Check } from "./icons";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Wire this up to Resend/Formspree/an API route in production.
    setSent(true);
  }

  if (sent) {
    return (
      <div className="grid place-items-center rounded-2xl border border-line bg-bg-subtle p-10 text-center">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-brand/10 text-brand">
          <Check className="h-6 w-6" />
        </span>
        <p className="mt-4 text-lg font-semibold text-ink">Message sent!</p>
        <p className="mt-1 text-sm text-muted">
          Thanks for reaching out. I&apos;ll get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-line bg-white p-6 shadow-[var(--shadow-card)] sm:p-8"
    >
      <div className="grid gap-5">
        <Field label="Your Name" name="name">
          <input
            required
            name="name"
            placeholder="John Doe"
            className={inputCls}
          />
        </Field>
        <Field label="Your Email" name="email">
          <input
            required
            type="email"
            name="email"
            placeholder="you@example.com"
            className={inputCls}
          />
        </Field>
        <Field label="Subject" name="subject">
          <input
            name="subject"
            placeholder="How can I help you?"
            className={inputCls}
          />
        </Field>
        <Field label="Message" name="message">
          <textarea
            required
            name="message"
            rows={5}
            placeholder="Write your message…"
            className={`${inputCls} resize-y`}
          />
        </Field>
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-700"
        >
          Send Message <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </form>
  );
}

const inputCls =
  "w-full rounded-xl border border-line bg-white px-4 py-2.5 text-body outline-none transition-colors placeholder:text-faint focus:border-brand focus:ring-2 focus:ring-brand/20";

function Field({
  label,
  name,
  children,
}: {
  label: string;
  name: string;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={name} className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink">{label}</span>
      {children}
    </label>
  );
}
