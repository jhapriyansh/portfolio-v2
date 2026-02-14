"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="border-t border-[#2a2a4a]/60 bg-[#0d0d0d]">
      <div className="px-8 sm:px-16 md:px-24 lg:px-32 xl:px-48 py-10 flex flex-col items-center gap-3">
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
