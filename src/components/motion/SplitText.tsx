"use client";

import { m } from "framer-motion";

import { easeOutExpo } from "@/components/motion/easing";
import { cn } from "@/lib/utils";

type SplitTextProps = {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  /** Anime dès le montage plutôt qu'à l'entrée dans le viewport */
  immediate?: boolean;
};

/** Révèle un texte mot par mot, chaque mot sortant d'un masque. */
export default function SplitText({
  text,
  className,
  delay = 0,
  stagger = 0.045,
  immediate = false
}: SplitTextProps) {
  const words = text.split(" ");
  const trigger = immediate
    ? { animate: "visible" }
    : { whileInView: "visible", viewport: { once: true, margin: "-40px" } };

  return (
    <span className={cn("relative", className)}>
      <span className="sr-only">{text}</span>
      <m.span
        aria-hidden
        initial="hidden"
        {...trigger}
        transition={{ staggerChildren: stagger, delayChildren: delay }}
      >
        {words.map((word, index) => (
          <span key={`${word}-${index}`}>
            <span className="-mb-[0.14em] inline-block overflow-hidden pb-[0.14em] align-bottom">
              <m.span
                className="inline-block will-change-transform"
                variants={{
                  hidden: { y: "105%" },
                  visible: { y: "0%", transition: { duration: 0.9, ease: easeOutExpo } }
                }}
              >
                {word}
              </m.span>
            </span>
            {index < words.length - 1 ? " " : null}
          </span>
        ))}
      </m.span>
    </span>
  );
}
