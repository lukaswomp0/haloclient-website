import React from "react";
import { Swords, Eye, Wrench, Shield, Zap, Palette } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Swords,
    title: "Combat Modules",
    description: "AutoTotem, AnchorMacro, Auto Crystal and more — built to win every PvP fight.",
  },
  {
    icon: Eye,
    title: "Visual Enhancements",
    description: "ChunkFinder, Growth Finder, StorageESP — see everything your enemies can't hide.",
  },
  {
    icon: Wrench,
    title: "Utility Tools",
    description: "AutoTool, Freecam, HomeResetter and dozens of quality-of-life modules.",
  },
  {
    icon: Shield,
    title: "Anti-Cheat Safe",
    description: "Tested against popular anti-cheat plugins. Play safely on most major servers.",
  },
  {
    icon: Zap,
    title: "Zero Lag",
    description: "Lightweight and blazing fast. No FPS drops even with all modules running.",
  },
  {
    icon: Palette,
    title: "Custom Themes",
    description: "8 hand-crafted themes. Redesign the entire UI to match your personal style.",
  },
];

export default function Features() {
  return (
    <section className="px-4 md:px-8 lg:px-16 py-20">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 rounded-full border border-primary/40 bg-primary/10 text-primary text-xs font-medium mb-4">
            Features
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-foreground mb-3">
            Dominate with our Features
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-md mx-auto">
            Helo packs a full suite of modules for every playstyle — from sweaty PvP to chill utility.
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="rounded-xl border border-border bg-card p-6"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <f.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-base font-bold text-foreground mb-2">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {f.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}