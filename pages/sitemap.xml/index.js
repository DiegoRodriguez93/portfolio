function generateSiteMap() {
  const baseUrl = "https://www.diego-rodriguez.work";
  const pages = [
    "",
    "/about",
    "/services", 
    "/work",
    "/blog",
    "/contact",
    "/privacy-policy"
  ];

  const blogPosts = [
    "/blog/how-to-build-profitable-trading-bots-2025",
    "/blog/web3-development-best-practices-enterprise",
    "/blog/chrome-extension-development-guide",
    "/blog/fintech-api-development-security-scalability"
  ];

  const allPages = [...pages, ...blogPosts];

  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     ${allPages
       .map((page) => {
         const isBlogPost = page.startsWith("/blog/") && page !== "/blog";
         const isHomePage = page === "";
         
         return `
       <url>
           <loc>${baseUrl}${page}</loc>
           <lastmod>${new Date().toISOString()}</lastmod>
           <changefreq>${isHomePage ? "weekly" : isBlogPost ? "monthly" : "monthly"}</changefreq>
           <priority>${isHomePage ? "1.0" : isBlogPost ? "0.7" : "0.8"}</priority>
       </url>
     `;
       })
       .join("")}
   </urlset>
 `;
}

export async function getServerSideProps({ res }) {
  const sitemap = generateSiteMap();

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default function SiteMap() {}