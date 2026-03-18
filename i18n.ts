import { getRequestConfig } from "next-intl/server";

export const locales = ["fr", "en"] as const;
export const defaultLocale = "fr";

export type Locale = (typeof locales)[number];

type Messages = Record<string, unknown>;

const isObject = (value: unknown): value is Messages =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const mergeDeep = (base: Messages, override: Messages): Messages => {
  const result: Messages = { ...base };
  Object.keys(override).forEach((key) => {
    const baseValue = result[key];
    const overrideValue = override[key];
    if (isObject(baseValue) && isObject(overrideValue)) {
      result[key] = mergeDeep(baseValue, overrideValue);
    } else {
      result[key] = overrideValue;
    }
  });
  return result;
};

export default getRequestConfig(async ({ locale }) => {
  const resolvedLocale = locales.includes(locale as Locale)
    ? (locale as Locale)
    : defaultLocale;
  const messages = (
    await import(`./messages/${resolvedLocale}.json`)
  ).default as Messages;

  if (resolvedLocale === defaultLocale) {
    return { locale: resolvedLocale, messages };
  }

  const fallbackMessages = (
    await import(`./messages/${defaultLocale}.json`)
  ).default as Messages;

  return {
    locale: resolvedLocale,
    messages: mergeDeep(fallbackMessages, messages)
  };
});
