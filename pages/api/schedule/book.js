import { db } from "../../../lib/firebase";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

function overlap(aStart, aEnd, bStart, bEnd) {
  return aStart < bEnd && aEnd > bStart;
}

function formatDateInTz(isoString, timezone) {
  try {
    return new Date(isoString).toLocaleString("en-US", {
      timeZone: timezone,
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
    });
  } catch {
    return isoString;
  }
}

function toIcsDate(isoString) {
  return isoString.replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

function buildIcs(bookingId, startIso, endIso, meetingLink, clientName) {
  const now = toIcsDate(new Date().toISOString());
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Diego Rodriguez//Portfolio//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:REQUEST",
    "BEGIN:VEVENT",
    `UID:${bookingId}@diego-rodriguez.work`,
    `DTSTAMP:${now}`,
    `DTSTART:${toIcsDate(startIso)}`,
    `DTEND:${toIcsDate(endIso)}`,
    "SUMMARY:Meeting with Diego Rodriguez",
    `DESCRIPTION:Hi ${clientName}\\, your meeting is confirmed.\\nJoin at: ${meetingLink}`,
    `LOCATION:${meetingLink}`,
    "STATUS:CONFIRMED",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

function buildGoogleCalendarLink(startIso, endIso, title, description, location) {
  const start = startIso.replace(/[-:]/g, "").replace(".000", "");
  const end = endIso.replace(/[-:]/g, "").replace(".000", "");
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    dates: `${start}/${end}`,
    details: description,
    location: location,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { clientName, clientEmail, startIso, clientTimezone, message } = req.body;

  if (!clientName || !clientEmail || !startIso || !clientTimezone) {
    return res.status(400).json({ error: "clientName, clientEmail, startIso, clientTimezone are required" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(clientEmail)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  try {
    // Load config
    const configDoc = await db.collection("availability").doc("config").get();
    if (!configDoc.exists) return res.status(503).json({ error: "Config not found" });
    const config = configDoc.data();
    const { slotDurationMinutes = 60 } = config;

    const startUtc = new Date(startIso);
    const endUtc = new Date(startUtc.getTime() + slotDurationMinutes * 60 * 1000);
    const endIso = endUtc.toISOString();

    // Race condition guard: check slot still available
    const dayStart = new Date(Date.UTC(startUtc.getUTCFullYear(), startUtc.getUTCMonth(), startUtc.getUTCDate()));
    const dayEnd = new Date(dayStart.getTime() + 24 * 60 * 60 * 1000);

    const existingSnap = await db
      .collection("bookings")
      .where("startUtc", ">=", dayStart)
      .where("startUtc", "<", dayEnd)
      .get();

    const conflict = existingSnap.docs.some((d) => {
      const data = d.data();
      return data.status === "confirmed" && overlap(startUtc, endUtc, data.startUtc.toDate(), data.endUtc.toDate());
    });

    if (conflict) {
      return res.status(409).json({ error: "Slot no longer available" });
    }

    const meetingLink = process.env.MEETING_LINK || "";

    // Save booking
    const bookingRef = db.collection("bookings").doc();
    const bookingData = {
      clientName,
      clientEmail,
      clientTimezone,
      startUtc: startUtc,
      endUtc: endUtc,
      startIso,
      endIso,
      message: message || "",
      status: "confirmed",
      meetingLink,
      createdAt: new Date(),
    };
    await bookingRef.set(bookingData);

    const clientFormattedDate = formatDateInTz(startIso, clientTimezone);
    const adminFormattedDate = formatDateInTz(startIso, config.adminTimezone || "America/Montevideo");
    const gcalLink = buildGoogleCalendarLink(
      startIso,
      endIso,
      "Meeting with Diego Rodriguez",
      `Meeting link: ${meetingLink}`,
      meetingLink
    );

    const clientEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #1a1a2e; color: #ffffff; padding: 40px; border-radius: 12px;">
        <h2 style="color: #F13024; margin-bottom: 8px;">Meeting Confirmed!</h2>
        <p style="color: #cccccc; margin-bottom: 24px;">Hi ${clientName}, your meeting with Diego has been confirmed.</p>

        <div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 24px; margin-bottom: 24px;">
          <p style="margin: 0 0 8px; color: #ffffff;"><strong>Date & Time:</strong> ${clientFormattedDate}</p>
          <p style="margin: 0 0 8px; color: #ffffff;"><strong>Duration:</strong> ${slotDurationMinutes} minutes</p>
          <p style="margin: 0; color: #ffffff;"><strong>Meeting Link:</strong> <a href="${meetingLink}" style="color: #F13024;">${meetingLink}</a></p>
        </div>

        ${message ? `<div style="background: rgba(255,255,255,0.03); border-radius: 8px; padding: 16px; margin-bottom: 24px;"><p style="margin: 0; color: #aaaaaa;"><em>"${message}"</em></p></div>` : ""}

        <div style="text-align: center; margin-bottom: 24px;">
          <a href="${gcalLink}" style="background: #F13024; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold; display: inline-block;">Add to Google Calendar</a>
        </div>

        <p style="color: #888888; font-size: 14px; margin: 0;">If you need to reschedule, please reach out at <a href="mailto:diegorodriguezpaiva1993@gmail.com" style="color: #F13024;">diegorodriguezpaiva1993@gmail.com</a></p>
      </div>
    `;

    const adminEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">New Meeting Booked</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Name:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${clientName}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;"><a href="mailto:${clientEmail}">${clientEmail}</a></td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Date (UY):</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${adminFormattedDate}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Timezone:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${clientTimezone}</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Duration:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${slotDurationMinutes} min</td></tr>
          <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Booking ID:</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${bookingRef.id}</td></tr>
          ${message ? `<tr><td style="padding: 8px;"><strong>Message:</strong></td><td style="padding: 8px;">${message}</td></tr>` : ""}
        </table>
        <p style="margin-top: 16px;"><a href="${meetingLink}" style="background: #007acc; color: white; padding: 10px 20px; border-radius: 4px; text-decoration: none;">Join Meeting</a></p>
      </div>
    `;

    const icsContent = buildIcs(bookingRef.id, startIso, endIso, meetingLink, clientName);
    const icsAttachment = {
      filename: "meeting.ics",
      content: Buffer.from(icsContent).toString("base64"),
    };

    await Promise.all([
      resend.emails.send({
        from: "Diego Rodriguez <onboarding@resend.dev>",
        to: clientEmail,
        subject: `Meeting Confirmed: ${clientFormattedDate}`,
        html: clientEmailHtml,
        attachments: [icsAttachment],
      }),
      resend.emails.send({
        from: "Portfolio Bookings <onboarding@resend.dev>",
        to: "diegorodriguezpaiva1993@gmail.com",
        subject: `New booking: ${clientName} - ${adminFormattedDate}`,
        html: adminEmailHtml,
        attachments: [icsAttachment],
      }),
    ]);

    return res.status(201).json({
      bookingId: bookingRef.id,
      startIso,
      endIso,
      meetingLink,
    });
  } catch (err) {
    console.error("book error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
