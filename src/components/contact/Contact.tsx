"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { PixelStar, PixelGhost, PixelCoffee } from "../sprites/PixelSprites";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [copied, setCopied] = useState(false);

  const email = "jhapriyanshu336@gmail.com";

  function copyEmail() {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/jhapriyansh",
      icon: "◈",
      color: "#e8e8e8",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/priyanshu-kumarjha",
      icon: "◆",
      color: "#00f0ff",
    },
    {
      name: "Email",
      url: `mailto:${email}`,
      icon: "✉",
      color: "#ffc857",
    },
  ];

  return (
    <section
      ref={ref}
      id="contact"
      className="relative min-h-screen flex flex-col justify-center pixel-grid noise-bg overflow-hidden"
      style={{ padding: "clamp(4rem, 8vh, 8rem) clamp(1.5rem, 6vw, 10rem)" }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <PixelGhost
          className="absolute top-16 left-[8%] w-6 h-6 opacity-20"
          color="#a6ff00"
        />
        <PixelStar
          className="absolute top-[24%] right-[7%] w-4 h-4 opacity-30"
          color="#c77dff"
        />
        <PixelCoffee className="absolute bottom-14 right-[10%] w-6 h-6 opacity-20" />
      </div>

      <div className="relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center pt-4"
        >
          <h2
            className="section-heading"
            style={{ marginBottom: "clamp(0.5rem, 1vh, 1rem)" }}
          >
            Get In Touch
          </h2>
          <p
            className="text-[#5a5a7a] font-['Press_Start_2P'] text-[8px]"
            style={{ marginBottom: "clamp(1.5rem, 3vh, 3rem)" }}
          >
            {"// "}send_message.connect()
          </p>
        </motion.div>

        {/* Main content box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="sketch-border bg-[#1a1a2e]/60 text-center w-full"
          style={{
            padding: "clamp(2.5rem, 5vw, 5rem)",
            borderColor: "#2a2a4a",
          }}
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="text-[#9a9aba] leading-relaxed"
            style={{
              fontSize: "clamp(0.875rem, 1.1vw, 1.1rem)",
              marginBottom: "clamp(1.5rem, 3vh, 3rem)",
            }}
          >
            Have an idea, project, or opportunity? I&apos;d love to hear about
            it. Let&apos;s build something{" "}
            <span className="text-[#a6ff00]">awesome</span> together.
          </motion.p>

          {/* Email display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.5 }}
            className=""
            style={{ marginBottom: "clamp(1.5rem, 3vh, 3rem)" }}
          >
            <motion.button
              onClick={copyEmail}
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ y: 1, scale: 0.98 }}
              className="group inline-flex items-center gap-3 bg-[#0d0d0d]/60 px-6 py-4 transition-all duration-300 hover:bg-[#a6ff00]/10"
              style={{
                border: "2px solid #a6ff0050",
                borderRadius: "8px 4px 10px 5px",
                boxShadow: "4px 4px 0px #a6ff0020",
              }}
            >
              <span className="text-[#a6ff00] font-['Press_Start_2P'] text-[8px]">
                {">"}{" "}
              </span>
              <span className="font-mono text-sm sm:text-base text-[#c77dff] group-hover:text-[#a6ff00] transition-colors">
                {email}
              </span>
              <motion.span
                className="font-['Press_Start_2P'] text-[7px] ml-2"
                animate={copied ? { scale: [1, 1.3, 1] } : {}}
              >
                {copied ? (
                  <span className="text-[#a6ff00]">✓ copied!</span>
                ) : (
                  <span className="text-[#5a5a7a] group-hover:text-[#9a9aba]">
                    [click to copy]
                  </span>
                )}
              </motion.span>
            </motion.button>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7 }}
            className="flex justify-center"
            style={{ gap: "clamp(0.75rem, 2vw, 2rem)" }}
          >
            {socialLinks.map((link, i) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.8 + i * 0.1 }}
                whileHover={{
                  y: -3,
                  x: -2,
                  scale: 1.04,
                  boxShadow: `6px 6px 0px ${link.color}50`,
                  background: link.color,
                  color: "#0d0d0d",
                  borderColor: link.color,
                  transition: { duration: 0.15, delay: 0 },
                }}
                whileTap={{
                  y: 2,
                  x: 2,
                  scale: 0.97,
                  boxShadow: `0px 0px 0px ${link.color}30`,
                  transition: { duration: 0.1, delay: 0 },
                }}
                className="font-['Press_Start_2P'] text-[10px] px-7 py-4 cursor-pointer flex items-center gap-2"
                style={{
                  background: `${link.color}10`,
                  color: link.color,
                  border: `2px solid ${link.color}50`,
                  borderRadius: "4px 2px 6px 3px",
                  boxShadow: `3px 3px 0px ${link.color}30`,
                }}
              >
                <span>{link.icon}</span>
                <span>{link.name}</span>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
