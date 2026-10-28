"use client";

import { useRef } from "react";
import { m, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  // 0.5 minimum : contraste ≥ 3:1 (texte large) même avant le passage du scroll
  const opacity = useTransform(progress, range, [0.5, 1]);
  return <m.span style={{ opacity }}>{children}</m.span>;
}

/** Les mots s'allument un à un au fil du scroll. */
export default function ScrollRevealText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 50%"] });
  const words = text.split(" ");

  if (reduceMotion) return <p className={className}>{text}</p>;

  return (
    <p ref={ref} className={className}>
      {words.map((word, index) => (
        <span key={`${word}-${index}`}>
          <Word progress={scrollYProgress} range={[index / words.length, (index + 1) / words.length]}>
            {word}
          </Word>
          {index < words.length - 1 ? " " : null}
        </span>
      ))}
    </p>
  );
}
