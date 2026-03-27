import Link from "next/link";

import { defaultLocale } from "../i18n";

export default function RootPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 text-foreground">
      <div className="text-center">
        <p className="mb-4 text-sm text-muted-foreground">Choisissez une langue</p>
        <div className="flex items-center justify-center gap-3">
          <Link
            href="/fr/"
            className="rounded-md border border-border px-4 py-2 text-sm transition-colors hover:bg-white/10"
          >
            FR
          </Link>
          <Link
            href="/en/"
            className="rounded-md border border-border px-4 py-2 text-sm transition-colors hover:bg-white/10"
          >
            EN
          </Link>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          Page principale: {`/${defaultLocale}/`}
        </p>
      </div>
    </main>
  );
}
