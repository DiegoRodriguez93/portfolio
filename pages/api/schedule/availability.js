import { db } from "../../../lib/firebase";

function overlap(aStart, aEnd, bStart, bEnd) {
  return aStart < bEnd && aEnd > bStart;
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { year, month } = req.query; // month: 1-12
  if (!year || !month) {
    return res.status(400).json({ error: "year and month required" });
  }

  const y = Number(year);
  const m = Number(month); // 1-12

  try {
    const configDoc = await db.collection("availability").doc("config").get();
    if (!configDoc.exists) return res.status(503).json({ error: "Config not found" });
    const config = configDoc.data();

    const workingDays  = config.workingDays ?? [1, 2, 3, 4, 5];
    const startUtcHour = Number(config.workingHoursStartUtc ?? 13);
    const endUtcHour   = Number(config.workingHoursEndUtc ?? 22);
    const slotMinutes  = Number(config.slotDurationMinutes ?? 60);
    const advanceHours = Number(config.advanceNoticeHours ?? 2);
    const maxDays      = Number(config.maxDaysAhead ?? 30);

    const now        = new Date();
    const minStart   = new Date(now.getTime() + advanceHours * 3600000);
    const todayUtc   = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));

    // Fetch ALL bookings for the month in one query
    const monthStart = new Date(Date.UTC(y, m - 1, 1));
    const monthEnd   = new Date(Date.UTC(y, m, 1));
    const bookingsSnap = await db.collection("bookings")
      .where("startUtc", ">=", monthStart)
      .where("startUtc", "<",  monthEnd)
      .get();
    const confirmedBookings = bookingsSnap.docs
      .filter((d) => d.data().status === "confirmed")
      .map((d) => ({ start: d.data().startUtc.toDate(), end: d.data().endUtc.toDate() }));

    // Fetch blocked slots once
    const blockedSnap = await db.collection("blocked_slots").get();
    const blockedDocs = blockedSnap.docs.map((d) => ({ id: d.id, ...d.data() }));

    const daysInMonth = new Date(Date.UTC(y, m, 0)).getUTCDate();
    const availableDates = [];

    for (let d = 1; d <= daysInMonth; d++) {
      const dayDate   = new Date(Date.UTC(y, m - 1, d));
      const dayOfWeek = dayDate.getUTCDay();
      const diffDays  = Math.round((dayDate - todayUtc) / 86400000);

      if (!workingDays.map(Number).includes(dayOfWeek)) continue;
      if (diffDays < 0 || diffDays > maxDays) continue;

      // Generate slots for this day
      const totalSlots = Math.floor((endUtcHour - startUtcHour) * 60 / slotMinutes);
      let hasAvailable = false;

      for (let i = 0; i < totalSlots; i++) {
        const startMin  = startUtcHour * 60 + i * slotMinutes;
        const endMin    = startMin + slotMinutes;
        if (endMin > endUtcHour * 60) break;

        const slotStart = new Date(Date.UTC(y, m - 1, d, Math.floor(startMin / 60), startMin % 60));
        const slotEnd   = new Date(Date.UTC(y, m - 1, d, Math.floor(endMin / 60),   endMin % 60));

        if (slotStart < minStart) continue;

        // Check bookings
        if (confirmedBookings.some((b) => overlap(slotStart, slotEnd, b.start, b.end))) continue;

        // Check blocked slots
        let blocked = false;
        for (const block of blockedDocs) {
          if (block.type === "specific") {
            if (overlap(slotStart, slotEnd, block.startUtc.toDate(), block.endUtc.toDate())) { blocked = true; break; }
          } else if (block.type === "recurring" && block.dayOfWeek === dayOfWeek) {
            const bStart = new Date(Date.UTC(y, m - 1, d, Number(block.startHourUtc), Number(block.startMinuteUtc ?? 0)));
            const bEnd   = new Date(Date.UTC(y, m - 1, d, Number(block.endHourUtc),   Number(block.endMinuteUtc ?? 0)));
            if (overlap(slotStart, slotEnd, bStart, bEnd)) { blocked = true; break; }
          }
        }
        if (blocked) continue;

        hasAvailable = true;
        break; // At least one slot available = day is available
      }

      if (hasAvailable) {
        const dd = String(d).padStart(2, "0");
        const mm = String(m).padStart(2, "0");
        availableDates.push(`${y}-${mm}-${dd}`);
      }
    }

    res.setHeader("Cache-Control", "no-store");
    return res.status(200).json({ availableDates });
  } catch (err) {
    console.error("availability error:", err);
    return res.status(500).json({ error: String(err?.message ?? err), code: err?.code });
  }
}
