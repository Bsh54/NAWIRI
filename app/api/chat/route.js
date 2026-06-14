import { buildSystemInstruction } from "../../../lib/context";

export const runtime = "nodejs";

const GEMINI_MODEL = "gemini-flash-latest";
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

    // Call Gemini, retrying once on transient errors (429 quota / 503 overload / 500).
    let geminiRes = await callGemini(apiKey, geminiBody);
    if ([429, 500, 503].includes(geminiRes.status)) {
      await wait(1200);
      geminiRes = await callGemini(apiKey, geminiBody);
    }

    if (!geminiRes.ok) {
      const detail = await geminiRes.text();
      console.error("Gemini error:", geminiRes.status, detail);

      // Give the user an actionable message depending on the real cause.
      let msg = "The AI engine is temporarily unavailable. Please try again in a moment.";
      if (geminiRes.status === 429) {
        msg = "Too many requests right now (free quota reached). Please wait a minute and try again.";
      } else if (geminiRes.status === 400) {
        msg = "The request could not be processed. Please rephrase and try again.";
      } else if (geminiRes.status === 403) {
        msg = "The AI key is invalid or restricted. Please contact the team.";
      }
      return Response.json({ error: msg }, { status: 502 });
    }

    const data      = await geminiRes.json();
    const candidate = data?.candidates?.[0];

    // If the prompt itself was blocked, surface a clear message.
    const blockReason = data?.promptFeedback?.blockReason;
    if (blockReason) {
      console.error("Gemini prompt blocked:", blockReason);
      return Response.json(
        { error: "Your message could not be processed. Please rephrase it." },
        { status: 502 }
      );
    }

    const finish = candidate?.finishReason;
    const reply  = candidate?.content?.parts?.map((p) => p.text || "").join("") || "";

    // The model ran out of output budget before producing visible text.
    if (!reply.trim() && finish === "MAX_TOKENS") {
      console.error("Gemini hit MAX_TOKENS with empty text.");
      return Response.json(
        { error: "The answer was too long to generate. Please ask about one situation at a time." },
        { status: 502 }
      );
    }

    if (!reply.trim()) {
      console.error("Gemini empty reply. finishReason:", finish);
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
