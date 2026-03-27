import { getTranslations } from "next-intl/server";

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
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("subtitle")}
        />
        <ContactForm />
        <p className="text-xs text-muted-foreground">{t("noCommitment")}</p>
      </Container>
    </section>
  );
}
