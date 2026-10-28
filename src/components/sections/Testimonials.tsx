"use client";

import { useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { useTranslations } from "next-intl";

import AnimatedSection from "@/components/AnimatedSection";
import Container from "@/components/Container";
import { easeOutExpo } from "@/components/motion/easing";
import SectionHeading from "@/components/SectionHeading";
import { cn } from "@/lib/utils";

const keys = ["t1", "t2", "t3"] as const;

export default function Testimonials() {
  const t = useTranslations("testimonials");
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const key = keys[index];

  const go = (delta: number) => setIndex((current) => (current + delta + keys.length) % keys.length);

  return (
    <section id="testimonials" className="py-14 sm:py-20">
      <Container className="space-y-8 sm:space-y-10">
        <SectionHeading
          index="06"
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
          aside={
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label={t("prev")}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border transition-colors hover:bg-accent"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label={t("next")}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border transition-colors hover:bg-accent"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          }
        />

        <AnimatedSection>
          <div
            className="overflow-hidden rounded-3xl border border-border bg-card"
            onPointerEnter={() => setPaused(true)}
            onPointerLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
          >
            <figure className="relative min-h-[240px] p-6 sm:min-h-[220px] sm:p-9">
              <Quote aria-hidden className="h-10 w-10 text-primary" />
              <AnimatePresence mode="wait" initial={false}>
                <m.div
                  key={key}
                  initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -12, filter: "blur(8px)" }}
                  transition={{ duration: 0.5, ease: easeOutExpo }}
                >
                  <blockquote className="mt-4 max-w-4xl font-display text-xl font-medium leading-snug tracking-tight sm:text-3xl sm:leading-[1.3]">
                    {t(`items.${key}.quote`)}
                  </blockquote>
                </m.div>
              </AnimatePresence>
            </figure>

            <div className="grid grid-cols-3 border-t border-border">
              {keys.map((item, itemIndex) => {
                const isActive = itemIndex === index;
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setIndex(itemIndex)}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "relative flex items-center gap-3 p-4 text-left transition-colors sm:px-6 sm:py-4",
                      itemIndex > 0 && "border-l border-border",
                      isActive ? "bg-accent/60" : "hover:bg-accent/40"
                    )}
                  >
                    <span className="absolute inset-x-0 top-0 h-0.5 bg-transparent">
                      {isActive ? (
                        reduceMotion ? (
                          <span className="block h-full w-full bg-primary" />
                        ) : (
                          <span
                            key={index}
                            className="block h-full w-full origin-left animate-progress bg-primary"
                            style={{ animationPlayState: paused ? "paused" : "running" }}
                            onAnimationEnd={() => go(1)}
                          />
                        )
                      ) : null}
                    </span>
                    <span
                      className={cn(
                        "hidden h-10 w-10 shrink-0 items-center justify-center rounded-full font-mono text-xs font-semibold sm:flex",
                        isActive ? "bg-primary text-primary-foreground" : "bg-accent text-muted-foreground"
                      )}
                    >
                      {t(`items.${item}.initials`)}
                    </span>
                    <span className="min-w-0">
                      <span className={cn("block truncate text-sm font-medium", !isActive && "text-muted-foreground")}>
                        {t(`items.${item}.name`)}
                      </span>
                      <span className="block truncate text-xs text-muted-foreground">{t(`items.${item}.role`)}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
}
