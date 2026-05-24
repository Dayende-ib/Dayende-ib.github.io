import { getTranslations } from "next-intl/server";
import { Quote } from "lucide-react";

import AnimatedSection from "@/components/AnimatedSection";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";

const testimonialKeys = ["t1", "t2", "t3"] as const;

type TestimonialsProps = {
  locale: string;
};

export default async function Testimonials({ locale }: TestimonialsProps) {
  const t = await getTranslations({ locale, namespace: "testimonials" });

  return (
    <section id="testimonials" className="py-20">
      <Container className="space-y-10">
        <AnimatedSection direction="up">
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={t("description")}
          />
        </AnimatedSection>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonialKeys.map((key, i) => (
            <AnimatedSection key={key} direction="up" delay={i * 0.1}>
              <figure className="section-panel card-glow card-hover-glow flex h-full flex-col gap-5 p-6">
                <Quote className="h-6 w-6 flex-shrink-0 text-cyan-400/60" />
                <blockquote className="flex-1 text-sm leading-7 text-muted-foreground">
                  &ldquo;{t(`items.${key}.quote`)}&rdquo;
                </blockquote>
                <figcaption className="flex items-center gap-3 border-t border-border/50 pt-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500/30 to-sky-500/30 text-sm font-semibold text-cyan-200">
                    {t(`items.${key}.initials`)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">
                      {t(`items.${key}.name`)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {t(`items.${key}.role`)}
                    </p>
                  </div>
                </figcaption>
              </figure>
            </AnimatedSection>
          ))}
        </div>
      </Container>
    </section>
  );
}
