/* import Image from "next/image"; */

import ParticlesContainer from "../components/ParticlesContainer";
import ProjectsBtn from "../components/ProjectsBtn";
/* import Avatar from "../components/Avatar"; */

import { motion } from "framer-motion";

import { fadeIn } from "../variants";

import SEO from "../components/SEO";
import { PersonJsonLd } from "../components/JsonLd";

const Home = () => {
  return (
    <>
      <SEO
        title="Diego Rodriguez - Senior Full Stack Developer | Web3, Trading Bots & Chrome Extensions"
        description="Senior Full Stack Developer with 9+ years experience specializing in Web3, algorithmic trading systems, chrome extensions, and fintech solutions. Transform your ideas into digital reality with modern technologies like React, Next.js, and blockchain."
        keywords="diego rodriguez, full stack developer, web3 developer, trading bots, chrome extensions, algorithmic trading, react developer, next.js developer, blockchain developer, fintech developer, uruguay developer, senior developer, custom software development"
      />

      {/* Structured Data para la homepage */}
      <PersonJsonLd />

      <div className="bg-primary/60 h-full">
        <div className="w-full h-full bg-gradient-to-r from-primary/10 via-black/30 to-black/10">
          <div className="text-center flex flex-col justify-center xl:pt-40 xl:text-left h-full container mx-auto">
            <motion.h1
              variants={fadeIn("down", 0.1)} // Reducido delay
              initial="hidden"
              animate="show"
              exit="hidden"
              className="h1"
              style={{
                willChange: 'transform, opacity',
                contain: 'layout style paint',
              }}
            >
              Transforming Ideas <br /> Into{" "}
              <span className="text-accent">Digital Reality</span>
            </motion.h1>

            <motion.p
              variants={fadeIn("down", 0.2)} // Reducido delay
              initial="hidden"
              animate="show"
              exit="hidden"
              className="max-w-sm xl:max-w-xl mx-auto xl:mx-0 mb-10 xl:mb-16"
              style={{
                willChange: 'transform, opacity',
                contain: 'layout style paint',
              }}
            >
              I create powerful digital solutions that drive results. From
              stunning websites to custom applications, I help businesses
              establish their online presence and connect with their audience
              through innovative technology and compelling design.
            </motion.p>

            <div className="flex justify-center xl:hidden relative">
              <ProjectsBtn />
            </div>
            <motion.div
              variants={fadeIn("down", 0.3)} // Reducido delay
              initial="hidden"
              animate="show"
              exit="hidden"
              className="hidden xl:flex"
              style={{
                willChange: 'transform, opacity',
              }}
            >
              <ProjectsBtn />
            </motion.div>
          </div>
        </div>

        <div className="w-[1200px] h-full absolute right-0 bottom-0">
          <div className="bg-none xl:bg-explosion xl:bg-cover xl:bg-right xl:bg-no-repeat w-full h-full absolute mix-blend-color-dodge translate-z-0"></div>

          <ParticlesContainer />

          <motion.div
            variants={fadeIn("up", 0.4)} // Reducido delay
            initial="hidden"
            animate="show"
            exit="hidden"
            transition={{ duration: 0.8, ease: "easeInOut" }} // Reducido duration
            className="w-full h-full max-w-[737px] max-h-[678px] absolute -bottom-32 lg:bottom-0 lg:right-[8%]"
            style={{
              willChange: 'transform, opacity',
            }}
          >
            {/* <Avatar /> */}
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Home;