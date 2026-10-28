"use client";

import { useRef } from "react";
import { m, useScroll, useSpring } from "framer-motion";
import { useTranslations } from "next-intl";

import { easeOutExpo } from "@/components/motion/easing";

const stepKeys = ["scope", "prototype", "ship", "measure"] as const;

export default function Process() {
  const t = useTranslations("services.process");
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <ol ref={ref} className="relative grid gap-7 pl-8 lg:grid-cols-4 lg:gap-6 lg:pl-0 lg:pt-10">
      {/* Rail + remplissage : vertical sur mobile, horizontal sur desktop */}
      <span aria-hidden className="absolute bottom-2 left-[7px] top-2 w-px bg-border lg:hidden" />
      <m.span
        aria-hidden
        className="absolute bottom-2 left-[7px] top-2 w-px origin-top bg-primary lg:hidden"
        style={{ scaleY: progress }}
      />
      <span aria-hidden className="absolute left-0 right-0 top-[7px] hidden h-px bg-border lg:block" />
      <m.span
        aria-hidden
        className="absolute left-0 right-0 top-[7px] hidden h-px origin-left bg-primary lg:block"
        style={{ scaleX: progress }}
      />

      {stepKeys.map((key, index) => (
        <m.li
          key={key}
          className="relative"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: index * 0.12, ease: easeOutExpo }}
        >
          <span
            aria-hidden
            className="absolute -left-8 top-1 h-[15px] w-[15px] rounded-full border-4 border-card bg-primary lg:-top-10 lg:left-0"
          />
          <p className="font-mono text-xs text-primary">{String(index + 1).padStart(2, "0")}</p>
          <h4 className="mt-2 font-display text-xl font-semibold tracking-tight">{t(`steps.${key}.title`)}</h4>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{t(`steps.${key}.description`)}</p>
          <p className="mt-3 inline-flex rounded-full bg-accent px-3 py-1 font-mono text-[11px] text-muted-foreground">
            {t(`steps.${key}.deliverable`)}
          </p>
        </m.li>
      ))}
    </ol>
  );
}
