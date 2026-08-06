import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ProjectCard } from "@/components/cards";
import {
  ArrowRight,
  CheckIcon,
  ExternalLink,
  GithubIcon,
} from "@/components/icons";
import { Reveal } from "@/components/motion";
import { Eyebrow, PrimaryLink } from "@/components/ui";
import { getProjectBySlug, getProjects } from "@/lib/data";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Project not found" };
  return { title: project.title, description: project.summary };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) notFound();

  const all = await getProjects();
  const related = all.filter((item) => item.slug !== project.slug).slice(0, 3);

  return (
    <article className="pb-10">
      <section className="relative overflow-hidden border-b border-white/8 py-14 lg:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(69,208,255,0.16),transparent_70%)] blur-2xl"
        />
        <div className="container-page space-y-8">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 text-sm font-medium text-slate-muted transition-colors duration-300 hover:text-accent"
          >
            <ArrowRight className="h-4 w-4 rotate-180 transition-transform duration-300 group-hover:-translate-x-1" />
            Back to all projects
          </Link>

          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-6 animate-fade-up">
              <Eyebrow>
                {project.category} · {project.year}
              </Eyebrow>
              <h1 className="text-4xl font-black leading-[1.06] tracking-tight text-white sm:text-5xl lg:text-6xl">
                {project.title}
              </h1>
              <p className="text-lg font-medium text-gradient">
                {project.tagline}
              </p>
              <p className="max-w-xl text-base leading-relaxed text-slate-muted">
                {project.summary}
              </p>
              <div className="flex flex-wrap gap-3">
                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-navy-950 transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-soft"
                  >
                    Visit live site
                    <ExternalLink className="h-4 w-4" />
                  </a>
                ) : null}
                {project.repoUrl ? (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-2 rounded-full border border-white/12 px-6 py-3 text-sm font-semibold text-slate-fg transition-all duration-300 hover:-translate-y-0.5 hover:border-aqua/45 hover:text-aqua"
                  >
                    <GithubIcon className="h-4 w-4" />
                    Source code
                  </a>
                ) : null}
              </div>
            </div>

            <div className="relative animate-fade-in">
              <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-accent/20 via-transparent to-aqua/20 blur-2xl" />
              <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-navy-900/70 p-2.5">
                {project.coverUrl ? (
                  <img
                    src={project.coverUrl}
                    alt={`${project.title} cover`}
                    className="aspect-[16/10] w-full rounded-[1.4rem] object-cover"
                  />
                ) : (
                  <div className="aspect-[16/10] w-full rounded-[1.4rem] bg-gradient-to-br from-navy-800 to-navy-950" />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page grid gap-10 py-16 lg:grid-cols-[1.4fr_0.6fr]">
        <Reveal className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Overview
            </h2>
            <p className="text-base leading-relaxed text-slate-muted">
              {project.description}
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Impact &amp; highlights
            </h2>
            <ul className="space-y-3">
              {project.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex items-start gap-3 rounded-2xl border border-white/8 bg-navy-900/50 p-4 transition-colors duration-300 hover:border-accent/30"
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                    <CheckIcon className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-sm leading-relaxed text-slate-fg">
                    {highlight}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <aside className="sticky top-28 space-y-6 rounded-3xl border border-white/8 bg-navy-900/55 p-6 backdrop-blur-sm">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
                Role
              </p>
              <p className="mt-1.5 text-sm font-semibold text-white">
                {project.role}
              </p>
            </div>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
                Year
              </p>
              <p className="mt-1.5 text-sm font-semibold text-white">
                {project.year}
              </p>
            </div>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
                Category
              </p>
              <p className="mt-1.5 text-sm font-semibold text-white">
                {project.category}
              </p>
            </div>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
                Tech stack
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-white/10 bg-navy-800/70 px-3 py-1 text-[11px] font-medium text-slate-muted"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <PrimaryLink href="/contact" className="w-full justify-center">
              Build something similar
            </PrimaryLink>
          </aside>
        </Reveal>
      </section>

      {related.length > 0 ? (
        <section className="container-page pb-8">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            More projects
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item, index) => (
              <Reveal key={item.id} delay={index * 100}>
                <ProjectCard project={item} compact />
              </Reveal>
            ))}
          </div>
        </section>
      ) : null}
    </article>
  );
}
