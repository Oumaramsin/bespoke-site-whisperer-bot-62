/**
 * Fonction serveur Vercel : réception du formulaire de contact et envoi via Resend.
 *
 * La clé Resend reste côté serveur (variable d'environnement RESEND_API_KEY, sans préfixe VITE_)
 * et n'est donc jamais incluse dans le bundle JavaScript envoyé au navigateur.
 *
 * Fichier volontairement autonome (aucun import relatif) pour être compilé tel quel par Vercel.
 */
import { z } from "zod";

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const FROM_ADDRESS = "RAMSIN Conseil <contact@ramsin.fr>";
const ADMIN_ADDRESS = "contact@ramsin.fr";

// Liste blanche des prestations acceptées (identique aux options du formulaire)
const SERVICE_LABELS: Record<string, string> = {
  "web-app": "Application Web & SaaS Métier Sur-Mesure",
  "mobile-app": "Application Mobile iOS & Android (React Native)",
  "site-vitrine": "Site Web Haute Conversion & E-Commerce",
  "architecture-si": "Architecture des SI & Urbanisation",
  "mega-hopex": "Expertise & Administration MEGA HOPEX V5",
  "po-agile": "Product Ownership SI, Cadrage & DAT",
  "pilotage-equipe": "Pilotage d'Équipe & Facilitation Agile",
  formation: "Formation & Transfert de Compétences",
  transformation: "Conseil en Transformation Digitale",
  autre: "Autre demande / Conseil sur-mesure",
};

const TIMELINE_LABELS: Record<string, string> = {
  asap: "Dès que possible (Urgent)",
  "1-month": "D'ici 1 mois",
  "3-months": "Sous 3 mois",
  flexible: "Flexible / En réflexion",
};

const singleLine = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .transform((value) => value.replace(/[\r\n]+/g, " "));

const contactSchema = z.object({
  name: singleLine(100).pipe(z.string().min(2)),
  email: z.string().trim().max(254).email(),
  company: singleLine(150).optional().default(""),
  phone: singleLine(40).optional().default(""),
  serviceType: z.enum(Object.keys(SERVICE_LABELS) as [string, ...string[]]),
  timeline: z
    .enum(Object.keys(TIMELINE_LABELS) as [string, ...string[]])
    .optional(),
  subject: singleLine(150).pipe(z.string().min(4)),
  message: z.string().trim().min(10).max(5000),
  // Champ piège invisible : rempli uniquement par les robots
  website: z.string().max(200).optional().default(""),
});

// Limitation simple du débit par IP (mémoire de l'instance, best effort)
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const recentRequests = new Map<string, number[]>();

const isRateLimited = (ip: string) => {
  const now = Date.now();
  const timestamps = (recentRequests.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  timestamps.push(now);
  recentRequests.set(ip, timestamps);
  return timestamps.length > RATE_LIMIT_MAX;
};

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const json = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });

// N'accepte que les requêtes émises depuis le site lui-même (prod, preview ou localhost)
const isSameOrigin = (request: Request) => {
  const origin = request.headers.get("origin");
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  if (!origin || !host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
};

const row = (label: string, value: string, extraStyle = "") => `
          <tr>
            <td style="padding: 12px; border-bottom: 1px solid #f1f5f9; font-weight: 700; color: #475569; width: 35%;">${label}</td>
            <td style="padding: 12px; border-bottom: 1px solid #f1f5f9; color: #0f172a; ${extraStyle}">${value}</td>
          </tr>`;

const buildContactHtml = (data: z.infer<typeof contactSchema>) => {
  const safe = {
    name: escapeHtml(data.name),
    email: escapeHtml(data.email),
    company: escapeHtml(data.company) || "Non renseignée",
    phone: escapeHtml(data.phone) || "Non renseigné",
    subject: escapeHtml(data.subject),
    message: escapeHtml(data.message),
    service: escapeHtml(SERVICE_LABELS[data.serviceType]),
    timeline: escapeHtml(data.timeline ? TIMELINE_LABELS[data.timeline] : "Non précisé"),
  };

  return `
    <div style="font-family: 'Segoe UI', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; background-color: #ffffff;">
      <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 32px 24px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 800;">RAMSIN Conseil</h1>
        <p style="color: #38bdf8; margin: 8px 0 0 0; font-size: 14px; font-weight: 600;">📩 Nouvelle Demande de Devis & Contact</p>
      </div>
      <div style="padding: 32px 24px;">
        <h2 style="color: #0f172a; font-size: 16px; margin-top: 0; padding-bottom: 12px; border-bottom: 2px solid #f1f5f9;">Sujet : ${safe.subject}</h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 14px;">
          ${row("Nom du Prospect", safe.name, "font-weight: 700;")}
          ${row("Adresse Email", safe.email, "color: #2563eb; font-weight: 600;")}
          ${row("Entreprise", safe.company)}
          ${row("Téléphone", safe.phone)}
          ${row("Prestation Souhaitée", safe.service, "color: #2563eb; font-weight: 700;")}
          ${row("Délai Souhaité", safe.timeline, "color: #059669; font-weight: 700;")}
          ${row("Message", safe.message, "color: #334155; white-space: pre-wrap; line-height: 1.5;")}
        </table>
      </div>
      <div style="background-color: #f8fafc; padding: 18px; text-align: center; color: #64748b; font-size: 12px; border-top: 1px solid #e2e8f0;">
        RAMSIN Conseil • Formulaire de Devis
      </div>
    </div>
  `;
};

export async function POST(request: Request): Promise<Response> {
  if (!isSameOrigin(request)) {
    return json(403, { success: false, error: "forbidden" });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) {
    return json(429, { success: false, error: "too_many_requests" });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return json(400, { success: false, error: "invalid_json" });
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return json(400, { success: false, error: "invalid_fields" });
  }

  const data = parsed.data;

  // Robot détecté : on répond comme si tout s'était bien passé, sans rien envoyer
  if (data.website) {
    return json(200, { success: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY manquante dans les variables d'environnement");
    return json(500, { success: false, error: "server_misconfigured" });
  }

  const resendResponse = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM_ADDRESS,
      to: [ADMIN_ADDRESS],
      reply_to: data.email,
      subject: `RAMSIN Conseil - Demande de Devis de ${data.name} (${SERVICE_LABELS[data.serviceType]})`,
      html: buildContactHtml(data),
    }),
  });

  if (!resendResponse.ok) {
    console.error("Erreur Resend", resendResponse.status, await resendResponse.text());
    return json(502, { success: false, error: "email_failed" });
  }

  return json(200, { success: true });
}
