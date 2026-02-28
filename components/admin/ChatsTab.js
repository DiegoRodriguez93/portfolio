import { useState, useEffect, useCallback, useRef } from "react";

export default function ChatsTab({ adminPass }) {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);
  const messagesEndRef = useRef(null);

  const fetchSessions = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/chatbot/sessions?filter=${filter}&limit=100`, {
        headers: { "x-admin-password": adminPass },
      });
      const data = await res.json();
      setSessions(data.sessions || []);
    } catch {
      setSessions([]);
    } finally {
      setLoading(false);
    }
  }, [adminPass, filter]);

  useEffect(() => { fetchSessions(); }, [fetchSessions]);

  useEffect(() => {
    if (selected) {
      setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
    }
  }, [selected]);

  // Update selected when sessions refresh
  useEffect(() => {
    if (selected) {
      const updated = sessions.find((s) => s.id === selected.id);
      if (updated) setSelected(updated);
    }
  }, [sessions]);

  function formatTs(iso) {
    if (!iso) return "—";
    return new Date(iso).toLocaleString("en-US", {
      timeZone: "America/Montevideo",
      month: "short", day: "numeric",
      hour: "2-digit", minute: "2-digit",
    });
  }

  function firstUserMessage(session) {
    const msg = session.messages.find((m) => m.role === "user");
    return msg ? msg.text.slice(0, 60) : "(no messages)";
  }

  const inputCls = "w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-red-500";

  return (
    <div className="flex gap-4" style={{ minHeight: "520px" }}>
      {/* Session List */}
      <div className="w-72 shrink-0 flex flex-col gap-2">
        <div className="flex gap-2 mb-1">
          {["all", "leads"].map((f) => (
            <button
              key={f}
              onClick={() => { setFilter(f); setSelected(null); }}
              className={`px-3 py-1 rounded-lg text-xs capitalize transition-colors ${filter === f ? "bg-red-600 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"}`}
            >
              {f === "leads" ? "Leads only" : "All chats"}
            </button>
          ))}
          <button onClick={fetchSessions} className="ml-auto px-2 py-1 bg-gray-800 text-gray-400 rounded-lg text-xs hover:bg-gray-700">
            ↻
          </button>
        </div>

        {loading && <p className="text-gray-500 text-sm text-center py-8">Loading...</p>}
        {!loading && sessions.length === 0 && (
          <p className="text-gray-500 text-sm text-center py-8">No sessions found</p>
        )}

        <div className="flex flex-col gap-1.5 overflow-y-auto" style={{ maxHeight: "480px" }}>
          {sessions.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelected(s)}
              className={`w-full text-left rounded-xl p-3 transition-colors border ${
                selected?.id === s.id
                  ? "bg-gray-700 border-red-600/50"
                  : "bg-gray-800 border-gray-700 hover:bg-gray-750 hover:border-gray-600"
              }`}
            >
              <div className="flex items-center gap-1.5 mb-1">
                {s.leadCaptured && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-green-900 text-green-300 font-medium">Lead</span>
                )}
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-gray-700 text-gray-400">{s.locale}</span>
                {s.flow && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-blue-900/50 text-blue-300">{s.flow}</span>
                )}
              </div>
              {s.leadCaptured && s.leadData?.name && (
                <p className="text-white text-xs font-semibold truncate">{s.leadData.name}</p>
              )}
              {s.leadCaptured && s.leadData?.email && (
                <p className="text-gray-400 text-xs truncate">{s.leadData.email}</p>
              )}
              {!s.leadCaptured && (
                <p className="text-gray-300 text-xs truncate">{firstUserMessage(s)}</p>
              )}
              <p className="text-gray-600 text-[10px] mt-1">{formatTs(s.updatedAt)} · {s.messageCount} msgs</p>
            </button>
          ))}
        </div>
      </div>

      {/* Conversation View */}
      <div className="flex-1 min-w-0">
        {!selected ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-600 text-sm">Select a conversation</p>
          </div>
        ) : (
          <div className="flex flex-col h-full" style={{ maxHeight: "520px" }}>
            {/* Lead Data Panel */}
            {selected.leadCaptured && (
              <div className="bg-green-950/40 border border-green-800/40 rounded-xl p-3 mb-3 grid grid-cols-2 gap-x-4 gap-y-1 shrink-0">
                <p className="text-gray-500 text-xs">Name</p>
                <p className="text-white text-xs font-medium">{selected.leadData.name || "—"}</p>
                <p className="text-gray-500 text-xs">Company</p>
                <p className="text-white text-xs font-medium">{selected.leadData.company || "—"}</p>
                <p className="text-gray-500 text-xs">Email</p>
                <a href={`mailto:${selected.leadData.email}`} className="text-red-400 text-xs hover:underline truncate">
                  {selected.leadData.email || "—"}
                </a>
                <p className="text-gray-500 text-xs">Interest</p>
                <p className="text-white text-xs font-medium capitalize">{selected.leadData.interest || "—"}</p>
              </div>
            )}

            {/* Session Meta */}
            <div className="text-gray-600 text-xs mb-2 shrink-0 flex gap-3">
              <span>Page: {selected.pageUrl}</span>
              <span>·</span>
              <span>Started: {formatTs(selected.createdAt)}</span>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto flex flex-col gap-2 pr-1">
              {selected.messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[75%] rounded-xl px-3 py-2 text-xs leading-relaxed ${
                      msg.role === "user"
                        ? "bg-red-900/30 border border-red-800/40 text-white"
                        : "bg-gray-800 border border-gray-700 text-gray-200"
                    }`}
                  >
                    <p className="whitespace-pre-wrap break-words">{msg.text}</p>
                    {msg.intent && msg.role === "user" && (
                      <p className="text-gray-600 text-[10px] mt-1">intent: {msg.intent}</p>
                    )}
                    {msg.ts && (
                      <p className="text-gray-600 text-[10px] mt-0.5">{formatTs(msg.ts)}</p>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
