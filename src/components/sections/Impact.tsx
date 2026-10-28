"use client";

import type { ReactNode } from "react";
import { m } from "framer-motion";
import { ArrowUpRight, Bot, Layers, Megaphone, Smartphone, Trophy, Users } from "lucide-react";
import { useTranslations } from "next-intl";

import { SELECT_SKILL_EVENT } from "@/components/CommandPalette";
import Container from "@/components/Container";
import CountUp from "@/components/motion/CountUp";
import { easeOutExpo } from "@/components/motion/easing";
import { useProjectModal } from "@/components/projects/ProjectProvider";
import SectionHeading from "@/components/SectionHeading";
import { cn } from "@/lib/utils";

type TileAction = { project: string } | { href: string } | { skillDomain: string } | null;

type TileProps = {
  index: number;
  action: TileAction;
  /** Placement dans la grille (col-span / row-span) */
  span?: string;
  className?: string;
  children: ReactNode;
};

function Tile({ index, action, span, className, children }: TileProps) {
  const t = useTranslations("impact");
  const { openProject } = useProjectModal();

  const onClick = () => {
    if (!action) return;
    if ("project" in action) openProject(action.project);
    if ("skillDomain" in action) {
      document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" });
      window.dispatchEvent(new CustomEvent(SELECT_SKILL_EVENT, { detail: { domain: action.skillDomain } }));
    }
  };

  const classes = cn(
    "spotlight-card group relative flex h-full w-full flex-col overflow-hidden rounded-3xl border border-border bg-card p-5 text-left transition-[border-color,transform] duration-300 sm:p-6",
    action && "hover:-translate-y-1 hover:border-foreground/20",
    className
  );

  const cue = action ? (
    <span className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full border border-current opacity-40 transition-all duration-300 group-hover:rotate-45 group-hover:opacity-100">
      <ArrowUpRight className="h-4 w-4" />
      <span className="sr-only">{t("open")}</span>
    </span>
  ) : null;

  return (
    <m.div
      className={cn("h-full", span)}
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay: (index % 4) * 0.08, ease: easeOutExpo }}
    >
      {action && "href" in action ? (
        <a href={action.href} className={classes}>
          {children}
          {cue}
        </a>
      ) : action ? (
        <button type="button" onClick={onClick} className={classes}>
          {children}
          {cue}
        </button>
      ) : (
        <div className={classes}>{children}</div>
      )}
    </m.div>
  );
}

function SmallTile({ id, icon: Icon }: { id: string; icon: typeof Bot }) {
  const t = useTranslations("impact.tiles");
  return (
    <>
      <Icon className="h-5 w-5 text-primary" />
      <div className="mt-auto pt-5">
        <p className="font-display text-5xl font-semibold tracking-tight">
          <CountUp value={t(`${id}.value`)} />
        </p>
        <p className="mt-2 font-medium">{t(`${id}.label`)}</p>
        <p className="mt-1 text-sm leading-6 text-muted-foreground">{t(`${id}.detail`)}</p>
      </div>
    </>
  );
}

export default function Impact() {
  const t = useTranslations("impact");
  const tiles = useTranslations("impact.tiles");
  const bubbles = t.raw("bubbles") as string[];
  const reach = tiles.raw("conversations.stats") as { value: string; label: string }[];

  return (
    <section id="impact" className="py-14 sm:py-20">
      <Container className="space-y-8 sm:space-y-10">
        <SectionHeading index="01" eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />

        <div className="grid auto-rows-[minmax(170px,auto)] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Carte phare : conversations Meta Ads */}
          <Tile index={0} action={{ project: "meta-ads-conversations" }} span="sm:col-span-2 lg:row-span-2" className="bg-gradient-to-br from-primary/15 via-card to-card">
            <p className="eyebrow">{tiles("conversations.kicker")}</p>
            <div className="flex flex-1 flex-col justify-center gap-2 py-5" aria-hidden>
              {bubbles.map((bubble, index) => (
                <m.span
                  key={bubble}
                  className={cn(
                    "w-fit max-w-[80%] rounded-2xl px-4 py-2 text-sm",
                    index % 2 === 0
                      ? "rounded-bl-md bg-accent text-foreground"
                      : "ml-auto rounded-br-md bg-primary text-primary-foreground"
                  )}
                  initial={{ opacity: 0, y: 12, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.35, ease: easeOutExpo }}
                >
                  {bubble}
                </m.span>
              ))}
            </div>
            <div>
              <p className="font-display text-6xl font-semibold tracking-tight sm:text-7xl">
                <CountUp value={tiles("conversations.value")} />
              </p>
              <p className="mt-2 text-lg font-medium">{tiles("conversations.label")}</p>
              <dl className="mt-5 grid grid-cols-2 gap-4 border-t border-border pt-4">
                {reach.map((stat) => (
                  <div key={stat.label} className="flex flex-col-reverse justify-end">
                    <dt className="text-sm text-muted-foreground">{stat.label}</dt>
                    <dd className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                      <CountUp value={stat.value} />
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Tile>

          <Tile index={1} action={{ project: "meta-ads-conversations" }} className="border-transparent bg-signal text-signal-foreground">
            <Megaphone className="h-5 w-5" />
            <div className="mt-auto pt-5">
              <p className="font-display text-5xl font-semibold tracking-tight">
                <CountUp value={tiles("cost.value")} />
              </p>
              <p className="mt-2 font-medium">{tiles("cost.label")}</p>
              <p className="mt-1 text-sm leading-6 opacity-75">{tiles("cost.detail")}</p>
            </div>
          </Tile>

          <Tile index={2} action={{ project: "anam-meteo-eval" }}>
            <div className="relative flex h-10 w-10 items-center justify-center">
              <span className="absolute inset-0 animate-[spin_12s_linear_infinite] rounded-full border border-dashed border-signal/50" />
              <Trophy className="h-5 w-5 text-signal" />
            </div>
            <div className="mt-auto pt-5">
              <p className="font-display text-5xl font-semibold tracking-tight">{tiles("hackathon.value")}</p>
              <p className="mt-2 font-medium">{tiles("hackathon.label")}</p>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">{tiles("hackathon.detail")}</p>
              <p className="mt-3 inline-flex rounded-full border border-border px-3 py-1 font-mono text-[11px] text-muted-foreground">
                {tiles("hackathon.tag")}
              </p>
            </div>
          </Tile>

          <Tile index={3} action={{ href: "#projects" }}>
            <SmallTile id="products" icon={Layers} />
          </Tile>

          <Tile index={4} action={{ skillDomain: "ai" }}>
            <SmallTile id="automations" icon={Bot} />
          </Tile>

          <Tile index={5} action={null}>
            <SmallTile id="campaigns" icon={Megaphone} />
          </Tile>

          <Tile index={6} action={null}>
            <SmallTile id="communities" icon={Users} />
          </Tile>

          <Tile index={7} action={{ project: "mindease" }} span="sm:col-span-2">
            <SmallTile id="channels" icon={Smartphone} />
          </Tile>
        </div>
      </Container>
    </section>
  );
}
