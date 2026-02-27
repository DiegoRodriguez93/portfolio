import { useReducer, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import { HiXMark } from "react-icons/hi2";
import { HiPaperAirplane } from "react-icons/hi2";

// ─── UI Strings (inline by locale to avoid namespace loading complexity) ──────

const UI = {
  en: {
    title: "Diego Bot",
    subtitle: "AI assistant · Usually replies instantly",
    placeholder: "Ask me anything...",
    greeting: "Hi! I'm Diego Bot 👋 What would you like to do?",
    options: [
      { label: "📄 Download CV", action: "DOWNLOAD_CV" },
      { label: "💼 Hire Diego", action: "HIRE_DIEGO" },
      { label: "💰 Get a Quote", action: "GET_BUDGET" },
      { label: "📅 Schedule a Call", action: "SCHEDULE_CALL" },
    ],
    rateLimited: "You've sent too many messages. Please wait a moment and try again.",
    errorMsg: "Something went wrong. Please try again.",
    openAria: "Open Diego Bot chat",
    closeAria: "Close chat",
    poweredBy: "Powered by AI",
  },
  es: {
    title: "Diego Bot",
    subtitle: "Asistente IA · Responde al instante",
    placeholder: "Pregúntame lo que quieras...",
    greeting: "¡Hola! Soy Diego Bot 👋 ¿En qué te puedo ayudar?",
    options: [
      { label: "📄 Descargar CV", action: "DOWNLOAD_CV" },
      { label: "💼 Contratar a Diego", action: "HIRE_DIEGO" },
      { label: "💰 Obtener Presupuesto", action: "GET_BUDGET" },
      { label: "📅 Agendar una Llamada", action: "SCHEDULE_CALL" },
    ],
    rateLimited: "Has enviado demasiados mensajes. Por favor espera un momento.",
    errorMsg: "Algo salió mal. Por favor intenta de nuevo.",
    openAria: "Abrir chat Diego Bot",
    closeAria: "Cerrar chat",
    poweredBy: "Impulsado por IA",
  },
};

// ─── Reducer ─────────────────────────────────────────────────────────────────

const INITIAL_STATE = {
  isOpen: false,
  hasUnread: false,
  sessionId: null,
  messages: [],
  flow: null,
  flowStep: null,
  leadData: {},
  isTyping: false,
  inputValue: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "OPEN":
      return { ...state, isOpen: true, hasUnread: false };
    case "CLOSE":
      return { ...state, isOpen: false };
    case "TOGGLE":
      return { ...state, isOpen: !state.isOpen, hasUnread: state.isOpen ? state.hasUnread : false };
    case "SET_SESSION_ID":
      return { ...state, sessionId: action.sessionId };
    case "SET_MESSAGES":
      return { ...state, messages: action.messages };
    case "ADD_MESSAGES":
      return {
        ...state,
        messages: [...state.messages, ...action.messages],
        flow: action.flow !== undefined ? action.flow : state.flow,
        flowStep: action.flowStep !== undefined ? action.flowStep : state.flowStep,
        leadData: action.leadData !== undefined ? action.leadData : state.leadData,
        isTyping: false,
        hasUnread: !state.isOpen,
      };
    case "SET_TYPING":
      return { ...state, isTyping: action.value };
    case "SET_INPUT":
      return { ...state, inputValue: action.value };
    default:
      return state;
  }
}

// ─── Parse markdown links and plain URLs into JSX ────────────────────────────

function parseLinks(text) {
  // Match [label](url) or bare https?:// URLs
  const pattern = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|(https?:\/\/[^\s]+)/g;
  const parts = [];
  let last = 0;
  let match;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) parts.push(text.slice(last, match.index));

    if (match[1]) {
      // Markdown link: [label](url)
      parts.push(
        <a key={match.index} href={match[2]} target="_blank" rel="noopener noreferrer"
          className="text-accent underline underline-offset-2 hover:text-accent/80">
          {match[1]}
        </a>
      );
    } else {
      // Bare URL
      parts.push(
        <a key={match.index} href={match[3]} target="_blank" rel="noopener noreferrer"
          className="text-accent underline underline-offset-2 hover:text-accent/80">
          {match[3]}
        </a>
      );
    }
    last = match.index + match[0].length;
  }

  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

// ─── Message Bubble Component ─────────────────────────────────────────────────

function MessageBubble({ msg, isLast, onOptionClick }) {
  const isBot = msg.role === "bot";

  return (
    <div className={`flex flex-col gap-1 ${isBot ? "items-start" : "items-end"}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
          isBot
            ? "bg-white/5 border border-white/10 text-white rounded-tl-sm"
            : "bg-accent/20 border border-accent/30 text-white rounded-tr-sm"
        }`}
      >
        <p className="whitespace-pre-wrap break-words">{parseLinks(msg.text)}</p>

        {/* Download button */}
        {msg.download && (
          <a
            href={msg.download.url}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent text-white text-xs font-medium hover:bg-accent/80 transition-colors"
            style={{ backgroundColor: "#F13024" }}
          >
            {msg.download.label}
          </a>
        )}

        {/* Link button */}
        {msg.link && (
          <a
            href={msg.link.url}
            target={msg.link.external ? "_blank" : "_self"}
            rel={msg.link.external ? "noopener noreferrer" : undefined}
            className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-accent/40 text-accent text-xs font-medium hover:bg-accent/10 transition-colors"
          >
            {msg.link.label}
          </a>
        )}
      </div>

      {/* Quick option buttons — only on last bot message */}
      {isBot && isLast && msg.quickOptions && msg.quickOptions.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-1 max-w-[95%]">
          {msg.quickOptions.map((opt) => (
            <button
              key={opt.action}
              onClick={() => onOptionClick(opt.label, opt.action)}
              className="px-2.5 py-1 rounded-full text-xs border border-white/20 text-white/80 hover:border-accent hover:text-accent transition-all duration-200 whitespace-nowrap"
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Typing Indicator ─────────────────────────────────────────────────────────

function TypingIndicator() {
  return (
    <div className="flex items-start">
      <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-sm px-3 py-2.5">
        <div className="flex gap-1 items-center h-4">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-white/50"
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main ChatBot Component ───────────────────────────────────────────────────

export default function ChatBot() {
  const router = useRouter();
  const locale = router.locale || "en";
  const ui = UI[locale] || UI.en;

  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const hasGreeted = useRef(false);
  const prevLocaleRef = useRef(locale);

  // Init session ID from localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    let sid = localStorage.getItem("chatbot-session-id");
    if (!sid) {
      sid = typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
      localStorage.setItem("chatbot-session-id", sid);
    }
    dispatch({ type: "SET_SESSION_ID", sessionId: sid });
  }, []);

  // Auto-open on desktop: only first visit, never if user already dismissed
  useEffect(() => {
    if (typeof window === "undefined") return;
    const dismissed = localStorage.getItem("chatbot-dismissed");
    const autoOpened = localStorage.getItem("chatbot-auto-opened");
    if (!dismissed && !autoOpened && window.innerWidth >= 1280) {
      const timer = setTimeout(() => {
        dispatch({ type: "OPEN" });
        localStorage.setItem("chatbot-auto-opened", "true");
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, []); // empty deps: runs once on mount, not on route changes

  // Reset greeting when locale changes, but only if no active conversation
  useEffect(() => {
    if (prevLocaleRef.current !== locale) {
      prevLocaleRef.current = locale;
      const hasUserMessages = state.messages.some((m) => m.role === "user");
      if (!hasUserMessages) {
        hasGreeted.current = false;
        dispatch({ type: "SET_MESSAGES", messages: [] });
      }
    }
  }, [locale, state.messages]);

  // Show greeting on first open
  useEffect(() => {
    if (state.isOpen && state.messages.length === 0 && !hasGreeted.current) {
      hasGreeted.current = true;
      dispatch({
        type: "ADD_MESSAGES",
        messages: [
          {
            role: "bot",
            text: ui.greeting,
            quickOptions: ui.options,
          },
        ],
      });
    }
  }, [state.isOpen, state.messages.length, ui.greeting, ui.options]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (state.isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [state.messages, state.isTyping, state.isOpen]);

  // Focus input when chat opens
  useEffect(() => {
    if (state.isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [state.isOpen]);

  // ─── Send Message ───────────────────────────────────────────────────────────

  const sendMessage = useCallback(
    async (text, action = null) => {
      const trimmed = text.trim();
      if (!trimmed || state.isTyping) return;

      dispatch({ type: "SET_INPUT", value: "" });
      dispatch({ type: "ADD_MESSAGES", messages: [{ role: "user", text: trimmed }] });
      dispatch({ type: "SET_TYPING", value: true });

      try {
        const res = await fetch("/api/chatbot/message", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId: state.sessionId,
            message: trimmed,
            action,
            flow: state.flow,
            flowStep: state.flowStep,
            leadData: state.leadData,
            history: state.messages.slice(-6),
            locale,
            pageUrl: window.location.pathname,
          }),
        });

        if (res.status === 429) {
          dispatch({
            type: "ADD_MESSAGES",
            messages: [{ role: "bot", text: ui.rateLimited }],
          });
          return;
        }

        const data = await res.json();

        if (!res.ok) {
          dispatch({
            type: "ADD_MESSAGES",
            messages: [{ role: "bot", text: ui.errorMsg }],
          });
          return;
        }

        dispatch({
          type: "ADD_MESSAGES",
          messages: data.messages || [],
          flow: data.flow,
          flowStep: data.flowStep,
          leadData: data.leadData,
        });
      } catch {
        dispatch({
          type: "ADD_MESSAGES",
          messages: [{ role: "bot", text: ui.errorMsg }],
        });
      }
    },
    [state.sessionId, state.flow, state.flowStep, state.leadData, state.messages, state.isTyping, locale, ui]
  );

  const handleClose = () => {
    dispatch({ type: "CLOSE" });
    localStorage.setItem("chatbot-dismissed", "true");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(state.inputValue);
  };

  const handleOptionClick = (label, action) => {
    sendMessage(label, action);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(state.inputValue);
    }
  };

  // ─── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="fixed bottom-24 right-4 xl:bottom-6 xl:right-24 z-40">
      {/* Chat Window */}
      <AnimatePresence>
        {state.isOpen && (
          <motion.div
            key="chat-window"
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ type: "spring", damping: 24, stiffness: 300 }}
            className="absolute bottom-full mb-3 right-0 w-[360px] max-w-[calc(100vw-2rem)] flex flex-col rounded-2xl overflow-hidden shadow-2xl"
            style={{
              height: "min(500px, calc(100dvh - 12rem))",
              background: "rgba(17, 14, 31, 0.97)",
              border: "1px solid rgba(255,255,255,0.1)",
              backdropFilter: "blur(12px)",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center gap-3 px-4 py-3 shrink-0"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
            >
              {/* Avatar */}
              <div className="w-9 h-9 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center shrink-0 text-lg"
                style={{ backgroundColor: "rgba(241,48,36,0.15)" }}>
                🤖
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white leading-tight">{ui.title}</p>
                <p className="text-[11px] text-white/50 leading-tight truncate">{ui.subtitle}</p>
              </div>
              <button
                onClick={handleClose}
                className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-all duration-200"
                aria-label={ui.closeAria}
              >
                <HiXMark className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-3 py-3 flex flex-col gap-2.5 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              {state.messages.map((msg, i) => (
                <MessageBubble
                  key={i}
                  msg={msg}
                  isLast={i === state.messages.length - 1}
                  onOptionClick={handleOptionClick}
                />
              ))}
              {state.isTyping && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>

            {/* Footer: Input */}
            <form
              onSubmit={handleSubmit}
              className="shrink-0 flex items-center gap-2 px-3 py-2.5"
              style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
            >
              <input
                ref={inputRef}
                type="text"
                value={state.inputValue}
                onChange={(e) => dispatch({ type: "SET_INPUT", value: e.target.value })}
                onKeyDown={handleKeyDown}
                placeholder={ui.placeholder}
                disabled={state.isTyping}
                className="flex-1 min-w-0 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder:text-white/30 outline-none focus:border-white/25 transition-colors disabled:opacity-50"
                autoComplete="off"
              />
              <button
                type="submit"
                disabled={!state.inputValue.trim() || state.isTyping}
                className="shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-white transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
                style={{ backgroundColor: "#F13024" }}
                aria-label="Send"
              >
                <HiPaperAirplane className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bubble Button */}
      <motion.button
        onClick={() => state.isOpen ? handleClose() : dispatch({ type: "OPEN" })}
        aria-label={state.isOpen ? ui.closeAria : ui.openAria}
        animate={!state.isOpen ? { y: [0, -6, 0] } : {}}
        transition={!state.isOpen ? { duration: 2.4, repeat: Infinity, ease: "easeInOut" } : {}}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.93 }}
        className="relative w-14 h-14 rounded-full flex items-center justify-center text-white text-2xl overflow-hidden"
        style={{ backgroundColor: "#F13024" }}
      >
        {/* Ambient glow ring when closed */}
        {!state.isOpen && (
          <motion.span
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{ boxShadow: "0 0 0 0 rgba(241,48,36,0.5)" }}
            animate={{ boxShadow: ["0 0 0 0px rgba(241,48,36,0.4)", "0 0 0 10px rgba(241,48,36,0)", "0 0 0 0px rgba(241,48,36,0)"] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
          />
        )}

        {/* Pulse ring when unread */}
        {state.hasUnread && (
          <motion.span
            className="absolute inset-0 rounded-full"
            style={{ border: "2px solid #F13024" }}
            animate={{ scale: [1, 1.5, 1.5], opacity: [0.8, 0, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}

        <AnimatePresence mode="wait">
          {state.isOpen ? (
            <motion.span
              key="close"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.15 }}
            >
              <HiXMark className="w-6 h-6" />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.15 }}
              className="text-2xl"
            >
              💬
            </motion.span>
          )}
        </AnimatePresence>

        {/* Unread badge */}
        {state.hasUnread && (
          <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-yellow-400 border-2 border-primary" />
        )}
      </motion.button>
    </div>
  );
}
