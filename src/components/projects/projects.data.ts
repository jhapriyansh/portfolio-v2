export interface Project {
  title: string;
  subtitle: string;
  type: "Full Stack" | "Frontend" | "Backend";
  description: string;
  tech: string[];
  codeUrl?: string;
  liveUrl?: string;
  color: string;
  icon: string;
}

export const projects: Project[] = [
  {
    title: "S-Core",
    subtitle: "Syllabus-Aware AI Study Companion",
    type: "Full Stack",
    description:
      "AI-powered study system enforcing strict syllabus boundaries using RAG, domain guards, and adaptive learning modes.",
    tech: [
      "React",
      "Vite",
      "FastAPI",
      "ChromaDB",
      "ONNX Runtime",
      "Sentence Transformers",
      "MongoDB",
      "Groq LLaMA 3.3",
    ],
    codeUrl: "#",
    color: "#a6ff00",
    icon: "📚",
  },
  {
    title: "RepoCraft",
    subtitle: "AI Repository Analysis Platform",
    type: "Full Stack",
    description:
      "AI platform that analyzes GitHub repos to generate READMEs, resume bullets, and portfolio summaries.",
    tech: [
      "Next.js",
      "FastAPI",
      "GitHub OAuth",
      "LLMs",
      "Streaming Responses",
      "MongoDB",
    ],
    codeUrl: "#",
    liveUrl: "#",
    color: "#c77dff",
    icon: "🔮",
  },
  {
    title: "SimuCore",
    subtitle: "WebAssembly Orbital Visualizer",
    type: "Frontend",
    description:
      "High-performance orbital visualization engine using multithreaded WebAssembly compiled from C and rendered with React + Three.js.",
    tech: ["C", "WebAssembly", "Emscripten", "PThreads", "React", "Three.js"],
    codeUrl: "#",
    liveUrl: "#",
    color: "#00f0ff",
    icon: "🪐",
  },
  {
    title: "Social Media Platform",
    subtitle: "Full-Featured Social Network",
    type: "Full Stack",
    description:
      "Full-featured social media platform with authentication, posts, real-time chat, notifications, and media handling.",
    tech: ["React", "Node.js", "MongoDB", "JWT", "Socket.IO", "Cloudinary"],
    codeUrl: "#",
    color: "#ff6ec7",
    icon: "💬",
  },
  {
    title: "StockSphere",
    subtitle: "Inventory Management System",
    type: "Full Stack",
    description:
      "Role-based inventory and billing system with product management, stock tracking, and invoice generation.",
    tech: ["React", "Node.js", "MongoDB", "JWT", "RBAC"],
    codeUrl: "#",
    color: "#ffc857",
    icon: "📦",
  },
  {
    title: "Developer Portfolio",
    subtitle: "This Very Site",
    type: "Frontend",
    description:
      "8-bit themed personal portfolio with pixel art animations, interactive console design, and retro gaming vibes.",
    tech: ["Next.js", "Tailwind CSS", "TypeScript", "Framer Motion"],
    codeUrl: "#",
    liveUrl: "#",
    color: "#a6ff00",
    icon: "🎮",
  },
];
