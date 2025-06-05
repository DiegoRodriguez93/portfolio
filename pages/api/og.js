// pages/api/og.js - Para Pages Router
import { ImageResponse } from "@vercel/og";

export const config = {
  runtime: "edge",
};

// Configuración de colores de tu tema
const colors = {
  primary: "#1a1a2e",
  accent: "#7c3aed",
  white: "#ffffff",
  gray: "#9ca3af",
};

export default function handler(req) {
  try {
    const { searchParams } = new URL(req.url);

    // Obtener parámetros de la URL
    const title = searchParams.get("title") || "Diego Rodriguez";
    const subtitle =
      searchParams.get("subtitle") || "Senior Full Stack Developer";
    const page = searchParams.get("page") || "home";

    // Configuraciones específicas por página
    const pageConfigs = {
      home: {
        title: "Diego Rodriguez",
        subtitle: "Senior Full Stack Developer",
        description: "Web3 • Trading Bots • Chrome Extensions",
        emoji: "👨‍💻",
      },
      about: {
        title: "About Diego",
        subtitle: "9+ Years Experience",
        description: "Full Stack • Web3 • Fintech • Blockchain",
        emoji: "🚀",
      },
      services: {
        title: "Development Services",
        subtitle: "Custom Solutions",
        description: "Web Apps • Trading Systems • Extensions",
        emoji: "⚡",
      },
      work: {
        title: "Portfolio & Projects",
        subtitle: "Latest Work",
        description: "React • Next.js • Web3 • Trading Bots",
        emoji: "💼",
      },
      contact: {
        title: "Let's Work Together",
        subtitle: "Get In Touch",
        description: "Available for Projects • Remote Worldwide",
        emoji: "📧",
      },
    };

    const config = pageConfigs[page] || pageConfigs.home;

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: `linear-gradient(135deg, ${colors.primary} 0%, #2d1b69 100%)`,
            fontFamily: "Inter, sans-serif",
            position: "relative",
          }}
        >
          {/* Background Pattern */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `radial-gradient(circle at 25px 25px, ${colors.accent}22 2px, transparent 2px)`,
              backgroundSize: "50px 50px",
            }}
          />

          {/* Main Content */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              zIndex: 1,
              padding: "60px",
            }}
          >
            {/* Emoji/Icon */}
            <div
              style={{
                fontSize: "80px",
                marginBottom: "20px",
              }}
            >
              {config.emoji}
            </div>

            {/* Main Title */}
            <h1
              style={{
                fontSize: "72px",
                fontWeight: "800",
                color: colors.white,
                margin: "0 0 20px 0",
                lineHeight: "1.1",
                textAlign: "center",
              }}
            >
              {title || config.title}
            </h1>

            {/* Subtitle */}
            <h2
              style={{
                fontSize: "36px",
                fontWeight: "600",
                color: colors.accent,
                margin: "0 0 30px 0",
                textAlign: "center",
              }}
            >
              {subtitle || config.subtitle}
            </h2>

            {/* Description */}
            <p
              style={{
                fontSize: "24px",
                color: colors.gray,
                margin: "0 0 40px 0",
                textAlign: "center",
                maxWidth: "800px",
                lineHeight: "1.4",
              }}
            >
              {config.description}
            </p>

            {/* Website URL */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: "20px",
                color: colors.white,
                backgroundColor: `${colors.accent}33`,
                padding: "15px 30px",
                borderRadius: "50px",
                border: `2px solid ${colors.accent}`,
              }}
            >
              🌐 www.diego-rodriguez.work
            </div>
          </div>

          {/* Bottom Accent */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "8px",
              background: `linear-gradient(90deg, ${colors.accent} 0%, #a855f7 100%)`,
            }}
          />
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
