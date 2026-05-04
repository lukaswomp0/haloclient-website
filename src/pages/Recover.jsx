import { useState } from "react";

export default function Recover() {
  const [email, setEmail] = useState("");
  const [keys, setKeys] = useState(null);
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/recover", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    setKeys(data.keys || []);
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-lg w-full bg-card border border-border rounded-xl p-8">
        <h1 className="text-2xl font-extrabold mb-2">Lizenz wiederherstellen</h1>
        <p className="text-muted-foreground text-sm mb-6">
          Gib die E-Mail-Adresse ein, mit der du gekauft hast.
        </p>

        <form onSubmit={submit} className="flex gap-2 mb-6">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="dein@email.com"
            className="flex-1 px-3 py-2 rounded-lg bg-secondary border border-border text-sm"
          />
          <button
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold text-sm disabled:opacity-50"
          >
            {loading ? "..." : "Suchen"}
          </button>
        </form>

        {keys && keys.length === 0 && (
          <p className="text-sm text-muted-foreground">
            Keine Lizenz für diese E-Mail gefunden.
          </p>
        )}

        {keys && keys.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground mb-2">Deine Lizenzen:</p>
            {keys.map((k) => (
              <div
                key={k}
                className="bg-secondary rounded-lg p-3 font-mono text-sm break-all"
              >
                {k}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
