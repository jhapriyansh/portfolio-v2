"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { projects as fallbackProjects } from "./projects.data";
import type { Project } from "./projects.data";
import ProjectCard from "./ProjectCard";
import { PixelStar, PixelGhost } from "../sprites/PixelSprites";

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [projectList, setProjectList] = useState<Project[]>(fallbackProjects);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch("/api/projects");
        if (res.ok) {
          const data = await res.json();
          if (data.length > 0) setProjectList(data);
        }
      } catch {
        // use fallback
      }
    }
    fetchProjects();
  }, []);

  return (
    <section
      ref={ref}
      id="projects"
      className="relative min-h-screen flex flex-col justify-center pixel-grid noise-bg overflow-hidden"
      style={{ padding: "clamp(4rem, 8vh, 8rem) clamp(1.5rem, 6vw, 10rem)" }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <PixelStar
          className="absolute top-16 right-[7%] w-4 h-4 opacity-30"
          color="#00f0ff"
        />
        <PixelGhost
          className="absolute bottom-16 left-[8%] w-6 h-6 opacity-20"
          color="#ffc857"
        />
      </div>

      <div className="relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center pt-4"
          style={{ marginBottom: "clamp(1rem, 3vh, 3rem)" }}
        >
          <h2
            className="section-heading"
            style={{ marginBottom: "clamp(0.5rem, 1vh, 1rem)" }}
          >
            Projects
          </h2>
          <p className="text-[#5a5a7a] font-['Press_Start_2P'] text-[8px]">
            {"// "}quest_log.completed()
          </p>
        </motion.div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 items-stretch"
          style={{ gap: "clamp(1.5rem, 3vw, 3rem)" }}
        >
          {projectList.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
