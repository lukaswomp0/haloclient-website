import React from "react";
import { Download } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* Radial glow behind logo */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex flex-col items-center text-center"
      >
        {/* Logo */}
        <div className="mb-10">
          <img
            src="https://media.base44.com/images/public/69f7df2e56284b566490c513/f7c58dcdf_image.png"
            alt="Logo"
            className="w-48 h-48 object-contain"
          />
        </div>

        {/* Version badge */}
        <div className="mb-6">
          <span className="inline-block px-4 py-1.5 rounded-full border border-primary/40 bg-primary/10 text-primary text-xs font-medium tracking-wide">
            Version 1.21.11
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-foreground leading-tight mb-4">
          Dominate with<br />
          <span className="text-primary">HeloClient</span>
        </h1>

        {/* Subtitle */}
        <p className="text-muted-foreground text-base md:text-lg max-w-lg mb-8">
          The most powerful Minecraft client — 50+ modules, clean UI, and
          undetected on major servers.
        </p>


        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <button
            onClick={() => document.getElementById("pricing").scrollIntoView({ behavior: "smooth" })}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors"
          >
            <Download className="w-4 h-4" />
            Get Lifetime - €12.00
          </button>
          <button
            onClick={() => document.getElementById("pricing").scrollIntoView({ behavior: "smooth" })}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-border bg-card text-foreground font-semibold text-sm hover:bg-secondary transition-colors"
          >
            Monthly - €6.00/mo
          </button>
        </div>

        {/* Feature tags */}
        <div className="flex flex-wrap justify-center gap-2">
          {["Fabric Loader", "50+ Modules", "8 Themes"].map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full border border-border text-muted-foreground text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}