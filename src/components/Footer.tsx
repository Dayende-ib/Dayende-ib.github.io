import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

import Container from "@/components/Container";

type FooterProps = {
  locale: string;
};

export default async function Footer({ locale }: FooterProps) {
  const t = await getTranslations({ locale, namespace: "footer" });
  const footerLinks = [
    { href: "#accueil", label: t("links.home") },
    { href: "#services", label: t("links.services") },
    { href: "#projects", label: t("links.projects") },
    { href: "#contact", label: t("links.contact") }
  ];

  return (
    <footer className="border-t border-border/60 py-10">
      <Container className="flex flex-col gap-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-4">
          <Link href="#accueil" className="flex items-center gap-2 text-foreground">
            <Image
              src="/Logo_vertical.png"
              alt="Logo Ibrahim Dayende"
              width={140}
              height={40}
              className="h-10 w-auto"
            />
          </Link>
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <p>{t("copyright", { year: new Date().getFullYear() })}</p>
      </Container>
    </footer>
  );
}
