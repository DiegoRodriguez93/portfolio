import React from "react";

// icons
import { FaHtml5, FaCss3, FaJs, FaReact, FaPython } from "react-icons/fa";

import {
  SiNextdotjs,
  SiNodedotjs,
  SiTypescript,
  SiMongodb,
  SiPostgresql,
  SiAmazonaws,
  SiDocker,
  SiFlask,
  SiPandas,
  SiNumpy,
  SiScikitlearn,
  SiTensorflow,
  SiKubernetes,
  SiVercel,
  SiNestjs,
  SiGooglecloud,
  SiExpress,
  SiPhp,
} from "react-icons/si";

// components
import Avatar from "../../components/Avatar";
import Circles from "../../components/Circles";

// framer motion
import { motion } from "framer-motion";
import { fadeIn } from "../../variants";

// counter
import CountUp from "react-countup";

import SEO from "../../components/SEO";
import { PersonJsonLd } from "../../components/JsonLd";

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const getAboutData = (t) => [
  {
    title: t("about:sections.skills"),
    info: [
      {
        title: t("about:skillItems.frontend"),
        icons: [
          <FaHtml5 key="html" />,
          <FaCss3 key="css" />,
          <FaJs key="js" />,
          <FaReact key="react" />,
          <SiNextdotjs key="next" />,
          <SiTypescript key="ts" />,
        ],
      },
      {
        title: t("about:skillItems.backend"),
        icons: [
          <SiNodedotjs key="node" />,
          <FaPython key="python" />,
          <SiFlask key="flask" />,
          <SiNestjs key="nest" />,
          <SiPhp key="php" />,
          <SiMongodb key="mongo" />,
          <SiPostgresql key="postgres" />,
        ],
      },
      {
        title: t("about:skillItems.ml"),
        icons: [<SiPandas key="pandas" />, <SiNumpy key="numpy" />, <SiScikitlearn key="sklearn" />, <SiTensorflow key="tf" />],
      },
      {
        title: t("about:skillItems.devops"),
        icons: [
          <SiAmazonaws key="aws" />,
          <SiDocker key="docker" />,
          <SiKubernetes key="k8s" />,
          <SiVercel key="vercel" />,
          <SiGooglecloud key="gcloud" />,
        ],
      },
    ],
  },
  {
    title: t("about:sections.experience"),
    info: [
      {
        title: t("about:experienceItems.vipclub.title"),
        stage: t("about:experienceItems.vipclub.stage"),
        description: t("about:experienceItems.vipclub.description"),
      },
      {
        title: t("about:experienceItems.encora.title"),
        stage: t("about:experienceItems.encora.stage"),
        description: t("about:experienceItems.encora.description"),
      },
      {
        title: t("about:experienceItems.codigo.title"),
        stage: t("about:experienceItems.codigo.stage"),
        description: t("about:experienceItems.codigo.description"),
      },
      {
        title: t("about:experienceItems.vida.title"),
        stage: t("about:experienceItems.vida.stage"),
        description: t("about:experienceItems.vida.description"),
      },
    ],
  },
  {
    title: t("about:sections.financialExpertise"),
    info: [
      {
        title: t("about:financialItems.algoTrading.title"),
        description: t("about:financialItems.algoTrading.description"),
      },
      {
        title: t("about:financialItems.mlTrading.title"),
        description: t("about:financialItems.mlTrading.description"),
      },
      {
        title: t("about:financialItems.dataAnalysis.title"),
        description: t("about:financialItems.dataAnalysis.description"),
      },
      {
        title: t("about:financialItems.tradingPlatform.title"),
        description: t("about:financialItems.tradingPlatform.description"),
      },
      {
        title: t("about:financialItems.defi.title"),
        description: t("about:financialItems.defi.description"),
      },
    ],
  },
  {
    title: t("about:sections.productsCanBuild"),
    info: [
      {
        title: t("about:productItems.aiTrading.title"),
        description: t("about:productItems.aiTrading.description"),
      },
      {
        title: t("about:productItems.financialApis.title"),
        description: t("about:productItems.financialApis.description"),
      },
      {
        title: t("about:productItems.chromeExtensions.title"),
        description: t("about:productItems.chromeExtensions.description"),
      },
      {
        title: t("about:productItems.webApps.title"),
        description: t("about:productItems.webApps.description"),
      },
      {
        title: t("about:productItems.hybridMobile.title"),
        description: t("about:productItems.hybridMobile.description"),
      },
      {
        title: t("about:productItems.mlBots.title"),
        description: t("about:productItems.mlBots.description"),
      },
    ],
  },
  {
    title: t("about:sections.education"),
    info: [
      {
        title: t("about:educationItems.udelar.title"),
        stage: t("about:educationItems.udelar.stage"),
      },
      {
        title: t("about:educationItems.blockchain.title"),
        stage: t("about:educationItems.blockchain.stage"),
        certificate:
          "https://www.coursera.org/account/accomplishments/certificate/2H6SDUE4Z67Y",
      },
      {
        title: t("about:educationItems.docker.title"),
        stage: t("about:educationItems.docker.stage"),
        certificate:
          "https://www.coursera.org/account/accomplishments/certificate/9GERLJ3P2M5M",
      },
      {
        title: t("about:educationItems.oop.title"),
        stage: t("about:educationItems.oop.stage"),
        certificate:
          "https://www.udemy.com/certificate/UC-183d476b-6609-49c9-93fa-e62ed6f81f4e/",
      },
      {
        title: t("about:educationItems.react.title"),
        stage: t("about:educationItems.react.stage"),
        certificate: "https://www.udemy.com/certificate/UC-5CV6SBTV/",
      },
      {
        title: t("about:educationItems.nativescript.title"),
        stage: t("about:educationItems.nativescript.stage"),
        certificate: "https://www.udemy.com/certificate/UC-79QBV0S4/",
      },
      {
        title: t("about:educationItems.linux.title"),
        stage: t("about:educationItems.linux.stage"),
        certificate: "https://www.udemy.com/certificate/UC-X0FAAVPA/",
      },
    ],
  },
];

const About = () => {
  const { t } = useTranslation(["about", "common"]);
  const aboutData = getAboutData(t);

  // Parse heading with accent
  const headingParts = t("about:heading").split(/<accent>(.*?)<\/accent>/);

  return (
    <>
      <SEO
        title={t("about:seo.title")}
        description={t("about:seo.description")}
        keywords={t("about:seo.keywords")}
        image="/og-about.jpg"
      />
      <PersonJsonLd />
      <div className="h-full bg-primary/30 py-32 text-center xl:text-left">
        <Circles />
        {/* avatar img */}
        <motion.div
          variants={fadeIn("right", 0.2)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="hidden xl:flex absolute bottom-0 -left-[370px]"
        >
          <Avatar />
        </motion.div>
        <div className="container mx-auto h-full flex flex-col">
          {/* text and counters section */}
          <div className="flex flex-col items-center xl:flex-row gap-x-6 mb-12">
            <div className="flex-1 flex flex-col justify-center">
              <motion.h2
                variants={fadeIn("right", 0.2)}
                initial="hidden"
                animate="show"
                exit="hidden"
                className="h2"
              >
                {headingParts.map((part, i) =>
                  i % 2 === 1 ? (
                    <span key={i} className="text-accent">{part}</span>
                  ) : (
                    <React.Fragment key={i}>{part}</React.Fragment>
                  )
                )}
              </motion.h2>
              <motion.p
                variants={fadeIn("right", 0.4)}
                initial="hidden"
                animate="show"
                exit="hidden"
                className="max-w-[500px] mx-auto xl:mx-0 mb-6 xl:mb-12 px-2 xl:px-0"
              >
                {t("about:bio")}
              </motion.p>
              {/* counters */}
              <motion.div
                variants={fadeIn("right", 0.6)}
                initial="hidden"
                animate="show"
                exit="hidden"
                className="hidden md:flex md:max-w-xl xl:max-w-none mx-auto xl:mx-0 mb-8"
              >
                <div className="flex flex-1 xl:gap-x-6">
                  {/* experience */}
                  <div className="relative flex-1 after:w-[1px] after:h-full after:bg-white/10 after:absolute after:top-0 after:right-0">
                    <div className="text-2xl xl:text-4xl font-extrabold text-accent mb-2">
                      <CountUp start={0} end={9} duration={5} /> +
                    </div>
                    <div className="text-xs uppercase tracking-[1px] leading-[1.4] max-w-[100px]">
                      {t("about:counters.experience")}
                    </div>
                  </div>
                  {/* projects */}
                  <div className="relative flex-1 after:w-[1px] after:h-full after:bg-white/10 after:absolute after:top-0 after:right-0">
                    <div className="text-2xl xl:text-4xl font-extrabold text-accent mb-2">
                      <CountUp start={0} end={50} duration={5} /> +
                    </div>
                    <div className="text-xs uppercase tracking-[1px] leading-[1.4] max-w-[100px]">
                      {t("about:counters.projects")}
                    </div>
                  </div>
                  {/* technologies */}
                  <div className="relative flex-1 after:w-[1px] after:h-full after:bg-white/10 after:absolute after:top-0 after:right-0">
                    <div className="text-2xl xl:text-4xl font-extrabold text-accent mb-2">
                      <CountUp start={0} end={35} duration={5} /> +
                    </div>
                    <div className="text-xs uppercase tracking-[1px] leading-[1.4] max-w-[100px]">
                      {t("about:counters.technologies")}
                    </div>
                  </div>
                  {/* certifications */}
                  <div className="relative flex-1">
                    <div className="text-2xl xl:text-4xl font-extrabold text-accent mb-2">
                      <CountUp start={0} end={8} duration={5} /> +
                    </div>
                    <div className="text-xs uppercase tracking-[1px] leading-[1.4] max-w-[100px]">
                      {t("about:counters.certifications")}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Full width info section */}
          <motion.div
            variants={fadeIn("up", 0.4)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="w-full mb-16"
          >
            <div
              style={{ marginBottom: "120px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
            >
              {aboutData.map((section, sectionIndex) => (
                <div key={sectionIndex} className="space-y-4">
                  <h3 className="text-lg xl:text-xl font-bold text-accent capitalize mb-4 border-b border-accent/30 pb-2">
                    {section.title}
                  </h3>
                  <div className="space-y-3">
                    {section.info.map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className="p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300"
                      >
                        <div className="flex flex-col gap-y-2 text-white">
                          <div className="font-medium text-sm">
                            {item.title}
                          </div>
                          {item.stage && (
                            <div className="text-accent text-xs">
                              {item.stage}
                            </div>
                          )}
                          {item.description && (
                            <div className="text-white/70 text-xs leading-relaxed">
                              {item.description}
                            </div>
                          )}
                          {item.certificate && (
                            <a
                              href={item.certificate}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-x-1 text-accent hover:text-white transition-colors duration-300 text-xs cursor-pointer underline hover:no-underline"
                            >
                              {t("about:viewCertificate")}
                              <svg
                                className="w-3 h-3"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                />
                              </svg>
                            </a>
                          )}
                          {item.icons && (
                            <div className="flex gap-x-2 mt-2 flex-wrap">
                              {item.icons.map((icon, iconIndex) => (
                                <div
                                  key={iconIndex}
                                  className="text-lg text-accent hover:text-white transition-colors duration-300"
                                >
                                  {icon}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "about"])),
    },
  };
}

export default About;
