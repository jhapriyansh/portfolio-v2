"use client";

import { useEffect } from "react";

export default function VisitTracker() {
  useEffect(() => {
    const track = () => {
      try {
        fetch("/api/visits", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            path: window.location.pathname,
            referrer: document.referrer || undefined,
          }),
        }).catch(() => {});
      } catch {
        // silently fail
      }
    };
    track();
  }, []);

  return null;
}
