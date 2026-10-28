import type { CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Entrée animée en CSS pur, pour le premier écran : le contenu s'affiche dès
 * le rendu HTML, sans attendre le chargement de framer-motion.
 */
export default function Enter({
  children,
  delay = 0,
  className,
  as: Tag = "div"
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  /** "span" à l'intérieur d'un titre ou d'un paragraphe */
  as?: "div" | "span";
}) {
  return (
    <Tag className={cn("enter", className)} style={{ "--enter-delay": `${delay}s` } as CSSProperties}>
      {children}
    </Tag>
  );
}

/** Variante mot par mot (masque), équivalent CSS de SplitText. */
export function EnterWords({ text, delay = 0, stagger = 0.045 }: { text: string; delay?: number; stagger?: number }) {
  const words = text.split(" ");
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {words.map((word, index) => (
          <span key={`${word}-${index}`}>
            <span className="-mb-[0.14em] inline-block overflow-hidden pb-[0.14em] align-bottom">
              <span
                className="enter-word"
                style={{ "--enter-delay": `${delay + index * stagger}s` } as CSSProperties}
              >
                {word}
              </span>
            </span>
            {index < words.length - 1 ? " " : null}
          </span>
        ))}
      </span>
    </>
  );
}
