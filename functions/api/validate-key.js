export async function onRequestPost({ request, env }) {
  const { key } = await request.json();
  if (!key) return Response.json({ valid: false }, { status: 400 });

  const raw = await env.LICENSES.get(key);
  if (!raw) return Response.json({ valid: false });

  const data = JSON.parse(raw);
  return Response.json({ valid: data.status === "active", plan: data.mode });
}
