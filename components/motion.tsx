"use client";

import {
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
} from "react";

function useInView<T extends HTMLElement>(once = true, threshold = 0.15) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            setInView(false);
          }
        });
      },
      { threshold, rootMargin: "0px 0px -60px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [once, threshold]);

  return { ref, inView };
}

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "none";
};

export function Reveal({
  children,
  delay = 0,
  className = "",
  direction = "up",
}: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>();

  const offset =
    direction === "up"
      ? "translate3d(0, 32px, 0)"
      : direction === "down"
        ? "translate3d(0, -32px, 0)"
        : direction === "left"
          ? "translate3d(36px, 0, 0)"
          : direction === "right"
            ? "translate3d(-36px, 0, 0)"
            : "none";

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      data-visible={inView ? "true" : "false"}
      style={{
        transitionDelay: `${delay}ms`,
        transform: inView ? "translate3d(0,0,0)" : offset,
      }}
    >
      {children}
    </div>
  );
}

export function Counter({
  value,
  suffix = "",
  duration = 1600,
  className = "",
}: {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, duration]);

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}

export function TypingRoles({ roles }: { roles: readonly string[] }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[index % roles.length] ?? "";
    const complete = text === current;
    const empty = text.length === 0;

    let delay = deleting ? 45 : 85;
    if (!deleting && complete) delay = 1600;
    if (deleting && empty) delay = 260;

    const timeout = setTimeout(() => {
      if (!deleting && complete) {
        setDeleting(true);
        return;
      }
      if (deleting && empty) {
        setDeleting(false);
        setIndex((prev) => (prev + 1) % roles.length);
        return;
      }
      setText(
        deleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1),
      );
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, deleting, index, roles]);

  return (
    <span className="inline-flex items-center">
      <span className="text-gradient font-semibold">{text || "\u00a0"}</span>
      <span className="ml-1 inline-block h-[1.05em] w-[3px] animate-blink rounded-full bg-accent align-middle" />
    </span>
  );
}

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollable =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const value = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
      setProgress(value);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-[3px] bg-transparent">
      <div
        className="h-full origin-left bg-gradient-to-r from-accent via-accent-soft to-aqua transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

export function TiltCard({
  children,
  className = "",
  strength = 8,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  const handleMove = (event: ReactMouseEvent<HTMLDivElement>) => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = node.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    node.style.transform = `perspective(900px) rotateX(${(-y * strength).toFixed(
      2,
    )}deg) rotateY(${(x * strength).toFixed(2)}deg) translateY(-6px)`;
    node.style.setProperty("--spot-x", `${((event.clientX - rect.left) / rect.width) * 100}%`);
    node.style.setProperty("--spot-y", `${((event.clientY - rect.top) / rect.height) * 100}%`);
  };

  const handleLeave = () => {
    const node = ref.current;
    if (!node) return;
    node.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`transition-transform duration-300 ease-out ${className}`}
    >
      {children}
    </div>
  );
}
