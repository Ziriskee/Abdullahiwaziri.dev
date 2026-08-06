import type { Metadata } from "next";

import { ContactForm } from "@/components/ContactForm";
import { MailIcon, PhoneIcon, PinIcon, socialIcons } from "@/components/icons";
import { Reveal } from "@/components/motion";
import { PageHero } from "@/components/ui";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${site.name} — available for freelance projects and full-time roles.`,
};

const faqs = [
  {
    question: "How fast do you reply?",
    answer:
      "Usually within 24 hours on weekdays. If it's urgent, mention it in the subject line and I'll bump it to the top.",
  },
  {
    question: "What does a typical engagement look like?",
    answer:
      "A short discovery call, a written scope with milestones, then weekly demos. Most builds run between 3 and 12 weeks.",
  },
  {
    question: "Do you take on long-term retainers?",
    answer:
      "Yes — I keep two retainer slots open for ongoing product work, performance audits and design-system maintenance.",
  },
];

export default function ContactPage() {
  const details = [
    { icon: MailIcon, label: "Email", value: site.email, href: `mailto:${site.email}` },
    { icon: PhoneIcon, label: "Phone", value: site.phone, href: `tel:${site.phone.replace(/\s/g, "")}` },
    { icon: PinIcon, label: "Based in", value: site.location, href: null },
  ];

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's build something"
        highlight="worth shipping"
        description="Tell me about your product, your timeline and what success looks like. Every message lands straight in my inbox — no forms disappearing into the void."
      />

      <section className="container-page grid gap-10 md:py-16 lg:grid-cols-[0.85fr_1.15fr] lg:py-20">
        <Reveal className="space-y-6">
          <div className="space-y-4 rounded-3xl border border-white/8 bg-navy-900/55 p-6 backdrop-blur-sm sm:p-8 max-md:mr-7">
            <h2 className="text-xl font-bold text-white">Direct lines</h2>
            <ul className="space-y-4">
              {details.map((detail) => (
                <li key={detail.label}>
                  <div className="group flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-accent/25 bg-accent/10 text-accent transition-transform duration-500 group-hover:-rotate-6">
                      <detail.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-muted">
                        {detail.label}
                      </p>
                      {detail.href ? (
                        <a
                          href={detail.href}
                          className="text-sm font-semibold text-slate-fg transition-colors duration-300 hover:text-accent"
                        >
                          {detail.value}
                        </a>
                      ) : (
                        <p className="text-sm font-semibold text-slate-fg">
                          {detail.value}
                        </p>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2.5 border-t border-white/8 pt-5">
              {site.socials.map((social) => {
                const Icon = socialIcons[social.label];
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-navy-800/60 px-3.5 py-2 text-xs font-medium text-slate-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-aqua/40 hover:text-aqua"
                  >
                    {Icon ? <Icon className="h-4 w-4" /> : null}
                    {social.handle}
                  </a>
                );
              })}
            </div>
          </div>

          <div className="rounded-3xl border border-mint/20 bg-mint/[0.06] p-6 backdrop-blur-sm max-md:mr-7">
            <p className="inline-flex items-center gap-2 text-sm font-semibold text-mint">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-mint" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-mint" />
              </span>
              {site.availability}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-muted">
              Two project slots open for next quarter. Response time averages
              under 24 hours.
            </p>
          </div>

          <div className="space-y-3 max-md:mr-7">
            {faqs.map((faq, index) => (
              <details
                key={faq.question}
                className="group rounded-2xl border border-white/8 bg-navy-900/45 p-5 backdrop-blur-sm transition-colors duration-300 hover:border-accent/25"
                open={index === 0}
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-white">
                  {faq.question}
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/12 text-accent transition-transform duration-300 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-slate-muted">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </Reveal>

        <Reveal delay={120}>
          <ContactForm />
        </Reveal>
      </section>
    </>
  );
}
