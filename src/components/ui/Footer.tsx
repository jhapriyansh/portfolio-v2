"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="bg-[#0d0d0d]">
      <div
        className="w-full flex flex-col items-center gap-3"
        style={{ padding: "clamp(2rem, 4vh, 4rem) clamp(1.5rem, 6vw, 8rem)" }}
      >
        <div className="flex items-center gap-2">
          <motion.div
            className="w-1.5 h-1.5 bg-[#a6ff00] rounded-full"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ repeat: Infinity, duration: 2.5 }}
          />
          <span className="font-['Press_Start_2P'] text-[7px] text-[#5a5a7a]">
            © 2026 Priyanshu Kumar Jha · built with Next.js
          </span>
        </div>
      </div>
    </footer>
  );
}
