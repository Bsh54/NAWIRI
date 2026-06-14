import { buildSystemInstruction, COUNTRIES, LANGUAGES } from "../../../lib/context";

// Run on the Node.js runtime (we read files from disk via the context lib).
export const runtime = "nodejs";

const GEMINI_MODEL = "gemini-flash-latest";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

export async function POST(request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return Response.json(
        { error: "Server is missing GEMINI_API_KEY. Set it in your environment variables." },
        { status: 500 }
      );
    }

    const body = await request.json();
    const country = COUNTRIES.includes(body.country) ? body.country : "Benin";
    const language = LANGUAGES.includes(body.language) ? body.language : "French";
    const messages = Array.isArray(body.messages) ? body.messages : [];

    if (messages.length === 0) {
      return Response.json({ error: "No messages provided." }, { status: 400 });
    }

    // Build the brain: system prompt + the selected country's program database.
    const systemInstruction = buildSystemInstruction({ country, language });

    // Convert our chat history to Gemini's format.
    // Our roles: "user" | "assistant"  →  Gemini roles: "user" | "model".
    const contents = messages.map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: String(m.content || "") }],
    }));

    const geminiBody = {
      system_instruction: { parts: [{ text: systemInstruction }] },
      contents,
      generationConfig: {
        temperature: 0.4,
        maxOutputTokens: 1024,
      },
    };

    const geminiRes = await fetch(GEMINI_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-goog-api-key": apiKey,
      },
      body: JSON.stringify(geminiBody),
    });

    if (!geminiRes.ok) {
      const detail = await geminiRes.text();
      console.error("Gemini error:", geminiRes.status, detail);
      return Response.json(
        { error: "The AI engine is temporarily unavailable. Please try again." },
        { status: 502 }
      );
    }

    const data = await geminiRes.json();
    const reply =
      data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join("") || "";

    if (!reply.trim()) {
      return Response.json(
        { error: "The AI engine returned an empty answer. Please rephrase." },
        { status: 502 }
      );
    }

    return Response.json({ reply });
  } catch (err) {
    console.error("Chat route error:", err);
    return Response.json({ error: "Unexpected server error." }, { status: 500 });
  }
}
