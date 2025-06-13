import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { BsArrowRight, BsSearch } from "react-icons/bs";

// Datos de ejemplo - reemplaza con tus proyectos reales
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
  },
  {
    id: 2,
    title: "E-commerce Dashboard",
    description:
      "Complete dashboard for managing online store operations with real-time analytics.",
    image: "/thumb1.jpg",
    categories: ["website", "financial apps"],
    link: "/work/ecommerce-dashboard",
  },
  {
    id: 3,
    title: "Task Manager Extension",
    description:
      "Chrome extension for productivity management with calendar integration.",
    image: "/thumb2.jpg",
    categories: ["chrome extensions"],
    link: "/work/task-manager",
  },
  {
    id: 4,
    title: "NetSuite Inventory App",
    description:
      "Custom NetSuite application for advanced inventory management and reporting.",
    image: "/thumb3.jpg",
    categories: ["netsuite apps", "financial apps"],
    link: "/work/netsuite-inventory",
  },
  {
    id: 5,
    title: "Portfolio Website",
    description:
      "Modern portfolio website with smooth animations and responsive design.",
    image: "/thumb4.jpg",
    categories: ["website"],
    link: "/work/portfolio-website",
  },
  {
    id: 6,
    title: "Budget Tracker",
    description:
      "Personal finance application with expense tracking and budget planning.",
    image: "/thumb1.jpg",
    categories: ["financial apps", "website"],
    link: "/work/budget-tracker",
  },
  {
    id: 7,
    title: "Password Manager Extension",
    description:
      "Secure password management browser extension with encryption.",
    image: "/thumb2.jpg",
    categories: ["chrome extensions"],
    link: "/work/password-manager",
  },
];

const categories = [
  { id: "all", name: "All Projects", count: workData.length },
  {
    id: "chrome extensions",
    name: "Chrome Extensions",
    count: workData.filter((item) =>
      item.categories.includes("chrome extensions")
    ).length,
  },
  {
    id: "netsuite apps",
    name: "NetSuite Apps",
    count: workData.filter((item) => item.categories.includes("netsuite apps"))
      .length,
  },
  {
    id: "financial apps",
    name: "Financial Apps",
    count: workData.filter((item) => item.categories.includes("financial apps"))
      .length,
  },
  {
    id: "trading-bots",
    name: "Trading Systems",
    count: workData.filter((item) => item.categories.includes("trading-bots"))
      .length,
  },
  {
    id: "website",
    name: "Websites",
    count: workData.filter((item) => item.categories.includes("website"))
      .length,
  },
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
                              {category}
                            </span>
                          ))}
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-accent transition-colors duration-300">
                          {project.title}
                        </h3>

                        {/* Description */}
                        <p className="text-white/70 text-sm leading-relaxed mb-6">
                          {project.description}
                        </p>

                        {/* Button */}
                        {project.isExternal ? (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg
                                      bg-gradient-to-r from-accent to-accent/80 text-white
                                      hover:from-accent/90 hover:to-accent/70
                                      transition-all duration-300 group/btn"
                          >
                            <span className="text-sm font-medium">View Live Demo</span>
                            <BsArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                          </a>
                        ) : (
                          <Link href={project.link}>
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg
                                          bg-gradient-to-r from-accent to-accent/80 text-white
                                          hover:from-accent/90 hover:to-accent/70
                                          transition-all duration-300 group/btn">
                              <span className="text-sm font-medium">View Project</span>
                              <BsArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                            </div>
                          </Link>
                        )}
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
                  <p className="text-white/70 text-sm leading-relaxed mb-6 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Button */}
                  {project.isExternal ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg
                                bg-gradient-to-r from-accent/20 to-accent/10 border border-accent/30
                                text-accent hover:from-accent hover:to-accent/80 hover:text-white
                                transition-all duration-300 group/btn"
                    >
                      <span className="text-sm font-medium">View Live Demo</span>
                      <BsArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </a>
                  ) : (
                    <Link href={project.link}>
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg
                                    bg-gradient-to-r from-accent/20 to-accent/10 border border-accent/30
                                    text-accent hover:from-accent hover:to-accent/80 hover:text-white
                                    transition-all duration-300 group/btn">
                        <span className="text-sm font-medium">View Project</span>
                        <BsArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                      </div>
                    </Link>
                  )}
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