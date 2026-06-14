import { buildSystemInstruction } from "../../../lib/context";

export const runtime = "nodejs";

const GEMINI_MODEL = "gemini-flash-latest";
const GEMINI_URL   = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

export async function POST(request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return Response.json(
        { error: "Server is missing GEMINI_API_KEY." },
        { status: 500 }
      );
    }

    const body     = await request.json();
    const messages = Array.isArray(body.messages) ? body.messages : [];

    if (messages.length === 0) {
      return Response.json({ error: "No messages provided." }, { status: 400 });
    }

    const systemInstruction = buildSystemInstruction();

    const contents = messages.map((m) => ({
      role:  m.role === "assistant" ? "model" : "user",
      parts: [{ text: String(m.content || "") }],
    }));

    const geminiBody = {
      system_instruction: { parts: [{ text: systemInstruction }] },
      contents,
      generationConfig: { temperature: 0.4, maxOutputTokens: 2048 },
    };

    const geminiRes = await fetch(GEMINI_URL, {
      method:  "POST",
      headers: { "Content-Type": "application/json", "X-goog-api-key": apiKey },
      body:    JSON.stringify(geminiBody),
    });

    if (!geminiRes.ok) {
      const detail = await geminiRes.text();
      console.error("Gemini error:", geminiRes.status, detail);
      return Response.json(
        { error: "The AI engine is temporarily unavailable. Please try again." },
        { status: 502 }
      );
    }

    const data  = await geminiRes.json();
    const reply = data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join("") || "";

    if (!reply.trim()) {
      return Response.json(
        { error: "The AI returned an empty answer. Please rephrase." },
        { status: 502 }
      );
    }

    return Response.json({ reply });

  } catch (err) {
    console.error("Chat route error:", err);
    return Response.json({ error: "Unexpected server error." }, { status: 500 });
  }
}
