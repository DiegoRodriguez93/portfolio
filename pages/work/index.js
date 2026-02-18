// components
import Bulb from "../../components/Bulb";
import Circles from "../../components/Circles";

// framer motion
import { motion } from "framer-motion";
import { fadeIn } from "../../variants";
import WorkCards from "../../components/WorkCards";

import { PersonJsonLd } from "../../components/JsonLd";
import SEO from "../../components/SEO";

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Work = () => {
  const { t } = useTranslation(["work", "common"]);

  return (
    <>
      <SEO
        title={t("work:seo.title")}
        description={t("work:seo.description")}
        keywords={t("work:seo.keywords")}
        image="/og-work.jpg"
      />

      <PersonJsonLd />
      <div className="min-h-full bg-primary/30 py-36">
        <Circles />
        <div className="container mx-auto px-4">
          {/* Header Section */}
          <div className="text-center mb-16">
            <motion.h2
              variants={fadeIn("up", 0.2)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="h2 mb-6"
            >
              {t("work:heading")} <span className="text-accent">.</span>
            </motion.h2>
            <motion.p
              variants={fadeIn("up", 0.4)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="text-lg max-w-[600px] mx-auto text-white/80 leading-relaxed"
            >
              {t("work:subtitle")}
            </motion.p>
          </div>

          {/* Work Cards Section */}
          <motion.div
            variants={fadeIn("up", 0.6)}
            initial="hidden"
            animate="show"
            exit="hidden"
          >
            <WorkCards />
          </motion.div>
        </div>
        <Bulb />
      </div>
    </>
  );
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "work"])),
    },
  };
}

export default Work;
