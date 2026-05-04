import Stripe from "stripe";

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;

    try {
      if (path === "/api/stripe-webhook" && request.method === "POST") {
        return await handleStripeWebhook(request, env);
      }
      if (path === "/api/get-key" && request.method === "GET") {
        return await handleGetKey(request, env);
      }
      if (path === "/api/recover" && request.method === "POST") {
        return await handleRecover(request, env);
      }
      if (path === "/api/admin/grant" && request.method === "POST") {
        return await handleAdminGrant(request, env);
      }
      if (path === "/api/admin/revoke" && request.method === "POST") {
        return await handleAdminRevoke(request, env);
      }
    } catch (err) {
      return new Response(`Server error: ${err.message}`, { status: 500 });
    }

    return env.ASSETS.fetch(request);
  },
};

async function handleStripeWebhook(request, env) {
  const stripe = new Stripe(env.STRIPE_SECRET_KEY);
  const sig = request.headers.get("stripe-signature");
  const body = await request.text();

  let event;
  try {
    event = await stripe.webhooks.constructEventAsync(
      body,
      sig,
      env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (err) {
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const email = (session.customer_details?.email || "").toLowerCase();
    if (!email) return new Response("no email", { status: 400 });

    const key = `HELO-${crypto.randomUUID().replace(/-/g, "").slice(0, 20).toUpperCase()}`;

    const data = {
      key,
      email,
      sessionId: session.id,
      amount: session.amount_total,
      currency: session.currency,
      mode: session.mode,
      status: "active",
      createdAt: Date.now(),
    };

    await env.LICENSES.put(`key:${key}`, JSON.stringify(data));
    await env.LICENSES.put(`session:${session.id}`, key);

    const existingRaw = await env.LICENSES.get(`email:${email}`);
    const existing = existingRaw ? JSON.parse(existingRaw) : [];
    existing.push(key);
    await env.LICENSES.put(`email:${email}`, JSON.stringify(existing));
  }

  return new Response("ok");
}

async function handleGetKey(request, env) {
  const url = new URL(request.url);
  const sessionId = url.searchParams.get("session_id");
  if (!sessionId)
    return Response.json({ error: "missing session_id" }, { status: 400 });

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

async function handleRecover(request, env) {
  const { email } = await request.json();
  if (!email) return Response.json({ keys: [] });

  const raw = await env.LICENSES.get(`email:${email.toLowerCase()}`);
  const keys = raw ? JSON.parse(raw) : [];
  return Response.json({ keys });
}

function checkAdminAuth(request, env) {
  const auth = request.headers.get("authorization") || "";
  const token = auth.replace(/^Bearer\s+/i, "");
  return env.ADMIN_TOKEN && token === env.ADMIN_TOKEN;
}

async function handleAdminGrant(request, env) {
  if (!checkAdminAuth(request, env)) {
    return new Response("unauthorized", { status: 401 });
  }

  const { email, mode = "payment", note } = await request.json();
  if (!email) return Response.json({ error: "email required" }, { status: 400 });

  const normalizedEmail = email.toLowerCase();
  const key = `HELO-${crypto.randomUUID().replace(/-/g, "").slice(0, 20).toUpperCase()}`;

  const data = {
    key,
    email: normalizedEmail,
    mode,
    status: "active",
    grantedManually: true,
    note: note || null,
    createdAt: Date.now(),
  };

  await env.LICENSES.put(`key:${key}`, JSON.stringify(data));

  const existingRaw = await env.LICENSES.get(`email:${normalizedEmail}`);
  const existing = existingRaw ? JSON.parse(existingRaw) : [];
  existing.push(key);
  await env.LICENSES.put(`email:${normalizedEmail}`, JSON.stringify(existing));

  return Response.json({ success: true, key, email: normalizedEmail, mode });
}

async function handleAdminRevoke(request, env) {
  if (!checkAdminAuth(request, env)) {
    return new Response("unauthorized", { status: 401 });
  }

  const { key } = await request.json();
  if (!key) return Response.json({ error: "key required" }, { status: 400 });

  const raw = await env.LICENSES.get(`key:${key}`);
  if (!raw) return Response.json({ error: "key not found" }, { status: 404 });

  const data = JSON.parse(raw);
  data.status = "revoked";
  data.revokedAt = Date.now();
  await env.LICENSES.put(`key:${key}`, JSON.stringify(data));

  return Response.json({ success: true, key, status: "revoked" });
}
