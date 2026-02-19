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
      title: "MCP Explained: The Protocol That Connects Your AI Agents to the Real World",
      description: "Model Context Protocol (MCP) by Anthropic is the USB standard for AI. Learn how MCP connects AI agents to tools, databases, APIs, and development environments with a practical development guide.",
      keywords: "model context protocol, MCP, anthropic MCP, ai agents tools, MCP server, ai integration protocol, claude MCP, ai tool connection, MCP development guide",
    },
    categories: ["AI Development", "API Development"],
    title: "MCP Explained: The Protocol That Connects Your AI Agents to the Real World",
    shareText: "MCP: The Protocol That Connects AI Agents to the Real World",
    readTime: "11 min read",
    intro: {
      hook: "Your AI Is Smart. But It Can\u2019t Do Anything.",
      p1: "You\u2019ve seen the demos. AI that writes code, summarizes documents, answers complex questions. Impressive \u2014 until you actually try to connect it to your company\u2019s database. Or your GitHub repos. Or your Slack workspace. Or your CRM. Suddenly, the world\u2019s most intelligent language model becomes a very expensive chatbot that can\u2019t access any of your real data.",
      p2: "Every integration is custom. Every connection is fragile. Every new tool means starting from scratch.",
      stat: { value: "1,000+", label: "MCP integrations already available across the ecosystem in 2026" },
      p3: "This is the problem that Model Context Protocol (MCP) was built to solve. Created by Anthropic and released as an open standard, MCP is rapidly becoming the universal language for how AI agents talk to the outside world \u2014 your tools, your data, your APIs, your entire tech stack.",
      p4: "Think of it as USB for AI. One protocol to connect them all.",
    },
    problem: {
      heading: "The Problem: AI Models Are Brilliant but Isolated",
      p1: "Large language models are extraordinarily capable at understanding and generating text. But they have a fundamental limitation: they exist in a sandbox. They can\u2019t see your files, query your database, trigger your CI/CD pipeline, or post a message in your Slack channel \u2014 unless someone builds a specific integration for each of those things.",
      stats: [
        { value: "N:N", label: "Every AI app needs custom code for every tool \u2014 an N\u00d7N integration nightmare" },
        { value: "70%", label: "of enterprise AI pilot time is spent on integration, not intelligence" },
        { value: "6+", label: "months average to build reliable AI-to-tool connections from scratch" },
      ],
      fragmentation: {
        title: "The Integration Fragmentation Problem",
        text: "Before MCP, if you wanted Claude to access your PostgreSQL database, you wrote custom code. If you also wanted it to access GitHub, you wrote different custom code. Slack? More custom code. Each AI application had to reinvent the wheel for every single data source. This is the same N\u00d7M problem that USB solved for hardware: before USB, every device needed its own proprietary cable and driver.",
      },
      context: {
        title: "The Context Window Isn\u2019t Enough",
        text: "Some developers try to work around isolation by stuffing everything into the context window \u2014 copy-pasting database schemas, file contents, and API responses into prompts. This is expensive, error-prone, hits token limits quickly, and doesn\u2019t allow the AI to take actions. The AI can read what you pasted, but it can\u2019t query fresh data or execute commands.",
      },
      security: {
        title: "Security and Control Are Afterthoughts",
        text: "Ad-hoc integrations rarely have proper access controls. Who decides what the AI can read? Can it modify data or just view it? Is there an audit trail? With custom integrations, these critical questions are handled inconsistently \u2014 or not at all.",
      },
    },
    whatIsMcp: {
      heading: "What Is MCP? The USB Standard for AI",
      p1: "Model Context Protocol (MCP) is an open standard created by Anthropic that defines how AI applications communicate with external data sources and tools. It provides a universal, standardized way for AI models to discover and use tools, access data, and execute actions \u2014 without requiring custom integration code for every connection.",
      architecture: [
        "MCP Host \u2014 The AI application (Claude Desktop, Cursor, your custom app) that wants to access external capabilities",
        "MCP Client \u2014 The protocol client embedded in the host that manages connections to servers",
        "MCP Server \u2014 A lightweight program that exposes specific capabilities (database access, API calls, file operations) through the standardized protocol",
      ],
      p2: "When Claude Desktop connects to an MCP server for PostgreSQL, it doesn\u2019t need to know anything about SQL drivers or connection pooling. The MCP server handles all of that and exposes a clean, standardized interface. The AI just says \u201cquery this table\u201d and gets structured results back.",
      callout: "MCP is open source and protocol-level. It\u2019s not locked to Anthropic or Claude. Any AI model, any application, any tool can implement MCP. This is what makes it a true standard rather than a proprietary feature.",
      howTitle: "How the Connection Works",
      howSteps: [
        "The AI host discovers available MCP servers and their capabilities through a standardized handshake",
        "The MCP server advertises what it can do: what resources it exposes, what tools it offers, what prompt templates it provides",
        "The AI model sees these capabilities as available actions it can take during a conversation",
        "When the model decides to use a tool, the request flows through the MCP client to the appropriate server, which executes it and returns results",
      ],
      howConclusion: "The entire flow is standardized. Build one MCP server for your tool, and every MCP-compatible AI application can use it immediately.",
    },
    primitives: {
      heading: "The 3 Primitives: Resources, Tools, and Prompts",
      p1: "MCP organizes everything an AI might need into three core primitives. Understanding these is key to understanding the protocol.",
      items: [
        {
          title: "1. Resources \u2014 Data the AI Can Read",
          text: "Resources are data sources the AI can access: files, database records, API responses, live system metrics, log outputs. They\u2019re read-only by default and identified by URIs. Think of them as the \u201cnouns\u201d \u2014 the things the AI can see and reference.",
          examples: "file:///project/src/index.ts, postgres://db/users/schema, slack://channels/general/messages",
        },
        {
          title: "2. Tools \u2014 Actions the AI Can Take",
          text: "Tools are functions the AI can execute: run a database query, create a GitHub issue, send a Slack message, deploy a service. They\u2019re the \u201cverbs\u201d \u2014 the things the AI can do. Each tool has a defined input schema and returns structured output.",
          examples: "query_database, create_github_issue, send_slack_message, run_terminal_command",
        },
        {
          title: "3. Prompts \u2014 Reusable Interaction Templates",
          text: "Prompts are pre-defined templates that help the AI interact with specific tools or resources effectively. They encode best practices and domain knowledge into reusable patterns. Think of them as \u201crecipes\u201d that tell the AI the best way to accomplish common tasks with specific tools.",
          examples: "analyze-database-performance, review-pull-request, debug-error-logs",
        },
      ],
      callout: "These three primitives cover nearly every interaction between an AI and external systems. Resources for reading, Tools for acting, Prompts for guiding. This simplicity is deliberate \u2014 a small set of well-defined building blocks is far more powerful than a sprawling, complex API.",
    },
    comparison: {
      heading: "MCP vs Alternatives: When to Use What",
      headers: ["Aspect", "MCP (Anthropic)", "ACP (IBM)", "A2A (Google)"],
      rows: [
        ["Primary Purpose", "Connect AI to tools and data sources", "Agent-to-agent communication and orchestration", "Agent-to-agent discovery and collaboration"],
        ["Architecture", "Client-server (AI app \u2194 tool server)", "Agent-to-agent mesh", "Agent-to-agent via Agent Cards"],
        ["Key Strength", "Universal tool/data access for any AI", "Enterprise multi-agent workflows", "Cross-platform agent interoperability"],
        ["Best For", "Giving AI access to databases, APIs, files, dev tools", "Orchestrating multiple AI agents in enterprise", "Enabling agents from different vendors to collaborate"],
        ["Maturity (2026)", "Production-ready, 1000+ integrations", "Early adoption, IBM ecosystem", "Growing adoption, Google ecosystem"],
        ["Open Standard", "Yes (open source)", "Yes (Linux Foundation)", "Yes (open specification)"],
      ],
      callout: "Important: These protocols are complementary, not competing. MCP connects AI to tools. ACP and A2A connect AI agents to each other. A mature AI system might use all three: MCP for tool access, A2A for cross-vendor agent communication, and ACP for enterprise agent orchestration.",
    },
    examples: {
      heading: "Real-World MCP in Action: 5 Practical Examples",
      items: [
        {
          title: "1. Database Access \u2014 AI That Queries Your Data Directly",
          text: "An MCP server for PostgreSQL lets your AI agent explore database schemas, run read queries, and analyze results \u2014 all through natural language. Ask Claude \u201cWhat were our top 10 customers by revenue last quarter?\u201d and it writes the SQL, executes it through the MCP server, and returns formatted results. No copy-pasting data into prompts.",
        },
        {
          title: "2. GitHub Integration \u2014 AI-Powered Code Workflows",
          text: "The GitHub MCP server gives AI agents access to repositories, pull requests, issues, and code. Claude can review a PR, suggest changes, create issues for bugs it finds, and even push commits \u2014 all within a conversation. Developers use this to automate code reviews, triage issues, and manage release workflows.",
        },
        {
          title: "3. Slack \u2014 AI That Participates in Your Team Communication",
          text: "With the Slack MCP server, an AI agent can read channel histories, summarize conversations, respond to questions, and post updates. Imagine an AI that monitors your #support channel, automatically categorizes issues, drafts responses, and escalates critical problems \u2014 all in real-time.",
        },
        {
          title: "4. File System \u2014 AI That Works With Your Local Files",
          text: "The filesystem MCP server lets AI read, search, and (with permission) modify files on your machine. This is what powers tools like Claude Code and Cursor \u2014 the AI can navigate your codebase, understand project structure, and make targeted edits across multiple files.",
        },
        {
          title: "5. Custom APIs \u2014 AI Connected to Your Business Logic",
          text: "Any REST or GraphQL API can be wrapped in an MCP server. Your internal CRM, inventory system, analytics dashboard, payment processor \u2014 all become accessible to AI through a standardized interface. This is where MCP becomes transformative for businesses: your AI assistant isn\u2019t limited to generic knowledge \u2014 it has access to your specific business data and operations.",
        },
      ],
    },
    building: {
      heading: "Building Your First MCP Server: A Practical Overview",
      p1: "Building an MCP server is surprisingly straightforward. The official SDK handles protocol details, so you can focus on what your server actually does. Here\u2019s the general approach:",
      steps: [
        {
          title: "Step 1: Choose Your Stack",
          text: "MCP servers can be built in TypeScript/Node.js (most popular), Python, Go, Rust, or any language that can handle JSON-RPC over stdio or HTTP. The official Anthropic SDKs for TypeScript and Python are the most mature.",
        },
        {
          title: "Step 2: Define Your Capabilities",
          text: "Decide what resources, tools, and prompts your server will expose. Start small \u2014 a server with 2-3 well-defined tools is more useful than one with 20 poorly-defined ones. Each tool needs a clear name, description, and input schema.",
        },
        {
          title: "Step 3: Implement the Server",
          text: "Use the MCP SDK to create a server instance, register your tools with their handlers, and start the transport (stdio for local, SSE/HTTP for remote). The SDK handles protocol negotiation, message framing, and error handling.",
        },
        {
          title: "Step 4: Test with an MCP Client",
          text: "Connect your server to Claude Desktop, Cursor, or the MCP Inspector tool to test. Verify that tools appear correctly, inputs are validated, and responses are properly formatted. Test error cases \u2014 what happens when the database is down or the API returns an error?",
        },
        {
          title: "Step 5: Deploy and Distribute",
          text: "Local servers run alongside the AI application via stdio. Remote servers can be deployed as HTTP services with SSE transport, enabling cloud-hosted MCP servers that multiple clients can connect to. Package your server for npm or PyPI so others can use it.",
        },
      ],
      callout: "Pro tip: Start with the MCP Inspector (npx @modelcontextprotocol/inspector) to debug and test your server interactively before connecting it to an AI application. It shows you exactly what the AI sees.",
    },
    ecosystem: {
      heading: "The MCP Ecosystem: Who Supports It",
      p1: "MCP adoption has exploded since its release. Here are the major players:",
      items: [
        {
          title: "Claude Desktop & Claude Code",
          text: "Anthropic\u2019s own applications were the first MCP hosts. Claude Desktop supports connecting to multiple MCP servers simultaneously, giving Claude access to your local files, databases, and tools. Claude Code uses MCP to power its development capabilities.",
        },
        {
          title: "Cursor",
          text: "The AI-powered code editor has deep MCP integration. Developers can add MCP servers to give Cursor\u2019s AI access to custom documentation, internal APIs, and project-specific tools \u2014 making it significantly more useful for enterprise development.",
        },
        {
          title: "VS Code (GitHub Copilot)",
          text: "Microsoft added MCP support to VS Code through GitHub Copilot\u2019s agent mode. This brings MCP to the world\u2019s most popular code editor, dramatically expanding the protocol\u2019s reach among developers.",
        },
        {
          title: "Windsurf, Zed, Cline & Others",
          text: "The list of MCP-compatible editors and AI tools is growing rapidly. Windsurf, Zed, Cline, Continue, and many more have added MCP support \u2014 creating a network effect where every new MCP server instantly works with dozens of AI applications.",
        },
        {
          title: "Enterprise Platforms",
          text: "Companies like Block, Apollo, Replit, and Sourcegraph have built MCP servers for their platforms. Enterprise adoption is accelerating as companies realize MCP eliminates the need to build custom AI integrations for every tool in their stack.",
        },
      ],
      stat: { value: "Dozens", label: "of AI applications now support MCP as a first-class integration method" },
    },
    cta: {
      heading: "Ready to Connect Your AI to the Real World?",
      p1: "MCP is not a future technology \u2014 it\u2019s production-ready today. Businesses that adopt it now are giving their AI assistants superpowers: access to real data, the ability to take real actions, and seamless integration with existing tools and workflows.",
      p2: "The question isn\u2019t whether your AI needs tool access \u2014 it\u2019s how fast you can implement it.",
      boxTitle: "Need Custom MCP Integrations for Your Business?",
      boxText: "I build custom MCP servers that connect your AI agents to your specific databases, APIs, and internal tools. Whether you need a single integration or a complete AI-powered workflow, let\u2019s make your AI actually useful.",
      primaryBtn: "Start a Conversation",
      secondaryBtn: "View My Services",
    },
    authorBio: {
      specialization: "Full-Stack Developer & AI Integration Specialist",
      description: "Diego builds custom AI integrations and MCP servers that connect intelligent agents to real-world tools and data. With deep experience in API development and AI systems, he helps businesses unlock the full potential of AI by bridging the gap between models and their data.",
    },
    related: {
      heading: "Related Articles",
      articles: [
        {
          title: "AI Agents in Production: Building Multi-Agent Systems That Actually Work",
          excerpt: "From single-agent prototypes to production multi-agent architectures \u2014 patterns, pitfalls, and practical strategies.",
          link: "/blog/ai-agents-production-multi-agent-systems",
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
      title: "MCP Explicado: El Protocolo Que Conecta Tus Agentes de IA al Mundo Real",
      description: "Model Context Protocol (MCP) de Anthropic es el est\u00e1ndar USB para la IA. Aprend\u00e9 c\u00f3mo MCP conecta agentes de IA a herramientas, bases de datos, APIs y entornos de desarrollo con una gu\u00eda pr\u00e1ctica.",
      keywords: "model context protocol, MCP, anthropic MCP, agentes ia herramientas, servidor MCP, protocolo integracion ia, claude MCP, conexion herramientas ia, guia desarrollo MCP",
    },
    categories: ["Desarrollo IA", "Desarrollo API"],
    title: "MCP Explicado: El Protocolo Que Conecta Tus Agentes de IA al Mundo Real",
    shareText: "MCP: El Protocolo Que Conecta Agentes de IA al Mundo Real",
    readTime: "11 min de lectura",
    intro: {
      hook: "Tu IA Es Inteligente. Pero No Puede Hacer Nada.",
      p1: "Viste los demos. IA que escribe c\u00f3digo, resume documentos, responde preguntas complejas. Impresionante \u2014 hasta que intent\u00e1s conectarla a la base de datos de tu empresa. O a tus repos de GitHub. O a tu workspace de Slack. O a tu CRM. De repente, el modelo de lenguaje m\u00e1s inteligente del mundo se convierte en un chatbot muy caro que no puede acceder a ninguno de tus datos reales.",
      p2: "Cada integraci\u00f3n es personalizada. Cada conexi\u00f3n es fr\u00e1gil. Cada nueva herramienta significa empezar de cero.",
      stat: { value: "1,000+", label: "integraciones MCP ya disponibles en el ecosistema en 2026" },
      p3: "Este es el problema que Model Context Protocol (MCP) fue construido para resolver. Creado por Anthropic y lanzado como est\u00e1ndar abierto, MCP se est\u00e1 convirtiendo r\u00e1pidamente en el lenguaje universal para c\u00f3mo los agentes de IA hablan con el mundo exterior \u2014 tus herramientas, tus datos, tus APIs, todo tu stack tecnol\u00f3gico.",
      p4: "Pens\u00e1 en \u00e9l como USB para la IA. Un protocolo para conectarlos a todos.",
    },
    problem: {
      heading: "El Problema: Los Modelos de IA Son Brillantes pero Est\u00e1n Aislados",
      p1: "Los modelos de lenguaje grandes son extraordinariamente capaces de entender y generar texto. Pero tienen una limitaci\u00f3n fundamental: existen en un sandbox. No pueden ver tus archivos, consultar tu base de datos, activar tu pipeline de CI/CD, ni publicar un mensaje en tu canal de Slack \u2014 a menos que alguien construya una integraci\u00f3n espec\u00edfica para cada una de esas cosas.",
      stats: [
        { value: "N:N", label: "Cada app de IA necesita c\u00f3digo custom para cada herramienta \u2014 una pesadilla de integraci\u00f3n N\u00d7N" },
        { value: "70%", label: "del tiempo en pilotos de IA empresarial se gasta en integraci\u00f3n, no en inteligencia" },
        { value: "6+", label: "meses promedio para construir conexiones IA-herramienta confiables desde cero" },
      ],
      fragmentation: {
        title: "El Problema de Fragmentaci\u00f3n de Integraciones",
        text: "Antes de MCP, si quer\u00edas que Claude acceda a tu base de datos PostgreSQL, escrib\u00edas c\u00f3digo personalizado. Si tambi\u00e9n quer\u00edas que acceda a GitHub, escrib\u00edas c\u00f3digo personalizado diferente. \u00bfSlack? M\u00e1s c\u00f3digo personalizado. Cada aplicaci\u00f3n de IA ten\u00eda que reinventar la rueda para cada fuente de datos. Es el mismo problema N\u00d7M que USB resolvi\u00f3 para el hardware: antes de USB, cada dispositivo necesitaba su propio cable y driver propietario.",
      },
      context: {
        title: "La Ventana de Contexto No Es Suficiente",
        text: "Algunos desarrolladores intentan resolver el aislamiento metiendo todo en la ventana de contexto \u2014 copiando y pegando esquemas de bases de datos, contenido de archivos y respuestas de APIs en los prompts. Esto es costoso, propenso a errores, alcanza l\u00edmites de tokens r\u00e1pidamente, y no permite que la IA tome acciones. La IA puede leer lo que pegaste, pero no puede consultar datos frescos ni ejecutar comandos.",
      },
      security: {
        title: "La Seguridad y el Control Son una Ocurrencia Tard\u00eda",
        text: "Las integraciones ad-hoc raramente tienen controles de acceso adecuados. \u00bfQui\u00e9n decide qu\u00e9 puede leer la IA? \u00bfPuede modificar datos o solo verlos? \u00bfHay un registro de auditor\u00eda? Con integraciones personalizadas, estas preguntas cr\u00edticas se manejan de forma inconsistente \u2014 o no se manejan en absoluto.",
      },
    },
    whatIsMcp: {
      heading: "\u00bfQu\u00e9 Es MCP? El Est\u00e1ndar USB para la IA",
      p1: "Model Context Protocol (MCP) es un est\u00e1ndar abierto creado por Anthropic que define c\u00f3mo las aplicaciones de IA se comunican con fuentes de datos y herramientas externas. Proporciona una forma universal y estandarizada para que los modelos de IA descubran y usen herramientas, accedan a datos y ejecuten acciones \u2014 sin requerir c\u00f3digo de integraci\u00f3n personalizado para cada conexi\u00f3n.",
      architecture: [
        "MCP Host \u2014 La aplicaci\u00f3n de IA (Claude Desktop, Cursor, tu app personalizada) que quiere acceder a capacidades externas",
        "MCP Client \u2014 El cliente del protocolo integrado en el host que gestiona las conexiones a los servidores",
        "MCP Server \u2014 Un programa liviano que expone capacidades espec\u00edficas (acceso a bases de datos, llamadas a APIs, operaciones de archivos) a trav\u00e9s del protocolo estandarizado",
      ],
      p2: "Cuando Claude Desktop se conecta a un servidor MCP para PostgreSQL, no necesita saber nada sobre drivers SQL o connection pooling. El servidor MCP maneja todo eso y expone una interfaz limpia y estandarizada. La IA simplemente dice \u201cconsult\u00e1 esta tabla\u201d y recibe resultados estructurados.",
      callout: "MCP es de c\u00f3digo abierto y opera a nivel de protocolo. No est\u00e1 bloqueado a Anthropic o Claude. Cualquier modelo de IA, cualquier aplicaci\u00f3n, cualquier herramienta puede implementar MCP. Esto es lo que lo convierte en un verdadero est\u00e1ndar en vez de una funcionalidad propietaria.",
      howTitle: "C\u00f3mo Funciona la Conexi\u00f3n",
      howSteps: [
        "El host de IA descubre los servidores MCP disponibles y sus capacidades a trav\u00e9s de un handshake estandarizado",
        "El servidor MCP anuncia lo que puede hacer: qu\u00e9 recursos expone, qu\u00e9 herramientas ofrece, qu\u00e9 plantillas de prompts proporciona",
        "El modelo de IA ve estas capacidades como acciones disponibles que puede tomar durante una conversaci\u00f3n",
        "Cuando el modelo decide usar una herramienta, la solicitud fluye a trav\u00e9s del cliente MCP al servidor apropiado, que la ejecuta y devuelve resultados",
      ],
      howConclusion: "Todo el flujo est\u00e1 estandarizado. Constru\u00ed un servidor MCP para tu herramienta, y cada aplicaci\u00f3n de IA compatible con MCP puede usarlo inmediatamente.",
    },
    primitives: {
      heading: "Las 3 Primitivas: Resources, Tools y Prompts",
      p1: "MCP organiza todo lo que una IA podr\u00eda necesitar en tres primitivas centrales. Entender estas es clave para entender el protocolo.",
      items: [
        {
          title: "1. Resources \u2014 Datos que la IA Puede Leer",
          text: "Los Resources son fuentes de datos a las que la IA puede acceder: archivos, registros de bases de datos, respuestas de APIs, m\u00e9tricas de sistemas en vivo, salidas de logs. Son de solo lectura por defecto e identificados por URIs. Pens\u00e1 en ellos como los \u201csustantivos\u201d \u2014 las cosas que la IA puede ver y referenciar.",
          examples: "file:///project/src/index.ts, postgres://db/users/schema, slack://channels/general/messages",
        },
        {
          title: "2. Tools \u2014 Acciones que la IA Puede Ejecutar",
          text: "Los Tools son funciones que la IA puede ejecutar: correr una consulta de base de datos, crear un issue en GitHub, enviar un mensaje en Slack, desplegar un servicio. Son los \u201cverbos\u201d \u2014 las cosas que la IA puede hacer. Cada tool tiene un esquema de entrada definido y devuelve una salida estructurada.",
          examples: "query_database, create_github_issue, send_slack_message, run_terminal_command",
        },
        {
          title: "3. Prompts \u2014 Plantillas de Interacci\u00f3n Reutilizables",
          text: "Los Prompts son plantillas predefinidas que ayudan a la IA a interactuar con herramientas o resources espec\u00edficos de forma efectiva. Codifican mejores pr\u00e1cticas y conocimiento del dominio en patrones reutilizables. Pens\u00e1 en ellos como \u201crecetas\u201d que le dicen a la IA la mejor manera de realizar tareas comunes con herramientas espec\u00edficas.",
          examples: "analyze-database-performance, review-pull-request, debug-error-logs",
        },
      ],
      callout: "Estas tres primitivas cubren casi toda interacci\u00f3n entre una IA y sistemas externos. Resources para leer, Tools para actuar, Prompts para guiar. Esta simplicidad es deliberada \u2014 un conjunto peque\u00f1o de bloques bien definidos es mucho m\u00e1s poderoso que una API extensa y compleja.",
    },
    comparison: {
      heading: "MCP vs Alternativas: Cu\u00e1ndo Usar Qu\u00e9",
      headers: ["Aspecto", "MCP (Anthropic)", "ACP (IBM)", "A2A (Google)"],
      rows: [
        ["Prop\u00f3sito Principal", "Conectar IA a herramientas y fuentes de datos", "Comunicaci\u00f3n y orquestaci\u00f3n agente-a-agente", "Descubrimiento y colaboraci\u00f3n agente-a-agente"],
        ["Arquitectura", "Cliente-servidor (app IA \u2194 servidor de herramientas)", "Mesh agente-a-agente", "Agente-a-agente v\u00eda Agent Cards"],
        ["Fortaleza Clave", "Acceso universal a herramientas/datos para cualquier IA", "Flujos de trabajo multi-agente empresariales", "Interoperabilidad de agentes cross-platform"],
        ["Ideal Para", "Dar a la IA acceso a bases de datos, APIs, archivos, herramientas de desarrollo", "Orquestar m\u00faltiples agentes de IA en empresas", "Permitir colaboraci\u00f3n entre agentes de diferentes proveedores"],
        ["Madurez (2026)", "Listo para producci\u00f3n, 1000+ integraciones", "Adopci\u00f3n temprana, ecosistema IBM", "Adopci\u00f3n creciente, ecosistema Google"],
        ["Est\u00e1ndar Abierto", "S\u00ed (c\u00f3digo abierto)", "S\u00ed (Linux Foundation)", "S\u00ed (especificaci\u00f3n abierta)"],
      ],
      callout: "Importante: Estos protocolos son complementarios, no competidores. MCP conecta IA a herramientas. ACP y A2A conectan agentes de IA entre s\u00ed. Un sistema de IA maduro podr\u00eda usar los tres: MCP para acceso a herramientas, A2A para comunicaci\u00f3n de agentes cross-vendor, y ACP para orquestaci\u00f3n de agentes empresariales.",
    },
    examples: {
      heading: "MCP en Acci\u00f3n: 5 Ejemplos Pr\u00e1cticos",
      items: [
        {
          title: "1. Acceso a Bases de Datos \u2014 IA que Consulta Tus Datos Directamente",
          text: "Un servidor MCP para PostgreSQL permite que tu agente de IA explore esquemas de bases de datos, ejecute consultas de lectura y analice resultados \u2014 todo a trav\u00e9s de lenguaje natural. Preguntale a Claude \u201c\u00bfCu\u00e1les fueron nuestros top 10 clientes por ingresos el \u00faltimo trimestre?\u201d y \u00e9l escribe el SQL, lo ejecuta a trav\u00e9s del servidor MCP y devuelve resultados formateados. Sin copiar y pegar datos en prompts.",
        },
        {
          title: "2. Integraci\u00f3n con GitHub \u2014 Flujos de Trabajo de C\u00f3digo con IA",
          text: "El servidor MCP de GitHub le da a los agentes de IA acceso a repositorios, pull requests, issues y c\u00f3digo. Claude puede revisar un PR, sugerir cambios, crear issues por bugs que encuentra, e incluso pushear commits \u2014 todo dentro de una conversaci\u00f3n. Los desarrolladores usan esto para automatizar code reviews, clasificar issues y gestionar flujos de release.",
        },
        {
          title: "3. Slack \u2014 IA que Participa en la Comunicaci\u00f3n de tu Equipo",
          text: "Con el servidor MCP de Slack, un agente de IA puede leer historiales de canales, resumir conversaciones, responder preguntas y publicar actualizaciones. Imagin\u00e1 una IA que monitorea tu canal #soporte, categoriza issues autom\u00e1ticamente, redacta respuestas y escala problemas cr\u00edticos \u2014 todo en tiempo real.",
        },
        {
          title: "4. Sistema de Archivos \u2014 IA que Trabaja con Tus Archivos Locales",
          text: "El servidor MCP de filesystem permite que la IA lea, busque y (con permiso) modifique archivos en tu m\u00e1quina. Esto es lo que potencia herramientas como Claude Code y Cursor \u2014 la IA puede navegar tu codebase, entender la estructura del proyecto y hacer ediciones dirigidas en m\u00faltiples archivos.",
        },
        {
          title: "5. APIs Personalizadas \u2014 IA Conectada a Tu L\u00f3gica de Negocio",
          text: "Cualquier API REST o GraphQL puede ser envuelta en un servidor MCP. Tu CRM interno, sistema de inventario, dashboard de anal\u00edticas, procesador de pagos \u2014 todos se vuelven accesibles para la IA a trav\u00e9s de una interfaz estandarizada. Aqu\u00ed es donde MCP se vuelve transformador para los negocios: tu asistente de IA no est\u00e1 limitado a conocimiento gen\u00e9rico \u2014 tiene acceso a los datos y operaciones espec\u00edficos de tu negocio.",
        },
      ],
    },
    building: {
      heading: "Construyendo Tu Primer Servidor MCP: Una Gu\u00eda Pr\u00e1ctica",
      p1: "Construir un servidor MCP es sorprendentemente sencillo. El SDK oficial maneja los detalles del protocolo, as\u00ed que pod\u00e9s enfocarte en lo que tu servidor realmente hace. Ac\u00e1 va el enfoque general:",
      steps: [
        {
          title: "Paso 1: Eleg\u00ed Tu Stack",
          text: "Los servidores MCP se pueden construir en TypeScript/Node.js (el m\u00e1s popular), Python, Go, Rust, o cualquier lenguaje que pueda manejar JSON-RPC sobre stdio o HTTP. Los SDKs oficiales de Anthropic para TypeScript y Python son los m\u00e1s maduros.",
        },
        {
          title: "Paso 2: Defin\u00ed Tus Capacidades",
          text: "Decid\u00ed qu\u00e9 resources, tools y prompts va a exponer tu servidor. Empez\u00e1 chico \u2014 un servidor con 2-3 herramientas bien definidas es m\u00e1s \u00fatil que uno con 20 mal definidas. Cada herramienta necesita un nombre claro, descripci\u00f3n y esquema de entrada.",
        },
        {
          title: "Paso 3: Implement\u00e1 el Servidor",
          text: "Us\u00e1 el SDK de MCP para crear una instancia del servidor, registrar tus herramientas con sus handlers, e iniciar el transporte (stdio para local, SSE/HTTP para remoto). El SDK maneja la negociaci\u00f3n del protocolo, el framing de mensajes y el manejo de errores.",
        },
        {
          title: "Paso 4: Teste\u00e1 con un Cliente MCP",
          text: "Conect\u00e1 tu servidor a Claude Desktop, Cursor o la herramienta MCP Inspector para testear. Verific\u00e1 que las herramientas aparezcan correctamente, los inputs se validen y las respuestas est\u00e9n formateadas correctamente. Probe\u00e1 casos de error \u2014 \u00bfqu\u00e9 pasa cuando la base de datos est\u00e1 ca\u00edda o la API devuelve un error?",
        },
        {
          title: "Paso 5: Despleg\u00e1 y Distribu\u00ed",
          text: "Los servidores locales corren junto a la aplicaci\u00f3n de IA v\u00eda stdio. Los servidores remotos pueden desplegarse como servicios HTTP con transporte SSE, habilitando servidores MCP en la nube a los que m\u00faltiples clientes pueden conectarse. Empaqueta tu servidor para npm o PyPI para que otros puedan usarlo.",
        },
      ],
      callout: "Tip pro: Empez\u00e1 con el MCP Inspector (npx @modelcontextprotocol/inspector) para depurar y testear tu servidor interactivamente antes de conectarlo a una aplicaci\u00f3n de IA. Te muestra exactamente lo que la IA ve.",
    },
    ecosystem: {
      heading: "El Ecosistema MCP: Qui\u00e9n Lo Soporta",
      p1: "La adopci\u00f3n de MCP ha explotado desde su lanzamiento. Ac\u00e1 est\u00e1n los principales actores:",
      items: [
        {
          title: "Claude Desktop y Claude Code",
          text: "Las propias aplicaciones de Anthropic fueron los primeros hosts MCP. Claude Desktop soporta conectarse a m\u00faltiples servidores MCP simult\u00e1neamente, d\u00e1ndole a Claude acceso a tus archivos locales, bases de datos y herramientas. Claude Code usa MCP para potenciar sus capacidades de desarrollo.",
        },
        {
          title: "Cursor",
          text: "El editor de c\u00f3digo con IA tiene una integraci\u00f3n profunda con MCP. Los desarrolladores pueden agregar servidores MCP para darle a la IA de Cursor acceso a documentaci\u00f3n personalizada, APIs internas y herramientas espec\u00edficas del proyecto \u2014 haci\u00e9ndolo significativamente m\u00e1s \u00fatil para desarrollo empresarial.",
        },
        {
          title: "VS Code (GitHub Copilot)",
          text: "Microsoft agreg\u00f3 soporte MCP a VS Code a trav\u00e9s del modo agente de GitHub Copilot. Esto lleva MCP al editor de c\u00f3digo m\u00e1s popular del mundo, expandiendo dram\u00e1ticamente el alcance del protocolo entre desarrolladores.",
        },
        {
          title: "Windsurf, Zed, Cline y Otros",
          text: "La lista de editores y herramientas de IA compatibles con MCP crece r\u00e1pidamente. Windsurf, Zed, Cline, Continue y muchos m\u00e1s han agregado soporte MCP \u2014 creando un efecto de red donde cada nuevo servidor MCP funciona instant\u00e1neamente con docenas de aplicaciones de IA.",
        },
        {
          title: "Plataformas Empresariales",
          text: "Empresas como Block, Apollo, Replit y Sourcegraph han construido servidores MCP para sus plataformas. La adopci\u00f3n empresarial se est\u00e1 acelerando a medida que las empresas se dan cuenta de que MCP elimina la necesidad de construir integraciones de IA personalizadas para cada herramienta en su stack.",
        },
      ],
      stat: { value: "Decenas", label: "de aplicaciones de IA ahora soportan MCP como m\u00e9todo de integraci\u00f3n de primera clase" },
    },
    cta: {
      heading: "\u00bfListo para Conectar Tu IA al Mundo Real?",
      p1: "MCP no es una tecnolog\u00eda del futuro \u2014 est\u00e1 listo para producci\u00f3n hoy. Los negocios que lo adoptan ahora le est\u00e1n dando superpoderes a sus asistentes de IA: acceso a datos reales, la capacidad de tomar acciones reales e integraci\u00f3n fluida con herramientas y flujos de trabajo existentes.",
      p2: "La pregunta no es si tu IA necesita acceso a herramientas \u2014 es qu\u00e9 tan r\u00e1pido pod\u00e9s implementarlo.",
      boxTitle: "\u00bfNecesit\u00e1s Integraciones MCP Personalizadas para Tu Negocio?",
      boxText: "Construyo servidores MCP personalizados que conectan tus agentes de IA a tus bases de datos, APIs y herramientas internas espec\u00edficas. Ya sea que necesites una sola integraci\u00f3n o un flujo de trabajo completo con IA, hagamos que tu IA sea realmente \u00fatil.",
      primaryBtn: "Iniciar una Conversaci\u00f3n",
      secondaryBtn: "Ver Mis Servicios",
    },
    authorBio: {
      specialization: "Desarrollador Full-Stack y Especialista en Integraci\u00f3n de IA",
      description: "Diego construye integraciones de IA personalizadas y servidores MCP que conectan agentes inteligentes con herramientas y datos del mundo real. Con experiencia profunda en desarrollo de APIs y sistemas de IA, ayuda a negocios a desbloquear el potencial completo de la IA cerrando la brecha entre los modelos y sus datos.",
    },
    related: {
      heading: "Art\u00edculos Relacionados",
      articles: [
        {
          title: "Agentes de IA en Producci\u00f3n: Construyendo Sistemas Multi-Agente que Realmente Funcionan",
          excerpt: "De prototipos de agente \u00fanico a arquitecturas multi-agente en producci\u00f3n \u2014 patrones, trampas y estrategias pr\u00e1cticas.",
          link: "/blog/ai-agents-production-multi-agent-systems",
        },
        {
          title: "GEO: Por Qu\u00e9 la Optimizaci\u00f3n para Motores Generativos Es el Futuro de la Visibilidad Online",
          excerpt: "El SEO tradicional ya no es suficiente. Aprend\u00e9 c\u00f3mo GEO ayuda a tu negocio a ser citado por buscadores IA.",
          link: "/blog/geo-generative-engine-optimization-guide",
        },
      ],
    },
  },
};

const MCPArticle = () => {
  const { t } = useTranslation(["blog", "common"]);
  const { locale } = useRouter();
  const dateLocale = locale === "es" ? "es-ES" : "en-US";
  const c = content[locale] || content.en;

  const publishDate = "2026-02-21";
  const articleUrl = "https://www.diego-rodriguez.work/blog/mcp-model-context-protocol-ai-agents-guide";

  return (
    <>
      <SEO
        title={c.seo.title}
        description={c.seo.description}
        keywords={c.seo.keywords}
        image="/work/mcp-protocol.jpg"
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
                src="/work/mcp-protocol.jpg"
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
                {[c.problem.fragmentation, c.problem.context, c.problem.security].map((sub, i) => (
                  <div key={i} className="mb-6">
                    <h3 className="text-xl font-semibold text-white mb-3">{sub.title}</h3>
                    <p>{sub.text}</p>
                  </div>
                ))}
              </section>

              {/* What Is MCP */}
              <section>
                <h2 className="text-3xl font-bold text-white mb-6">{c.whatIsMcp.heading}</h2>
                <p className="mb-6 text-lg">{c.whatIsMcp.p1}</p>

                <div className="space-y-3 mb-6">
                  {c.whatIsMcp.architecture.map((item, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 rounded-lg p-4">
                      <p className="text-white font-medium">{item}</p>
                    </div>
                  ))}
                </div>

                <p className="mb-6">{c.whatIsMcp.p2}</p>

                <div className="border-l-4 border-blue-500 bg-blue-500/10 p-6 rounded-r-lg mb-8">
                  <p className="text-white/90">{c.whatIsMcp.callout}</p>
                </div>

                <h3 className="text-2xl font-semibold text-white mb-4">{c.whatIsMcp.howTitle}</h3>
                <div className="space-y-4 mb-6">
                  {c.whatIsMcp.howSteps.map((step, i) => (
                    <div key={i} className="flex gap-3">
                      <span className="text-accent font-bold text-lg mt-0.5">{i + 1}.</span>
                      <p className="text-white/80">{step}</p>
                    </div>
                  ))}
                </div>
                <p className="text-white/70 italic">{c.whatIsMcp.howConclusion}</p>
              </section>

              {/* The 3 Primitives */}
              <section>
                <h2 className="text-3xl font-bold text-white mb-6">{c.primitives.heading}</h2>
                <p className="mb-8 text-lg">{c.primitives.p1}</p>

                <div className="space-y-6">
                  {c.primitives.items.map((item, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6">
                      <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                      <p className="text-white/80 mb-3">{item.text}</p>
                      <div className="bg-black/30 rounded-lg p-3">
                        <code className="text-accent text-sm">{item.examples}</code>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-l-4 border-blue-500 bg-blue-500/10 p-6 rounded-r-lg mt-8">
                  <p className="text-white/90">{c.primitives.callout}</p>
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

              {/* Real-World Examples */}
              <section>
                <h2 className="text-3xl font-bold text-white mb-8">{c.examples.heading}</h2>
                <div className="space-y-6">
                  {c.examples.items.map((item, i) => (
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

              {/* Building Your First MCP Server */}
              <section>
                <h2 className="text-3xl font-bold text-white mb-6">{c.building.heading}</h2>
                <p className="mb-8 text-lg">{c.building.p1}</p>

                <div className="space-y-8">
                  {c.building.steps.map((item, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6">
                      <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                      <p className="text-white/80">{item.text}</p>
                    </div>
                  ))}
                </div>

                <div className="border-l-4 border-green-500 bg-green-500/10 p-6 rounded-r-lg mt-8">
                  <p className="text-white/90">{c.building.callout}</p>
                </div>
              </section>

              {/* The MCP Ecosystem */}
              <section>
                <h2 className="text-3xl font-bold text-white mb-6">{c.ecosystem.heading}</h2>
                <p className="mb-8 text-lg">{c.ecosystem.p1}</p>

                <div className="space-y-6 mb-8">
                  {c.ecosystem.items.map((item, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6">
                      <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                      <p className="text-white/80">{item.text}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-gradient-to-r from-accent/20 to-accent/5 border border-accent/30 rounded-xl p-8 text-center">
                  <div className="text-4xl font-bold text-accent mb-2">{c.ecosystem.stat.value}</div>
                  <div className="text-white/70">{c.ecosystem.stat.label}</div>
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

export default MCPArticle;
