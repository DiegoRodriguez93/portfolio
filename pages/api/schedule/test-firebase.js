import { db } from "../../../lib/firebase";

export default async function handler(req, res) {
  try {
    // Test 1: read config doc
    const configDoc = await db.collection("availability").doc("config").get();
    if (!configDoc.exists) {
      return res.status(200).json({ step: "config", exists: false });
    }
    const config = configDoc.data();

    // Test 2: query bookings (range query)
    const now = new Date();
    const dayStart = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
    const dayEnd = new Date(dayStart.getTime() + 86400000);
    const snap = await db.collection("bookings")
      .where("startUtc", ">=", dayStart)
      .where("startUtc", "<", dayEnd)
      .get();

    return res.status(200).json({
      ok: true,
      config,
      bookingsCount: snap.size,
    });
  } catch (err) {
    return res.status(500).json({
      error: String(err.message || err),
      code: err.code,
      stack: err.stack?.split("\n").slice(0, 5),
    });
  }
}
