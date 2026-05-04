import React from "react";
import { motion } from "framer-motion";

const categories = [
  {
    label: "Combat",
    color: "text-primary",
    border: "border-primary/30",
    bg: "bg-primary/10",
    modules: ["Auto Totem", "Hover Totem", "Auto Inv Totem", "Anchor Macro", "Auto Crystal", "Auto Hit Crystal", "Double Anchor", "Hitbox", "Elytra Swap", "Mace Swap", "Spear Swap", "Auto Double Hand", "Triggerbot", "Shield Breaker"],
  },
  {
    label: "Utility",
    color: "text-primary",
    border: "border-primary/30",
    bg: "bg-primary/10",
    modules: ["Fast Place", "Auto Tool", "Auto Log", "Sprint", "Skin Changer", "Coord Snapper", "Home Setter", "Swing Speed", "Free Look", "Tab Detector", "Weather Notifier", "Name Protect", "Name Tags"],
  },
  {
    label: "Donut",
    color: "text-primary",
    border: "border-primary/30",
    bg: "bg-primary/10",
    modules: ["Chunk Finder", "Growth Finder", "Anti Trap", "Spawner Protect", "Bone Dropper", "Activity Debug", "Fake Stats", "Fake Roles"],
  },
  {
    label: "Render",
    color: "text-primary",
    border: "border-primary/30",
    bg: "bg-primary/10",
    modules: ["Player ESP", "Block ESP", "Amethyst ESP", "Mob ESP", "Storage ESP", "Hole ESP", "Light Debug", "FullBright", "Freecam", "No Render", "Jump Circles", "Spotify HUD"],
  },
  {
    label: "Client",
    color: "text-primary",
    border: "border-primary/30",
    bg: "bg-primary/10",
    modules: ["Helo+", "Themes", "Friends", "Configs", "HUD"],
  },
];

export default function ModulesList() {
  return (
    <section className="px-4 md:px-8 lg:px-16 py-20">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 rounded-full border border-primary/40 bg-primary/10 text-primary text-xs font-medium mb-4">
            50+ Modules
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-foreground mb-3">
            Some modules from us
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-md mx-auto">
            Every module is fully configurable. Here's a glimpse of what's inside.
          </p>
        </div>

        {/* Categories */}
        <div className="space-y-8">
          {categories.map((cat, ci) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: ci * 0.07 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className={`text-xs font-semibold uppercase tracking-widest ${cat.color}`}>
                  {cat.label}
                </span>
                <div className="flex-1 h-px bg-border" />
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.modules.map((mod) => (
                  <span
                    key={mod}
                    className={`px-3 py-1.5 rounded-full border ${cat.border} ${cat.bg} ${cat.color} text-xs font-medium cursor-default transition-opacity hover:opacity-80`}
                  >
                    {mod}
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