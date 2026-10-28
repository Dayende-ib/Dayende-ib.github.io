"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { Check } from "lucide-react";

const TOAST_EVENT = "portfolio:toast";

export const toast = (message: string) => {
  window.dispatchEvent(new CustomEvent<string>(TOAST_EVENT, { detail: message }));
};

export default function Toaster() {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    let timeout: number | undefined;
    const onToast = (event: Event) => {
      setMessage((event as CustomEvent<string>).detail);
      window.clearTimeout(timeout);
      timeout = window.setTimeout(() => setMessage(null), 2600);
    };
    window.addEventListener(TOAST_EVENT, onToast);
    return () => {
      window.removeEventListener(TOAST_EVENT, onToast);
      window.clearTimeout(timeout);
    };
  }, []);

  return (
    <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-6 z-[120] flex justify-center px-4">
      <AnimatePresence>
        {message ? (
          <m.div
            key={message}
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            className="flex items-center gap-2 rounded-full border border-border bg-popover px-4 py-2.5 text-sm text-popover-foreground shadow-2xl shadow-black/30"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-signal text-signal-foreground">
              <Check className="h-3 w-3" />
            </span>
            {message}
          </m.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
