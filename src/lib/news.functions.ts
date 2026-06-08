import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const StyleSchema = z.enum(["animado", "casual", "cronica"]);

const InputSchema = z.object({
  topic: z.string().max(2000).optional().default(""),
  details: z.string().max(5000).optional().default(""),
  style: StyleSchema.default("casual"),
  photos: z.array(z.string().url()).max(20).optional().default([]),
});

type Generated = {
  title: string;
  excerpt: string;
  content: string;
  whatsapp: string;
  instagram: string;
};

const STYLE_BRIEFS: Record<z.infer<typeof StyleSchema>, string> = {
  animado: "Tono entusiasta y festivo. Usa emojis con moderación (2-5 en el contenido).",
  casual: "Tono cercano y amigable. Natural, sin formalismos, sin emojis en el contenido.",
  cronica: "Tono de crónica deportiva (estilo diario). Periodístico, sobrio, sin emojis en el contenido.",
};

export const generateNews = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => InputSchema.parse(input))
  .handler(async ({ data }): Promise<Generated> => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) throw new Error("Missing LOVABLE_API_KEY");

    const system = `Eres redactor de Fortux, marca de golf (reparación, mantenimiento, academia y Circuito Pitch & Putt).
Escribes SIEMPRE en español de España.
${STYLE_BRIEFS[data.style]}
Devuelves EXCLUSIVAMENTE un objeto JSON válido con esta forma exacta y sin texto adicional:
{
  "title": "Titular corto y atractivo (máx. 80 caracteres)",
  "excerpt": "Resumen de 1-2 frases (máx. 180 caracteres)",
  "content": "Cuerpo de la noticia en Markdown, 3-6 párrafos, con subtítulos ## si procede",
  "whatsapp": "Versión para WhatsApp: 4-8 líneas, emojis adecuados, salto de línea entre bloques, sin enlaces",
  "instagram": "Versión para Instagram: gancho inicial, 4-8 líneas, emojis, termina con 5-8 hashtags relevantes en español"
}`;

    const userParts: Array<Record<string, unknown>> = [];
    const promptText = [
      data.topic && `TEMA: ${data.topic}`,
      data.details && `DETALLES ADICIONALES:\n${data.details}`,
      data.photos.length > 0 && `Se adjuntan ${data.photos.length} imagen(es) como referencia visual; descríbelas brevemente si aportan al texto.`,
      "Genera la noticia ahora siguiendo estrictamente el JSON.",
    ].filter(Boolean).join("\n\n");
    userParts.push({ type: "text", text: promptText });
    for (const url of data.photos) {
      userParts.push({ type: "image_url", image_url: { url } });
    }

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: system },
          { role: "user", content: userParts },
        ],
        response_format: { type: "json_object" },
      }),
    });

    if (!res.ok) {
      const txt = await res.text();
      if (res.status === 429) throw new Error("Límite de uso de IA alcanzado. Intenta de nuevo en unos minutos.");
      if (res.status === 402) throw new Error("Créditos de IA agotados en el workspace.");
      throw new Error(`Error IA (${res.status}): ${txt.slice(0, 200)}`);
    }

    const payload = (await res.json()) as { choices?: Array<{ message?: { content?: string } }> };
    const raw = payload.choices?.[0]?.message?.content ?? "";
    let parsed: Generated;
    try {
      parsed = JSON.parse(raw) as Generated;
    } catch {
      throw new Error("La IA no devolvió un JSON válido. Reintenta.");
    }
    return {
      title: String(parsed.title ?? "").trim(),
      excerpt: String(parsed.excerpt ?? "").trim(),
      content: String(parsed.content ?? "").trim(),
      whatsapp: String(parsed.whatsapp ?? "").trim(),
      instagram: String(parsed.instagram ?? "").trim(),
    };
  });
