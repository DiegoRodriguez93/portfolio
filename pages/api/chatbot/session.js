import { db } from "../../../lib/firebase";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { sessionId } = req.query;

  if (!sessionId) {
    return res.status(400).json({ error: "sessionId is required" });
  }

  try {
    const doc = await db.collection("chat_sessions").doc(sessionId).get();

    if (!doc.exists) {
      return res.status(404).json({ error: "Session not found" });
    }

    const data = doc.data();

    return res.json({
      messages: data.messages || [],
      flow: data.flow || null,
      flowStep: data.flowStep || null,
      leadData: data.leadData || {},
    });
  } catch (err) {
    console.error("Session fetch error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
