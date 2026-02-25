import Head from "next/head";

export const PersonJsonLd = () => (
  <Head>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Diego Rodriguez",
          url: "https://www.diego-rodriguez.work",
          jobTitle: "Senior Full-Stack & AI Engineer",
          worksFor: {
            "@type": "Organization",
            name: "Freelance",
          },
          alumniOf: {
            "@type": "EducationalOrganization",
            name: "Universidad de la República (UDELAR)",
          },
          knowsAbout: [
            "AI/ML Engineering",
            "LLM Orchestration",
            "RAG Pipelines",
            "AI Agent Systems",
            "Prompt Engineering",
            "Machine Learning",
            "React",
            "Next.js",
            "Node.js",
            "Python",
            "FastAPI",
            "TypeScript",
            "PostgreSQL",
          ],
          image: "https://www.diego-rodriguez.work/diego-photo.jpg",
          sameAs: [
            "https://github.com/diego-rodriguez",
            "https://linkedin.com/in/diego-rodriguez-dev",
          ],
        }),
      }}
    />
  </Head>
);

export const OrganizationJsonLd = () => (
  <Head>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "Diego Rodriguez - Development Services",
          url: "https://www.diego-rodriguez.work",
          description:
            "Professional AI and full-stack development services specializing in LLM-powered applications, AI agent systems, ML risk detection, and production-grade web applications",
          founder: {
            "@type": "Person",
            name: "Diego Rodriguez",
          },
          areaServed: "Worldwide",
          serviceType: [
            "AI-Powered SaaS Development",
            "LLM Application Development",
            "AI Agent Systems",
            "ML Risk Detection & Fraud Prevention",
            "Full-Stack Web Development",
            "Algorithmic Trading Systems",
          ],
          priceRange: "$$",
        }),
      }}
    />
  </Head>
);
