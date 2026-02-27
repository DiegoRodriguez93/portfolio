function generateSiteMap() {
  const baseUrl = "https://www.diego-rodriguez.work";
  const today = new Date().toISOString().split("T")[0];
  const locales = ["en", "es"];

  const pages = [
    { url: "", priority: "1.0", changefreq: "weekly" },
    { url: "/about", priority: "0.9", changefreq: "monthly" },
    { url: "/services", priority: "0.9", changefreq: "monthly" },
    { url: "/work", priority: "0.8", changefreq: "monthly" },
    { url: "/blog", priority: "0.9", changefreq: "weekly" },
    { url: "/testimonials", priority: "0.7", changefreq: "monthly" },
    { url: "/schedule", priority: "0.8", changefreq: "monthly" },
    { url: "/contact", priority: "0.8", changefreq: "monthly" },
    { url: "/privacy-policy", priority: "0.3", changefreq: "yearly" },
  ];

  const blogPosts = [
    { url: "/blog/ai-agents-production-multi-agent-systems", date: "2026-02-18" },
    { url: "/blog/mcp-model-context-protocol-ai-agents-guide", date: "2026-02-18" },
    { url: "/blog/vibe-coding-ai-projects-production-guide", date: "2026-02-18" },
    { url: "/blog/ai-replacing-developers-reality-vs-hype", date: "2026-02-18" },
    { url: "/blog/api-security-ai-vulnerabilities-prevention-guide", date: "2026-02-18" },
    { url: "/blog/geo-generative-engine-optimization-guide", date: "2026-02-18" },
    { url: "/blog/ai-coding-problems-project-rescue-services", date: "2025-09-08" },
    { url: "/blog/building-dex-pool-scanner-clmm-solana-rust", date: "2025-08-22" },
    { url: "/blog/cryptocurrency-charting-trading-api-integration", date: "2025-01-20" },
    { url: "/blog/how-to-build-profitable-trading-bots-2025", date: "2025-01-15" },
    { url: "/blog/web3-development-best-practices-enterprise", date: "2025-01-10" },
    { url: "/blog/chrome-extension-development-guide", date: "2025-01-05" },
    { url: "/blog/fintech-api-development-security-scalability", date: "2025-01-01" },
  ];

  const allEntries = [
    ...pages.map((page) => ({
      url: page.url,
      lastmod: today,
      changefreq: page.changefreq,
      priority: page.priority,
    })),
    ...blogPosts.map((post) => ({
      url: post.url,
      lastmod: post.date,
      changefreq: "monthly",
      priority: "0.7",
    })),
  ];

  const hreflangLinks = (path) =>
    locales
      .map((locale) => {
        const href = locale === "en" ? `${baseUrl}${path}` : `${baseUrl}/${locale}${path}`;
        return `<xhtml:link rel="alternate" hreflang="${locale}" href="${href}"/>`;
      })
      .concat(`<xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}${path}"/>`)
      .join("\n            ");

  const urlBlocks = allEntries.flatMap((entry) =>
    locales.map((locale) => {
      const loc = locale === "en" ? `${baseUrl}${entry.url}` : `${baseUrl}/${locale}${entry.url}`;
      return `
       <url>
           <loc>${loc}</loc>
           <lastmod>${entry.lastmod}</lastmod>
           <changefreq>${entry.changefreq}</changefreq>
           <priority>${entry.priority}</priority>
           ${hreflangLinks(entry.url)}
       </url>`;
    })
  );

  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
           xmlns:xhtml="http://www.w3.org/1999/xhtml">
     ${urlBlocks.join("")}
   </urlset>
 `;
}

export async function getServerSideProps({ res }) {
  const sitemap = generateSiteMap();

  res.setHeader("Content-Type", "text/xml");
  res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default function SiteMap() {}
