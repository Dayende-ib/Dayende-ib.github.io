"use client";

import { Briefcase, Globe, GraduationCap, Sparkles, Timer, Trophy } from "lucide-react";
import { useTranslations } from "next-intl";

import { Badge } from "@/components/ui/badge";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

export default function ProjectBadges({
  project,
  className,
  withCategory = true
}: {
  project: Project;
  className?: string;
  withCategory?: boolean;
}) {
  const t = useTranslations("projects");

  return (
    <div className={cn("flex flex-wrap gap-1.5", className)}>
      {withCategory ? (
        <Badge variant="outline" className="bg-background/90 font-mono text-[10px] uppercase tracking-wider">
          {t(`categories.${project.category}`)}
        </Badge>
      ) : null}
      {project.award ? (
        <Badge variant="signal" className="bg-background/90 text-[10px]">
          <Trophy className="h-3 w-3" />
          {t("badges.hackathonWinner")}
        </Badge>
      ) : null}
      {project.clientProject ? (
        <Badge variant="primary" className="bg-background/90 text-[10px]">
          <Briefcase className="h-3 w-3" />
          {t("badges.client")}
        </Badge>
      ) : null}
      {project.liveUrl ? (
        <Badge variant="outline" className="bg-background/90 text-[10px]">
          <Globe className="h-3 w-3" />
          {t("badges.live")}
        </Badge>
      ) : null}
      {project.academic ? (
        <Badge variant="outline" className="bg-background/90 text-[10px]">
          <GraduationCap className="h-3 w-3" />
          {t("badges.academic")}
        </Badge>
      ) : null}
      {project.status === "wip" ? (
        <Badge variant="outline" className="bg-background/90 text-[10px]">
          <Timer className="h-3 w-3" />
          {t("badges.wip")}
        </Badge>
      ) : null}
      {project.demoPath ? (
        <Badge variant="outline" className="bg-background/90 text-[10px]">
          <Sparkles className="h-3 w-3" />
          {t("badges.demo")}
        </Badge>
      ) : null}
    </div>
  );
}
