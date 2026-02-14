"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import type { Project } from "./projects.data";

export default function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [hovered, setHovered] = useState(false);

  const borderRadii = [
    "10px 4px 12px 6px",
    "6px 10px 4px 12px",
    "12px 6px 10px 4px",
    "4px 12px 6px 10px",
    "8px 5px 11px 7px",
    "7px 11px 5px 8px",
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.12, duration: 0.5 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative"
    >
      <div
        className="relative bg-[#1a1a2e]/60 p-10 sm:p-12 transition-all duration-300 cursor-default"
        style={{
          border: `3px solid ${hovered ? project.color : "#2a2a4a"}`,
          borderRadius: borderRadii[index % borderRadii.length],
          boxShadow: hovered
            ? `6px 6px 0px ${project.color}40`
            : `4px 4px 0px #2a2a4a`,
          transform: hovered ? "translate(-2px, -2px)" : "translate(0, 0)",
        }}
      >
        {/* Type badge */}
        <div className="flex justify-end mb-5">
          <span
            className="font-['Press_Start_2P'] text-[7px] px-3 py-1.5 shrink-0"
            style={{
              background: `${project.color}15`,
              color: project.color,
              border: `1px solid ${project.color}30`,
              borderRadius: "3px",
            }}
          >
            {project.type}
          </span>
        </div>

        {/* Title & subtitle */}
        <div className="flex items-start gap-4 mb-6">
          <motion.span
            className="text-3xl shrink-0 mt-0.5"
            animate={hovered ? { rotate: [0, -10, 10, 0] } : {}}
            transition={{ duration: 0.4 }}
          >
            {project.icon}
          </motion.span>
          <div>
            <h3
              className="font-['Press_Start_2P'] text-xs sm:text-sm leading-relaxed mb-2"
              style={{ color: project.color }}
            >
              {project.title}
            </h3>
            <p className="text-[#5a5a7a] font-mono text-xs leading-relaxed">
              {project.subtitle}
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="text-[#9a9aba] text-sm sm:text-base leading-loose mb-8">
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2.5 mb-8">
          {project.tech.map((t) => (
            <span
              key={t}
              className="font-['Press_Start_2P'] text-[7px] px-3 py-1.5 transition-colors duration-200"
              style={{
                background: hovered
                  ? `${project.color}15`
                  : "rgba(42, 42, 74, 0.5)",
                color: hovered ? project.color : "#5a5a7a",
                border: `1px solid ${hovered ? `${project.color}40` : "#2a2a4a"}`,
                borderRadius: "3px",
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-4 pt-2">
          {project.codeUrl && (
            <a
              href={project.codeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-['Press_Start_2P'] text-[10px] px-7 py-4 transition-all duration-200 hover:translate-y-[-1px]"
              style={{
                background: `${project.color}10`,
                color: project.color,
                border: `2px solid ${project.color}50`,
                borderRadius: "4px 2px 6px 3px",
                boxShadow: `3px 3px 0px ${project.color}30`,
              }}
            >
              {"<Code />"}
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-['Press_Start_2P'] text-[10px] px-7 py-4 transition-all duration-200 hover:translate-y-[-1px]"
              style={{
                background: project.color,
                color: "#0d0d0d",
                border: `2px solid ${project.color}`,
                borderRadius: "4px 2px 6px 3px",
                boxShadow: `3px 3px 0px ${project.color}80`,
              }}
            >
              {"▸ Live"}
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
