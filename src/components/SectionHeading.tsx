import type { ReactNode } from "react";

import AnimatedSection from "@/components/AnimatedSection";
import SplitText from "@/components/motion/SplitText";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  /** Numéro de section affiché devant l'eyebrow, ex. "02" */
  index?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  /** Contenu placé à droite du titre (CTA, filtres...) */
  aside?: ReactNode;
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  index,
  title,
  description,
  align = "left",
  aside,
  className
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        aside && "md:flex-row md:items-end md:justify-between",
        align === "center" && "items-center text-center",
        className
      )}
    >
      <div className={cn("space-y-3", align === "center" ? "max-w-3xl" : "max-w-2xl")}>
        {eyebrow ? (
          <AnimatedSection direction="none">
            <p className="eyebrow flex items-center gap-3">
              {index ? <span className="text-primary">{index}</span> : null}
              <span className="h-px w-8 bg-border" aria-hidden />
              {eyebrow}
            </p>
          </AnimatedSection>
        ) : null}
        <h2 className="font-display text-[2rem] font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl">
          <SplitText text={title} />
        </h2>
        {description ? (
          <AnimatedSection delay={0.15}>
            <p className="text-base leading-7 text-muted-foreground sm:text-lg">{description}</p>
          </AnimatedSection>
        ) : null}
      </div>
      {aside ? <AnimatedSection delay={0.2}>{aside}</AnimatedSection> : null}
    </div>
  );
}
