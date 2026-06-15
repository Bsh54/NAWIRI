export const runtime = "nodejs";

const TRANSLATE_API =
  "https://shadsai2api-cloudflare.shadobsh.workers.dev/v1/chat/completions";

export async function POST(request) {
  try {
    const { text, src = "auto", tgt } = await request.json();
    if (!text || !tgt) {
      return Response.json({ error: "missing_params" }, { status: 400 });
    }

    const res = await fetch(TRANSLATE_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer 1",
        "User-Agent": "python-requests/2.31.0",
      },
      body: JSON.stringify({
        model: "google-translate",
        messages: [{ role: "user", content: text }],
        source_lang: src,
        target_lang: tgt,
        stream: false,
      }),
    });

    if (!res.ok) {
      return Response.json({ error: "translation_service_error" }, { status: 502 });
    }

    const data = await res.json();
    const result = data?.choices?.[0]?.message?.content?.trim();
    if (!result) {
      return Response.json({ error: "empty_result" }, { status: 502 });
    }

    return Response.json({ result });
  } catch {
    return Response.json({ error: "server_error" }, { status: 500 });
  }
}
