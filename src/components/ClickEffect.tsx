"use client";

import { useEffect } from "react";

export default function ClickEffect() {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const lineCount = 8;
      for (let i = 0; i < lineCount; i++) {
        const angle = (360 / lineCount) * i;
        const el = document.createElement("div");
        el.className = "pixel-click-line";
        el.style.left = `${e.clientX - 1}px`;
        el.style.top = `${e.clientY - 1}px`;
        el.style.transformOrigin = "center top";
        el.style.transform = `rotate(${angle}deg) scaleY(0)`;
        document.body.appendChild(el);
        el.addEventListener("animationend", () => el.remove());
      }
    };
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  return null;
}
