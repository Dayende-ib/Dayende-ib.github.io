"use client";

import { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { AnimatePresence, m } from "framer-motion";
import { ArrowUpRight, Check, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";

import { trackEvent } from "@/components/Analytics";
import { easeOutExpo } from "@/components/motion/easing";
import { CONTACT_PREFILL_EVENT } from "@/components/projects/ProjectProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { ProjectCategory } from "@/data/projects";
import { cn } from "@/lib/utils";
import { submitWeb3Forms } from "@/lib/web3forms";

type FormState = {
  name: string;
  email: string;
  message: string;
};

type FormErrors = Record<keyof FormState, string>;

const inquiryTypes = ["web", "mobile", "automation", "ads", "other"] as const;
type InquiryType = (typeof inquiryTypes)[number];

const categoryToInquiry: Record<ProjectCategory, InquiryType> = {
  web: "web",
  mobile: "mobile",
  ia: "automation",
  ads: "ads"
};

const initialState: FormState = { name: "", email: "", message: "" };
const noErrors: FormErrors = { name: "", email: "", message: "" };

export default function ContactForm() {
  const t = useTranslations("contact.form");
  const [form, setForm] = useState<FormState>(initialState);
  const [types, setTypes] = useState<InquiryType[]>([]);
  const [errors, setErrors] = useState<FormErrors>(noErrors);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  // Pré-remplissage depuis une fiche projet ("Discuter d'un projet similaire")
  useEffect(() => {
    const onPrefill = (event: Event) => {
      const { message, type } = (event as CustomEvent<{ message: string; type?: ProjectCategory }>).detail;
      setForm((prev) => ({ ...prev, message }));
      if (type) setTypes([categoryToInquiry[type]]);
      setStatus("idle");
    };
    window.addEventListener(CONTACT_PREFILL_EVENT, onPrefill);
    return () => window.removeEventListener(CONTACT_PREFILL_EVENT, onPrefill);
  }, []);

  const validate = () => {
    const nextErrors: FormErrors = {
      name: form.name.trim() ? "" : t("errors.name"),
      email: /\S+@\S+\.\S+/.test(form.email) ? "" : t("errors.email"),
      message: form.message.trim().length >= 10 ? "" : t("errors.message")
    };
    setErrors(nextErrors);
    return Object.values(nextErrors).every((error) => !error);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) setErrors((prev) => ({ ...prev, [name]: "" }));
    if (status === "error") setStatus("idle");
  };

  const toggleType = (type: InquiryType) =>
    setTypes((prev) => (prev.includes(type) ? prev.filter((item) => item !== type) : [...prev, type]));

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;
    setStatus("sending");
    try {
      await submitWeb3Forms({
        subject: `Portfolio — ${form.name}`,
        name: form.name,
        email: form.email,
        project_type: types.map((type) => t(`types.${type}`)).join(", ") || "—",
        message: form.message,
        botcheck: new FormData(event.currentTarget).get("botcheck")
      });
      setStatus("success");
      trackEvent("contact-form-sent", { types: types.join(",") || "none" });
      setForm(initialState);
      setTypes([]);
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="relative rounded-3xl border border-border bg-card p-5 sm:p-6">
      <AnimatePresence mode="wait" initial={false}>
        {status === "success" ? (
          <m.div
            key="success"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: easeOutExpo }}
            className="flex min-h-[380px] flex-col items-center justify-center text-center"
            role="status"
          >
            <m.span
              className="flex h-16 w-16 items-center justify-center rounded-full bg-signal text-signal-foreground"
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
            >
              <Check className="h-7 w-7" />
            </m.span>
            <p className="mt-6 font-display text-2xl font-semibold tracking-tight">{t("successTitle")}</p>
            <p className="mt-2 max-w-sm text-muted-foreground">{t("success")}</p>
            <Button variant="outline" className="mt-8" onClick={() => setStatus("idle")}>
              {t("again")}
            </Button>
          </m.div>
        ) : (
          <m.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-5"
            onSubmit={handleSubmit}
            noValidate
          >
            {/* Piège à robots (web3forms) */}
            <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

            <fieldset className="space-y-2">
              <legend className="eyebrow mb-2">{t("typeLabel")}</legend>
              <div className="flex flex-wrap gap-2">
                {inquiryTypes.map((type) => {
                  const isActive = types.includes(type);
                  return (
                    <button
                      key={type}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => toggleType(type)}
                      className={cn(
                        "flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm transition-all",
                        isActive
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                      )}
                    >
                      {isActive ? <Check className="h-3.5 w-3.5" /> : null}
                      {t(`types.${type}`)}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="name">
                  {t("nameLabel")}
                </label>
                <Input
                  id="name"
                  name="name"
                  autoComplete="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder={t("placeholders.name")}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "error-name" : undefined}
                />
                {errors.name ? (
                  <p id="error-name" className="text-xs text-destructive">
                    {errors.name}
                  </p>
                ) : null}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="email">
                  {t("emailLabel")}
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder={t("placeholders.email")}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "error-email" : undefined}
                />
                {errors.email ? (
                  <p id="error-email" className="text-xs text-destructive">
                    {errors.email}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="message">
                {t("messageLabel")}
              </label>
              <Textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder={t("placeholders.message")}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "error-message" : undefined}
              />
              {errors.message ? (
                <p id="error-message" className="text-xs text-destructive">
                  {errors.message}
                </p>
              ) : null}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-muted-foreground">{t("responseTime")}</p>
              <Button type="submit" size="lg" disabled={status === "sending"}>
                {status === "sending" ? <Loader2 className="animate-spin" /> : null}
                {status === "sending" ? t("sending") : t("submit")}
                {status !== "sending" ? <ArrowUpRight /> : null}
              </Button>
            </div>
            {status === "error" ? (
              <p className="rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm" role="alert">
                {t("errors.submit")}
              </p>
            ) : null}
          </m.form>
        )}
      </AnimatePresence>
    </div>
  );
}
