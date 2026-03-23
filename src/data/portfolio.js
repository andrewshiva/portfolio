export const siteConfig = {
  name: "Shiva Singh Tomar",
  title: "Senior Full Stack Developer",
  tagline: "Senior Software Developer | Vibe Coder | AI Explorer",
  email: "Singhtomar456@gmail.com",
  location: "Earth",
  resumeUrl: "#",
  socials: {
    github: "https://github.com/andrewshiva",
    linkedin: "https://www.linkedin.com/in/shiva-singh-tomar-253190173/",
    twitter: "https://x.com", // Add your X URL here if you have one
  },
};

export const navLinks = [
  { id: "home", label: "Home", icon: "Terminal" },
  { id: "about", label: "About", icon: "User" },
  { id: "skills", label: "Skills", icon: "Cpu" },
  { id: "projects", label: "Projects", icon: "FolderOpen" },
  { id: "experience", label: "Journey", icon: "Route" },
  { id: "contact", label: "Contact", icon: "Send" },
];

export const skills = [
  { category: "Frontend & Design", items: [
    { name: "Next.js 14+ / React", level: 95 },
    { name: "HTML5 / CSS3 / JS", level: 90 },
    { name: "Figma / Web Design", level: 85 },
    { name: "GSAP + 3D (Three.js)", level: 80 },
    { name: "Antigravity FX", level: 85 },
  ]},
  { category: "Backend & DB", items: [
    { name: "C# / .NET", level: 95 },
    { name: "PostgreSQL", level: 88 },
    { name: "MySQL", level: 85 },
    { name: "REST APIs", level: 90 },
    { name: "Microservices", level: 82 },
  ]},
  { category: "AI & Emerging", items: [
    { name: "Claude AI", level: 90 },
    { name: "MCP Servers", level: 85 },
    { name: "Prompting / Workflows", level: 88 },
    { name: "Vibe Coding", level: 95 },
    { name: "AI Tool Integrations", level: 80 },
  ]},
  { category: "Tools & DevOps", items: [
    { name: "Git / GitHub Actions", level: 85 },
    { name: "VS Code / Cursor IDE", level: 92 },
    { name: "CI / CD", level: 80 },
    { name: "Server Configuration", level: 78 },
    { name: "Agile workflows", level: 85 },
  ]},
];

export const projects = [
  {
    id: 1,
    title: "Full Stack SaaS App",
    description: "Enterprise-grade Full Stack application featuring server-side rendering, robust authentication, and dynamic database querying.",
    tags: ["Next.js 14", ".NET", "PostgreSQL"],
    image: null,
    liveUrl: "#",
    githubUrl: "https://github.com/andrewshiva",
    featured: true,
    color: "#00FFE0",
  },
  {
    id: 2,
    title: "MCP Tool Integration",
    description: "Developing custom Model Context Protocol (MCP) servers to seamlessly integrate Claude AI with external APIs and internal developer tools.",
    tags: ["Claude AI", "MCP Servers", "Node.js", "AI Workflows"],
    image: null,
    liveUrl: "#",
    githubUrl: "https://github.com/andrewshiva",
    featured: true,
    color: "#a78bfa",
  },
  {
    id: 3,
    title: "3D Portfolio",
    description: "Interactive 3D web experience showcasing projects and skills through fluid motion, physics-based effects, and immersive typography.",
    tags: ["Three.js", "GSAP", "R3F", "React"],
    image: null,
    liveUrl: "#",
    githubUrl: "https://github.com/andrewshiva",
    featured: true,
    color: "#f472b6",
  },
  {
    id: 4,
    title: "Antigravity UI Effects",
    description: "A sandbox of physics-based floating effects, custom animations, and GSAP ScrollTrigger experiences pushing the boundaries of WebGL.",
    tags: ["Physics Animations", "CSS", "JS", "WebGL"],
    image: null,
    liveUrl: "#",
    githubUrl: "https://github.com/andrewshiva",
    featured: false,
    color: "#fbbf24",
  },
  {
    id: 5,
    title: "Web Design System",
    description: "Comprehensive design system built in Figma and translated into a highly reusable set of Tailwind CSS utility classes and React components.",
    tags: ["Figma", "Tailwind CSS", "Design Tokens"],
    image: null,
    liveUrl: "#",
    githubUrl: "https://github.com/andrewshiva",
    featured: false,
    color: "#34d399",
  },
];

export const timeline = [
  {
    year: "Latest",
    role: "Senior Software Developer",
    company: "Exploring AI Frontiers",
    description: "Currently exploring the frontier of Claude AI, MCP servers, Web Design & 3D web. Emphasizing Vibe Coding to build with AI flow state.",
    type: "current",
  },
  {
    year: "Ongoing",
    role: "Full Stack Engineer",
    company: ".NET Architecture",
    description: "Crafting robust Full Stack .NET applications with complex business logic, Entity Framework, and RESTful architectures.",
    type: "work",
  },
  {
    year: "Previous",
    role: "Frontend Specialist",
    company: "React & Next.js Ecosystem",
    description: "Building responsive, highly interactive frontend applications utilizing Next.js 14+, React, and modern CSS layout engines.",
    type: "work",
  },
  {
    year: "Early Journey",
    role: "Web Developer",
    company: "HTML/JS/CSS Foundations",
    description: "Started the journey by mastering the core trinity of the web: HTML5, CSS3, and JavaScript, bringing static designs to life.",
    type: "work",
  },
];

export const aboutText = {
  intro: "👋 Hey, I'm Shiva. A Senior Software Developer with 4.6 years of experience crafting Full Stack .NET applications.",
  story: [
    "I'm currently exploring the frontier of Claude AI, MCP servers, Web Design & 3D web. I am passionate about turning ideas into animated, interactive experiences.",
    "The best code isn't just functional — it's alive. It moves, it breathes, it tells a story.",
    "Whether I'm deep into 'Vibe Coding' with AI flow state or orchestrating complex physics-based Antigravity animations with GSAP and Three.js, my goal is always to push the boundaries of modern web development.",
    "Fun Fact: I'm a self-proclaimed Vampire 😈 — I code best at night.",
  ],
  stats: [
    { label: "Years Experience", value: "4.6" },
    { label: "Core Stack", value: ".NET + React" },
    { label: "Coding Vibe", value: "Vampire 🧛" },
    { label: "Focus", value: "AI + 3D Web" },
  ],
};
