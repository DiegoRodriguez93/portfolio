import { db } from "../../../lib/firebase";

function requireAdmin(req, res) {
  if (!process.env.ADMIN_PASSWORD) {
    res.status(503).json({ error: "Admin not configured" });
    return false;
  }
  if (req.headers["x-admin-password"] !== process.env.ADMIN_PASSWORD) {
    res.status(401).json({ error: "Unauthorized" });
    return false;
  }
  return true;
}

export default async function handler(req, res) {
  if (!requireAdmin(req, res)) return;

  if (req.method === "GET") {
    try {
      const snap = await db.collection("blocked_slots").get();
      const blocks = snap.docs.map((d) => {
        const data = d.data();
        return {
          id: d.id,
          type: data.type,
          reason: data.reason || "",
          startIso: data.startIso || null,
          endIso: data.endIso || null,
          dayOfWeek: data.dayOfWeek ?? null,
          startHourUtc: data.startHourUtc ?? null,
          startMinuteUtc: data.startMinuteUtc ?? null,
          endHourUtc: data.endHourUtc ?? null,
          endMinuteUtc: data.endMinuteUtc ?? null,
          createdAt: data.createdAt?.toDate?.()?.toISOString?.() || null,
        };
      });
      return res.status(200).json({ blocks });
    } catch (err) {
      console.error("block GET error:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  if (req.method === "POST") {
    const { type, reason, startIso, endIso, dayOfWeek, startHourUtc, startMinuteUtc, endHourUtc, endMinuteUtc } = req.body;

    if (!type || !["specific", "recurring"].includes(type)) {
      return res.status(400).json({ error: "type must be 'specific' or 'recurring'" });
    }

    try {
      let docData = { type, reason: reason || "", createdAt: new Date() };

      if (type === "specific") {
        if (!startIso || !endIso) return res.status(400).json({ error: "startIso and endIso required for specific block" });
        docData.startUtc = new Date(startIso);
        docData.endUtc = new Date(endIso);
        docData.startIso = startIso;
        docData.endIso = endIso;
      } else {
        if (dayOfWeek === undefined || dayOfWeek === null || startHourUtc === undefined || endHourUtc === undefined) {
          return res.status(400).json({ error: "dayOfWeek, startHourUtc, endHourUtc required for recurring block" });
        }
        docData.dayOfWeek = Number(dayOfWeek);
        docData.startHourUtc = Number(startHourUtc);
        docData.startMinuteUtc = Number(startMinuteUtc || 0);
        docData.endHourUtc = Number(endHourUtc);
        docData.endMinuteUtc = Number(endMinuteUtc || 0);
      }

      const ref = db.collection("blocked_slots").doc();
      await ref.set(docData);
      return res.status(201).json({ id: ref.id });
    } catch (err) {
      console.error("block POST error:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  if (req.method === "DELETE") {
    const { id } = req.query;
    if (!id) return res.status(400).json({ error: "id required" });

    try {
      const ref = db.collection("blocked_slots").doc(id);
      const doc = await ref.get();
      if (!doc.exists) return res.status(404).json({ error: "Block not found" });
      await ref.delete();
      return res.status(200).json({ success: true });
    } catch (err) {
      console.error("block DELETE error:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
