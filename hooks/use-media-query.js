"use client";

import { useState, useEffect } from "react";

/**
 * Returns true when viewport width is ≤ the given breakpoint.
 * @param {number} breakpoint - Max-width in pixels (default 768)
 */
export function useMediaQuery(breakpoint = 768) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint}px)`);

    function handleChange(e) {
      setMatches(e.matches);
    }

    setMatches(mql.matches);
    mql.addEventListener("change", handleChange);

    return () => mql.removeEventListener("change", handleChange);
  }, [breakpoint]);

  return matches;
}

