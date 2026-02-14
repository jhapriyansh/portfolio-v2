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
    const dotCount = 40;
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center py-8 px-8 sm:px-16 md:px-24 lg:px-32 xl:px-48"
      >
        {[...Array(dotCount)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ delay: i * 0.02, type: "spring" }}
            className="w-1.5 h-1.5 shrink-0"
            style={{
              backgroundColor: color,
              opacity: 0.4,
              borderRadius: "1px",
            }}
          />
        ))}
      </motion.div>
    );
  }

  if (variant === "arrow") {
    const arrowCount = 15;
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center py-6 px-8 sm:px-16 md:px-24 lg:px-32 xl:px-48"
      >
        {[...Array(arrowCount)].map((_, i) => (
          <motion.span
            key={i}
            className="font-['Press_Start_2P'] text-[10px]"
            style={{ color, opacity: 0.3 }}
            animate={{ y: [0, 4, 0] }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              delay: i * 0.1,
            }}
          >
            ▼
          </motion.span>
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
      className="w-full px-8 sm:px-16 md:px-24 lg:px-32 xl:px-48"
    >
      <div
        className="h-[3px] w-full"
        style={{
          background: `repeating-linear-gradient(90deg, ${color} 0px, ${color} 8px, transparent 8px, transparent 16px)`,
          opacity: 0.25,
        }}
      />
    </motion.div>
  );
}
