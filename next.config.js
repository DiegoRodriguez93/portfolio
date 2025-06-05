/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  // Optimización de imágenes
  images: {
    domains: ["www.diego-rodriguez.work"],
    formats: ["image/webp", "image/avif"],
  },

  // Headers para SEO y seguridad
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
        ],
      },
    ];
  },

  // Redirects para SEO
  async redirects() {
    return [
      // Redirect trailing slashes
      {
        source: "/about/",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/services/",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/work/",
        destination: "/work",
        permanent: true,
      },
      {
        source: "/contact/",
        destination: "/contact",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
