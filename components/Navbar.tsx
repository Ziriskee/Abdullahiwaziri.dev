"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { CloseIcon, MenuIcon } from "@/components/icons";
import { site } from "@/content/site";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/certificates", label: "Certificates" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-white/8 bg-navy-950/85 py-3 backdrop-blur-xl shadow-[0_18px_40px_-30px_rgba(0,0,0,0.9)]"
          : "border-b border-transparent py-5"
      }`}
    >
      <nav className="container-page flex items-center justify-between gap-4">
        <Link
          href="/"
          className="group flex items-center gap-3"
          aria-label={`${site.name} — home`}
        >
          <span className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-accent/30 bg-gradient-to-br from-accent/25 to-aqua/10 text-sm font-black tracking-tight text-accent-soft transition-transform duration-500 group-hover:rotate-6">
            {site.initials}
          </span>
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="text-sm font-bold text-white">{site.name}</span>
            <span className="text-[11px] uppercase tracking-[0.2em] text-slate-muted">
              {site.role}
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 rounded-full border border-white/8 bg-navy-900/60 p-1.5 backdrop-blur-lg md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              data-active={isActive(link.href)}
              className={`relative rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                isActive(link.href)
                  ? "bg-accent/15 text-accent-soft"
                  : "text-slate-muted hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="hidden rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-navy-950 transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-soft hover:shadow-[0_16px_35px_-14px_rgba(255,176,32,0.8)] sm:inline-flex"
          >
            Let&apos;s talk
          </Link>
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-navy-900/70 text-slate-fg transition-colors duration-300 hover:border-accent/40 hover:text-accent md:hidden"
          >
            {open ? (
              <CloseIcon className="h-5 w-5" />
            ) : (
              <MenuIcon className="h-5 w-5" />
            )}
          </button>
        </div>
      </nav>

      <div
        className={`fixed inset-x-0 top-[72px] z-40 origin-top px-5 transition-all duration-300 md:hidden ${
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-3 opacity-0"
        }`}
      >
        <div className="glass rounded-3xl p-4 shadow-2xl">
          <div className="flex flex-col gap-1">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                style={{ transitionDelay: `${index * 45}ms` }}
                className={`rounded-2xl px-4 py-3.5 text-base font-medium transition-colors duration-300 ${
                  isActive(link.href)
                    ? "bg-accent/15 text-accent-soft"
                    : "text-slate-fg hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="mt-3 flex items-center justify-center rounded-2xl bg-accent px-4 py-3.5 text-base font-semibold text-navy-950"
          >
            Start a project
          </Link>
        </div>
      </div>
    </header>
  );
}
