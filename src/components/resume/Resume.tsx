"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Resume() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Replace this with your actual Google Drive share link
  const resumeDriveLink =
    "https://drive.google.com/file/d/YOUR_FILE_ID/view?usp=sharing";

  return (
    <section
      ref={ref}
      id="resume"
      className="relative py-40 px-8 sm:px-16 md:px-24 lg:px-32 xl:px-48 noise-bg overflow-hidden"
    >
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          {/* Resume card */}
          <div
            className="inline-block bg-[#1a1a2e]/60 p-10 sm:p-14"
            style={{
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
              <h3 className="font-['Press_Start_2P'] text-sm text-[#ffc857] mb-4">
                {">"} Resume
              </h3>
              <p className="text-[#9a9aba] text-sm leading-relaxed mb-6 max-w-md mx-auto">
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
              transition={{ delay: 0.7 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="pixel-btn inline-flex items-center gap-3 text-[10px]"
              style={{
                background: "#ffc85715",
                color: "#ffc857",
                borderColor: "#ffc857",
                boxShadow: "4px 4px 0px #ffc85740",
              }}
            >
              <span>↗</span>
              <span>View Resume</span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
