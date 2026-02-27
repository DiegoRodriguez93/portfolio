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
      const snap = await db
        .collection("bookings")
        .orderBy("startUtc", "desc")
        .limit(100)
        .get();

      const bookings = snap.docs.map((d) => {
        const data = d.data();
        return {
          id: d.id,
          clientName: data.clientName,
          clientEmail: data.clientEmail,
          clientTimezone: data.clientTimezone,
          startIso: data.startIso,
          endIso: data.endIso,
          message: data.message,
          status: data.status,
          meetingLink: data.meetingLink,
          createdAt: data.createdAt?.toDate?.()?.toISOString?.() || null,
          cancelledAt: data.cancelledAt?.toDate?.()?.toISOString?.() || null,
        };
      });

      return res.status(200).json({ bookings });
    } catch (err) {
      console.error("bookings GET error:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  if (req.method === "DELETE") {
    const { id } = req.query;
    if (!id) return res.status(400).json({ error: "id required" });

    try {
      const ref = db.collection("bookings").doc(id);
      const doc = await ref.get();
      if (!doc.exists) return res.status(404).json({ error: "Booking not found" });

      await ref.update({ status: "cancelled", cancelledAt: new Date() });
      return res.status(200).json({ success: true });
    } catch (err) {
      console.error("bookings DELETE error:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
