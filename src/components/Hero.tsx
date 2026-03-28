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
  tech: "border-cyan-400/25 bg-cyan-500/10 text-cyan-100",
  growth: "border-sky-400/25 bg-sky-500/10 text-sky-100",
  ai: "border-white/10 bg-white/5 text-slate-100"
};

const badgeRows = [
  {
    titleKey: "badges.stack",
    items: [
      { labelKey: "badges.items.next", tone: "tech" },
      { labelKey: "badges.items.react", tone: "tech" },
      { labelKey: "badges.items.laravel", tone: "tech" },
      { labelKey: "badges.items.flutter", tone: "tech" }
    ]
  },
  {
    titleKey: "badges.delivery",
    items: [
      { labelKey: "badges.items.webApps", tone: "tech" },
      { labelKey: "badges.items.mobileApps", tone: "tech" },
      { labelKey: "badges.items.aiAutomation", tone: "ai" },
      { labelKey: "badges.items.googleAds", tone: "growth" }
    ]
  }
] satisfies BadgeRow[];

const proofKeys = ["projectsDelivered", "adsCampaigns", "aiAutomations"] as const;
const spotlightKeys = ["build", "scale", "ship"] as const;

type HeroProps = {
  locale: string;
};

export default async function Hero({ locale }: HeroProps) {
  const t = await getTranslations({ locale, namespace: "hero" });

  return (
    <section id="accueil" className="relative overflow-hidden pt-28 pb-20">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.16),_transparent_38%),radial-gradient(circle_at_85%_18%,_rgba(56,189,248,0.14),_transparent_24%)]" />
      </div>

      <Container className="relative">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_380px] lg:items-center">
          <div className="max-w-3xl space-y-8">
            <div className="space-y-4">
              <Badge
                variant="secondary"
                className="border-cyan-400/20 bg-cyan-500/10 px-4 py-1 text-[11px] uppercase tracking-[0.28em] text-cyan-100"
              >
                {t("eyebrow")}
              </Badge>
              <h1 className="max-w-4xl text-4xl font-semibold leading-[1.02] text-white sm:text-5xl lg:text-6xl">
                {t("title.name")}
                <span className="mt-3 block text-gradient">{t("title.role")}</span>
              </h1>
              <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                {t("description")}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="h-11 rounded-full px-6">
                <Link href="#contact">{t("cta.primary")}</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-11 rounded-full border-border/70 bg-background/30 px-6"
              >
                <Link href="#projects">{t("cta.secondary")}</Link>
              </Button>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {proofKeys.map((key) => (
                <div
                  key={key}
                  className="section-panel card-glow rounded-2xl px-4 py-4"
                >
                  <p className="text-2xl font-semibold text-white">
                    {t(`proofs.${key}.value`)}
                  </p>
                  <p className="mt-1 text-sm text-white/90">
                    {t(`proofs.${key}.label`)}
                  </p>
                  <p className="mt-2 text-xs leading-5 text-muted-foreground">
                    {t(`proofs.${key}.detail`)}
                  </p>
                </div>
              ))}
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

          <aside className="section-panel card-glow relative overflow-hidden p-6 sm:p-7">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent" />
            <div className="space-y-6">
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.32em] text-cyan-200/80">
                  {t("spotlight.eyebrow")}
                </p>
                <h2 className="text-2xl font-semibold text-white">
                  {t("spotlight.title")}
                </h2>
                <p className="text-sm leading-6 text-muted-foreground">
                  {t("spotlight.description")}
                </p>
              </div>

              <div className="grid gap-3">
                {spotlightKeys.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-border/70 bg-background/40 p-4"
                  >
                    <p className="text-sm font-medium text-white">
                      {t(`spotlight.items.${item}.title`)}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      {t(`spotlight.items.${item}.description`)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl border border-cyan-400/20 bg-cyan-500/10 p-4">
                <p className="text-sm font-medium text-cyan-50">
                  {t("availability.title")}
                </p>
                <p className="mt-1 text-sm leading-6 text-cyan-100/75">
                  {t("availability.description")}
                </p>
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}
