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

// service data - actualizado con tus servicios reales
export const serviceData = [
  {
    icon: <RxDesktop />,
    title: "Web Applications",
    description:
      "Modern responsive web applications using React, Next.js, and cutting-edge technologies for optimal performance.",
    category: "web-applications",
  },
  {
    icon: <RxRocket />,
    title: "Trading Bots",
    description:
      "Automated algorithmic trading systems for cryptocurrency and forex markets with advanced risk management.",
    category: "trading-bots",
  },
  {
    icon: <RxCrop />,
    title: "Chrome Extensions",
    description:
      "Custom browser extensions for automation, productivity, trading assistance, and Web3 integration.",
    category: "chrome-extensions",
  },
  {
    icon: <RxPencil2 />,
    title: "Mobile Apps",
    description:
      "Cross-platform hybrid mobile applications using React Native and Capacitor.js for iOS and Android.",
    category: "mobile-apps",
  },
  {
    icon: <RxReader />,
    title: "Web3 Development",
    description:
      "Blockchain integration, smart contracts, DeFi protocols, and decentralized application development.",
    category: "web3-development",
  },
  {
    icon: <RxRocket />,
    title: "Financial Solutions",
    description:
      "Fintech applications, payment systems, portfolio management tools, and algorithmic trading platforms.",
    category: "financial-solutions",
  },
];

// components
import Bulb from "../../components/Bulb";
import Circles from "../../components/Circles";

// framer motion
import { motion } from "framer-motion";
import { fadeIn } from "../../variants";
import SEO from "../../components/SEO";
import { OrganizationJsonLd } from "../../components/JsonLd";

const Services = () => {
  return (
    <>
      <SEO
        title="Development Services - Web3, Trading Bots & Chrome Extensions"
        description="Professional development services including Web3 applications, algorithmic trading systems, chrome extensions, mobile apps, and fintech solutions. Custom software development with modern technologies."
        keywords="web development services, trading bot development, chrome extension development, web3 development services, mobile app development, fintech solutions, custom software development, react development services"
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
                My services <span className="text-accent">.</span>
              </motion.h2>
              <motion.p
                variants={fadeIn("up", 0.4)}
                initial="hidden"
                animate="show"
                exit="hidden"
                className="mb-4 max-w-[600px] mx-auto text-center"
              >
                I specialize in creating innovative digital solutions that drive
                business growth. From Web3 applications to trading systems, I
                deliver scalable and secure technology solutions.
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

export default Services;
