import Link from "next/link";

import { MailIcon, PinIcon, socialIcons } from "./icons";
import { site } from "../content/site";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/certificates", label: "Certificates" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-white/8 bg-navy-950/80">
      <div className="container-page grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="space-y-5">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-accent/30 bg-gradient-to-br from-accent/25 to-aqua/10 text-sm font-black text-accent-soft">
              {site.initials}
            </span>
            <span className="text-lg font-bold text-white">{site.name}</span>
          </Link>
          <p className="max-w-sm text-sm leading-relaxed text-slate-muted">{site.tagline}</p>
          <div className="flex flex-wrap gap-3">
            {site.socials.map((social) => {
              const Icon = socialIcons[social.label];
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={social.label}
                  className="group flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-navy-900/70 text-slate-muted transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:text-accent"
                >
                  {Icon ? <Icon className="h-[18px] w-[18px]" /> : social.label.charAt(0)}
                </a>
              );
            })}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-white">
            Navigate
          </h3>
          <ul className="space-y-3 text-sm text-slate-muted">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="link-underline inline-block transition-colors duration-300 hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-white">
            Get in touch
          </h3>
          <ul className="space-y-3 text-sm text-slate-muted">
            <li>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-2 transition-colors duration-300 hover:text-accent"
              >
                <MailIcon className="h-4 w-4" />
                {site.email}
              </a>
            </li>
            <li className="inline-flex items-start gap-2">
              <PinIcon className="mt-0.5 h-4 w-4 shrink-0" />
              {site.location}
            </li>
          </ul>
          <p className="inline-flex items-center gap-2 rounded-full border border-mint/25 bg-mint/10 px-3 py-1.5 text-xs font-medium text-mint">
            <span className="h-1.5 w-1.5 rounded-full bg-mint" />
            {site.availability}
          </p>
        </div>
      </div>

      <div className="border-t border-white/8">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-6 text-xs text-slate-muted sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name}. Crafted with Next.js, TypeScript &amp;
            Tailwind CSS.
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-muted/70">
            Designed &amp; built in the dark
          </p>
        </div>
      </div>
    </footer>
  );
}
