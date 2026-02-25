import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import { BsArrowRight, BsSearch, BsClock, BsCalendar } from "react-icons/bs";

// components
import Bulb from "../../components/Bulb";
import Circles from "../../components/Circles";
import SEO from "../../components/SEO";

// framer motion
import { fadeIn } from "../../variants";

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const getBlogPosts = (t) => [
  // --- AI articles first ---
  {
    id: 13,
    title: t("blog:posts.aiAgents.title"),
    excerpt: t("blog:posts.aiAgents.excerpt"),
    image: "/work/multiple-agents.jpg",
    categories: ["ai-development", "consulting"],
    readTime: "12",
    publishDate: "2026-02-18",
    slug: "ai-agents-production-multi-agent-systems",
    featured: true,
  },
  {
    id: 10,
    title: t("blog:posts.mcpProtocol.title"),
    excerpt: t("blog:posts.mcpProtocol.excerpt"),
    image: "/work/mcp-protocol.jpg",
    categories: ["ai-development", "api-development"],
    readTime: "11",
    publishDate: "2026-02-18",
    slug: "mcp-model-context-protocol-ai-agents-guide",
    featured: false,
  },
  {
    id: 9,
    title: t("blog:posts.vibeCoding.title"),
    excerpt: t("blog:posts.vibeCoding.excerpt"),
    image: "/work/vibe-coding.jpg",
    categories: ["ai-development", "project-rescue"],
    readTime: "9",
    publishDate: "2026-02-18",
    slug: "vibe-coding-ai-projects-production-guide",
    featured: false,
  },
  {
    id: 11,
    title: t("blog:posts.aiReplacingDevs.title"),
    excerpt: t("blog:posts.aiReplacingDevs.excerpt"),
    image: "/work/ia-vs-developer.jpg",
    categories: ["ai-development", "consulting"],
    readTime: "8",
    publishDate: "2026-02-18",
    slug: "ai-replacing-developers-reality-vs-hype",
    featured: false,
  },
  {
    id: 12,
    title: t("blog:posts.apiSecurity.title"),
    excerpt: t("blog:posts.apiSecurity.excerpt"),
    image: "/work/api-security.jpg",
    categories: ["fintech", "api-development", "security"],
    readTime: "10",
    publishDate: "2026-02-18",
    slug: "api-security-ai-vulnerabilities-prevention-guide",
    featured: false,
  },
  {
    id: 8,
    title: t("blog:posts.geo.title"),
    excerpt: t("blog:posts.geo.excerpt"),
    image: "/work/blog-geo2.jpg",
    categories: ["geo", "seo", "ai-development"],
    readTime: "10",
    publishDate: "2026-02-18",
    slug: "geo-generative-engine-optimization-guide",
    featured: false,
  },
  {
    id: 2,
    title: t("blog:posts.aiCoding.title"),
    excerpt: t("blog:posts.aiCoding.excerpt"),
    image: "/thumb2.jpg",
    categories: ["ai-development", "project-rescue", "consulting"],
    readTime: "8",
    publishDate: "2025-09-08",
    slug: "ai-coding-problems-project-rescue-services",
    featured: false,
  },
  // --- Other articles ---
  {
    id: 4,
    title: t("blog:posts.tradingBots.title"),
    excerpt: t("blog:posts.tradingBots.excerpt"),
    image: "/thumb1.jpg",
    categories: ["trading-bots", "python", "machine-learning"],
    readTime: "12",
    publishDate: "2025-01-15",
    slug: "how-to-build-profitable-trading-bots-2025",
    featured: false,
  },
  {
    id: 7,
    title: t("blog:posts.fintechApi.title"),
    excerpt: t("blog:posts.fintechApi.excerpt"),
    image: "/thumb4.jpg",
    categories: ["fintech", "api-development", "security"],
    readTime: "15",
    publishDate: "2025-01-01",
    slug: "fintech-api-development-security-scalability",
    featured: false,
  },
  {
    id: 3,
    title: t("blog:posts.cryptoCharts.title"),
    excerpt: t("blog:posts.cryptoCharts.excerpt"),
    image: "/work/image.png",
    categories: ["cryptocurrency", "trading-apis", "charts"],
    readTime: "14",
    publishDate: "2025-01-20",
    slug: "cryptocurrency-charting-trading-api-integration",
    featured: false,
  },
  {
    id: 1,
    title: t("blog:posts.dexScanner.title"),
    excerpt: t("blog:posts.dexScanner.excerpt"),
    image: "/work/blog-clmm-1.png",
    categories: ["defi", "rust", "solana"],
    readTime: "12",
    publishDate: "2025-08-22",
    slug: "building-dex-pool-scanner-clmm-solana-rust",
    featured: false,
  },
  {
    id: 5,
    title: t("blog:posts.web3.title"),
    excerpt: t("blog:posts.web3.excerpt"),
    image: "/thumb2.jpg",
    categories: ["web3", "blockchain", "enterprise"],
    readTime: "8",
    publishDate: "2025-01-10",
    slug: "web3-development-best-practices-enterprise",
    featured: false,
  },
  {
    id: 6,
    title: t("blog:posts.chromeExtensions.title"),
    excerpt: t("blog:posts.chromeExtensions.excerpt"),
    image: "/thumb3.jpg",
    categories: ["chrome-extensions", "javascript", "monetization"],
    readTime: "10",
    publishDate: "2025-01-05",
    slug: "chrome-extension-development-guide",
    featured: false,
  },
];

const getCategories = (t, blogPosts) => [
  { id: "all", name: t("blog:categories.all"), count: blogPosts.length },
  {
    id: "ai-development",
    name: t("blog:categories.aiDevelopment"),
    count: blogPosts.filter((post) => post.categories.includes("ai-development")).length,
  },
  {
    id: "project-rescue",
    name: t("blog:categories.projectRescue"),
    count: blogPosts.filter((post) => post.categories.includes("project-rescue")).length,
  },
  {
    id: "defi",
    name: t("blog:categories.defi"),
    count: blogPosts.filter((post) => post.categories.includes("defi")).length,
  },
  {
    id: "rust",
    name: t("blog:categories.rust"),
    count: blogPosts.filter((post) => post.categories.includes("rust")).length,
  },
  {
    id: "trading-bots",
    name: t("blog:categories.tradingBots"),
    count: blogPosts.filter((post) => post.categories.includes("trading-bots")).length,
  },
  {
    id: "cryptocurrency",
    name: t("blog:categories.cryptocurrency"),
    count: blogPosts.filter((post) => post.categories.includes("cryptocurrency")).length,
  },
  {
    id: "web3",
    name: t("blog:categories.web3"),
    count: blogPosts.filter((post) => post.categories.includes("web3")).length,
  },
  {
    id: "chrome-extensions",
    name: t("blog:categories.chromeExtensions"),
    count: blogPosts.filter((post) => post.categories.includes("chrome-extensions")).length,
  },
  {
    id: "fintech",
    name: t("blog:categories.fintech"),
    count: blogPosts.filter((post) => post.categories.includes("fintech")).length,
  },
  {
    id: "geo",
    name: t("blog:categories.geo"),
    count: blogPosts.filter((post) => post.categories.includes("geo")).length,
  },
  {
    id: "seo",
    name: t("blog:categories.seo"),
    count: blogPosts.filter((post) => post.categories.includes("seo")).length,
  },
];

const Blog = () => {
  const { t } = useTranslation(["blog", "common"]);
  const { locale } = useRouter();
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const blogPosts = getBlogPosts(t);
  const categories = getCategories(t, blogPosts);
  const dateLocale = locale === "es" ? "es-ES" : "en-US";

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

  // Parse heading with accent
  const headingParts = t("blog:heading").split(/<accent>(.*?)<\/accent>/);

  return (
    <>
      <SEO
        title={t("blog:seo.title")}
        description={t("blog:seo.description")}
        keywords={t("blog:seo.keywords")}
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
              {headingParts.map((part, i) =>
                i % 2 === 1 ? (
                  <span key={i} className="text-accent">{part}</span>
                ) : (
                  <span key={i}>{part}</span>
                )
              )}
            </motion.h1>
            <motion.p
              variants={fadeIn("up", 0.4)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="text-lg max-w-[600px] mx-auto text-white/80 leading-relaxed"
            >
              {t("blog:subtitle")}
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
                          {t("blog:featured")}
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
                              dateLocale,
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
                          <span>{featuredPost.readTime} {t("blog:minRead")}</span>
                        </div>
                      </div>
                      <Link href={`/blog/${featuredPost.slug}`}>
                        <div className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-accent to-accent/80 text-white hover:from-accent/90 hover:to-accent/70 transition-all duration-300 group/btn">
                          <span className="font-medium">{t("blog:readFullArticle")}</span>
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
                placeholder={t("blog:searchPlaceholder")}
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
                            {new Date(post.publishDate).toLocaleDateString(dateLocale)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <BsClock className="w-3 h-3" />
                          <span>{post.readTime} {t("blog:minRead")}</span>
                        </div>
                      </div>

                      {/* Button */}
                      <Link href={`/blog/${post.slug}`}>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-accent/20 to-accent/10 border border-accent/30 text-accent hover:from-accent hover:to-accent/80 hover:text-white transition-all duration-300 group/btn">
                          <span className="text-sm font-medium">{t("blog:readMore")}</span>
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
                {t("blog:noResults")}
              </div>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setActiveFilter("all");
                }}
                className="mt-4 px-6 py-2 text-accent hover:text-white transition-colors duration-300"
              >
                {t("blog:clearFilters")}
              </button>
            </motion.div>
          )}
        </div>
        <Bulb />
      </div>
    </>
  );
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "blog"])),
    },
  };
}

export default Blog;
