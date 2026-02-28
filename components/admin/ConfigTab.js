import { useState, useEffect } from "react";

export default function ConfigTab({ adminPass }) {
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
