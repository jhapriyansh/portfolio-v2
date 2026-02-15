"use client";

/* ─── 8-bit Pixel Character (developer at desk) ─── */
export function PixelDeveloper({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={`${className}`}
      style={{
        imageRendering: "pixelated",
        animation: "sprite-pop-in 0.6s 1s cubic-bezier(.2,.6,.35,1.2) both",
      }}
    >
      {/* Hair */}
      <rect x="10" y="4" width="12" height="3" fill="#c77dff" />
      <rect x="9" y="5" width="1" height="2" fill="#c77dff" />
      <rect x="22" y="5" width="1" height="2" fill="#c77dff" />
      {/* Face */}
      <rect x="10" y="7" width="12" height="7" fill="#ffc857" />
      {/* Eyes */}
      <rect x="12" y="9" width="2" height="2" fill="#0d0d0d" />
      <rect x="18" y="9" width="2" height="2" fill="#0d0d0d" />
      {/* Eye shine */}
      <rect x="12" y="9" width="1" height="1" fill="#ffffff" />
      <rect x="18" y="9" width="1" height="1" fill="#ffffff" />
      {/* Mouth */}
      <rect x="14" y="12" width="4" height="1" fill="#0d0d0d" />
      {/* Body/Shirt */}
      <rect x="8" y="14" width="16" height="8" fill="#a6ff00" />
      <rect x="10" y="14" width="12" height="2" fill="#7acc00" />
      {/* Screen/Code symbol on shirt */}
      <rect x="13" y="17" width="2" height="1" fill="#0d0d0d" />
      <rect x="16" y="17" width="3" height="1" fill="#0d0d0d" />
      <rect x="14" y="19" width="4" height="1" fill="#0d0d0d" />
      {/* Arms */}
      <rect x="6" y="15" width="2" height="6" fill="#ffc857" />
      <rect x="24" y="15" width="2" height="6" fill="#ffc857" />
      {/* Legs */}
      <rect x="10" y="22" width="4" height="4" fill="#2a2a4a" />
      <rect x="18" y="22" width="4" height="4" fill="#2a2a4a" />
      {/* Shoes */}
      <rect x="9" y="26" width="6" height="2" fill="#c77dff" />
      <rect x="17" y="26" width="6" height="2" fill="#c77dff" />
    </svg>
  );
}

/* ─── Pixel Ghost (floating decoration) ─── */
export function PixelGhost({
  className = "",
  color = "#c77dff",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={`${className}`}
      style={{
        imageRendering: "pixelated",
        animation: "sprite-float 2.5s ease-in-out infinite",
        willChange: "transform",
      }}
    >
      <rect x="4" y="2" width="8" height="2" fill={color} />
      <rect x="3" y="4" width="10" height="6" fill={color} />
      <rect x="2" y="6" width="12" height="4" fill={color} />
      <rect x="2" y="10" width="3" height="2" fill={color} />
      <rect x="6" y="10" width="4" height="2" fill={color} />
      <rect x="11" y="10" width="3" height="2" fill={color} />
      {/* Eyes */}
      <rect x="5" y="5" width="2" height="2" fill="#0d0d0d" />
      <rect x="9" y="5" width="2" height="2" fill="#0d0d0d" />
      <rect x="5" y="5" width="1" height="1" fill="#ffffff" />
      <rect x="9" y="5" width="1" height="1" fill="#ffffff" />
    </svg>
  );
}

/* ─── Pixel Heart ─── */
export function PixelHeart({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={`${className}`}
      style={{
        imageRendering: "pixelated",
        animation: "sprite-pulse 1.5s ease-in-out infinite",
        willChange: "transform",
      }}
    >
      <rect x="2" y="3" width="3" height="2" fill="#ff4757" />
      <rect x="1" y="5" width="5" height="2" fill="#ff4757" />
      <rect x="1" y="7" width="7" height="2" fill="#ff4757" />
      <rect x="3" y="9" width="5" height="2" fill="#ff4757" />
      <rect x="5" y="11" width="3" height="2" fill="#ff4757" />
      <rect x="7" y="13" width="1" height="1" fill="#ff4757" />
      <rect x="11" y="3" width="3" height="2" fill="#ff4757" />
      <rect x="10" y="5" width="5" height="2" fill="#ff4757" />
      <rect x="8" y="7" width="7" height="2" fill="#ff4757" />
      <rect x="8" y="9" width="5" height="2" fill="#ff4757" />
      <rect x="8" y="11" width="3" height="2" fill="#ff4757" />
    </svg>
  );
}

/* ─── Pixel Star ─── */
export function PixelStar({
  className = "",
  color = "#ffc857",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 12 12"
      className={`${className}`}
      style={{
        imageRendering: "pixelated",
        animation: "sprite-rotate 8s linear infinite",
        willChange: "transform",
      }}
    >
      <rect x="5" y="0" width="2" height="2" fill={color} />
      <rect x="5" y="10" width="2" height="2" fill={color} />
      <rect x="0" y="5" width="2" height="2" fill={color} />
      <rect x="10" y="5" width="2" height="2" fill={color} />
      <rect x="3" y="3" width="6" height="6" fill={color} />
      <rect x="4" y="4" width="4" height="4" fill={color} opacity="0.7" />
    </svg>
  );
}

/* ─── Pixel Sword ─── */
export function PixelSword({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 32"
      className={`${className}`}
      style={{
        imageRendering: "pixelated",
        animation: "sprite-rock 2s ease-in-out infinite",
        willChange: "transform",
      }}
    >
      {/* Blade */}
      <rect x="7" y="0" width="2" height="18" fill="#9a9aba" />
      <rect x="6" y="0" width="1" height="16" fill="#e8e8e8" />
      <rect x="9" y="0" width="1" height="16" fill="#5a5a7a" />
      {/* Guard */}
      <rect x="3" y="18" width="10" height="2" fill="#ffc857" />
      {/* Handle */}
      <rect x="6" y="20" width="4" height="8" fill="#8b4513" />
      {/* Pommel */}
      <rect x="5" y="28" width="6" height="2" fill="#ffc857" />
    </svg>
  );
}

/* ─── Pixel Coffee Cup ─── */
export function PixelCoffee({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={`${className}`}
      style={{ imageRendering: "pixelated" }}
    >
      {/* Steam */}
      <g style={{ animation: "sprite-steam 2s ease-in-out infinite" }}>
        <rect x="5" y="0" width="1" height="2" fill="#9a9aba" />
        <rect x="8" y="1" width="1" height="2" fill="#9a9aba" />
        <rect x="11" y="0" width="1" height="2" fill="#9a9aba" />
      </g>
      {/* Cup */}
      <rect x="3" y="4" width="10" height="8" fill="#ffc857" />
      <rect x="4" y="5" width="8" height="6" fill="#8b4513" />
      {/* Handle */}
      <rect x="13" y="5" width="2" height="2" fill="#ffc857" />
      <rect x="14" y="7" width="2" height="2" fill="#ffc857" />
      <rect x="13" y="9" width="2" height="2" fill="#ffc857" />
      {/* Saucer */}
      <rect x="2" y="12" width="12" height="2" fill="#9a9aba" />
    </svg>
  );
}

/* ─── Pixel Terminal Window ─── */
export function PixelTerminal({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 32"
      className={`${className}`}
      style={{ imageRendering: "pixelated" }}
    >
      {/* Window frame */}
      <rect
        x="0"
        y="0"
        width="48"
        height="32"
        fill="#1a1a2e"
        stroke="#2a2a4a"
        strokeWidth="1"
      />
      {/* Title bar */}
      <rect x="0" y="0" width="48" height="6" fill="#2a2a4a" />
      {/* Window buttons */}
      <rect x="2" y="2" width="2" height="2" fill="#ff4757" />
      <rect x="5" y="2" width="2" height="2" fill="#ffc857" />
      <rect x="8" y="2" width="2" height="2" fill="#a6ff00" />
      {/* Code lines */}
      <rect x="3" y="9" width="8" height="1" fill="#a6ff00" />
      <rect x="3" y="12" width="14" height="1" fill="#c77dff" />
      <rect x="5" y="15" width="20" height="1" fill="#9a9aba" />
      <rect x="5" y="18" width="12" height="1" fill="#00f0ff" />
      <rect x="3" y="21" width="16" height="1" fill="#ffc857" />
      <rect x="3" y="24" width="6" height="1" fill="#a6ff00" />
      {/* Cursor */}
      <rect
        x="10"
        y="24"
        width="2"
        height="2"
        fill="#a6ff00"
        style={{ animation: "blink 1s infinite" }}
      />
    </svg>
  );
}

/* ─── Pixel Arrow Down (scroll indicator) ─── */
export function PixelArrowDown({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={`${className}`}
      style={{
        imageRendering: "pixelated",
        animation: "sprite-bounce 1.5s ease-in-out infinite",
        willChange: "transform",
      }}
    >
      <rect x="7" y="1" width="2" height="10" fill="#a6ff00" />
      <rect x="5" y="8" width="2" height="2" fill="#a6ff00" />
      <rect x="9" y="8" width="2" height="2" fill="#a6ff00" />
      <rect x="3" y="10" width="2" height="2" fill="#a6ff00" />
      <rect x="11" y="10" width="2" height="2" fill="#a6ff00" />
    </svg>
  );
}

/* ─── Pixel Gamepad ─── */
export function PixelGamepad({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 20"
      className={`${className}`}
      style={{ imageRendering: "pixelated" }}
    >
      {/* Body */}
      <rect x="4" y="4" width="24" height="12" fill="#2a2a4a" rx="0" />
      <rect x="2" y="6" width="4" height="8" fill="#2a2a4a" />
      <rect x="26" y="6" width="4" height="8" fill="#2a2a4a" />
      {/* D-pad */}
      <rect x="7" y="8" width="6" height="2" fill="#5a5a7a" />
      <rect x="9" y="6" width="2" height="6" fill="#5a5a7a" />
      {/* Buttons */}
      <rect x="22" y="7" width="2" height="2" fill="#a6ff00" />
      <rect x="25" y="9" width="2" height="2" fill="#c77dff" />
      <rect x="19" y="9" width="2" height="2" fill="#ff6ec7" />
      <rect x="22" y="11" width="2" height="2" fill="#00f0ff" />
      {/* Center buttons */}
      <rect x="14" y="9" width="2" height="1" fill="#5a5a7a" />
    </svg>
  );
}
