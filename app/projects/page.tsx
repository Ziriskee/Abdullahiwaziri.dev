import type { Metadata } from "next";

import { ProjectsExplorer } from "@/components/ProjectsExplorer";
import { PageHero } from "@/components/ui";
import { getProjects } from "@/lib/data";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Case studies and shipped products — analytics platforms, commerce storefronts, PWAs and developer tools.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();
  const years = projects.map((project) => project.year);
  const range = years.length
    ? `${Math.min(...years)} — ${Math.max(...years)}`
    : "";

  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Things I have"
        highlight="designed & shipped"
        description="Every project here went to production. Filter by category or search the stack to find what's relevant to you."
      >
        <div className="flex flex-wrap gap-3 pt-2">
          <span className="rounded-full border border-white/10 bg-navy-900/60 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-slate-muted">
            {projects.length} case studies
          </span>
          {range ? (
            <span className="rounded-full border border-white/10 bg-navy-900/60 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-slate-muted">
              {range}
            </span>
          ) : null}
        </div>
      </PageHero>

      <section className="container-page py-16 lg:py-20">
        <ProjectsExplorer projects={projects} />
      </section>
    </>
  );
}
