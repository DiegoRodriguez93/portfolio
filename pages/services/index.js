// icons
import {
  RxCrop,
  RxDesktop,
  RxPencil2,
  RxReader,
  RxRocket,
  RxArrowTopRight,
} from "react-icons/rx";

// next link
import Link from "next/link";

// components
import Bulb from "../../components/Bulb";
import Circles from "../../components/Circles";

// framer motion
import { motion } from "framer-motion";
import { fadeIn } from "../../variants";
import SEO from "../../components/SEO";
import { OrganizationJsonLd } from "../../components/JsonLd";

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const getServiceData = (t) => [
  {
    icon: <RxRocket />,
    title: t("services:items.aiSaas.title"),
    description: t("services:items.aiSaas.description"),
    category: "ai-saas-platforms",
  },
  {
    icon: <RxDesktop />,
    title: t("services:items.aiAgents.title"),
    description: t("services:items.aiAgents.description"),
    category: "ai-agent-systems",
  },
  {
    icon: <RxReader />,
    title: t("services:items.llmApps.title"),
    description: t("services:items.llmApps.description"),
    category: "llm-applications",
  },
  {
    icon: <RxCrop />,
    title: t("services:items.riskDetection.title"),
    description: t("services:items.riskDetection.description"),
    category: "ml-risk-detection",
  },
  {
    icon: <RxPencil2 />,
    title: t("services:items.webApps.title"),
    description: t("services:items.webApps.description"),
    category: "web-applications",
  },
  {
    icon: <RxRocket />,
    title: t("services:items.tradingSystems.title"),
    description: t("services:items.tradingSystems.description"),
    category: "algorithmic-trading",
  },
];

const Services = () => {
  const { t } = useTranslation(["services", "common"]);
  const serviceData = getServiceData(t);

  return (
    <>
      <SEO
        title={t("services:seo.title")}
        description={t("services:seo.description")}
        keywords={t("services:seo.keywords")}
        image="/og-services.jpg"
      />
      <OrganizationJsonLd />
      <div className="min-h-full bg-primary/30 py-36">
        <Circles />
        <div className="container mx-auto">
          <div className="flex flex-col gap-y-12">
            {/* text section */}
            <div className="text-center flex flex-col mb-8">
              <motion.h2
                variants={fadeIn("up", 0.2)}
                initial="hidden"
                animate="show"
                exit="hidden"
                className="h2"
              >
                {t("services:heading")} <span className="text-accent">.</span>
              </motion.h2>
              <motion.p
                variants={fadeIn("up", 0.4)}
                initial="hidden"
                animate="show"
                exit="hidden"
                className="mb-4 max-w-[600px] mx-auto text-center"
              >
                {t("services:subtitle")}
              </motion.p>
            </div>

            {/* services grid */}
            <motion.div
              variants={fadeIn("up", 0.6)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="w-full mb-16"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {serviceData.map((item, index) => (
                  <Link
                    key={index}
                    href={`/contact?service=${item.category}`}
                    className="block"
                  >
                    <div className="bg-[rgba(65,47,123,0.15)] h-full rounded-lg px-6 py-8 flex flex-col group cursor-pointer hover:bg-[rgba(89,65,169,0.15)] transition-all duration-300">
                      {/* icon */}
                      <div className="text-4xl text-accent mb-4">
                        {item.icon}
                      </div>

                      {/* title & desc */}
                      <div className="mb-8 flex-1">
                        <div className="mb-2 text-lg font-medium">
                          {item.title}
                        </div>
                        <p className="leading-normal text-white/70 text-sm">
                          {item.description}
                        </p>
                      </div>

                      {/* arrow */}
                      <div className="text-3xl self-end">
                        <RxArrowTopRight className="group-hover:rotate-45 group-hover:text-accent transition-all duration-300" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
        <Bulb />
      </div>
    </>
  );
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "services"])),
    },
  };
}

export default Services;
