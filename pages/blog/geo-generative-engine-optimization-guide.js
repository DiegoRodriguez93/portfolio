import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  BsArrowLeft,
  BsCalendar,
  BsClock,
  BsArrowRight,
  BsCheckCircle,
  BsLightning,
  BsGraphUp,
  BsSearch,
  BsGlobe,
  BsShield,
  BsRobot,
} from "react-icons/bs";
import { FaTwitter, FaLinkedin, FaFacebook } from "react-icons/fa";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";

// components
import SEO from "../../components/SEO";
import Circles from "../../components/Circles";
import AuthorBio from "../../components/AuthorBio";

// framer motion
import { fadeIn } from "../../variants";

const content = {
  en: {
    seo: {
      title: "GEO: Why Generative Engine Optimization Is the Future of Online Visibility",
      description: "Traditional SEO is no longer enough. Learn how Generative Engine Optimization (GEO) helps your business get cited by AI search engines like ChatGPT, Perplexity, and Google AI Overviews.",
      keywords: "generative engine optimization, GEO, AI search optimization, ChatGPT SEO, Perplexity optimization, Google AI Overviews, AI citations, future of SEO, AI search strategy, digital visibility AI",
    },
    categories: ["GEO", "SEO", "AI Development"],
    title: "GEO: Why Generative Engine Optimization Is the Future of Online Visibility",
    shareText: "GEO: The Future of Online Visibility",
    readTime: "10 min read",
    intro: {
      hook: "Your Website Ranks on Google... But AI Doesn\u2019t Mention You",
      p1: "Here\u2019s a scenario that\u2019s becoming painfully common: you\u2019ve spent months (maybe years) investing in SEO. Your website ranks on page one for your target keywords. Traffic looks decent. But then you ask ChatGPT, Perplexity, or Google\u2019s AI Overview about your industry \u2014 and your business doesn\u2019t exist.",
      p2: "Not a single mention. Not a citation. Nothing.",
      stat: { value: "40%", label: "of all searches will go through AI engines by end of 2026" },
      p3: "The way people find information is fundamentally changing. Traditional search engines are no longer the only gateway. AI-powered search tools are becoming the default for millions of users \u2014 and if your content isn\u2019t optimized for them, you\u2019re invisible to a rapidly growing audience.",
      p4: "Welcome to the era of Generative Engine Optimization (GEO).",
    },
    whatIsGeo: {
      heading: "What Is GEO?",
      p1: "Generative Engine Optimization (GEO) is the practice of optimizing your digital content so that AI-powered search engines \u2014 like ChatGPT, Perplexity, Google AI Overviews (formerly SGE), and Gemini \u2014 can understand, cite, and recommend it in their responses.",
      comparison: [
        "SEO = optimizing so Google\u2019s algorithm ranks your page higher in a list of blue links",
        "GEO = optimizing so AI models cite your content as a source when answering user questions",
      ],
      p2: "When someone asks Perplexity \u201cWhat\u2019s the best approach for building a SaaS MVP?\u201d, the AI doesn\u2019t show 10 blue links. It synthesizes an answer from multiple sources and cites the ones it trusts most. GEO is how you become one of those cited sources.",
      callout: "GEO doesn\u2019t replace SEO \u2014 it extends it. The fundamentals of good content, authority, and technical optimization still matter. GEO adds a new layer of optimization specifically for how AI models consume and reference information.",
      howTitle: "How Generative Engines Work",
      howSteps: [
        "Ingest vast amounts of content during training and through real-time retrieval (RAG)",
        "Synthesize answers by combining information from multiple trusted sources",
        "Cite sources they deem authoritative, well-structured, and factually reliable",
        "Prioritize clarity \u2014 content that\u2019s unambiguous and well-organized gets favored",
      ],
      howConclusion: "This means the rules of the game have changed. It\u2019s no longer just about keywords and backlinks.",
    },
    problem: {
      heading: "The Problem: SEO Alone Is No Longer Enough",
      p1: "If you\u2019re still relying exclusively on traditional SEO, you\u2019re optimizing for a shrinking piece of the pie.",
      stats: [
        { value: "58%", label: "of users now try AI search tools before Google" },
        { value: "65%", label: "of Google searches end without a click (zero-click)" },
        { value: "3.5x", label: "growth in AI search usage since 2024" },
      ],
      zeroClick: {
        title: "The Zero-Click Reality",
        text: "Google\u2019s own AI Overviews now answer many queries directly at the top of results. Users get their answer without ever clicking through to your website. This means even if you rank #1 organically, you might get zero traffic because the AI already summarized the answer.",
      },
      migration: {
        title: "The AI Search Migration",
        text: "Users aren\u2019t just using Google anymore. They\u2019re asking ChatGPT for product recommendations, using Perplexity for research, and relying on Gemini for comparisons. Each of these platforms has its own way of selecting which sources to cite \u2014 and none of them care about your Google ranking.",
      },
      quality: {
        title: "The Content Quality Bar Has Risen",
        text: "AI models are surprisingly good at distinguishing between genuine expertise and keyword-stuffed fluff, original insights and rehashed content, structured factual information and vague generalities. If your content was built primarily to game Google\u2019s algorithm, it likely won\u2019t perform well in AI search.",
      },
    },
    benefits: {
      heading: "The 7 Key Benefits of GEO",
      items: [
        {
          title: "1. Greater Visibility in AI Responses",
          text: "When your content is optimized for GEO, AI engines are more likely to cite you as a source in their answers. This is the new \u201cpage one\u201d \u2014 being mentioned by name in an AI response carries enormous weight and credibility.",
        },
        {
          title: "2. Positioning as an Authority & Cited Source",
          text: "AI models prioritize sources that demonstrate expertise, experience, authoritativeness, and trustworthiness (E-E-A-T). When you consistently get cited, you become a recognized authority in your niche \u2014 not just in Google\u2019s eyes, but in the AI ecosystem.",
        },
        {
          title: "3. Higher-Quality Traffic",
          text: "Users who click through from an AI citation have already been pre-qualified. They read the AI\u2019s answer, saw your brand mentioned as a trusted source, and chose to visit your site. This traffic converts at significantly higher rates than generic organic traffic.",
        },
        {
          title: "4. Early Adopter Competitive Advantage",
          text: "GEO is still in its infancy. Most businesses haven\u2019t even heard of it, let alone implemented it. By optimizing now, you establish dominance in AI search before your competitors wake up \u2014 similar to how early SEO adopters dominated Google for years.",
        },
        {
          title: "5. Better ROI Than Traditional Ads",
          text: "AI citations are organic \u2014 you don\u2019t pay per click. Once your content is structured and authoritative enough to be cited, you get ongoing visibility without ongoing ad spend. It\u2019s a compounding investment.",
        },
        {
          title: "6. More Structured and Useful Content",
          text: "GEO forces you to create content that\u2019s genuinely helpful: well-organized, factually accurate, and clearly structured. This improves user experience across all channels, not just AI search.",
        },
        {
          title: "7. Future-Proofing Your Digital Presence",
          text: "The shift toward AI-powered search is accelerating, not slowing down. Investing in GEO now means your business is prepared for where search is heading \u2014 not scrambling to catch up when traditional SEO traffic inevitably declines.",
        },
      ],
    },
    comparison: {
      heading: "GEO vs SEO: What Changes",
      headers: ["Aspect", "Traditional SEO", "GEO"],
      rows: [
        ["Primary Goal", "Rank higher in search results list", "Get cited in AI-generated answers"],
        ["Key Signals", "Keywords, backlinks, domain authority", "Entity authority, structured data, citations"],
        ["Content Format", "Keyword-optimized pages", "Authoritative, well-structured, fact-rich content"],
        ["Success Metric", "Rankings, organic clicks", "AI citations, brand mentions, referral traffic"],
        ["User Behavior", "Scan list, click a result", "Read AI answer, click cited source (if needed)"],
        ["Competition", "10 blue links on page 1", "3-5 cited sources in AI response"],
        ["Technical Focus", "Meta tags, sitemap, page speed", "Schema markup, E-E-A-T signals, structured data"],
        ["Content Tone", "Can be thin/optimized for bots", "Must be genuinely expert-level"],
      ],
      callout: "Important: GEO and SEO are not mutually exclusive. The best strategy combines both. Strong SEO fundamentals (technical optimization, site speed, mobile-friendliness) still help AI engines discover and trust your content.",
    },
    strategies: {
      heading: "Practical GEO Strategies You Can Implement Today",
      items: [
        {
          title: "1. Implement Comprehensive Schema Markup",
          text: "Structured data helps AI engines understand your content\u2019s context. Go beyond basic schema \u2014 use Article, Person, Organization, and FAQPage types with rich detail.",
        },
        {
          title: "2. Build E-E-A-T Signals Into Every Page",
          points: [
            "Experience \u2014 Share first-hand experience and case studies",
            "Expertise \u2014 Demonstrate deep domain knowledge with specific data",
            "Authoritativeness \u2014 Get cited by other reputable sources",
            "Trustworthiness \u2014 Provide accurate, verifiable information with sources",
          ],
        },
        {
          title: "3. Structure Content for AI Consumption",
          points: [
            "Organize with clear headings (H2, H3) that match common questions",
            "Write in a declarative style (\u201cX is Y\u201d rather than vague phrasing)",
            "Include specific data points, statistics, and named entities",
            "Break into distinct, self-contained sections that can be excerpted",
          ],
        },
        {
          title: "4. Create Comprehensive FAQ Sections",
          text: "AI engines love well-structured Q&A content. Answer questions directly and concisely in the first sentence, then expand with detail. Use the exact phrasing users would ask.",
        },
        {
          title: "5. Build Entity Authority",
          text: "Instead of just targeting keywords, build authority around entities (people, brands, concepts). Maintain consistent information across your website, social profiles, and third-party sites.",
        },
        {
          title: "6. Optimize for Conversational Queries",
          text: "People ask AI engines questions in natural language. Optimize for long-tail conversational phrases, follow-up questions, and comparison queries (\u201cX vs Y\u201d, \u201cpros and cons of...\u201d).",
        },
        {
          title: "7. Publish Original Research and Data",
          text: "AI models heavily favor content with unique, citable data. Conduct surveys, case studies, or original analysis. Create proprietary statistics that others will reference.",
        },
      ],
    },
    cta: {
      heading: "Is Your Business Ready for the AI Search Era?",
      p1: "The shift is happening now. Every month, more users discover and adopt AI-powered search tools. Every quarter, these tools get better at finding and citing quality content. The businesses that act now will be the ones AI engines recognize as authorities.",
      p2: "The question isn\u2019t whether GEO matters \u2014 it\u2019s whether you\u2019ll be ahead of the curve or playing catch-up.",
      boxTitle: "Ready to Get Your Business Cited by AI?",
      boxText: "I help businesses optimize their digital presence for both traditional search and the new generation of AI-powered search engines. Let\u2019s build a strategy that makes AI work for you.",
      primaryBtn: "Start a Conversation",
      secondaryBtn: "View My Services",
    },
    authorBio: {
      specialization: "Full-Stack Developer & Digital Strategist",
      description: "Diego builds modern web applications and helps businesses navigate the intersection of AI and digital marketing. With hands-on experience in AI development and web optimization, he helps clients stay ahead in the rapidly evolving digital landscape.",
    },
    related: {
      heading: "Related Articles",
      articles: [
        {
          title: "When AI Coding Goes Wrong: From Prototype to Production Nightmare",
          excerpt: "Why 80% of AI-generated projects never see production and how to rescue stuck projects.",
          link: "/blog/ai-coding-problems-project-rescue-services",
        },
        {
          title: "Web3 Development Best Practices for Enterprise Applications",
          excerpt: "Essential patterns and security considerations for building enterprise-grade Web3 applications.",
          link: "/blog/web3-development-best-practices-enterprise",
        },
      ],
    },
  },
  es: {
    seo: {
      title: "GEO: Por Qu\u00e9 la Optimizaci\u00f3n para Motores Generativos Es el Futuro de la Visibilidad Online",
      description: "El SEO tradicional ya no es suficiente. Descubre c\u00f3mo la Optimizaci\u00f3n para Motores Generativos (GEO) ayuda a tu negocio a ser citado por buscadores IA como ChatGPT, Perplexity y Google AI Overviews.",
      keywords: "optimizaci\u00f3n motores generativos, GEO, optimizaci\u00f3n b\u00fasqueda IA, ChatGPT SEO, Perplexity optimizaci\u00f3n, Google AI Overviews, citas IA, futuro del SEO, estrategia b\u00fasqueda IA, visibilidad digital IA",
    },
    categories: ["GEO", "SEO", "Desarrollo IA"],
    title: "GEO: Por Qu\u00e9 la Optimizaci\u00f3n para Motores Generativos Es el Futuro de la Visibilidad Online",
    shareText: "GEO: El Futuro de la Visibilidad Online",
    readTime: "10 min de lectura",
    intro: {
      hook: "Tu Sitio Web Rankea en Google... Pero la IA No Te Menciona",
      p1: "Este es un escenario que se est\u00e1 volviendo dolorosamente com\u00fan: invertiste meses (quiz\u00e1s a\u00f1os) en SEO. Tu sitio web aparece en la primera p\u00e1gina para tus palabras clave objetivo. El tr\u00e1fico se ve decente. Pero entonces le preguntas a ChatGPT, Perplexity o al AI Overview de Google sobre tu industria \u2014 y tu negocio no existe.",
      p2: "Ni una sola menci\u00f3n. Ni una cita. Nada.",
      stat: { value: "40%", label: "de todas las b\u00fasquedas pasar\u00e1n por motores de IA para finales de 2026" },
      p3: "La forma en que las personas encuentran informaci\u00f3n est\u00e1 cambiando fundamentalmente. Los motores de b\u00fasqueda tradicionales ya no son la \u00fanica puerta de entrada. Las herramientas de b\u00fasqueda con IA se est\u00e1n convirtiendo en la opci\u00f3n predeterminada para millones de usuarios \u2014 y si tu contenido no est\u00e1 optimizado para ellas, eres invisible para una audiencia que crece r\u00e1pidamente.",
      p4: "Bienvenido a la era de la Optimizaci\u00f3n para Motores Generativos (GEO).",
    },
    whatIsGeo: {
      heading: "\u00bfQu\u00e9 Es GEO?",
      p1: "La Optimizaci\u00f3n para Motores Generativos (GEO) es la pr\u00e1ctica de optimizar tu contenido digital para que los motores de b\u00fasqueda impulsados por IA \u2014 como ChatGPT, Perplexity, Google AI Overviews (anteriormente SGE) y Gemini \u2014 puedan entenderlo, citarlo y recomendarlo en sus respuestas.",
      comparison: [
        "SEO = optimizar para que el algoritmo de Google posicione tu p\u00e1gina m\u00e1s arriba en una lista de enlaces azules",
        "GEO = optimizar para que los modelos de IA citen tu contenido como fuente al responder preguntas",
      ],
      p2: "Cuando alguien le pregunta a Perplexity \u201c\u00bfCu\u00e1l es el mejor enfoque para construir un MVP de SaaS?\u201d, la IA no muestra 10 enlaces azules. Sintetiza una respuesta de m\u00faltiples fuentes y cita las que considera m\u00e1s confiables. GEO es c\u00f3mo te conviertes en una de esas fuentes citadas.",
      callout: "GEO no reemplaza al SEO \u2014 lo extiende. Los fundamentos de buen contenido, autoridad y optimizaci\u00f3n t\u00e9cnica siguen importando. GEO a\u00f1ade una nueva capa de optimizaci\u00f3n espec\u00edficamente para c\u00f3mo los modelos de IA consumen y referencian informaci\u00f3n.",
      howTitle: "C\u00f3mo Funcionan los Motores Generativos",
      howSteps: [
        "Ingieren grandes cantidades de contenido durante el entrenamiento y a trav\u00e9s de recuperaci\u00f3n en tiempo real (RAG)",
        "Sintetizan respuestas combinando informaci\u00f3n de m\u00faltiples fuentes confiables",
        "Citan fuentes que consideran autorizadas, bien estructuradas y factualmente confiables",
        "Priorizan la claridad \u2014 el contenido inequ\u00edvoco y bien organizado tiene preferencia",
      ],
      howConclusion: "Esto significa que las reglas del juego han cambiado. Ya no se trata solo de palabras clave y backlinks.",
    },
    problem: {
      heading: "El Problema: El SEO Solo Ya No Es Suficiente",
      p1: "Si todav\u00eda depend\u00e9s exclusivamente del SEO tradicional, est\u00e1s optimizando para una porci\u00f3n del pastel que se encoge.",
      stats: [
        { value: "58%", label: "de usuarios prueban herramientas de b\u00fasqueda IA antes que Google" },
        { value: "65%", label: "de las b\u00fasquedas en Google terminan sin un clic (zero-click)" },
        { value: "3.5x", label: "crecimiento en el uso de b\u00fasqueda IA desde 2024" },
      ],
      zeroClick: {
        title: "La Realidad del Zero-Click",
        text: "Los propios AI Overviews de Google ahora responden muchas consultas directamente en la parte superior de los resultados. Los usuarios obtienen su respuesta sin nunca hacer clic en tu sitio web. Esto significa que incluso si ranke\u00e1s #1 org\u00e1nicamente, podr\u00edas obtener cero tr\u00e1fico porque la IA ya resumi\u00f3 la respuesta.",
      },
      migration: {
        title: "La Migraci\u00f3n a la B\u00fasqueda con IA",
        text: "Los usuarios ya no solo usan Google. Le preguntan a ChatGPT por recomendaciones de productos, usan Perplexity para investigar y conf\u00edan en Gemini para comparaciones. Cada una de estas plataformas tiene su propia forma de seleccionar qu\u00e9 fuentes citar \u2014 y a ninguna le importa tu posici\u00f3n en Google.",
      },
      quality: {
        title: "El Est\u00e1ndar de Calidad del Contenido Se Elev\u00f3",
        text: "Los modelos de IA son sorprendentemente buenos distinguiendo entre experiencia genuina y relleno con palabras clave, insights originales y contenido reciclado, informaci\u00f3n estructurada y factual y generalidades vagas. Si tu contenido fue construido principalmente para manipular el algoritmo de Google, probablemente no rendir\u00e1 bien en la b\u00fasqueda con IA.",
      },
    },
    benefits: {
      heading: "Los 7 Beneficios Clave de GEO",
      items: [
        {
          title: "1. Mayor Visibilidad en Respuestas de IA",
          text: "Cuando tu contenido est\u00e1 optimizado para GEO, los motores de IA tienen m\u00e1s probabilidades de citarte como fuente en sus respuestas. Esta es la nueva \u201cprimera p\u00e1gina\u201d \u2014 ser mencionado por nombre en una respuesta de IA tiene un peso y credibilidad enormes.",
        },
        {
          title: "2. Posicionamiento como Autoridad y Fuente Citada",
          text: "Los modelos de IA priorizan fuentes que demuestran experiencia, expertise, autoridad y confiabilidad (E-E-A-T). Cuando sos citado consistentemente, te convert\u00eds en una autoridad reconocida en tu nicho \u2014 no solo a los ojos de Google, sino en todo el ecosistema de IA.",
        },
        {
          title: "3. Tr\u00e1fico de Mayor Calidad",
          text: "Los usuarios que hacen clic desde una cita de IA ya fueron pre-calificados. Leyeron la respuesta de la IA, vieron tu marca mencionada como fuente confiable y eligieron visitar tu sitio. Este tr\u00e1fico convierte a tasas significativamente m\u00e1s altas que el tr\u00e1fico org\u00e1nico gen\u00e9rico.",
        },
        {
          title: "4. Ventaja Competitiva de Adopci\u00f3n Temprana",
          text: "GEO a\u00fan est\u00e1 en su infancia. La mayor\u00eda de los negocios ni siquiera han o\u00eddo hablar de \u00e9l, mucho menos lo han implementado. Al optimizar ahora, establec\u00e9s dominancia en la b\u00fasqueda IA antes de que tus competidores despierten \u2014 similar a c\u00f3mo los adoptantes tempranos del SEO dominaron Google durante a\u00f1os.",
        },
        {
          title: "5. Mejor ROI que los Anuncios Tradicionales",
          text: "Las citas de IA son org\u00e1nicas \u2014 no pag\u00e1s por clic. Una vez que tu contenido est\u00e1 suficientemente estructurado y tiene autoridad para ser citado, obten\u00e9s visibilidad continua sin gasto continuo en publicidad. Es una inversi\u00f3n que se acumula.",
        },
        {
          title: "6. Contenido M\u00e1s Estructurado y \u00datil",
          text: "GEO te obliga a crear contenido genuinamente \u00fatil: bien organizado, factualmente preciso y claramente estructurado. Esto mejora la experiencia del usuario en todos los canales, no solo en la b\u00fasqueda IA.",
        },
        {
          title: "7. Preparaci\u00f3n para el Futuro de tu Presencia Digital",
          text: "El cambio hacia la b\u00fasqueda impulsada por IA se est\u00e1 acelerando, no desacelerando. Invertir en GEO ahora significa que tu negocio est\u00e1 preparado para hacia d\u00f3nde se dirige la b\u00fasqueda \u2014 no corriendo para ponerse al d\u00eda cuando el tr\u00e1fico SEO tradicional inevitablemente decline.",
        },
      ],
    },
    comparison: {
      heading: "GEO vs SEO: Qu\u00e9 Cambia",
      headers: ["Aspecto", "SEO Tradicional", "GEO"],
      rows: [
        ["Objetivo Principal", "Rankear m\u00e1s alto en la lista de resultados", "Ser citado en respuestas generadas por IA"],
        ["Se\u00f1ales Clave", "Keywords, backlinks, autoridad de dominio", "Autoridad de entidad, datos estructurados, citas"],
        ["Formato de Contenido", "P\u00e1ginas optimizadas por keywords", "Contenido autoritativo, estructurado y rico en datos"],
        ["M\u00e9trica de \u00c9xito", "Rankings, clics org\u00e1nicos", "Citas de IA, menciones de marca, tr\u00e1fico referido"],
        ["Comportamiento del Usuario", "Escanear lista, hacer clic en resultado", "Leer respuesta de IA, clic en fuente citada"],
        ["Competencia", "10 enlaces azules en p\u00e1gina 1", "3-5 fuentes citadas en respuesta de IA"],
        ["Enfoque T\u00e9cnico", "Meta tags, sitemap, velocidad", "Schema markup, se\u00f1ales E-E-A-T, datos estructurados"],
        ["Tono del Contenido", "Puede ser superficial/optimizado para bots", "Debe ser genuinamente de nivel experto"],
      ],
      callout: "Importante: GEO y SEO no son mutuamente excluyentes. La mejor estrategia combina ambos. Los fundamentos s\u00f3lidos de SEO (optimizaci\u00f3n t\u00e9cnica, velocidad del sitio, compatibilidad m\u00f3vil) a\u00fan ayudan a los motores de IA a descubrir y confiar en tu contenido.",
    },
    strategies: {
      heading: "Estrategias Pr\u00e1cticas de GEO Que Pod\u00e9s Implementar Hoy",
      items: [
        {
          title: "1. Implement\u00e1 Schema Markup Completo",
          text: "Los datos estructurados ayudan a los motores de IA a entender el contexto de tu contenido. Ve m\u00e1s all\u00e1 del schema b\u00e1sico \u2014 us\u00e1 tipos Article, Person, Organization y FAQPage con detalle rico.",
        },
        {
          title: "2. Constru\u00ed Se\u00f1ales E-E-A-T en Cada P\u00e1gina",
          points: [
            "Experiencia \u2014 Compart\u00ed experiencia de primera mano y casos de estudio",
            "Expertise \u2014 Demostr\u00e1 conocimiento profundo del dominio con datos espec\u00edficos",
            "Autoridad \u2014 Logr\u00e1 ser citado por otras fuentes reputadas",
            "Confiabilidad \u2014 Proporcion\u00e1 informaci\u00f3n precisa y verificable con fuentes",
          ],
        },
        {
          title: "3. Estructur\u00e1 el Contenido para Consumo por IA",
          points: [
            "Organiz\u00e1 con encabezados claros (H2, H3) que coincidan con preguntas comunes",
            "Escrib\u00ed en estilo declarativo (\u201cX es Y\u201d en vez de frases vagas)",
            "Inclu\u00ed datos espec\u00edficos, estad\u00edsticas y entidades nombradas",
            "Divid\u00ed en secciones distintas y autocontenidas que puedan ser extra\u00eddas",
          ],
        },
        {
          title: "4. Cre\u00e1 Secciones FAQ Completas",
          text: "Los motores de IA adoran el contenido Q&A bien estructurado. Respond\u00e9 preguntas directamente y de forma concisa en la primera oraci\u00f3n, luego expand\u00ed con detalle. Us\u00e1 la redacci\u00f3n exacta que los usuarios preguntar\u00edan.",
        },
        {
          title: "5. Constru\u00ed Autoridad de Entidad",
          text: "En vez de solo apuntar a keywords, constru\u00ed autoridad alrededor de entidades (personas, marcas, conceptos). Manten\u00e9 informaci\u00f3n consistente en tu sitio web, perfiles sociales y sitios de terceros.",
        },
        {
          title: "6. Optimiz\u00e1 para Consultas Conversacionales",
          text: "Las personas hacen preguntas a los motores de IA en lenguaje natural. Optimiz\u00e1 para frases conversacionales de cola larga, preguntas de seguimiento y consultas comparativas (\u201cX vs Y\u201d, \u201cpros y contras de...\u201d).",
        },
        {
          title: "7. Public\u00e1 Investigaci\u00f3n y Datos Originales",
          text: "Los modelos de IA favorecen fuertemente el contenido con datos \u00fanicos y citables. Realiz\u00e1 encuestas, casos de estudio o an\u00e1lisis originales. Cre\u00e1 estad\u00edsticas propias que otros referenciar\u00e1n.",
        },
      ],
    },
    cta: {
      heading: "\u00bfTu Negocio Est\u00e1 Listo para la Era de la B\u00fasqueda con IA?",
      p1: "El cambio est\u00e1 sucediendo ahora. Cada mes, m\u00e1s usuarios descubren y adoptan herramientas de b\u00fasqueda con IA. Cada trimestre, estas herramientas mejoran en encontrar y citar contenido de calidad. Los negocios que act\u00faen ahora ser\u00e1n los que los motores de IA reconozcan como autoridades.",
      p2: "La pregunta no es si GEO importa \u2014 es si estar\u00e1s adelante de la curva o corriendo detr\u00e1s.",
      boxTitle: "\u00bfListo para que la IA Cite tu Negocio?",
      boxText: "Ayudo a negocios a optimizar su presencia digital tanto para la b\u00fasqueda tradicional como para la nueva generaci\u00f3n de buscadores impulsados por IA. Construyamos una estrategia que haga que la IA trabaje para vos.",
      primaryBtn: "Iniciar una Conversaci\u00f3n",
      secondaryBtn: "Ver Mis Servicios",
    },
    authorBio: {
      specialization: "Desarrollador Full-Stack y Estratega Digital",
      description: "Diego construye aplicaciones web modernas y ayuda a negocios a navegar la intersecci\u00f3n de IA y marketing digital. Con experiencia pr\u00e1ctica en desarrollo de IA y optimizaci\u00f3n web, ayuda a sus clientes a mantenerse adelante en el panorama digital que evoluciona r\u00e1pidamente.",
    },
    related: {
      heading: "Art\u00edculos Relacionados",
      articles: [
        {
          title: "Cuando la IA Falla al Programar: De Prototipo a Pesadilla en Producci\u00f3n",
          excerpt: "Por qu\u00e9 el 80% de los proyectos generados con IA nunca llegan a producci\u00f3n y c\u00f3mo rescatar proyectos atascados.",
          link: "/blog/ai-coding-problems-project-rescue-services",
        },
        {
          title: "Mejores Pr\u00e1cticas de Desarrollo Web3 para Aplicaciones Empresariales",
          excerpt: "Patrones esenciales y consideraciones de seguridad para construir aplicaciones Web3 empresariales.",
          link: "/blog/web3-development-best-practices-enterprise",
        },
      ],
    },
  },
};

const GEOArticle = () => {
  const { t } = useTranslation(["blog", "common"]);
  const { locale } = useRouter();
  const dateLocale = locale === "es" ? "es-ES" : "en-US";
  const c = content[locale] || content.en;

  const publishDate = "2026-02-18";
  const articleUrl = "https://www.diego-rodriguez.work/blog/geo-generative-engine-optimization-guide";

  return (
    <>
      <SEO
        title={c.seo.title}
        description={c.seo.description}
        keywords={c.seo.keywords}
        image="/og-geo-guide.jpg"
        article={true}
      />

      <div className="min-h-full bg-primary/30 py-20">
        <Circles />
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Back Button */}
          <motion.div
            variants={fadeIn("up", 0.1)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="mb-8"
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-white/70 hover:text-accent transition-colors duration-300"
            >
              <BsArrowLeft className="w-4 h-4" />
              <span>{t("blog:backToBlog")}</span>
            </Link>
          </motion.div>

          {/* Article Header */}
          <motion.header
            variants={fadeIn("up", 0.2)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="mb-12"
          >
            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-6">
              {c.categories.map((cat) => (
                <span
                  key={cat}
                  className="px-4 py-2 text-sm rounded-full bg-accent/20 text-accent border border-accent/30"
                >
                  {cat}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              {c.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 text-white/60 mb-8">
              <div className="flex items-center gap-2">
                <BsCalendar className="w-4 h-4" />
                <span>
                  {new Date(publishDate).toLocaleDateString(dateLocale, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <BsClock className="w-4 h-4" />
                <span>{c.readTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>{t("blog:by")}</span>
                <Link
                  href="/about"
                  className="text-accent hover:text-white transition-colors"
                >
                  Diego Rodriguez
                </Link>
              </div>
            </div>

            {/* Featured Image */}
            <div className="relative h-64 md:h-96 rounded-xl overflow-hidden mb-8">
              <Image
                src="/work/blog-geo2.jpg"
                alt={c.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute top-4 right-4">
                <BsRobot className="w-12 h-12 text-accent" />
              </div>
            </div>

            {/* Share Buttons */}
            <div className="flex items-center gap-4">
              <span className="text-white/60 text-sm">{t("blog:share")}</span>
              <div className="flex gap-3">
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(articleUrl)}&text=${encodeURIComponent(c.shareText)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/5 text-white/70 hover:text-accent hover:bg-accent/10 transition-all duration-300"
                >
                  <FaTwitter className="w-4 h-4" />
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/5 text-white/70 hover:text-accent hover:bg-accent/10 transition-all duration-300"
                >
                  <FaLinkedin className="w-4 h-4" />
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/5 text-white/70 hover:text-accent hover:bg-accent/10 transition-all duration-300"
                >
                  <FaFacebook className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.header>

          {/* Article Content */}
          <motion.article
            variants={fadeIn("up", 0.3)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="prose prose-lg prose-invert max-w-none"
          >
            <div className="text-white/80 leading-relaxed space-y-8">
              {/* Introduction */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-8 mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">{c.intro.hook}</h2>
                <p className="text-lg leading-relaxed mb-4">{c.intro.p1}</p>
                <p className="text-lg text-accent font-medium italic">{c.intro.p2}</p>
              </div>

              {/* Main Stat */}
              <div className="bg-gradient-to-r from-accent/20 to-accent/5 border border-accent/30 rounded-xl p-8 text-center">
                <div className="text-4xl font-bold text-accent mb-2">{c.intro.stat.value}</div>
                <div className="text-white/70">{c.intro.stat.label}</div>
              </div>

              <p className="text-lg">{c.intro.p3}</p>
              <p className="text-xl font-semibold text-accent">{c.intro.p4}</p>

              {/* What Is GEO */}
              <section>
                <h2 className="text-3xl font-bold text-white mb-6">{c.whatIsGeo.heading}</h2>
                <p className="mb-6 text-lg">{c.whatIsGeo.p1}</p>

                <div className="space-y-3 mb-6">
                  {c.whatIsGeo.comparison.map((item, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 rounded-lg p-4">
                      <p className="text-white font-medium">{item}</p>
                    </div>
                  ))}
                </div>

                <p className="mb-6">{c.whatIsGeo.p2}</p>

                <div className="border-l-4 border-blue-500 bg-blue-500/10 p-6 rounded-r-lg mb-8">
                  <p className="text-white/90">{c.whatIsGeo.callout}</p>
                </div>

                <h3 className="text-2xl font-semibold text-white mb-4">{c.whatIsGeo.howTitle}</h3>
                <div className="space-y-4 mb-6">
                  {c.whatIsGeo.howSteps.map((step, i) => (
                    <div key={i} className="flex gap-3">
                      <span className="text-accent font-bold text-lg mt-0.5">{i + 1}.</span>
                      <p className="text-white/80">{step}</p>
                    </div>
                  ))}
                </div>
                <p className="text-white/70 italic">{c.whatIsGeo.howConclusion}</p>
              </section>

              {/* The Problem */}
              <section>
                <h2 className="text-3xl font-bold text-white mb-6">{c.problem.heading}</h2>
                <p className="mb-8 text-lg">{c.problem.p1}</p>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                  {c.problem.stats.map((stat, i) => (
                    <div key={i} className="bg-gradient-to-br from-accent/15 to-transparent border border-accent/20 rounded-xl p-5 text-center">
                      <div className="text-3xl font-bold text-accent mb-1">{stat.value}</div>
                      <div className="text-white/60 text-sm">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Sub-sections */}
                {[c.problem.zeroClick, c.problem.migration, c.problem.quality].map((sub, i) => (
                  <div key={i} className="mb-6">
                    <h3 className="text-xl font-semibold text-white mb-3">{sub.title}</h3>
                    <p>{sub.text}</p>
                  </div>
                ))}
              </section>

              {/* 7 Benefits */}
              <section>
                <h2 className="text-3xl font-bold text-white mb-8">{c.benefits.heading}</h2>
                <div className="space-y-6">
                  {c.benefits.items.map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <BsCheckCircle className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                        <p className="text-white/70">{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Comparison Table */}
              <section>
                <h2 className="text-3xl font-bold text-white mb-8">{c.comparison.heading}</h2>
                <div className="overflow-x-auto mb-6">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        {c.comparison.headers.map((h, i) => (
                          <th key={i} className="text-left p-3 bg-accent/10 border border-white/10 text-accent text-sm font-semibold">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {c.comparison.rows.map((row, i) => (
                        <tr key={i}>
                          {row.map((cell, j) => (
                            <td key={j} className="p-3 border border-white/10 text-white/70 text-sm">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="border-l-4 border-yellow-500 bg-yellow-500/10 p-6 rounded-r-lg">
                  <p className="text-white/90">{c.comparison.callout}</p>
                </div>
              </section>

              {/* Strategies */}
              <section>
                <h2 className="text-3xl font-bold text-white mb-8">{c.strategies.heading}</h2>
                <div className="space-y-8">
                  {c.strategies.items.map((item, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6">
                      <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                      {item.text && <p className="text-white/80">{item.text}</p>}
                      {item.points && (
                        <ul className="space-y-2 mt-3">
                          {item.points.map((point, j) => (
                            <li key={j} className="flex items-start gap-2 text-white/80">
                              <BsCheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </section>

              {/* CTA */}
              <section>
                <h2 className="text-3xl font-bold text-white mb-6">{c.cta.heading}</h2>
                <p className="mb-4 text-lg">{c.cta.p1}</p>
                <p className="mb-8 text-lg font-medium text-white">{c.cta.p2}</p>

                <div className="bg-gradient-to-r from-accent/20 via-accent/10 to-transparent border border-accent/30 rounded-xl p-8 text-center">
                  <h3 className="text-2xl font-bold text-white mb-3">{c.cta.boxTitle}</h3>
                  <p className="text-white/70 mb-6">{c.cta.boxText}</p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/contact">
                      <div className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-white hover:bg-accent/90 transition-all duration-300 group/btn">
                        <span className="font-medium">{c.cta.primaryBtn}</span>
                        <BsArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                      </div>
                    </Link>
                    <Link href="/services">
                      <div className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-accent text-accent hover:bg-accent hover:text-white transition-all duration-300">
                        <span className="font-medium">{c.cta.secondaryBtn}</span>
                      </div>
                    </Link>
                  </div>
                </div>
              </section>
            </div>
          </motion.article>

          {/* Author Bio */}
          <motion.div
            variants={fadeIn("up", 0.4)}
            initial="hidden"
            animate="show"
            exit="hidden"
          >
            <AuthorBio
              specialization={c.authorBio.specialization}
              description={c.authorBio.description}
            />
          </motion.div>

          {/* Related Articles */}
          <motion.div
            variants={fadeIn("up", 0.5)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="mb-12"
          >
            <h3 className="text-2xl font-bold text-white mb-8">{c.related.heading}</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {c.related.articles.map((article, i) => (
                <Link key={i} href={article.link}>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-accent/50 transition-all duration-300 group">
                    <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-accent transition-colors">
                      {article.title}
                    </h4>
                    <p className="text-white/70 text-sm">{article.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "blog"])),
    },
  };
}

export default GEOArticle;
