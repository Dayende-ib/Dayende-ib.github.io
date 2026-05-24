import { Suspense } from "react";
import { setRequestLocale } from "next-intl/server";

import About from "@/components/About";
import Blog from "@/components/Blog";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import SectionDivider from "@/components/SectionDivider";
import Services from "@/components/Services";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonials";
import { Skeleton } from "@/components/ui/skeleton";

function SectionSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <div className="py-20">
      <div className="mx-auto max-w-6xl space-y-8 px-4">
        <div className="space-y-3">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-80" />
          <Skeleton className="h-4 w-96" />
        </div>
        <div className={`grid gap-6 ${rows === 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
          {Array.from({ length: rows }).map((_, i) => (
            <Skeleton key={i} className="h-48" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default async function HomePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar locale={locale} />
      <main>
        <Hero locale={locale} />
        <Stats locale={locale} />
        <SectionDivider />
        <Suspense fallback={<SectionSkeleton rows={4} />}>
          <Services locale={locale} />
        </Suspense>
        <SectionDivider />
        <Projects locale={locale} />
        <SectionDivider />
        <Suspense fallback={<SectionSkeleton rows={2} />}>
          <About locale={locale} />
        </Suspense>
        <SectionDivider />
        <Suspense fallback={<SectionSkeleton rows={3} />}>
          <Testimonials locale={locale} />
        </Suspense>
        <SectionDivider />
        <Suspense fallback={<SectionSkeleton rows={3} />}>
          <Blog locale={locale} />
        </Suspense>
        <SectionDivider />
        <Contact locale={locale} />
      </main>
      <Footer locale={locale} />
    </div>
  );
}
