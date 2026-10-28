"use client";

import { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, m } from "framer-motion";
import { ArrowUpRight, Menu, Search, X } from "lucide-react";
import { useTranslations } from "next-intl";

import { openCommandPalette } from "@/components/CommandPalette";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { easeOutExpo } from "@/components/motion/easing";
import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { site, type SectionId } from "@/data/site";
import { cn } from "@/lib/utils";

const navIds = ["impact", "skills", "services", "projects", "about"] as const satisfies readonly SectionId[];

/** Section actuellement au centre de l'écran */
function useActiveSection() {
  const [active, setActive] = useState<string>("accueil");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    // Toutes les sections : celles hors menu (témoignages, articles) désactivent l'indicateur
    document.querySelectorAll("main section[id]").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return active;
}

export default function Navbar() {
  const t = useTranslations("navbar");
  const palette = useTranslations("palette");
  const active = useActiveSection();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [shortcut, setShortcut] = useState("⌘K");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    if (!/Mac|iPhone|iPad/.test(navigator.platform)) setShortcut("Ctrl K");
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        {t("skip")}
      </a>
      <m.header
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: easeOutExpo, delay: 0.1 }}
      >
        <div
          className={cn(
            "mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-full border px-2 py-2 transition-all duration-500 sm:pl-3",
            scrolled
              ? "border-border bg-background/75 shadow-lg shadow-black/10 backdrop-blur-xl"
              : "border-transparent bg-transparent"
          )}
        >
          <a href="#accueil" className="flex min-w-0 items-center gap-2.5 rounded-full pr-2">
            <Image src="/logo.png" alt="" width={32} height={32} className="h-8 w-8" priority />
            <span className="truncate font-display text-[15px] font-semibold tracking-tight">
              {site.shortName}
            </span>
          </a>

          <nav aria-label={t("ariaLabel")} className="hidden lg:block">
            <ul className="flex items-center gap-0.5">
              {navIds.map((id) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    aria-current={active === id ? "location" : undefined}
                    className={cn(
                      "relative block rounded-full px-3.5 py-2 text-sm transition-colors",
                      active === id ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {active === id ? (
                      <m.span
                        layoutId="nav-active"
                        className="absolute inset-0 -z-10 rounded-full bg-accent"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    ) : null}
                    {t(`links.${id}`)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={openCommandPalette}
              aria-label={palette("trigger")}
              className="flex h-9 items-center gap-2 rounded-full border border-border bg-background/60 px-2.5 text-muted-foreground transition-colors hover:text-foreground sm:px-3"
            >
              <Search className="h-4 w-4" />
              <span className="hidden text-sm xl:inline">{t("search")}</span>
              <kbd className="hidden rounded-md border border-border px-1.5 font-mono text-[10px] md:inline">
                {shortcut}
              </kbd>
            </button>
            <ThemeToggle className="hidden sm:flex" />
            <Suspense fallback={null}>
              <LanguageSwitcher className="hidden sm:flex" />
            </Suspense>
            <Button asChild size="sm" className="hidden h-9 px-4 md:inline-flex">
              <a href="#contact">
                {t("cta")}
                <ArrowUpRight />
              </a>
            </Button>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label={t("menu")}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground text-background lg:hidden"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </div>
      </m.header>

      <AnimatePresence>
        {menuOpen ? (
          <m.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label={t("menu")}
            className="fixed inset-0 z-[60] flex flex-col bg-background/95 px-5 pb-8 pt-4 backdrop-blur-xl lg:hidden"
            initial={{ clipPath: "circle(0% at calc(100% - 2.5rem) 2.25rem)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 2.5rem) 2.25rem)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 2.5rem) 2.25rem)" }}
            transition={{ duration: 0.6, ease: easeOutExpo }}
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-[15px] font-semibold">{site.shortName}</span>
              <button
                type="button"
                autoFocus
                onClick={() => setMenuOpen(false)}
                aria-label={t("closeMenu")}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <nav aria-label={t("ariaLabel")} className="mt-10 flex-1">
              <m.ul
                className="space-y-1"
                initial="hidden"
                animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } } }}
              >
                {[...navIds, "contact" as const].map((id, index) => (
                  <m.li
                    key={id}
                    variants={{
                      hidden: { opacity: 0, y: 24 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOutExpo } }
                    }}
                  >
                    <a
                      href={`#${id}`}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-baseline gap-4 border-b border-border py-4"
                    >
                      <span className="font-mono text-xs text-primary">{String(index + 1).padStart(2, "0")}</span>
                      <span
                        className={cn(
                          "font-display text-3xl font-semibold tracking-tight",
                          active === id ? "text-foreground" : "text-foreground/70"
                        )}
                      >
                        {t(`links.${id}`)}
                      </span>
                    </a>
                  </m.li>
                ))}
              </m.ul>
            </nav>

            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <Suspense fallback={null}>
                  <LanguageSwitcher />
                </Suspense>
              </div>
              <Button asChild>
                <a href={site.whatsapp} target="_blank" rel="noreferrer">
                  WhatsApp
                  <ArrowUpRight />
                </a>
              </Button>
            </div>
          </m.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
