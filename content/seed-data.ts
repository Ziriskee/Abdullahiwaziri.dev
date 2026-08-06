export const projectSeed = [
  {
    slug: "snippetstack",
    title: "SnippetStack",
    tagline: "A community hub for sharing and discovering code snippets",
    summary:
      "A full-stack web app where developers can post, browse, and filter code snippets across multiple programming languages — built with Next.js and React.",
    description:
      "SnippetStack is my personal project from my web development class at Earlycode Institute. It lets users create accounts, post code snippets with syntax highlighting, categorize them by language, and explore snippets shared by others. I built the entire frontend with Next.js App Router, handled state with React hooks, and styled everything with Tailwind CSS. The project taught me routing, dynamic rendering, and form handling in a real-world context.",
    category: "Web App",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    highlights: [
      "Users can post and browse code snippets by programming language",
      "Clean syntax-highlighted code display with copy-to-clipboard",
      "Responsive design that works on mobile and desktop",
    ],
    coverUrl: "snippetstack.png",
    liveUrl: "https://snippet-stack-mauve.vercel.app/",
    repoUrl: "https://github.com/Ziriskee",
    year: 2025,
    role: "Full-Stack Developer",
    featured: true,
    sortOrder: 1,
  },
  {
    slug: "tribe-c",
    title: "Tribe C",
    tagline: "A modern men's clothing storefront built for a fashion brand",
    summary:
      "An e-commerce-style landing page and product showcase for a men's clothing brand — featuring product grids and a polished shopping experience.",
    description:
      "Tribe C was an assignment project during my SIWES internship at Earlycode Institute. I was tasked with building a complete men's clothing store website from scratch. The site features a hero section, product categories and a clean interface. I used Next.js for routing and SSR, React for interactive components and Tailwind CSS for the sharp, modern aesthetic. It was my first deep dive into e-commerce UI patterns.",
    category: "E-Commerce",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    highlights: [
      "Complete product catalog with category filtering and search",
      "Mobile-first responsive design with smooth page transitions",
    ],
    coverUrl: "Tribe_C.png",
    liveUrl: "https://tribe-c-gamma.vercel.app/",
    repoUrl: "https://github.com/Ziriskee",
    year: 2025,
    role: "Frontend Developer",
    featured: true,
    sortOrder: 2,
  },
  {
    slug: "chinwe-portfolio",
    title: "Chinwe Portfolio",
    tagline: "A sleek personal portfolio built for a client",
    summary:
      "A custom-designed portfolio website built for a client who needed a modern, professional replacement for her old site — deployed and live on Vercel.",
    description:
      "This was a client project I took on during my internship — Chinwe wanted a portfolio that reflected her professionalism better than her outdated previous site. I designed and built a clean, modern single-page portfolio with smooth scroll animations, a project showcase section, contact form, and responsive layouts. Working with a real client taught me how to gather requirements, iterate on feedback, and deliver a polished product on a deadline. The site is now her primary online presence.",
    category: "Web App",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    highlights: [
      "Client-facing project with real feedback loops and iterations",
      "Smooth scroll animations and responsive project showcase",
      "Deployed to Vercel with custom domain-ready configuration",
    ],
    coverUrl: "Chinwe.png",
    liveUrl: "https://chinwe-portfolio-kohl.vercel.app/",
    repoUrl: "https://github.com/Ziriskee",
    year: 2025,
    role: "Frontend Developer",
    featured: true,
    sortOrder: 3,
  },
  {
    slug: "echofetch",
    title: "EchoFetch",
    tagline: "Python CLI tool for downloading files from the web",
    summary:
      "A simple but effective file downloader built with Python that takes a URL and saves the file locally with progress tracking and integrity checks.",
    description:
      "EchoFetch was born from a personal need — I wanted to download files without relying on browser downloads. Built with Python's requests library and urllib, it handles direct file links, shows real-time download progress in the terminal, and validates file integrity after completion. It's a work in progress, but the core workflow is solid and reliable.",
    category: "Python Tool",
    stack: ["Python", "Requests", "CLI", "urllib"],
    highlights: [
      "Downloads files from direct URLs with a single command",
      "Shows real-time download progress in the terminal",
      "Validates file integrity after completion",
    ],
    coverUrl: "echo-fetch.jpg",
    liveUrl: null,
    repoUrl: "https://github.com/Ziriskee",
    year: 2025,
    role: "Solo Developer",
    featured: false,
    sortOrder: 4,
  },
];

export const certificateSeed = [
  {
    slug: "sololearn-html",
    title: "HTML Course",
    issuer: "Sololearn",
    issuedOn: "2024",
    credentialId: "SL-HTML-2024",
    credentialUrl: "https://www.sololearn.com",
    description:
      "Comprehensive HTML fundamentals covering semantic markup, forms, tables, media elements, and modern HTML5 APIs.",
    skills: ["HTML5", "Semantic Markup", "Forms", "Accessibility"],
    accent: "amber",
    featured: true,
    sortOrder: 1,
  },
  {
    slug: "sololearn-sql",
    title: "SQL Course",
    issuer: "Sololearn",
    issuedOn: "2024",
    credentialId: "SL-SQL-2024",
    credentialUrl: "https://www.sololearn.com",
    description:
      "Database querying and management with SQL — covering SELECT, JOINs, aggregation, subqueries, and database design principles.",
    skills: ["SQL", "Database Design", "Queries", "Joins"],
    accent: "cyan",
    featured: true,
    sortOrder: 2,
  },
  {
    slug: "sololearn-python",
    title: "Python Core Course",
    issuer: "Sololearn",
    issuedOn: "2024",
    credentialId: "SL-PY-2024",
    credentialUrl: "https://www.sololearn.com",
    description:
      "Python programming fundamentals including data structures, OOP, file handling, error handling, and working with external libraries.",
    skills: ["Python", "OOP", "File Handling", "Data Structures"],
    accent: "emerald",
    featured: true,
    sortOrder: 3,
  },
];
