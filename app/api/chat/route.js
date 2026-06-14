import { buildSystemInstruction } from "../../../lib/context";

export const runtime = "nodejs";

// Flash-Lite: no "thinking" tokens (faster, far lighter on the free quota)
// while still giving complete, well-structured answers in FR/EN.
const GEMINI_MODEL = "gemini-flash-lite-latest";
const GEMINI_URL   = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

// Small helper: wait n ms.
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

// Calls Gemini once. Returns the raw fetch Response.
async function callGemini(apiKey, geminiBody) {
  return fetch(GEMINI_URL, {
    method:  "POST",
    headers: { "Content-Type": "application/json", "X-goog-api-key": apiKey },
    body:    JSON.stringify(geminiBody),
  });
}

export async function POST(request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("[chat] missing api key");
      return Response.json(
        { error: "I could not answer just now. Please wait a moment and try again." },
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
      generationConfig: { temperature: 0.4, maxOutputTokens: 4096 },
      // Be permissive: this is social-aid orientation, not harmful content.
      // Avoids spurious SAFETY blocks on messages mentioning illness, money, children, etc.
      safetySettings: [
        { category: "HARM_CATEGORY_HARASSMENT",        threshold: "BLOCK_NONE" },
        { category: "HARM_CATEGORY_HATE_SPEECH",       threshold: "BLOCK_NONE" },
        { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
        { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" },
      ],
    };

    // Call Gemini, retrying once only on genuine transient overload (500/503).
    // We do NOT retry 429 (quota): retrying just burns more of the limit.
    let geminiRes = await callGemini(apiKey, geminiBody);
    if ([500, 503].includes(geminiRes.status)) {
      await wait(1200);
      geminiRes = await callGemini(apiKey, geminiBody);
    }

    // One soft, neutral message for every failure case. No technical detail
    // is ever exposed to the user. Logs stay minimal (status code only).
    const SOFT_ERROR =
      "I could not answer just now. Please wait a moment and try again.";

    if (!geminiRes.ok) {
      console.error("[chat] gemini status", geminiRes.status);
      return Response.json({ error: SOFT_ERROR }, { status: 502 });
    }

    const data      = await geminiRes.json();
    const candidate = data?.candidates?.[0];
    const reply     = candidate?.content?.parts?.map((p) => p.text || "").join("") || "";

    if (!reply.trim()) {
      console.error("[chat] empty reply", candidate?.finishReason || "no_candidate");
      return Response.json({ error: SOFT_ERROR }, { status: 502 });
    }

    return Response.json({ reply });

  } catch {
    console.error("[chat] server error");
    return Response.json(
      { error: "I could not answer just now. Please wait a moment and try again." },
      { status: 500 }
    );
  }
}
