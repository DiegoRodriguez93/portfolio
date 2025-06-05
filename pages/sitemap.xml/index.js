function generateSiteMap() {
  const baseUrl = "https://www.diego-rodriguez.work";
  const pages = ["", "/about", "/services", "/work", "/contact"];

  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     ${pages
       .map((page) => {
         return `
       <url>
           <loc>${baseUrl}${page}</loc>
           <lastmod>${new Date().toISOString()}</lastmod>
           <changefreq>${page === "" ? "weekly" : "monthly"}</changefreq>
           <priority>${page === "" ? "1.0" : "0.8"}</priority>
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
