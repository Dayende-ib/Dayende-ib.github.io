import EnglishRedirect from "@/components/EnglishRedirect";
import LocaleProviders from "@/components/LocaleProviders";

import { defaultLocale } from "../../i18n";
import MindeaseDemoPage, { generateMetadata as generateDemoMetadata } from "../[locale]/mindeasedemo/page";

const params = Promise.resolve({ locale: defaultLocale });

export const generateMetadata = () => generateDemoMetadata({ params });

export default function MindeaseDemoRootPage() {
  return (
    <>
      <EnglishRedirect path="mindeasedemo/" />
      <LocaleProviders locale={defaultLocale}>
        <MindeaseDemoPage params={params} />
      </LocaleProviders>
    </>
  );
}
