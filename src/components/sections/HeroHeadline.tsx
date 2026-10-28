"use client";

import { m } from "framer-motion";

import Enter, { EnterWords } from "@/components/motion/Enter";
import { easeOutExpo } from "@/components/motion/easing";
import RotatingWords from "@/components/motion/RotatingWords";

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
        <EnterWords text={before} delay={0.05} />{" "}
        <Enter as="span" delay={0.2} className="inline-block text-primary">
          <RotatingWords words={words} />
        </Enter>
      </span>
      <span className="block text-foreground/90">
        <EnterWords text={lead} delay={0.25} />{" "}
        <span className="relative inline-block">
          <EnterWords text={highlight} delay={0.35} />
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
              transition={{ duration: 1.1, delay: 0.6, ease: easeOutExpo }}
            />
          </svg>
        </span>
        {tail ? (
          <>
            {" "}
            <EnterWords text={tail} delay={0.4} />
          </>
        ) : null}
      </span>
    </h1>
  );
}
