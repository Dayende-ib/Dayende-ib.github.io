"use client";

import { Copy } from "lucide-react";
import { useTranslations } from "next-intl";

import { toast } from "@/components/Toaster";
import { site } from "@/data/site";

export default function CopyEmailButton() {
  const t = useTranslations("common");

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      toast(t("emailCopied"));
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={t("copyEmail")}
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
    >
      <Copy className="h-4 w-4" />
    </button>
  );
}
