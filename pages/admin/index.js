import { useState, useEffect, useCallback } from "react";
import Head from "next/head";

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function formatIso(isoString, timezone = "America/Montevideo") {
  if (!isoString) return "";
  try {
    return new Date(isoString).toLocaleString("en-US", {
      timeZone: timezone,
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return isoString;
  }
}

// ---- Login Screen ----
function LoginScreen({ onLogin }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/schedule/bookings", {
        headers: { "x-admin-password": password },
      });
      if (res.ok) {
        onLogin(password);
      } else {
        setError("Incorrect password");
      }
    } catch {
      setError("Connection error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 w-full max-w-sm">
        <h1 className="text-white font-bold text-2xl mb-2 text-center">Admin Panel</h1>
        <p className="text-gray-500 text-sm text-center mb-6">diego-rodriguez.work</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="password"
            placeholder="Admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
            required
          />
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-colors disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

// ---- Bookings Tab ----
function BookingsTab({ adminPass }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("upcoming");

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/schedule/bookings", {
        headers: { "x-admin-password": adminPass },
      });
      const data = await res.json();
      setBookings(data.bookings || []);
    } catch {
      setBookings([]);
    } finally {
      setLoading(false);
    }
  }, [adminPass]);

  useEffect(() => { fetchBookings(); }, [fetchBookings]);

  const handleCancel = async (id) => {
    if (!confirm("Cancel this booking?")) return;
    try {
      const res = await fetch(`/api/schedule/bookings?id=${id}`, {
        method: "DELETE",
        headers: { "x-admin-password": adminPass },
      });
      if (res.ok) fetchBookings();
      else alert("Failed to cancel booking");
    } catch {
      alert("Error cancelling booking");
    }
  };

  const now = new Date().toISOString();
  const filtered = bookings.filter((b) => {
    if (filter === "upcoming") return b.status === "confirmed" && b.startIso >= now;
    if (filter === "past") return b.status === "confirmed" && b.startIso < now;
    if (filter === "cancelled") return b.status === "cancelled";
    return true;
  });

  return (
    <div>
      <div className="flex gap-2 mb-4">
        {["upcoming", "past", "cancelled", "all"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 rounded-lg text-sm capitalize transition-colors ${filter === f ? "bg-red-600 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"}`}
          >
            {f}
          </button>
        ))}
        <button onClick={fetchBookings} className="ml-auto px-3 py-1 bg-gray-800 text-gray-300 rounded-lg text-sm hover:bg-gray-700">
          Refresh
        </button>
      </div>

      {loading && <p className="text-gray-500 text-center py-8">Loading...</p>}

      {!loading && filtered.length === 0 && (
        <p className="text-gray-500 text-center py-8">No bookings found</p>
      )}

      {!loading && filtered.map((b) => (
        <div key={b.id} className="bg-gray-800 border border-gray-700 rounded-xl p-4 mb-3">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <p className="text-white font-semibold">{b.clientName}</p>
                <span className={`text-xs px-2 py-0.5 rounded-full ${b.status === "confirmed" ? "bg-green-900 text-green-300" : "bg-red-900 text-red-300"}`}>
                  {b.status}
                </span>
              </div>
              <p className="text-gray-400 text-sm">{b.clientEmail}</p>
              <p className="text-gray-300 text-sm mt-1">{formatIso(b.startIso)} → {formatIso(b.endIso)}</p>
              <p className="text-gray-500 text-xs mt-1">TZ: {b.clientTimezone}</p>
              {b.message && <p className="text-gray-400 text-sm mt-1 italic">&ldquo;{b.message}&rdquo;</p>}
            </div>
            {b.status === "confirmed" && (
              <button
                onClick={() => handleCancel(b.id)}
                className="shrink-0 px-3 py-1 bg-red-900 hover:bg-red-800 text-red-300 rounded-lg text-sm transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

// ---- Block Slots Tab ----
function BlocksTab({ adminPass }) {
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [blockType, setBlockType] = useState("specific");
  const [specificForm, setSpecificForm] = useState({ date: "", startTime: "", endTime: "", reason: "" });
  const [recurringForm, setRecurringForm] = useState({ dayOfWeek: "1", startHour: "13", startMinute: "0", endHour: "14", endMinute: "0", reason: "" });
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  const fetchBlocks = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/schedule/block", {
        headers: { "x-admin-password": adminPass },
      });
      const data = await res.json();
      setBlocks(data.blocks || []);
    } catch {
      setBlocks([]);
    } finally {
      setLoading(false);
    }
  }, [adminPass]);

  useEffect(() => { fetchBlocks(); }, [fetchBlocks]);

  const handleDelete = async (id) => {
    if (!confirm("Delete this block?")) return;
    try {
      const res = await fetch(`/api/schedule/block?id=${id}`, {
        method: "DELETE",
        headers: { "x-admin-password": adminPass },
      });
      if (res.ok) fetchBlocks();
      else alert("Failed to delete block");
    } catch {
      alert("Error deleting block");
    }
  };

  const handleAddSpecific = async (e) => {
    e.preventDefault();
    setFormError("");
    const { date, startTime, endTime, reason } = specificForm;
    if (!date || !startTime || !endTime) { setFormError("All fields required"); return; }

    const startIso = new Date(`${date}T${startTime}:00Z`).toISOString();
    const endIso = new Date(`${date}T${endTime}:00Z`).toISOString();
    if (endIso <= startIso) { setFormError("End time must be after start time"); return; }

    setSaving(true);
    try {
      const res = await fetch("/api/schedule/block", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-admin-password": adminPass },
        body: JSON.stringify({ type: "specific", startIso, endIso, reason }),
      });
      if (res.ok) {
        setSpecificForm({ date: "", startTime: "", endTime: "", reason: "" });
        fetchBlocks();
      } else {
        const data = await res.json();
        setFormError(data.error || "Error saving block");
      }
    } catch {
      setFormError("Network error");
    } finally {
      setSaving(false);
    }
  };

  const handleAddRecurring = async (e) => {
    e.preventDefault();
    setFormError("");
    const { dayOfWeek, startHour, startMinute, endHour, endMinute, reason } = recurringForm;
    setSaving(true);
    try {
      const res = await fetch("/api/schedule/block", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-admin-password": adminPass },
        body: JSON.stringify({
          type: "recurring",
          dayOfWeek: Number(dayOfWeek),
          startHourUtc: Number(startHour),
          startMinuteUtc: Number(startMinute),
          endHourUtc: Number(endHour),
          endMinuteUtc: Number(endMinute),
          reason,
        }),
      });
      if (res.ok) {
        setRecurringForm({ dayOfWeek: "1", startHour: "13", startMinute: "0", endHour: "14", endMinute: "0", reason: "" });
        fetchBlocks();
      } else {
        const data = await res.json();
        setFormError(data.error || "Error saving block");
      }
    } catch {
      setFormError("Network error");
    } finally {
      setSaving(false);
    }
  };

  const inputCls = "w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-red-500";
  const labelCls = "block text-gray-400 text-xs mb-1";

  return (
    <div>
      {/* Add block form */}
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 mb-6">
        <h3 className="text-white font-semibold mb-4">Add Block</h3>
        <div className="flex gap-2 mb-4">
          {["specific", "recurring"].map((t) => (
            <button
              key={t}
              onClick={() => { setBlockType(t); setFormError(""); }}
              className={`px-3 py-1 rounded-lg text-sm capitalize transition-colors ${blockType === t ? "bg-red-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"}`}
            >
              {t}
            </button>
          ))}
        </div>

        {blockType === "specific" ? (
          <form onSubmit={handleAddSpecific} className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <label className={labelCls}>Date (UTC)</label>
              <input type="date" className={inputCls} value={specificForm.date} onChange={(e) => setSpecificForm((p) => ({ ...p, date: e.target.value }))} required />
            </div>
            <div>
              <label className={labelCls}>Start time (UTC)</label>
              <input type="time" className={inputCls} value={specificForm.startTime} onChange={(e) => setSpecificForm((p) => ({ ...p, startTime: e.target.value }))} required />
            </div>
            <div>
              <label className={labelCls}>End time (UTC)</label>
              <input type="time" className={inputCls} value={specificForm.endTime} onChange={(e) => setSpecificForm((p) => ({ ...p, endTime: e.target.value }))} required />
            </div>
            <div className="col-span-2">
              <label className={labelCls}>Reason (optional)</label>
              <input type="text" className={inputCls} placeholder="e.g. Vacation" value={specificForm.reason} onChange={(e) => setSpecificForm((p) => ({ ...p, reason: e.target.value }))} />
            </div>
            {formError && <p className="col-span-2 text-red-400 text-sm">{formError}</p>}
            <button type="submit" disabled={saving} className="col-span-2 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg text-sm transition-colors disabled:opacity-50">
              {saving ? "Saving..." : "Block slot"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleAddRecurring} className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <label className={labelCls}>Day of week</label>
              <select className={inputCls} value={recurringForm.dayOfWeek} onChange={(e) => setRecurringForm((p) => ({ ...p, dayOfWeek: e.target.value }))}>
                {DAY_NAMES.map((d, i) => <option key={i} value={i}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className={labelCls}>Start hour (UTC)</label>
              <input type="number" min="0" max="23" className={inputCls} value={recurringForm.startHour} onChange={(e) => setRecurringForm((p) => ({ ...p, startHour: e.target.value }))} />
            </div>
            <div>
              <label className={labelCls}>Start minute</label>
              <input type="number" min="0" max="59" step="15" className={inputCls} value={recurringForm.startMinute} onChange={(e) => setRecurringForm((p) => ({ ...p, startMinute: e.target.value }))} />
            </div>
            <div>
              <label className={labelCls}>End hour (UTC)</label>
              <input type="number" min="0" max="23" className={inputCls} value={recurringForm.endHour} onChange={(e) => setRecurringForm((p) => ({ ...p, endHour: e.target.value }))} />
            </div>
            <div>
              <label className={labelCls}>End minute</label>
              <input type="number" min="0" max="59" step="15" className={inputCls} value={recurringForm.endMinute} onChange={(e) => setRecurringForm((p) => ({ ...p, endMinute: e.target.value }))} />
            </div>
            <div className="col-span-2">
              <label className={labelCls}>Reason (optional)</label>
              <input type="text" className={inputCls} placeholder="e.g. Weekly standup" value={recurringForm.reason} onChange={(e) => setRecurringForm((p) => ({ ...p, reason: e.target.value }))} />
            </div>
            {formError && <p className="col-span-2 text-red-400 text-sm">{formError}</p>}
            <button type="submit" disabled={saving} className="col-span-2 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg text-sm transition-colors disabled:opacity-50">
              {saving ? "Saving..." : "Add recurring block"}
            </button>
          </form>
        )}
      </div>

      {/* Existing blocks */}
      <h3 className="text-white font-semibold mb-3">Existing Blocks</h3>
      {loading && <p className="text-gray-500 text-center py-4">Loading...</p>}
      {!loading && blocks.length === 0 && <p className="text-gray-500 text-center py-4">No blocks configured</p>}
      {!loading && blocks.map((b) => (
        <div key={b.id} className="bg-gray-800 border border-gray-700 rounded-xl p-3 mb-2 flex items-center justify-between gap-4">
          <div>
            <span className={`text-xs px-2 py-0.5 rounded-full mr-2 ${b.type === "specific" ? "bg-orange-900 text-orange-300" : "bg-purple-900 text-purple-300"}`}>
              {b.type}
            </span>
            {b.type === "specific" ? (
              <span className="text-gray-300 text-sm">
                {formatIso(b.startIso)} → {formatIso(b.endIso)}
              </span>
            ) : (
              <span className="text-gray-300 text-sm">
                Every {DAY_NAMES[b.dayOfWeek]}: {b.startHourUtc}:{String(b.startMinuteUtc || 0).padStart(2, "0")}–{b.endHourUtc}:{String(b.endMinuteUtc || 0).padStart(2, "0")} UTC
              </span>
            )}
            {b.reason && <span className="text-gray-500 text-xs ml-2">({b.reason})</span>}
          </div>
          <button
            onClick={() => handleDelete(b.id)}
            className="shrink-0 px-3 py-1 bg-red-900 hover:bg-red-800 text-red-300 rounded-lg text-sm transition-colors"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

// ---- Config Tab ----
function ConfigTab({ adminPass }) {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // We fetch config by calling slots API and extracting (or fetch directly via a protected endpoint)
    // Since config is in Firestore, we just show a static placeholder for now
    setLoading(false);
    setConfig({
      workingDays: "Mon–Fri (1–5)",
      workingHoursStart: "13:00 UTC (10:00 UY)",
      workingHoursEnd: "22:00 UTC (19:00 UY)",
      slotDuration: "60 minutes",
      advanceNotice: "2 hours",
      maxDaysAhead: "30 days",
    });
  }, [adminPass]);

  return (
    <div>
      <p className="text-gray-500 text-sm mb-4">Current availability configuration (read-only, edit in Firebase Console)</p>
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
          {config && Object.entries(config).map(([k, v]) => (
            <div key={k} className="flex items-center justify-between py-2 border-b border-gray-700 last:border-0">
              <span className="text-gray-400 text-sm capitalize">{k.replace(/([A-Z])/g, " $1")}</span>
              <span className="text-white text-sm font-medium">{v}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ---- Main Admin Page ----
export default function AdminPage() {
  const [adminPass, setAdminPass] = useState(null);
  const [activeTab, setActiveTab] = useState("bookings");

  if (!adminPass) return <LoginScreen onLogin={setAdminPass} />;

  return (
    <>
      <Head>
        <title>Admin — Diego Rodriguez</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className="min-h-screen bg-gray-950 text-white">
        {/* Header */}
        <div className="border-b border-gray-800 px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-bold text-lg">Admin Panel</h1>
            <p className="text-gray-500 text-xs">diego-rodriguez.work</p>
          </div>
          <button
            onClick={() => setAdminPass(null)}
            className="text-gray-500 hover:text-white text-sm transition-colors"
          >
            Logout
          </button>
        </div>

        <div className="max-w-3xl mx-auto px-4 py-8">
          {/* Tabs */}
          <div className="flex gap-2 mb-8 border-b border-gray-800">
            {["bookings", "blocks", "config"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-medium capitalize transition-colors -mb-px border-b-2 ${activeTab === tab ? "border-red-500 text-white" : "border-transparent text-gray-500 hover:text-gray-300"}`}
              >
                {tab === "blocks" ? "Block Slots" : tab}
              </button>
            ))}
          </div>

          {activeTab === "bookings" && <BookingsTab adminPass={adminPass} />}
          {activeTab === "blocks" && <BlocksTab adminPass={adminPass} />}
          {activeTab === "config" && <ConfigTab adminPass={adminPass} />}
        </div>
      </div>
    </>
  );
}

AdminPage.noLayout = true;
