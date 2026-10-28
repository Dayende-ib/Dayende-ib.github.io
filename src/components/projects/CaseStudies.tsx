"use client";

import { useRef } from "react";
import Image from "next/image";
import { m, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ArrowUpRight, BookOpen } from "lucide-react";
import { useTranslations } from "next-intl";

import { easeOutExpo } from "@/components/motion/easing";
import ProjectBadges from "@/components/projects/ProjectBadges";
import { useProjectModal } from "@/components/projects/ProjectProvider";
import { useProjectContent } from "@/components/projects/useProjectContent";
import { Button } from "@/components/ui/button";
import { caseStudyIds, projectsById } from "@/data/projects";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { cn } from "@/lib/utils";

function CaseCard({
  id,
  index,
  total,
  progress,
  stacked
}: {
  id: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
  stacked: boolean;
}) {
  const t = useTranslations("projects");
  const getContent = useProjectContent();
  const { openProject } = useProjectModal();
  const project = projectsById[id];
  const content = getContent(id);

  // Les cartes du dessous rétrécissent à mesure que les suivantes les recouvrent
  const targetScale = 1 - (total - index - 1) * 0.04;
  const scale = useTransform(progress, [index / total, 1], [1, targetScale]);

  return (
    <div
      // Seules les cartes recouvertes par une suivante gardent une hauteur de défilement
      className={cn("lg:sticky lg:flex lg:items-start", index < total - 1 && "lg:h-[80vh]")}
      style={{ top: `calc(6rem + ${index * 1.25}rem)` }}
    >
      <m.article
        style={{ scale: stacked ? scale : 1 }}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: easeOutExpo }}
        className="group grid w-full grid-cols-1 origin-top overflow-hidden rounded-[2rem] border border-border bg-card shadow-[0_-24px_60px_-40px_rgba(0,0,0,0.6)] lg:h-[min(480px,68vh)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]"
      >
        <div className="flex flex-col p-5 sm:p-7">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="font-mono text-xs text-muted-foreground">
              <span className="text-foreground">{String(index + 1).padStart(2, "0")}</span> / {String(total).padStart(2, "0")}
            </span>
            <ProjectBadges project={project} />
          </div>

          <h3 className="mt-4 font-display text-2xl font-semibold leading-tight tracking-tight sm:text-[2rem]">
            {content.title}
          </h3>
          <p className="mt-3 line-clamp-4 leading-7 text-muted-foreground">
            {content.caseStudy?.challenge ?? content.description}
          </p>

          {content.metrics.length ? (
            <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3">
              {content.metrics.slice(0, 3).map((metric) => (
                <div key={metric.label} className="flex flex-col-reverse justify-end">
                  <dt className="mt-1 text-xs leading-5 text-muted-foreground">{metric.label}</dt>
                  <dd className="font-display text-3xl font-semibold tracking-tight text-signal">{metric.value}</dd>
                </div>
              ))}
            </dl>
          ) : null}

          <div className="mt-auto flex flex-wrap gap-2 pt-6">
            <Button onClick={() => openProject(id)}>
              <BookOpen />
              {t("cta.readCase")}
            </Button>
            {project.liveUrl ? (
              <Button asChild variant="outline">
                <a href={project.liveUrl} target="_blank" rel="noreferrer">
                  {t("cta.viewProject")}
                  <ArrowUpRight />
                </a>
              </Button>
            ) : null}
          </div>
        </div>

        <button
          type="button"
          onClick={() => openProject(id)}
          aria-label={`${t("cta.readCase")} : ${content.title}`}
          className="relative order-first aspect-[16/10] overflow-hidden bg-muted lg:order-none lg:m-2.5 lg:aspect-auto lg:rounded-[1.5rem]"
        >
          <Image
            src={project.image}
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 560px"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 flex flex-wrap gap-1.5">
            {project.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="rounded-full bg-black/50 px-2.5 py-1 text-[11px] text-white backdrop-blur">
                {tag}
              </span>
            ))}
          </div>
        </button>
      </m.article>
    </div>
  );
}

export default function CaseStudies() {
  const ref = useRef<HTMLDivElement>(null);
  const stacked = useMediaQuery("(min-width: 1024px)");
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <div ref={ref} className="relative space-y-4 lg:space-y-0">
      {caseStudyIds.map((id, index) => (
        <CaseCard
          key={id}
          id={id}
          index={index}
          total={caseStudyIds.length}
          progress={scrollYProgress}
          stacked={stacked}
        />
      ))}
    </div>
  );
}
