import type { CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/utils";

type MarqueeProps = {
  children: ReactNode;
  className?: string;
  /** Durée d'un tour complet, en secondes */
  duration?: number;
};

/** Défilement infini en CSS pur, mis en pause au survol. */
export default function Marquee({ children, className, duration = 40 }: MarqueeProps) {
  return (
    <div
      className={cn("group flex overflow-hidden mask-fade-x", className)}
      style={{ "--marquee-duration": `${duration}s` } as CSSProperties}
    >
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
        <div className="flex shrink-0 items-center gap-10 pr-10">{children}</div>
        <div aria-hidden className="flex shrink-0 items-center gap-10 pr-10">
          {children}
        </div>
      </div>
    </div>
  );
}
