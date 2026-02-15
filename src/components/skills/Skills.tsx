"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { PixelStar, PixelGhost, PixelCoffee } from "../sprites/PixelSprites";

interface SkillCategoryData {
  _id: string;
  title: string;
  icon: string;
  color: string;
  skills: string[];
  order: number;
}

const fallbackSkillCategories: SkillCategoryData[] = [
  {
    _id: "1",
    title: "Languages",
    icon: "⌨️",
    color: "#a6ff00",
    skills: ["C", "C++", "JavaScript", "TypeScript", "Python"],
    order: 0,
  },
  {
    _id: "2",
    title: "Frontend",
    icon: "🖥️",
    color: "#c77dff",
    skills: ["React", "Next.js", "Vite", "Tailwind CSS", "Redux Toolkit"],
    order: 1,
  },
  {
    _id: "3",
    title: "Backend",
    icon: "⚙️",
    color: "#00f0ff",
    skills: ["Node.js", "Express.js", "WebSockets", "REST APIs"],
    order: 2,
  },
  {
    _id: "4",
    title: "Database & Cloud",
    icon: "☁️",
    color: "#ffc857",
    skills: ["MongoDB", "MySQL", "Supabase", "Firebase", "Cloudinary"],
    order: 3,
  },
  {
    _id: "5",
    title: "Systems",
    icon: "🔧",
    color: "#ff6ec7",
    skills: ["WebAssembly", "Emscripten", "PThreads", "OS Internals"],
    order: 4,
  },
  {
    _id: "6",
    title: "Tools & Ops",
    icon: "🛠️",
    color: "#a6ff00",
    skills: ["Git", "Docker", "Postman", "Nginx", "Linux", "Vercel"],
    order: 5,
  },
];

function SkillBar({
  name,
  color,
  delay,
}: {
  name: string;
  color: string;
  delay: number;
}) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay, duration: 0.3 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative"
    >
      <div
        className="flex items-center gap-3 transition-all duration-200 cursor-default"
        style={{
          padding: "clamp(0.6rem, 1.2vh, 1rem) clamp(1rem, 2vw, 2rem)",
          background: hovered ? `${color}15` : "transparent",
          borderLeft: `3px solid ${hovered ? color : "transparent"}`,
        }}
      >
        <motion.span
          className="font-['Press_Start_2P']"
          style={{ fontSize: "clamp(7px, 0.7vw, 10px)", color }}
          animate={hovered ? { x: [0, 2, 0] } : {}}
          transition={{ duration: 0.2 }}
        >
          {hovered ? "▸" : "·"}
        </motion.span>
        <span
          className="font-mono transition-colors duration-200"
          style={{
            fontSize: "clamp(14px, 1.2vw, 18px)",
            color: hovered ? color : "#9a9aba",
          }}
        >
          {name}
        </span>
        {hovered && (
          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="ml-auto"
          >
            <PixelStar className="w-3 h-3" color={color} />
          </motion.span>
        )}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [categories, setCategories] = useState<SkillCategoryData[]>(
    fallbackSkillCategories,
  );

  useEffect(() => {
    async function fetchSkills() {
      try {
        const res = await fetch("/api/skills");
        if (res.ok) {
          const data = await res.json();
          if (data.length > 0) setCategories(data);
        }
      } catch {
        // use fallback
      }
    }
    fetchSkills();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative min-h-screen flex flex-col justify-center pixel-grid noise-bg overflow-hidden"
      style={{ padding: "clamp(4rem, 8vh, 8rem) clamp(1.5rem, 6vw, 10rem)" }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <PixelGhost
          className="absolute top-16 left-[6%] w-7 h-7 opacity-20"
          color="#c77dff"
        />
        <PixelStar
          className="absolute top-[24%] right-[8%] w-4 h-4 opacity-30"
          color="#a6ff00"
        />
        <PixelCoffee className="absolute bottom-16 left-[10%] w-6 h-6 opacity-20" />
      </div>

      <div className="relative z-10 w-full">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center pt-4"
          style={{ marginBottom: "clamp(0.5rem, 1.5vh, 1.5rem)" }}
        >
          <h2
            className="section-heading"
            style={{ marginBottom: "clamp(0.5rem, 1vh, 1rem)" }}
          >
            Skills
          </h2>
          <p className="text-[#5a5a7a] font-['Press_Start_2P'] text-[8px]">
            {"// "}skill_tree.unlocked()
          </p>
        </motion.div>

        {/* About blurb — NO border */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center"
          style={{ marginBottom: "clamp(2rem, 4vh, 4rem)" }}
        >
          <p
            className="text-[#9a9aba] leading-relaxed"
            style={{ fontSize: "clamp(0.875rem, 1.1vw, 1.1rem)" }}
          >
            I&apos;m a full stack developer who enjoys building things that are{" "}
            <span className="text-[#a6ff00]">fast</span>,{" "}
            <span className="text-[#c77dff]">functional</span>, and{" "}
            <span className="text-[#ffc857]">easy to use</span>. I dig into
            operating systems, internals, and low-level details while caring
            deeply about good UI and developer experience.
          </p>
        </motion.div>

        {/* Skill grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-stretch"
          style={{ gap: "clamp(1.5rem, 3vw, 3rem)" }}
        >
          {categories.map((cat, catIdx) => (
            <motion.div
              key={cat._id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + catIdx * 0.1, duration: 0.5 }}
              className="sketch-border bg-[#1a1a2e]/40 hover:bg-[#1a1a2e]/70 transition-all duration-300 group"
              style={{
                minHeight: "clamp(18rem, 30vh, 24rem)",
                borderColor: `${cat.color}40`,
                borderRadius: `${8 + catIdx * 2}px ${4 + catIdx}px ${12 - catIdx}px ${6 + catIdx * 2}px`,
              }}
            >
              {/* Category header */}
              <div
                className="border-b flex items-center gap-3"
                style={{
                  padding: "clamp(1rem, 1.8vh, 1.5rem) clamp(1rem, 2vw, 2rem)",
                  borderColor: `${cat.color}20`,
                }}
              >
                <span style={{ fontSize: "clamp(1.2rem, 2vw, 2rem)" }}>
                  {cat.icon}
                </span>
                <h3
                  className="font-['Press_Start_2P'] uppercase tracking-wider"
                  style={{
                    fontSize: "clamp(9px, 0.9vw, 13px)",
                    color: cat.color,
                  }}
                >
                  {cat.title}
                </h3>
                <span
                  className="ml-auto font-['Press_Start_2P'] text-[8px]"
                  style={{ color: `${cat.color}80` }}
                >
                  [{cat.skills.length}]
                </span>
              </div>

              {/* Skills list */}
              <div style={{ padding: "clamp(0.5rem, 1vh, 1rem) 0" }}>
                {cat.skills.map((skill, skillIdx) => (
                  <SkillBar
                    key={skill}
                    name={skill}
                    color={cat.color}
                    delay={0.4 + catIdx * 0.1 + skillIdx * 0.05}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
