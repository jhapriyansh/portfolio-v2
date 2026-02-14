// Fallback data when MongoDB is not connected
export interface LogEntryData {
  _id: string;
  title: string;
  content: string;
  tags: string[];
  emoji: string;
  createdAt: string;
}

export const fallbackLogEntries: LogEntryData[] = [
  {
    _id: "1",
    title: "Exploring Rust for WebAssembly",
    content:
      "Been digging into Rust's wasm-bindgen and comparing it with Emscripten for C. The tooling has gotten really good — might start a side project with it.",
    tags: ["Rust", "WebAssembly", "Systems"],
    emoji: "🦀",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: "2",
    title: "Built a custom VS Code theme",
    content:
      "Made a retro console-inspired VS Code theme with acid green and purple accents. Might publish it soon.",
    tags: ["VS Code", "Theming", "Dev Tools"],
    emoji: "🎨",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: "3",
    title: "Deep dive into Linux scheduler",
    content:
      "Reading about CFS (Completely Fair Scheduler) in Linux kernel. Understanding how time slices are distributed is fascinating.",
    tags: ["Linux", "OS Internals", "Systems"],
    emoji: "🐧",
    createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: "4",
    title: "Next.js 16 Server Components",
    content:
      "Refactoring some components to leverage React Server Components better. The mental model shift from client-heavy to server-first is interesting.",
    tags: ["Next.js", "React", "Frontend"],
    emoji: "⚡",
    createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: "5",
    title: "Contributing to open source",
    content:
      "Submitted a PR to fix a performance issue in a popular React library. First time contributing to something with 10k+ stars!",
    tags: ["Open Source", "React", "Community"],
    emoji: "🌟",
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
  },
];
