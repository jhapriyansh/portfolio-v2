#!/usr/bin/env bash
# ─────────────────────────────────────────────────
#  init.sh — Seed the portfolio database
#  Usage:  ./init.sh [BASE_URL]
#  Default BASE_URL: http://localhost:3000
# ─────────────────────────────────────────────────
set -euo pipefail

BASE="${1:-http://localhost:3000}"
PW="password"

green() { printf "\033[32m%s\033[0m\n" "$1"; }
red()   { printf "\033[31m%s\033[0m\n" "$1"; }
cyan()  { printf "\033[36m%s\033[0m\n" "$1"; }

post() {
  local endpoint="$1" payload="$2" label="$3"
  code=$(curl -s -o /dev/null -w "%{http_code}" \
    -X POST "${BASE}${endpoint}" \
    -H "Content-Type: application/json" \
    -d "$payload")
  if [[ "$code" =~ ^2 ]]; then
    green "  ✓ $label"
  else
    red  "  ✗ $label (HTTP $code)"
  fi
}

# ═══════════════════════════════════════════════
#  1. SKILLS  (upsert — one skill per call)
# ═══════════════════════════════════════════════
cyan "▸ Seeding Skills..."

add_skill() {
  local title="$1" icon="$2" color="$3" order="$4" skill="$5"
  post "/api/skills" \
    "{\"password\":\"$PW\",\"title\":\"$title\",\"icon\":\"$icon\",\"color\":\"$color\",\"order\":$order,\"skill\":\"$skill\"}" \
    "$title → $skill"
}

# Languages
add_skill "Languages" "⌨️" "#a6ff00" 0 "C"
add_skill "Languages" "⌨️" "#a6ff00" 0 "C++"
add_skill "Languages" "⌨️" "#a6ff00" 0 "JavaScript"
add_skill "Languages" "⌨️" "#a6ff00" 0 "TypeScript"
add_skill "Languages" "⌨️" "#a6ff00" 0 "Python"

# Frontend
add_skill "Frontend" "🖥️" "#c77dff" 1 "React"
add_skill "Frontend" "🖥️" "#c77dff" 1 "Next.js"
add_skill "Frontend" "🖥️" "#c77dff" 1 "Vite"
add_skill "Frontend" "🖥️" "#c77dff" 1 "Tailwind CSS"
add_skill "Frontend" "🖥️" "#c77dff" 1 "Redux Toolkit"

# Backend
add_skill "Backend" "⚙️" "#00f0ff" 2 "Node.js"
add_skill "Backend" "⚙️" "#00f0ff" 2 "Express.js"
add_skill "Backend" "⚙️" "#00f0ff" 2 "WebSockets"
add_skill "Backend" "⚙️" "#00f0ff" 2 "REST APIs"

# Database & Cloud
add_skill "Database & Cloud" "☁️" "#ffc857" 3 "MongoDB"
add_skill "Database & Cloud" "☁️" "#ffc857" 3 "MySQL"
add_skill "Database & Cloud" "☁️" "#ffc857" 3 "Supabase"
add_skill "Database & Cloud" "☁️" "#ffc857" 3 "Firebase"
add_skill "Database & Cloud" "☁️" "#ffc857" 3 "Cloudinary"

# Systems
add_skill "Systems" "🔧" "#ff6ec7" 4 "WebAssembly"
add_skill "Systems" "🔧" "#ff6ec7" 4 "Emscripten"
add_skill "Systems" "🔧" "#ff6ec7" 4 "PThreads"
add_skill "Systems" "🔧" "#ff6ec7" 4 "OS Internals"

# Tools & Ops
add_skill "Tools & Ops" "🛠️" "#a6ff00" 5 "Git"
add_skill "Tools & Ops" "🛠️" "#a6ff00" 5 "Docker"
add_skill "Tools & Ops" "🛠️" "#a6ff00" 5 "Postman"
add_skill "Tools & Ops" "🛠️" "#a6ff00" 5 "Nginx"
add_skill "Tools & Ops" "🛠️" "#a6ff00" 5 "Linux"
add_skill "Tools & Ops" "🛠️" "#a6ff00" 5 "Vercel"

# ═══════════════════════════════════════════════
#  2. PROJECTS
# ═══════════════════════════════════════════════
cyan "▸ Seeding Projects..."

post "/api/projects" '{
  "password":"'"$PW"'",
  "title":"S-Core",
  "subtitle":"Syllabus-Aware AI Study Companion",
  "type":"Full Stack",
  "description":"AI-powered study system enforcing strict syllabus boundaries using RAG, domain guards, and adaptive learning modes.",
  "tech":["React","Vite","FastAPI","ChromaDB","ONNX Runtime","Sentence Transformers","MongoDB","Groq LLaMA 3.3"],
  "codeUrl":"#",
  "color":"#a6ff00",
  "icon":"📚",
  "order":0
}' "S-Core"

post "/api/projects" '{
  "password":"'"$PW"'",
  "title":"RepoCraft",
  "subtitle":"AI Repository Analysis Platform",
  "type":"Full Stack",
  "description":"AI platform that analyzes GitHub repos to generate READMEs, resume bullets, and portfolio summaries.",
  "tech":["Next.js","FastAPI","GitHub OAuth","LLMs","Streaming Responses","MongoDB"],
  "codeUrl":"#",
  "liveUrl":"#",
  "color":"#c77dff",
  "icon":"🔮",
  "order":1
}' "RepoCraft"

post "/api/projects" '{
  "password":"'"$PW"'",
  "title":"SimuCore",
  "subtitle":"WebAssembly Orbital Visualizer",
  "type":"Frontend",
  "description":"High-performance orbital visualization engine using multithreaded WebAssembly compiled from C and rendered with React + Three.js.",
  "tech":["C","WebAssembly","Emscripten","PThreads","React","Three.js"],
  "codeUrl":"#",
  "liveUrl":"#",
  "color":"#00f0ff",
  "icon":"🪐",
  "order":2
}' "SimuCore"

post "/api/projects" '{
  "password":"'"$PW"'",
  "title":"Social Media Platform",
  "subtitle":"Full-Featured Social Network",
  "type":"Full Stack",
  "description":"Full-featured social media platform with authentication, posts, real-time chat, notifications, and media handling.",
  "tech":["React","Node.js","MongoDB","JWT","Socket.IO","Cloudinary"],
  "codeUrl":"#",
  "color":"#ff6ec7",
  "icon":"💬",
  "order":3
}' "Social Media Platform"

post "/api/projects" '{
  "password":"'"$PW"'",
  "title":"StockSphere",
  "subtitle":"Inventory Management System",
  "type":"Full Stack",
  "description":"Role-based inventory and billing system with product management, stock tracking, and invoice generation.",
  "tech":["React","Node.js","MongoDB","JWT","RBAC"],
  "codeUrl":"#",
  "color":"#ffc857",
  "icon":"📦",
  "order":4
}' "StockSphere"

post "/api/projects" '{
  "password":"'"$PW"'",
  "title":"Developer Portfolio",
  "subtitle":"This Very Site",
  "type":"Frontend",
  "description":"8-bit themed personal portfolio with pixel art animations, interactive console design, and retro gaming vibes.",
  "tech":["Next.js","Tailwind CSS","TypeScript","Framer Motion"],
  "codeUrl":"#",
  "liveUrl":"#",
  "color":"#a6ff00",
  "icon":"🎮",
  "order":5
}' "Developer Portfolio"

# ═══════════════════════════════════════════════
#  3. LOGBOOK
# ═══════════════════════════════════════════════
cyan "▸ Seeding Logbook..."

post "/api/logbook" '{
  "password":"'"$PW"'",
  "title":"Exploring Rust for WebAssembly",
  "content":"Been digging into Rust'\''s wasm-bindgen and comparing it with Emscripten for C. The tooling has gotten really good — might start a side project with it.",
  "tags":["Rust","WebAssembly","Systems"],
  "emoji":"🦀"
}' "Exploring Rust for WebAssembly"

post "/api/logbook" '{
  "password":"'"$PW"'",
  "title":"Built a custom VS Code theme",
  "content":"Made a retro console-inspired VS Code theme with acid green and purple accents. Might publish it soon.",
  "tags":["VS Code","Theming","Dev Tools"],
  "emoji":"🎨"
}' "Built a custom VS Code theme"

post "/api/logbook" '{
  "password":"'"$PW"'",
  "title":"Deep dive into Linux scheduler",
  "content":"Reading about CFS (Completely Fair Scheduler) in Linux kernel. Understanding how time slices are distributed is fascinating.",
  "tags":["Linux","OS Internals","Systems"],
  "emoji":"🐧"
}' "Deep dive into Linux scheduler"

post "/api/logbook" '{
  "password":"'"$PW"'",
  "title":"Next.js 16 Server Components",
  "content":"Refactoring some components to leverage React Server Components better. The mental model shift from client-heavy to server-first is interesting.",
  "tags":["Next.js","React","Frontend"],
  "emoji":"⚡"
}' "Next.js 16 Server Components"

post "/api/logbook" '{
  "password":"'"$PW"'",
  "title":"Contributing to open source",
  "content":"Submitted a PR to fix a performance issue in a popular React library. First time contributing to something with 10k+ stars!",
  "tags":["Open Source","React","Community"],
  "emoji":"🌟"
}' "Contributing to open source"

echo ""
green "═══ Seeding complete! ═══"
