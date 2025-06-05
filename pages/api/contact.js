// pages/api/contact.js
import { Resend } from "resend";

// Inicializar Resend con tu API key
const resend = new Resend(
  process.env.RESEND_API_KEY || "re_We3kob9u_MXSaeuh1kuq9S4xbMs3TxkL2"
);

export default async function handler(req, res) {
  // Solo permitir POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name, email, subject, message, service, captchaAnswer } = req.body;

    // Validación básica
    if (!name || !email || !message) {
      return res.status(400).json({
        error: "Name, email, and message are required",
      });
    }

    // Validación simple del captcha - solo verificar que sea un número
    if (!captchaAnswer || isNaN(captchaAnswer) || captchaAnswer === "") {
      return res.status(400).json({
        error: "Please complete the captcha verification",
      });
    }

    // Verificar que el captcha sea un número dentro de un rango razonable (2-18 para sumas de 1+1 a 9+9)
    const captchaNum = parseInt(captchaAnswer);
    if (captchaNum < 2 || captchaNum > 18) {
      return res.status(400).json({
        error: "Invalid captcha answer",
      });
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: "Invalid email format",
      });
    }

    // Preparar el contenido del email
    const emailSubject = service
      ? `New Contact: ${subject} (${service})`
      : `New Contact: ${subject}`;

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333; border-bottom: 2px solid #007acc; padding-bottom: 10px;">
          New Contact Form Submission
        </h2>
        
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #007acc; margin-top: 0;">Contact Details:</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          ${service ? `<p><strong>Service Interest:</strong> <span style="background-color: #007acc; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px;">${service.replace("-", " ").toUpperCase()}</span></p>` : ""}
          <p><strong>Subject:</strong> ${subject}</p>
        </div>

        <div style="background-color: #fff; border-left: 4px solid #007acc; padding: 20px; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">Message:</h3>
          <p style="line-height: 1.6; color: #555;">${message.replace(/\n/g, "<br>")}</p>
        </div>

        <div style="background-color: #f0f0f0; padding: 15px; border-radius: 8px; margin-top: 20px;">
          <p style="margin: 0; color: #666; font-size: 12px;">
            <strong>Timestamp:</strong> ${new Date().toLocaleString()}<br>
            <strong>Source:</strong> Portfolio Contact Form<br>
            <strong>Captcha Verified:</strong> ✓ (Answer: ${captchaAnswer})
          </p>
        </div>

        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
          <p style="color: #888; font-size: 12px; text-align: center;">
            This email was sent from your portfolio contact form
          </p>
        </div>
      </div>
    `;

    // Enviar email usando Resend
    const emailResponse = await resend.emails.send({
      from: "portfolio@resend.dev", // Cambia esto por tu dominio verificado
      to: "diegorodriguezpaiva1993@gmail.com",
      subject: emailSubject,
      html: emailHtml,
      // Opcional: añadir reply-to para responder directamente al contacto
      reply_to: email,
    });

    console.log("Email sent successfully:", emailResponse);

    // Log del contacto para debugging
    console.log("Contact form submission:", {
      name,
      email,
      subject,
      message,
      service,
      captchaAnswer,
      timestamp: new Date().toISOString(),
      emailId: emailResponse.id,
    });

    return res.status(200).json({
      success: true,
      message: "Message sent successfully!",
      emailId: emailResponse.id,
    });
  } catch (error) {
    console.error("Contact API Error:", error);

    // Manejo específico de errores de Resend
    if (error.name === "ResendError") {
      return res.status(503).json({
        error: "Email service error. Please try again later.",
      });
    }

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}
