import Link from "next/link";
import { getTranslations } from "next-intl/server";

import Container from "@/components/Container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type BadgeTone = "tech" | "growth" | "ai";

type BadgeRow = {
  titleKey: string;
  items: Array<{ labelKey: string; tone: BadgeTone }>;
};

const badgeToneClasses: Record<BadgeTone, string> = {
  tech: "border-cyan-400/30 bg-cyan-500/10 text-cyan-100",
  growth: "border-fuchsia-400/30 bg-fuchsia-500/10 text-fuchsia-100",
  ai: "border-violet-400/30 bg-gradient-to-r from-violet-500/20 to-blue-500/20 text-violet-50"
};

const badgeRows = [
  {
    titleKey: "badges.stack",
    items: [
      { labelKey: "badges.items.next", tone: "tech" },
      { labelKey: "badges.items.react", tone: "tech" },
      { labelKey: "badges.items.laravel", tone: "tech" },
      { labelKey: "badges.items.flutter", tone: "tech" },
      { labelKey: "badges.items.node", tone: "tech" }
    ]
  },
  {
    titleKey: "badges.languages",
    items: [
      { labelKey: "badges.items.javascript", tone: "tech" },
      { labelKey: "badges.items.typescript", tone: "tech" },
      { labelKey: "badges.items.php", tone: "tech" },
      { labelKey: "badges.items.dart", tone: "tech" },
      { labelKey: "badges.items.python", tone: "tech" }
    ]
  },
  {
    titleKey: "badges.growthAi",
    items: [
      { labelKey: "badges.items.aiAutomation", tone: "ai" },
      { labelKey: "badges.items.metaAds", tone: "growth" },
      { labelKey: "badges.items.googleAds", tone: "growth" },
      { labelKey: "badges.items.community", tone: "growth" }
    ]
  }
] satisfies BadgeRow[];

type HeroProps = {
  locale: string;
};

export default async function Hero({ locale }: HeroProps) {
  const t = await getTranslations({ locale, namespace: "hero" });

  return (
    <section id="accueil" className="relative overflow-hidden pt-28 pb-20">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid opacity-25" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(124,58,237,0.35),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(34,211,238,0.25),_transparent_50%)] bg-[length:200%_200%] animate-gradient-slow" />
      </div>
      <Container className="relative">
        <div className="max-w-3xl space-y-6">
          <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
            {t("title.name")}{" "}
            <br />
            <span className="text-gradient">{t("title.role")}</span>
          </h1>
          <p className="text-base text-muted-foreground sm:text-lg">
            {t("description")}
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href="#contact">{t("cta.primary")}</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="#projects">{t("cta.secondary")}</Link>
            </Button>
          </div>
          <div className="space-y-4">
            {badgeRows.map((row) => (
              <div key={row.titleKey} className="space-y-2">
                <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                  {t(row.titleKey)}
                </p>
                <div className="flex flex-wrap gap-2">
                  {row.items.map((badge) => (
                    <Badge
                      key={badge.labelKey}
                      variant="secondary"
                      className={badgeToneClasses[badge.tone]}
                    >
                      {t(badge.labelKey)}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
