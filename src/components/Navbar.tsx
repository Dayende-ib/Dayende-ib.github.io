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
    <header className="sticky top-0 z-50 w-full pt-4">
      <Container className="px-4 sm:px-6 lg:px-8">
        <div className="section-panel card-glow overflow-hidden rounded-[24px]">
          <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-5">
            <Link
              href="#accueil"
              className="flex min-w-0 items-center gap-3 text-sm font-semibold text-white"
            >
              <Image
                src="/logo.png"
                alt="Logo Ibrahim Dayende"
                width={34}
                height={34}
                className="h-8 w-8 rounded-xl"
                priority
              />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-white">
                  Ibrahim Dayende
                </p>
                <p className="hidden text-xs text-muted-foreground sm:block">
                  Full-stack | Mobile | Automation
                </p>
              </div>
            </Link>

            <nav
              aria-label={t("ariaLabel")}
              className="hidden items-center rounded-full border border-border/70 bg-background/35 p-1 md:flex"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-white/5 hover:text-white"
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
                <Button asChild size="sm" className="rounded-full">
                  <Link href="#contact">{t("cta")}</Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile nav — scrollable with fade indicator */}
          <div className="border-t border-border/60 bg-background/30 md:hidden">
            <div className="relative">
              <div className="flex items-center gap-2 overflow-x-auto scrollbar-none px-4 py-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="whitespace-nowrap rounded-full border border-border/70 bg-background/50 px-3 py-2 text-xs text-muted-foreground transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="#contact"
                  className="ml-auto whitespace-nowrap rounded-full bg-primary px-3 py-2 text-xs font-medium text-primary-foreground"
                >
                  {t("cta")}
                </Link>
              </div>
              {/* Fade indicator: signals nav is horizontally scrollable */}
              <div className="pointer-events-none absolute inset-y-0 right-0 w-12 nav-mobile-fade" />
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}
