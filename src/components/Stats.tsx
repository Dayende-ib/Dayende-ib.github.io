import { Bot, Briefcase, Megaphone, Users } from "lucide-react";
import { getTranslations } from "next-intl/server";

import Container from "@/components/Container";
import { Card, CardContent } from "@/components/ui/card";

const stats = [
  { labelKey: "projectsDelivered", value: "9+", icon: Briefcase },
  { labelKey: "adsCampaigns", value: "+30", icon: Megaphone },
  { labelKey: "communities", value: "+10", icon: Users },
  { labelKey: "aiAutomations", value: "5+", icon: Bot }
];

type StatsProps = {
  locale: string;
};

export default async function Stats({ locale }: StatsProps) {
  const t = await getTranslations({ locale, namespace: "stats" });

  return (
    <section aria-label={t("ariaLabel")} className="py-12">
      <Container>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.labelKey} className="card-glow">
                <CardContent className="flex items-center justify-between gap-4 pt-6">
                  <div>
                    <p className="text-2xl font-semibold text-white">
                      {stat.value}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {t(stat.labelKey)}
                    </p>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-muted/30">
                    <Icon className="h-5 w-5 text-white/80" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
