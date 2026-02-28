import { useState, useEffect, useCallback } from "react";
import { DAY_NAMES, formatIso } from "./adminUtils";

export default function BlocksTab({ adminPass }) {
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [blockType, setBlockType] = useState("specific");
  const [specificForm, setSpecificForm] = useState({ date: "", startTime: "", endTime: "", reason: "" });
  const [recurringForm, setRecurringForm] = useState({ dayOfWeek: "1", startTime: "10:00", endTime: "11:00", reason: "" });
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

    const startIso = new Date(`${date}T${startTime}:00-03:00`).toISOString();
    const endIso = new Date(`${date}T${endTime}:00-03:00`).toISOString();
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
    const { dayOfWeek, startTime, endTime, reason } = recurringForm;
    if (!startTime || !endTime) { setFormError("All fields required"); return; }
    const [startH, startM] = startTime.split(":").map(Number);
    const [endH, endM] = endTime.split(":").map(Number);
    // Convert UY time (UTC-3) to UTC by adding 3 hours
    const startHourUtc = (startH + 3) % 24;
    const endHourUtc = (endH + 3) % 24;
    // Handle day rollover: if UY time crosses midnight when converted to UTC
    const dayOffset = startH + 3 >= 24 ? 1 : 0;
    const dayOfWeekUtc = (Number(dayOfWeek) + dayOffset) % 7;
    setSaving(true);
    try {
      const res = await fetch("/api/schedule/block", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-admin-password": adminPass },
        body: JSON.stringify({
          type: "recurring",
          dayOfWeek: dayOfWeekUtc,
          startHourUtc,
          startMinuteUtc: startM,
          endHourUtc,
          endMinuteUtc: endM,
          reason,
        }),
      });
      if (res.ok) {
        setRecurringForm({ dayOfWeek: "1", startTime: "10:00", endTime: "11:00", reason: "" });
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
              <label className={labelCls}>Date (UY)</label>
              <input type="date" className={inputCls} value={specificForm.date} onChange={(e) => setSpecificForm((p) => ({ ...p, date: e.target.value }))} required />
            </div>
            <div>
              <label className={labelCls}>Start time (UY)</label>
              <input type="time" className={inputCls} value={specificForm.startTime} onChange={(e) => setSpecificForm((p) => ({ ...p, startTime: e.target.value }))} required />
            </div>
            <div>
              <label className={labelCls}>End time (UY)</label>
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
              <label className={labelCls}>Start time (UY)</label>
              <input type="time" className={inputCls} value={recurringForm.startTime} onChange={(e) => setRecurringForm((p) => ({ ...p, startTime: e.target.value }))} required />
            </div>
            <div>
              <label className={labelCls}>End time (UY)</label>
              <input type="time" className={inputCls} value={recurringForm.endTime} onChange={(e) => setRecurringForm((p) => ({ ...p, endTime: e.target.value }))} required />
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
      <div className="overflow-y-auto" style={{ maxHeight: "320px" }}>
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
                Every {DAY_NAMES[b.dayOfWeek]}: {(b.startHourUtc - 3 + 24) % 24}:{String(b.startMinuteUtc || 0).padStart(2, "0")}–{(b.endHourUtc - 3 + 24) % 24}:{String(b.endMinuteUtc || 0).padStart(2, "0")} UY
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
    </div>
  );
}
