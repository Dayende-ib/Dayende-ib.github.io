"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, m } from "framer-motion";

import { easeOutExpo } from "@/components/motion/easing";
import { cn } from "@/lib/utils";

type RotatingWordsProps = {
  words: string[];
  className?: string;
  interval?: number;
};

export default function RotatingWords({ words, className, interval = 2600 }: RotatingWordsProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setIndex((prev) => (prev + 1) % words.length), interval);
    return () => window.clearInterval(id);
  }, [words.length, interval]);

  return (
    <span className={cn("relative inline-grid", className)}>
      <span className="sr-only">{words.join(", ")}</span>
      {/* Réserve la largeur du mot le plus long pour éviter les sauts de mise en page */}
      {words.map((word) => (
        <span key={word} aria-hidden className="invisible col-start-1 row-start-1">
          {word}
        </span>
      ))}
      <AnimatePresence mode="wait" initial={false}>
        <m.span
          key={words[index]}
          aria-hidden
          className="col-start-1 row-start-1"
          initial={{ y: "45%", opacity: 0, filter: "blur(10px)" }}
          animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "-45%", opacity: 0, filter: "blur(10px)" }}
          transition={{ duration: 0.55, ease: easeOutExpo }}
        >
          {words[index]}
        </m.span>
      </AnimatePresence>
    </span>
  );
}
