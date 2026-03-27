"use client";

import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type FormState = {
  name: string;
  email: string;
  message: string;
};

type FormErrors = Record<keyof FormState, string>;

const initialState: FormState = {
  name: "",
  email: "",
  message: ""
};

export default function ContactForm() {
  const t = useTranslations("contact");
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FormErrors>({
    name: "",
    email: "",
    message: ""
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle"
  );
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
  const hasEmailConfig = Boolean(accessKey);

  const validate = () => {
    const nextErrors: FormErrors = {
      name: form.name.trim() ? "" : t("form.errors.name"),
      email: /\S+@\S+\.\S+/.test(form.email)
        ? ""
        : t("form.errors.email"),
      message:
        form.message.trim().length >= 10
          ? ""
          : t("form.errors.message")
    };

    setErrors(nextErrors);
    return Object.values(nextErrors).every((error) => !error);
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setStatus("idle");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) {
      return;
    }
    if (!hasEmailConfig) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: accessKey,
          name: form.name,
          email: form.email,
          message: form.message
        })
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      const result = (await response.json()) as { success?: boolean };
      if (!result.success) {
        throw new Error("Submission failed");
      }

      setStatus("success");
      setForm(initialState);
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <form
        className="space-y-5 rounded-2xl border border-border/60 bg-card/70 p-6"
        onSubmit={handleSubmit}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground" htmlFor="name">
              {t("form.nameLabel")}
            </label>
            <Input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder={t("form.placeholders.name")}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "error-name" : undefined}
            />
            {errors.name ? (
              <p id="error-name" className="text-xs text-pink-200">
                {errors.name}
              </p>
            ) : null}
          </div>
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground" htmlFor="email">
              {t("form.emailLabel")}
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder={t("form.placeholders.email")}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "error-email" : undefined}
            />
            {errors.email ? (
              <p id="error-email" className="text-xs text-pink-200">
                {errors.email}
              </p>
            ) : null}
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground" htmlFor="message">
            {t("form.messageLabel")}
          </label>
          <Textarea
            id="message"
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder={t("form.placeholders.message")}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "error-message" : undefined}
          />
          {errors.message ? (
            <p id="error-message" className="text-xs text-pink-200">
              {errors.message}
            </p>
          ) : null}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button type="submit" disabled={status === "sending" || status === "success"}>
            {t("form.submit")}
          </Button>
          {status === "success" ? (
            <p className="text-sm text-emerald-300" aria-live="polite">
              {t("form.success")}
            </p>
          ) : null}
          {status === "error" ? (
            <p className="text-sm text-rose-300" aria-live="polite">
              {t("form.errors.submit")}
            </p>
          ) : null}
        </div>
      </form>
      <div className="space-y-4 rounded-2xl border border-border/60 bg-muted/30 p-6">
        <p className="text-sm text-muted-foreground">{t("quick.title")}</p>
        <div className="flex flex-col gap-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-2">
              <Button
                asChild
                variant="secondary"
                className="border border-emerald-400/40 bg-emerald-500/20 text-emerald-100 hover:bg-emerald-500/30"
              >
                <a
                  href="https://wa.me/0022657760302"
                  target="_blank"
                  rel="noreferrer"
                >
                  {t("quick.whatsapp")}
                </a>
              </Button>
              <p className="text-xs text-muted-foreground">
                {t("quick.whatsappHint")}
              </p>
            </div>
            <Button
              asChild
              variant="outline"
              className="border-blue-400/50 bg-blue-500/20 text-white hover:bg-blue-500/30 hover:text-white"
            >
              <a
                href="https://linkedin.com/in/ibrahimdayende"
                target="_blank"
                rel="noreferrer"
              >
                {t("quick.linkedin")}
              </a>
            </Button>
          </div>
          <Button
            asChild
            variant="outline"
            className="border-rose-400/50 bg-rose-500/20 text-white hover:bg-rose-500/30 hover:text-white"
          >
            <a href="mailto:dayendeib@gmail.com">{t("quick.email")}</a>
          </Button>
          <Button asChild variant="outline">
            <a
              href="https://github.com/dayende-ib"
              target="_blank"
              rel="noreferrer"
            >
              {t("quick.github")}
            </a>
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">{t("quick.availability")}</p>
      </div>
    </div>
  );
}
