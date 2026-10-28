import Image from "next/image";
import { ArrowUp, Github, Linkedin, MessageCircle } from "lucide-react";
import { getTranslations } from "next-intl/server";

import Container from "@/components/Container";
import LocalTime from "@/components/LocalTime";
import { site } from "@/data/site";

export default async function Footer({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "footer" });
  const nav = await getTranslations({ locale, namespace: "navbar.links" });

  const links = ["impact", "skills", "services", "projects", "about", "contact"] as const;
  const socials = [
    { href: site.github, label: "GitHub", icon: Github },
    { href: site.linkedin, label: "LinkedIn", icon: Linkedin },
    { href: site.whatsapp, label: "WhatsApp", icon: MessageCircle }
  ];

  return (
    <footer className="relative overflow-hidden border-t border-border pt-12">
      <Container>
        <div className="grid gap-8 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="space-y-4">
            <a href="#accueil" className="inline-flex items-center gap-3">
              <Image src="/logo.png" alt="" width={40} height={40} className="h-10 w-10" />
              <span className="font-display text-lg font-semibold tracking-tight">{site.name}</span>
            </a>
            <p className="max-w-sm text-sm leading-6 text-muted-foreground">{t("tagline")}</p>
            <p className="font-mono text-xs text-muted-foreground">
              Burkina Faso · <LocalTime />
            </p>
          </div>

          <nav aria-label={t("navLabel")}>
            <p className="eyebrow mb-4">{t("navLabel")}</p>
            <ul className="grid grid-cols-2 gap-2 text-sm md:grid-cols-1">
              {links.map((id) => (
                <li key={id}>
                  <a href={`#${id}`} className="text-muted-foreground transition-colors hover:text-foreground">
                    {nav(id)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="eyebrow mb-4">{t("elsewhere")}</p>
            <ul className="space-y-2 text-sm">
              {socials.map(({ href, label, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs text-muted-foreground">
              {t.rich("paletteHint", {
                key: (chunks) => (
                  <kbd className="rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-foreground">{chunks}</kbd>
                )
              })}
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col-reverse items-start justify-between gap-4 border-t border-border py-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>{t("copyright", { year: new Date().getFullYear() })}</p>
          <a href="#accueil" className="inline-flex items-center gap-2 transition-colors hover:text-foreground">
            {t("backToTop")}
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-border">
              <ArrowUp className="h-3.5 w-3.5" />
            </span>
          </a>
        </div>
      </Container>

      <p
        aria-hidden
        className="pointer-events-none select-none whitespace-nowrap text-center font-display text-[17vw] font-bold leading-[0.8] tracking-tighter text-outline"
      >
        Dayende
      </p>
    </footer>
  );
}
