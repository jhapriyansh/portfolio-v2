"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

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
      url: "https://github.com/priyanshu",
      icon: "◈",
      color: "#e8e8e8",
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/priyanshu",
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
      className="relative py-40 px-8 sm:px-16 md:px-24 lg:px-32 xl:px-48 pixel-grid noise-bg overflow-hidden"
    >
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="section-heading">Get In Touch</h2>
          <p className="text-[#5a5a7a] font-['Press_Start_2P'] text-[8px] mb-10 -mt-8">
            {"// "}send_message.connect()
          </p>
        </motion.div>

        {/* Main content box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="sketch-border sketch-border-purple bg-[#1a1a2e]/60 p-10 sm:p-12 text-center"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="text-[#9a9aba] text-sm sm:text-base leading-relaxed mb-10"
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
            className="mb-10"
          >
            <button
              onClick={copyEmail}
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
            </button>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7 }}
            className="flex justify-center gap-5"
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
                whileHover={{ y: -3, scale: 1.05 }}
                className="flex items-center gap-2 px-4 py-3 transition-all duration-200"
                style={{
                  background: `${link.color}08`,
                  border: `2px solid ${link.color}30`,
                  borderRadius: "6px 3px 8px 4px",
                  boxShadow: `3px 3px 0px ${link.color}15`,
                  color: link.color,
                }}
              >
                <span className="text-sm">{link.icon}</span>
                <span className="font-['Press_Start_2P'] text-[8px]">
                  {link.name}
                </span>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
