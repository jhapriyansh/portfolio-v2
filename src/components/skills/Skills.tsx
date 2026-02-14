"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { PixelStar } from "../sprites/PixelSprites";

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
        className="flex items-center gap-3 px-4 py-2.5 transition-all duration-200 cursor-default"
        style={{
          background: hovered ? `${color}15` : "transparent",
          borderLeft: `3px solid ${hovered ? color : "transparent"}`,
        }}
      >
        <motion.span
          className="font-['Press_Start_2P'] text-[7px]"
          style={{ color }}
          animate={hovered ? { x: [0, 2, 0] } : {}}
          transition={{ duration: 0.2 }}
        >
          {hovered ? "▸" : "·"}
        </motion.span>
        <span
          className="font-mono text-sm transition-colors duration-200"
          style={{ color: hovered ? color : "#9a9aba" }}
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
      className="relative py-36 px-8 sm:px-16 md:px-24 lg:px-32 xl:px-48 noise-bg overflow-hidden"
    >
      <div className="relative z-10">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-6"
        >
          <h2 className="section-heading">Skills</h2>
          <p className="text-[#5a5a7a] font-['Press_Start_2P'] text-[8px] -mt-4">
            {"// "}skill_tree.unlocked()
          </p>
        </motion.div>

        {/* About blurb — NO border */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="text-[#9a9aba] text-sm leading-relaxed">
            I&apos;m a full stack developer who enjoys building things that are{" "}
            <span className="text-[#a6ff00]">fast</span>,{" "}
            <span className="text-[#c77dff]">functional</span>, and{" "}
            <span className="text-[#ffc857]">easy to use</span>. I dig into
            operating systems, internals, and low-level details while caring
            deeply about good UI and developer experience.
          </p>
        </motion.div>

        {/* Skill grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat, catIdx) => (
            <motion.div
              key={cat._id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + catIdx * 0.1, duration: 0.5 }}
              className="sketch-border bg-[#1a1a2e]/40 hover:bg-[#1a1a2e]/70 transition-all duration-300 group"
              style={{
                borderColor: `${cat.color}40`,
                borderRadius: `${8 + catIdx * 2}px ${4 + catIdx}px ${12 - catIdx}px ${6 + catIdx * 2}px`,
              }}
            >
              {/* Category header */}
              <div
                className="px-5 py-4 border-b flex items-center gap-3"
                style={{ borderColor: `${cat.color}20` }}
              >
                <span className="text-lg">{cat.icon}</span>
                <h3
                  className="font-['Press_Start_2P'] text-[9px] uppercase tracking-wider"
                  style={{ color: cat.color }}
                >
                  {cat.title}
                </h3>
                <span
                  className="ml-auto font-['Press_Start_2P'] text-[7px]"
                  style={{ color: `${cat.color}80` }}
                >
                  [{cat.skills.length}]
                </span>
              </div>

              {/* Skills list */}
              <div className="py-3">
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
