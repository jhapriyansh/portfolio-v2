"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  PixelStar,
  PixelTerminal,
  PixelDeveloper,
} from "../sprites/PixelSprites";

export default function Resume() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const resumeDriveLink =
    "https://drive.google.com/file/d/1JeVfrKL_VtLY9O87wyi5j-WvdF8wIiIy/view";

  return (
    <section
      ref={ref}
      id="resume"
      className="relative min-h-screen flex flex-col justify-center pixel-grid noise-bg overflow-hidden"
      style={{ padding: "clamp(4rem, 8vh, 8rem) clamp(1.5rem, 6vw, 10rem)" }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <PixelStar
          className="absolute top-14 left-[8%] w-4 h-4 opacity-30"
          color="#ffc857"
        />
        <PixelTerminal className="absolute bottom-10 right-[6%] w-28 h-auto opacity-15" />
        <PixelDeveloper className="absolute top-[28%] right-[8%] w-10 h-10 opacity-20" />
      </div>

      <div className="relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2
            className="section-heading"
            style={{ marginBottom: "clamp(0.5rem, 1vh, 1rem)" }}
          >
            Resume
          </h2>
          <p
            className="text-[#5a5a7a] font-['Press_Start_2P'] text-[8px]"
            style={{ marginBottom: "clamp(1.5rem, 3vh, 3rem)" }}
          >
            {"// "}profile.downloadable()
          </p>

          {/* Resume card */}
          <div
            className="w-full bg-[#1a1a2e]/60"
            style={{
              padding: "clamp(2.5rem, 5vw, 5rem)",
              border: "3px solid #ffc85740",
              borderRadius: "10px 4px 12px 6px",
              boxShadow: "5px 5px 0px #ffc85720",
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
            >
              <h3
                className="font-['Press_Start_2P'] text-[#ffc857] mb-4"
                style={{ fontSize: "clamp(0.75rem, 1.2vw, 1.1rem)" }}
              >
                {">"} Resume
              </h3>
              <p
                className="text-[#9a9aba] leading-relaxed mb-6"
                style={{ fontSize: "clamp(0.875rem, 1.1vw, 1.1rem)" }}
              >
                Want the full story? View or download my resume for a detailed
                overview of my experience, projects, and skills.
              </p>
            </motion.div>

            {/* Pixel-art resume preview */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5 }}
              className="mb-6 flex justify-center"
            >
              <svg
                viewBox="0 0 40 52"
                className="w-20 h-auto"
                style={{ imageRendering: "pixelated" }}
              >
                <rect x="2" y="2" width="36" height="48" fill="#e8e8e8" />
                <rect
                  x="2"
                  y="2"
                  width="36"
                  height="48"
                  fill="none"
                  stroke="#9a9aba"
                  strokeWidth="1"
                />
                <polygon points="28,2 38,12 28,12" fill="#9a9aba" />
                <rect x="5" y="6" width="8" height="8" fill="#c77dff" />
                <rect x="15" y="7" width="18" height="2" fill="#2a2a4a" />
                <rect x="15" y="11" width="12" height="1.5" fill="#a6ff00" />
                <rect x="5" y="18" width="28" height="1.5" fill="#2a2a4a" />
                <rect x="5" y="22" width="30" height="1" fill="#9a9aba" />
                <rect x="5" y="25" width="24" height="1" fill="#9a9aba" />
                <rect x="5" y="28" width="28" height="1" fill="#9a9aba" />
                <rect x="5" y="33" width="20" height="1.5" fill="#2a2a4a" />
                <rect x="5" y="37" width="30" height="1" fill="#9a9aba" />
                <rect x="5" y="40" width="26" height="1" fill="#9a9aba" />
                <rect x="5" y="43" width="28" height="1" fill="#9a9aba" />
                <rect x="5" y="46" width="16" height="1" fill="#9a9aba" />
              </svg>
            </motion.div>

            <motion.a
              href={resumeDriveLink}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.15 }}
              whileHover={{
                scale: 1.04,
                y: -3,
                x: -2,
                boxShadow: "6px 6px 0px #ffc85750",
                background: "#ffc857",
                color: "#0d0d0d",
                borderColor: "#ffc857",
                transition: { duration: 0.15, delay: 0 },
              }}
              whileTap={{
                scale: 0.97,
                y: 2,
                x: 2,
                boxShadow: "0px 0px 0px #ffc85730",
                transition: { duration: 0.1, delay: 0 },
              }}
              className="font-['Press_Start_2P'] cursor-pointer inline-flex items-center gap-4"
              style={{
                marginTop: "clamp(1.5rem, 3vh, 3rem)",
                fontSize: "clamp(11px, 1.2vw, 14px)",
                padding: "clamp(1rem, 2vh, 1.4rem) clamp(2rem, 4vw, 3rem)",
                background: "#ffc85715",
                color: "#ffc857",
                border: "2px solid #ffc857",
                borderRadius: "4px 2px 6px 3px",
                boxShadow: "4px 4px 0px #ffc85740",
              }}
            >
              <motion.span
                animate={{ x: [0, 3, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: "easeInOut",
                }}
              >
                ↗
              </motion.span>
              <span>View Resume</span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
