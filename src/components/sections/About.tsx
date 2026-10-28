import Image from "next/image";
import { Clock, Github, GraduationCap, Handshake, Linkedin, MapPin, Timer, Trophy } from "lucide-react";
import { getTranslations } from "next-intl/server";

import AnimatedSection from "@/components/AnimatedSection";
import Container from "@/components/Container";
import LocalTime from "@/components/LocalTime";
import ScrollRevealText from "@/components/motion/ScrollRevealText";
import SectionHeading from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { site } from "@/data/site";

const valueKeys = ["product", "execution", "growth"] as const;

const learningPlatforms = [
  { name: "Coursera", src: "/certification/Cousera.png", width: 155, height: 22 },
  { name: "Udemy", src: "/certification/udemy.webp", width: 78, height: 32 },
  { name: "Cursa", src: "/certification/Cursa.jpg", width: 32, height: 32 },
  { name: "Blemama", src: "/certification/Blemama.webp", width: 120, height: 27 }
];

export default async function About({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "about" });

  const facts = [
    { icon: MapPin, label: t("facts.location.label"), value: t("facts.location.value") },
    {
      icon: GraduationCap,
      label: t("facts.education.label"),
      value: (
        <>
          <span className="block">{t("facts.education.value")}</span>
          <span className="block text-xs font-normal text-muted-foreground">{t("facts.education.detail")}</span>
        </>
      )
    },
    { icon: Clock, label: t("facts.time.label"), value: <LocalTime /> },
    { icon: Handshake, label: t("facts.collaboration.label"), value: t("facts.collaboration.value") },
    { icon: Timer, label: t("facts.response.label"), value: t("facts.response.value") }
  ];

  return (
    <section id="about" className="py-14 sm:py-20">
      <Container className="space-y-8 sm:space-y-10">
        <SectionHeading index="05" eyebrow={t("eyebrow")} title={t("title")} />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-12">
          <AnimatedSection direction="left" className="lg:sticky lg:top-28 lg:self-start">
            <aside className="overflow-hidden rounded-3xl border border-border bg-card">
              <div className="relative h-24 bg-gradient-to-br from-primary/40 via-primary/10 to-transparent">
                <div className="absolute inset-0 bg-grid opacity-60" />
              </div>
              <div className="-mt-10 space-y-5 p-5">
                <Image
                  src="/logo.png"
                  alt=""
                  width={72}
                  height={72}
                  className="relative h-[72px] w-[72px] drop-shadow-xl"
                />
                <div>
                  <p className="font-display text-2xl font-semibold tracking-tight">{site.name}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{t("role")}</p>
                </div>
                <dl className="divide-y divide-border border-y border-border">
                  {facts.map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-center gap-3 py-3 text-sm">
                      <Icon className="h-4 w-4 shrink-0 text-primary" />
                      <dt className="text-muted-foreground">{label}</dt>
                      <dd className="ml-auto text-right font-medium">{value}</dd>
                    </div>
                  ))}
                </dl>
                <div className="flex gap-2">
                  <Button asChild variant="outline" size="sm" className="flex-1">
                    <a href={site.linkedin} target="_blank" rel="noreferrer">
                      <Linkedin />
                      LinkedIn
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="sm" className="flex-1">
                    <a href={site.github} target="_blank" rel="noreferrer">
                      <Github />
                      GitHub
                    </a>
                  </Button>
                </div>
              </div>
            </aside>
          </AnimatedSection>

          <div className="space-y-8">
            <ScrollRevealText
              text={t("statement")}
              className="font-display text-2xl font-medium leading-snug tracking-tight sm:text-[2rem] sm:leading-[1.3]"
            />

            <AnimatedSection>
              <p className="max-w-2xl text-lg leading-8 text-muted-foreground">{t("bio")}</p>
            </AnimatedSection>

            <ol className="border-t border-border">
              {valueKeys.map((key, index) => (
                <li key={key} className="group border-b border-border">
                  <AnimatedSection
                    delay={index * 0.08}
                    className="grid gap-2 py-5 sm:grid-cols-[4rem_minmax(0,0.8fr)_minmax(0,1.2fr)] sm:gap-6"
                  >
                    <span className="font-mono text-sm text-primary">0{index + 1}</span>
                    <h3 className="font-display text-xl font-semibold tracking-tight transition-transform duration-500 group-hover:translate-x-1">
                      {t(`values.${key}.title`)}
                    </h3>
                    <p className="leading-7 text-muted-foreground">{t(`values.${key}.description`)}</p>
                  </AnimatedSection>
                </li>
              ))}
            </ol>

            <AnimatedSection>
              <div className="relative overflow-hidden rounded-3xl border border-signal/30 bg-signal/[0.06] p-5 sm:p-6">
                <Trophy aria-hidden className="absolute -right-6 -top-6 h-36 w-36 rotate-12 text-signal/10" />
                <p className="eyebrow text-signal">{t("achievement.eyebrow")}</p>
                <p className="mt-3 font-display text-2xl font-semibold tracking-tight">{t("achievement.title")}</p>
                <p className="mt-3 max-w-xl leading-7 text-muted-foreground">{t("achievement.description")}</p>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <p className="font-display text-lg font-semibold tracking-tight">{t("selfTaught")}</p>
              <p className="eyebrow mb-4 mt-1">{t("learning")}</p>
              <ul className="flex flex-wrap items-center gap-3">
                {learningPlatforms.map((platform) => (
                  <li key={platform.name} className="flex h-14 items-center rounded-2xl border border-border bg-white px-5 grayscale transition duration-300 hover:grayscale-0">
                    <Image
                      src={platform.src}
                      alt={platform.name}
                      width={platform.width}
                      height={platform.height}
                      className="h-auto max-h-8 w-auto"
                    />
                  </li>
                ))}
                {/* Pas de fichier logo fourni : marque reconstituée (carré "in" + Learning) */}
                <li className="flex h-14 items-center rounded-2xl border border-border bg-white px-5 grayscale transition duration-300 hover:grayscale-0">
                  <span role="img" aria-label="LinkedIn Learning" className="flex items-center gap-1.5">
                    <span aria-hidden className="flex h-7 w-7 items-center justify-center rounded-md bg-[#0A66C2] text-white">
                      <Linkedin className="h-4 w-4" fill="currentColor" strokeWidth={0} />
                    </span>
                    <span aria-hidden className="text-[15px] font-semibold tracking-tight text-[#191919]">
                      Learning
                    </span>
                  </span>
                </li>
              </ul>
            </AnimatedSection>
          </div>
        </div>
      </Container>
    </section>
  );
}
