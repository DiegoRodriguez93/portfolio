import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { BsArrowRight, BsSearch, BsClock, BsCalendar } from "react-icons/bs";

// components
import Bulb from "../../components/Bulb";
import Circles from "../../components/Circles";
import SEO from "../../components/SEO";

// framer motion
import { fadeIn } from "../../variants";

// Blog posts data
const blogPosts = [
  {
    id: 1,
    title: "Building a DEX Pool Scanner: Analyzing CLMM Pools on Solana with Rust",
    excerpt:
      "Learn how to build a sophisticated DeFi analytics tool using Rust to scan and analyze Concentrated Liquidity Market Maker pools across multiple Solana DEXs like Raydium, Orca, and Meteor.",
    image: "/work/blog-clmm-1.png",
    categories: ["defi", "rust", "solana"],
    readTime: "12 min read",
    publishDate: "2025-08-22",
    slug: "building-dex-pool-scanner-clmm-solana-rust",
    featured: true,
  },
  {
    id: 2,
    title: "When AI Coding Goes Wrong: From Prototype to Production Nightmare",
    excerpt:
      "Why 80% of AI-generated projects never see production and how professional developers can rescue your stuck projects. Learn the common pitfalls and get expert help to ship your ideas.",
    image: "/thumb2.jpg",
    categories: ["ai-development", "project-rescue", "consulting"],
    readTime: "8 min read",
    publishDate: "2025-09-08",
    slug: "ai-coding-problems-project-rescue-services",
    featured: false,
  },
  {
    id: 3,
    title: "Building Professional Cryptocurrency Charts: TradingView Integration & Binance API",
    excerpt:
      "Complete guide to building professional cryptocurrency charting applications with TradingView Lightweight Charts, Binance API integration, and real-time data streaming.",
    image: "/work/image.png",
    categories: ["cryptocurrency", "trading-apis", "charts"],
    readTime: "14 min read",
    publishDate: "2025-01-20",
    slug: "cryptocurrency-charting-trading-api-integration",
    featured: false,
  },
  {
    id: 4,
    title: "How to Build Profitable Trading Bots in 2025: A Complete Guide",
    excerpt:
      "Learn how to develop algorithmic trading systems using Python, Jesse framework, and machine learning algorithms like PPO and SAC for consistent profits.",
    image: "/thumb1.jpg",
    categories: ["trading-bots", "python", "machine-learning"],
    readTime: "12 min read",
    publishDate: "2025-01-15",
    slug: "how-to-build-profitable-trading-bots-2025",
    featured: false,
  },
  {
    id: 5,
    title: "Web3 Development Best Practices for Enterprise Applications",
    excerpt:
      "Discover the essential patterns and security considerations when building enterprise-grade Web3 applications with React and blockchain integration.",
    image: "/thumb2.jpg",
    categories: ["web3", "blockchain", "enterprise"],
    readTime: "8 min read",
    publishDate: "2025-01-10",
    slug: "web3-development-best-practices-enterprise",
    featured: false,
  },
  {
    id: 6,
    title: "Chrome Extension Development: From Idea to Chrome Store",
    excerpt:
      "Step-by-step guide to building, testing, and publishing Chrome extensions that solve real problems and generate revenue.",
    image: "/thumb3.jpg",
    categories: ["chrome-extensions", "javascript", "monetization"],
    readTime: "10 min read",
    publishDate: "2025-01-05",
    slug: "chrome-extension-development-guide",
    featured: false,
  },
  {
    id: 7,
    title: "Fintech API Development: Security and Scalability",
    excerpt:
      "Building secure and scalable financial APIs with Node.js, implementing proper authentication, rate limiting, and compliance standards.",
    image: "/thumb4.jpg",
    categories: ["fintech", "api-development", "security"],
    readTime: "15 min read",
    publishDate: "2025-01-01",
    slug: "fintech-api-development-security-scalability",
    featured: false,
  },
];

const categories = [
  { id: "all", name: "All Posts", count: blogPosts.length },
  {
    id: "ai-development",
    name: "AI Development",
    count: blogPosts.filter((post) =>
      post.categories.includes("ai-development")
    ).length,
  },
  {
    id: "project-rescue",
    name: "Project Rescue",
    count: blogPosts.filter((post) =>
      post.categories.includes("project-rescue")
    ).length,
  },
  {
    id: "defi",
    name: "DeFi & Blockchain",
    count: blogPosts.filter((post) =>
      post.categories.includes("defi")
    ).length,
  },
  {
    id: "rust",
    name: "Rust Development",
    count: blogPosts.filter((post) => post.categories.includes("rust"))
      .length,
  },
  {
    id: "trading-bots",
    name: "Trading Bots",
    count: blogPosts.filter((post) =>
      post.categories.includes("trading-bots")
    ).length,
  },
  {
    id: "cryptocurrency",
    name: "Cryptocurrency",
    count: blogPosts.filter((post) =>
      post.categories.includes("cryptocurrency")
    ).length,
  },
  {
    id: "web3",
    name: "Web3 & Blockchain",
    count: blogPosts.filter((post) => post.categories.includes("web3"))
      .length,
  },
  {
    id: "chrome-extensions",
    name: "Chrome Extensions",
    count: blogPosts.filter((post) =>
      post.categories.includes("chrome-extensions")
    ).length,
  },
  {
    id: "fintech",
    name: "Fintech",
    count: blogPosts.filter((post) => post.categories.includes("fintech"))
      .length,
  },
];

const Blog = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Filter posts based on category and search
  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory =
      activeFilter === "all" || post.categories.includes(activeFilter);
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = blogPosts.find((post) => post.featured);
  const regularPosts = filteredPosts.filter((post) => !post.featured);

  return (
    <>
      <SEO
        title="Development Blog - Trading Bots, Web3 & Chrome Extensions"
        description="Expert insights on algorithmic trading, Web3 development, Chrome extensions, and fintech solutions. Learn from 9+ years of full-stack development experience."
        keywords="trading bot development blog, web3 development tutorials, chrome extension guides, fintech development, algorithmic trading, python trading, blockchain development, full stack developer blog"
        image="/og-blog.jpg"
      />

      <div className="min-h-full bg-primary/30 py-36">
        <Circles />
        <div className="container mx-auto px-4">
          {/* Header Section */}
          <div className="text-center mb-16">
            <motion.h1
              variants={fadeIn("up", 0.2)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="h2 mb-6"
            >
              Development <span className="text-accent">Blog</span>
            </motion.h1>
            <motion.p
              variants={fadeIn("up", 0.4)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="text-lg max-w-[600px] mx-auto text-white/80 leading-relaxed"
            >
              Expert insights on algorithmic trading, Web3 development, and
              modern software engineering. Learn from real-world experience
              building scalable applications.
            </motion.p>
          </div>

          {/* Featured Post */}
          {featuredPost && (
            <motion.div
              variants={fadeIn("up", 0.3)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="mb-16"
            >
              <div className="bg-gradient-to-r from-accent/20 to-accent/10 border border-accent/30 rounded-xl p-1">
                <div className="bg-primary/80 backdrop-blur-sm rounded-lg overflow-hidden">
                  <div className="grid md:grid-cols-2 gap-8 p-8">
                    <div className="relative h-64 md:h-full overflow-hidden rounded-lg">
                      <Image
                        src={featuredPost.image}
                        alt={featuredPost.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-accent text-white px-3 py-1 rounded-full text-sm font-medium">
                          Featured
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col justify-center">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {featuredPost.categories.map((category) => (
                          <span
                            key={category}
                            className="px-3 py-1 text-xs rounded-full bg-accent/20 text-accent border border-accent/30"
                          >
                            {category.replace("-", " ")}
                          </span>
                        ))}
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
                        {featuredPost.title}
                      </h2>
                      <p className="text-white/70 mb-6 leading-relaxed">
                        {featuredPost.excerpt}
                      </p>
                      <div className="flex items-center gap-4 mb-6 text-white/60 text-sm">
                        <div className="flex items-center gap-2">
                          <BsCalendar className="w-4 h-4" />
                          <span>
                            {new Date(featuredPost.publishDate).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <BsClock className="w-4 h-4" />
                          <span>{featuredPost.readTime}</span>
                        </div>
                      </div>
                      <Link href={`/blog/${featuredPost.slug}`}>
                        <div className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-accent to-accent/80 text-white hover:from-accent/90 hover:to-accent/70 transition-all duration-300 group/btn">
                          <span className="font-medium">Read Full Article</span>
                          <BsArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Search and Filter Section */}
          <motion.div
            variants={fadeIn("up", 0.4)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="mb-12"
          >
            {/* Search Bar */}
            <div className="relative mb-8 max-w-md mx-auto">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <BsSearch className="h-5 w-5 text-white/40" />
              </div>
              <input
                type="text"
                placeholder="Search articles..."
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
          </motion.div>

          {/* Blog Posts Grid */}
          <motion.div
            variants={fadeIn("up", 0.6)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {regularPosts.map((post, index) => (
                <motion.div
                  key={post.id}
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
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      {/* Categories */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.categories.slice(0, 2).map((category) => (
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
                        {post.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-white/70 text-sm leading-relaxed mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>

                      {/* Meta Info */}
                      <div className="flex items-center justify-between text-white/50 text-xs mb-4">
                        <div className="flex items-center gap-2">
                          <BsCalendar className="w-3 h-3" />
                          <span>
                            {new Date(post.publishDate).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <BsClock className="w-3 h-3" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>

                      {/* Button */}
                      <Link href={`/blog/${post.slug}`}>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-accent/20 to-accent/10 border border-accent/30 text-accent hover:from-accent hover:to-accent/80 hover:text-white transition-all duration-300 group/btn">
                          <span className="text-sm font-medium">Read More</span>
                          <BsArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                        </div>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* No Results Message */}
          {filteredPosts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="text-white/60 text-lg">
                No articles found matching your criteria.
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
        <Bulb />
      </div>
    </>
  );
};

export default Blog;