"use client";

import { useState, useEffect } from "react";

/**
 * useActiveSection — scrollspy hook.
 *
 * Returns the id of the section currently in view. A section becomes
 * active once its top edge crosses a trigger line at `trigger` * viewport
 * height (default 40%). The last section whose top has passed that line
 * wins, so the active id advances naturally as the page scrolls down and
 * retreats as it scrolls up.
 *
 * Uses a single rAF-throttled scroll + resize listener. This is compatible
 * with Lenis, which performs real scrolling and dispatches native scroll
 * events. Re-renders only happen when the active id actually changes
 * (React bails out on an identical primitive state value).
 *
 * @param {string[]} ids     - section ids to observe, in document order
 * @param {number}   trigger - fraction of viewport height used as the
 *                            trigger line (default 0.4)
 * @returns {string} active section id
 */
export function useActiveSection(ids, trigger = 0.4) {
  const [activeId, setActiveId] = useState(ids[0] ?? "");

  useEffect(() => {
    let rafId = null;

    function update() {
      const line = window.innerHeight * trigger;
      let current = ids[0] ?? "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) {
          current = id;
        }
      }
      setActiveId((prev) => (prev === current ? prev : current));
    }

    function onScroll() {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
    // ids is expected to be a stable, module-level constant from the caller.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids, trigger]);

  return activeId;
}
