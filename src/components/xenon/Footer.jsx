import React from "react";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card/50 px-4 md:px-8 lg:px-16 py-5">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <img
            src="https://media.base44.com/images/public/69f7df2e56284b566490c513/f7c58dcdf_image.png"
            alt="Logo"
            className="w-8 h-8 object-contain"
          />
          <span className="text-foreground text-sm font-medium">Helo Client</span>
        </div>
        <p className="text-muted-foreground text-xs text-center">
          2026 Helo Client. Not affiliated with Mojang or Microsoft.
        </p>
        <a
          href="https://discord.gg/halooclient"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary text-sm font-medium hover:underline"
        >
          Discord
        </a>
      </div>
    </footer>
  );
}