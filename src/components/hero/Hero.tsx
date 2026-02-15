"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  PixelDeveloper,
  PixelGhost,
  PixelStar,
  PixelCoffee,
  PixelTerminal,
  PixelArrowDown,
  PixelGamepad,
} from "../sprites/PixelSprites";

function useTypewriter(text: string, speed = 50, delay = 1200) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1));
        i++;
        if (i >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, speed, delay]);

  return { displayed, done };
}

export default function Hero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const { displayed: subtitle, done: subtitleDone } = useTypewriter(
    "full_stack_developer // systems_enthusiast",
    40,
    1500,
  );

  const tags = [
    { text: "MERN stack", color: "tag-pill" },
    { text: "C / C++ & systems", color: "tag-pill-purple" },
    { text: "WebAssembly", color: "tag-pill-pink" },
    { text: "Performance", color: "tag-pill-amber" },
  ];

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen flex items-center justify-center pixel-grid noise-bg scanlines overflow-hidden"
    >
      {/* Floating pixel decorations — dense scatter */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Left column */}
        <PixelGhost
          className="absolute top-16 left-[5%] w-8 h-8 opacity-30"
          color="#c77dff"
        />
        <PixelStar
          className="absolute top-[30%] left-[3%] w-4 h-4 opacity-35"
          color="#a6ff00"
        />
        <PixelCoffee className="absolute top-[50%] left-[8%] w-7 h-7 opacity-25" />
        <PixelGhost
          className="absolute bottom-40 left-[12%] w-6 h-6 opacity-20"
          color="#00f0ff"
        />
        <PixelStar
          className="absolute bottom-20 left-[6%] w-5 h-5 opacity-30"
          color="#ffc857"
        />

        {/* Center-left */}
        <PixelStar
          className="absolute top-24 left-[25%] w-3 h-3 opacity-25"
          color="#ff6ec7"
        />
        <PixelGhost
          className="absolute top-[45%] left-[22%] w-5 h-5 opacity-15"
          color="#ffc857"
        />
        <PixelStar
          className="absolute bottom-32 left-[28%] w-4 h-4 opacity-20"
          color="#c77dff"
        />

        {/* Center */}
        <PixelStar
          className="absolute top-36 left-[45%] w-3 h-3 opacity-30"
          color="#ff6ec7"
        />
        <PixelCoffee className="absolute top-[65%] left-[50%] w-5 h-5 opacity-15" />
        <PixelStar
          className="absolute bottom-28 left-[48%] w-4 h-4 opacity-25"
          color="#a6ff00"
        />

        {/* Center-right */}
        <PixelGhost
          className="absolute top-28 right-[25%] w-5 h-5 opacity-20"
          color="#a6ff00"
        />
        <PixelStar
          className="absolute top-[55%] right-[22%] w-3 h-3 opacity-30"
          color="#00f0ff"
        />

        {/* Right column */}
        <PixelStar
          className="absolute top-20 right-[8%] w-5 h-5 opacity-40"
          color="#ffc857"
        />
        <PixelGhost
          className="absolute top-[35%] right-[5%] w-6 h-6 opacity-25"
          color="#ff6ec7"
        />
        <PixelCoffee className="absolute top-[55%] right-[10%] w-8 h-8 opacity-30" />
        <PixelStar
          className="absolute bottom-36 right-[6%] w-4 h-4 opacity-35"
          color="#c77dff"
        />
        <PixelGhost
          className="absolute bottom-16 right-[15%] w-5 h-5 opacity-20"
          color="#a6ff00"
        />

        {/* Large decorative gamepad */}
        <motion.div
          className="absolute -right-4 top-[20%] opacity-[0.08] rotate-12"
          animate={{ rotate: [12, 15, 12] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        >
          <PixelGamepad className="w-64 h-40" />
        </motion.div>

        {/* Second gamepad on left */}
        <motion.div
          className="absolute -left-8 bottom-[15%] opacity-[0.05] -rotate-6"
          animate={{ rotate: [-6, -3, -6] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        >
          <PixelGamepad className="w-48 h-32" />
        </motion.div>
      </div>

      {/* Main content */}
      <div
        className="relative z-10 w-full flex flex-col md:flex-row items-center justify-center gap-[clamp(2rem,4vw,5rem)] pt-20"
        style={{ padding: "5vh clamp(2rem, 8vw, 12rem) 0" }}
      >
        {/* Left: Text */}
        <div className="flex-1 text-center md:text-left">
          {/* Boot sequence line */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="mb-4"
          >
            <span className="font-['Press_Start_2P'] text-[9px] text-[#5a5a7a] tracking-widest">
              {">"} SYSTEM.boot() — v2.0.0
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="font-['Press_Start_2P'] text-[#e8e8e8] leading-relaxed mb-6"
            style={{ fontSize: "clamp(1.4rem, 3.5vw, 2.5rem)" }}
          >
            <span className="text-[#c77dff]">{"{"}</span> Priyanshu{" "}
            <span className="text-[#a6ff00] glow-green">Kumar</span>
            <br />
            Jha <span className="text-[#c77dff]">{"}"}</span>
          </motion.h1>

          {/* Subtitle typewriter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1 }}
            className="mb-8"
          >
            <p
              className="font-['Press_Start_2P'] text-[#a6ff00] glow-green"
              style={{ fontSize: "clamp(9px, 1.1vw, 14px)" }}
            >
              {subtitle}
              {!subtitleDone && (
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                >
                  ▋
                </motion.span>
              )}
            </p>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.8, duration: 0.6 }}
            className="text-[#9a9aba] leading-relaxed mb-8"
            style={{ fontSize: "clamp(0.875rem, 1.2vw, 1.125rem)" }}
          >
            I build fast, clean web applications with React / Next.js and
            Node.js. Lately, I’m diving into{" "}
            <span className="text-[#c77dff]">systems</span>,{" "}
            <span className="text-[#00f0ff]">OS internals</span>,{" "}
            <span className="text-[#ffc857]">WebAssembly</span>, and{" "}
            <span className="text-[#ff6b6b]">deep learning</span> to push
            browser performance further.
          </motion.p>

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 2.2, duration: 0.5 }}
            className="flex flex-wrap gap-3 justify-center md:justify-start mb-10"
          >
            {tags.map((tag, i) => (
              <motion.span
                key={tag.text}
                className={tag.color}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 2.4 + i * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                {tag.text}
              </motion.span>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 2.8 }}
            className="flex flex-wrap gap-4 justify-center md:justify-start"
          >
            <a href="#projects" className="pixel-btn">
              View Projects
            </a>
            <a href="#contact" className="pixel-btn pixel-btn-purple">
              Get in Touch
            </a>
          </motion.div>
        </div>

        {/* Right: Pixel art terminal + character */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: 3 }}
          animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
          transition={{ delay: 1.2, duration: 0.8, type: "spring" }}
          className="shrink-0 relative"
        >
          <div className="sketch-border sketch-border-green bg-[#1a1a2e]/80 p-6 relative">
            {/* Terminal window */}
            <PixelTerminal className="w-56 sm:w-72 h-auto" />

            {/* Developer character sitting in front */}
            <div className="absolute -bottom-6 -right-4">
              <PixelDeveloper className="w-16 h-16" />
            </div>

            {/* Floating XP badge */}
            <motion.div
              className="absolute -top-3 -right-3 bg-[#a6ff00] text-[#0d0d0d] font-['Press_Start_2P'] text-[7px] px-2 py-1 rounded-sm"
              animate={{ y: [0, -3, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              style={{ borderRadius: "4px 2px 6px 3px" }}
            >
              +500 XP
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5 }}
      >
        <span className="font-['Press_Start_2P'] text-[7px] text-[#5a5a7a]">
          SCROLL DOWN
        </span>
        <PixelArrowDown className="w-6 h-6" />
      </motion.div>
    </section>
  );
}
