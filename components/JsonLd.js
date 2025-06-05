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
          jobTitle: "Senior Full Stack Developer",
          worksFor: {
            "@type": "Organization",
            name: "Freelance",
          },
          alumniOf: {
            "@type": "EducationalOrganization",
            name: "Universidad de la República (UDELAR)",
          },
          knowsAbout: [
            "Web Development",
            "React",
            "Next.js",
            "Node.js",
            "Web3",
            "Blockchain",
            "Trading Systems",
            "Chrome Extensions",
            "TypeScript",
            "MongoDB",
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
            "Professional software development services specializing in Web3, trading systems, and modern web applications",
          founder: {
            "@type": "Person",
            name: "Diego Rodriguez",
          },
          areaServed: "Worldwide",
          serviceType: [
            "Web Development",
            "Web3 Development",
            "Trading Bot Development",
            "Chrome Extension Development",
            "Mobile App Development",
          ],
          priceRange: "$$",
        }),
      }}
    />
  </Head>
);
