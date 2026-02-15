"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Tab = "logbook" | "skills" | "projects" | "settings";

interface LogEntry {
  _id: string;
  title: string;
  content: string;
  tags: string[];
  emoji: string;
  createdAt: string;
}

interface SkillCategory {
  _id: string;
  title: string;
  icon: string;
  color: string;
  skills: string[];
  order: number;
}

interface ProjectEntry {
  _id: string;
  title: string;
  subtitle: string;
  type: "Full Stack" | "Frontend" | "Backend";
  description: string;
  tech: string[];
  codeUrl?: string;
  liveUrl?: string;
  color: string;
  icon: string;
  order: number;
}

const emojiOptions = [
  "📝",
  "🚀",
  "🐛",
  "⚡",
  "🦀",
  "🎨",
  "🐧",
  "🌟",
  "💡",
  "🔧",
  "📚",
  "🎮",
  "🔮",
  "🪐",
  "💬",
  "📦",
];

const colorOptions = [
  { label: "Green", value: "#a6ff00" },
  { label: "Purple", value: "#c77dff" },
  { label: "Blue", value: "#00f0ff" },
  { label: "Amber", value: "#ffc857" },
  { label: "Pink", value: "#ff6ec7" },
];

/* ─── shared input style ─── */
const inputClass =
  "w-full bg-[#0d0d0d] border-2 border-[#2a2a4a] text-[#e8e8e8] font-mono text-sm p-3 focus:border-[#a6ff00] focus:outline-none transition-colors";
const inputStyle = { borderRadius: "4px 2px 6px 3px" };

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [adminExists, setAdminExists] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [tab, setTab] = useState<Tab>("logbook");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ─── Logbook state ───
  const [logEntries, setLogEntries] = useState<LogEntry[]>([]);
  const [logTitle, setLogTitle] = useState("");
  const [logContent, setLogContent] = useState("");
  const [logTags, setLogTags] = useState("");
  const [logEmoji, setLogEmoji] = useState("📝");

  // ─── Skills state ───
  const [skills, setSkills] = useState<SkillCategory[]>([]);
  const [skTitle, setSkTitle] = useState("");
  const [skIcon, setSkIcon] = useState("⌨️");
  const [skColor, setSkColor] = useState("#a6ff00");
  const [skSkill, setSkSkill] = useState("");
  const [skOrder, setSkOrder] = useState(0);
  const [skIsExisting, setSkIsExisting] = useState(false);

  // ─── Projects state ───
  const [projects, setProjects] = useState<ProjectEntry[]>([]);
  const [pTitle, setPTitle] = useState("");
  const [pSubtitle, setPSubtitle] = useState("");
  const [pType, setPType] = useState<"Full Stack" | "Frontend" | "Backend">(
    "Full Stack",
  );
  const [pDesc, setPDesc] = useState("");
  const [pTech, setPTech] = useState("");
  const [pCodeUrl, setPCodeUrl] = useState("");
  const [pLiveUrl, setPLiveUrl] = useState("");
  const [pColor, setPColor] = useState("#a6ff00");
  const [pIcon, setPIcon] = useState("📦");
  const [pOrder, setPOrder] = useState(0);

  // ─── Settings state ───
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  /* ──────── check if admin exists ──────── */
  useEffect(() => {
    fetch("/api/auth")
      .then((r) => r.json())
      .then((d) => setAdminExists(d.adminExists))
      .catch(() => setAdminExists(false));
  }, []);

  /* ──────── fetch data ──────── */
  const fetchAll = useCallback(async () => {
    const [logRes, skRes, prRes] = await Promise.all([
      fetch("/api/logbook?limit=100")
        .then((r) => r.json())
        .catch(() => ({ entries: [] })),
      fetch("/api/skills")
        .then((r) => r.json())
        .catch(() => []),
      fetch("/api/projects")
        .then((r) => r.json())
        .catch(() => []),
    ]);
    setLogEntries(logRes.entries || []);
    setSkills(Array.isArray(skRes) ? skRes : []);
    setProjects(Array.isArray(prRes) ? prRes : []);
  }, []);

  /* ──────── auth handlers ──────── */
  async function handleSetup(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "setup", password }),
      });
      const data = await res.json();
      if (res.ok) {
        setAdminExists(true);
        setAuthenticated(true);
        await fetchAll();
      } else {
        setError(data.error);
      }
    } catch {
      setError("Setup failed");
    } finally {
      setLoading(false);
    }
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "login", password }),
      });
      const data = await res.json();
      if (res.ok) {
        setAuthenticated(true);
        await fetchAll();
      } else {
        setError(data.error);
      }
    } catch {
      setError("Login failed");
    } finally {
      setLoading(false);
    }
  }

  /* ──────── CRUD — logbook ──────── */
  async function createLogEntry(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch("/api/logbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: logTitle,
          content: logContent,
          tags: logTags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
          emoji: logEmoji,
          password,
        }),
      });
      if (res.ok) {
        setSuccess("Log entry created");
        setLogTitle("");
        setLogContent("");
        setLogTags("");
        setLogEmoji("📝");
        await fetchAll();
      } else {
        const d = await res.json();
        setError(d.error || "Failed");
      }
    } catch {
      setError("Failed to create entry");
    } finally {
      setLoading(false);
    }
  }

  async function deleteLogEntry(id: string) {
    if (!confirm("Delete this log entry?")) return;
    try {
      await fetch(
        `/api/logbook?id=${id}&password=${encodeURIComponent(password)}`,
        {
          method: "DELETE",
        },
      );
      await fetchAll();
    } catch {
      setError("Delete failed");
    }
  }

  /* ──────── CRUD — skills ──────── */

  function handleCategorySelect(title: string) {
    if (!title) {
      setSkTitle("");
      setSkIcon("⌨️");
      setSkColor("#a6ff00");
      setSkOrder(0);
      setSkIsExisting(false);
      return;
    }
    const existing = skills.find((c) => c.title === title);
    if (existing) {
      setSkTitle(existing.title);
      setSkIcon(existing.icon);
      setSkColor(existing.color);
      setSkOrder(existing.order);
      setSkIsExisting(true);
    } else {
      setSkTitle(title);
      setSkIsExisting(false);
    }
  }

  async function createSkill(e: React.FormEvent) {
    e.preventDefault();
    if (!skSkill.trim()) return;
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch("/api/skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: skTitle,
          icon: skIcon,
          color: skColor,
          skill: skSkill.trim(),
          order: skOrder,
          password,
        }),
      });
      if (res.ok) {
        setSuccess(`Added "${skSkill.trim()}" to ${skTitle}`);
        setSkSkill("");
        await fetchAll();
      } else {
        const d = await res.json();
        setError(d.error || "Failed");
      }
    } catch {
      setError("Failed to add skill");
    } finally {
      setLoading(false);
    }
  }

  async function removeSkillItem(categoryId: string, skillName: string) {
    if (!confirm(`Remove "${skillName}"?`)) return;
    try {
      const res = await fetch("/api/skills", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _id: categoryId,
          removeSkill: skillName,
          password,
        }),
      });
      if (res.ok) {
        setSuccess(`Removed "${skillName}"`);
        await fetchAll();
      } else {
        const d = await res.json();
        setError(d.error || "Failed");
      }
    } catch {
      setError("Delete failed");
    }
  }

  async function deleteSkill(id: string) {
    if (!confirm("Delete this entire skill category?")) return;
    try {
      await fetch(
        `/api/skills?id=${id}&password=${encodeURIComponent(password)}`,
        {
          method: "DELETE",
        },
      );
      await fetchAll();
    } catch {
      setError("Delete failed");
    }
  }

  /* ──────── CRUD — projects ──────── */
  async function createProject(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: pTitle,
          subtitle: pSubtitle,
          type: pType,
          description: pDesc,
          tech: pTech
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
          codeUrl: pCodeUrl || undefined,
          liveUrl: pLiveUrl || undefined,
          color: pColor,
          icon: pIcon,
          order: pOrder,
          password,
        }),
      });
      if (res.ok) {
        setSuccess("Project created");
        setPTitle("");
        setPSubtitle("");
        setPDesc("");
        setPTech("");
        setPCodeUrl("");
        setPLiveUrl("");
        setPIcon("📦");
        setPOrder(0);
        await fetchAll();
      } else {
        const d = await res.json();
        setError(d.error || "Failed");
      }
    } catch {
      setError("Failed to create project");
    } finally {
      setLoading(false);
    }
  }

  async function deleteProject(id: string) {
    if (!confirm("Delete this project?")) return;
    try {
      await fetch(
        `/api/projects?id=${id}&password=${encodeURIComponent(password)}`,
        {
          method: "DELETE",
        },
      );
      await fetchAll();
    } catch {
      setError("Delete failed");
    }
  }

  /* ──────── change password ──────── */
  async function changePassword(e: React.FormEvent) {
    e.preventDefault();
    if (newPass !== confirmPass) {
      setError("Passwords don't match");
      return;
    }
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "change-password",
          password,
          newPassword: newPass,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setPassword(newPass);
        setNewPass("");
        setConfirmPass("");
        setSuccess("Password changed successfully");
      } else {
        setError(data.error);
      }
    } catch {
      setError("Password change failed");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (success) {
      const t = setTimeout(() => setSuccess(""), 3000);
      return () => clearTimeout(t);
    }
  }, [success]);

  /* ──────── LOGIN / SETUP SCREEN ──────── */
  if (adminExists === null) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center">
        <span className="font-['Press_Start_2P'] text-[10px] text-[#5a5a7a]">
          Loading...
        </span>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center px-6 pixel-grid">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="sketch-border sketch-border-green bg-[#1a1a2e]/80 p-8 w-full sm:w-96"
        >
          <h1 className="font-['Press_Start_2P'] text-sm text-[#a6ff00] glow-green mb-6 text-center">
            {">"} {adminExists ? "Admin Login" : "Admin Setup"}
          </h1>
          <form onSubmit={adminExists ? handleLogin : handleSetup}>
            <label className="font-['Press_Start_2P'] text-[8px] text-[#9a9aba] block mb-2">
              {adminExists ? "PASSWORD:" : "CREATE PASSWORD:"}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClass + " mb-4"}
              style={inputStyle}
              placeholder={
                adminExists ? "Enter password..." : "Choose a password..."
              }
              autoFocus
              minLength={4}
              required
            />
            {error && (
              <p className="font-['Press_Start_2P'] text-[7px] text-[#ff4757] mb-4">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="pixel-btn w-full"
            >
              {loading ? "..." : adminExists ? "Login" : "Create Account"}
            </button>
          </form>
          <a
            href="/"
            className="block text-center font-['Press_Start_2P'] text-[7px] text-[#5a5a7a] hover:text-[#c77dff] mt-4 transition-colors"
          >
            {"← "}Back to portfolio
          </a>
        </motion.div>
      </div>
    );
  }

  /* ──────── ADMIN DASHBOARD ──────── */
  const tabs: { key: Tab; label: string }[] = [
    { key: "logbook", label: "Logbook" },
    { key: "skills", label: "Skills" },
    { key: "projects", label: "Projects" },
    { key: "settings", label: "Settings" },
  ];

  return (
    <div className="min-h-screen bg-[#0d0d0d] pixel-grid noise-bg">
      {/* Header */}
      <div className="border-b-2 border-[#2a2a4a] bg-[#1a1a2e]/60 px-6 py-4">
        <div className="px-8 sm:px-16 md:px-24 lg:px-32 xl:px-48 flex items-center justify-between">
          <h1 className="font-['Press_Start_2P'] text-xs text-[#a6ff00] glow-green">
            {">"} Admin Panel
          </h1>
          <a href="/" className="pixel-btn text-[7px] py-1.5 px-3">
            Portfolio
          </a>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-[#2a2a4a] bg-[#1a1a2e]/30">
        <div className="px-8 sm:px-16 md:px-24 lg:px-32 xl:px-48 flex justify-center gap-2">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`font-['Press_Start_2P'] text-[8px] px-6 py-4 transition-colors border-b-2 ${
                tab === t.key
                  ? "text-[#a6ff00] border-[#a6ff00]"
                  : "text-[#5a5a7a] border-transparent hover:text-[#9a9aba]"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-8 sm:px-16 md:px-24 lg:px-32 xl:px-48 py-12">
        {/* Alerts */}
        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 p-3 bg-[#a6ff00]/10 border-2 border-[#a6ff00]/30 font-['Press_Start_2P'] text-[8px] text-[#a6ff00] text-center"
              style={{ borderRadius: "5px 3px 7px 4px" }}
            >
              ✓ {success}
            </motion.div>
          )}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 p-3 bg-[#ff4757]/10 border-2 border-[#ff4757]/30 font-['Press_Start_2P'] text-[8px] text-[#ff4757] text-center"
              style={{ borderRadius: "5px 3px 7px 4px" }}
            >
              ✗ {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ──── TAB: LOGBOOK ──── */}
        {tab === "logbook" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Create form */}
            <div
              className="bg-[#1a1a2e]/60 p-8"
              style={{
                border: "3px solid #2a2a4a",
                borderRadius: "10px 4px 12px 6px",
              }}
            >
              <h2 className="font-['Press_Start_2P'] text-[10px] text-[#c77dff] mb-6">
                + New Log Entry
              </h2>
              <form onSubmit={createLogEntry} className="space-y-5">
                <div>
                  <label className="font-['Press_Start_2P'] text-[7px] text-[#9a9aba] block mb-2">
                    EMOJI:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {emojiOptions.map((e) => (
                      <button
                        key={e}
                        type="button"
                        onClick={() => setLogEmoji(e)}
                        className="text-lg p-1 transition-all"
                        style={{
                          background:
                            logEmoji === e ? "#a6ff0020" : "transparent",
                          border: `2px solid ${logEmoji === e ? "#a6ff00" : "#2a2a4a"}`,
                          borderRadius: "3px",
                        }}
                      >
                        {e}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="font-['Press_Start_2P'] text-[7px] text-[#9a9aba] block mb-2">
                    TITLE:
                  </label>
                  <input
                    type="text"
                    value={logTitle}
                    onChange={(e) => setLogTitle(e.target.value)}
                    required
                    className={inputClass}
                    style={inputStyle}
                    placeholder="What happened?"
                  />
                </div>
                <div>
                  <label className="font-['Press_Start_2P'] text-[7px] text-[#9a9aba] block mb-2">
                    CONTENT:
                  </label>
                  <textarea
                    value={logContent}
                    onChange={(e) => setLogContent(e.target.value)}
                    required
                    rows={4}
                    className={inputClass + " resize-none"}
                    style={inputStyle}
                    placeholder="More details..."
                  />
                </div>
                <div>
                  <label className="font-['Press_Start_2P'] text-[7px] text-[#9a9aba] block mb-2">
                    TAGS (comma separated):
                  </label>
                  <input
                    type="text"
                    value={logTags}
                    onChange={(e) => setLogTags(e.target.value)}
                    className={inputClass}
                    style={inputStyle}
                    placeholder="React, WebAssembly, ..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="pixel-btn w-full"
                >
                  {loading ? "Creating..." : "Create Entry"}
                </button>
              </form>
            </div>

            {/* List */}
            <div>
              <h2 className="font-['Press_Start_2P'] text-[10px] text-[#c77dff] mb-4">
                Entries ({logEntries.length})
              </h2>
              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                {logEntries.map((entry) => (
                  <div
                    key={entry._id}
                    className="bg-[#1a1a2e]/50 p-4 group hover:bg-[#1a1a2e]/80 transition-all"
                    style={{
                      border: "2px solid #2a2a4a",
                      borderRadius: "6px 3px 8px 4px",
                    }}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <span>{entry.emoji}</span>
                        <h4 className="font-['Press_Start_2P'] text-[8px] text-[#e8e8e8] truncate">
                          {entry.title}
                        </h4>
                      </div>
                      <button
                        onClick={() => deleteLogEntry(entry._id)}
                        className="font-['Press_Start_2P'] text-[7px] text-[#ff4757] opacity-0 group-hover:opacity-100 transition-opacity shrink-0 hover:bg-[#ff4757]/10 px-2 py-1"
                        style={{ borderRadius: "3px" }}
                      >
                        DEL
                      </button>
                    </div>
                    <p className="text-[#9a9aba] text-[11px] leading-relaxed line-clamp-2">
                      {entry.content}
                    </p>
                  </div>
                ))}
                {logEntries.length === 0 && (
                  <p className="font-['Press_Start_2P'] text-[8px] text-[#5a5a7a] text-center py-8">
                    No entries yet
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ──── TAB: SKILLS ──── */}
        {tab === "skills" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div
              className="bg-[#1a1a2e]/60 p-8"
              style={{
                border: "3px solid #2a2a4a",
                borderRadius: "10px 4px 12px 6px",
              }}
            >
              <h2 className="font-['Press_Start_2P'] text-[10px] text-[#c77dff] mb-6">
                + Add Skill
              </h2>
              <form onSubmit={createSkill} className="space-y-5">
                <div>
                  <label className="font-['Press_Start_2P'] text-[7px] text-[#9a9aba] block mb-2">
                    CATEGORY:
                  </label>
                  <select
                    value={skTitle}
                    onChange={(e) => handleCategorySelect(e.target.value)}
                    className={inputClass}
                    style={inputStyle}
                  >
                    <option value="">— New category —</option>
                    {skills.map((cat) => (
                      <option key={cat._id} value={cat.title}>
                        {cat.icon} {cat.title}
                      </option>
                    ))}
                  </select>
                  {!skIsExisting && (
                    <input
                      type="text"
                      value={skTitle}
                      onChange={(e) => setSkTitle(e.target.value)}
                      required
                      className={`${inputClass} mt-2`}
                      style={inputStyle}
                      placeholder="New category name"
                    />
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-['Press_Start_2P'] text-[7px] text-[#9a9aba] block mb-2">
                      ICON:
                    </label>
                    <input
                      type="text"
                      value={skIcon}
                      onChange={(e) => setSkIcon(e.target.value)}
                      className={inputClass}
                      style={inputStyle}
                      placeholder="⌨️"
                      disabled={skIsExisting}
                    />
                  </div>
                  <div>
                    <label className="font-['Press_Start_2P'] text-[7px] text-[#9a9aba] block mb-2">
                      COLOR:
                    </label>
                    <select
                      value={skColor}
                      onChange={(e) => setSkColor(e.target.value)}
                      className={inputClass}
                      style={inputStyle}
                      disabled={skIsExisting}
                    >
                      {colorOptions.map((c) => (
                        <option key={c.value} value={c.value}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="font-['Press_Start_2P'] text-[7px] text-[#9a9aba] block mb-2">
                    SKILL:
                  </label>
                  <input
                    type="text"
                    value={skSkill}
                    onChange={(e) => setSkSkill(e.target.value)}
                    required
                    className={inputClass}
                    style={inputStyle}
                    placeholder="e.g. React"
                  />
                </div>
                <div>
                  <label className="font-['Press_Start_2P'] text-[7px] text-[#9a9aba] block mb-2">
                    ORDER:
                  </label>
                  <input
                    type="number"
                    value={skOrder}
                    onChange={(e) => setSkOrder(Number(e.target.value))}
                    className={inputClass}
                    style={inputStyle}
                    disabled={skIsExisting}
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading || !skSkill.trim() || !skTitle.trim()}
                  className="pixel-btn w-full"
                >
                  {loading
                    ? "Adding..."
                    : skIsExisting
                      ? `Add to ${skTitle}`
                      : "Create & Add Skill"}
                </button>
              </form>
            </div>

            <div>
              <h2 className="font-['Press_Start_2P'] text-[10px] text-[#c77dff] mb-4">
                Categories ({skills.length})
              </h2>
              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                {skills.map((cat) => (
                  <div
                    key={cat._id}
                    className="bg-[#1a1a2e]/50 p-4 group hover:bg-[#1a1a2e]/80 transition-all"
                    style={{
                      border: `2px solid ${cat.color}40`,
                      borderRadius: "6px 3px 8px 4px",
                    }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span>{cat.icon}</span>
                        <h4
                          className="font-['Press_Start_2P'] text-[8px]"
                          style={{ color: cat.color }}
                        >
                          {cat.title}
                        </h4>
                        <span className="font-['Press_Start_2P'] text-[6px] text-[#5a5a7a]">
                          #{cat.order}
                        </span>
                      </div>
                      <button
                        onClick={() => deleteSkill(cat._id)}
                        className="font-['Press_Start_2P'] text-[7px] text-[#ff4757] opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#ff4757]/10 px-2 py-1"
                        style={{ borderRadius: "3px" }}
                      >
                        DEL
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {cat.skills.map((s) => (
                        <span
                          key={s}
                          className="font-['Press_Start_2P'] text-[6px] px-1.5 py-0.5 bg-[#2a2a4a]/50 text-[#9a9aba] inline-flex items-center gap-1 group/skill"
                          style={{ borderRadius: "2px" }}
                        >
                          {s}
                          <button
                            onClick={() => removeSkillItem(cat._id, s)}
                            className="text-[#ff4757] opacity-0 group-hover/skill:opacity-100 transition-opacity hover:text-[#ff6b81] ml-0.5"
                            title={`Remove ${s}`}
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
                {skills.length === 0 && (
                  <p className="font-['Press_Start_2P'] text-[8px] text-[#5a5a7a] text-center py-8">
                    No skill categories. They&apos;ll use fallback data.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ──── TAB: PROJECTS ──── */}
        {tab === "projects" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div
              className="bg-[#1a1a2e]/60 p-8"
              style={{
                border: "3px solid #2a2a4a",
                borderRadius: "10px 4px 12px 6px",
              }}
            >
              <h2 className="font-['Press_Start_2P'] text-[10px] text-[#c77dff] mb-6">
                + New Project
              </h2>
              <form onSubmit={createProject} className="space-y-5">
                <div>
                  <label className="font-['Press_Start_2P'] text-[7px] text-[#9a9aba] block mb-2">
                    TITLE:
                  </label>
                  <input
                    type="text"
                    value={pTitle}
                    onChange={(e) => setPTitle(e.target.value)}
                    required
                    className={inputClass}
                    style={inputStyle}
                    placeholder="Project name"
                  />
                </div>
                <div>
                  <label className="font-['Press_Start_2P'] text-[7px] text-[#9a9aba] block mb-2">
                    SUBTITLE:
                  </label>
                  <input
                    type="text"
                    value={pSubtitle}
                    onChange={(e) => setPSubtitle(e.target.value)}
                    required
                    className={inputClass}
                    style={inputStyle}
                    placeholder="One-liner description"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-['Press_Start_2P'] text-[7px] text-[#9a9aba] block mb-2">
                      TYPE:
                    </label>
                    <select
                      value={pType}
                      onChange={(e) =>
                        setPType(e.target.value as ProjectEntry["type"])
                      }
                      className={inputClass}
                      style={inputStyle}
                    >
                      <option value="Full Stack">Full Stack</option>
                      <option value="Frontend">Frontend</option>
                      <option value="Backend">Backend</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-['Press_Start_2P'] text-[7px] text-[#9a9aba] block mb-2">
                      ICON:
                    </label>
                    <input
                      type="text"
                      value={pIcon}
                      onChange={(e) => setPIcon(e.target.value)}
                      className={inputClass}
                      style={inputStyle}
                      placeholder="📦"
                    />
                  </div>
                </div>
                <div>
                  <label className="font-['Press_Start_2P'] text-[7px] text-[#9a9aba] block mb-2">
                    DESCRIPTION:
                  </label>
                  <textarea
                    value={pDesc}
                    onChange={(e) => setPDesc(e.target.value)}
                    required
                    rows={3}
                    className={inputClass + " resize-none"}
                    style={inputStyle}
                    placeholder="What does it do?"
                  />
                </div>
                <div>
                  <label className="font-['Press_Start_2P'] text-[7px] text-[#9a9aba] block mb-2">
                    TECH (comma separated):
                  </label>
                  <input
                    type="text"
                    value={pTech}
                    onChange={(e) => setPTech(e.target.value)}
                    className={inputClass}
                    style={inputStyle}
                    placeholder="React, Node.js, ..."
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-['Press_Start_2P'] text-[7px] text-[#9a9aba] block mb-2">
                      CODE URL:
                    </label>
                    <input
                      type="text"
                      value={pCodeUrl}
                      onChange={(e) => setPCodeUrl(e.target.value)}
                      className={inputClass}
                      style={inputStyle}
                      placeholder="https://..."
                    />
                  </div>
                  <div>
                    <label className="font-['Press_Start_2P'] text-[7px] text-[#9a9aba] block mb-2">
                      LIVE URL:
                    </label>
                    <input
                      type="text"
                      value={pLiveUrl}
                      onChange={(e) => setPLiveUrl(e.target.value)}
                      className={inputClass}
                      style={inputStyle}
                      placeholder="https://..."
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-['Press_Start_2P'] text-[7px] text-[#9a9aba] block mb-2">
                      COLOR:
                    </label>
                    <select
                      value={pColor}
                      onChange={(e) => setPColor(e.target.value)}
                      className={inputClass}
                      style={inputStyle}
                    >
                      {colorOptions.map((c) => (
                        <option key={c.value} value={c.value}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="font-['Press_Start_2P'] text-[7px] text-[#9a9aba] block mb-2">
                      ORDER:
                    </label>
                    <input
                      type="number"
                      value={pOrder}
                      onChange={(e) => setPOrder(Number(e.target.value))}
                      className={inputClass}
                      style={inputStyle}
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="pixel-btn w-full"
                >
                  {loading ? "Creating..." : "Create Project"}
                </button>
              </form>
            </div>

            <div>
              <h2 className="font-['Press_Start_2P'] text-[10px] text-[#c77dff] mb-4">
                Projects ({projects.length})
              </h2>
              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                {projects.map((proj) => (
                  <div
                    key={proj._id}
                    className="bg-[#1a1a2e]/50 p-4 group hover:bg-[#1a1a2e]/80 transition-all"
                    style={{
                      border: `2px solid ${proj.color}40`,
                      borderRadius: "6px 3px 8px 4px",
                    }}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <span>{proj.icon}</span>
                        <h4
                          className="font-['Press_Start_2P'] text-[8px] truncate"
                          style={{ color: proj.color }}
                        >
                          {proj.title}
                        </h4>
                        <span className="font-['Press_Start_2P'] text-[6px] text-[#5a5a7a]">
                          #{proj.order}
                        </span>
                      </div>
                      <button
                        onClick={() => deleteProject(proj._id)}
                        className="font-['Press_Start_2P'] text-[7px] text-[#ff4757] opacity-0 group-hover:opacity-100 transition-opacity shrink-0 hover:bg-[#ff4757]/10 px-2 py-1"
                        style={{ borderRadius: "3px" }}
                      >
                        DEL
                      </button>
                    </div>
                    <p className="text-[#9a9aba] text-[11px] leading-relaxed line-clamp-2">
                      {proj.description}
                    </p>
                  </div>
                ))}
                {projects.length === 0 && (
                  <p className="font-['Press_Start_2P'] text-[8px] text-[#5a5a7a] text-center py-8">
                    No projects. They&apos;ll use fallback data.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ──── TAB: SETTINGS ──── */}
        {tab === "settings" && (
          <div className="sm:w-[28rem] mx-auto">
            <div
              className="bg-[#1a1a2e]/60 p-8"
              style={{
                border: "3px solid #2a2a4a",
                borderRadius: "10px 4px 12px 6px",
              }}
            >
              <h2 className="font-['Press_Start_2P'] text-[10px] text-[#c77dff] mb-6 text-center">
                Change Password
              </h2>
              <form onSubmit={changePassword} className="space-y-5">
                <div>
                  <label className="font-['Press_Start_2P'] text-[7px] text-[#9a9aba] block mb-2">
                    NEW PASSWORD:
                  </label>
                  <input
                    type="password"
                    value={newPass}
                    onChange={(e) => setNewPass(e.target.value)}
                    required
                    minLength={4}
                    className={inputClass}
                    style={inputStyle}
                    placeholder="New password..."
                  />
                </div>
                <div>
                  <label className="font-['Press_Start_2P'] text-[7px] text-[#9a9aba] block mb-2">
                    CONFIRM PASSWORD:
                  </label>
                  <input
                    type="password"
                    value={confirmPass}
                    onChange={(e) => setConfirmPass(e.target.value)}
                    required
                    minLength={4}
                    className={inputClass}
                    style={inputStyle}
                    placeholder="Confirm password..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="pixel-btn w-full pixel-btn-purple"
                >
                  {loading ? "Changing..." : "Change Password"}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
