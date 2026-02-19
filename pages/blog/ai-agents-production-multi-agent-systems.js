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
      title: "AI Agents in Production: How to Build Multi-Agent Systems That Actually Work",
      description: "Only 11% of companies have AI agents in production. Learn how to bridge the gap between demo and deployment with practical guidance on building production-ready multi-agent systems, MCP, A2A protocols, and real-world architectures.",
      keywords: "ai agents production, multi agent systems, agentic ai, MCP protocol, ai agents architecture, production ready ai agents, autonomous ai systems, ai agent development",
    },
    categories: ["AI Development", "Consulting"],
    title: "AI Agents in Production: How to Build Multi-Agent Systems That Actually Work",
    shareText: "AI Agents in Production: Building Multi-Agent Systems That Work",
    readTime: "12 min read",
    intro: {
      hook: "Everyone Has an AI Agent Demo. Almost Nobody Has One in Production.",
      p1: "The gap between an impressive AI agent demo and a reliable production system is enormous. According to recent industry surveys, 38% of companies are actively piloting AI agents \u2014 but only 11% have actually deployed them in production. That means roughly 70% of pilot projects are stalling somewhere between \u201Clook what it can do\u201D and \u201Cwe trust it to run our business.\u201D",
      p2: "The demo-to-production gap is where AI agents go to die.",
      stat: { value: "11%", label: "of companies have AI agents running in production despite 38% actively piloting them" },
      p3: "The problem isn\u2019t the technology. Large language models are more capable than ever. The problem is engineering: most teams treat agent development like prompt engineering when it\u2019s actually systems engineering. Building an agent that works in a demo is easy. Building one that works at 3 AM when your on-call engineer is asleep \u2014 that\u2019s the real challenge.",
      p4: "This guide covers what it actually takes to build AI agents that survive contact with production.",
    },
    whatAreAgents: {
      heading: "What AI Agents Actually Are (And Aren\u2019t)",
      p1: "An AI agent is an autonomous system that can reason about a goal, create a plan, execute actions using tools, and adapt based on results. It\u2019s not just a chatbot with a system prompt. It\u2019s not a simple API chain. It\u2019s a system that makes decisions.",
      comparison: [
        "Chatbot = responds to user input with pre-defined or generated text",
        "AI Pipeline = executes a fixed sequence of LLM calls and transformations",
        "AI Agent = autonomously reasons, plans, uses tools, and adapts to achieve a goal",
      ],
      p2: "The key distinction is autonomy. A chatbot waits for input. A pipeline follows a script. An agent decides what to do next based on what it observes. This autonomy is what makes agents powerful \u2014 and what makes them dangerous in production if not properly constrained.",
      callout: "The most common mistake teams make is calling everything an \u201Cagent\u201D when most of what they\u2019ve built are sophisticated pipelines. True agents have a reasoning loop: Observe \u2192 Think \u2192 Act \u2192 Observe. If your system doesn\u2019t have this loop, it\u2019s not an agent \u2014 and that\u2019s often fine. Not every problem needs an agent.",
      howTitle: "The Agent Reasoning Loop",
      howSteps: [
        "Observe: Gather context from the environment, user input, and tool outputs",
        "Think: Reason about the current state and decide what action to take next",
        "Act: Execute the chosen action \u2014 call an API, query a database, write code, send a message",
        "Evaluate: Assess the result, determine if the goal is met or if another iteration is needed",
      ],
      howConclusion: "This loop runs continuously until the agent achieves its goal, hits a limit, or encounters an unrecoverable error. Production agents need guardrails at every stage of this loop.",
    },
    singleVsMulti: {
      heading: "Single Agent vs Multi-Agent: When to Use What",
      p1: "Not every problem needs a fleet of agents. In fact, one of the biggest mistakes teams make is over-engineering with multi-agent architectures when a single agent (or even a simple pipeline) would suffice.",
      stats: [
        { value: "1 Agent", label: "handles 80% of real-world use cases effectively" },
        { value: "2-3 Agents", label: "needed for complex workflows with distinct roles" },
        { value: "4+ Agents", label: "only justified for enterprise orchestration scenarios" },
      ],
      single: {
        title: "When a Single Agent Is Enough",
        text: "Use a single agent when: the task has a clear scope (customer support, code review, data analysis), the agent needs access to 5-10 tools maximum, the reasoning chain is linear or has simple branching, and latency matters (multi-agent coordination adds overhead). Most production agents today are single agents with well-defined tool sets.",
      },
      multi: {
        title: "When You Need Multi-Agent Systems",
        text: "Use multiple agents when: different parts of the task require fundamentally different expertise or models, you need separation of concerns for safety (e.g., one agent proposes, another validates), the workflow involves parallel independent subtasks, or you need different trust levels for different operations (read-only vs write agents).",
      },
      patterns: {
        title: "Common Multi-Agent Patterns",
        text: "The three dominant patterns in production are: Orchestrator-Worker (a coordinator agent delegates to specialist agents), Pipeline (agents pass results sequentially like an assembly line), and Debate/Verification (multiple agents propose and critique solutions to improve quality). Choose based on your specific workflow, not on what looks impressive in a blog post.",
      },
    },
    pillars: {
      heading: "The 5 Pillars of Production-Ready Agents",
      items: [
        {
          title: "1. Reliability: Making Agents Predictable in an Unpredictable World",
          text: "LLMs are non-deterministic by nature. Production agents need deterministic behavior around that non-determinism. This means implementing structured outputs (force JSON schema compliance), retry logic with exponential backoff, idempotent tool calls, state checkpointing so agents can resume after failures, and timeout boundaries for every LLM call and tool execution. If your agent can\u2019t recover from a failed API call gracefully, it\u2019s not production-ready.",
        },
        {
          title: "2. Observability: You Can\u2019t Fix What You Can\u2019t See",
          text: "Agent systems are notoriously difficult to debug. A single user request might trigger 15 LLM calls, 8 tool executions, and 3 retry loops. Without proper observability, you\u2019re flying blind. Implement trace-level logging for every reasoning step, track token usage and latency per call, log tool inputs and outputs (redacting sensitive data), build dashboards that show agent decision paths, and set up alerts for anomalous behavior (loops, excessive token usage, repeated errors).",
        },
        {
          title: "3. Guardrails: Constraining Autonomy Without Killing Usefulness",
          text: "The more autonomous an agent is, the more damage it can do. Production agents need layered guardrails: input validation (reject malicious or out-of-scope requests), output filtering (block harmful, incorrect, or off-brand responses), action limits (cap the number of tool calls per request), scope boundaries (restrict which tools and data an agent can access), and human-in-the-loop gates for high-stakes decisions (financial transactions, data deletion, external communications).",
        },
        {
          title: "4. Fallbacks: Graceful Degradation Over Catastrophic Failure",
          text: "Production agents must fail gracefully. When the primary LLM is down, fall back to a secondary model. When a tool times out, return a partial result with context. When the agent enters a reasoning loop, break out after N iterations and escalate. When confidence is low, hand off to a human operator. The goal is never \u201Cperfect or nothing\u201D \u2014 it\u2019s \u201Cbest possible outcome given current constraints.\u201D",
        },
        {
          title: "5. Cost Control: Agents Can Burn Money Fast",
          text: "An uncontrolled agent can rack up thousands of dollars in API costs in minutes. Production deployments need per-request token budgets, model routing (use cheaper models for simple tasks, expensive models for complex reasoning), caching for repeated tool calls and common queries, circuit breakers that stop agents if costs exceed thresholds, and regular analysis of cost-per-task to identify optimization opportunities. Teams that skip cost controls in production consistently report 3-5x higher costs than projected.",
        },
      ],
    },
    protocols: {
      heading: "MCP and A2A: The Protocols Connecting Agents to the Real World",
      headers: ["Aspect", "MCP (Model Context Protocol)", "A2A (Agent-to-Agent)"],
      rows: [
        ["Purpose", "Connects agents to external tools and data sources", "Enables communication between different agents"],
        ["Analogy", "USB-C for AI \u2014 universal tool connectivity", "HTTP for agents \u2014 standardized inter-agent communication"],
        ["Developed By", "Anthropic (open standard)", "Google DeepMind (open standard)"],
        ["Key Benefit", "One integration standard instead of custom connectors per tool", "Agents from different vendors/frameworks can collaborate"],
        ["Production Use", "Database access, API calls, file operations, web browsing", "Cross-team agent orchestration, multi-vendor agent ecosystems"],
        ["Maturity", "Rapidly adopted \u2014 supported by major AI frameworks", "Emerging \u2014 gaining traction in enterprise environments"],
      ],
      callout: "MCP and A2A are complementary, not competing. MCP handles the agent-to-tool connection (vertical integration), while A2A handles agent-to-agent communication (horizontal integration). Production systems increasingly use both: MCP to give each agent its tool capabilities, and A2A to let agents coordinate across organizational boundaries.",
      p1: "MCP (Model Context Protocol) is rapidly becoming the standard for how agents interact with external tools. Instead of writing custom integration code for every API, database, and service, you implement a single MCP server that exposes your tools in a standardized format. Any MCP-compatible agent can then discover and use those tools.",
      p2: "A2A (Agent-to-Agent protocol) solves the problem of agent interoperability. When your customer service agent needs to hand off to a billing agent built by a different team (or even a different company), A2A provides the standard communication layer. It handles capability discovery, task delegation, and result passing between agents that may have no knowledge of each other\u2019s internals.",
    },
    useCases: {
      heading: "Real-World Use Cases: Where Agents Are Actually Working",
      items: [
        {
          title: "Customer Service Automation",
          text: "Multi-agent systems where a triage agent classifies incoming requests, specialist agents handle specific domains (billing, technical support, returns), and a quality agent reviews responses before sending. Companies report 40-60% reduction in human ticket volume with properly implemented agent systems, while maintaining or improving customer satisfaction scores.",
          points: [
            "Triage agent routes to the right specialist in under 2 seconds",
            "Specialist agents have access to CRM, order history, and knowledge bases via MCP",
            "Quality agent catches errors, policy violations, and tone issues before responses go out",
            "Human escalation triggers automatically for complex or sensitive cases",
          ],
        },
        {
          title: "Automated Data Analysis",
          text: "Agents that can query databases, run statistical analysis, generate visualizations, and produce natural language reports. The key is giving the agent well-scoped tools (read-only database access, approved visualization libraries) and clear output templates.",
          points: [
            "Analyst agent receives natural language questions and translates to SQL",
            "Validation agent checks queries for correctness and performance before execution",
            "Reporting agent transforms raw results into executive-ready summaries",
            "Particularly effective for recurring reports that previously required analyst time",
          ],
        },
        {
          title: "Code Review and Development",
          text: "AI agents integrated into the development workflow for automated code review, bug detection, and even code generation. Production deployments typically use a multi-agent setup: one agent for security analysis, one for performance review, one for style/best practices, with an orchestrator that synthesizes findings.",
          points: [
            "Security agent scans for vulnerabilities, injection risks, and dependency issues",
            "Performance agent identifies bottlenecks, memory leaks, and optimization opportunities",
            "Style agent ensures consistency with team coding standards and best practices",
            "Results aggregated into a single, prioritized review that developers actually read",
          ],
        },
        {
          title: "Trading and Financial Analysis",
          text: "Agents that monitor market data, analyze patterns, execute trades, and manage risk. This is one of the most demanding use cases because of the real-time requirements, financial stakes, and regulatory constraints. Successful deployments always include a separate risk management agent with veto power over trading agents.",
          points: [
            "Market monitoring agent processes real-time data feeds and detects signals",
            "Analysis agent evaluates opportunities against historical patterns and current conditions",
            "Execution agent places trades with strict position sizing and risk limits",
            "Risk management agent can override any trade and trigger portfolio-wide stop-losses",
          ],
        },
      ],
    },
    techStack: {
      heading: "Building Your First Production Agent: Tech Stack Recommendations",
      p1: "You don\u2019t need to build everything from scratch. The ecosystem has matured significantly. Here\u2019s a practical tech stack for production agent development:",
      items: [
        {
          title: "Agent Frameworks",
          text: "LangGraph for complex multi-agent workflows with state management. CrewAI for quick multi-agent prototyping. Anthropic\u2019s Claude Agent SDK or OpenAI\u2019s Agents SDK for single-agent systems. Vercel AI SDK for web-integrated agents. Choose based on your complexity needs \u2014 don\u2019t use a multi-agent framework for a single-agent problem.",
        },
        {
          title: "LLM Selection",
          text: "Claude 3.5/4 Opus for complex reasoning tasks. GPT-4o for general-purpose agents with vision. Claude 3.5 Haiku or GPT-4o-mini for high-volume, lower-complexity tasks. Consider running multiple models: a cheap fast model for routing and a powerful model for complex reasoning. This \u201Cmodel router\u201D pattern can cut costs by 60-70%.",
        },
        {
          title: "Tool Integration",
          text: "MCP servers for standardized tool access. Build your own MCP servers for internal APIs and databases. Use community MCP servers for common integrations (GitHub, Slack, databases). Implement proper authentication, rate limiting, and audit logging on every tool endpoint.",
        },
        {
          title: "Observability and Monitoring",
          text: "LangSmith or LangFuse for agent trace visualization. OpenTelemetry for distributed tracing across agent systems. Custom dashboards in Grafana or Datadog for business metrics. Set up PagerDuty alerts for agent failures, cost spikes, and quality degradation.",
        },
        {
          title: "Guardrails and Safety",
          text: "Guardrails AI or custom validation layers for input/output filtering. Constitutional AI prompting for built-in safety. Separate validation agents for high-stakes outputs. Always implement human-in-the-loop for actions that can\u2019t be undone (financial transactions, external communications, data modifications).",
        },
      ],
    },
    cta: {
      heading: "Ready to Move Your AI Agents From Demo to Production?",
      p1: "Building production-ready AI agents requires more than prompt engineering \u2014 it requires systems thinking, careful architecture, and battle-tested patterns. The teams that succeed are the ones that treat agent development as software engineering, not AI magic.",
      p2: "Whether you\u2019re stuck in pilot purgatory, fighting reliability issues, or starting from scratch and want to do it right the first time \u2014 the path to production is shorter than you think with the right guidance.",
      boxTitle: "Need Help Building Production AI Agents?",
      boxText: "I design and build custom AI agent systems that actually work in production \u2014 from architecture design and multi-agent orchestration to MCP integration and deployment. Let\u2019s turn your agent prototype into a production-grade system.",
      primaryBtn: "Start a Conversation",
      secondaryBtn: "View My Services",
    },
    authorBio: {
      specialization: "Full-Stack Developer & AI Systems Engineer",
      description: "Diego builds production AI agent systems and helps teams bridge the gap between impressive demos and reliable deployments. With hands-on experience in multi-agent architectures, MCP integrations, and LLM-powered automation, he helps businesses turn AI prototypes into production-grade systems.",
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
          title: "Vibe Coding to Production: The Complete Guide to Shipping AI-Built Projects",
          excerpt: "How to take AI-generated code from prototype to production-ready with proven engineering practices.",
          link: "/blog/vibe-coding-ai-projects-production-guide",
        },
      ],
    },
  },
  es: {
    seo: {
      title: "Agentes IA en Producci\u00F3n: C\u00F3mo Construir Sistemas Multi-Agente Que Realmente Funcionen",
      description: "Solo el 11% de las empresas tienen agentes IA en producci\u00F3n. Aprende c\u00F3mo cerrar la brecha entre demo y despliegue con gu\u00EDa pr\u00E1ctica sobre sistemas multi-agente, protocolos MCP, A2A y arquitecturas del mundo real.",
      keywords: "agentes ia produccion, sistemas multi agente, ia agentica, protocolo MCP, arquitectura agentes ia, agentes ia produccion, sistemas ia autonomos, desarrollo agentes ia",
    },
    categories: ["Desarrollo IA", "Consultor\u00EDa"],
    title: "Agentes IA en Producci\u00F3n: C\u00F3mo Construir Sistemas Multi-Agente Que Realmente Funcionen",
    shareText: "Agentes IA en Producci\u00F3n: Sistemas Multi-Agente Que Funcionan",
    readTime: "12 min de lectura",
    intro: {
      hook: "Todos Tienen un Demo de Agente IA. Casi Nadie Lo Tiene en Producci\u00F3n.",
      p1: "La brecha entre un demo impresionante de agente IA y un sistema confiable en producci\u00F3n es enorme. Seg\u00FAn encuestas recientes de la industria, el 38% de las empresas est\u00E1n piloteando activamente agentes IA \u2014 pero solo el 11% los ha desplegado en producci\u00F3n. Eso significa que aproximadamente el 70% de los proyectos piloto se estancan en alg\u00FAn punto entre \u201Cmir\u00E1 lo que puede hacer\u201D y \u201Cconfiamos en \u00E9l para manejar nuestro negocio.\u201D",
      p2: "La brecha entre demo y producci\u00F3n es donde los agentes IA van a morir.",
      stat: { value: "11%", label: "de las empresas tienen agentes IA en producci\u00F3n a pesar de que el 38% los est\u00E1 piloteando" },
      p3: "El problema no es la tecnolog\u00EDa. Los modelos de lenguaje son m\u00E1s capaces que nunca. El problema es la ingenier\u00EDa: la mayor\u00EDa de los equipos tratan el desarrollo de agentes como ingenier\u00EDa de prompts cuando en realidad es ingenier\u00EDa de sistemas. Construir un agente que funcione en un demo es f\u00E1cil. Construir uno que funcione a las 3 AM cuando tu ingeniero de guardia est\u00E1 dormido \u2014 ese es el verdadero desaf\u00EDo.",
      p4: "Esta gu\u00EDa cubre lo que realmente se necesita para construir agentes IA que sobrevivan el contacto con producci\u00F3n.",
    },
    whatAreAgents: {
      heading: "Qu\u00E9 Son Realmente los Agentes IA (Y Qu\u00E9 No Son)",
      p1: "Un agente IA es un sistema aut\u00F3nomo que puede razonar sobre un objetivo, crear un plan, ejecutar acciones usando herramientas y adaptarse en base a los resultados. No es solo un chatbot con un prompt de sistema. No es una cadena simple de APIs. Es un sistema que toma decisiones.",
      comparison: [
        "Chatbot = responde a la entrada del usuario con texto predefinido o generado",
        "Pipeline de IA = ejecuta una secuencia fija de llamadas LLM y transformaciones",
        "Agente IA = razona aut\u00F3nomamente, planifica, usa herramientas y se adapta para lograr un objetivo",
      ],
      p2: "La distinci\u00F3n clave es la autonom\u00EDa. Un chatbot espera input. Un pipeline sigue un gui\u00F3n. Un agente decide qu\u00E9 hacer a continuaci\u00F3n basado en lo que observa. Esta autonom\u00EDa es lo que hace a los agentes poderosos \u2014 y lo que los hace peligrosos en producci\u00F3n si no est\u00E1n correctamente limitados.",
      callout: "El error m\u00E1s com\u00FAn es llamar \u201Cagente\u201D a todo cuando la mayor\u00EDa de lo que se construy\u00F3 son pipelines sofisticados. Los verdaderos agentes tienen un bucle de razonamiento: Observar \u2192 Pensar \u2192 Actuar \u2192 Observar. Si tu sistema no tiene este bucle, no es un agente \u2014 y eso est\u00E1 bien. No todos los problemas necesitan un agente.",
      howTitle: "El Bucle de Razonamiento del Agente",
      howSteps: [
        "Observar: Recopilar contexto del entorno, entrada del usuario y salidas de herramientas",
        "Pensar: Razonar sobre el estado actual y decidir qu\u00E9 acci\u00F3n tomar",
        "Actuar: Ejecutar la acci\u00F3n elegida \u2014 llamar una API, consultar una base de datos, escribir c\u00F3digo, enviar un mensaje",
        "Evaluar: Evaluar el resultado, determinar si se logr\u00F3 el objetivo o si se necesita otra iteraci\u00F3n",
      ],
      howConclusion: "Este bucle se ejecuta continuamente hasta que el agente logra su objetivo, alcanza un l\u00EDmite o encuentra un error irrecuperable. Los agentes en producci\u00F3n necesitan barreras de protecci\u00F3n en cada etapa de este bucle.",
    },
    singleVsMulti: {
      heading: "Agente \u00DAnico vs Multi-Agente: Cu\u00E1ndo Usar Qu\u00E9",
      p1: "No todos los problemas necesitan una flota de agentes. De hecho, uno de los errores m\u00E1s grandes es sobre-ingeniar con arquitecturas multi-agente cuando un solo agente (o incluso un pipeline simple) ser\u00EDa suficiente.",
      stats: [
        { value: "1 Agente", label: "maneja el 80% de los casos de uso reales efectivamente" },
        { value: "2-3 Agentes", label: "necesarios para flujos complejos con roles distintos" },
        { value: "4+ Agentes", label: "solo justificado para escenarios de orquestaci\u00F3n empresarial" },
      ],
      single: {
        title: "Cu\u00E1ndo un Solo Agente Es Suficiente",
        text: "Us\u00E1 un solo agente cuando: la tarea tiene un alcance claro (soporte al cliente, revisi\u00F3n de c\u00F3digo, an\u00E1lisis de datos), el agente necesita acceso a 5-10 herramientas m\u00E1ximo, la cadena de razonamiento es lineal o tiene ramificaci\u00F3n simple, y la latencia importa (la coordinaci\u00F3n multi-agente agrega overhead). La mayor\u00EDa de los agentes en producci\u00F3n hoy son agentes \u00FAnicos con conjuntos de herramientas bien definidos.",
      },
      multi: {
        title: "Cu\u00E1ndo Necesit\u00E1s Sistemas Multi-Agente",
        text: "Us\u00E1 m\u00FAltiples agentes cuando: diferentes partes de la tarea requieren experiencia o modelos fundamentalmente diferentes, necesit\u00E1s separaci\u00F3n de responsabilidades por seguridad (ej: un agente propone, otro valida), el flujo involucra subtareas paralelas independientes, o necesit\u00E1s diferentes niveles de confianza para diferentes operaciones (agentes de solo lectura vs escritura).",
      },
      patterns: {
        title: "Patrones Multi-Agente Comunes",
        text: "Los tres patrones dominantes en producci\u00F3n son: Orquestador-Trabajador (un agente coordinador delega a agentes especialistas), Pipeline (los agentes pasan resultados secuencialmente como una l\u00EDnea de ensamblaje) y Debate/Verificaci\u00F3n (m\u00FAltiples agentes proponen y critican soluciones para mejorar la calidad). Eleg\u00ED basado en tu flujo espec\u00EDfico, no en lo que se ve impresionante en un blog.",
      },
    },
    pillars: {
      heading: "Los 5 Pilares de Agentes Listos para Producci\u00F3n",
      items: [
        {
          title: "1. Confiabilidad: Hacer Agentes Predecibles en un Mundo Impredecible",
          text: "Los LLMs son no-determin\u00EDsticos por naturaleza. Los agentes en producci\u00F3n necesitan comportamiento determin\u00EDstico alrededor de esa no-determinismo. Esto significa implementar salidas estructuradas (forzar cumplimiento de schema JSON), l\u00F3gica de reintentos con backoff exponencial, llamadas a herramientas idempotentes, checkpoints de estado para que los agentes puedan reanudarse despu\u00E9s de fallas, y l\u00EDmites de tiempo para cada llamada LLM y ejecuci\u00F3n de herramienta. Si tu agente no puede recuperarse de una llamada API fallida elegantemente, no est\u00E1 listo para producci\u00F3n.",
        },
        {
          title: "2. Observabilidad: No Pod\u00E9s Arreglar Lo Que No Pod\u00E9s Ver",
          text: "Los sistemas de agentes son notoriamente dif\u00EDciles de debuggear. Una sola solicitud de usuario puede disparar 15 llamadas LLM, 8 ejecuciones de herramientas y 3 bucles de reintentos. Sin observabilidad adecuada, vol\u00E1s a ciegas. Implement\u00E1 logging a nivel de traza para cada paso de razonamiento, segu\u00ED el uso de tokens y latencia por llamada, registr\u00E1 entradas y salidas de herramientas (redactando datos sensibles), construi dashboards que muestren los caminos de decisi\u00F3n del agente, y configur\u00E1 alertas para comportamiento an\u00F3malo.",
        },
        {
          title: "3. Barreras de Protecci\u00F3n: Limitar la Autonom\u00EDa Sin Matar la Utilidad",
          text: "Cuanto m\u00E1s aut\u00F3nomo es un agente, m\u00E1s da\u00F1o puede hacer. Los agentes en producci\u00F3n necesitan barreras en capas: validaci\u00F3n de entrada (rechazar solicitudes maliciosas o fuera de alcance), filtrado de salida (bloquear respuestas da\u00F1inas, incorrectas o fuera de marca), l\u00EDmites de acciones (limitar el n\u00FAmero de llamadas a herramientas por solicitud), l\u00EDmites de alcance (restringir qu\u00E9 herramientas y datos puede acceder un agente), y compuertas humanas para decisiones de alto impacto.",
        },
        {
          title: "4. Fallbacks: Degradaci\u00F3n Elegante Sobre Falla Catastr\u00F3fica",
          text: "Los agentes en producci\u00F3n deben fallar elegantemente. Cuando el LLM principal est\u00E1 ca\u00EDdo, recurr\u00ED a un modelo secundario. Cuando una herramienta expira, devolv\u00E9 un resultado parcial con contexto. Cuando el agente entra en un bucle de razonamiento, sal\u00ED despu\u00E9s de N iteraciones y escal\u00E1. Cuando la confianza es baja, deriv\u00E1 a un operador humano. El objetivo nunca es \u201Cperfecto o nada\u201D \u2014 es \u201Cmejor resultado posible dadas las restricciones actuales.\u201D",
        },
        {
          title: "5. Control de Costos: Los Agentes Pueden Quemar Dinero R\u00E1pido",
          text: "Un agente sin control puede acumular miles de d\u00F3lares en costos de API en minutos. Los despliegues en producci\u00F3n necesitan presupuestos de tokens por solicitud, ruteo de modelos (modelos baratos para tareas simples, modelos caros para razonamiento complejo), cach\u00E9 para llamadas repetidas y consultas comunes, circuit breakers que detengan agentes si los costos superan umbrales, y an\u00E1lisis regular del costo por tarea. Los equipos que omiten controles de costos consistentemente reportan costos 3-5x mayores a lo proyectado.",
        },
      ],
    },
    protocols: {
      heading: "MCP y A2A: Los Protocolos Que Conectan Agentes al Mundo Real",
      headers: ["Aspecto", "MCP (Model Context Protocol)", "A2A (Agent-to-Agent)"],
      rows: [
        ["Prop\u00F3sito", "Conecta agentes a herramientas y fuentes de datos externas", "Permite comunicaci\u00F3n entre diferentes agentes"],
        ["Analog\u00EDa", "USB-C para IA \u2014 conectividad universal de herramientas", "HTTP para agentes \u2014 comunicaci\u00F3n inter-agente estandarizada"],
        ["Desarrollado Por", "Anthropic (est\u00E1ndar abierto)", "Google DeepMind (est\u00E1ndar abierto)"],
        ["Beneficio Clave", "Un est\u00E1ndar de integraci\u00F3n en vez de conectores custom por herramienta", "Agentes de diferentes proveedores/frameworks pueden colaborar"],
        ["Uso en Producci\u00F3n", "Acceso a bases de datos, llamadas API, operaciones de archivos, navegaci\u00F3n web", "Orquestaci\u00F3n de agentes entre equipos, ecosistemas multi-proveedor"],
        ["Madurez", "Adopci\u00F3n r\u00E1pida \u2014 soportado por frameworks principales", "Emergente \u2014 ganando tracci\u00F3n en entornos empresariales"],
      ],
      callout: "MCP y A2A son complementarios, no competidores. MCP maneja la conexi\u00F3n agente-herramienta (integraci\u00F3n vertical), mientras A2A maneja la comunicaci\u00F3n agente-agente (integraci\u00F3n horizontal). Los sistemas en producci\u00F3n usan cada vez m\u00E1s ambos: MCP para dar a cada agente sus capacidades de herramientas, y A2A para que los agentes coordinen a trav\u00E9s de l\u00EDmites organizacionales.",
      p1: "MCP (Model Context Protocol) se est\u00E1 convirtiendo r\u00E1pidamente en el est\u00E1ndar de c\u00F3mo los agentes interact\u00FAan con herramientas externas. En vez de escribir c\u00F3digo de integraci\u00F3n custom para cada API, base de datos y servicio, implement\u00E1s un \u00FAnico servidor MCP que expone tus herramientas en un formato estandarizado. Cualquier agente compatible con MCP puede descubrir y usar esas herramientas.",
      p2: "A2A (protocolo Agent-to-Agent) resuelve el problema de interoperabilidad entre agentes. Cuando tu agente de servicio al cliente necesita derivar a un agente de facturaci\u00F3n construido por otro equipo (o incluso otra empresa), A2A proporciona la capa de comunicaci\u00F3n est\u00E1ndar. Maneja descubrimiento de capacidades, delegaci\u00F3n de tareas y paso de resultados entre agentes que pueden no conocer los internos del otro.",
    },
    useCases: {
      heading: "Casos de Uso Reales: D\u00F3nde los Agentes Realmente Funcionan",
      items: [
        {
          title: "Automatizaci\u00F3n de Servicio al Cliente",
          text: "Sistemas multi-agente donde un agente de triaje clasifica solicitudes entrantes, agentes especialistas manejan dominios espec\u00EDficos (facturaci\u00F3n, soporte t\u00E9cnico, devoluciones), y un agente de calidad revisa respuestas antes de enviarlas. Las empresas reportan 40-60% de reducci\u00F3n en volumen de tickets humanos con sistemas de agentes bien implementados, manteniendo o mejorando las puntuaciones de satisfacci\u00F3n.",
          points: [
            "Agente de triaje rutea al especialista correcto en menos de 2 segundos",
            "Agentes especialistas acceden a CRM, historial de pedidos y bases de conocimiento v\u00EDa MCP",
            "Agente de calidad detecta errores, violaciones de pol\u00EDticas y problemas de tono antes del env\u00EDo",
            "Escalamiento humano se activa autom\u00E1ticamente para casos complejos o sensibles",
          ],
        },
        {
          title: "An\u00E1lisis de Datos Automatizado",
          text: "Agentes que pueden consultar bases de datos, ejecutar an\u00E1lisis estad\u00EDsticos, generar visualizaciones y producir reportes en lenguaje natural. La clave es dar al agente herramientas bien delimitadas (acceso de solo lectura a bases de datos, bibliotecas de visualizaci\u00F3n aprobadas) y plantillas de salida claras.",
          points: [
            "Agente analista recibe preguntas en lenguaje natural y las traduce a SQL",
            "Agente de validaci\u00F3n verifica consultas por correcci\u00F3n y rendimiento antes de ejecutar",
            "Agente de reportes transforma resultados crudos en res\u00FAmenes ejecutivos",
            "Particularmente efectivo para reportes recurrentes que antes requer\u00EDan tiempo de analistas",
          ],
        },
        {
          title: "Revisi\u00F3n de C\u00F3digo y Desarrollo",
          text: "Agentes IA integrados en el flujo de desarrollo para revisi\u00F3n de c\u00F3digo automatizada, detecci\u00F3n de bugs y generaci\u00F3n de c\u00F3digo. Los despliegues en producci\u00F3n t\u00EDpicamente usan una configuraci\u00F3n multi-agente: un agente para an\u00E1lisis de seguridad, uno para revisi\u00F3n de rendimiento, uno para estilo/mejores pr\u00E1cticas, con un orquestador que sintetiza hallazgos.",
          points: [
            "Agente de seguridad escanea vulnerabilidades, riesgos de inyecci\u00F3n y problemas de dependencias",
            "Agente de rendimiento identifica cuellos de botella, fugas de memoria y oportunidades de optimizaci\u00F3n",
            "Agente de estilo asegura consistencia con est\u00E1ndares de c\u00F3digo del equipo",
            "Resultados agregados en una revisi\u00F3n \u00FAnica y priorizada que los desarrolladores realmente leen",
          ],
        },
        {
          title: "Trading y An\u00E1lisis Financiero",
          text: "Agentes que monitorean datos de mercado, analizan patrones, ejecutan trades y gestionan riesgo. Este es uno de los casos m\u00E1s demandantes por los requisitos de tiempo real, los riesgos financieros y las restricciones regulatorias. Los despliegues exitosos siempre incluyen un agente de gesti\u00F3n de riesgo separado con poder de veto sobre los agentes de trading.",
          points: [
            "Agente de monitoreo procesa feeds de datos en tiempo real y detecta se\u00F1ales",
            "Agente de an\u00E1lisis eval\u00FAa oportunidades contra patrones hist\u00F3ricos y condiciones actuales",
            "Agente de ejecuci\u00F3n coloca trades con l\u00EDmites estrictos de tama\u00F1o de posici\u00F3n y riesgo",
            "Agente de riesgo puede anular cualquier trade y activar stop-losses del portafolio completo",
          ],
        },
      ],
    },
    techStack: {
      heading: "Construyendo Tu Primer Agente en Producci\u00F3n: Stack Tecnol\u00F3gico Recomendado",
      p1: "No necesit\u00E1s construir todo desde cero. El ecosistema ha madurado significativamente. Ac\u00E1 hay un stack pr\u00E1ctico para desarrollo de agentes en producci\u00F3n:",
      items: [
        {
          title: "Frameworks de Agentes",
          text: "LangGraph para flujos multi-agente complejos con gesti\u00F3n de estado. CrewAI para prototipado r\u00E1pido multi-agente. El SDK de Agentes de Anthropic (Claude) u OpenAI para sistemas de agente \u00FAnico. Vercel AI SDK para agentes integrados con web. Eleg\u00ED seg\u00FAn tus necesidades de complejidad \u2014 no uses un framework multi-agente para un problema de agente \u00FAnico.",
        },
        {
          title: "Selecci\u00F3n de LLM",
          text: "Claude 3.5/4 Opus para tareas de razonamiento complejo. GPT-4o para agentes de prop\u00F3sito general con visi\u00F3n. Claude 3.5 Haiku o GPT-4o-mini para tareas de alto volumen y menor complejidad. Consider\u00E1 ejecutar m\u00FAltiples modelos: un modelo r\u00E1pido y barato para ruteo y un modelo potente para razonamiento complejo. Este patr\u00F3n de \u201Cruteo de modelos\u201D puede reducir costos 60-70%.",
        },
        {
          title: "Integraci\u00F3n de Herramientas",
          text: "Servidores MCP para acceso estandarizado a herramientas. Construi tus propios servidores MCP para APIs y bases de datos internas. Us\u00E1 servidores MCP de la comunidad para integraciones comunes (GitHub, Slack, bases de datos). Implement\u00E1 autenticaci\u00F3n adecuada, limitaci\u00F3n de tasa y registro de auditor\u00EDa en cada endpoint de herramienta.",
        },
        {
          title: "Observabilidad y Monitoreo",
          text: "LangSmith o LangFuse para visualizaci\u00F3n de trazas de agentes. OpenTelemetry para trazado distribuido a trav\u00E9s de sistemas de agentes. Dashboards personalizados en Grafana o Datadog para m\u00E9tricas de negocio. Configur\u00E1 alertas de PagerDuty para fallas de agentes, picos de costos y degradaci\u00F3n de calidad.",
        },
        {
          title: "Barreras y Seguridad",
          text: "Guardrails AI o capas de validaci\u00F3n custom para filtrado de entrada/salida. Prompting con IA Constitucional para seguridad incorporada. Agentes de validaci\u00F3n separados para salidas de alto riesgo. Siempre implement\u00E1 human-in-the-loop para acciones que no se pueden deshacer (transacciones financieras, comunicaciones externas, modificaciones de datos).",
        },
      ],
    },
    cta: {
      heading: "\u00BFListo para Llevar Tus Agentes IA de Demo a Producci\u00F3n?",
      p1: "Construir agentes IA listos para producci\u00F3n requiere m\u00E1s que ingenier\u00EDa de prompts \u2014 requiere pensamiento de sistemas, arquitectura cuidadosa y patrones probados en batalla. Los equipos que tienen \u00E9xito son los que tratan el desarrollo de agentes como ingenier\u00EDa de software, no como magia de IA.",
      p2: "Ya sea que est\u00E9s atrapado en el purgatorio de pilotos, luchando con problemas de confiabilidad, o empezando desde cero y quer\u00E9s hacerlo bien desde el principio \u2014 el camino a producci\u00F3n es m\u00E1s corto de lo que pens\u00E1s con la gu\u00EDa correcta.",
      boxTitle: "\u00BFNecesit\u00E1s Ayuda Construyendo Agentes IA para Producci\u00F3n?",
      boxText: "Dise\u00F1o y construyo sistemas de agentes IA custom que realmente funcionan en producci\u00F3n \u2014 desde dise\u00F1o de arquitectura y orquestaci\u00F3n multi-agente hasta integraci\u00F3n MCP y despliegue. Convirtamos tu prototipo de agente en un sistema de grado producci\u00F3n.",
      primaryBtn: "Iniciar una Conversaci\u00F3n",
      secondaryBtn: "Ver Mis Servicios",
    },
    authorBio: {
      specialization: "Desarrollador Full-Stack e Ingeniero de Sistemas IA",
      description: "Diego construye sistemas de agentes IA para producci\u00F3n y ayuda a equipos a cerrar la brecha entre demos impresionantes y despliegues confiables. Con experiencia pr\u00E1ctica en arquitecturas multi-agente, integraciones MCP y automatizaci\u00F3n con LLMs, ayuda a negocios a convertir prototipos de IA en sistemas de grado producci\u00F3n.",
    },
    related: {
      heading: "Art\u00EDculos Relacionados",
      articles: [
        {
          title: "Cuando la IA Falla al Programar: De Prototipo a Pesadilla en Producci\u00F3n",
          excerpt: "Por qu\u00E9 el 80% de los proyectos generados con IA nunca llegan a producci\u00F3n y c\u00F3mo rescatar proyectos atascados.",
          link: "/blog/ai-coding-problems-project-rescue-services",
        },
        {
          title: "De Vibe Coding a Producci\u00F3n: La Gu\u00EDa Completa para Publicar Proyectos Construidos con IA",
          excerpt: "C\u00F3mo llevar c\u00F3digo generado por IA de prototipo a producci\u00F3n con pr\u00E1cticas de ingenier\u00EDa probadas.",
          link: "/blog/vibe-coding-ai-projects-production-guide",
        },
      ],
    },
  },
};

const AIAgentsArticle = () => {
  const { t } = useTranslation(["blog", "common"]);
  const { locale } = useRouter();
  const dateLocale = locale === "es" ? "es-ES" : "en-US";
  const c = content[locale] || content.en;

  const publishDate = "2026-02-20";
  const articleUrl = "https://www.diego-rodriguez.work/blog/ai-agents-production-multi-agent-systems";

  return (
    <>
      <SEO
        title={c.seo.title}
        description={c.seo.description}
        keywords={c.seo.keywords}
        image="/work/multiple-agents.jpg"
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
                src="/work/multiple-agents.jpg"
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

              {/* What Are Agents */}
              <section>
                <h2 className="text-3xl font-bold text-white mb-6">{c.whatAreAgents.heading}</h2>
                <p className="mb-6 text-lg">{c.whatAreAgents.p1}</p>

                <div className="space-y-3 mb-6">
                  {c.whatAreAgents.comparison.map((item, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 rounded-lg p-4">
                      <p className="text-white font-medium">{item}</p>
                    </div>
                  ))}
                </div>

                <p className="mb-6">{c.whatAreAgents.p2}</p>

                <div className="border-l-4 border-blue-500 bg-blue-500/10 p-6 rounded-r-lg mb-8">
                  <p className="text-white/90">{c.whatAreAgents.callout}</p>
                </div>

                <h3 className="text-2xl font-semibold text-white mb-4">{c.whatAreAgents.howTitle}</h3>
                <div className="space-y-4 mb-6">
                  {c.whatAreAgents.howSteps.map((step, i) => (
                    <div key={i} className="flex gap-3">
                      <span className="text-accent font-bold text-lg mt-0.5">{i + 1}.</span>
                      <p className="text-white/80">{step}</p>
                    </div>
                  ))}
                </div>
                <p className="text-white/70 italic">{c.whatAreAgents.howConclusion}</p>
              </section>

              {/* Single vs Multi-Agent */}
              <section>
                <h2 className="text-3xl font-bold text-white mb-6">{c.singleVsMulti.heading}</h2>
                <p className="mb-8 text-lg">{c.singleVsMulti.p1}</p>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                  {c.singleVsMulti.stats.map((stat, i) => (
                    <div key={i} className="bg-gradient-to-br from-accent/15 to-transparent border border-accent/20 rounded-xl p-5 text-center">
                      <div className="text-3xl font-bold text-accent mb-1">{stat.value}</div>
                      <div className="text-white/60 text-sm">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Sub-sections */}
                {[c.singleVsMulti.single, c.singleVsMulti.multi, c.singleVsMulti.patterns].map((sub, i) => (
                  <div key={i} className="mb-6">
                    <h3 className="text-xl font-semibold text-white mb-3">{sub.title}</h3>
                    <p>{sub.text}</p>
                  </div>
                ))}
              </section>

              {/* 5 Pillars */}
              <section>
                <h2 className="text-3xl font-bold text-white mb-8">{c.pillars.heading}</h2>
                <div className="space-y-6">
                  {c.pillars.items.map((item, i) => (
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

              {/* Protocols Comparison Table */}
              <section>
                <h2 className="text-3xl font-bold text-white mb-8">{c.protocols.heading}</h2>
                <div className="overflow-x-auto mb-6">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        {c.protocols.headers.map((h, i) => (
                          <th key={i} className="text-left p-3 bg-accent/10 border border-white/10 text-accent text-sm font-semibold">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {c.protocols.rows.map((row, i) => (
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

                <div className="border-l-4 border-yellow-500 bg-yellow-500/10 p-6 rounded-r-lg mb-6">
                  <p className="text-white/90">{c.protocols.callout}</p>
                </div>

                <p className="mb-4">{c.protocols.p1}</p>
                <p>{c.protocols.p2}</p>
              </section>

              {/* Use Cases */}
              <section>
                <h2 className="text-3xl font-bold text-white mb-8">{c.useCases.heading}</h2>
                <div className="space-y-8">
                  {c.useCases.items.map((item, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6">
                      <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                      {item.text && <p className="text-white/80 mb-4">{item.text}</p>}
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

              {/* Tech Stack */}
              <section>
                <h2 className="text-3xl font-bold text-white mb-6">{c.techStack.heading}</h2>
                <p className="mb-8 text-lg">{c.techStack.p1}</p>
                <div className="space-y-8">
                  {c.techStack.items.map((item, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6">
                      <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                      <p className="text-white/80">{item.text}</p>
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

export default AIAgentsArticle;
