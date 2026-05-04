import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";

export default function Success() {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");
  const [state, setState] = useState({ loading: true, key: null, email: null, error: null });

  useEffect(() => {
    if (!sessionId) {
      setState({ loading: false, error: "Keine Session gefunden." });
      return;
    }
    fetch(`/api/get-key?session_id=${encodeURIComponent(sessionId)}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.key) setState({ loading: false, key: d.key, email: d.email });
        else setState({ loading: false, error: d.error || "Key noch nicht bereit." });
      })
      .catch(() => setState({ loading: false, error: "Netzwerkfehler." }));
  }, [sessionId]);

  function copy() {
    if (state.key) navigator.clipboard.writeText(state.key);
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-lg w-full bg-card border border-border rounded-xl p-8">
        <h1 className="text-2xl font-extrabold mb-2">Danke für deinen Kauf!</h1>
        <p className="text-muted-foreground text-sm mb-6">
          Hier ist dein Helo Client Lizenz-Key. Bewahre ihn gut auf — du kannst ihn
          bei Verlust unter <Link to="/recover" className="underline">/recover</Link> mit
          deiner E-Mail wiederherstellen.
        </p>

        {state.loading && (
          <div className="flex items-center gap-3 text-muted-foreground text-sm">
            <div className="w-4 h-4 border-2 border-muted-foreground border-t-transparent rounded-full animate-spin" />
            Lizenz wird erstellt...
          </div>
        )}

        {state.error && !state.loading && (
          <div className="text-sm text-red-500">
            {state.error} Falls die Zahlung erfolgreich war, lade in 10 Sekunden neu
            oder nutze /recover mit deiner E-Mail.
          </div>
        )}

        {state.key && (
          <>
            <div className="bg-secondary rounded-lg p-4 font-mono text-sm break-all mb-4">
              {state.key}
            </div>
            <button
              onClick={copy}
              className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90"
            >
              Key kopieren
            </button>
            {state.email && (
              <p className="text-xs text-muted-foreground mt-3">
                Verknüpft mit: {state.email}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
