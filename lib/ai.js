import { db } from "./firebase";

// ─── Prompts ────────────────────────────────────────────────────────────────

const INTENT_PROMPT = `You are an intent classifier for Diego Rodriguez's portfolio chatbot.

Classify the user's message into exactly one of these intents:
- DOWNLOAD_CV: wants to download/see resume/CV/curriculum
- HIRE_DIEGO: wants to hire Diego, work together, start a project, needs a developer
- GET_BUDGET: wants a price/cost quote, budget estimate, how much does it cost
- SCHEDULE_CALL: wants to book a meeting, schedule a call, talk with Diego
- GENERAL_QUESTION: any other question about Diego, his skills, technologies, availability, experience
- PROVIDE_NAME: user is providing their name (they were just asked for it)
- PROVIDE_EMAIL: user is providing their email address (they were just asked for it)
- GREETING: hello, hi, hey, hola, good morning, etc.
- OTHER: anything unrelated to Diego or his services

Respond with ONLY valid JSON (no markdown, no code blocks):
{"intent": "INTENT_NAME", "confidence": 0.0-1.0, "language": "en|es"}`;

const DIEGO_CONTEXT_PROMPT = `You are Diego Bot, the official AI assistant embedded in Diego Rodriguez's portfolio website.
You have full knowledge about Diego and his work. Never say you lack access to his portfolio — you ARE his portfolio assistant.

About Diego Rodriguez:
- Full-Stack & AI Engineer, 9+ years experience, based in Montevideo, Uruguay (UTC-3)
- Specializes in: React, Next.js, Node.js, TypeScript, Python
- Also works with: PostgreSQL, MongoDB, Firebase, AWS, Docker, LLM orchestration, RAG pipelines, ML systems
- Available for freelance projects and full-time remote positions
- Responds to all inquiries within 24 hours

Services:
- Full-Stack Web App Development (React/Next.js + Node.js/Python backends)
- AI/ML integrations (LLM orchestration, RAG, embeddings, ML-driven features)
- Frontend Development (React, Next.js, Framer Motion, responsive/animated UI)
- Backend & API Development (REST, GraphQL, microservices)
- Technical Consulting and architecture reviews

Portfolio highlights:
- AI-powered trading systems and algorithmic bots
- RAG pipelines and LLM orchestration platforms
- Full-stack SaaS products and e-commerce platforms
- Chrome extensions and Web3/DeFi tools

Pricing:
- No fixed public rates — each project is quoted based on scope and timeline
- Free 30-minute discovery call to discuss requirements
- Typical projects range from small automations to enterprise-scale platforms

Contact:
- Schedule a call: /schedule (on this site)
- Contact form: /contact (on this site)

STRICT RULES:
- Respond in the EXACT same language as the user (Spanish if they write Spanish, English otherwise)
- Be friendly, direct, and concise — max 120 words
- NEVER say you lack access to the portfolio or projects — you know everything about Diego
- NEVER use markdown links like [text](url) — write plain text only, no markdown formatting
- ONLY answer questions related to Diego, his skills, services, portfolio, availability, or pricing
- If the user asks something completely unrelated to Diego (coding tutorials, general questions, other topics), politely redirect: explain you only help with Diego-related questions and suggest booking a call or getting a quote
- After answering, naturally suggest booking a call or getting a quote`;

// ─── Keyword Fallback ────────────────────────────────────────────────────────

const KEYWORD_MAP = {
  DOWNLOAD_CV: ["cv", "resume", "curriculum", "download", "descargar", "currículum", "vitae"],
  HIRE_DIEGO: ["hire", "contratar", "work together", "trabajar", "project", "proyecto", "help me build", "necesito un", "need a developer"],
  GET_BUDGET: ["quote", "price", "cost", "presupuesto", "precio", "costo", "cuánto", "how much", "budget", "rate", "tarifa"],
  SCHEDULE_CALL: ["schedule", "meeting", "call", "reunión", "cita", "book", "agenda", "meet", "hablar", "talk"],
  GREETING: ["hi", "hello", "hey", "hola", "buenos", "good morning", "good afternoon", "buenas", "saludos"],
};

function detectLanguage(text) {
  const lower = text.toLowerCase();
  const esWords = ["hola", "el", "la", "de", "que", "y", "en", "es", "un", "por", "con", "para", "me", "mi", "lo", "si", "no", "tu", "su"];
  const words = lower.split(/\s+/);
  const esCount = words.filter((w) => esWords.includes(w)).length;
  return esCount >= 2 ? "es" : "en";
}

function keywordFallback(message) {
  const lower = message.toLowerCase();
  for (const [intent, keywords] of Object.entries(KEYWORD_MAP)) {
    if (keywords.some((kw) => lower.includes(kw))) {
      return { intent, confidence: 0.6, language: detectLanguage(lower) };
    }
  }
  return { intent: "GENERAL_QUESTION", confidence: 0.5, language: detectLanguage(lower) };
}

// ─── Usage Tracking ──────────────────────────────────────────────────────────

async function incrementUsage(provider, type) {
  try {
    const today = new Date().toISOString().slice(0, 10);
    const ref = db.collection("ai_usage").doc("daily");
    const doc = await ref.get();
    const data = doc.exists ? doc.data() : {};

    if (data.date !== today) {
      await ref.set({
        date: today,
        groq: { intents: 0, faq: 0 },
        gemini: { intents: 0, faq: 0 },
        openrouter: { intents: 0, faq: 0 },
      });
      return;
    }

    await ref.update({
      [`${provider}.${type}`]: (data[provider]?.[type] || 0) + 1,
    });
  } catch (err) {
    console.error("AI usage tracking error:", err.message);
  }
}

// ─── Provider Callers ────────────────────────────────────────────────────────

async function callGroq(messages, isIntent) {
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant",
      messages,
      temperature: isIntent ? 0.1 : 0.7,
      max_tokens: isIntent ? 120 : 350,
    }),
    signal: AbortSignal.timeout(5000),
  });

  if (!res.ok) throw new Error(`Groq HTTP ${res.status}`);
  const data = await res.json();
  return data.choices[0].message.content;
}

async function callGemini(messages, isIntent) {
  const systemMsg = messages.find((m) => m.role === "system");
  const chatMsgs = messages.filter((m) => m.role !== "system");

  const contents = chatMsgs.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

  const body = {
    contents,
    generationConfig: {
      temperature: isIntent ? 0.1 : 0.7,
      maxOutputTokens: isIntent ? 120 : 350,
    },
  };

  if (systemMsg) {
    body.systemInstruction = { parts: [{ text: systemMsg.content }] };
  }

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(8000),
    }
  );

  if (!res.ok) throw new Error(`Gemini HTTP ${res.status}`);
  const data = await res.json();
  return data.candidates[0].content.parts[0].text;
}

async function callOpenRouter(messages, isIntent) {
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "HTTP-Referer": "https://www.diego-rodriguez.work",
      "X-Title": "Diego Rodriguez Portfolio",
    },
    body: JSON.stringify({
      model: "meta-llama/llama-3.1-8b-instruct:free",
      messages,
      temperature: isIntent ? 0.1 : 0.7,
      max_tokens: isIntent ? 120 : 350,
    }),
    signal: AbortSignal.timeout(10000),
  });

  if (!res.ok) throw new Error(`OpenRouter HTTP ${res.status}`);
  const data = await res.json();
  return data.choices[0].message.content;
}

// ─── Rotation Cascade ────────────────────────────────────────────────────────

async function callAI(messages, isIntent) {
  const usageType = isIntent ? "intents" : "faq";

  if (process.env.GROQ_API_KEY) {
    try {
      const result = await callGroq(messages, isIntent);
      incrementUsage("groq", usageType).catch(() => {});
      return result;
    } catch (err) {
      console.warn("Groq failed, trying Gemini:", err.message);
    }
  }

  if (process.env.GEMINI_API_KEY) {
    try {
      const result = await callGemini(messages, isIntent);
      incrementUsage("gemini", usageType).catch(() => {});
      return result;
    } catch (err) {
      console.warn("Gemini failed, trying OpenRouter:", err.message);
    }
  }

  if (process.env.OPENROUTER_API_KEY) {
    try {
      const result = await callOpenRouter(messages, isIntent);
      incrementUsage("openrouter", usageType).catch(() => {});
      return result;
    } catch (err) {
      console.warn("OpenRouter failed, using keyword fallback:", err.message);
    }
  }

  return null;
}

// ─── Public API ──────────────────────────────────────────────────────────────

export async function classifyIntent(message, history = [], locale = "en") {
  const messages = [
    { role: "system", content: INTENT_PROMPT },
    ...history
      .slice(-4)
      .map((m) => ({ role: m.role === "bot" ? "assistant" : "user", content: m.text })),
    { role: "user", content: message },
  ];

  try {
    const raw = await callAI(messages, true);
    if (!raw) return keywordFallback(message);

    // Extract JSON from response (model may wrap it in markdown)
    const match = raw.match(/\{[^{}]+\}/);
    if (!match) return keywordFallback(message);

    const parsed = JSON.parse(match[0]);
    if (!parsed.intent) return keywordFallback(message);

    return {
      intent: parsed.intent,
      confidence: parsed.confidence || 0.8,
      language: parsed.language || locale,
    };
  } catch {
    return keywordFallback(message);
  }
}

export async function generateFAQResponse(message, history = [], locale = "en") {
  const messages = [
    { role: "system", content: DIEGO_CONTEXT_PROMPT },
    ...history
      .slice(-6)
      .map((m) => ({ role: m.role === "bot" ? "assistant" : "user", content: m.text })),
    { role: "user", content: message },
  ];

  const fallback =
    locale === "es"
      ? "Diego es un Ingeniero Full-Stack & AI. Para más detalles, puedes contactarlo directamente en diego-rodriguez.work/contact"
      : "Diego is a Full-Stack & AI Engineer. For more details, you can contact him directly at diego-rodriguez.work/contact";

  try {
    const raw = await callAI(messages, false);
    return raw ? raw.trim() : fallback;
  } catch {
    return fallback;
  }
}
