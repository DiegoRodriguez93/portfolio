// components
import Bulb from "../../components/Bulb";
import Circles from "../../components/Circles";

// framer motion
import { motion } from "framer-motion";
import { fadeIn } from "../../variants";
import WorkCards from "../../components/WorkCards";

import { PersonJsonLd } from "../../components/JsonLd";
import SEO from "../../components/SEO";

const Work = () => {
  return (
    <>
      <SEO
        title="Portfolio & Projects - Web Applications, Extensions & Trading Systems"
        description="Explore Diego Rodriguez's portfolio featuring web applications, browser extensions, algorithmic trading systems, and enterprise solutions built with React, Next.js, Web3, and modern technologies."
        keywords="portfolio projects, web application portfolio, chrome extensions portfolio, trading bot projects, web3 projects, react projects, next.js portfolio, developer work examples, algorithmic trading systems, fintech applications"
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
              My work <span className="text-accent">.</span>
            </motion.h2>
            <motion.p
              variants={fadeIn("up", 0.4)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="text-lg max-w-[600px] mx-auto text-white/80 leading-relaxed"
            >
              Explore my portfolio of web applications, browser extensions, and
              enterprise solutions. Each project represents a unique challenge
              solved with modern technologies and creative thinking.
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

export default Work;
