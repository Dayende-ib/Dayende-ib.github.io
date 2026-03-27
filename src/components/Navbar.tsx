import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

import Container from "@/components/Container";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Button } from "@/components/ui/button";

type NavbarProps = {
  locale: string;
};

export default async function Navbar({ locale }: NavbarProps) {
  const t = await getTranslations({ locale, namespace: "navbar" });
  const navLinks = [
    { href: "#accueil", label: t("links.home") },
    { href: "#services", label: t("links.services") },
    { href: "#projects", label: t("links.projects") },
    { href: "#about", label: t("links.about") },
    { href: "#contact", label: t("links.contact") }
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/70 backdrop-blur">
      <Container className="flex items-center justify-between py-3">
        <Link
          href="#accueil"
          className="flex items-center gap-2 text-sm font-semibold"
        >
          <Image
            src="/logo.png"
            alt="Logo Ibrahim Dayende"
            width={28}
            height={28}
            className="h-7 w-7"
            priority
          />
          Ibrahim Dayende
        </Link>
        <nav
          aria-label={t("ariaLabel")}
          className="hidden items-center gap-6 text-sm text-muted-foreground md:flex"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Suspense fallback={null}>
            <LanguageSwitcher />
          </Suspense>
          <div className="hidden sm:flex">
            <Button asChild size="sm">
              <Link href="#contact">{t("cta")}</Link>
            </Button>
          </div>
        </div>
      </Container>
      <div className="border-t border-border/40 bg-background/80 md:hidden">
        <Container className="flex items-center gap-4 overflow-x-auto py-2 text-xs text-muted-foreground">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="whitespace-nowrap transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </Container>
      </div>
    </header>
  );
}
