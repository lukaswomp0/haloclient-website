import React from "react";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

const reviews = [
  {
    stars: 5,
    text: "Found 3 bases in my first session, insane client.",
    plan: "Helo Lifetime",
  },
  {
    stars: 5,
    text: "Found 12 bases within an hour, absolutely worth it.",
    plan: "Helo Lifetime",
  },
  {
    stars: 4,
    text: "Best donutsmp client, no cap.",
    plan: "Helo Lifetime",
  },
  {
    stars: 5,
    text: "Solid 10/10, its very worth it for the price.",
    plan: "Helo Lifetime",
  },
  {
    stars: 5,
    text: "Genuinely the most goated client out there.",
    plan: "Helo Monthly",
  },
  {
    stars: 4,
    text: "Bought monthly to try it out and already found 5 bases...",
    plan: "Helo Monthly",
  },
];

function StarRating({ count }) {
  return (
    <div className="flex gap-0.5 mb-2">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < count ? "text-primary fill-primary" : "text-muted-foreground"
          }`}
        />
      ))}
    </div>
  );
}

export default function Reviews() {
  return (
    <section className="px-4 md:px-8 lg:px-16 py-20">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 rounded-full border border-primary/40 bg-primary/10 text-primary text-xs font-medium mb-4">
            Reviews
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-foreground mb-3">
            Some Reviews <span className="text-primary">from us</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {reviews.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="rounded-xl border border-border bg-card p-5"
            >
              <>
                <StarRating count={r.stars} />
                <p className="text-foreground text-sm font-medium mb-2 leading-relaxed">
                  {r.text}
                </p>
                <p className="text-muted-foreground text-xs">{r.plan}</p>
              </>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}