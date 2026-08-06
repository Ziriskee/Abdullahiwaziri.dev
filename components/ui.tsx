import Link from "next/link";
import type { ReactNode } from "react";

import { ArrowRight } from "@/components/icons";

export function AuroraBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-0 bg-navy-950" />
      <div className="absolute inset-0 grid-lines opacity-60" />
      <div className="absolute -left-32 top-[-10%] h-[34rem] w-[34rem] animate-drift rounded-full bg-[radial-gradient(circle,rgba(69,208,255,0.18),transparent_65%)] blur-2xl" />
      <div className="absolute right-[-12%] top-[12%] h-[30rem] w-[30rem] animate-float-slow rounded-full bg-[radial-gradient(circle,rgba(255,176,32,0.16),transparent_65%)] blur-2xl" />
      <div className="absolute bottom-[-18%] left-1/3 h-[36rem] w-[36rem] animate-drift rounded-full bg-[radial-gradient(circle,rgba(157,139,255,0.14),transparent_68%)] blur-2xl" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_20%,rgba(3,6,15,0.75)_75%)]" />
    </div>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-accent-soft">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-accent" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
      </span>
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={`flex max-w-2xl flex-col gap-4 ${
        align === "center" ? "mx-auto items-center text-center" : "items-start"
      }`}
    >
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
        {title}
      </h2>
      {description ? (
        <p className="text-base leading-relaxed text-slate-muted sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}

export function PrimaryLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-accent px-6 py-3 text-sm font-semibold text-navy-950 transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-soft hover:shadow-[0_18px_45px_-15px_rgba(255,176,32,0.75)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${className}`}
    >
      <span className="relative z-10">{children}</span>
      <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      <span className="shine absolute inset-0 animate-shimmer opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </Link>
  );
}

export function GhostLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-6 py-3 text-sm font-semibold text-slate-fg transition-all duration-300 hover:-translate-y-0.5 hover:border-aqua/45 hover:bg-aqua/10 hover:text-white ${className}`}
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  );
}

export function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-white/10 bg-navy-800/70 px-3 py-1 text-xs font-medium text-slate-muted transition-colors duration-300 group-hover:border-accent/30 group-hover:text-slate-fg">
      {children}
    </span>
  );
}

export function PageHero({
  eyebrow,
  title,
  highlight,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-white/8 py-16 lg:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-72 w-[46rem] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(255,176,32,0.16),transparent_70%)] blur-2xl"
      />
      <div className="container-page relative flex max-w-3xl flex-col items-start gap-5 animate-fade-up">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="text-4xl font-black leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
          {title} <span className="text-gradient">{highlight}</span>
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-slate-muted sm:text-lg">
          {description}
        </p>
        {children}
      </div>
    </section>
  );
}

export function Marquee({ items }: { items: readonly string[] }) {
  const doubled = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-white/8 bg-navy-900/50 py-5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-navy-950 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-navy-950 to-transparent" />
      <div className="flex w-max animate-marquee items-center gap-10 pr-10">
        {doubled.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="flex items-center gap-10 text-sm font-semibold uppercase tracking-[0.28em] text-slate-muted/80"
          >
            {item}
            <span className="h-1.5 w-1.5 rounded-full bg-accent/60" />
          </span>
        ))}
      </div>
    </div>
  );
}
