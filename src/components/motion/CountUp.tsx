"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { useLocale } from "next-intl";

type ParsedValue = {
  prefix: string;
  number: number;
  decimals: number;
  suffix: string;
};

/**
 * Découpe "3,6M+", "5 000+", "$0.18" ou "577K+" en préfixe / nombre / suffixe.
 * Un séparateur suivi d'exactement 3 chiffres est traité comme séparateur de
 * milliers, sinon comme séparateur décimal.
 */
const parseValue = (value: string): ParsedValue | null => {
  const match = value.match(/^(\D*?)(\d[\d\s  .,]*\d|\d)(.*)$/);
  if (!match) return null;
  const [, prefix, raw, suffix] = match;
  const compact = raw.replace(/[\s  ]/g, "");
  const decimalMatch = compact.match(/[.,](\d{1,2})$/);
  const decimals = decimalMatch ? decimalMatch[1].length : 0;
  const integerPart = decimalMatch ? compact.slice(0, -decimalMatch[0].length) : compact;
  const number = Number(
    `${integerPart.replace(/[.,]/g, "")}${decimals ? `.${decimalMatch![1]}` : ""}`
  );
  return Number.isFinite(number) ? { prefix, number, decimals, suffix } : null;
};

export default function CountUp({ value, className }: { value: string; className?: string }) {
  const locale = useLocale();
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const reduceMotion = useReducedMotion();
  const parsed = parseValue(value);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!parsed || reduceMotion || !isInView) return;
    const formatter = new Intl.NumberFormat(locale, {
      minimumFractionDigits: parsed.decimals,
      maximumFractionDigits: parsed.decimals
    });
    const controls = animate(0, parsed.number, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplay(`${parsed.prefix}${formatter.format(latest)}${parsed.suffix}`),
      // On termine sur la valeur exacte rédigée (espaces, symboles...)
      onComplete: () => setDisplay(value)
    });
    return () => controls.stop();
    // parsed dérive de value
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView, reduceMotion, value, locale]);

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{value}</span>
      <span aria-hidden className="tabular-nums">
        {display}
      </span>
    </span>
  );
}
