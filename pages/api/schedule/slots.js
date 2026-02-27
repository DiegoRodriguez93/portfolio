import { db } from "../../../lib/firebase";

function overlap(aStart, aEnd, bStart, bEnd) {
  return aStart < bEnd && aEnd > bStart;
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { date } = req.query; // YYYY-MM-DD
  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return res.status(400).json({ error: "date required (YYYY-MM-DD)" });
  }

  const [y, m, d] = date.split("-").map(Number); // m is 1-12

  try {
    // 1. Config
    const configDoc = await db.collection("availability").doc("config").get();
    if (!configDoc.exists) return res.status(503).json({ error: "Config not found" });
    const config = configDoc.data();

    const workingDays  = (config.workingDays ?? [1, 2, 3, 4, 5]).map(Number);
    const startUtcHour = Number(config.workingHoursStartUtc ?? 11);
    const endUtcHour   = Number(config.workingHoursEndUtc   ?? 23);
    const slotMinutes  = Number(config.slotDurationMinutes  ?? 30);
    const advanceHours = Number(config.advanceNoticeHours   ?? 2);
    const maxDays      = Number(config.maxDaysAhead         ?? 30);

    // 2. Validate day
    const dayDate   = new Date(Date.UTC(y, m - 1, d));
    const dayOfWeek = dayDate.getUTCDay();
    if (!workingDays.includes(dayOfWeek)) return res.status(200).json({ slots: [] });

    const now      = new Date();
    const todayUtc = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
    const diffDays = Math.round((dayDate - todayUtc) / 86400000);
    if (diffDays < 0 || diffDays > maxDays) return res.status(200).json({ slots: [] });

    const minStart = new Date(now.getTime() + advanceHours * 3600000);

    // 3. Bookings for this day
    const dayStart = new Date(Date.UTC(y, m - 1, d));
    const dayEnd   = new Date(Date.UTC(y, m - 1, d + 1));
    const bookingsSnap = await db.collection("bookings")
      .where("startUtc", ">=", dayStart)
      .where("startUtc", "<",  dayEnd)
      .get();
    const confirmedBookings = bookingsSnap.docs
      .filter((doc) => doc.data().status === "confirmed")
      .map((doc) => ({
        start: doc.data().startUtc.toDate(),
        end:   doc.data().endUtc.toDate(),
      }));

    // 4. Blocked slots
    const blockedSnap = await db.collection("blocked_slots").get();
    const blockedDocs = blockedSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    // 5. Generate and filter slots
    const totalSlots = Math.floor((endUtcHour - startUtcHour) * 60 / slotMinutes);
    const available  = [];

    for (let i = 0; i < totalSlots; i++) {
      const startMin  = startUtcHour * 60 + i * slotMinutes;
      const endMin    = startMin + slotMinutes;
      if (endMin > endUtcHour * 60) break;

      const slotStart = new Date(Date.UTC(y, m - 1, d, Math.floor(startMin / 60), startMin % 60));
      const slotEnd   = new Date(Date.UTC(y, m - 1, d, Math.floor(endMin / 60),   endMin % 60));

      // Skip past slots
      if (slotStart < minStart) continue;

      // Skip booked
      if (confirmedBookings.some((b) => overlap(slotStart, slotEnd, b.start, b.end))) continue;

      // Skip blocked
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

      available.push({
        startIso: slotStart.toISOString(),
        endIso:   slotEnd.toISOString(),
      });
    }

    return res.status(200).json({ slots: available });
  } catch (err) {
    console.error("slots error:", err);
    return res.status(500).json({ error: String(err?.message ?? err), code: err?.code });
  }
}
