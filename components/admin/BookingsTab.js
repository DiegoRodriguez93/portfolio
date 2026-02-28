import { useState, useEffect, useCallback } from "react";
import { formatIso } from "./adminUtils";

export default function BookingsTab({ adminPass }) {
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
