import { GhostLink, PrimaryLink } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[70vh] flex-col items-center justify-center gap-6 py-24 text-center">
      <p className="animate-fade-up font-mono text-[23px] text-center uppercase tracking-[0.3em] text-accent">
        Error 404
      </p>
      <h1 className="animate-fade-up text-6xl text-center font-black tracking-tight text-white sm:text-8xl">
        Lost in the <span className="text-gradient">dark</span>
      </h1>
      <p className="max-w-md animate-fade-in text-base leading-relaxed text-slate-muted">
        The page you are looking for drifted off into deep space. Let&apos;s get you back to
        something useful.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <PrimaryLink href="/">Back home</PrimaryLink>
        <GhostLink href="/projects">Browse projects</GhostLink>
      </div>
    </section>
  );
}
