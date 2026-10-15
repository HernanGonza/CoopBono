import { z } from "zod";

// Mismo esquema que la web de Tacuara: Resend desde web@tacuara.com.ar hacia hola@tacuara.com.ar.
// Variables de entorno (solo servidor): RESEND_API_KEY (obligatoria), CONTACT_TO y CONTACT_FROM (opcionales).
const schema = z.object({
  nombre: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
  organismo: z.string().trim().max(160).optional(),
  mensaje: z.string().trim().min(1).max(5000),
  // Campo trampa: los humanos no lo ven ni lo completan.
  web: z.string().max(200).optional(),
});

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const json = (body: unknown, status = 200) =>
  Response.json(body, { status, headers: { "Cache-Control": "no-store" } });

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return json({ ok: false, error: "Solicitud inválida." }, 400);
  }

  const parsed = schema.safeParse(payload);
  if (!parsed.success) return json({ ok: false, error: "Revisá los datos del formulario." }, 400);
  const data = parsed.data;

  if (data.web) return json({ ok: true }); // bot: se descarta en silencio

  const apiKey = process.env["RESEND_API_KEY"];
  if (!apiKey) {
    console.error("[contact] Falta RESEND_API_KEY");
    return json({ ok: false, error: "El envío no está configurado." }, 500);
  }

  const nombre = data.nombre.replace(/[\r\n]+/g, " ");
  const organismo = data.organismo ? data.organismo.replace(/[\r\n]+/g, " ") : "";
  const firma = `${nombre} <${data.email}>${organismo ? ` · ${organismo}` : ""}`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env["CONTACT_FROM"] ?? "Tacuara Web <web@tacuara.com.ar>",
      to: [process.env["CONTACT_TO"] ?? "hola@tacuara.com.ar"],
      reply_to: data.email,
      subject: `Reunión CoopBono 2027 · ${nombre}`,
      text: `${data.mensaje}\n\n—\n${firma}`,
      html: `<p>${escapeHtml(data.mensaje).replace(/\n/g, "<br>")}</p><hr><p><b>${escapeHtml(nombre)}</b> &lt;${escapeHtml(data.email)}&gt;${organismo ? ` · ${escapeHtml(organismo)}` : ""}</p>`,
    }),
  });

  if (!res.ok) {
    console.error("[contact] Resend respondió", res.status, await res.text());
    return json({ ok: false, error: "No se pudo enviar el mensaje." }, 502);
  }
  return json({ ok: true });
}
