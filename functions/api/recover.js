export async function onRequestPost({ request, env }) {
  const { email } = await request.json();
  if (!email) return Response.json({ keys: [] });

  const raw = await env.LICENSES.get(`email:${email.toLowerCase()}`);
  const keys = raw ? JSON.parse(raw) : [];
  return Response.json({ keys });
}
