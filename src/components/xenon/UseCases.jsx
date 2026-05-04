import React from "react";
import { Castle, Swords, Sword } from "lucide-react";
import { motion } from "framer-motion";

const useCases = [
  {
    icon: Castle,
    title: "Base Finding",
    description:
      "Locate hidden bases fast with ChunkFinder, Growth Finder, and StorageESP. See what others can't and strike first.",
    tags: ["Chunk Finder", "Growth Finder", "Storage ESP", "Sus ESP"],
  },
  {
    icon: Swords,
    title: "Crystal PvP",
    description:
      "Built for high tier end crystal combat and hole pressure. The most mechanically heavy meta, Helo takes care of it all.",
    tags: ["AutoCrystal", "Auto Hit Crystal", "Auto Totem", "Anchor Macro"],
  },
  {
    icon: Sword,
    title: "Sword PvP",
    description:
      "Dominate every sword fight with precision aim, smooth movement and full combat control. Built to give you the edge in every duel.",
    tags: ["Triggerbot", "Auto Shield Breaker", "W Tap"],
  },
];

export default function UseCases() {
  return (
    <section className="px-4 md:px-8 lg:px-16 py-20">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 rounded-full border border-primary/40 bg-primary/10 text-primary text-xs font-medium mb-4">
            Use Cases
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-foreground mb-3">
            Built for every <span className="text-primary">playstyle</span>
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-md mx-auto">
            Whether you're hunting bases or dominating PvP, Helo has the modules for it.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-5">
          {useCases.map((uc, i) => (
            <motion.div
              key={uc.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="rounded-xl border border-border bg-card p-6"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <uc.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{uc.title}</h3>
              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                {uc.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {uc.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-md bg-secondary text-secondary-foreground text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}