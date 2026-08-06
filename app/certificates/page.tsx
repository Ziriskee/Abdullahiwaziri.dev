import type { Metadata } from "next";

import { CertificatesExplorer } from "@/components/CertificatesExplorer";
import { AwardIcon, CheckIcon, SparkIcon } from "@/components/icons";
import { Counter, Reveal } from "@/components/motion";
import { PageHero } from "@/components/ui";
import { getCertificates } from "@/lib/data";

export const metadata: Metadata = {
  title: "Certificates",
  description:
    "Verified certifications in cloud architecture, front-end engineering, containers and data.",
};

export default async function CertificatesPage() {
  const certificates = await getCertificates();
  const issuerCount = new Set(certificates.map((item) => item.issuer)).size;
  const skillCount = new Set(certificates.flatMap((item) => item.skills)).size;

  const summary = [
    {
      icon: AwardIcon,
      value: certificates.length,
      label: "Credentials earned",
    },
    { icon: SparkIcon, value: issuerCount, label: "Issuing organisations" },
    { icon: CheckIcon, value: skillCount, label: "Validated skills" },
  ];

  return (
    <>
      <PageHero
        eyebrow="Credentials"
        title="Certificates that"
        highlight="back the work"
        description="I keep learning in public. Each credential below links out to its verification page — filter by issuing organisation to explore."
      />

      <section className="container-page md:py-14">
        <div className="grid gap-4 sm:grid-cols-3">
          {summary.map((item, index) => (
            <Reveal key={item.label} delay={index * 100}>
              <div className="group flex items-center gap-4 rounded-3xl border border-white/8 bg-navy-900/50 p-6 backdrop-blur-sm transition-all duration-500 hover:border-aqua/30">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-aqua/25 bg-aqua/10 text-aqua transition-transform duration-500 group-hover:rotate-6">
                  <item.icon className="h-6 w-6" />
                </span>
                <div>
                  <p className="text-3xl font-black text-white">
                    <Counter value={item.value} />
                  </p>
                  <p className="text-xs uppercase tracking-[0.16em] text-slate-muted">
                    {item.label}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-page pt-4 pb-16">
        <CertificatesExplorer certificates={certificates} />
      </section>
    </>
  );
}
