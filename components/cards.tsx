import Link from "next/link";

import { ArrowUpRight, AwardIcon, CheckIcon, ExternalLink, GithubIcon } from "@/components/icons";
import type { CertificateView, ProjectView } from "@/lib/data";

const accentMap: Record<
  string,
  { ring: string; text: string; glow: string; chip: string }
> = {
  amber: {
    ring: "border-accent/30",
    text: "text-accent",
    glow: "from-accent/30 via-accent/5 to-transparent",
    chip: "bg-accent/12 text-accent-soft border-accent/25",
  },
  cyan: {
    ring: "border-aqua/30",
    text: "text-aqua",
    glow: "from-aqua/30 via-aqua/5 to-transparent",
    chip: "bg-aqua/12 text-aqua border-aqua/25",
  },
  violet: {
    ring: "border-violet-glow/30",
    text: "text-violet-glow",
    glow: "from-violet-glow/30 via-violet-glow/5 to-transparent",
    chip: "bg-violet-glow/12 text-violet-glow border-violet-glow/25",
  },
  emerald: {
    ring: "border-mint/30",
    text: "text-mint",
    glow: "from-mint/30 via-mint/5 to-transparent",
    chip: "bg-mint/12 text-mint border-mint/25",
  },
};

export function ProjectCard({
  project,
  compact = false,
}: {
  project: ProjectView;
  compact?: boolean;
}) {
  return (
    <article className="card-hover group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/8 bg-navy-900/60 backdrop-blur-sm">
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        {project.coverUrl ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={project.coverUrl}
            alt={`${project.title} preview`}
            loading="lazy"
            className="h-full w-full scale-105 object-cover opacity-75 transition-all duration-700 ease-out group-hover:scale-110 group-hover:opacity-100"
          />
        ) : (
          <div className="h-full w-full bg-linear-to-br from-navy-800 to-navy-950" />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-navy-950/60 via-navy-950/55 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-accent/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <div className="absolute left-4 top-4 flex items-center gap-2">
          <span className="rounded-full border border-accent/25 bg-navy-950/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-accent-soft backdrop-blur">
            {project.category}
          </span>
        </div>
        <span className="absolute right-4 top-4 rounded-full border border-white/10 bg-navy-950/75 px-2.5 py-1 font-mono text-[11px] text-slate-muted backdrop-blur">
          {project.year}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="space-y-2">
          <h3 className="text-xl font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-accent-soft">
            {project.title}
          </h3>
          <p className="text-sm font-medium text-aqua/85">{project.tagline}</p>
        </div>

        <p className="line-clamp-3 text-sm leading-relaxed text-slate-muted">
          {project.summary}
        </p>

        <div className="flex flex-wrap gap-2 pt-1">
          {project.stack.slice(0, compact ? 3 : 5).map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-white/10 bg-navy-800/70 px-2.5 py-1 text-[11px] font-medium text-slate-muted transition-colors duration-300 group-hover:border-accent/25 group-hover:text-slate-fg"
            >
              {tech}
            </span>
          ))}
          {project.stack.length > (compact ? 3 : 5) ? (
            <span className="rounded-full border border-white/10 bg-navy-800/70 px-2.5 py-1 text-[11px] font-medium text-slate-muted">
              +{project.stack.length - (compact ? 3 : 5)}
            </span>
          ) : null}
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-white/8 pt-4">
          <Link
            href={`/projects/${project.slug}`}
            className="group/link inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-colors duration-300 hover:text-accent-soft"
          >
            Case study
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
          </Link>
          <div className="flex items-center gap-2">
            {project.repoUrl ? (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`${project.title} source code`}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-navy-800/60 text-slate-muted transition-all duration-300 hover:border-aqua/40 hover:text-aqua"
              >
                <GithubIcon className="h-4 w-4" />
              </a>
            ) : null}
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`${project.title} live site`}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-navy-800/60 text-slate-muted transition-all duration-300 hover:border-accent/40 hover:text-accent"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}

export function CertificateCard({ certificate }: { certificate: CertificateView }) {
  const accent = accentMap[certificate.accent] ?? accentMap.amber;

  return (
    <article className="card-hover group relative flex h-full flex-col gap-5 overflow-hidden rounded-3xl border border-white/8 bg-navy-900/60 p-6 backdrop-blur-sm">
      <div
        className={`pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br ${accent.glow} blur-2xl transition-opacity duration-500 group-hover:opacity-100 opacity-70`}
      />

      <div className="flex items-start justify-between gap-4">
        <span
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border ${accent.ring} bg-navy-800/80 ${accent.text}`}
        >
          <AwardIcon className="h-6 w-6" />
        </span>
        <span className="rounded-full border border-white/10 bg-navy-800/70 px-3 py-1 font-mono text-[11px] text-slate-muted">
          {certificate.issuedOn}
        </span>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-bold leading-snug text-white transition-colors duration-300 group-hover:text-accent-soft">
          {certificate.title}
        </h3>
        <p className={`text-sm font-semibold ${accent.text}`}>{certificate.issuer}</p>
      </div>

      <p className="text-sm leading-relaxed text-slate-muted">{certificate.description}</p>

      <div className="flex flex-wrap gap-2">
        {certificate.skills.map((skill) => (
          <span
            key={skill}
            className={`rounded-full border px-2.5 py-1 text-[11px] font-medium ${accent.chip}`}
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-white/8 pt-4">
        <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-slate-muted">
          <CheckIcon className="h-3.5 w-3.5 text-mint" />
          {certificate.credentialId ?? "Verified credential"}
        </span>
        {certificate.credentialUrl ? (
          <a
            href={certificate.credentialUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="group/link inline-flex items-center gap-1.5 text-sm font-semibold text-slate-fg transition-colors duration-300 hover:text-accent"
          >
            Verify
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
          </a>
        ) : null}
      </div>
    </article>
  );
}
