"use client";

import { m, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 28,
    restDelta: 0.001
  });

  return (
    <m.div
      aria-hidden
      style={{ scaleX }}
      className="fixed left-0 right-0 top-0 z-[100] h-0.5 origin-left bg-gradient-to-r from-primary to-signal"
    />
  );
}
