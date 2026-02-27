import { db } from "../../../lib/firebase";
import { classifyIntent, generateFAQResponse } from "../../../lib/ai";
import { sendTelegramMessage } from "../../../lib/telegram";

// ─── Rate Limiting (in-memory, 20 msgs / 5 min per session) ─────────────────
const rateLimitMap = new Map();

function isRateLimited(sessionId) {
  const now = Date.now();
  const window = 5 * 60 * 1000;
  const times = (rateLimitMap.get(sessionId) || []).filter((t) => now - t < window);
  if (times.length >= 20) return true;
  times.push(now);
  rateLimitMap.set(sessionId, times);
  return false;
}

// ─── Response Builders ───────────────────────────────────────────────────────

const CV_URL = process.env.NEXT_PUBLIC_CV_URL || "/documents/Diego_Rodriguez_CV.pdf";

function getDefaultOptions(lang) {
  return lang === "es"
    ? [
        { label: "💼 Contratar a Diego", action: "HIRE_DIEGO" },
        { label: "💰 Obtener Presupuesto", action: "GET_BUDGET" },
        { label: "📅 Agendar una Llamada", action: "SCHEDULE_CALL" },
      ]
    : [
        { label: "💼 Hire Diego", action: "HIRE_DIEGO" },
        { label: "💰 Get a Quote", action: "GET_BUDGET" },
        { label: "📅 Schedule a Call", action: "SCHEDULE_CALL" },
      ];
}

function handleDownloadCV(lang, leadData) {
  return {
    messages: [
      {
        role: "bot",
        text: lang === "es"
          ? "¡Aquí está el CV actualizado de Diego!"
          : "Here's Diego's latest CV!",
        download: { url: CV_URL, label: lang === "es" ? "📥 Descargar CV" : "📥 Download CV" },
      },
      {
        role: "bot",
        text: lang === "es" ? "¿En qué más puedo ayudarte?" : "Anything else I can help with?",
        quickOptions: getDefaultOptions(lang),
      },
    ],
    flow: "cv",
    flowStep: "done",
    leadData,
  };
}

function handleHireFlow(lang, leadData) {
  return {
    messages: [
      {
        role: "bot",
        text: lang === "es"
          ? "¡Genial! ¿Cuál es tu nombre?"
          : "Great! What's your name?",
      },
    ],
    flow: "hire",
    flowStep: "collect_name",
    leadData,
  };
}

function handleBudgetFlow(lang, leadData) {
  return {
    messages: [
      {
        role: "bot",
        text: lang === "es"
          ? "¡Perfecto! ¿Cuál es tu nombre?"
          : "Perfect! What's your name?",
      },
    ],
    flow: "budget",
    flowStep: "collect_name",
    leadData,
  };
}

function handleScheduleCall(lang, leadData) {
  return {
    messages: [
      {
        role: "bot",
        text: lang === "es"
          ? "¡El calendario de Diego está a un clic de distancia!"
          : "Diego's calendar is one click away!",
        link: { url: "/schedule", label: lang === "es" ? "📅 Abrir Agenda" : "📅 Open Schedule", external: false },
      },
    ],
    flow: "schedule",
    flowStep: "done",
    leadData,
  };
}

function handleGreeting(lang, leadData) {
  return {
    messages: [
      {
        role: "bot",
        text: lang === "es"
          ? "¡Hola! Soy Diego Bot 👋 ¿En qué te puedo ayudar?"
          : "Hi! I'm Diego Bot 👋 What would you like to do?",
        quickOptions: lang === "es"
          ? [
              { label: "📄 Descargar CV", action: "DOWNLOAD_CV" },
              { label: "💼 Contratar a Diego", action: "HIRE_DIEGO" },
              { label: "💰 Obtener Presupuesto", action: "GET_BUDGET" },
              { label: "📅 Agendar una Llamada", action: "SCHEDULE_CALL" },
            ]
          : [
              { label: "📄 Download CV", action: "DOWNLOAD_CV" },
              { label: "💼 Hire Diego", action: "HIRE_DIEGO" },
              { label: "💰 Get a Quote", action: "GET_BUDGET" },
              { label: "📅 Schedule a Call", action: "SCHEDULE_CALL" },
            ],
      },
    ],
    flow: null,
    flowStep: null,
    leadData,
  };
}

function handleProvideName(message, leadData, flow, lang) {
  const name = message.trim().split(/\s+/)[0]; // first word as greeting name
  const fullName = message.trim();
  return {
    messages: [
      {
        role: "bot",
        text: lang === "es"
          ? `¡Encantado, ${name}! ¿De qué empresa o proyecto estás escribiendo?`
          : `Nice to meet you, ${name}! What company or project are you reaching out about?`,
      },
    ],
    flow,
    flowStep: "collect_company",
    leadData: { ...leadData, name: fullName },
  };
}

function handleProvideCompany(message, leadData, flow, lang) {
  const company = message.trim();
  return {
    messages: [
      {
        role: "bot",
        text: lang === "es"
          ? `Perfecto. ¿Cuál es tu email de trabajo para que Diego pueda contactarte?`
          : `Got it! What's your work email so Diego can reach you?`,
      },
    ],
    flow,
    flowStep: "collect_email",
    leadData: { ...leadData, company },
  };
}

async function handleProvideEmail(message, leadData, flow, lang, sessionId, pageUrl) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const email = message.trim();

  if (!emailRegex.test(email)) {
    return {
      messages: [
        {
          role: "bot",
          text: lang === "es"
            ? "Ese email no parece válido. ¿Puedes verificarlo?"
            : "That email doesn't look valid. Could you double-check it?",
        },
      ],
      flow,
      flowStep: "collect_email",
      leadData,
    };
  }

  const newLeadData = {
    ...leadData,
    email,
    interest: flow === "hire" ? "hire" : "budget",
    capturedAt: new Date().toISOString(),
  };

  // Save lead to Firestore (update session doc)
  try {
    await db.collection("chat_sessions").doc(sessionId).update({
      leadCaptured: true,
      leadData: newLeadData,
      updatedAt: new Date(),
    });
  } catch (err) {
    console.error("Lead save error:", err);
  }

  // Telegram notification for lead
  const interest = flow === "hire" ? "Hire" : "Budget Quote";
  const page = pageUrl || "/";
  try {
    await sendTelegramMessage(
      `🔥 <b>New Lead — ${interest}</b>\n` +
      `👤 Name: ${newLeadData.name || "unknown"}\n` +
      `🏢 Company: ${newLeadData.company || "—"}\n` +
      `📧 Email: <a href="mailto:${email}">${email}</a>\n` +
      `📍 Page: ${page}`
    );
  } catch (err) {
    console.error("Lead Telegram notify error:", err);
  }

  return {
    messages: [
      {
        role: "bot",
        text: lang === "es"
          ? `¡Perfecto! Diego se pondrá en contacto contigo en menos de 24h a ${email}.\n\nMientras tanto, ¿agendamos una llamada rápida?`
          : `Diego will be in touch within 24h at ${email}.\n\nMeanwhile, want to schedule a quick call?`,
        link: { url: "/schedule", label: lang === "es" ? "📅 Agendar Llamada" : "📅 Schedule a Call", external: false },
      },
    ],
    flow,
    flowStep: "done",
    leadData: newLeadData,
  };
}

// ─── Firestore Session Update ────────────────────────────────────────────────

async function updateSession(sessionId, userMsg, botMessages, locale, pageUrl, flow, leadData) {
  try {
    const ref = db.collection("chat_sessions").doc(sessionId);
    const doc = await ref.get();

    const newMessages = [
      userMsg,
      ...botMessages.map((m) => ({ role: m.role, text: m.text, ts: new Date() })),
    ];

    if (!doc.exists) {
      await ref.set({
        sessionId,
        locale,
        createdAt: new Date(),
        updatedAt: new Date(),
        pageUrl,
        flow: flow || null,
        flowStep: null,
        flowCompleted: false,
        leadCaptured: false,
        leadData: leadData || {},
        messages: newMessages,
        telegramNotified: false,
        telegramMessageId: null,
      });
    } else {
      const existing = doc.data().messages || [];
      await ref.update({
        updatedAt: new Date(),
        pageUrl,
        flow: flow || null,
        leadData: leadData || {},
        messages: [...existing, ...newMessages],
      });
    }
  } catch (err) {
    console.error("Session update error:", err);
  }
}

// ─── Telegram: notify on first user message ──────────────────────────────────

async function maybeNotifyFirstMessage(sessionId, message, pageUrl) {
  try {
    const ref = db.collection("chat_sessions").doc(sessionId);
    const doc = await ref.get();
    if (!doc.exists || doc.data().telegramNotified) return;

    await sendTelegramMessage(
      `💬 <b>New Chat Session</b>\n` +
      `📍 Page: ${pageUrl || "/"}\n` +
      `💬 First message: "${message.slice(0, 100)}"`
    );

    await ref.update({ telegramNotified: true });
  } catch (err) {
    console.error("First-message Telegram notify error:", err);
  }
}

// ─── Main Handler ────────────────────────────────────────────────────────────

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const {
    sessionId,
    message,
    action,
    flow,
    flowStep,
    leadData = {},
    history = [],
    locale = "en",
    pageUrl = "/",
  } = req.body;

  if (!sessionId || !message) {
    return res.status(400).json({ error: "sessionId and message are required" });
  }

  if (isRateLimited(sessionId)) {
    return res.status(429).json({ error: "Too many messages. Please wait a moment." });
  }

  let intent = action || null;
  let language = locale;

  // If inside a multi-step flow, use flow context instead of AI
  if (!intent && (flow === "hire" || flow === "budget")) {
    if (flowStep === "collect_name") intent = "PROVIDE_NAME";
    else if (flowStep === "collect_company") intent = "PROVIDE_COMPANY";
    else if (flowStep === "collect_email") intent = "PROVIDE_EMAIL";
  }

  // Classify intent with AI if not determined
  if (!intent) {
    const classified = await classifyIntent(message, history, locale);
    intent = classified.intent;
    language = classified.language || locale;
  }

  let response;

  switch (intent) {
    case "DOWNLOAD_CV":
      response = handleDownloadCV(language, leadData);
      break;

    case "HIRE_DIEGO":
      response = handleHireFlow(language, leadData);
      break;

    case "GET_BUDGET":
      response = handleBudgetFlow(language, leadData);
      break;

    case "SCHEDULE_CALL":
      response = handleScheduleCall(language, leadData);
      break;

    case "GREETING":
      response = handleGreeting(language, leadData);
      break;

    case "PROVIDE_NAME":
      response = handleProvideName(message, leadData, flow, language);
      break;

    case "PROVIDE_COMPANY":
      response = handleProvideCompany(message, leadData, flow, language);
      break;

    case "PROVIDE_EMAIL":
      response = await handleProvideEmail(message, leadData, flow, language, sessionId, pageUrl);
      break;

    case "OTHER": {
      // Off-topic — redirect without calling AI
      response = {
        messages: [
          {
            role: "bot",
            text: language === "es"
              ? "Solo puedo ayudarte con preguntas sobre Diego y sus servicios. ¿Te gustaría agendar una llamada o pedir un presupuesto?"
              : "I can only help with questions about Diego and his services. Would you like to schedule a call or get a quote?",
            quickOptions: [
              ...(language === "es"
                ? [{ label: "📄 Descargar CV", action: "DOWNLOAD_CV" }]
                : [{ label: "📄 Download CV", action: "DOWNLOAD_CV" }]),
              ...getDefaultOptions(language),
            ],
          },
        ],
        flow: null,
        flowStep: null,
        leadData,
      };
      break;
    }

    default: {
      // GENERAL_QUESTION → FAQ mode via AI
      const faqText = await generateFAQResponse(message, history, language);
      response = {
        messages: [
          { role: "bot", text: faqText },
          {
            role: "bot",
            text: language === "es"
              ? "¿En qué más puedo ayudarte?"
              : "Anything else I can help with?",
            quickOptions: [
              ...(language === "es"
                ? [{ label: "📄 Descargar CV", action: "DOWNLOAD_CV" }]
                : [{ label: "📄 Download CV", action: "DOWNLOAD_CV" }]),
              ...getDefaultOptions(language),
            ],
          },
        ],
        flow: "free",
        flowStep: null,
        leadData,
      };
    }
  }

  const userMsg = { role: "user", text: message, intent, ts: new Date() };

  // Fire-and-forget: Firestore save + first-message Telegram notify
  updateSession(sessionId, userMsg, response.messages, locale, pageUrl, response.flow, response.leadData).catch(() => {});
  maybeNotifyFirstMessage(sessionId, message, pageUrl).catch(() => {});

  return res.status(200).json(response);
}
