"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { fallbackLogEntries, type LogEntryData } from "./logbook.data";

function timeAgo(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  return `${months}mo ago`;
}

function LogRow({ entry, index }: { entry: LogEntryData; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.3 }}
      onClick={() => setExpanded(!expanded)}
      className="cursor-pointer group"
    >
      <div className="px-6 py-6 transition-all duration-200 hover:bg-[#1a1a2e]/40 border-b border-[#2a2a4a]/40">
        {/* Header row */}
        <div className="flex items-start gap-4">
          <motion.span
            className="text-2xl shrink-0 mt-0.5"
            animate={expanded ? { scale: [1, 1.3, 1] } : {}}
            transition={{ duration: 0.3 }}
          >
            {entry.emoji}
          </motion.span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-3 mb-2">
              <h4 className="font-['Press_Start_2P'] text-[10px] text-[#e8e8e8] group-hover:text-[#a6ff00] transition-colors truncate leading-relaxed">
                {entry.title}
              </h4>
              <span className="font-['Press_Start_2P'] text-[7px] text-[#5a5a7a] shrink-0">
                {timeAgo(entry.createdAt)}
              </span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-1">
              {entry.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-['Press_Start_2P'] text-[6px] px-2 py-1 bg-[#2a2a4a]/50 text-[#9a9aba] rounded-sm"
                  style={{ borderRadius: "2px 1px 3px 2px" }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Content (expanded) */}
            <AnimatePresence>
              {expanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="text-[#9a9aba] text-sm leading-relaxed pt-3 border-t border-[#2a2a4a]/50 mt-2">
                    {entry.content}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Expand indicator */}
          <motion.span
            className="text-[#5a5a7a] text-sm shrink-0 mt-1"
            animate={{ rotate: expanded ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            ▸
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Logbook() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [entries, setEntries] = useState<LogEntryData[]>(fallbackLogEntries);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    async function fetchEntries() {
      try {
        const res = await fetch("/api/logbook?limit=50");
        if (res.ok) {
          const data = await res.json();
          if (data.entries && data.entries.length > 0) {
            setEntries(data.entries);
            setTotal(data.total);
          }
        }
      } catch {
        // silently use fallback
      } finally {
        setLoading(false);
      }
    }
    fetchEntries();
  }, []);

  const visibleEntries = showAll ? entries : entries.slice(0, 6);
  const hasMore = entries.length > 6;

  return (
    <section
      ref={sectionRef}
      id="logbook"
      className="relative py-40 px-8 sm:px-16 md:px-24 lg:px-32 xl:px-48 noise-bg overflow-hidden"
    >
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="section-heading">Logbook</h2>
          <p className="text-[#5a5a7a] font-['Press_Start_2P'] text-[8px] -mt-8">
            {"// "}what_ive_been_up_to.recent()
          </p>
        </motion.div>

        {/* Terminal-style container */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="sketch-border bg-[#1a1a2e]/60 overflow-hidden"
          style={{ borderColor: "#2a2a4a", borderRadius: "8px 4px 10px 6px" }}
        >
          {/* Terminal title bar */}
          <div className="flex items-center gap-2 px-5 py-3 bg-[#2a2a4a]/60 border-b border-[#2a2a4a]">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff4757]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#ffc857]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#a6ff00]" />
            <span className="font-['Press_Start_2P'] text-[8px] text-[#5a5a7a] ml-2">
              ~/logbook
            </span>
            <span className="ml-auto font-['Press_Start_2P'] text-[7px] text-[#5a5a7a]">
              {loading ? "loading..." : `${total || entries.length} entries`}
            </span>
          </div>

          {/* Entries */}
          <div>
            {visibleEntries.map((entry, i) => (
              <LogRow key={entry._id} entry={entry} index={i} />
            ))}
          </div>

          {/* Show more / less */}
          {hasMore && (
            <div className="text-center py-4 border-t border-[#2a2a4a]/40">
              <button
                onClick={() => setShowAll(!showAll)}
                className="font-['Press_Start_2P'] text-[8px] text-[#a6ff00] hover:text-[#c77dff] transition-colors px-4 py-2"
              >
                {showAll ? "▴ Show less" : `▾ Show ${entries.length - 6} more`}
              </button>
            </div>
          )}
        </motion.div>

        {/* Status line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-5"
        >
          <span className="font-['Press_Start_2P'] text-[7px] text-[#5a5a7a]">
            {">"} auto-synced from cloud database ·{" "}
            <span className="text-[#a6ff00]">live</span>
          </span>
        </motion.div>
      </div>
    </section>
  );
}
