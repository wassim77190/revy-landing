import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { prenom, nom, commerce, email, telephone, type, creneau, message } = data;

    if (!prenom || !nom || !commerce || !email || !telephone) {
      return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
    }

    const apiKey = process.env.BREVO_API_KEY;
    const emailTo = process.env.DEMO_EMAIL || process.env.EMAIL_FROM;

    if (!apiKey || !emailTo) {
      console.error("BREVO_API_KEY ou DEMO_EMAIL manquant");
      return NextResponse.json({ error: "Configuration manquante" }, { status: 500 });
    }

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 30px; background: #0a0a0f; color: #ffffff; border-radius: 16px;">
        <div style="background: linear-gradient(135deg, #7C3AED, #4244ca); padding: 20px; border-radius: 12px; margin-bottom: 24px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">🎯 Nouvelle demande de démo</h1>
          <p style="color: rgba(255,255,255,0.7); margin: 8px 0 0; font-size: 14px;">Via le site Revy</p>
        </div>

        <table style="width: 100%; border-collapse: collapse;">
          <tr style="border-bottom: 1px solid rgba(255,255,255,0.08);">
            <td style="padding: 12px 0; color: rgba(255,255,255,0.5); font-size: 13px; width: 140px;">Prénom & Nom</td>
            <td style="padding: 12px 0; color: #ffffff; font-weight: 600;">${prenom} ${nom}</td>
          </tr>
          <tr style="border-bottom: 1px solid rgba(255,255,255,0.08);">
            <td style="padding: 12px 0; color: rgba(255,255,255,0.5); font-size: 13px;">Commerce</td>
            <td style="padding: 12px 0; color: #ffffff; font-weight: 600;">${commerce}</td>
          </tr>
          <tr style="border-bottom: 1px solid rgba(255,255,255,0.08);">
            <td style="padding: 12px 0; color: rgba(255,255,255,0.5); font-size: 13px;">Type</td>
            <td style="padding: 12px 0; color: #ffffff;">${type || "Non précisé"}</td>
          </tr>
          <tr style="border-bottom: 1px solid rgba(255,255,255,0.08);">
            <td style="padding: 12px 0; color: rgba(255,255,255,0.5); font-size: 13px;">Email</td>
            <td style="padding: 12px 0;"><a href="mailto:${email}" style="color: #7C3AED;">${email}</a></td>
          </tr>
          <tr style="border-bottom: 1px solid rgba(255,255,255,0.08);">
            <td style="padding: 12px 0; color: rgba(255,255,255,0.5); font-size: 13px;">Téléphone</td>
            <td style="padding: 12px 0;"><a href="tel:${telephone}" style="color: #7C3AED;">${telephone}</a></td>
          </tr>
          <tr style="border-bottom: 1px solid rgba(255,255,255,0.08);">
            <td style="padding: 12px 0; color: rgba(255,255,255,0.5); font-size: 13px;">Disponibilité</td>
            <td style="padding: 12px 0; color: #ffffff;">${creneau || "Non précisé"}</td>
          </tr>
          ${message ? `
          <tr>
            <td style="padding: 12px 0; color: rgba(255,255,255,0.5); font-size: 13px; vertical-align: top;">Message</td>
            <td style="padding: 12px 0; color: rgba(255,255,255,0.8); font-size: 14px; line-height: 1.6;">${message}</td>
          </tr>` : ""}
        </table>

        <div style="margin-top: 24px; background: rgba(124,58,237,0.1); border: 1px solid rgba(124,58,237,0.3); border-radius: 12px; padding: 16px; text-align: center;">
          <p style="color: rgba(255,255,255,0.6); font-size: 13px; margin: 0;">
            Répondez à cette demande sous 24h pour maximiser les chances de conversion.
          </p>
        </div>
      </div>
    `;

    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        sender: { name: "Revy — Site vitrine", email: emailTo },
        to: [{ email: emailTo, name: "Wassim — Revy" }],
        replyTo: { email, name: `${prenom} ${nom}` },
        subject: `🎯 Nouvelle demande de démo — ${commerce} (${type || "Commerce"})`,
        htmlContent: html,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Erreur Brevo:", err);
      return NextResponse.json({ error: "Erreur envoi email" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Erreur API demo:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
