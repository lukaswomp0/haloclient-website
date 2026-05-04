import Stripe from "stripe";

export async function onRequestPost({ request, env }) {
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
