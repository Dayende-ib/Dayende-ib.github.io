import { getTranslations } from "next-intl/server";

import AnimatedSection from "@/components/AnimatedSection";
import Container from "@/components/Container";
import ContactForm from "@/components/ContactForm";
import SectionHeading from "@/components/SectionHeading";

type ContactProps = {
  locale: string;
};

export default async function Contact({ locale }: ContactProps) {
  const t = await getTranslations({ locale, namespace: "contact" });

  return (
    <section id="contact" className="py-20">
      <Container className="space-y-10">
        <AnimatedSection direction="up">
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={t("subtitle")}
          />
        </AnimatedSection>
        <AnimatedSection direction="up" delay={0.08}>
          <ContactForm />
        </AnimatedSection>
        <p className="text-xs text-muted-foreground">{t("noCommitment")}</p>
      </Container>
    </section>
  );
}
