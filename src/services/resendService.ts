/**
 * Service d'envoi d'e-mails professionnels via Resend.com
 * Rendu HTML haute définition au nom de RAMSIN Conseil (Zéro intermédiaire, zéro FormSubmit)
 */

interface SendBookingEmailParams {
  name: string;
  email: string;
  phone?: string;
  selectedDay: string;
  selectedTime: string;
  message?: string;
}

interface SendContactEmailParams {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  serviceType?: string;
  timeline?: string;
  subject: string;
  message: string;
}

// Convertisseurs des identifiants techniques vers des libellés élégants en français
export const formatServiceType = (key?: string) => {
  const map: Record<string, string> = {
    "web-app": "Conception Web, Mobiles & Applications Sur-Mesure",
    "architecture-si": "Architecture des SI & Urbanisation",
    "mega-hopex": "Expertise & Administration MEGA HOPEX",
    "po-agile": "Product Ownership, Cadrage & Backlog",
    "pilotage-equipe": "Pilotage d'Équipe & Facilitation Agile",
    "formation": "Formation & Transfert de Compétences",
    "transformation": "Conseil en Transformation Digitale",
    "autre": "Autre demande / Conseil sur-mesure",
  };
  return map[key || ""] || key || "Non précisé";
};

export const formatTimeline = (key?: string) => {
  const map: Record<string, string> = {
    "asap": "Dès que possible (Urgent)",
    "1-month": "D'ici 1 mois",
    "3-months": "Sous 3 mois",
    "flexible": "Flexible / En réflexion",
  };
  return map[key || ""] || key || "Non précisé";
};

// Clé API Resend
const RESEND_API_KEY = import.meta.env.VITE_RESEND_API_KEY || "re_EkRuUwuV_N3gc1x5rSWp6bVPNYqHp8gKB";

// Endpoint API Resend avec passage par le proxy Vite pour éviter tout blocage CORS navigateur
const getEndpoint = () => {
  if (typeof window !== "undefined" && window.location.origin) {
    return "/api/resend";
  }
  return "https://api.resend.com/emails";
};

/**
 * Envoie une notification de réservation de RDV en HTML pur via Resend.com
 */
export const sendBookingViaResend = async (params: SendBookingEmailParams) => {
  const { name, email, phone, selectedDay, selectedTime, message } = params;

  // Template HTML d'excellence pour RAMSIN (Admin)
  const adminHtml = `
    <div style="font-family: 'Segoe UI', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; background-color: #ffffff;">
      <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 32px 24px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 800; tracking-tight: -0.025em;">RAMSIN Conseil</h1>
        <p style="color: #38bdf8; margin: 8px 0 0 0; font-size: 14px; font-weight: 600;">📅 Nouvelle Réservation de Session de Cadrage (30 min)</p>
      </div>
      <div style="padding: 32px 24px;">
        <h2 style="color: #0f172a; font-size: 16px; margin-top: 0; padding-bottom: 12px; border-bottom: 2px solid #f1f5f9;">Informations de la réservation :</h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 14px;">
          <tr>
            <td style="padding: 12px; border-bottom: 1px solid #f1f5f9; font-weight: 700; color: #475569; width: 35%;">Nom du Client</td>
            <td style="padding: 12px; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-weight: 700;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 12px; border-bottom: 1px solid #f1f5f9; font-weight: 700; color: #475569;">Adresse Email</td>
            <td style="padding: 12px; border-bottom: 1px solid #f1f5f9; color: #2563eb; font-weight: 600;">${email}</td>
          </tr>
          <tr>
            <td style="padding: 12px; border-bottom: 1px solid #f1f5f9; font-weight: 700; color: #475569;">Téléphone</td>
            <td style="padding: 12px; border-bottom: 1px solid #f1f5f9; color: #0f172a;">${phone || "Non renseigné"}</td>
          </tr>
          <tr style="background-color: #f0fdf4;">
            <td style="padding: 12px; border-bottom: 1px solid #bbf7d0; font-weight: 700; color: #166534;">Jour & Heure du RDV</td>
            <td style="padding: 12px; border-bottom: 1px solid #bbf7d0; font-weight: 800; color: #047857; font-size: 16px;">${selectedDay} à ${selectedTime}</td>
          </tr>
          <tr>
            <td style="padding: 12px; border-bottom: 1px solid #f1f5f9; font-weight: 700; color: #475569;">Description du besoin</td>
            <td style="padding: 12px; border-bottom: 1px solid #f1f5f9; color: #334155; line-height: 1.5;">${message || "Non précisé"}</td>
          </tr>
        </table>
      </div>
      <div style="background-color: #f8fafc; padding: 18px; text-align: center; color: #64748b; font-size: 12px; border-top: 1px solid #e2e8f0;">
        RAMSIN Conseil • Notification Officielle de Réservation
      </div>
    </div>
  `;

  // Template HTML de confirmation pour le client
  const clientHtml = `
    <div style="font-family: 'Segoe UI', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; background-color: #ffffff;">
      <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 32px 24px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 800;">RAMSIN Conseil</h1>
        <p style="color: #34d399; margin: 8px 0 0 0; font-size: 14px; font-weight: 700;">✓ Votre réservation est bien confirmée</p>
      </div>
      <div style="padding: 32px 24px;">
        <p style="color: #334155; font-size: 16px; line-height: 1.6; margin-top: 0;">Bonjour <strong>${name}</strong>,</p>
        <p style="color: #334155; font-size: 15px; line-height: 1.6;">Nous avons bien enregistré votre demande de session de cadrage offerte de 30 minutes.</p>
        
        <div style="background-color: #f0fdf4; border: 1.5px solid #86efac; border-radius: 12px; padding: 20px; margin: 24px 0; text-align: center;">
          <span style="display: block; font-size: 12px; color: #166534; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">Créneau Réservé</span>
          <span style="display: block; font-size: 24px; color: #047857; font-weight: 800; margin-top: 6px;">${selectedDay} à ${selectedTime}</span>
        </div>

        <p style="color: #334155; font-size: 15px; line-height: 1.6;">Un consultant RAMSIN Conseil vous recontactera très rapidement pour vous transmettre le lien de visioconférence.</p>
        <p style="color: #334155; font-size: 15px; line-height: 1.6; margin-bottom: 0;">À très bientôt,<br><strong>L'équipe RAMSIN Conseil</strong></p>
      </div>
      <div style="background-color: #f8fafc; padding: 18px; text-align: center; color: #64748b; font-size: 12px; border-top: 1px solid #e2e8f0;">
        RAMSIN Conseil • Architecture SI & Développement Web Sur-Mesure
      </div>
    </div>
  `;

  try {
    const endpoint = getEndpoint();

    // 1. Notification pour RAMSIN (Admin)
    const adminRes = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: "RAMSIN Conseil <onboarding@resend.dev>",
        to: ["ramsinconseil@gmail.com"],
        subject: `RAMSIN Conseil - RDV Réservé (${selectedDay} à ${selectedTime}) par ${name}`,
        html: adminHtml
      })
    });

    const adminData = await adminRes.json();

    // 2. Envoi de la confirmation client
    try {
      const recipientList = Array.from(new Set([email, "ramsinconseil@gmail.com"]));
      await fetch(endpoint, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          from: "RAMSIN Conseil <onboarding@resend.dev>",
          to: recipientList,
          subject: `RAMSIN Conseil - Confirmation de votre RDV (${selectedDay} à ${selectedTime})`,
          html: clientHtml
        })
      });
    } catch (e) {
      console.error("Client email dispatch attempt:", e);
    }

    return { success: true, data: adminData };
  } catch (error) {
    console.error("Resend booking error:", error);
    return { success: false, error };
  }
};

/**
 * Envoie une demande de devis en HTML pur via Resend.com
 */
export const sendContactViaResend = async (params: SendContactEmailParams) => {
  const { name, email, company, phone, serviceType, timeline, subject, message } = params;

  const prettyService = formatServiceType(serviceType);
  const prettyTimeline = formatTimeline(timeline);

  const contactHtml = `
    <div style="font-family: 'Segoe UI', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; background-color: #ffffff;">
      <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 32px 24px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 800;">RAMSIN Conseil</h1>
        <p style="color: #38bdf8; margin: 8px 0 0 0; font-size: 14px; font-weight: 600;">📩 Nouvelle Demande de Devis & Contact</p>
      </div>
      <div style="padding: 32px 24px;">
        <h2 style="color: #0f172a; font-size: 16px; margin-top: 0; padding-bottom: 12px; border-bottom: 2px solid #f1f5f9;">Sujet : ${subject}</h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 14px;">
          <tr>
            <td style="padding: 12px; border-bottom: 1px solid #f1f5f9; font-weight: 700; color: #475569; width: 35%;">Nom du Prospect</td>
            <td style="padding: 12px; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-weight: 700;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 12px; border-bottom: 1px solid #f1f5f9; font-weight: 700; color: #475569;">Adresse Email</td>
            <td style="padding: 12px; border-bottom: 1px solid #f1f5f9; color: #2563eb; font-weight: 600;">${email}</td>
          </tr>
          <tr>
            <td style="padding: 12px; border-bottom: 1px solid #f1f5f9; font-weight: 700; color: #475569;">Entreprise</td>
            <td style="padding: 12px; border-bottom: 1px solid #f1f5f9; color: #0f172a;">${company || "Non renseignée"}</td>
          </tr>
          <tr>
            <td style="padding: 12px; border-bottom: 1px solid #f1f5f9; font-weight: 700; color: #475569;">Téléphone</td>
            <td style="padding: 12px; border-bottom: 1px solid #f1f5f9; color: #0f172a;">${phone || "Non renseigné"}</td>
          </tr>
          <tr style="background-color: #f8fafc;">
            <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; font-weight: 700; color: #0f172a;">Prestation Souhaitée</td>
            <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; font-weight: 700; color: #2563eb;">${prettyService}</td>
          </tr>
          <tr style="background-color: #f8fafc;">
            <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; font-weight: 700; color: #0f172a;">Délai Souhaité</td>
            <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; font-weight: 700; color: #059669;">${prettyTimeline}</td>
          </tr>
          <tr>
            <td style="padding: 12px; border-bottom: 1px solid #f1f5f9; font-weight: 700; color: #475569;">Message</td>
            <td style="padding: 12px; border-bottom: 1px solid #f1f5f9; color: #334155; white-space: pre-wrap; line-height: 1.5;">${message}</td>
          </tr>
        </table>
      </div>
      <div style="background-color: #f8fafc; padding: 18px; text-align: center; color: #64748b; font-size: 12px; border-top: 1px solid #e2e8f0;">
        RAMSIN Conseil • Formulaire de Devis
      </div>
    </div>
  `;

  try {
    const endpoint = getEndpoint();

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: "RAMSIN Conseil <onboarding@resend.dev>",
        to: ["ramsinconseil@gmail.com"],
        subject: `RAMSIN Conseil - Demande de Devis de ${name} (${prettyService})`,
        html: contactHtml
      })
    });

    const resData = await res.json();
    return { success: true, data: resData };
  } catch (error) {
    console.error("Resend contact error:", error);
    return { success: false, error };
  }
};
