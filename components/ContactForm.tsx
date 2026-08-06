"use client";

import { useState, type FormEvent } from "react";

import { ArrowRight, CheckIcon } from "@/components/icons";

type Status = "idle" | "loading" | "success";

const fieldClass =
  "w-full rounded-2xl border border-white/10 bg-navy-950/70 px-4 py-3.5 text-sm text-slate-fg placeholder:text-slate-muted/60 transition-all duration-300 focus:border-accent/55 focus:bg-navy-950 focus:outline-none focus:ring-2 focus:ring-accent/20";

const labelClass =
  "mb-2 block font-mono text-[11px] uppercase tracking-[0.2em] text-slate-muted";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const subject = String(data.get("subject") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`,
    );
    const mailto = `mailto:waziriabdullahi36@gmail.com?subject=${encodeURIComponent(
      subject,
    )}&body=${body}`;

    window.location.href = mailto;
    setStatus("success");
    form.reset();
  }

  if (status === "success") {
    return (
      <div className="flex h-full min-h-104 flex-col items-center justify-center gap-5 rounded-3xl border border-mint/25 bg-navy-900/60 p-10 text-center backdrop-blur-sm animate-fade-up">
        <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-mint/15 text-mint">
          <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-mint/40" />
          <CheckIcon className="relative h-8 w-8" />
        </span>
        <h3 className="text-2xl font-bold text-white">Email client opened</h3>
        <p className="max-w-sm text-sm leading-relaxed text-slate-muted">
          Your default mail app should have opened with a pre-filled message. If
          not, you can email me directly at waziriabdullahi36@gmail.com.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="rounded-full border border-white/12 px-5 py-2.5 text-sm font-semibold text-slate-fg transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/45 hover:text-accent"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-3xl border border-white/8 bg-navy-900/55 p-6 backdrop-blur-sm sm:p-8 max-md:mr-7"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="name">
            Your name
          </label>
          <input
            id="name"
            name="name"
            required
            maxLength={120}
            placeholder="Abdullahi Waziri"
            className={fieldClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="email">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            maxLength={160}
            placeholder="you@example.com"
            className={fieldClass}
          />
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="subject">
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          required
          maxLength={180}
          placeholder="Internship opportunity"
          className={fieldClass}
        />
      </div>

      <div>
        <label className={labelClass} htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          maxLength={4000}
          placeholder="Tell me about the opportunity, project, or just say hello."
          className={`${fieldClass} resize-none`}
        />
      </div>

      <button
        type="submit"
        className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-bold text-navy-950 transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-soft hover:shadow-[0_18px_45px_-15px_rgba(255,176,32,0.75)] sm:w-auto"
      >
        Send message
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </button>

      <p className="text-xs text-slate-muted/80">
        Opens your mail app with a pre-filled email. No data is stored on any
        server.
      </p>
    </form>
  );
}
