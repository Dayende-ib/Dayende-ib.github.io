import { setRequestLocale } from "next-intl/server";

import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import SectionDivider from "@/components/SectionDivider";
import Services from "@/components/Services";
import Stats from "@/components/Stats";

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
        <Services locale={locale} />
        <SectionDivider />
        <Projects locale={locale} />
        <SectionDivider />
        <About locale={locale} />
        <SectionDivider />
        <Contact locale={locale} />
      </main>
      <Footer locale={locale} />
    </div>
  );
}
