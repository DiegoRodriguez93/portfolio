import Head from "next/head";
import { useRouter } from "next/router";

const SEO = ({
  title,
  description,
  keywords = "",
  image,
  article = false,
  noIndex = false,
  canonicalUrl,
}) => {
  const router = useRouter();
  const siteName = "Diego Rodriguez - Senior Full-Stack & AI Engineer";
  const siteUrl = "https://www.diego-rodriguez.work";
  const currentUrl = `${siteUrl}${router.asPath}`;
  const canonical = canonicalUrl || currentUrl;

  // Default meta data
  const defaultTitle =
    "Diego Rodriguez - Senior Full-Stack & AI Engineer | LLM, RAG & ML Systems";
  const defaultDescription =
    "Senior Full-Stack & AI Engineer specializing in LLM orchestration, RAG pipelines, AI agent systems, ML-driven risk detection, and algorithmic trading. 9+ years building production-grade AI-powered applications.";
  const defaultKeywords =
    "full stack AI engineer, LLM orchestration, RAG pipelines, AI agent systems, ML risk detection, prompt engineering, Python, TypeScript, FastAPI, react developer, next.js developer, diego rodriguez";

  const finalTitle = title ? `${title} | Diego Rodriguez` : defaultTitle;
  const finalDescription = description || defaultDescription;
  const finalKeywords = keywords || defaultKeywords;

  // Generar imagen OG dinámicamente si no se proporciona una específica
  const getPageSlug = () => {
    const path = router.pathname;
    if (path === "/") return "home";
    return path.replace("/", "");
  };

  const finalImage =
    image ||
    `${siteUrl}/api/og?page=${getPageSlug()}&title=${encodeURIComponent(title || "")}&subtitle=${encodeURIComponent(description || "")}`;

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />
      <meta name="author" content="Diego Rodriguez" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#7c3aed" />

      {/* Robots */}
      <meta
        name="robots"
        content={noIndex ? "noindex, nofollow" : "index, follow"}
      />

      {/* Canonical URL */}
      <link rel="canonical" href={canonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={article ? "article" : "website"} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={finalTitle} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={router.locale === "es" ? "es_ES" : "en_US"} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalImage} />
      <meta name="twitter:creator" content="@diego_dev" />

      {/* Favicons */}
      <link rel="icon" href="/favicon.ico" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <meta name="msapplication-config" content="/browserconfig.xml" />

      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": article ? "Article" : "WebPage",
            name: finalTitle,
            description: finalDescription,
            url: currentUrl,
            image: finalImage,
            author: {
              "@type": "Person",
              name: "Diego Rodriguez",
              jobTitle: "Senior Full-Stack & AI Engineer",
              url: siteUrl,
              sameAs: [
                "https://github.com/diego-rodriguez",
                "https://linkedin.com/in/diego-rodriguez-dev",
              ],
            },
            publisher: {
              "@type": "Person",
              name: "Diego Rodriguez",
              url: siteUrl,
            },
          }),
        }}
      />
    </Head>
  );
};

export default SEO;
