import React from "react";

const links = [
  { label: "Features", href: "#features" },
  { label: "Modules", href: "#modules" },
  { label: "Pricing", href: "#pricing" },
];

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center py-4 px-6">
      <div className="flex items-center gap-8 px-6 py-2.5 rounded-full border border-border bg-card/60 backdrop-blur-md">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
          >
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
}