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
      title: "Your API Is Exposed: 5 Vulnerabilities AI Finds in Seconds That Developers Ignore",
      description: "Most APIs go to production with critical security vulnerabilities. Learn the 5 most common API security holes — broken authentication, excessive data exposure, rate limiting gaps, injection attacks, and broken access control — and how AI security tools find them in seconds.",
      keywords: "api security vulnerabilities, api security best practices, broken authentication api, api rate limiting, injection attacks prevention, api security checklist, secure api development, ai security scanning",
    },
    categories: ["Fintech", "API Development", "Security"],
    title: "Your API Is Exposed: 5 Vulnerabilities AI Finds in Seconds That Developers Ignore",
    shareText: "5 API Vulnerabilities AI Finds in Seconds",
    readTime: "10 min read",
    intro: {
      hook: "The Scary Reality: Most APIs Go to Production With Critical Vulnerabilities",
      p1: "You deployed your API last Friday. It passed code review. Tests were green. The team celebrated. But right now, an automated scanner is probing your endpoints, and it just found three critical vulnerabilities your entire team missed.",
      p2: "This isn\u2019t hypothetical. It\u2019s happening to thousands of APIs every single day.",
      stat: { value: "91%", label: "of web applications have at least one API vulnerability according to 2025 security reports" },
      p3: "Cybersecurity in 2026 is shifting from reactive to preventive. AI-powered security tools can now scan your entire codebase and find vulnerabilities in seconds that developers miss for months. The tools attackers use are getting smarter \u2014 and so should your defenses.",
      p4: "Here are the 5 most common API security holes, why developers keep missing them, and exactly how to fix each one.",
    },
    vulnerability1: {
      heading: "Vulnerability 1: Broken Authentication",
      subtitle: "The front door you forgot to lock",
      p1: "Broken authentication is the #1 API vulnerability on the OWASP API Security Top 10, and for good reason. It\u2019s the most exploited and often the easiest to overlook because developers assume their auth \u201cjust works.\u201d",
      examples: [
        "Hardcoded API keys and secrets committed to version control",
        "Weak JWT implementation \u2014 using HS256 with a guessable secret, no expiration, or tokens that never rotate",
        "Missing token rotation \u2014 access tokens that live forever, no refresh token strategy",
        "No multi-factor authentication on sensitive endpoints",
        "Session tokens transmitted over unencrypted connections",
      ],
      realWorld: "In 2025, a major fintech startup leaked 2.3 million user records because a developer committed an API key to a public GitHub repo. An automated bot found it in under 12 minutes.",
      fixes: [
        "Use environment variables for all secrets \u2014 never hardcode them",
        "Implement short-lived JWTs (15 minutes max) with secure refresh token rotation",
        "Use RS256 or ES256 for JWT signing instead of HS256",
        "Add rate limiting to authentication endpoints specifically",
        "Implement MFA for any endpoint that accesses sensitive data",
        "Scan repos with tools like GitLeaks or TruffleHog before every push",
      ],
    },
    vulnerability2: {
      heading: "Vulnerability 2: Excessive Data Exposure",
      subtitle: "Sending the entire database when they asked for a name",
      p1: "This is the vulnerability that makes security auditors lose sleep. Developers build APIs that return entire database objects instead of carefully filtered responses. The frontend only displays the user\u2019s name and email, but the API response includes their password hash, internal ID, role, creation date, last login IP, and sometimes even other users\u2019 data.",
      examples: [
        "Returning full user objects including password hashes and internal metadata",
        "Exposing database IDs that can be enumerated sequentially",
        "Including debug information or stack traces in production responses",
        "Returning related objects with sensitive fields (e.g., a comment endpoint that exposes the commenter\u2019s full profile)",
        "GraphQL APIs without field-level authorization \u2014 letting clients query any field they want",
      ],
      codeExample: {
        bad: "// DANGEROUS: Returns everything from the database\napp.get('/api/users/:id', async (req, res) => {\n  const user = await User.findById(req.params.id);\n  res.json(user); // Exposes password_hash, internal_role, ssn...\n});",
        good: "// SAFE: Returns only what the client needs\napp.get('/api/users/:id', async (req, res) => {\n  const user = await User.findById(req.params.id)\n    .select('name email avatar publicProfile');\n  res.json(user);\n});",
      },
      fixes: [
        "Never return raw database objects \u2014 always use DTOs or serializers",
        "Implement response schemas that explicitly whitelist fields",
        "Use different response shapes for different authorization levels",
        "Audit every endpoint to verify what data is actually being sent",
        "Strip sensitive fields at the framework level, not in individual controllers",
      ],
    },
    vulnerability3: {
      heading: "Vulnerability 3: Rate Limiting Gaps",
      subtitle: "The open door for DDoS and brute force attacks",
      p1: "No rate limiting means your API is an all-you-can-eat buffet for attackers. Without throttling, a single attacker can send thousands of requests per second \u2014 brute-forcing login credentials, scraping your entire database, or simply taking your service offline with a DDoS attack.",
      stats: [
        { value: "34%", label: "of APIs have no rate limiting at all" },
        { value: "12 sec", label: "average time to brute-force a 6-character password without rate limiting" },
        { value: "10,000x", label: "cost multiplier of handling a DDoS vs preventing it" },
      ],
      whatToLimit: [
        "Authentication endpoints \u2014 maximum 5 attempts per minute per IP",
        "Password reset / OTP endpoints \u2014 maximum 3 attempts per hour",
        "Data-heavy endpoints \u2014 limit by user tier and request cost",
        "Webhook receivers \u2014 validate signatures and limit by source",
        "Search and filter endpoints \u2014 prevent data scraping via pagination abuse",
      ],
      fixes: [
        "Implement rate limiting at the API gateway level (not just application level)",
        "Use sliding window algorithms instead of fixed windows to prevent burst attacks",
        "Set different limits for authenticated vs. unauthenticated requests",
        "Return proper 429 status codes with Retry-After headers",
        "Implement progressive delays (exponential backoff) for repeated failures",
        "Monitor and alert on unusual traffic patterns in real time",
      ],
    },
    vulnerability4: {
      heading: "Vulnerability 4: Injection Attacks",
      subtitle: "The classic that refuses to die \u2014 now with AI-powered payloads",
      p1: "SQL injection has been on security lists since 1998, and it\u2019s still one of the most exploited vulnerabilities in 2026. But the landscape has evolved. Attackers now use AI to generate sophisticated, context-aware injection payloads that bypass traditional WAF rules. And it\u2019s not just SQL anymore \u2014 NoSQL injection, command injection, and LDAP injection are all actively exploited.",
      types: [
        {
          name: "SQL Injection",
          description: "Manipulating SQL queries through unsanitized input. Even parameterized queries can be vulnerable if dynamic table or column names are concatenated.",
        },
        {
          name: "NoSQL Injection",
          description: "MongoDB and similar databases are vulnerable to operator injection. Passing { \"$gt\": \"\" } as a password field bypasses authentication entirely.",
        },
        {
          name: "Command Injection",
          description: "APIs that pass user input to system commands (file processing, image conversion) can allow arbitrary command execution on the server.",
        },
        {
          name: "AI Prompt Injection",
          description: "The newest class: APIs that forward user input to AI models can be manipulated to bypass guardrails, leak system prompts, or execute unintended actions.",
        },
      ],
      fixes: [
        "Use parameterized queries or ORMs for ALL database interactions \u2014 no exceptions",
        "Validate and sanitize every input with strict type checking and whitelisting",
        "Never pass user input directly to system commands \u2014 use safe abstractions",
        "Implement input length limits on all fields",
        "For AI-connected APIs: sanitize prompts, implement output filtering, and use separate system/user contexts",
        "Run automated injection testing in your CI/CD pipeline with every deployment",
      ],
    },
    vulnerability5: {
      heading: "Vulnerability 5: Broken Access Control",
      subtitle: "When users can do things they should never be allowed to do",
      p1: "Broken access control is the most dangerous vulnerability on this list because it\u2019s the hardest to detect automatically and the most devastating when exploited. It means a regular user can access admin functionality, view other users\u2019 data, or escalate their own privileges \u2014 simply by changing a number in the URL.",
      types: [
        {
          name: "IDOR (Insecure Direct Object Reference)",
          description: "Changing /api/invoices/1001 to /api/invoices/1002 shows you someone else\u2019s invoice. The API checks if you\u2019re authenticated but not if you\u2019re authorized to see that specific resource.",
        },
        {
          name: "Missing Role Checks",
          description: "Admin endpoints that only check if a user is logged in, not if they have the admin role. The frontend hides the admin button, but the API endpoint is wide open.",
        },
        {
          name: "Privilege Escalation",
          description: "Users can modify their own role by including role: \"admin\" in a profile update request. The API blindly accepts and persists all fields from the request body.",
        },
        {
          name: "Missing Function-Level Access Control",
          description: "Different HTTP methods on the same resource have different authorization requirements, but the API only checks auth on GET, not on PUT or DELETE.",
        },
      ],
      fixes: [
        "Implement authorization checks on every single endpoint \u2014 never rely on frontend hiding",
        "Use middleware that enforces resource ownership (\"does this user own this resource?\")",
        "Whitelist which fields can be updated per role \u2014 never blindly persist request bodies",
        "Test access control by attempting cross-user and cross-role access in automated tests",
        "Log and alert on authorization failures \u2014 they often indicate active attack attempts",
        "Default to deny \u2014 require explicit grants rather than blocking specific actions",
      ],
    },
    aiTools: {
      heading: "How AI Security Tools Find These in Seconds",
      p1: "The shift from manual code review to AI-powered security scanning is the most significant change in application security since automated testing. These tools don\u2019t just find known patterns \u2014 they understand code context, data flow, and business logic.",
      tools: [
        {
          name: "Snyk",
          description: "Scans dependencies, container images, and infrastructure as code. Its AI engine understands vulnerability chains \u2014 how a vulnerability in a transitive dependency can be exploited through your specific code paths.",
        },
        {
          name: "SonarQube",
          description: "Static analysis that now uses AI to reduce false positives by 60%. Detects security hotspots, injection vulnerabilities, and authentication weaknesses directly in your IDE and CI/CD pipeline.",
        },
        {
          name: "GitHub Copilot Security (Advanced Security)",
          description: "Scans every push and pull request for hardcoded secrets, vulnerable patterns, and insecure dependencies. Blocks merges that introduce known vulnerabilities and suggests fixes inline.",
        },
        {
          name: "Semgrep",
          description: "AI-powered static analysis that lets you write custom rules in a simple DSL. Finds project-specific vulnerability patterns that generic tools miss.",
        },
        {
          name: "Burp Suite AI Scanner",
          description: "Dynamic analysis that uses AI to generate contextually relevant attack payloads. Finds runtime vulnerabilities that static analysis can\u2019t detect, including business logic flaws.",
        },
      ],
      callout: "The key insight: AI security tools are not replacing security engineers \u2014 they\u2019re giving every developer the ability to catch 80% of vulnerabilities before code review even begins. The remaining 20% still requires human expertise in threat modeling and business logic review.",
    },
    checklist: {
      heading: "The Prevention Checklist: 10 Things To Do Before Every API Deploy",
      items: [
        "Run automated security scans (SAST + DAST) in your CI/CD pipeline",
        "Verify all authentication tokens have expiration and rotation configured",
        "Audit every endpoint\u2019s response payload \u2014 strip sensitive fields at the serializer level",
        "Confirm rate limiting is active on all public endpoints with appropriate thresholds",
        "Run injection testing (SQL, NoSQL, command) against all endpoints that accept input",
        "Verify access control on every endpoint: test cross-user access, cross-role access, and privilege escalation",
        "Check that all secrets are in environment variables, not in code or config files",
        "Review CORS configuration \u2014 no wildcard origins in production",
        "Enable request logging and set up alerts for anomalous patterns (spike in 401s, 403s, 429s)",
        "Test error responses \u2014 ensure they don\u2019t leak stack traces, database schemas, or internal paths",
      ],
    },
    cta: {
      heading: "Don\u2019t Wait for a Breach to Take Security Seriously",
      p1: "Every API vulnerability listed here has caused real data breaches, real financial losses, and real regulatory fines in the past year alone. The average cost of an API-related data breach in 2025 was $4.8 million. Prevention is not just cheaper \u2014 it\u2019s the only responsible approach.",
      p2: "The good news: every single one of these vulnerabilities is preventable with the right process and tools.",
      boxTitle: "Need a Security Audit or Secure API Development?",
      boxText: "I help companies build secure APIs from the ground up and audit existing systems for vulnerabilities. From fintech to SaaS, I\u2019ve identified and fixed critical security issues before they become headlines. Let\u2019s make your API bulletproof.",
      primaryBtn: "Get a Security Audit",
      secondaryBtn: "View My Services",
    },
    authorBio: {
      specialization: "Full-Stack Developer & API Security Specialist",
      description: "Diego builds secure, scalable APIs for fintech and SaaS companies. With hands-on experience in security auditing, penetration testing, and secure architecture design, he helps teams ship fast without compromising security.",
    },
    related: {
      heading: "Related Articles",
      articles: [
        {
          title: "Fintech API Development: Security and Scalability Best Practices",
          excerpt: "How to build APIs that handle financial data securely while scaling to millions of transactions.",
          link: "/blog/fintech-api-development-security-scalability",
        },
        {
          title: "AI Agents in Production: Building Reliable Multi-Agent Systems",
          excerpt: "Architecture patterns and safety considerations for deploying AI agents in real-world production environments.",
          link: "/blog/ai-agents-production-multi-agent-systems",
        },
      ],
    },
  },
  es: {
    seo: {
      title: "Tu API Est\u00e1 Expuesta: 5 Vulnerabilidades Que la IA Encuentra en Segundos y los Desarrolladores Ignoran",
      description: "La mayor\u00eda de las APIs llegan a producci\u00f3n con vulnerabilidades cr\u00edticas. Conoce las 5 fallas de seguridad m\u00e1s comunes \u2014 autenticaci\u00f3n rota, exposici\u00f3n excesiva de datos, falta de rate limiting, ataques de inyecci\u00f3n y control de acceso roto \u2014 y c\u00f3mo las herramientas de seguridad con IA las detectan en segundos.",
      keywords: "vulnerabilidades seguridad api, mejores practicas seguridad api, autenticacion rota api, limitacion tasa api, prevencion ataques inyeccion, checklist seguridad api, desarrollo api seguro, escaneo seguridad ia",
    },
    categories: ["Fintech", "Desarrollo API", "Seguridad"],
    title: "Tu API Est\u00e1 Expuesta: 5 Vulnerabilidades Que la IA Encuentra en Segundos y los Desarrolladores Ignoran",
    shareText: "5 Vulnerabilidades de API Que la IA Encuentra en Segundos",
    readTime: "10 min de lectura",
    intro: {
      hook: "La Realidad Aterradora: La Mayor\u00eda de las APIs Llegan a Producci\u00f3n con Vulnerabilidades Cr\u00edticas",
      p1: "Desplegaste tu API el viernes pasado. Pas\u00f3 el code review. Los tests estaban en verde. El equipo celebr\u00f3. Pero ahora mismo, un esc\u00e1ner automatizado est\u00e1 probando tus endpoints, y acaba de encontrar tres vulnerabilidades cr\u00edticas que todo tu equipo pas\u00f3 por alto.",
      p2: "Esto no es hipot\u00e9tico. Le est\u00e1 pasando a miles de APIs todos los d\u00edas.",
      stat: { value: "91%", label: "de las aplicaciones web tienen al menos una vulnerabilidad de API seg\u00fan reportes de seguridad de 2025" },
      p3: "La ciberseguridad en 2026 est\u00e1 pasando de reactiva a preventiva. Las herramientas de seguridad con IA ahora pueden escanear todo tu c\u00f3digo y encontrar vulnerabilidades en segundos que los desarrolladores pasan por alto durante meses. Las herramientas que usan los atacantes son cada vez m\u00e1s inteligentes \u2014 y tus defensas tambi\u00e9n deber\u00edan serlo.",
      p4: "Estas son las 5 vulnerabilidades de seguridad de API m\u00e1s comunes, por qu\u00e9 los desarrolladores las siguen ignorando, y exactamente c\u00f3mo corregir cada una.",
    },
    vulnerability1: {
      heading: "Vulnerabilidad 1: Autenticaci\u00f3n Rota",
      subtitle: "La puerta principal que olvidaste cerrar con llave",
      p1: "La autenticaci\u00f3n rota es la vulnerabilidad #1 en el OWASP API Security Top 10, y con raz\u00f3n. Es la m\u00e1s explotada y generalmente la m\u00e1s f\u00e1cil de pasar por alto porque los desarrolladores asumen que su autenticaci\u00f3n \u201csimplemente funciona.\u201d",
      examples: [
        "Claves API y secretos hardcodeados commiteados al control de versiones",
        "Implementaci\u00f3n d\u00e9bil de JWT \u2014 usando HS256 con un secreto adivinable, sin expiraci\u00f3n, o tokens que nunca rotan",
        "Sin rotaci\u00f3n de tokens \u2014 tokens de acceso que viven para siempre, sin estrategia de refresh token",
        "Sin autenticaci\u00f3n multifactor en endpoints sensibles",
        "Tokens de sesi\u00f3n transmitidos por conexiones sin encriptar",
      ],
      realWorld: "En 2025, una startup fintech importante filtr\u00f3 2.3 millones de registros de usuarios porque un desarrollador commit\u00f3 una clave API a un repositorio p\u00fablico de GitHub. Un bot automatizado la encontr\u00f3 en menos de 12 minutos.",
      fixes: [
        "Us\u00e1 variables de entorno para todos los secretos \u2014 nunca los hardcodees",
        "Implement\u00e1 JWTs de corta duraci\u00f3n (15 minutos m\u00e1ximo) con rotaci\u00f3n segura de refresh tokens",
        "Us\u00e1 RS256 o ES256 para firmar JWTs en lugar de HS256",
        "Agreg\u00e1 rate limiting a los endpoints de autenticaci\u00f3n espec\u00edficamente",
        "Implement\u00e1 MFA para cualquier endpoint que acceda a datos sensibles",
        "Escane\u00e1 repos con herramientas como GitLeaks o TruffleHog antes de cada push",
      ],
    },
    vulnerability2: {
      heading: "Vulnerabilidad 2: Exposici\u00f3n Excesiva de Datos",
      subtitle: "Enviando toda la base de datos cuando solo pidieron un nombre",
      p1: "Esta es la vulnerabilidad que quita el sue\u00f1o a los auditores de seguridad. Los desarrolladores construyen APIs que devuelven objetos completos de la base de datos en lugar de respuestas cuidadosamente filtradas. El frontend solo muestra el nombre y email del usuario, pero la respuesta de la API incluye su hash de contrase\u00f1a, ID interno, rol, fecha de creaci\u00f3n, IP del \u00faltimo login, y a veces hasta datos de otros usuarios.",
      examples: [
        "Devolver objetos de usuario completos incluyendo hashes de contrase\u00f1as y metadata interna",
        "Exponer IDs de base de datos que pueden ser enumerados secuencialmente",
        "Incluir informaci\u00f3n de debug o stack traces en respuestas de producci\u00f3n",
        "Devolver objetos relacionados con campos sensibles (ej: un endpoint de comentarios que expone el perfil completo del autor)",
        "APIs GraphQL sin autorizaci\u00f3n a nivel de campo \u2014 permitiendo que los clientes consulten cualquier campo",
      ],
      codeExample: {
        bad: "// PELIGROSO: Devuelve todo de la base de datos\napp.get('/api/users/:id', async (req, res) => {\n  const user = await User.findById(req.params.id);\n  res.json(user); // Expone password_hash, internal_role, ssn...\n});",
        good: "// SEGURO: Devuelve solo lo que el cliente necesita\napp.get('/api/users/:id', async (req, res) => {\n  const user = await User.findById(req.params.id)\n    .select('name email avatar publicProfile');\n  res.json(user);\n});",
      },
      fixes: [
        "Nunca devuelvas objetos crudos de la base de datos \u2014 siempre us\u00e1 DTOs o serializadores",
        "Implement\u00e1 esquemas de respuesta que expl\u00edcitamente hagan whitelist de campos",
        "Us\u00e1 diferentes formas de respuesta para diferentes niveles de autorizaci\u00f3n",
        "Audit\u00e1 cada endpoint para verificar qu\u00e9 datos se est\u00e1n enviando realmente",
        "Elimin\u00e1 campos sensibles a nivel de framework, no en controladores individuales",
      ],
    },
    vulnerability3: {
      heading: "Vulnerabilidad 3: Falta de Rate Limiting",
      subtitle: "La puerta abierta para DDoS y ataques de fuerza bruta",
      p1: "Sin rate limiting, tu API es un buffet libre para atacantes. Sin throttling, un solo atacante puede enviar miles de requests por segundo \u2014 haciendo fuerza bruta a credenciales de login, scrapeando toda tu base de datos, o simplemente tirando tu servicio con un ataque DDoS.",
      stats: [
        { value: "34%", label: "de las APIs no tienen rate limiting en absoluto" },
        { value: "12 seg", label: "tiempo promedio para fuerza bruta de una contrase\u00f1a de 6 caracteres sin rate limiting" },
        { value: "10,000x", label: "multiplicador de costo de manejar un DDoS vs prevenirlo" },
      ],
      whatToLimit: [
        "Endpoints de autenticaci\u00f3n \u2014 m\u00e1ximo 5 intentos por minuto por IP",
        "Endpoints de reset de contrase\u00f1a / OTP \u2014 m\u00e1ximo 3 intentos por hora",
        "Endpoints de datos pesados \u2014 limitar por tier de usuario y costo del request",
        "Receptores de webhooks \u2014 validar firmas y limitar por origen",
        "Endpoints de b\u00fasqueda y filtrado \u2014 prevenir scraping de datos v\u00eda abuso de paginaci\u00f3n",
      ],
      fixes: [
        "Implement\u00e1 rate limiting a nivel de API gateway (no solo a nivel de aplicaci\u00f3n)",
        "Us\u00e1 algoritmos de ventana deslizante en lugar de ventanas fijas para prevenir ataques de r\u00e1faga",
        "Establec\u00e9 l\u00edmites diferentes para requests autenticados vs. no autenticados",
        "Devolv\u00e9 c\u00f3digos de estado 429 apropiados con headers Retry-After",
        "Implement\u00e1 delays progresivos (backoff exponencial) para fallos repetidos",
        "Monitor\u00e1 y alert\u00e1 sobre patrones de tr\u00e1fico inusuales en tiempo real",
      ],
    },
    vulnerability4: {
      heading: "Vulnerabilidad 4: Ataques de Inyecci\u00f3n",
      subtitle: "El cl\u00e1sico que se niega a morir \u2014 ahora con payloads generados por IA",
      p1: "La inyecci\u00f3n SQL ha estado en las listas de seguridad desde 1998, y sigue siendo una de las vulnerabilidades m\u00e1s explotadas en 2026. Pero el panorama evolucion\u00f3. Los atacantes ahora usan IA para generar payloads de inyecci\u00f3n sofisticados y conscientes del contexto que evaden las reglas WAF tradicionales. Y ya no es solo SQL \u2014 la inyecci\u00f3n NoSQL, inyecci\u00f3n de comandos e inyecci\u00f3n LDAP est\u00e1n siendo explotadas activamente.",
      types: [
        {
          name: "Inyecci\u00f3n SQL",
          description: "Manipulaci\u00f3n de consultas SQL a trav\u00e9s de input no sanitizado. Incluso las consultas parametrizadas pueden ser vulnerables si se concatenan nombres de tablas o columnas din\u00e1micos.",
        },
        {
          name: "Inyecci\u00f3n NoSQL",
          description: "MongoDB y bases de datos similares son vulnerables a inyecci\u00f3n de operadores. Pasar { \"$gt\": \"\" } como campo de contrase\u00f1a evita la autenticaci\u00f3n completamente.",
        },
        {
          name: "Inyecci\u00f3n de Comandos",
          description: "APIs que pasan input de usuario a comandos del sistema (procesamiento de archivos, conversi\u00f3n de im\u00e1genes) pueden permitir ejecuci\u00f3n arbitraria de comandos en el servidor.",
        },
        {
          name: "Inyecci\u00f3n de Prompts IA",
          description: "La clase m\u00e1s nueva: APIs que env\u00edan input de usuario a modelos de IA pueden ser manipuladas para evadir guardrails, filtrar system prompts, o ejecutar acciones no deseadas.",
        },
      ],
      fixes: [
        "Us\u00e1 consultas parametrizadas u ORMs para TODAS las interacciones con la base de datos \u2014 sin excepciones",
        "Valid\u00e1 y sanitiz\u00e1 cada input con type checking estricto y whitelisting",
        "Nunca pases input de usuario directamente a comandos del sistema \u2014 us\u00e1 abstracciones seguras",
        "Implement\u00e1 l\u00edmites de longitud de input en todos los campos",
        "Para APIs conectadas a IA: sanitiz\u00e1 prompts, implement\u00e1 filtrado de output, y us\u00e1 contextos system/user separados",
        "Ejecut\u00e1 testing de inyecci\u00f3n automatizado en tu pipeline CI/CD con cada despliegue",
      ],
    },
    vulnerability5: {
      heading: "Vulnerabilidad 5: Control de Acceso Roto",
      subtitle: "Cuando los usuarios pueden hacer cosas que nunca deber\u00edan estar permitidas",
      p1: "El control de acceso roto es la vulnerabilidad m\u00e1s peligrosa de esta lista porque es la m\u00e1s dif\u00edcil de detectar autom\u00e1ticamente y la m\u00e1s devastadora cuando se explota. Significa que un usuario com\u00fan puede acceder a funcionalidad de administrador, ver datos de otros usuarios, o escalar sus propios privilegios \u2014 simplemente cambiando un n\u00famero en la URL.",
      types: [
        {
          name: "IDOR (Referencia Directa Insegura a Objetos)",
          description: "Cambiar /api/invoices/1001 a /api/invoices/1002 te muestra la factura de otra persona. La API verifica si est\u00e1s autenticado pero no si est\u00e1s autorizado para ver ese recurso espec\u00edfico.",
        },
        {
          name: "Falta de Verificaci\u00f3n de Roles",
          description: "Endpoints de admin que solo verifican si el usuario est\u00e1 logueado, no si tiene el rol de admin. El frontend oculta el bot\u00f3n de admin, pero el endpoint de la API est\u00e1 completamente abierto.",
        },
        {
          name: "Escalaci\u00f3n de Privilegios",
          description: "Los usuarios pueden modificar su propio rol incluyendo role: \"admin\" en un request de actualizaci\u00f3n de perfil. La API acepta y persiste ciegamente todos los campos del cuerpo del request.",
        },
        {
          name: "Falta de Control de Acceso a Nivel de Funci\u00f3n",
          description: "Diferentes m\u00e9todos HTTP en el mismo recurso tienen diferentes requisitos de autorizaci\u00f3n, pero la API solo verifica auth en GET, no en PUT o DELETE.",
        },
      ],
      fixes: [
        "Implement\u00e1 verificaciones de autorizaci\u00f3n en cada endpoint \u2014 nunca dependas de ocultar cosas en el frontend",
        "Us\u00e1 middleware que verifique ownership del recurso (\u201c\u00bfeste usuario es due\u00f1o de este recurso?\u201d)",
        "Hac\u00e9 whitelist de qu\u00e9 campos se pueden actualizar por rol \u2014 nunca persistas ciegamente los cuerpos de request",
        "Test\u00e1 el control de acceso intentando acceso cruzado entre usuarios y roles en tests automatizados",
        "Registr\u00e1 y alert\u00e1 sobre fallos de autorizaci\u00f3n \u2014 frecuentemente indican intentos de ataque activos",
        "Default a denegar \u2014 requer\u00ed permisos expl\u00edcitos en vez de bloquear acciones espec\u00edficas",
      ],
    },
    aiTools: {
      heading: "C\u00f3mo las Herramientas de Seguridad con IA Encuentran Esto en Segundos",
      p1: "El cambio de la revisi\u00f3n manual de c\u00f3digo al escaneo de seguridad con IA es el cambio m\u00e1s significativo en seguridad de aplicaciones desde el testing automatizado. Estas herramientas no solo encuentran patrones conocidos \u2014 entienden el contexto del c\u00f3digo, el flujo de datos y la l\u00f3gica de negocio.",
      tools: [
        {
          name: "Snyk",
          description: "Escanea dependencias, im\u00e1genes de contenedores e infraestructura como c\u00f3digo. Su motor de IA entiende cadenas de vulnerabilidades \u2014 c\u00f3mo una vulnerabilidad en una dependencia transitiva puede ser explotada a trav\u00e9s de tus paths de c\u00f3digo espec\u00edficos.",
        },
        {
          name: "SonarQube",
          description: "An\u00e1lisis est\u00e1tico que ahora usa IA para reducir falsos positivos en un 60%. Detecta hotspots de seguridad, vulnerabilidades de inyecci\u00f3n y debilidades de autenticaci\u00f3n directamente en tu IDE y pipeline CI/CD.",
        },
        {
          name: "GitHub Copilot Security (Advanced Security)",
          description: "Escanea cada push y pull request buscando secretos hardcodeados, patrones vulnerables y dependencias inseguras. Bloquea merges que introducen vulnerabilidades conocidas y sugiere fixes inline.",
        },
        {
          name: "Semgrep",
          description: "An\u00e1lisis est\u00e1tico con IA que te permite escribir reglas personalizadas en un DSL simple. Encuentra patrones de vulnerabilidad espec\u00edficos de tu proyecto que las herramientas gen\u00e9ricas no detectan.",
        },
        {
          name: "Burp Suite AI Scanner",
          description: "An\u00e1lisis din\u00e1mico que usa IA para generar payloads de ataque contextualmente relevantes. Encuentra vulnerabilidades en runtime que el an\u00e1lisis est\u00e1tico no puede detectar, incluyendo fallas de l\u00f3gica de negocio.",
        },
      ],
      callout: "El insight clave: las herramientas de seguridad con IA no est\u00e1n reemplazando a los ingenieros de seguridad \u2014 le est\u00e1n dando a cada desarrollador la capacidad de detectar el 80% de las vulnerabilidades antes de que siquiera comience el code review. El 20% restante a\u00fan requiere experiencia humana en modelado de amenazas y revisi\u00f3n de l\u00f3gica de negocio.",
    },
    checklist: {
      heading: "El Checklist de Prevenci\u00f3n: 10 Cosas Para Hacer Antes de Cada Deploy de API",
      items: [
        "Ejecut\u00e1 escaneos de seguridad automatizados (SAST + DAST) en tu pipeline CI/CD",
        "Verific\u00e1 que todos los tokens de autenticaci\u00f3n tengan expiraci\u00f3n y rotaci\u00f3n configuradas",
        "Audit\u00e1 el payload de respuesta de cada endpoint \u2014 elimin\u00e1 campos sensibles a nivel de serializador",
        "Confirm\u00e1 que el rate limiting est\u00e9 activo en todos los endpoints p\u00fablicos con umbrales apropiados",
        "Ejecut\u00e1 testing de inyecci\u00f3n (SQL, NoSQL, comandos) contra todos los endpoints que acepten input",
        "Verific\u00e1 el control de acceso en cada endpoint: test\u00e1 acceso cruzado entre usuarios, roles y escalaci\u00f3n de privilegios",
        "Comprob\u00e1 que todos los secretos est\u00e9n en variables de entorno, no en c\u00f3digo o archivos de configuraci\u00f3n",
        "Revis\u00e1 la configuraci\u00f3n de CORS \u2014 nada de or\u00edgenes wildcard en producci\u00f3n",
        "Habilit\u00e1 logging de requests y configur\u00e1 alertas para patrones an\u00f3malos (picos en 401s, 403s, 429s)",
        "Test\u00e1 las respuestas de error \u2014 asegurate de que no filtren stack traces, esquemas de base de datos o paths internos",
      ],
    },
    cta: {
      heading: "No Esperes a una Brecha para Tomar la Seguridad en Serio",
      p1: "Cada vulnerabilidad de API listada aqu\u00ed ha causado brechas de datos reales, p\u00e9rdidas financieras reales y multas regulatorias reales solo en el \u00faltimo a\u00f1o. El costo promedio de una brecha de datos relacionada con APIs en 2025 fue de $4.8 millones. La prevenci\u00f3n no es solo m\u00e1s barata \u2014 es el \u00fanico enfoque responsable.",
      p2: "La buena noticia: cada una de estas vulnerabilidades es prevenible con el proceso y las herramientas correctas.",
      boxTitle: "\u00bfNecesit\u00e1s una Auditor\u00eda de Seguridad o Desarrollo de APIs Seguras?",
      boxText: "Ayudo a empresas a construir APIs seguras desde cero y auditar sistemas existentes en busca de vulnerabilidades. Desde fintech hasta SaaS, he identificado y corregido problemas cr\u00edticos de seguridad antes de que se conviertan en titulares. Hagamos tu API a prueba de balas.",
      primaryBtn: "Obtener Auditor\u00eda de Seguridad",
      secondaryBtn: "Ver Mis Servicios",
    },
    authorBio: {
      specialization: "Desarrollador Full-Stack y Especialista en Seguridad de APIs",
      description: "Diego construye APIs seguras y escalables para empresas fintech y SaaS. Con experiencia pr\u00e1ctica en auditor\u00edas de seguridad, testing de penetraci\u00f3n y dise\u00f1o de arquitectura segura, ayuda a los equipos a desplegar r\u00e1pido sin comprometer la seguridad.",
    },
    related: {
      heading: "Art\u00edculos Relacionados",
      articles: [
        {
          title: "Desarrollo de APIs Fintech: Mejores Pr\u00e1cticas de Seguridad y Escalabilidad",
          excerpt: "C\u00f3mo construir APIs que manejen datos financieros de forma segura mientras escalan a millones de transacciones.",
          link: "/blog/fintech-api-development-security-scalability",
        },
        {
          title: "Agentes IA en Producci\u00f3n: Construyendo Sistemas Multi-Agente Confiables",
          excerpt: "Patrones de arquitectura y consideraciones de seguridad para desplegar agentes IA en entornos de producci\u00f3n reales.",
          link: "/blog/ai-agents-production-multi-agent-systems",
        },
      ],
    },
  },
};

const APISecurityArticle = () => {
  const { t } = useTranslation(["blog", "common"]);
  const { locale } = useRouter();
  const dateLocale = locale === "es" ? "es-ES" : "en-US";
  const c = content[locale] || content.en;

  const publishDate = "2026-02-23";
  const articleUrl = "https://www.diego-rodriguez.work/blog/api-security-ai-vulnerabilities-prevention-guide";

  return (
    <>
      <SEO
        title={c.seo.title}
        description={c.seo.description}
        keywords={c.seo.keywords}
        image="/work/api-security.jpg"
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
                src="/work/api-security.jpg"
                alt={c.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute top-4 right-4">
                <BsShield className="w-12 h-12 text-accent" />
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

              {/* Vulnerability 1: Broken Authentication */}
              <section>
                <h2 className="text-3xl font-bold text-white mb-2">{c.vulnerability1.heading}</h2>
                <p className="text-accent italic mb-6">{c.vulnerability1.subtitle}</p>
                <p className="mb-6 text-lg">{c.vulnerability1.p1}</p>

                <div className="space-y-3 mb-6">
                  {c.vulnerability1.examples.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <BsLightning className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                      <p className="text-white/80">{item}</p>
                    </div>
                  ))}
                </div>

                <div className="border-l-4 border-red-500 bg-red-500/10 p-6 rounded-r-lg mb-6">
                  <p className="text-white/90 font-medium">{c.vulnerability1.realWorld}</p>
                </div>

                <h3 className="text-xl font-semibold text-white mb-4">
                  {locale === "es" ? "C\u00f3mo Corregirlo" : "How to Fix It"}
                </h3>
                <div className="space-y-3">
                  {c.vulnerability1.fixes.map((fix, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <BsCheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                      <p className="text-white/80">{fix}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Vulnerability 2: Excessive Data Exposure */}
              <section>
                <h2 className="text-3xl font-bold text-white mb-2">{c.vulnerability2.heading}</h2>
                <p className="text-accent italic mb-6">{c.vulnerability2.subtitle}</p>
                <p className="mb-6 text-lg">{c.vulnerability2.p1}</p>

                <div className="space-y-3 mb-6">
                  {c.vulnerability2.examples.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <BsLightning className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                      <p className="text-white/80">{item}</p>
                    </div>
                  ))}
                </div>

                {/* Code Examples */}
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                    <div className="text-red-400 font-semibold text-sm mb-2">
                      {locale === "es" ? "INCORRECTO" : "BAD"}
                    </div>
                    <pre className="text-xs text-white/70 overflow-x-auto whitespace-pre-wrap">
                      <code>{c.vulnerability2.codeExample.bad}</code>
                    </pre>
                  </div>
                  <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
                    <div className="text-green-400 font-semibold text-sm mb-2">
                      {locale === "es" ? "CORRECTO" : "GOOD"}
                    </div>
                    <pre className="text-xs text-white/70 overflow-x-auto whitespace-pre-wrap">
                      <code>{c.vulnerability2.codeExample.good}</code>
                    </pre>
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-white mb-4">
                  {locale === "es" ? "C\u00f3mo Corregirlo" : "How to Fix It"}
                </h3>
                <div className="space-y-3">
                  {c.vulnerability2.fixes.map((fix, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <BsCheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                      <p className="text-white/80">{fix}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Vulnerability 3: Rate Limiting Gaps */}
              <section>
                <h2 className="text-3xl font-bold text-white mb-2">{c.vulnerability3.heading}</h2>
                <p className="text-accent italic mb-6">{c.vulnerability3.subtitle}</p>
                <p className="mb-6 text-lg">{c.vulnerability3.p1}</p>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                  {c.vulnerability3.stats.map((stat, i) => (
                    <div key={i} className="bg-gradient-to-br from-accent/15 to-transparent border border-accent/20 rounded-xl p-5 text-center">
                      <div className="text-3xl font-bold text-accent mb-1">{stat.value}</div>
                      <div className="text-white/60 text-sm">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <h3 className="text-xl font-semibold text-white mb-4">
                  {locale === "es" ? "Qu\u00e9 Limitar" : "What to Rate Limit"}
                </h3>
                <div className="space-y-3 mb-6">
                  {c.vulnerability3.whatToLimit.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <BsShield className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" />
                      <p className="text-white/80">{item}</p>
                    </div>
                  ))}
                </div>

                <h3 className="text-xl font-semibold text-white mb-4">
                  {locale === "es" ? "C\u00f3mo Corregirlo" : "How to Fix It"}
                </h3>
                <div className="space-y-3">
                  {c.vulnerability3.fixes.map((fix, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <BsCheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                      <p className="text-white/80">{fix}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Vulnerability 4: Injection Attacks */}
              <section>
                <h2 className="text-3xl font-bold text-white mb-2">{c.vulnerability4.heading}</h2>
                <p className="text-accent italic mb-6">{c.vulnerability4.subtitle}</p>
                <p className="mb-6 text-lg">{c.vulnerability4.p1}</p>

                <div className="space-y-4 mb-6">
                  {c.vulnerability4.types.map((type, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-white mb-2">{type.name}</h3>
                      <p className="text-white/70">{type.description}</p>
                    </div>
                  ))}
                </div>

                <h3 className="text-xl font-semibold text-white mb-4">
                  {locale === "es" ? "C\u00f3mo Corregirlo" : "How to Fix It"}
                </h3>
                <div className="space-y-3">
                  {c.vulnerability4.fixes.map((fix, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <BsCheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                      <p className="text-white/80">{fix}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Vulnerability 5: Broken Access Control */}
              <section>
                <h2 className="text-3xl font-bold text-white mb-2">{c.vulnerability5.heading}</h2>
                <p className="text-accent italic mb-6">{c.vulnerability5.subtitle}</p>
                <p className="mb-6 text-lg">{c.vulnerability5.p1}</p>

                <div className="space-y-4 mb-6">
                  {c.vulnerability5.types.map((type, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-white mb-2">{type.name}</h3>
                      <p className="text-white/70">{type.description}</p>
                    </div>
                  ))}
                </div>

                <h3 className="text-xl font-semibold text-white mb-4">
                  {locale === "es" ? "C\u00f3mo Corregirlo" : "How to Fix It"}
                </h3>
                <div className="space-y-3">
                  {c.vulnerability5.fixes.map((fix, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <BsCheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                      <p className="text-white/80">{fix}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* AI Security Tools */}
              <section>
                <h2 className="text-3xl font-bold text-white mb-6">{c.aiTools.heading}</h2>
                <p className="mb-8 text-lg">{c.aiTools.p1}</p>

                <div className="space-y-6 mb-8">
                  {c.aiTools.tools.map((tool, i) => (
                    <div key={i} className="flex gap-4">
                      <BsRobot className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-2">{tool.name}</h3>
                        <p className="text-white/70">{tool.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-l-4 border-blue-500 bg-blue-500/10 p-6 rounded-r-lg">
                  <p className="text-white/90">{c.aiTools.callout}</p>
                </div>
              </section>

              {/* Prevention Checklist */}
              <section>
                <h2 className="text-3xl font-bold text-white mb-8">{c.checklist.heading}</h2>
                <div className="bg-white/5 border border-white/10 rounded-xl p-8">
                  <div className="space-y-4">
                    {c.checklist.items.map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-7 h-7 rounded-full bg-accent/20 text-accent flex items-center justify-center text-sm font-bold">
                          {i + 1}
                        </div>
                        <p className="text-white/80 pt-0.5">{item}</p>
                      </div>
                    ))}
                  </div>
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

export default APISecurityArticle;
