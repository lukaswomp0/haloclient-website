export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const sessionId = url.searchParams.get("session_id");
  if (!sessionId) return Response.json({ error: "missing session_id" }, { status: 400 });

  for (let i = 0; i < 10; i++) {
    const key = await env.LICENSES.get(`session:${sessionId}`);
    if (key) {
      const raw = await env.LICENSES.get(`key:${key}`);
      const data = raw ? JSON.parse(raw) : null;
      return Response.json({ key, email: data?.email });
    }
    await new Promise((r) => setTimeout(r, 1000));
  }

  return Response.json({ error: "key not ready yet" }, { status: 404 });
}
