"use client";

import { useMemo, useState } from "react";

import { ProjectCard } from "@/components/cards";
import type { ProjectView } from "@/lib/data";

export function ProjectsExplorer({ projects }: { projects: ProjectView[] }) {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(projects.map((project) => project.category)))],
    [projects],
  );

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return projects.filter((project) => {
      const matchesCategory = category === "All" || project.category === category;
      const matchesQuery =
        needle.length === 0 ||
        [project.title, project.tagline, project.summary, ...project.stack]
          .join(" ")
          .toLowerCase()
          .includes(needle);
      return matchesCategory && matchesQuery;
    });
  }, [projects, category, query]);

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-4 rounded-3xl border border-white/8 bg-navy-900/45 p-4 backdrop-blur-sm lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {categories.map((item) => {
            const active = item === category;
            return (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  active
                    ? "bg-accent text-navy-950 shadow-[0_10px_28px_-12px_rgba(255,176,32,0.9)]"
                    : "border border-white/10 bg-navy-800/50 text-slate-muted hover:border-accent/35 hover:text-white"
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>

        <label className="relative flex w-full items-center lg:max-w-xs">
          <span className="sr-only">Search projects</span>
          <svg
            aria-hidden
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.6}
            className="pointer-events-none absolute left-4 h-4 w-4 text-slate-muted"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.2-3.2" strokeLinecap="round" />
          </svg>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search stack or title..."
            className="w-full rounded-full border border-white/10 bg-navy-950/70 py-2.5 pl-11 pr-4 text-sm text-slate-fg placeholder:text-slate-muted/70 transition-colors duration-300 focus:border-accent/50 focus:outline-none"
          />
        </label>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-white/12 bg-navy-900/40 p-16 text-center">
          <p className="text-lg font-semibold text-white">No projects match that filter</p>
          <p className="mt-2 text-sm text-slate-muted">
            Try a different category or clear your search.
          </p>
          <button
            type="button"
            onClick={() => {
              setCategory("All");
              setQuery("");
            }}
            className="mt-6 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-navy-950 transition-transform duration-300 hover:-translate-y-0.5"
          >
            Reset filters
          </button>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project, index) => (
            <div
              key={project.id}
              className="animate-fade-up"
              style={{ animationDelay: `${Math.min(index, 6) * 70}ms` }}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      )}

      <p className="text-center font-mono text-[11px] uppercase tracking-[0.22em] text-slate-muted/70">
        Showing {filtered.length} of {projects.length} projects
      </p>
    </div>
  );
}
