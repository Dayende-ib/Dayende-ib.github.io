"use client";

import type { CSSProperties, PointerEvent, ReactNode } from "react";
import Image from "next/image";
import { m, useMotionValue, useReducedMotion, useSpring, useTransform, type MotionValue } from "framer-motion";
import { ArrowUpRight, Layers, MessageCircle, Trophy } from "lucide-react";

import { easeOutExpo } from "@/components/motion/easing";
import { cn } from "@/lib/utils";

type HeroVisualProps = {
  name: string;
  role: string;
  ringText: string;
  chips: {
    award: { title: string; label: string };
    cost: { value: string; label: string };
    shipped: { value: string; label: string };
  };
};

function FloatingChip({
  children,
  className,
  depth,
  pointerX,
  pointerY,
  delay
}: {
  children: ReactNode;
  className: string;
  depth: number;
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
  delay: number;
}) {
  const x = useTransform(pointerX, (value) => value * depth);
  const y = useTransform(pointerY, (value) => value * depth);

  return (
    <m.div
      className={cn("absolute z-20", className)}
      style={{ x, y }}
      initial={{ opacity: 0, scale: 0.8, filter: "blur(8px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.9, delay, ease: easeOutExpo }}
    >
      <div
        className="animate-float rounded-2xl border border-border bg-popover/90 px-3.5 py-3 shadow-xl shadow-black/20 backdrop-blur-md"
        style={{ animationDelay: `${delay * 2}s` }}
      >
        {children}
      </div>
    </m.div>
  );
}

export default function HeroVisual({ name, role, ringText, chips }: HeroVisualProps) {
  const reduceMotion = useReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const pointerX = useSpring(rawX, { stiffness: 80, damping: 20 });
  const pointerY = useSpring(rawY, { stiffness: 80, damping: 20 });
  const rotateY = useTransform(pointerX, (value) => value * 0.08);
  const rotateX = useTransform(pointerY, (value) => value * -0.08);

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    rawX.set(((event.clientX - rect.left) / rect.width - 0.5) * 40);
    rawY.set(((event.clientY - rect.top) / rect.height - 0.5) * 40);
  };

  const reset = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <div
      className="relative mx-auto w-full max-w-[360px] [perspective:1200px] lg:max-w-none"
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
    >
      {/* Entrée en CSS (visible sans attendre le JS) ; l'inclinaison à la souris reste pilotée par framer-motion */}
      <div className="enter-reveal" style={{ "--enter-delay": "0.15s" } as CSSProperties}>
        <m.div
          className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-border bg-muted shadow-2xl shadow-primary/10"
          style={{ rotateX, rotateY }}
        >
          <Image
            src="/profile-portrait.webp"
            alt={`${name} — ${role}`}
            fill
            priority
            sizes="(max-width: 1024px) 360px, 420px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5 text-white">
            <p className="font-display text-xl font-semibold tracking-tight">{name}</p>
            <p className="mt-0.5 font-mono text-[11px] uppercase tracking-[0.18em] text-white/70">{role}</p>
          </div>
        </m.div>
      </div>

      {/* Badge circulaire qui tourne */}
      <m.a
        href="#contact"
        aria-label={ringText}
        className="group absolute -right-2 -top-6 z-30 flex h-24 w-24 items-center justify-center sm:-right-8 sm:h-28 sm:w-28"
        initial={{ opacity: 0, scale: 0.6, rotate: -45 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 1, delay: 0.9, ease: easeOutExpo }}
      >
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 h-full w-full animate-[spin_18s_linear_infinite]"
          aria-hidden
        >
          <defs>
            <path id="hero-ring" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
          </defs>
          <circle cx="50" cy="50" r="49" className="fill-signal" />
          <text className="fill-signal-foreground font-mono text-[8.6px] uppercase tracking-[0.2em]">
            <textPath href="#hero-ring">{ringText}</textPath>
          </text>
        </svg>
        <ArrowUpRight className="relative h-6 w-6 text-signal-foreground transition-transform duration-300 group-hover:rotate-45" />
      </m.a>

      <FloatingChip
        className="-left-3 top-[14%] sm:-left-10"
        depth={1.1}
        pointerX={pointerX}
        pointerY={pointerY}
        delay={1.05}
      >
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-signal text-signal-foreground">
            <Trophy className="h-4 w-4" />
          </span>
          <div className="leading-tight">
            <p className="text-sm font-semibold">{chips.award.title}</p>
            <p className="text-xs text-muted-foreground">{chips.award.label}</p>
          </div>
        </div>
      </FloatingChip>

      <FloatingChip
        className="-right-2 top-[52%] sm:-right-10"
        depth={-0.9}
        pointerX={pointerX}
        pointerY={pointerY}
        delay={1.2}
      >
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15 text-primary">
            <MessageCircle className="h-4 w-4" />
          </span>
          <div className="leading-tight">
            <p className="font-display text-lg font-semibold text-signal">{chips.cost.value}</p>
            <p className="text-xs text-muted-foreground">{chips.cost.label}</p>
          </div>
        </div>
      </FloatingChip>

      <FloatingChip
        className="-left-2 bottom-[26%] sm:-left-6"
        depth={1.4}
        pointerX={pointerX}
        pointerY={pointerY}
        delay={1.35}
      >
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15 text-primary">
            <Layers className="h-4 w-4" />
          </span>
          <div className="leading-tight">
            <p className="font-display text-lg font-semibold">{chips.shipped.value}</p>
            <p className="text-xs text-muted-foreground">{chips.shipped.label}</p>
          </div>
        </div>
      </FloatingChip>
    </div>
  );
}
