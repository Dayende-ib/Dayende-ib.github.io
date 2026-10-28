"use client";

import { useEffect, useState } from "react";
import { useAnimate, useReducedMotion } from "framer-motion";

import { easeOutExpo } from "@/components/motion/easing";
import { cn } from "@/lib/utils";

type RotatingWordsProps = {
  words: string[];
  className?: string;
  interval?: number;
};

/**
 * Le mot visible reste le même élément DOM : seul son texte change.
 * Recréer l'élément à chaque mot ferait recalculer le LCP à chaque rotation
 * et le repousserait de plusieurs secondes.
 */
export default function RotatingWords({ words, className, interval = 2600 }: RotatingWordsProps) {
  const [index, setIndex] = useState(0);
  const [scope, animate] = useAnimate<HTMLSpanElement>();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    let cancelled = false;
    const id = window.setInterval(async () => {
      if (!reduceMotion) {
        await animate(scope.current, { y: "-45%", opacity: 0 }, { duration: 0.25, ease: "easeIn" });
      }
      if (cancelled) return;
      setIndex((prev) => (prev + 1) % words.length);
      if (!reduceMotion) {
        animate(scope.current, { y: ["45%", "0%"], opacity: [0, 1] }, { duration: 0.5, ease: easeOutExpo });
      }
    }, interval);
    return () => {
      cancelled = true;
      window.clearInterval(id);
    };
  }, [animate, scope, words.length, interval, reduceMotion]);

  return (
    <span className={cn("relative inline-grid", className)}>
      <span className="sr-only">{words.join(", ")}</span>
      {/* Réserve la largeur du mot le plus long pour éviter les sauts de mise en page */}
      {words.map((word) => (
        <span key={word} aria-hidden className="invisible col-start-1 row-start-1">
          {word}
        </span>
      ))}
      <span ref={scope} aria-hidden className="col-start-1 row-start-1">
        {words[index]}
      </span>
    </span>
  );
}
