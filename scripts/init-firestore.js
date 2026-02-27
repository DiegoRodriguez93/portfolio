/**
 * Run once to initialize Firestore collections.
 * Usage: node scripts/init-firestore.js
 */

// Load .env.local manually (no dotenv dependency needed)
const fs = require("fs");
const path = require("path");
const envPath = path.join(__dirname, "../.env.local");
fs.readFileSync(envPath, "utf8").split("\n").forEach((line) => {
  const match = line.match(/^([^#=]+)=(.*)$/);
  if (match) process.env[match[1].trim()] = match[2].trim().replace(/^"|"$/g, "");
});
const admin = require("firebase-admin");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}

const db = admin.firestore();

async function init() {
  console.log("Connecting to Firestore project:", process.env.FIREBASE_PROJECT_ID);

  // 1. availability/config
  await db.collection("availability").doc("config").set({
    workingDays: [1, 2, 3, 4, 5],       // Mon-Fri
    workingHoursStartUtc: 11,            // 8:00 UY = 11:00 UTC
    workingHoursEndUtc: 23,              // 20:00 UY = 23:00 UTC
    slotDurationMinutes: 30,
    advanceNoticeHours: 2,
    maxDaysAhead: 30,
    adminTimezone: "America/Montevideo",
  });
  console.log("✓ availability/config created");

  // 2. Empty bookings and blocked_slots collections (Firestore doesn't need explicit creation,
  //    but we add a placeholder doc that we immediately delete to ensure collections exist)
  // Actually Firestore creates collections on first write — nothing needed here.

  console.log("\n✅ Firestore initialized successfully!");
  console.log("   You can now test /schedule in the browser.");
  process.exit(0);
}

init().catch((err) => {
  console.error("❌ Error:", err.message);
  process.exit(1);
});
