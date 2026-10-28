import { setRequestLocale } from "next-intl/server";

import CommandPalette from "@/components/CommandPalette";
import CvRequestDialog from "@/components/CvRequest";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ProjectProvider from "@/components/projects/ProjectProvider";
import About from "@/components/sections/About";
import Blog from "@/components/sections/Blog";
import Contact from "@/components/sections/Contact";
import Hero from "@/components/sections/Hero";
import Impact from "@/components/sections/Impact";
import Projects from "@/components/sections/Projects";
import Services from "@/components/sections/Services";
import Skills from "@/components/sections/Skills";
import Testimonials from "@/components/sections/Testimonials";

export default async function HomePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <ProjectProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <CommandPalette />
        <CvRequestDialog />
        <main id="main">
          <Hero locale={locale} />
          <Impact />
          <Skills />
          <Services locale={locale} />
          <Projects locale={locale} />
          <About locale={locale} />
          <Testimonials />
          <Blog locale={locale} />
          <Contact locale={locale} />
        </main>
        <Footer locale={locale} />
      </div>
    </ProjectProvider>
  );
}
