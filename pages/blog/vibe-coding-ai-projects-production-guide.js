import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  BsArrowLeft,
  BsCalendar,
  BsClock,
  BsArrowRight,
  BsCheckCircle,
  BsXCircle,
  BsLightning,
  BsExclamationTriangle,
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
      title: "Vibe Coding: Why 90% of AI-Built Projects Never Make It to Production",
      description: "Vibe coding was named word of the year 2025. It's incredible for prototyping but devastating for production. Learn why 90% of vibe-coded projects fail and how to bridge the gap from AI prototype to production-ready application.",
      keywords: "vibe coding, ai code generation, ai projects fail production, chatgpt coding problems, ai prototype to production, vibe coding limitations, project rescue developer",
    },
    categories: ["AI Development", "Project Rescue"],
    title: "Vibe Coding: Why 90% of AI-Built Projects Never Make It to Production",
    shareText: "Vibe Coding: Why 90% of AI-Built Projects Never Make It to Production",
    readTime: "9 min read",
    intro: {
      hook: "You Described It. AI Built It. Now What?",
      p1: "You sat down with ChatGPT, Cursor, or Claude and described the app you wanted in plain English. Within hours, you had a working prototype. Screens rendered, buttons clicked, data flowed. It felt like magic \u2014 like the future had finally arrived. This is vibe coding, and it was officially named the word of the year 2025.",
      p2: "But here\u2019s what nobody tells you: that beautiful prototype is almost certainly not going to production.",
      stat: { value: "90%", label: "of vibe-coded projects never make it to production deployment" },
      p3: "Vibe coding has democratized the ability to create software prototypes at lightning speed. Entrepreneurs, designers, and non-technical founders can now go from idea to working demo in a single afternoon. But there\u2019s a massive, painful gap between \u201cit works on my laptop\u201d and \u201cit\u2019s running reliably in production serving real users.\u201d",
      p4: "Let\u2019s talk about why \u2014 and what you can actually do about it.",
    },
    whatIsVibeCoding: {
      heading: "What Is Vibe Coding and Why Everyone Is Talking About It",
      p1: "Vibe coding is the practice of building software by describing what you want in natural language while an AI model writes the actual code. Instead of learning programming syntax, understanding data structures, or studying software architecture, you simply tell the AI what you need: \u201cBuild me a dashboard that shows real-time sales data with charts and a user authentication system.\u201d",
      p2: "The term was coined by Andrej Karpathy (co-founder of OpenAI and former Tesla AI director) in early 2025 and quickly exploded across the tech world. It perfectly captures the experience: you\u2019re not really coding \u2014 you\u2019re vibing with an AI, guiding it through conversation.",
      tools: [
        "ChatGPT / Claude \u2014 conversational AI that generates code from descriptions",
        "Cursor \u2014 AI-powered IDE that writes code as you describe features",
        "v0 by Vercel \u2014 generates full UI components from text prompts",
        "Bolt / Lovable \u2014 full-stack app generators from natural language",
        "GitHub Copilot \u2014 AI pair programmer that autocompletes entire functions",
      ],
      toolsTitle: "The Tools Powering the Vibe Coding Revolution",
      p3: "The appeal is undeniable. What used to take a development team weeks can now be prototyped in hours. Non-technical founders can validate ideas before hiring engineers. Designers can build functional prototypes instead of static mockups. The barrier to creating software has never been lower.",
    },
    appeal: {
      heading: "The Seductive Appeal: From Idea to Prototype in Hours",
      p1: "Let\u2019s be honest \u2014 vibe coding feels incredible. There\u2019s a reason it went viral and became the defining tech trend of 2025:",
      reasons: [
        {
          title: "Instant Gratification",
          text: "You describe a feature, and within seconds you see it rendered on screen. The feedback loop is intoxicating. Traditional development might take days to build what vibe coding produces in minutes.",
        },
        {
          title: "No Technical Barrier",
          text: "You don\u2019t need to know React, Python, SQL, or any programming language. You just need to clearly describe what you want. This opens software creation to millions of people who previously couldn\u2019t build anything.",
        },
        {
          title: "Rapid Iteration",
          text: "Don\u2019t like the layout? Tell the AI to change it. Need a new feature? Describe it and watch it appear. The speed of iteration is genuinely revolutionary for the prototyping phase.",
        },
        {
          title: "Impressive Demos",
          text: "Vibe-coded prototypes look great in demos and pitch decks. Investors see a \u201cworking product\u201d and get excited. Friends and family are amazed. The problem is that what they\u2019re seeing is a facade.",
        },
      ],
      callout: "Vibe coding is the best thing that ever happened to prototyping \u2014 and potentially the worst thing that ever happened to production software quality.",
    },
    failures: {
      heading: "The 5 Critical Failures of Vibe-Coded Projects",
      p1: "After rescuing dozens of vibe-coded projects that hit the wall, I\u2019ve identified five consistent failure patterns that kill these projects before they ever reach real users:",
      items: [
        {
          title: "1. Zero Tests, Zero Safety Net",
          icon: "xCircle",
          text: "Vibe coding produces code that appears to work, but nobody \u2014 including the AI \u2014 has verified that it actually handles edge cases, unexpected inputs, or failure scenarios. There are no unit tests, no integration tests, no end-to-end tests. Nothing.",
          consequences: [
            "Any change to one part of the app can silently break another",
            "You can\u2019t deploy with confidence because you have no way to verify nothing is broken",
            "Bugs in production are discovered by users, not by your test suite",
            "Refactoring becomes impossible because you don\u2019t know what you\u2019ll break",
          ],
        },
        {
          title: "2. No Error Handling \u2014 The Happy Path Delusion",
          icon: "xCircle",
          text: "AI builds for the happy path. Everything works perfectly when the user does exactly what\u2019s expected. But real users do unexpected things: they submit empty forms, they lose internet connection, they click buttons twice, they paste emojis into number fields. Vibe-coded apps crumble under these conditions.",
          consequences: [
            "App crashes with cryptic errors that confuse users",
            "Data corruption from unvalidated inputs",
            "No error logging \u2014 you don\u2019t even know your app is failing",
            "Payment processes that silently fail without notifying anyone",
          ],
        },
        {
          title: "3. Security Holes Everywhere",
          icon: "xCircle",
          text: "This is the most dangerous failure. AI generates code that works but is fundamentally insecure. API keys hardcoded in frontend code. No input sanitization. SQL injection vulnerabilities. Authentication that can be bypassed. CORS configured to allow everything.",
          consequences: [
            "User data exposed to anyone who inspects the network requests",
            "API keys visible in client-side JavaScript that anyone can steal",
            "Database vulnerable to injection attacks that can destroy all data",
            "Authentication tokens stored insecurely, enabling account hijacking",
          ],
        },
        {
          title: "4. Spaghetti Architecture \u2014 The Unmaintainable Mess",
          icon: "xCircle",
          text: "When you vibe code, you\u2019re building feature by feature without any architectural plan. The AI doesn\u2019t maintain a mental model of your entire system. Each prompt produces code that works in isolation but creates a tangled mess when combined. Business logic mixed with UI code. Duplicated functions everywhere. No separation of concerns.",
          consequences: [
            "Adding new features becomes exponentially harder over time",
            "Bug fixes in one area introduce new bugs elsewhere",
            "No developer (human or AI) can understand the full codebase",
            "Technical debt accumulates faster than features are added",
          ],
        },
        {
          title: "5. Dependency Hell and Environment Chaos",
          icon: "xCircle",
          text: "Vibe-coded projects typically end up with dozens of unnecessary dependencies, conflicting package versions, and configurations that only work on the original developer\u2019s machine. The AI installs packages for quick solutions without considering bundle size, security vulnerabilities, or version conflicts.",
          consequences: [
            "Build fails on any machine except the original development environment",
            "Security vulnerabilities in outdated or unmaintained packages",
            "Bundle sizes so large they cripple application performance",
            "Version conflicts that make updating any dependency a nightmare",
          ],
        },
      ],
    },
    realPatterns: {
      heading: "Real Patterns I\u2019ve Seen Rescuing Vibe-Coded Projects",
      p1: "These aren\u2019t hypothetical scenarios. These are patterns I encounter every week when clients come to me with their stuck vibe-coded projects:",
      patterns: [
        {
          title: "The \u201cAlmost Done\u201d Trap",
          text: "A founder tells me their app is 90% done and just needs \u201ca few fixes.\u201d When I audit the code, I find that the 10% remaining is actually the hard part: authentication, payment processing, data validation, error handling, deployment. The visible UI was the easy 90%. The invisible infrastructure that makes it production-ready is the critical 90% that\u2019s missing.",
        },
        {
          title: "The Frankenstein Codebase",
          text: "The project was built across 50+ ChatGPT conversations over several weeks. Each conversation produced code that worked independently but contradicts the code from other conversations. Different naming conventions, different state management approaches, different API patterns \u2014 all stitched together into a monster that barely runs.",
        },
        {
          title: "The \u201cIt Worked Yesterday\u201d Mystery",
          text: "The app was working perfectly yesterday. Today, nothing works. Nobody changed anything. What happened? An auto-updated dependency introduced a breaking change. Or a free-tier API hit its rate limit. Or the database connection string was hardcoded to a local address. Without proper environment management and pinned dependencies, vibe-coded apps are time bombs.",
        },
        {
          title: "The Security Wake-Up Call",
          text: "A client launched their vibe-coded app and within 48 hours received a message from a \u201csecurity researcher\u201d who had accessed their entire user database. API keys were exposed in the frontend code, the database had no access controls, and user passwords were stored in plain text. The rescue involved rebuilding the entire authentication and data layer from scratch.",
        },
      ],
    },
    whenItWorks: {
      heading: "When Vibe Coding DOES Work",
      p1: "I\u2019m not anti-vibe-coding. I use AI tools daily in my own development workflow. The key is understanding where vibe coding excels and where it falls apart:",
      good: {
        title: "Vibe Coding Shines For:",
        items: [
          "Rapid prototyping \u2014 Validating an idea\u2019s visual and functional concept before investing in real development",
          "Internal tools \u2014 Simple dashboards and admin panels that only your team will use, where security requirements are lower",
          "MVPs with known limitations \u2014 When you explicitly plan to rebuild before scaling, and stakeholders understand it\u2019s a prototype",
          "Learning and exploration \u2014 Understanding how a technology or approach works before committing to it",
          "Hackathons and demos \u2014 When speed matters more than durability and the code will be thrown away",
        ],
      },
      bad: {
        title: "Vibe Coding Fails For:",
        items: [
          "Any application that handles user data or payments",
          "Products that need to scale beyond a handful of users",
          "Software that must meet compliance or regulatory requirements",
          "Applications where downtime or bugs have real consequences",
          "Anything you plan to maintain and iterate on for months or years",
        ],
      },
    },
    bridge: {
      heading: "How to Bridge the Gap: From Vibe-Coded Prototype to Production",
      p1: "If you\u2019ve built something with vibe coding and you want to take it to production, here\u2019s the realistic path forward. It\u2019s not about throwing away your prototype \u2014 it\u2019s about treating it as what it is: a validated proof of concept that needs professional engineering to become a real product.",
      steps: [
        {
          title: "Step 1: Honest Assessment",
          text: "Get a professional code audit. Understand what you actually have versus what you think you have. Most vibe-coded projects need 60-80% of the code rewritten or restructured. This isn\u2019t failure \u2014 it\u2019s the normal path from prototype to production.",
        },
        {
          title: "Step 2: Architecture First",
          text: "Before touching any code, design a proper architecture. Define data models, API contracts, authentication flows, and error handling strategies. The prototype showed what to build; now you need to plan how to build it properly.",
        },
        {
          title: "Step 3: Security Foundation",
          text: "Implement authentication, authorization, input validation, and data encryption from the ground up. This is non-negotiable for any production application. Use battle-tested libraries and frameworks, not AI-improvised solutions.",
        },
        {
          title: "Step 4: Test Infrastructure",
          text: "Set up automated testing before writing production code. Unit tests, integration tests, and end-to-end tests give you the confidence to ship and the safety net to iterate. No tests means no reliable deploys.",
        },
        {
          title: "Step 5: Incremental Migration",
          text: "Rebuild component by component, using the prototype as a specification. Keep the UI elements that work, replace the underlying logic with production-grade code. Deploy incrementally so you always have a working application.",
        },
        {
          title: "Step 6: Production Infrastructure",
          text: "Set up proper CI/CD pipelines, monitoring, logging, error tracking, and automated backups. Production isn\u2019t just running code \u2014 it\u2019s running code reliably with visibility into what\u2019s happening.",
        },
      ],
    },
    cta: {
      heading: "Don\u2019t Let Your Prototype Die \u2014 Get It Production-Ready",
      p1: "You\u2019ve already done the hardest part: you had an idea and validated it with a working prototype. The vibe-coded version proved your concept has legs. Now you need the engineering expertise to make it real.",
      p2: "I specialize in rescuing vibe-coded and AI-generated projects. I\u2019ve taken dozens of prototypes that were \u201calmost done\u201d and turned them into production applications that reliably serve real users.",
      boxTitle: "Ready to Go From Prototype to Production?",
      boxText: "I\u2019ll audit your vibe-coded project, give you an honest assessment of what it takes to ship, and build a clear roadmap from where you are to production. No judgment about how it was built \u2014 just a clear path forward.",
      primaryBtn: "Get a Free Project Assessment",
      secondaryBtn: "View My Services",
    },
    authorBio: {
      specialization: "Full-Stack Developer & Project Rescue Specialist",
      description: "Diego specializes in rescuing AI-generated and vibe-coded projects that are stuck between prototype and production. With hands-on experience building production systems and deep understanding of AI coding tools, he bridges the gap that stops great ideas from reaching real users.",
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
          title: "GEO: Why Generative Engine Optimization Is the Future of Online Visibility",
          excerpt: "Traditional SEO is no longer enough. Learn how GEO helps your business get cited by AI search engines.",
          link: "/blog/geo-generative-engine-optimization-guide",
        },
      ],
    },
  },
  es: {
    seo: {
      title: "Vibe Coding: Por Qu\u00e9 el 90% de los Proyectos Construidos con IA Nunca Llegan a Producci\u00f3n",
      description: "Vibe coding fue nombrada la palabra del a\u00f1o 2025. Es incre\u00edble para prototipar pero devastador para producci\u00f3n. Descubr\u00ed por qu\u00e9 el 90% de los proyectos vibe-coded fallan y c\u00f3mo cerrar la brecha del prototipo IA a la aplicaci\u00f3n lista para producci\u00f3n.",
      keywords: "vibe coding, generacion codigo ia, proyectos ia fallan produccion, chatgpt problemas codigo, prototipo ia produccion, limitaciones vibe coding, rescate proyectos desarrollador",
    },
    categories: ["Desarrollo IA", "Rescate de Proyectos"],
    title: "Vibe Coding: Por Qu\u00e9 el 90% de los Proyectos Construidos con IA Nunca Llegan a Producci\u00f3n",
    shareText: "Vibe Coding: Por Qu\u00e9 el 90% de los Proyectos con IA Nunca Llegan a Producci\u00f3n",
    readTime: "9 min de lectura",
    intro: {
      hook: "Lo Describiste. La IA Lo Construy\u00f3. \u00bfY Ahora Qu\u00e9?",
      p1: "Te sentaste con ChatGPT, Cursor o Claude y describiste la app que quer\u00edas en lenguaje natural. En pocas horas, ten\u00edas un prototipo funcionando. Las pantallas renderizaban, los botones hac\u00edan clic, los datos flu\u00edan. Se sent\u00eda como magia \u2014 como si el futuro finalmente hubiera llegado. Esto es vibe coding, y fue oficialmente nombrada la palabra del a\u00f1o 2025.",
      p2: "Pero ac\u00e1 est\u00e1 lo que nadie te dice: ese hermoso prototipo casi con seguridad no va a llegar a producci\u00f3n.",
      stat: { value: "90%", label: "de los proyectos vibe-coded nunca llegan a desplegarse en producci\u00f3n" },
      p3: "El vibe coding democratiz\u00f3 la capacidad de crear prototipos de software a velocidad rel\u00e1mpago. Emprendedores, dise\u00f1adores y fundadores no t\u00e9cnicos ahora pueden ir de la idea a un demo funcional en una sola tarde. Pero hay una brecha enorme y dolorosa entre \u201cfunciona en mi laptop\u201d y \u201cest\u00e1 corriendo de forma confiable en producci\u00f3n sirviendo a usuarios reales.\u201d",
      p4: "Hablemos de por qu\u00e9 \u2014 y qu\u00e9 pod\u00e9s hacer al respecto.",
    },
    whatIsVibeCoding: {
      heading: "\u00bfQu\u00e9 Es Vibe Coding y Por Qu\u00e9 Todos Hablan de Eso?",
      p1: "Vibe coding es la pr\u00e1ctica de construir software describiendo lo que quer\u00e9s en lenguaje natural mientras un modelo de IA escribe el c\u00f3digo real. En vez de aprender sintaxis de programaci\u00f3n, entender estructuras de datos o estudiar arquitectura de software, simplemente le dec\u00eds a la IA lo que necesit\u00e1s: \u201cConstru\u00edme un dashboard que muestre datos de ventas en tiempo real con gr\u00e1ficos y un sistema de autenticaci\u00f3n de usuarios.\u201d",
      p2: "El t\u00e9rmino fue acu\u00f1ado por Andrej Karpathy (cofundador de OpenAI y ex director de IA de Tesla) a principios de 2025 y r\u00e1pidamente explot\u00f3 en todo el mundo tech. Captura perfectamente la experiencia: no est\u00e1s realmente programando \u2014 est\u00e1s vibeando con una IA, gui\u00e1ndola a trav\u00e9s de conversaci\u00f3n.",
      tools: [
        "ChatGPT / Claude \u2014 IA conversacional que genera c\u00f3digo desde descripciones",
        "Cursor \u2014 IDE potenciado por IA que escribe c\u00f3digo mientras describ\u00eds funcionalidades",
        "v0 de Vercel \u2014 genera componentes de UI completos desde prompts de texto",
        "Bolt / Lovable \u2014 generadores de apps full-stack desde lenguaje natural",
        "GitHub Copilot \u2014 programador par con IA que autocompleta funciones enteras",
      ],
      toolsTitle: "Las Herramientas que Impulsan la Revoluci\u00f3n del Vibe Coding",
      p3: "El atractivo es innegable. Lo que antes le tomaba a un equipo de desarrollo semanas ahora puede prototiparse en horas. Fundadores no t\u00e9cnicos pueden validar ideas antes de contratar ingenieros. Dise\u00f1adores pueden construir prototipos funcionales en vez de mockups est\u00e1ticos. La barrera para crear software nunca fue tan baja.",
    },
    appeal: {
      heading: "El Atractivo Seductor: De Idea a Prototipo en Horas",
      p1: "Seamos honestos \u2014 el vibe coding se siente incre\u00edble. Hay una raz\u00f3n por la que se volvi\u00f3 viral y se convirti\u00f3 en la tendencia tech definitoria de 2025:",
      reasons: [
        {
          title: "Gratificaci\u00f3n Instant\u00e1nea",
          text: "Describ\u00eds una funcionalidad y en segundos la ves renderizada en pantalla. El ciclo de retroalimentaci\u00f3n es intoxicante. El desarrollo tradicional puede tardar d\u00edas en construir lo que el vibe coding produce en minutos.",
        },
        {
          title: "Sin Barrera T\u00e9cnica",
          text: "No necesit\u00e1s saber React, Python, SQL ni ning\u00fan lenguaje de programaci\u00f3n. Solo necesit\u00e1s describir claramente lo que quer\u00e9s. Esto abre la creaci\u00f3n de software a millones de personas que antes no pod\u00edan construir nada.",
        },
        {
          title: "Iteraci\u00f3n R\u00e1pida",
          text: "\u00bfNo te gusta el dise\u00f1o? Dec\u00edle a la IA que lo cambie. \u00bfNecesit\u00e1s una nueva funcionalidad? Describila y mir\u00e1 c\u00f3mo aparece. La velocidad de iteraci\u00f3n es genuinamente revolucionaria para la fase de prototipado.",
        },
        {
          title: "Demos Impresionantes",
          text: "Los prototipos vibe-coded se ven geniales en demos y pitch decks. Los inversores ven un \u201cproducto funcionando\u201d y se emocionan. Amigos y familia quedan asombrados. El problema es que lo que est\u00e1n viendo es una fachada.",
        },
      ],
      callout: "El vibe coding es lo mejor que le pas\u00f3 al prototipado \u2014 y potencialmente lo peor que le pas\u00f3 a la calidad del software en producci\u00f3n.",
    },
    failures: {
      heading: "Las 5 Fallas Cr\u00edticas de los Proyectos Vibe-Coded",
      p1: "Despu\u00e9s de rescatar docenas de proyectos vibe-coded que chocaron contra la pared, identifiqu\u00e9 cinco patrones de falla consistentes que matan estos proyectos antes de que lleguen a usuarios reales:",
      items: [
        {
          title: "1. Cero Tests, Cero Red de Seguridad",
          icon: "xCircle",
          text: "El vibe coding produce c\u00f3digo que parece funcionar, pero nadie \u2014 incluyendo la IA \u2014 verific\u00f3 que realmente maneje casos extremos, inputs inesperados o escenarios de falla. No hay tests unitarios, ni tests de integraci\u00f3n, ni tests end-to-end. Nada.",
          consequences: [
            "Cualquier cambio en una parte de la app puede romper silenciosamente otra",
            "No pod\u00e9s deployar con confianza porque no ten\u00e9s forma de verificar que nada est\u00e9 roto",
            "Los bugs en producci\u00f3n los descubren los usuarios, no tu suite de tests",
            "Refactorizar se vuelve imposible porque no sab\u00e9s qu\u00e9 vas a romper",
          ],
        },
        {
          title: "2. Sin Manejo de Errores \u2014 La Ilusi\u00f3n del Happy Path",
          icon: "xCircle",
          text: "La IA construye para el happy path. Todo funciona perfectamente cuando el usuario hace exactamente lo esperado. Pero los usuarios reales hacen cosas inesperadas: env\u00edan formularios vac\u00edos, pierden conexi\u00f3n a internet, hacen clic dos veces en botones, pegan emojis en campos num\u00e9ricos. Las apps vibe-coded se desmoronan bajo estas condiciones.",
          consequences: [
            "La app crashea con errores cr\u00edpticos que confunden a los usuarios",
            "Corrupci\u00f3n de datos por inputs sin validar",
            "Sin logging de errores \u2014 ni siquiera sab\u00e9s que tu app est\u00e1 fallando",
            "Procesos de pago que fallan silenciosamente sin notificar a nadie",
          ],
        },
        {
          title: "3. Agujeros de Seguridad en Todos Lados",
          icon: "xCircle",
          text: "Esta es la falla m\u00e1s peligrosa. La IA genera c\u00f3digo que funciona pero es fundamentalmente inseguro. API keys hardcodeadas en el c\u00f3digo frontend. Sin sanitizaci\u00f3n de inputs. Vulnerabilidades de inyecci\u00f3n SQL. Autenticaci\u00f3n que se puede bypassear. CORS configurado para permitir todo.",
          consequences: [
            "Datos de usuarios expuestos a cualquiera que inspeccione las requests de red",
            "API keys visibles en JavaScript del lado del cliente que cualquiera puede robar",
            "Base de datos vulnerable a ataques de inyecci\u00f3n que pueden destruir todos los datos",
            "Tokens de autenticaci\u00f3n almacenados de forma insegura, habilitando el secuestro de cuentas",
          ],
        },
        {
          title: "4. Arquitectura Espagueti \u2014 El Desastre Inmantenible",
          icon: "xCircle",
          text: "Cuando hac\u00e9s vibe coding, est\u00e1s construyendo funcionalidad por funcionalidad sin ning\u00fan plan arquitect\u00f3nico. La IA no mantiene un modelo mental de todo tu sistema. Cada prompt produce c\u00f3digo que funciona aisladamente pero crea un enredo al combinarse. L\u00f3gica de negocio mezclada con c\u00f3digo de UI. Funciones duplicadas en todos lados. Sin separaci\u00f3n de responsabilidades.",
          consequences: [
            "Agregar nuevas funcionalidades se vuelve exponencialmente m\u00e1s dif\u00edcil con el tiempo",
            "Corregir bugs en un \u00e1rea introduce nuevos bugs en otra",
            "Ning\u00fan desarrollador (humano o IA) puede entender todo el codebase",
            "La deuda t\u00e9cnica se acumula m\u00e1s r\u00e1pido de lo que se agregan funcionalidades",
          ],
        },
        {
          title: "5. Infierno de Dependencias y Caos de Entorno",
          icon: "xCircle",
          text: "Los proyectos vibe-coded t\u00edpicamente terminan con docenas de dependencias innecesarias, versiones de paquetes en conflicto y configuraciones que solo funcionan en la m\u00e1quina del desarrollador original. La IA instala paquetes para soluciones r\u00e1pidas sin considerar el tama\u00f1o del bundle, vulnerabilidades de seguridad o conflictos de versiones.",
          consequences: [
            "El build falla en cualquier m\u00e1quina excepto el entorno de desarrollo original",
            "Vulnerabilidades de seguridad en paquetes desactualizados o sin mantenimiento",
            "Tama\u00f1os de bundle tan grandes que paralizan el rendimiento de la aplicaci\u00f3n",
            "Conflictos de versiones que hacen que actualizar cualquier dependencia sea una pesadilla",
          ],
        },
      ],
    },
    realPatterns: {
      heading: "Patrones Reales que Vi Rescatando Proyectos Vibe-Coded",
      p1: "Estos no son escenarios hipot\u00e9ticos. Son patrones que encuentro cada semana cuando clientes vienen con sus proyectos vibe-coded trabados:",
      patterns: [
        {
          title: "La Trampa del \u201cCasi Terminado\u201d",
          text: "Un fundador me dice que su app est\u00e1 90% lista y solo necesita \u201cunos ajustes.\u201d Cuando audito el c\u00f3digo, descubro que el 10% restante es en realidad la parte dif\u00edcil: autenticaci\u00f3n, procesamiento de pagos, validaci\u00f3n de datos, manejo de errores, deployment. La UI visible era el 90% f\u00e1cil. La infraestructura invisible que la hace lista para producci\u00f3n es el 90% cr\u00edtico que falta.",
        },
        {
          title: "El Codebase Frankenstein",
          text: "El proyecto fue construido a lo largo de 50+ conversaciones con ChatGPT durante varias semanas. Cada conversaci\u00f3n produjo c\u00f3digo que funcionaba independientemente pero contradice el c\u00f3digo de otras conversaciones. Diferentes convenciones de nombres, diferentes enfoques de manejo de estado, diferentes patrones de API \u2014 todo cosido en un monstruo que apenas corre.",
        },
        {
          title: "El Misterio del \u201cAyer Funcionaba\u201d",
          text: "La app estaba funcionando perfectamente ayer. Hoy, nada funciona. Nadie cambi\u00f3 nada. \u00bfQu\u00e9 pas\u00f3? Una dependencia auto-actualizada introdujo un cambio que rompi\u00f3 todo. O una API de nivel gratuito alcanz\u00f3 su l\u00edmite de requests. O el connection string de la base de datos estaba hardcodeado a una direcci\u00f3n local. Sin manejo adecuado de entorno y dependencias fijadas, las apps vibe-coded son bombas de tiempo.",
        },
        {
          title: "La Llamada de Atenci\u00f3n de Seguridad",
          text: "Un cliente lanz\u00f3 su app vibe-coded y en 48 horas recibi\u00f3 un mensaje de un \u201cinvestigador de seguridad\u201d que hab\u00eda accedido a toda su base de datos de usuarios. Las API keys estaban expuestas en el c\u00f3digo frontend, la base de datos no ten\u00eda controles de acceso y las contrase\u00f1as de los usuarios estaban almacenadas en texto plano. El rescate implic\u00f3 reconstruir toda la capa de autenticaci\u00f3n y datos desde cero.",
        },
      ],
    },
    whenItWorks: {
      heading: "\u00bfCu\u00e1ndo S\u00cd Funciona el Vibe Coding?",
      p1: "No estoy en contra del vibe coding. Uso herramientas de IA diariamente en mi propio flujo de desarrollo. La clave es entender d\u00f3nde el vibe coding brilla y d\u00f3nde se desmorona:",
      good: {
        title: "El Vibe Coding Brilla Para:",
        items: [
          "Prototipado r\u00e1pido \u2014 Validar el concepto visual y funcional de una idea antes de invertir en desarrollo real",
          "Herramientas internas \u2014 Dashboards simples y paneles de admin que solo tu equipo usar\u00e1, donde los requisitos de seguridad son menores",
          "MVPs con limitaciones conocidas \u2014 Cuando expl\u00edcitamente plan\u00e9as reconstruir antes de escalar, y los stakeholders entienden que es un prototipo",
          "Aprendizaje y exploraci\u00f3n \u2014 Entender c\u00f3mo funciona una tecnolog\u00eda o enfoque antes de comprometerse",
          "Hackathons y demos \u2014 Cuando la velocidad importa m\u00e1s que la durabilidad y el c\u00f3digo se va a descartar",
        ],
      },
      bad: {
        title: "El Vibe Coding Falla Para:",
        items: [
          "Cualquier aplicaci\u00f3n que maneje datos de usuarios o pagos",
          "Productos que necesiten escalar m\u00e1s all\u00e1 de un pu\u00f1ado de usuarios",
          "Software que deba cumplir requisitos de compliance o regulatorios",
          "Aplicaciones donde el downtime o los bugs tengan consecuencias reales",
          "Cualquier cosa que planees mantener e iterar durante meses o a\u00f1os",
        ],
      },
    },
    bridge: {
      heading: "C\u00f3mo Cerrar la Brecha: De Prototipo Vibe-Coded a Producci\u00f3n",
      p1: "Si construiste algo con vibe coding y quer\u00e9s llevarlo a producci\u00f3n, ac\u00e1 est\u00e1 el camino realista. No se trata de tirar tu prototipo \u2014 se trata de tratarlo como lo que es: una prueba de concepto validada que necesita ingenier\u00eda profesional para convertirse en un producto real.",
      steps: [
        {
          title: "Paso 1: Evaluaci\u00f3n Honesta",
          text: "Consegu\u00ed una auditor\u00eda de c\u00f3digo profesional. Entend\u00e9 lo que realmente ten\u00e9s versus lo que cre\u00e9s que ten\u00e9s. La mayor\u00eda de los proyectos vibe-coded necesitan que el 60-80% del c\u00f3digo sea reescrito o reestructurado. Esto no es un fracaso \u2014 es el camino normal del prototipo a producci\u00f3n.",
        },
        {
          title: "Paso 2: Primero la Arquitectura",
          text: "Antes de tocar cualquier c\u00f3digo, dise\u00f1\u00e1 una arquitectura adecuada. Defin\u00ed modelos de datos, contratos de API, flujos de autenticaci\u00f3n y estrategias de manejo de errores. El prototipo mostr\u00f3 qu\u00e9 construir; ahora necesit\u00e1s planificar c\u00f3mo construirlo correctamente.",
        },
        {
          title: "Paso 3: Fundaci\u00f3n de Seguridad",
          text: "Implement\u00e1 autenticaci\u00f3n, autorizaci\u00f3n, validaci\u00f3n de inputs y encriptaci\u00f3n de datos desde cero. Esto es innegociable para cualquier aplicaci\u00f3n en producci\u00f3n. Us\u00e1 librer\u00edas y frameworks probados en batalla, no soluciones improvisadas por IA.",
        },
        {
          title: "Paso 4: Infraestructura de Tests",
          text: "Configur\u00e1 testing automatizado antes de escribir c\u00f3digo de producci\u00f3n. Tests unitarios, de integraci\u00f3n y end-to-end te dan la confianza para deployar y la red de seguridad para iterar. Sin tests no hay deploys confiables.",
        },
        {
          title: "Paso 5: Migraci\u00f3n Incremental",
          text: "Reconstru\u00ed componente por componente, usando el prototipo como especificaci\u00f3n. Conserv\u00e1 los elementos de UI que funcionan, reemplaz\u00e1 la l\u00f3gica subyacente con c\u00f3digo de grado producci\u00f3n. Depoy\u00e1 incrementalmente para siempre tener una aplicaci\u00f3n funcionando.",
        },
        {
          title: "Paso 6: Infraestructura de Producci\u00f3n",
          text: "Configur\u00e1 pipelines de CI/CD adecuados, monitoreo, logging, tracking de errores y backups automatizados. Producci\u00f3n no es solo correr c\u00f3digo \u2014 es correr c\u00f3digo de forma confiable con visibilidad de lo que est\u00e1 pasando.",
        },
      ],
    },
    cta: {
      heading: "No Dejes que Tu Prototipo Muera \u2014 Llev\u00e1lo a Producci\u00f3n",
      p1: "Ya hiciste la parte m\u00e1s dif\u00edcil: tuviste una idea y la validaste con un prototipo funcional. La versi\u00f3n vibe-coded demostr\u00f3 que tu concepto tiene potencial. Ahora necesit\u00e1s la experiencia en ingenier\u00eda para hacerlo real.",
      p2: "Me especializo en rescatar proyectos vibe-coded y generados con IA. Llev\u00e9 docenas de prototipos que estaban \u201ccasi listos\u201d y los convert\u00ed en aplicaciones de producci\u00f3n que sirven confiablemente a usuarios reales.",
      boxTitle: "\u00bfListo para Ir del Prototipo a Producci\u00f3n?",
      boxText: "Voy a auditar tu proyecto vibe-coded, darte una evaluaci\u00f3n honesta de lo que se necesita para lanzar, y construir una hoja de ruta clara desde donde est\u00e1s hasta producci\u00f3n. Sin juicios sobre c\u00f3mo fue construido \u2014 solo un camino claro hacia adelante.",
      primaryBtn: "Evaluaci\u00f3n Gratuita de Proyecto",
      secondaryBtn: "Ver Mis Servicios",
    },
    authorBio: {
      specialization: "Desarrollador Full-Stack y Especialista en Rescate de Proyectos",
      description: "Diego se especializa en rescatar proyectos generados con IA y vibe-coded que est\u00e1n trabados entre el prototipo y la producci\u00f3n. Con experiencia pr\u00e1ctica construyendo sistemas de producci\u00f3n y profundo entendimiento de herramientas de coding con IA, cierra la brecha que impide que grandes ideas lleguen a usuarios reales.",
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
          title: "GEO: Por Qu\u00e9 la Optimizaci\u00f3n para Motores Generativos Es el Futuro de la Visibilidad Online",
          excerpt: "El SEO tradicional ya no es suficiente. Descubr\u00ed c\u00f3mo GEO ayuda a tu negocio a ser citado por buscadores IA.",
          link: "/blog/geo-generative-engine-optimization-guide",
        },
      ],
    },
  },
};

const VibeCodingArticle = () => {
  const { t } = useTranslation(["blog", "common"]);
  const { locale } = useRouter();
  const dateLocale = locale === "es" ? "es-ES" : "en-US";
  const c = content[locale] || content.en;

  const publishDate = "2026-02-19";
  const articleUrl = "https://www.diego-rodriguez.work/blog/vibe-coding-ai-projects-production-guide";

  return (
    <>
      <SEO
        title={c.seo.title}
        description={c.seo.description}
        keywords={c.seo.keywords}
        image="/work/vibe-coding.jpg"
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
                src="/work/vibe-coding.jpg"
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

              {/* What Is Vibe Coding */}
              <section>
                <h2 className="text-3xl font-bold text-white mb-6">{c.whatIsVibeCoding.heading}</h2>
                <p className="mb-6 text-lg">{c.whatIsVibeCoding.p1}</p>
                <p className="mb-6">{c.whatIsVibeCoding.p2}</p>

                <h3 className="text-2xl font-semibold text-white mb-4">{c.whatIsVibeCoding.toolsTitle}</h3>
                <div className="space-y-3 mb-6">
                  {c.whatIsVibeCoding.tools.map((tool, i) => (
                    <div key={i} className="flex gap-3">
                      <BsLightning className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <p className="text-white/80">{tool}</p>
                    </div>
                  ))}
                </div>

                <p className="text-lg">{c.whatIsVibeCoding.p3}</p>
              </section>

              {/* The Seductive Appeal */}
              <section>
                <h2 className="text-3xl font-bold text-white mb-6">{c.appeal.heading}</h2>
                <p className="mb-6 text-lg">{c.appeal.p1}</p>

                <div className="space-y-6 mb-8">
                  {c.appeal.reasons.map((reason, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6">
                      <h3 className="text-xl font-semibold text-white mb-2">{reason.title}</h3>
                      <p className="text-white/80">{reason.text}</p>
                    </div>
                  ))}
                </div>

                <div className="border-l-4 border-yellow-500 bg-yellow-500/10 p-6 rounded-r-lg">
                  <p className="text-white/90 font-medium">{c.appeal.callout}</p>
                </div>
              </section>

              {/* 5 Critical Failures */}
              <section>
                <h2 className="text-3xl font-bold text-white mb-6">{c.failures.heading}</h2>
                <p className="mb-8 text-lg">{c.failures.p1}</p>

                <div className="space-y-6 mb-8">
                  {c.failures.items.map((item, i) => (
                    <div key={i} className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
                      <div className="flex items-start gap-4">
                        <BsXCircle className="w-8 h-8 text-red-400 mt-1 flex-shrink-0" />
                        <div>
                          <h3 className="text-xl font-semibold text-red-400 mb-3">{item.title}</h3>
                          <p className="text-white/80 mb-4">{item.text}</p>
                          <ul className="space-y-2 text-white/70 text-sm">
                            {item.consequences.map((consequence, j) => (
                              <li key={j} className="flex items-start gap-2">
                                <BsExclamationTriangle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                                <span>{consequence}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Real Patterns */}
              <section>
                <h2 className="text-3xl font-bold text-white mb-6">{c.realPatterns.heading}</h2>
                <p className="mb-8 text-lg">{c.realPatterns.p1}</p>

                <div className="space-y-6 mb-8">
                  {c.realPatterns.patterns.map((pattern, i) => (
                    <div key={i} className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
                      <h3 className="text-xl font-semibold text-blue-400 mb-3">{pattern.title}</h3>
                      <p className="text-white/80">{pattern.text}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* When It Works */}
              <section>
                <h2 className="text-3xl font-bold text-white mb-6">{c.whenItWorks.heading}</h2>
                <p className="mb-8 text-lg">{c.whenItWorks.p1}</p>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6">
                    <h3 className="text-xl font-semibold text-green-400 mb-4">{c.whenItWorks.good.title}</h3>
                    <ul className="space-y-3">
                      {c.whenItWorks.good.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-white/80 text-sm">
                          <BsCheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
                    <h3 className="text-xl font-semibold text-red-400 mb-4">{c.whenItWorks.bad.title}</h3>
                    <ul className="space-y-3">
                      {c.whenItWorks.bad.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-white/80 text-sm">
                          <BsXCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              {/* Bridge the Gap */}
              <section>
                <h2 className="text-3xl font-bold text-white mb-6">{c.bridge.heading}</h2>
                <p className="mb-8 text-lg">{c.bridge.p1}</p>

                <div className="space-y-6 mb-8">
                  {c.bridge.steps.map((step, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6">
                      <div className="flex gap-4">
                        <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold text-sm">{i + 1}</span>
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                          <p className="text-white/80">{step.text}</p>
                        </div>
                      </div>
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

export default VibeCodingArticle;
