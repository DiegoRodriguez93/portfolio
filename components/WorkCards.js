import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { BsArrowRight, BsSearch } from "react-icons/bs";

// Datos de proyectos reales
const workData = [
  {
    id: 1,
    title: "CryptoChart - Professional Trading Charts",
    description:
      "Professional cryptocurrency charting application with real-time data powered by Binance API and TradingView Lightweight Charts.",
    image: "/work/image.png",
    categories: ["trading-bots", "financial apps", "website"],
    link: "https://celadon-arithmetic-9db35a.netlify.app/",
    isExternal: true,
    featured: true,
    technologies: ["React", "TradingView Charts", "Binance API", "WebSocket", "JavaScript"]
  },
  {
    id: 2,
    title: "DEX CLMM Pool Scanner",
    description:
      "Advanced Rust application that analyzes Concentrated Liquidity Market Maker pools across Raydium, Orca, and Meteor DEXs on Solana blockchain.",
    image: "/work/blog-clmm-1.png",
    categories: ["trading-bots", "financial apps"],
    link: "https://github.com/DiegoRodriguez93/dex-clmm-scanner",
    isExternal: true,
    featured: false,
    technologies: ["Rust", "Solana", "DeFi", "API Integration", "Async Programming"]
  },
  {
    id: 3,
    title: "BC.Game - Web3 Casino Platform",
    description:
      "Leading Web3 crypto casino platform with blockchain integration, real-time gaming, and cryptocurrency payment systems. Built scalable backend services and modern frontend interfaces.",
    image: "/thumb1.jpg",
    categories: ["web3", "gaming", "financial apps"],
    link: "https://bc.game/",
    isExternal: true,
    featured: false,
    technologies: ["Node.js", "NestJS", "Next.js", "Web3", "Blockchain", "Casino Gaming"]
  },
  {
    id: 4,
    title: "MeridianLink - Banking Platform",
    description:
      "Enterprise banking and lending platform serving financial institutions. Developed scalable microservices architecture and modern React interfaces.",
    image: "/thumb1.jpg",
    categories: ["financial apps", "enterprise"],
    link: "https://www.meridianlink.com/",
    isExternal: true,
    featured: false,
    technologies: ["React", "Python", "Node.js", "Docker", "Microservices", "PostgreSQL"]
  },
  {
    id: 5,
    title: "VidaApp - Companion Services Management",
    description:
      "Hybrid mobile application for managing companion and care services. Built with React Native for cross-platform compatibility.",
    image: "/thumb2.jpg",
    categories: ["mobile apps", "healthcare"],
    link: "https://play.google.com/store/apps/details?id=uy.com.vida.vidaapp&hl=es_UY&pli=1",
    isExternal: true,
    featured: false,
    technologies: ["React Native", "Mobile Development", "Healthcare", "Cross-platform"]
  },
  {
    id: 6,
    title: "Allstate - Insurance Platform",
    description:
      "Serverless insurance platform built on AWS infrastructure. Developed scalable backend services and modern React frontend applications.",
    image: "/thumb3.jpg",
    categories: ["financial apps", "enterprise", "serverless"],
    link: "https://www.allstate.com/",
    isExternal: true,
    featured: false,
    technologies: ["AWS Lambda", "EC2", "React", "TypeScript", "Express", "Hono", "Serverless"]
  },
  {
    id: 7,
    title: "UnlockReturns - E-commerce Returns Management",
    description:
      "Advanced returns management system for e-commerce platforms. Integrated with NetSuite ERP and built with modern web technologies.",
    image: "/thumb4.jpg",
    categories: ["e-commerce", "enterprise"],
    link: "https://unlockcommerce.co/products/unlockreturns/",
    isExternal: true,
    featured: false,
    technologies: ["React", "Node.js", "Express", "Firebase", "NetSuite", "E-commerce"]
  },
  {
    id: 8,
    title: "UnlockShipping - Logistics Platform",
    description:
      "Comprehensive shipping and logistics management platform for e-commerce businesses. Features real-time tracking and automated workflows.",
    image: "/thumb1.jpg",
    categories: ["e-commerce", "logistics"],
    link: "https://unlockcommerce.co/products/unlockshipping/",
    isExternal: true,
    featured: false,
    technologies: ["React", "Node.js", "Express", "Firebase", "NetSuite", "Logistics API"]
  }
];

const categories = [
  { id: "all", name: "All Projects", count: workData.length },
  {
    id: "trading-bots",
    name: "Trading Systems",
    count: workData.filter((item) => item.categories.includes("trading-bots")).length,
  },
  {
    id: "financial apps",
    name: "Financial Apps",
    count: workData.filter((item) => item.categories.includes("financial apps")).length,
  },
  {
    id: "web3",
    name: "Web3 & Blockchain",
    count: workData.filter((item) => item.categories.includes("web3")).length,
  },
  {
    id: "gaming",
    name: "Gaming",
    count: workData.filter((item) => item.categories.includes("gaming")).length,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    count: workData.filter((item) => item.categories.includes("enterprise")).length,
  },
  {
    id: "mobile apps",
    name: "Mobile Apps",
    count: workData.filter((item) => item.categories.includes("mobile apps")).length,
  },
  {
    id: "e-commerce",
    name: "E-commerce",
    count: workData.filter((item) => item.categories.includes("e-commerce")).length,
  },
  {
    id: "serverless",
    name: "Serverless",
    count: workData.filter((item) => item.categories.includes("serverless")).length,
  }
];

const WorkCards = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Filtrar proyectos basado en categoría y búsqueda
  const filteredProjects = workData.filter((project) => {
    const matchesCategory =
      activeFilter === "all" || project.categories.includes(activeFilter);
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredProjects = filteredProjects.filter((project) => project.featured);
  const regularProjects = filteredProjects.filter((project) => !project.featured);

  return (
    <div className="w-full">
      {/* Search and Filter Section */}
      <div className="mb-12">
        {/* Search Bar */}
        <div className="relative mb-8 max-w-md mx-auto">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <BsSearch className="h-5 w-5 text-white/40" />
          </div>
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-3 border border-white/10 rounded-lg 
                     bg-white/5 backdrop-blur-sm text-white placeholder-white/40
                     focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent
                     transition-all duration-300"
          />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveFilter(category.id)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300
                         border backdrop-blur-sm
                         ${
                           activeFilter === category.id
                             ? "bg-accent text-white border-accent shadow-lg shadow-accent/25"
                             : "bg-white/5 text-white/80 border-white/10 hover:bg-white/10 hover:border-white/20"
                         }`}
            >
              {category.name}
              <span className="ml-2 px-2 py-1 rounded-full text-xs bg-white/10">
                {category.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">Featured Projects</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <AnimatePresence>
              {featuredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="group"
                >
                  <div className="bg-gradient-to-r from-accent/20 to-accent/10 border border-accent/30 rounded-xl p-1">
                    <div className="bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden hover:shadow-xl hover:shadow-accent/10 transition-all duration-500">
                      {/* Image */}
                      <div className="relative h-64 overflow-hidden">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="bg-accent text-white px-3 py-1 rounded-full text-sm font-medium">
                            Featured
                          </span>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        {/* Categories */}
                        <div className="flex flex-wrap gap-2 mb-3">
                          {project.categories.map((category) => (
                            <span
                              key={category}
                              className="px-3 py-1 text-xs rounded-full bg-accent/20 text-accent border border-accent/30"
                            >
                              {category.replace("-", " ")}
                            </span>
                          ))}
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-accent transition-colors duration-300">
                          {project.title}
                        </h3>

                        {/* Description */}
                        <p className="text-white/70 text-sm leading-relaxed mb-4">
                          {project.description}
                        </p>

                        {/* Technologies */}
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-1 text-xs rounded bg-white/10 text-white/80"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        {/* Button */}
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg
                                    bg-gradient-to-r from-accent to-accent/80 text-white
                                    hover:from-accent/90 hover:to-accent/70
                                    transition-all duration-300 group/btn"
                        >
                          <span className="text-sm font-medium">View Project</span>
                          <BsArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Regular Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence>
          {regularProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-accent/50 transition-all duration-500 hover:shadow-xl hover:shadow-accent/10">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Categories */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.categories.slice(0, 2).map((category) => (
                      <span
                        key={category}
                        className="px-3 py-1 text-xs rounded-full bg-accent/20 text-accent border border-accent/30"
                      >
                        {category.replace("-", " ")}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-accent transition-colors duration-300 line-clamp-2">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white/70 text-sm leading-relaxed mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1 mb-6">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs rounded bg-white/10 text-white/80"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-2 py-1 text-xs rounded bg-white/10 text-white/60">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Button */}
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg
                              bg-gradient-to-r from-accent/20 to-accent/10 border border-accent/30
                              text-accent hover:from-accent hover:to-accent/80 hover:text-white
                              transition-all duration-300 group/btn"
                  >
                    <span className="text-sm font-medium">View Project</span>
                    <BsArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* No Results Message */}
      {filteredProjects.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="text-white/60 text-lg">
            No projects found matching your criteria.
          </div>
          <button
            onClick={() => {
              setSearchTerm("");
              setActiveFilter("all");
            }}
            className="mt-4 px-6 py-2 text-accent hover:text-white transition-colors duration-300"
          >
            Clear filters
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default WorkCards;