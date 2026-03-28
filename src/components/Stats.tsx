import { Bot, Briefcase, Megaphone, Users } from "lucide-react";
import { getTranslations } from "next-intl/server";

import Container from "@/components/Container";
import { Card, CardContent } from "@/components/ui/card";

const stats = [
  { labelKey: "projectsDelivered", valueKey: "projectsDeliveredValue", icon: Briefcase },
  { labelKey: "adsCampaigns", valueKey: "adsCampaignsValue", icon: Megaphone },
  { labelKey: "communities", valueKey: "communitiesValue", icon: Users },
  { labelKey: "aiAutomations", valueKey: "aiAutomationsValue", icon: Bot }
];

type StatsProps = {
  locale: string;
};

export default async function Stats({ locale }: StatsProps) {
  const t = await getTranslations({ locale, namespace: "stats" });

  return (
    <section aria-label={t("ariaLabel")} className="py-8 sm:py-10">
      <Container>
        <div className="section-panel card-glow rounded-[28px] p-4 sm:p-6">
          <div className="mb-5 flex items-center justify-between gap-4 border-b border-border/60 pb-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/80">
                {t("eyebrow")}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{t("intro")}</p>
            </div>
            <p className="hidden text-xs text-muted-foreground sm:block">
              {t("confidence")}
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <Card
                  key={stat.labelKey}
                  className="rounded-2xl border-border/70 bg-background/45 shadow-none"
                >
                  <CardContent className="flex items-center justify-between gap-4 p-5">
                    <div>
                      <p className="text-2xl font-semibold text-white">
                        {t(stat.valueKey)}
                      </p>
                      <p className="mt-1 text-sm text-white/90">
                        {t(stat.labelKey)}
                      </p>
                      <p className="mt-2 text-xs leading-5 text-muted-foreground">
                        {t(`${stat.labelKey}Detail`)}
                      </p>
                    </div>
                    <div className="flex h-11 w-11 items-center justify-center rounded-full border border-cyan-400/20 bg-cyan-500/10">
                      <Icon className="h-5 w-5 text-cyan-100" />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
