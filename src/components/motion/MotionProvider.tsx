"use client";

import { useEffect, type ReactNode } from "react";
import { LazyMotion, MotionConfig, domMax } from "framer-motion";

/**
 * Charge framer-motion une seule fois pour toute la page, respecte
 * prefers-reduced-motion et alimente l'effet .spotlight-card (halo qui suit
 * la souris) via un unique listener global.
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const card = (event.target as Element | null)?.closest<HTMLElement>(".spotlight-card");
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
      card.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, []);

  return (
    <LazyMotion features={domMax} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
