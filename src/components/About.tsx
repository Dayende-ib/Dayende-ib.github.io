import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";

type AboutProps = {
  locale: string;
};

export default async function About({ locale }: AboutProps) {
  const t = await getTranslations({ locale, namespace: "about" });

  const skills = [
    t("skills.items.architecture"),
    t("skills.items.flutter"),
    t("skills.items.backend"),
    t("skills.items.tracking"),
    t("skills.items.ads"),
    t("skills.items.automation")
  ];

  return (
    <section id="about" className="py-20">
      <Container className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div className="space-y-6">
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
          />
          <div className="space-y-3 text-base text-muted-foreground">
            <p>{t("description")}</p>
            <p>{t("location")}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href="#contact">{t("cta.primary")}</Link>
            </Button>
            <Button asChild variant="outline">
              <a
                href="/cv/ibrahim-dayende-cv.pdf"
                target="_blank"
                rel="noreferrer"
              >
                {t("cta.secondary")}
              </a>
            </Button>
          </div>
        </div>
        <div className="space-y-6">
          <div className="relative mx-auto h-72 w-56 overflow-hidden rounded-3xl border border-border/60 bg-muted/30 shadow-glow">
            <Image
              src="/profile-ibrahim-dayende.webp"
              alt="Photo de profil Ibrahim Dayende - Full-stack Developper"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 60vw, 320px"
            />
          </div>
          <div className="rounded-2xl border border-border/60 bg-muted/30 p-6">
            <p className="text-sm text-muted-foreground">{t("skills.title")}</p>
            <ul className="mt-4 space-y-3 text-sm text-foreground">
              {skills.map((skill) => (
                <li key={skill} className="flex items-start gap-3">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-gradient-to-r from-violet-400 to-cyan-300" />
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
