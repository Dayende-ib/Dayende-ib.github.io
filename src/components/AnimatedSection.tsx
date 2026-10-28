"use client";

import type { ReactNode } from "react";
import { m } from "framer-motion";

import { easeOutExpo } from "@/components/motion/easing";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
}

const offsets = {
  up: { y: 28 },
  left: { x: -28 },
  right: { x: 28 },
  none: {}
} as const;

export default function AnimatedSection({
  children,
  className,
  delay = 0,
  direction = "up"
}: AnimatedSectionProps) {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, filter: "blur(6px)", ...offsets[direction] }}
      whileInView={{ opacity: 1, filter: "blur(0px)", x: 0, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay, ease: easeOutExpo }}
    >
      {children}
    </m.div>
  );
}
