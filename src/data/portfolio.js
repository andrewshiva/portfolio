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
    title: "AmdavadSafai — Ahmedabad Civic Cleanup",
    description: "Civic-tech platform for Ahmedabad's 27 wards: interactive MapLibre GIS with ward boundaries, trilingual GU/HI/EN (180+ keys), AMC CCRS 311 ticket bridge, Sunday Cleanup Drives RSVP + Karma gamification, and Before ↔ After slider verification.",
    tags: ["React 18", "Vite", "FastAPI", "MapLibre GL", "SQLAlchemy"],
    image: null,
    liveUrl: "https://amdavad-safai.vercel.app",
    githubUrl: "https://github.com/andrewshiva/AmdavadSafai",
    featured: true,
    color: "#00FFE0",
  },
  {
    id: 2,
    title: "NHAI Dashcam Analytics Service (DAS)",
    description: "GCP event-driven pipeline (Cloud Run + Pub/Sub + Workflows) processing dashcam video: YOLOv8 + OpenCV road-defect detection, GPS EXIF telemetry, PostGIS spatial DB, Leaflet dashboard and ReportLab PDF chainage reports. Supports 40-class NHAI TOR taxonomy.",
    tags: ["Python", "FastAPI", "YOLOv8", "GCP", "PostGIS", "Terraform"],
    image: null,
    liveUrl: "#",
    githubUrl: "https://github.com/andrewshiva/Dashcam",
    featured: true,
    color: "#f472b6",
  },
  {
    id: 3,
    title: "Incident Captain — Coral Hackathon",
    description: "AI SRE incident-response copilot using Coral as unified SQL layer over PagerDuty/GitHub/Datadog/Slack/Stripe. Cross-source joins, schema discovery, caching, and PII scrubbing before LLM brief. Proves Coral for multi-source reasoning.",
    tags: ["TypeScript", "Coral SQL", "AI SRE", "Node.js"],
    image: null,
    liveUrl: "#",
    githubUrl: "https://github.com/andrewshiva/Coral-hackathon-demo",
    featured: true,
    color: "#a78bfa",
  },
  {
    id: 4,
    title: "Luxury Watch — 3D Atelier",
    description: "High-fidelity 3D luxury watch showcase: Three.js + GSAP hero with floating Antigravity motion, 360° scroll-triggered rotation, studio glassmorphism lighting and physics-based hover. Built as premium e-commerce concept from luxury-watch-brand.",
    tags: ["Three.js", "GSAP", "React", "WebGL", "Vite"],
    image: null,
    liveUrl: "#",
    githubUrl: "https://github.com/andrewshiva/luxury-watch-brand",
    featured: false,
    color: "#fbbf24",
  },
  {
    id: 5,
    title: "3D Portfolio Experience",
    description: "Interactive WebGL portfolio with Three.js + GSAP ScrollTrigger, physics-based Antigravity effects and immersive typography — predecessor to current portfolio's motion system.",
    tags: ["Three.js", "GSAP", "R3F", "React"],
    image: null,
    liveUrl: "#",
    githubUrl: "https://github.com/andrewshiva/3D-Portfolio",
    featured: false,
    color: "#60a5fa",
  },
];

export const timeline = [
  {
    year: "2026 — Now",
    role: "Civic-Tech & AI Platform Builder",
    company: "AmdavadSafai · NHAI DAS",
    description: "Shipped AmdavadSafai (MapLibre + FastAPI, trilingual, AMC CCRS 311 bridge for Ahmedabad's 27 wards) and NHAI Dashcam Analytics Service on GCP (YOLOv8 + PostGIS, Cloud Run/Workflows, 40-class TOR taxonomy). Live on Vercel & GCP.",
    type: "current",
  },
  {
    year: "2026 — May",
    role: "AI SRE Hackathon — Incident Captain",
    company: "Coral Hackathon Demo",
    description: "Built AI SRE copilot treating PagerDuty/GitHub/Datadog/Slack/Stripe as Coral SQL tables — cross-source joins, schema discovery, PII scrubbing, and caching for incident briefs. TypeScript monorepo.",
    type: "work",
  },
  {
    year: "Ongoing",
    role: "Senior Software Developer",
    company: "Exploring AI Frontiers",
    description: "Exploring Claude AI, MCP servers, Web Design & 3D web. Emphasizing Vibe Coding to build with AI flow state.",
    type: "work",
  },
  {
    year: "2024 — 2026",
    role: "Full Stack Engineer · 3D Frontend",
    company: ".NET Architecture + 3D Atelier",
    description: "Crafted robust .NET REST APIs and premium 3D watch ateliers (Three.js + GSAP, luxury-watch-brand) — blending backend architecture with WebGL product showcases.",
    type: "work",
  },
  {
    year: "Previous",
    role: "Frontend Specialist",
    company: "React & Next.js Ecosystem",
    description: "Building responsive, highly interactive frontends with Next.js 14+, React, luxury-watch storefronts, and 3D Portfolio experiments (Three.js + GSAP).",
    type: "work",
  },
  {
    year: "Early Journey",
    role: "Web Developer",
    company: "HTML/JS/CSS Foundations",
    description: "Started by mastering the core trinity of the web: HTML5, CSS3, and JavaScript, bringing static designs to life.",
    type: "work",
  },
];

export const aboutText = {
  intro: "👋 Hey, I'm Shiva — Senior Full Stack Developer. 4.6 years building civic-tech, AI and 3D web.",
  story: [
    "Recently shipped AmdavadSafai (civic cleanup map for Ahmedabad's 27 wards) and NHAI Dashcam Analytics (GCP + YOLOv8 + PostGIS). Previously .NET + React + FastAPI, now AI + 3D.",
    "I turn complex systems into fast, human interfaces — maps, pipelines, and motion that feel alive.",
  ],
  stats: [
    { label: "Years Experience", value: "4.6" },
    { label: "Core Stack", value: ".NET + React" },
    { label: "Shipped 2026", value: "2 platforms" },
    { label: "Focus", value: "Civic + AI + 3D" },
  ],
};
