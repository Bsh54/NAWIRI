import { buildSystemInstruction } from "../../../lib/context";

export const runtime = "nodejs";

// Flash-Lite: no "thinking" tokens (faster, far lighter on the free quota)
// while still giving complete, well-structured answers in FR/EN.
const GEMINI_MODEL = "gemini-flash-lite-latest";
// Streaming endpoint (Server-Sent Events): the answer arrives token by token.
const GEMINI_URL   = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:streamGenerateContent?alt=sse`;

const SOFT_ERROR =
  "I could not answer just now. Please wait a moment and try again.";

// Calls Gemini once (streaming). Returns the raw fetch Response.
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

    const geminiRes = await callGemini(apiKey, geminiBody);

    // On a hard error we have not streamed anything yet, so we can still
    // return a clean JSON soft-error (no technical detail leaks).
    if (!geminiRes.ok || !geminiRes.body) {
      console.error("[chat] gemini status", geminiRes.status);
      return Response.json({ error: SOFT_ERROR }, { status: 502 });
    }

    // Parse Gemini's SSE stream and forward only the plain text deltas.
    const reader  = geminiRes.body.getReader();
    const decoder = new TextDecoder();
    const encoder = new TextEncoder();
    let buffer = "";
    let sentAny = false;

    const stream = new ReadableStream({
      async start(controller) {
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop(); // keep the last, possibly-incomplete line
            for (const line of lines) {
              const t = line.trim();
              if (!t.startsWith("data:")) continue;
              const json = t.slice(5).trim();
              if (!json || json === "[DONE]") continue;
              try {
                const obj   = JSON.parse(json);
                const parts = obj?.candidates?.[0]?.content?.parts || [];
                for (const p of parts) {
                  if (p.text) {
                    controller.enqueue(encoder.encode(p.text));
                    sentAny = true;
                  }
                }
              } catch { /* ignore a malformed chunk */ }
            }
          }
          if (!sentAny) {
            console.error("[chat] empty stream");
            controller.enqueue(encoder.encode(SOFT_ERROR));
          }
          controller.close();
        } catch {
          console.error("[chat] stream error");
          if (!sentAny) controller.enqueue(encoder.encode(SOFT_ERROR));
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type":  "text/plain; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
      },
    });

  } catch {
    console.error("[chat] server error");
    return Response.json(
      { error: "I could not answer just now. Please wait a moment and try again." },
      { status: 500 }
    );
  }
}
