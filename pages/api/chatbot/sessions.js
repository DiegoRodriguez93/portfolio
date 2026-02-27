import { db } from "../../../lib/firebase";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const adminPassword = req.headers["x-admin-password"];
  if (!adminPassword || adminPassword !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { filter = "all", limit = "50" } = req.query;

  try {
    let query = db.collection("chat_sessions").orderBy("updatedAt", "desc").limit(Number(limit));

    if (filter === "leads") {
      query = db
        .collection("chat_sessions")
        .where("leadCaptured", "==", true)
        .orderBy("updatedAt", "desc")
        .limit(Number(limit));
    }

    const snap = await query.get();

    const sessions = snap.docs.map((doc) => {
      const d = doc.data();
      return {
        id: doc.id,
        locale: d.locale || "en",
        pageUrl: d.pageUrl || "/",
        flow: d.flow || null,
        flowCompleted: d.flowCompleted || false,
        leadCaptured: d.leadCaptured || false,
        leadData: d.leadData || {},
        messageCount: (d.messages || []).length,
        messages: (d.messages || []).map((m) => ({
          role: m.role,
          text: m.text,
          intent: m.intent || null,
          ts: m.ts?._seconds ? new Date(m.ts._seconds * 1000).toISOString() : null,
        })),
        createdAt: d.createdAt?._seconds
          ? new Date(d.createdAt._seconds * 1000).toISOString()
          : null,
        updatedAt: d.updatedAt?._seconds
          ? new Date(d.updatedAt._seconds * 1000).toISOString()
          : null,
      };
    });

    return res.json({ sessions });
  } catch (err) {
    console.error("Sessions fetch error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
