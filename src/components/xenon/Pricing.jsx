import React from "react";
import { Zap, Crown, Check, X } from "lucide-react";
import { motion } from "framer-motion";

const plans = [
  {
    name: "Monthly",
    icon: Zap,
    subtitle: "Perfect for trying out Helo Client.",
    price: "€6.00",
    period: "/month",
    features: [
      { text: "50+ Modules", included: true },
      { text: "10 Custom Themes", included: true },
      { text: "All Future Updates", included: true },
      { text: "Lifetime Access", included: false },
      { text: "Priority Support", included: false },
    ],
    cta: "Get Monthly",
    highlighted: false,
    url: "https://buy.stripe.com/3cIbJ3d634ov2YN8hW0oM00",
  },
  {
    name: "Lifetime",
    icon: Crown,
    subtitle: "Pay once, own it forever.",
    price: "€12.00",
    period: "one-time",
    features: [
      { text: "50+ Modules", included: true },
      { text: "10 Custom Themes", included: true },
      { text: "All Future Updates", included: true },
      { text: "Lifetime Access", included: true },
      { text: "Priority Support", included: true },
    ],
    cta: "Get Lifetime",
    highlighted: true,
    url: "https://buy.stripe.com/REPLACE_LIFETIME_LINK",
  },
];

export default function Pricing() {
  return (
    <section className="px-4 md:px-8 lg:px-16 py-20">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 rounded-full border border-primary/40 bg-primary/10 text-primary text-xs font-medium mb-4">
            Pricing
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-foreground mb-3">
            Simple, honest pricing
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-md mx-auto">
            No hidden fees. Cancel monthly anytime or grab lifetime for the best value.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={`relative rounded-xl border p-6 ${
                plan.highlighted
                  ? "border-primary bg-card"
                  : "border-border bg-card"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                    Best Value
                  </span>
                </div>
              )}

              <div className="flex items-center gap-2 mb-2">
                <plan.icon className="w-5 h-5 text-muted-foreground" />
                <h3 className="text-lg font-bold text-foreground">{plan.name}</h3>
              </div>
              <p className="text-muted-foreground text-sm mb-5">{plan.subtitle}</p>

              <div className="mb-6">
                <span className="text-4xl font-extrabold text-foreground">
                  {plan.price}
                </span>
                <span className="text-muted-foreground text-sm ml-1">{plan.period}</span>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((f) => (
                  <li key={f.text} className="flex items-center gap-2">
                    {f.included ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <X className="w-4 h-4 text-muted-foreground" />
                    )}
                    <span
                      className={`text-sm ${
                        f.included ? "text-foreground font-medium" : "text-muted-foreground"
                      }`}
                    >
                      {f.text}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href={plan.url}
                className={`block text-center w-full py-3 rounded-lg font-semibold text-sm transition-colors ${
                  plan.highlighted
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "bg-secondary text-foreground hover:bg-secondary/80"
                }`}
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}