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

// Updated about data with Python/ML trading focus
export const aboutData = [
  {
    title: "skills",
    info: [
      {
        title: "Frontend Development",
        icons: [
          <FaHtml5 />,
          <FaCss3 />,
          <FaJs />,
          <FaReact />,
          <SiNextdotjs />,
          <SiTypescript />,
        ],
      },
      {
        title: "Backend Development",
        icons: [
          <SiNodedotjs />,
          <FaPython />,
          <SiFlask />,
          <SiNestjs />,
          <SiPhp />,
          <SiMongodb />,
          <SiPostgresql />,
        ],
      },
      {
        title: "Machine Learning & Data Science (Trading)",
        icons: [<SiPandas />, <SiNumpy />, <SiScikitlearn />, <SiTensorflow />],
      },
      {
        title: "DevOps & Cloud Services",
        icons: [
          <SiAmazonaws />,
          <SiDocker />,
          <SiKubernetes />,
          <SiVercel />,
          <SiGooglecloud />,
        ],
      },
    ],
  },
  {
    title: "experience",
    info: [
      {
        title: "Senior Fullstack Developer - VIPCLUB.LV",
        stage: "2024 - 2025",
        description:
          "Web3 crypto casino platform development with blockchain integration and Python-based analytics",
      },
      {
        title: "Senior Frontend Developer - ENCORA",
        stage: "2021 - 2023",
        description:
          "Fintech SaaS startup - Led frontend architecture and mentored junior developers",
      },
      {
        title: "Full Stack Developer - CODIGO DEL SUR",
        stage: "2020 - 2021",
        description:
          "Insurance SaaS platform - Developed new features and maintained production systems",
      },
      {
        title: "Full Stack Developer - VIDA SERVICIO",
        stage: "2016 - 2020",
        description:
          "Custom business applications development and legacy system maintenance",
      },
    ],
  },
  {
    title: "financial expertise",
    info: [
      {
        title: "Algorithmic Trading Systems",
        description:
          "Development of automated trading bots using Python, Jesse framework, and advanced ML algorithms (PPO, SAC)",
      },
      {
        title: "Machine Learning Trading",
        description:
          "Implementation of reinforcement learning algorithms (PPO, SAC) for adaptive trading strategies and market prediction",
      },
      {
        title: "Financial Data Analysis",
        description:
          "Real-time market data processing using Python, Flask APIs, technical indicators, and risk management systems",
      },
      {
        title: "Trading Platform Development",
        description:
          "Custom trading interfaces, portfolio management tools, and market analysis dashboards with Python backends",
      },
      {
        title: "DeFi & Yield Farming",
        description:
          "Smart contract integration for decentralized finance protocols and yield optimization strategies",
      },
    ],
  },
  {
    title: "products I can build",
    info: [
      {
        title: "AI Trading Systems",
        description:
          "Advanced algorithmic trading platforms using Jesse framework with PPO/SAC reinforcement learning models",
      },
      {
        title: "Financial APIs",
        description:
          "RESTful APIs built with Flask for market data processing, trading signals, and portfolio management",
      },
      {
        title: "Chrome Extensions",
        description:
          "Browser extensions for automation, productivity, trading assistance, and Web3 integration",
      },
      {
        title: "Web Applications",
        description:
          "Modern responsive web apps using React, Next.js, and Python backends with Flask",
      },
      {
        title: "Hybrid Mobile Apps",
        description:
          "Cross-platform mobile applications using React Native with Python API integration",
      },
      {
        title: "ML Trading Bots",
        description:
          "Intelligent trading systems with adaptive learning capabilities using reinforcement learning algorithms",
      },
    ],
  },
  {
    title: "education",
    info: [
      {
        title: "Software Engineering - UDELAR",
        stage: "University Degree",
      },
      {
        title: "Blockchain & Smart Contracts - Buffalo University",
        stage: "Coursera Certification",
        certificate:
          "https://www.coursera.org/account/accomplishments/certificate/2H6SDUE4Z67Y",
      },
      {
        title: "Docker Fundamentals",
        stage: "Coursera Certification",
        certificate:
          "https://www.coursera.org/account/accomplishments/certificate/9GERLJ3P2M5M",
      },
      {
        title: "Object Oriented Programming JavaScript",
        stage: "Udemy Certification",
        certificate:
          "https://www.udemy.com/certificate/UC-183d476b-6609-49c9-93fa-e62ed6f81f4e/",
      },
      {
        title: "React & React Native",
        stage: "Udemy Certification",
        certificate: "https://www.udemy.com/certificate/UC-5CV6SBTV/",
      },
      {
        title: "NativeScript Development",
        stage: "Udemy Certification",
        certificate: "https://www.udemy.com/certificate/UC-79QBV0S4/",
      },
      {
        title: "Linux Server Management and Security",
        stage: "Udemy Certification",
        certificate: "https://www.udemy.com/certificate/UC-X0FAAVPA/",
      },
    ],
  },
];

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

const About = () => {
  return (
    <>
      <SEO
        title="About Diego Rodriguez - Senior Full Stack Developer & ML Trading Specialist"
        description="Learn about Diego Rodriguez, a senior full stack developer with 9+ years of experience in Web3, fintech, algorithmic trading systems with Python/Flask, Jesse framework, and machine learning (PPO, SAC algorithms). University educated with multiple certifications in blockchain and software engineering."
        keywords="diego rodriguez about, full stack developer experience, web3 expertise, python flask developer, jesse framework, machine learning trading, PPO SAC algorithms, trading systems developer, software engineer uruguay, blockchain developer experience, fintech developer background"
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
                Transforming <span className="text-accent">ideas</span> into
                digital reality.
              </motion.h2>
              <motion.p
                variants={fadeIn("right", 0.4)}
                initial="hidden"
                animate="show"
                exit="hidden"
                className="max-w-[500px] mx-auto xl:mx-0 mb-6 xl:mb-12 px-2 xl:px-0"
              >
                I&apos;m an enterprising full-stack developer who loves
                challenges and never gives up easily. With expertise in Web3,
                fintech, algorithmic trading using Python/Flask, Jesse
                framework, and machine learning (PPO, SAC algorithms), I
                specialize in creating intelligent financial applications that
                drive business growth.
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
                      Years of experience
                    </div>
                  </div>
                  {/* projects */}
                  <div className="relative flex-1 after:w-[1px] after:h-full after:bg-white/10 after:absolute after:top-0 after:right-0">
                    <div className="text-2xl xl:text-4xl font-extrabold text-accent mb-2">
                      <CountUp start={0} end={50} duration={5} /> +
                    </div>
                    <div className="text-xs uppercase tracking-[1px] leading-[1.4] max-w-[100px]">
                      Projects completed
                    </div>
                  </div>
                  {/* technologies */}
                  <div className="relative flex-1 after:w-[1px] after:h-full after:bg-white/10 after:absolute after:top-0 after:right-0">
                    <div className="text-2xl xl:text-4xl font-extrabold text-accent mb-2">
                      <CountUp start={0} end={35} duration={5} /> +
                    </div>
                    <div className="text-xs uppercase tracking-[1px] leading-[1.4] max-w-[100px]">
                      Technologies mastered
                    </div>
                  </div>
                  {/* certifications */}
                  <div className="relative flex-1">
                    <div className="text-2xl xl:text-4xl font-extrabold text-accent mb-2">
                      <CountUp start={0} end={8} duration={5} /> +
                    </div>
                    <div className="text-xs uppercase tracking-[1px] leading-[1.4] max-w-[100px]">
                      Certifications earned
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
                              View Certificate
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

export default About;
