"use client";

import { m } from "framer-motion";

import { easeOutExpo } from "@/components/motion/easing";
import RotatingWords from "@/components/motion/RotatingWords";
import SplitText from "@/components/motion/SplitText";

type HeroHeadlineProps = {
  before: string;
  words: string[];
  lead: string;
  highlight: string;
  tail: string;
};

export default function HeroHeadline({ before, words, lead, highlight, tail }: HeroHeadlineProps) {
  return (
    <h1 className="font-display text-[2.55rem] font-semibold leading-[1.02] tracking-[-0.035em] sm:text-6xl lg:text-[4.4rem]">
      <span className="block">
        <SplitText text={before} immediate delay={0.25} />{" "}
        <m.span
          className="inline-block text-primary"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45, ease: easeOutExpo }}
        >
          <RotatingWords words={words} />
        </m.span>
      </span>
      <span className="block text-foreground/90">
        <SplitText text={lead} immediate delay={0.55} />{" "}
        <span className="relative inline-block">
          <SplitText text={highlight} immediate delay={0.7} />
          <svg
            aria-hidden
            viewBox="0 0 300 20"
            preserveAspectRatio="none"
            className="absolute -bottom-1 left-0 h-[0.28em] w-full overflow-visible text-signal"
          >
            <m.path
              d="M2 14 C 60 4, 140 4, 200 10 S 280 16, 298 6"
              fill="none"
              stroke="currentColor"
              strokeWidth="5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.1, delay: 1.2, ease: easeOutExpo }}
            />
          </svg>
        </span>
        {tail ? (
          <>
            {" "}
            <SplitText text={tail} immediate delay={0.8} />
          </>
        ) : null}
      </span>
    </h1>
  );
}
