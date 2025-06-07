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
        // Apply to all routes
        source: "/(.*)",
        headers: [
          // Content Security Policy - Comprehensive XSS protection
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://ssl.google-analytics.com https://tagmanager.google.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: https: blob:",
              "media-src 'self' data: https:",
              "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net https://www.googletagmanager.com",
              "frame-src 'none'",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'none'",
              "upgrade-insecure-requests"
            ].join("; ")
          },
          // Cross-Origin-Opener-Policy for origin isolation
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin"
          },
          // Cross-Origin-Embedder-Policy
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "credentialless"
          },
          // Cross-Origin-Resource-Policy
          {
            key: "Cross-Origin-Resource-Policy",
            value: "cross-origin"
          },
          // Referrer Policy
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin"
          },
          // X-Content-Type-Options
          {
            key: "X-Content-Type-Options",
            value: "nosniff"
          },
          // X-Frame-Options
          {
            key: "X-Frame-Options",
            value: "DENY"
          },
          // X-XSS-Protection
          {
            key: "X-XSS-Protection",
            value: "1; mode=block"
          },
          // Strict-Transport-Security
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload"
          },
          // Permissions Policy
          {
            key: "Permissions-Policy",
            value: [
              "camera=()",
              "microphone=()",
              "geolocation=()",
              "interest-cohort=()",
              "payment=()",
              "usb=()",
              "bluetooth=()",
              "accelerometer=()",
              "gyroscope=()",
              "magnetometer=()"
            ].join(", ")
          },
          // DNS Prefetch Control
          {
            key: "X-DNS-Prefetch-Control",
            value: "on"
          }
        ]
      },
      {
        // More restrictive CSP for API routes
        source: "/api/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'none'",
              "script-src 'none'",
              "style-src 'none'",
              "img-src 'none'",
              "font-src 'none'",
              "connect-src 'self'",
              "frame-src 'none'",
              "object-src 'none'",
              "base-uri 'none'",
              "form-action 'none'",
              "frame-ancestors 'none'"
            ].join("; ")
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin"
          },
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "require-corp"
          },
          {
            key: "Cross-Origin-Resource-Policy",
            value: "same-origin"
          }
        ]
      }
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
      {
        source: "/blog/",
        destination: "/blog",
        permanent: true,
      },
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
};

module.exports = nextConfig;