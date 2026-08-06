import Link from "next/link";

import { CertificateCard, ProjectCard } from "@/components/cards";
import { Hero } from "@/components/Hero";
import { ArrowRight, serviceIcons } from "@/components/icons";
import { Reveal, TiltCard } from "@/components/motion";
import {
  GhostLink,
  Marquee,
  PrimaryLink,
  SectionHeading,
} from "@/components/ui";
import { site } from "@/content/site";
import { getFeaturedCertificates, getFeaturedProjects } from "@/lib/data";

export default async function HomePage() {
  const [projects, certificates] = await Promise.all([
    getFeaturedProjects(3),
    getFeaturedCertificates(3),
  ]);

  return (
    <>
      <Hero />

      <Reveal>
        <Marquee items={site.marquee} />
      </Reveal>

      {/* What I do */}
      <section className="container-page py-20 lg:py-28">
        <SectionHeading
          eyebrow="What I do"
          title={
            <>
              Engineering that feels{" "}
              <span className="text-gradient">effortless</span> to use
            </>
          }
          description="Three ways I help teams turn ambitious ideas into products that load fast, scale calmly and look sharp on every screen."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {site.services.map((service, index) => {
            const Icon = serviceIcons[service.icon];
            return (
              <Reveal key={service.title} delay={index * 110}>
                <article className="card-hover group relative h-full overflow-hidden rounded-3xl border border-white/8 bg-navy-900/55 p-7 backdrop-blur-sm">
                  <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent/10 blur-2xl transition-all duration-500 group-hover:bg-accent/20" />
                  <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-accent/25 bg-accent/10 text-accent transition-transform duration-500 group-hover:-rotate-6">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="relative mt-5 text-xl font-bold text-white">
                    {service.title}
                  </h3>
                  <p className="relative mt-3 text-sm leading-relaxed text-slate-muted">
                    {service.description}
                  </p>
                  <span className="relative mt-6 block h-px w-full bg-gradient-to-r from-accent/40 via-white/10 to-transparent" />
                  <span className="relative mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-slate-muted/70">
                    0{index + 1}
                  </span>
                </article>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-16 grid gap-10 rounded-3xl border border-white/8 bg-navy-900/40 p-8 backdrop-blur-sm lg:grid-cols-[0.9fr_1.1fr] lg:p-10">
          <Reveal>
            <div className="space-y-5">
              <h3 className="text-2xl font-bold text-white sm:text-3xl">
                A quick <span className="text-accent">introduction</span>
              </h3>
              {site.bio.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-sm leading-relaxed text-slate-muted sm:text-base"
                >
                  {paragraph}
                </p>
              ))}
              <GhostLink href="/contact">Work with me</GhostLink>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="grid gap-5 sm:grid-cols-3">
              {site.skills.map((group) => (
                <div key={group.group} className="space-y-3">
                  <h4 className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
                    {group.group}
                  </h4>
                  <ul className="space-y-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-sm text-slate-muted transition-colors duration-300 hover:text-white"
                      >
                        <span className="h-1 w-1 rounded-full bg-aqua" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Featured projects preview */}
      <section className="relative py-20 lg:py-24">
        <div className="container-page">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Selected work"
              title={
                <>
                  Projects I&apos;m <span className="text-gradient">proud</span>{" "}
                  of
                </>
              }
              description="A preview of recent builds — full case studies live on the projects page."
            />
            <Reveal delay={120}>
              <Link
                href="/projects"
                className="group inline-flex items-center gap-2 self-start rounded-full border border-white/12 bg-white/[0.03] px-5 py-2.5 text-sm font-semibold text-slate-fg transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/45 hover:text-accent md:self-auto"
              >
                All projects
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <Reveal key={project.id} delay={index * 110}>
                <TiltCard className="h-full">
                  <ProjectCard project={project} compact />
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Certificates preview */}
      <section className="relative py-20 lg:py-24">
        <div className="container-page">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Credentials"
              title={
                <>
                  Certificates &amp;{" "}
                  <span className="text-gradient">continuous learning</span>
                </>
              }
              description="Verified certifications that back the work — cloud, front-end and data engineering."
            />
            <Reveal delay={120}>
              <Link
                href="/certificates"
                className="group inline-flex items-center gap-2 self-start rounded-full border border-white/12 bg-white/[0.03] px-5 py-2.5 text-sm font-semibold text-slate-fg transition-all duration-300 hover:-translate-y-0.5 hover:border-aqua/45 hover:text-aqua md:self-auto"
              >
                All certificates
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {certificates.map((certificate, index) => (
              <Reveal key={certificate.id} delay={index * 110}>
                <CertificateCard certificate={certificate} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="container-page py-20 lg:py-24">
        <SectionHeading
          eyebrow="Track record"
          title={
            <>
              Where I&apos;ve been{" "}
              <span className="text-gradient">building</span>
            </>
          }
        />
        <div className="mt-12 space-y-4">
          {site.experience.map((role, index) => (
            <Reveal key={role.company} delay={index * 100}>
              <div className="group relative grid gap-4 rounded-2xl border border-white/8 bg-navy-900/45 p-6 backdrop-blur-sm transition-all duration-500 hover:border-accent/30 hover:bg-navy-900/70 md:grid-cols-[200px_1fr] md:items-center">
                <div className="flex items-center gap-3">
                  <span className="h-10 w-1 rounded-full bg-gradient-to-b from-accent to-aqua opacity-60 transition-opacity duration-500 group-hover:opacity-100" />
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate-muted">
                      {role.period}
                    </p>
                    <p className="text-base font-bold text-white">
                      {role.company}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-accent">
                    {role.role}
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-muted">
                    {role.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-page pb-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-accent/20 bg-gradient-to-br from-navy-800/90 via-navy-900/80 to-navy-950 p-10 text-center backdrop-blur-lg sm:p-16">
            <div className="absolute -left-20 -top-20 h-64 w-64 animate-float-slow rounded-full bg-accent/15 blur-3xl" />
            <div className="absolute -bottom-24 -right-16 h-72 w-72 animate-drift rounded-full bg-aqua/12 blur-3xl" />
            <div className="relative mx-auto max-w-2xl space-y-6">
              <h2 className="text-3xl font-black tracking-tight text-white sm:text-5xl">
                Got something worth{" "}
                <span className="text-gradient">building?</span>
              </h2>
              <p className="text-base leading-relaxed text-slate-muted sm:text-lg">
                I take on a small number of projects each quarter so every build
                gets real attention. Tell me what you have in mind — I usually
                reply within 24 hours.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <PrimaryLink href="/contact">Get in touch</PrimaryLink>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-2 rounded-full border border-white/12 px-6 py-3 text-sm font-semibold text-slate-fg transition-all duration-300 hover:-translate-y-0.5 hover:border-aqua/45 hover:text-aqua"
                >
                  {site.email}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
