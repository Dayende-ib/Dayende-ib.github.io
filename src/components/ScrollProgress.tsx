"use client";

import { useScroll, useSpring, LazyMotion, domAnimation, m } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 28,
    restDelta: 0.001
  });

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 z-[100] h-[3px] origin-left bg-gradient-to-r from-cyan-400 via-sky-400 to-violet-400"
      />
    </LazyMotion>
  );
}
