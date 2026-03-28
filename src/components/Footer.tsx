import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Github, Linkedin, MessageCircle, ArrowUpCircle } from "lucide-react";

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

  const socialLinks = [
    {
      href: "https://github.com/dayende-ib",
      label: "GitHub",
      icon: Github,
      color: "hover:text-white hover:border-white/30"
    },
    {
      href: "https://linkedin.com/in/ibrahimdayende",
      label: "LinkedIn",
      icon: Linkedin,
      color: "hover:text-blue-400 hover:border-blue-400/40"
    },
    {
      href: "https://wa.me/0022657760302",
      label: "WhatsApp",
      icon: MessageCircle,
      color: "hover:text-emerald-400 hover:border-emerald-400/40"
    }
  ];

  return (
    <footer className="border-t border-border/60 py-10">
      {/* Gradient top divider */}
      <div className="absolute left-0 right-0 -mt-10 h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent pointer-events-none" />
      <Container>
        <div className="flex flex-col gap-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-4">
            <Link href="#accueil" className="flex items-center gap-2 text-foreground">
              <Image
                src="/logo_vertical.png"
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

          <div className="flex items-center gap-3">
            {/* Social icons */}
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className={`flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-background/30 text-muted-foreground transition-all duration-200 ${social.color}`}
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}

            {/* Back to top */}
            <a
              href="#accueil"
              aria-label="Retour en haut"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-background/30 text-muted-foreground transition-all duration-200 hover:text-cyan-400 hover:border-cyan-400/40"
            >
              <ArrowUpCircle className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-border/40 pt-6">
          <p className="text-xs text-muted-foreground">
            {t("copyright", { year: new Date().getFullYear() })}
          </p>
        </div>
      </Container>
    </footer>
  );
}
