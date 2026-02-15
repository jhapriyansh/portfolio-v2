"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Divider({
  color = "#a6ff00",
  variant = "dashed",
}: {
  color?: string;
  variant?: "dashed" | "dots" | "arrow";
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });

  if (variant === "dots") {
    const dotCount = 90;
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5 }}
        className="w-full flex justify-between items-center"
        style={{
          padding: "clamp(0.5rem, 1.5vh, 1.5rem) clamp(0.5rem, 1vw, 1rem)",
        }}
      >
        {[...Array(dotCount)].map((_, i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 shrink-0"
            style={{
              backgroundColor: color,
              opacity: isInView ? 0.4 : 0,
              borderRadius: "1px",
              transform: isInView ? "scale(1)" : "scale(0)",
              transition: `transform 0.4s cubic-bezier(.2,.6,.35,1.2) ${i * 0.02}s, opacity 0.3s ease ${i * 0.02}s`,
            }}
          />
        ))}
      </motion.div>
    );
  }

  if (variant === "arrow") {
    const arrowCount = 34;
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5 }}
        className="w-full flex justify-between items-center"
        style={{ padding: "clamp(0.4rem, 1vh, 1rem) clamp(0.5rem, 1vw, 1rem)" }}
      >
        {[...Array(arrowCount)].map((_, i) => (
          <span
            key={i}
            className="font-['Press_Start_2P'] text-[10px] inline-block"
            style={{
              color,
              opacity: 0.3,
              animation: "divider-arrow-bob 1.5s ease-in-out infinite",
              animationDelay: `${i * 0.1}s`,
            }}
          >
            ▼
          </span>
        ))}
      </motion.div>
    );
  }

  // Default dashed
  return (
    <motion.div
      ref={ref}
      initial={{ scaleX: 0 }}
      animate={isInView ? { scaleX: 1 } : {}}
      transition={{ duration: 0.8 }}
      className="w-full"
    >
      <div
        className="h-0.75 w-full"
        style={{
          background: `repeating-linear-gradient(90deg, ${color} 0px, ${color} 8px, transparent 8px, transparent 16px)`,
          opacity: 0.25,
        }}
      />
    </motion.div>
  );
}
