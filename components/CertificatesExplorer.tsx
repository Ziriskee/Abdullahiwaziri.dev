"use client";

import { useMemo, useState } from "react";

import { CertificateCard } from "@/components/cards";
import type { CertificateView } from "@/lib/data";

export function CertificatesExplorer({
  certificates,
}: {
  certificates: CertificateView[];
}) {
  const [issuer, setIssuer] = useState("All");

  const issuers = useMemo(
    () => ["All", ...Array.from(new Set(certificates.map((item) => item.issuer)))],
    [certificates],
  );

  const filtered = useMemo(
    () =>
      issuer === "All"
        ? certificates
        : certificates.filter((item) => item.issuer === issuer),
    [certificates, issuer],
  );

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap gap-2 rounded-3xl border border-white/8 bg-navy-900/45 p-4 backdrop-blur-sm">
        {issuers.map((item) => {
          const active = item === issuer;
          return (
            <button
              key={item}
              type="button"
              onClick={() => setIssuer(item)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                active
                  ? "bg-aqua text-navy-950 shadow-[0_10px_28px_-12px_rgba(69,208,255,0.9)]"
                  : "border border-white/10 bg-navy-800/50 text-slate-muted hover:border-aqua/35 hover:text-white"
              }`}
            >
              {item}
            </button>
          );
        })}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((certificate, index) => (
          <div
            key={certificate.id}
            className="animate-fade-up"
            style={{ animationDelay: `${Math.min(index, 6) * 70}ms` }}
          >
            <CertificateCard certificate={certificate} />
          </div>
        ))}
      </div>

      <p className="text-center font-mono text-[11px] uppercase tracking-[0.22em] text-slate-muted/70">
        Showing {filtered.length} of {certificates.length} credentials
      </p>
    </div>
  );
}
