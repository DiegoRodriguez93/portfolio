const { i18n } = require('./next-i18next.config');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n,

  // Optimización de performance
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },

  // Optimización de imágenes
  images: {
    domains: ["www.diego-rodriguez.work"],
    formats: ["image/webp", "image/avif"],
    minimumCacheTTL: 60,
  },

  // Optimización de JavaScript
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  // Headers para performance y seguridad
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
          // Performance headers
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // Headers específicos para assets estáticos
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  // Redirects para SEO
  async redirects() {
    return [
      // Blog article redirects
      {
        source: "/blog/trading-bots-guide",
        destination: "/blog/how-to-build-profitable-trading-bots-2025",
        permanent: true,
      },
      {
        source: "/blog/web3-enterprise-guide",
        destination: "/blog/web3-development-best-practices-enterprise",
        permanent: true,
      },
      {
        source: "/blog/chrome-extensions-guide",
        destination: "/blog/chrome-extension-development-guide",
        permanent: true,
      },
      {
        source: "/blog/fintech-api-guide",
        destination: "/blog/fintech-api-development-security-scalability",
        permanent: true,
      },
    ];
  },

  // Webpack optimizations
  webpack: (config, { dev, isServer }) => {
    // Optimizaciones para producción
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      };
    }

    return config;
  },
};

module.exports = nextConfig;
