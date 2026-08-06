import { socialIcons } from "@/components/icons";
import { Counter, Reveal, TypingRoles } from "@/components/motion";
import { Eyebrow, GhostLink, PrimaryLink } from "@/components/ui";
import { site } from "@/content/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-20 pt-10 sm:pt-16 lg:pb-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-30"
        style={{
          backgroundImage: "url('/images/hero-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          maskImage: "radial-gradient(ellipse at 60% 30%, black 10%, transparent 72%)",
          WebkitMaskImage: "radial-gradient(ellipse at 60% 30%, black 10%, transparent 72%)",
        }}
      />

      <div className="container-page grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-8">
          <Reveal>
            <Eyebrow>{site.availability}</Eyebrow>
          </Reveal>

          <Reveal delay={90}>
            <h1 className="text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-[4.25rem]">
              Hi, I&apos;m{" "}
              <span className="relative inline-block">
                <span className="text-gradient">{site.name}</span>
                <span
                  aria-hidden
                  className="absolute -bottom-2 left-0 h-[6px] w-full rounded-full bg-linear-to-r from-accent/70 via-accent/20 to-transparent blur-[2px]"
                />
              </span>
              <br />
              <span className="text-3xl font-bold text-slate-fg sm:text-5xl lg:text-[3.25rem]">
                I'm a{" "}
                <span className="whitespace-nowrap">
                  <TypingRoles roles={site.roles} />
                </span>
              </span>
            </h1>
          </Reveal>

          <Reveal delay={180}>
            <p className="max-w-xl text-base leading-relaxed text-slate-muted sm:text-lg">
              {site.tagline} Currently building platforms at Early Code
              and shipping side projects that stay fast under real traffic.
            </p>
          </Reveal>

          <Reveal delay={260}>
            <div className="flex flex-wrap items-center gap-3">
              <PrimaryLink href="/projects">Explore my work</PrimaryLink>
              <GhostLink href="/contact">Start a conversation</GhostLink>
            </div>
          </Reveal>

          <Reveal delay={340}>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-slate-muted/70">
                Find me
              </span>
              <span className="h-px w-10 bg-white/15" />
              <div className="flex gap-2.5">
                {site.socials.map((social) => {
                  const Icon = socialIcons[social.label];
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={social.label}
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-navy-900/70 text-slate-muted transition-all duration-300 hover:-translate-y-1 hover:border-accent/45 hover:text-accent"
                    >
                      {Icon ? <Icon className="h-[18px] w-[18px]" /> : social.label.charAt(0)}
                    </a>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={200} direction="left" className="relative mx-auto w-full max-w-md">
          <div className="relative">
            <div
              aria-hidden
              className="absolute -inset-6 animate-float-slow rounded-[2.5rem] bg-gradient-to-br from-accent/25 via-transparent to-aqua/20 blur-2xl"
            />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-navy-900/70 p-3 backdrop-blur-xl">
              <div className="relative overflow-hidden rounded-[1.5rem]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/avatar.png"
                  alt={`Illustrated portrait of ${site.name}`}
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent" />
              </div>

              <div className="flex items-center justify-between gap-3 px-3 py-4">
                <div>
                  <p className="text-sm font-bold text-white">{site.name}</p>
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate-muted">
                    {site.location}
                  </p>
                </div>
                <span className="flex items-center gap-2 rounded-full border border-mint/25 bg-mint/10 px-3 py-1.5 text-[11px] font-semibold text-mint">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-mint" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-mint" />
                  </span>
                  Open to work
                </span>
              </div>
            </div>


           
          </div>
        </Reveal>
      </div>

      <div className="container-page mt-16">
        <Reveal delay={120}>
          <dl className="grid grid-cols-2 gap-4 rounded-3xl border border-white/8 bg-navy-900/50 p-6 backdrop-blur-sm sm:gap-6 lg:grid-cols-4">
            {site.stats.map((stat) => (
              <div key={stat.label} className="group text-center sm:text-left">
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block text-3xl font-black tracking-tight text-white transition-colors duration-300 group-hover:text-accent sm:text-4xl">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </span>
                  <span className="mt-1 block text-xs uppercase tracking-[0.16em] text-slate-muted">
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
