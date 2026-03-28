"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface AnimatedCounterProps {
  value: string; // e.g. "9+" or "30+"
  className?: string;
}

export default function AnimatedCounter({ value, className }: AnimatedCounterProps) {
  // Parse suffix like "+" or "x"
  const match = value.match(/^(\d+)(.*)$/);
  const numericPart = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : "";

  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (!isInView) return;
    const duration = 1400;
    const steps = 40;
    const stepTime = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += 1;
      setCount(Math.round((current / steps) * numericPart));
      if (current >= steps) {
        setCount(numericPart);
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, numericPart]);

  return (
    <span ref={ref} className={className}>
      {count}{suffix}
    </span>
  );
}
