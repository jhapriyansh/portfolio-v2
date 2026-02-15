# 🎮 Priyanshu's Developer Portfolio

An **8-bit retro-themed** developer portfolio built with Next.js, featuring CRT scanlines, pixel-art sprites, neon glow effects, and a fully dynamic admin panel backed by MongoDB.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb)

---

## ✨ Features

- **Pixel-art aesthetic** — `Press Start 2P` headings, `Space Mono` body, SVG pixel sprites, sketchy asymmetric borders
- **CRT effects** — scanline overlay, flicker animation, power-on boot sequence
- **Neon glow** — multi-layer text shadows in acid green, purple, pink, cyan, amber
- **Fully responsive** — `clamp()` based sizing, no hard breakpoints or `max-w-*` wrappers
- **Dynamic content** — Skills, Projects & Logbook sections fetch from MongoDB with graceful fallbacks
- **Admin panel** — Password-protected CRUD dashboard at `/admin`
- **Framer Motion** — entrance animations, hover effects, tab transitions
- **Seed script** — one-command database population

---

## 🗂️ Sections

| Section      | Description                                                                  |
| ------------ | ---------------------------------------------------------------------------- |
| **Hero**     | Typewriter intro with pixel sprite decorations and animated entrance         |
| **Skills**   | Categorized skill bars fetched from API (Languages, Frontend, Backend, etc.) |
| **Projects** | Project cards with tech tags, type badges, and code/live links               |
| **Logbook**  | Terminal-style dev log with expandable entries, tags, and timestamps         |
| **Resume**   | Download link with pixel sprite accents                                      |
| **Contact**  | Email copy-to-clipboard + social links (GitHub, LinkedIn)                    |

Sections are separated by themed pixel dividers (dashed, dots, arrow variants).

---

## 🛠️ Tech Stack

| Layer     | Technology                                 |
| --------- | ------------------------------------------ |
| Framework | Next.js 16 (App Router)                    |
| UI        | React 19, Tailwind CSS 4, Framer Motion 12 |
| Language  | TypeScript 5                               |
| Database  | MongoDB via Mongoose 9                     |
| Auth      | bcryptjs (password hashing)                |
| Fonts     | Press Start 2P + Space Mono                |

---

## 🚀 Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/jhapriyansh/portfolio-v2
cd portfolio-v2
npm install
```

### 2. Environment Variables

Create a `.env.local` file:

```
MONGODB_URI=your_mongodb_connection_string
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 4. Seed the Database (optional)

With the dev server running:

```bash
./init.sh                          # defaults to http://localhost:3000
./init.sh https://your-domain.com  # or pass a custom base URL
```

This populates **6 skill categories** (28 skills), **6 projects**, and **5 logbook entries**. Safe to re-run — duplicate skills are rejected via upsert.

> The default admin password used by `init.sh` is `password`. Change it after first login.

### 5. Build for Production

```bash
npm run build
npm start
```

---

## 🔐 Admin Panel

Navigate to `/admin` to access the dashboard. On first visit, you'll be prompted to create a password (stored as a bcrypt hash in MongoDB).

| Tab          | Capabilities                                                                                        |
| ------------ | --------------------------------------------------------------------------------------------------- |
| **Logbook**  | Create/delete log entries (title, content, tags, emoji)                                             |
| **Skills**   | Add skills to existing categories or create new ones; delete individual skills or entire categories |
| **Projects** | Full CRUD for projects (title, subtitle, type, description, tech, URLs, color, icon, order)         |
| **Settings** | Admin settings                                                                                      |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx              # Main page (all sections)
│   ├── layout.tsx            # Root layout, fonts, metadata
│   ├── globals.css           # Theme, CRT effects, pixel-btn, neon glow
│   ├── admin/page.tsx        # Admin dashboard
│   └── api/
│       ├── auth/route.ts     # Admin login/register
│       ├── skills/route.ts   # Skills CRUD (upsert support)
│       ├── projects/route.ts # Projects CRUD
│       └── logbook/route.ts  # Logbook CRUD
├── components/
│   ├── Nav.tsx
│   ├── hero/Hero.tsx
│   ├── skills/Skills.tsx
│   ├── projects/Projects.tsx, ProjectCard.tsx, projects.data.ts
│   ├── logbook/Logbook.tsx, logbook.data.ts
│   ├── resume/Resume.tsx
│   ├── contact/Contact.tsx
│   ├── sprites/PixelSprites.tsx
│   └── ui/Divider.tsx, Footer.tsx
├── lib/
│   ├── mongodb.ts            # Mongoose connection
│   ├── AdminUser.ts          # Admin model
│   ├── SkillCategory.ts      # Skills model
│   ├── Project.ts            # Project model
│   └── LogEntry.ts           # Log entry model
init.sh                       # Database seed script
```

---

## 🔮 Future Work

- Enable editing of existing projects from the admin panel.
- Enable editing of existing skills and skill categories.
- Improve admin UX with inline edits and confirmations.
- Fix mobile navigation issues (hamburger menu behavior, layout overflows, and viewport scrolling bugs).

---

## 📜 License

MIT
