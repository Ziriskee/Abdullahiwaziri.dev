import { certificateSeed, projectSeed } from "@/content/seed-data";

export type ProjectView = {
  id: number;
  slug: string;
  title: string;
  tagline: string;
  summary: string;
  description: string;
  category: string;
  stack: string[];
  highlights: string[];
  coverUrl: string | null;
  liveUrl: string | null;
  repoUrl: string | null;
  year: number;
  role: string;
  featured: boolean;
  sortOrder: number;
};

export type CertificateView = {
  id: number;
  slug: string;
  title: string;
  issuer: string;
  issuedOn: string;
  credentialId: string | null;
  credentialUrl: string | null;
  description: string;
  skills: string[];
  accent: string;
  featured: boolean;
  sortOrder: number;
};

function projectFromSeed(
  row: (typeof projectSeed)[number],
  index: number,
): ProjectView {
  return {
    id: index + 1,
    slug: row.slug,
    title: row.title,
    tagline: row.tagline,
    summary: row.summary,
    description: row.description,
    category: row.category,
    stack: row.stack ?? [],
    highlights: row.highlights ?? [],
    coverUrl: row.coverUrl ?? null,
    liveUrl: row.liveUrl ?? null,
    repoUrl: row.repoUrl ?? null,
    year: row.year,
    role: row.role ?? "Full-Stack Developer",
    featured: row.featured ?? false,
    sortOrder: row.sortOrder ?? index + 1,
  };
}

function certificateFromSeed(
  row: (typeof certificateSeed)[number],
  index: number,
): CertificateView {
  return {
    id: index + 1,
    slug: row.slug,
    title: row.title,
    issuer: row.issuer,
    issuedOn: row.issuedOn,
    credentialId: row.credentialId ?? null,
    credentialUrl: row.credentialUrl ?? null,
    description: row.description,
    skills: row.skills ?? [],
    accent: row.accent ?? "amber",
    featured: row.featured ?? false,
    sortOrder: row.sortOrder ?? index + 1,
  };
}

const allProjects = projectSeed.map(projectFromSeed);
const allCertificates = certificateSeed.map(certificateFromSeed);

export async function getProjects(): Promise<ProjectView[]> {
  return allProjects;
}

export async function getFeaturedProjects(limit = 3): Promise<ProjectView[]> {
  const featured = allProjects.filter((project) => project.featured);
  return (featured.length > 0 ? featured : allProjects).slice(0, limit);
}

export async function getProjectBySlug(
  slug: string,
): Promise<ProjectView | null> {
  return allProjects.find((project) => project.slug === slug) ?? null;
}

export async function getCertificates(): Promise<CertificateView[]> {
  return allCertificates;
}

export async function getFeaturedCertificates(
  limit = 3,
): Promise<CertificateView[]> {
  const featured = allCertificates.filter(
    (certificate) => certificate.featured,
  );
  return (featured.length > 0 ? featured : allCertificates).slice(0, limit);
}
