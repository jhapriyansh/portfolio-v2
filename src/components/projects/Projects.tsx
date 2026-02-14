"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { projects as fallbackProjects } from "./projects.data";
import type { Project } from "./projects.data";
import ProjectCard from "./ProjectCard";

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
      className="relative py-40 px-8 sm:px-16 md:px-24 lg:px-32 xl:px-48 pixel-grid noise-bg overflow-hidden"
    >
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="section-heading">Projects</h2>
          <p className="text-[#5a5a7a] font-['Press_Start_2P'] text-[8px] -mt-8">
            {"// "}quest_log.completed()
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {projectList.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
