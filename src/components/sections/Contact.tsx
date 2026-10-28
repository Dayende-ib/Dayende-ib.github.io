import { ArrowUpRight, Github, Linkedin, Mail, MessageCircle } from "lucide-react";
import { getTranslations } from "next-intl/server";

import AnimatedSection from "@/components/AnimatedSection";
import ContactForm from "@/components/ContactForm";
import Container from "@/components/Container";
import CopyEmailButton from "@/components/CopyEmailButton";
import LocalTime from "@/components/LocalTime";
import SectionHeading from "@/components/SectionHeading";
import { site } from "@/data/site";

export default async function Contact({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "contact" });

  const secondaryChannels = [
    { href: site.linkedin, label: "LinkedIn", detail: "/in/ibrahimdayende", icon: Linkedin },
    { href: site.github, label: "GitHub", detail: "/Dayende-ib", icon: Github }
  ];

  return (
    <section id="contact" className="relative overflow-hidden py-14 sm:py-20">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[600px] bg-gradient-to-t from-primary/10 to-transparent" />
      <Container className="space-y-8 sm:space-y-10">
        <SectionHeading index="08" eyebrow={t("eyebrow")} title={t("title")} description={t("subtitle")} />

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <AnimatedSection direction="left" className="flex flex-col gap-4">
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="group relative overflow-hidden rounded-3xl bg-signal p-5 text-signal-foreground transition-transform duration-300 hover:-translate-y-1 sm:p-6"
            >
              <div className="flex items-start justify-between">
                <MessageCircle className="h-7 w-7" />
                <ArrowUpRight className="h-6 w-6 transition-transform duration-300 group-hover:rotate-45" />
              </div>
              <p className="mt-6 font-mono text-xs uppercase tracking-[0.2em] opacity-70">{t("quick.eyebrow")}</p>
              <p className="mt-2 font-display text-3xl font-semibold tracking-tight">WhatsApp</p>
              <p className="mt-2 text-sm opacity-80">{t("quick.whatsappHint")}</p>
            </a>

            <div className="flex items-center gap-3 rounded-3xl border border-border bg-card p-5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-accent">
                <Mail className="h-5 w-5 text-primary" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-muted-foreground">Email</p>
                <a href={`mailto:${site.email}`} className="block truncate font-medium hover:text-primary">
                  {site.email}
                </a>
              </div>
              <CopyEmailButton />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {secondaryChannels.map(({ href, label, detail, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="group rounded-3xl border border-border bg-card p-4 transition-colors hover:border-foreground/20"
                >
                  <div className="flex items-center justify-between">
                    <Icon className="h-5 w-5" />
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform duration-300 group-hover:rotate-45" />
                  </div>
                  <p className="mt-4 font-medium">{label}</p>
                  <p className="truncate font-mono text-[11px] text-muted-foreground">{detail}</p>
                </a>
              ))}
            </div>

            <div className="rounded-3xl border border-border bg-card p-5">
              <div className="flex items-center gap-2 text-sm font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-signal" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
                </span>
                {t("quick.availabilityLabel")}
              </div>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{t("quick.availability")}</p>
              <p className="mt-3 font-mono text-xs text-muted-foreground">
                {t("quick.localTime")} <LocalTime className="text-foreground" />
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection direction="right" delay={0.1}>
            <ContactForm />
            <p className="mt-4 text-center text-xs text-muted-foreground">{t("noCommitment")}</p>
          </AnimatedSection>
        </div>
      </Container>
    </section>
  );
}
