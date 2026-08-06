export const site = {
  name: "Abdullahi Waziri Bello",
  initials: "AWB",
  role: "Computer Science Student & Web Developer",
  roles: [
    "CS Student",
    "Web Developer",
    "Python Programmer",
    "Aspiring Full-Stack Dev",
  ],
  location: "Kubwa, Abuja — remote worldwide",
  email: "waziriabdullahi36@gmail.com",
  phone: "+234 708 786 3859",
  availability: "Open to internships & freelance roles",
  tagline:
    "Computer Science student turning ideas into working software — from Python scripts to React interfaces.",
  bio: [
    "I'm a 400-level Computer Science student at Abubakar Tafawa Balewa University with a passion for building things that actually work. I started with Python and SQL, then found my way into web development through HTML, CSS, and JavaScript.",
    "Currently, I'm completing my 9-month SIWES internship at Earlycode Institute, where I'm deepening my skills in React, Next.js, and modern frontend architecture. I learn fast, write clean code, and I'm always looking for the next challenge.",
  ],
  socials: [
    {
      label: "GitHub",
      href: "https://github.com/Ziriskee",
      handle: "@Ziriskee",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/abdullahi-waziri-1b52142b3",
      handle: "/in/abdullahi-waziri",
    },
    {
      label: "X / Twitter",
      href: "https://x.com/Ziriskee02",
      handle: "@Ziriskee02",
    },
  ],
  stats: [
    { value: 4, suffix: "+", label: "Projects built" },
    { value: 2, suffix: "+", label: "Years coding" },
    { value: 3, suffix: "+", label: "Certifications earned" },
    { value: 400, suffix: "L", label: "Level at ATBU" },
  ],
  skills: [
    {
      group: "Frontend",
      items: [
        "HTML5",
        "CSS3",
        "Tailwind CSS",
        "JavaScript",
        "TypeScript",
        "React",
      ],
    },
    {
      group: "Backend & Data",
      items: ["Python", "Django", "SQL", "PostgreSQL"],
    },
    {
      group: "Tools & Others",
      items: ["Git", "GitHub", "VS Code", "AI Prompting"],
    },
  ],
  marquee: [
    "Python",
    "Django",
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "PostgreSQL",
    "JavaScript",
  ],
  experience: [
    {
      company: "Earlycode Institute",
      role: "SIWES Intern",
      period: "2025 — Present",
      description:
        "9-month internship focused on modern web development. Learning React, Next.js, and full-stack patterns while building real-world projects under senior mentorship.",
    },
    {
      company: "Abubakar Tafawa Balewa University",
      role: "B.Tech. Computer Science",
      period: "2022 — Present",
      description:
        "Currently in 400-level. Coursework includes software engineering, database systems, algorithms, data structures, and web development.",
    },
    {
      company: "Self-Driven Learning",
      role: "Aspiring Developer",
      period: "2023 — Present",
      description:
        "Built personal projects using Python, Django, and React. Completed certifications on Sololearn and actively practice through hands-on coding challenges.",
    },
  ],
  services: [
    {
      title: "Web Development",
      description:
        "Frontend and backend development with React, Django, and modern tools. I build responsive, accessible interfaces that work on every device.",
      icon: "spark",
    },
    {
      title: "Python Automation",
      description:
        "Scripts and tools that solve real problems — from file processing and data handling to CLI utilities that make repetitive tasks faster.",
      icon: "bolt",
    },
    {
      title: "Database Design",
      description:
        "Structured data storage with SQL and PostgreSQL. I design relational schemas, write queries, and connect databases to web applications.",
      icon: "layers",
    },
  ],
} as const;

export type SiteConfig = typeof site;
