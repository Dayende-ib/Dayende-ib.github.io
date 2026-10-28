"use client";

import { useCallback, useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { AnimatePresence, m } from "framer-motion";
import { Check, FileText, Loader2, MessageCircle, Send, X } from "lucide-react";
import { useTranslations } from "next-intl";

import { trackEvent } from "@/components/Analytics";
import { easeOutExpo } from "@/components/motion/easing";
import { Button, type ButtonProps } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { site } from "@/data/site";
import { useModal } from "@/lib/useModal";
import { cn } from "@/lib/utils";
import { submitWeb3Forms } from "@/lib/web3forms";

/*
 * Le CV n'est jamais publié sur le site (dépôt public, hébergement statique) :
 * le visiteur fait une demande, Ibrahim la reçoit par email et répond avec le PDF.
 */

const OPEN_EVENT = "portfolio:open-cv-request";
const HASH = "#cv";

export const openCvRequest = () => window.dispatchEvent(new Event(OPEN_EVENT));

const purposes = ["recruitment", "freelance", "partnership", "other"] as const;
type Purpose = (typeof purposes)[number];

type FormState = { name: string; email: string; company: string; message: string };
type Field = "name" | "email" | "company" | "purpose";

const emptyForm: FormState = { name: "", email: "", company: "", message: "" };

export function CvRequestButton({ className, ...props }: Omit<ButtonProps, "onClick" | "children">) {
  const t = useTranslations("cv");
  return (
    <Button type="button" onClick={openCvRequest} className={className} {...props}>
      <FileText />
      {t("button")}
    </Button>
  );
}

/** Variante lien texte (pied de page). */
export function CvRequestLink({ className }: { className?: string }) {
  const t = useTranslations("cv");
  return (
    <button type="button" onClick={openCvRequest} className={className}>
      <FileText className="h-4 w-4" />
      {t("button")}
    </button>
  );
}

export default function CvRequestDialog() {
  const [open, setOpen] = useState(false);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  const show = useCallback(() => {
    returnFocusRef.current = document.activeElement as HTMLElement | null;
    setOpen(true);
  }, []);

  const hide = useCallback(() => {
    setOpen(false);
    if (window.location.hash === HASH) {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }
    returnFocusRef.current?.focus({ preventScroll: true });
  }, []);

  // Ouverture par bouton, palette ⌘K ou lien direct …/#cv
  useEffect(() => {
    const openFromHash = () => window.location.hash === HASH && show();
    openFromHash();
    window.addEventListener(OPEN_EVENT, show);
    window.addEventListener("hashchange", openFromHash);
    return () => {
      window.removeEventListener(OPEN_EVENT, show);
      window.removeEventListener("hashchange", openFromHash);
    };
  }, [show]);

  return <AnimatePresence>{open ? <Dialog key="cv-dialog" onClose={hide} /> : null}</AnimatePresence>;
}

function Dialog({ onClose }: { onClose: () => void }) {
  const t = useTranslations("cv");
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [purpose, setPurpose] = useState<Purpose | null>(null);
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [sentTo, setSentTo] = useState("");

  useModal(dialogRef, firstFieldRef, onClose);

  const validate = () => {
    const next: Partial<Record<Field, string>> = {};
    if (!form.name.trim()) next.name = t("errors.name");
    if (!/\S+@\S+\.\S+/.test(form.email)) next.email = t("errors.email");
    if (!form.company.trim()) next.company = t("errors.company");
    if (!purpose) next.purpose = t("errors.purpose");
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    if (status === "error") setStatus("idle");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate() || !purpose) return;
    setStatus("sending");
    try {
      await submitWeb3Forms({
        subject: `Demande de CV — ${form.name} (${form.company})`,
        from_name: "Portfolio · demande de CV",
        name: form.name,
        email: form.email,
        company: form.company,
        purpose: t(`purposes.${purpose}`),
        message: form.message || "—",
        botcheck: new FormData(event.currentTarget).get("botcheck")
      });
      trackEvent("cv-request-sent", { purpose });
      setSentTo(form.email);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const fieldError = (field: Field) =>
    errors[field] ? (
      <p id={`cv-error-${field}`} className="text-xs text-destructive">
        {errors[field]}
      </p>
    ) : null;

  return (
    <>
      <m.div
        className="fixed inset-0 z-[90] bg-background/70 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        aria-hidden
      />
      <m.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cv-dialog-title"
        aria-describedby="cv-dialog-description"
        className="fixed inset-x-0 bottom-0 z-[91] mx-auto max-h-[92vh] w-full max-w-lg overflow-y-auto overscroll-contain rounded-t-[28px] border border-border bg-popover p-5 shadow-2xl shadow-black/40 sm:inset-x-4 sm:bottom-auto sm:top-[8vh] sm:rounded-[28px] sm:p-7"
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.98 }}
        transition={{ duration: 0.45, ease: easeOutExpo }}
      >
        <div className="flex items-start justify-between gap-4">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <FileText className="h-5 w-5" />
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label={t("close")}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border transition-colors hover:bg-accent"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {status === "success" ? (
          <div className="py-6 text-center" role="status">
            <m.span
              className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-signal text-signal-foreground"
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
            >
              <Check className="h-6 w-6" />
            </m.span>
            <h2 id="cv-dialog-title" className="mt-5 font-display text-2xl font-semibold tracking-tight">
              {t("successTitle")}
            </h2>
            <p id="cv-dialog-description" className="mt-2 text-muted-foreground">
              {t("success", { email: sentTo })}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              <Button asChild variant="outline">
                <a href={site.whatsapp} target="_blank" rel="noreferrer" data-umami-event="contact-whatsapp">
                  <MessageCircle />
                  {t("urgent")}
                </a>
              </Button>
              <Button onClick={onClose}>{t("close")}</Button>
            </div>
          </div>
        ) : (
          <form className="mt-4 space-y-4" onSubmit={handleSubmit} noValidate>
            <div>
              <h2 id="cv-dialog-title" className="font-display text-2xl font-semibold tracking-tight">
                {t("title")}
              </h2>
              <p id="cv-dialog-description" className="mt-2 text-sm leading-6 text-muted-foreground">
                {t("description")}
              </p>
            </div>

            {/* Piège à robots (web3forms) */}
            <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

            <div className="space-y-2">
              <label htmlFor="cv-name" className="text-sm font-medium">
                {t("nameLabel")}
              </label>
              <Input
                ref={firstFieldRef}
                id="cv-name"
                name="name"
                autoComplete="name"
                value={form.name}
                onChange={handleChange}
                placeholder={t("placeholders.name")}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "cv-error-name" : undefined}
              />
              {fieldError("name")}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="cv-email" className="text-sm font-medium">
                  {t("emailLabel")}
                </label>
                <Input
                  id="cv-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder={t("placeholders.email")}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "cv-error-email" : undefined}
                />
                {fieldError("email")}
              </div>
              <div className="space-y-2">
                <label htmlFor="cv-company" className="text-sm font-medium">
                  {t("companyLabel")}
                </label>
                <Input
                  id="cv-company"
                  name="company"
                  autoComplete="organization"
                  value={form.company}
                  onChange={handleChange}
                  placeholder={t("placeholders.company")}
                  aria-invalid={Boolean(errors.company)}
                  aria-describedby={errors.company ? "cv-error-company" : undefined}
                />
                {fieldError("company")}
              </div>
            </div>

            <fieldset aria-describedby={errors.purpose ? "cv-error-purpose" : undefined}>
              <legend className="mb-2 text-sm font-medium">{t("purposeLabel")}</legend>
              <div className="flex flex-wrap gap-2">
                {purposes.map((item) => (
                  <label key={item} className="cursor-pointer">
                    <input
                      type="radio"
                      name="purpose"
                      value={item}
                      checked={purpose === item}
                      onChange={() => {
                        setPurpose(item);
                        setErrors((prev) => ({ ...prev, purpose: undefined }));
                      }}
                      className="peer sr-only"
                    />
                    <span
                      className={cn(
                        "flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm transition-all peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-popover",
                        purpose === item
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                      )}
                    >
                      {purpose === item ? <Check className="h-3.5 w-3.5" /> : null}
                      {t(`purposes.${item}`)}
                    </span>
                  </label>
                ))}
              </div>
              <div className="mt-2">{fieldError("purpose")}</div>
            </fieldset>

            <div className="space-y-2">
              <label htmlFor="cv-message" className="text-sm font-medium">
                {t("messageLabel")}
              </label>
              <Textarea
                id="cv-message"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder={t("placeholders.message")}
                className="min-h-[88px]"
              />
            </div>

            {status === "error" ? (
              <p className="rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm" role="alert">
                {t("errors.submit")}
              </p>
            ) : null}

            <div className="flex flex-col-reverse gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs leading-5 text-muted-foreground">{t("privacy")}</p>
              <Button type="submit" disabled={status === "sending"} className="shrink-0">
                {status === "sending" ? <Loader2 className="animate-spin" /> : <Send />}
                {status === "sending" ? t("sending") : t("submit")}
              </Button>
            </div>
          </form>
        )}
      </m.div>
    </>
  );
}
