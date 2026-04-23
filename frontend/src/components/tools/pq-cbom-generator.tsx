import { useState } from "react";
import {
  analyzePostQuantumCBOM,
  generateCycloneDXCBOM,
  type AssetEntry,
  type AssetRisk,
  type CBOMResult,
} from "@/lib/tools/pq-cbom";

const SHELF_LABELS: Record<AssetEntry["shelfLife"], string> = {
  short:    "Short (<2 yrs)",
  medium:   "Med (2–5 yrs)",
  long:     "Long (5–10 yrs)",
  critical: "Crit (10+ yrs)",
};

const RISK_BADGE_CLASS: Record<AssetRisk, string> = {
  pqc_ready:    "tu-badge-ok",
  cnsa_safe:    "tu-badge-active",
  transitional: "tu-badge-warn",
  vulnerable:   "tu-badge-gap",
  critical:     "tu-badge-gap",
};

function uid(): string { return Math.random().toString(36).slice(2, 8); }
function blankAsset(): AssetEntry {
  return { id: uid(), name: "", algorithm: "", keySize: null, implementation: "", shelfLife: "medium" };
}

function scoreColor(score: number): string {
  if (score <= 15) return "#10b981";
  if (score <= 40) return "#d97706";
  return "#dc2626";
}

const COUNTER_KEY = "bkx_cbom_uses";
function getUses(): number { return Number(localStorage.getItem(COUNTER_KEY) ?? 0); }
function bumpUses() { localStorage.setItem(COUNTER_KEY, String(getUses() + 1)); }

export function PostQuantumCBOMGenerator() {
  const [assets, setAssets] = useState<AssetEntry[]>([blankAsset()]);
  const [result, setResult] = useState<CBOMResult | null>(null);
  const [locked, setLocked] = useState(false);
  const [copied, setCopied] = useState(false);

  const addAsset = () => setAssets((p) => [...p, blankAsset()]);
  const removeAsset = (id: string) => setAssets((p) => p.filter((a) => a.id !== id));
  const updateAsset = (id: string, field: keyof AssetEntry, value: string | number | null) => {
    setAssets((p) => p.map((a) => (a.id === id ? { ...a, [field]: value } : a)));
  };

  const onAnalyze = () => {
    const uses = getUses();
    if (uses >= 5) { setLocked(true); return; } // Increased limit for better UX
    bumpUses();
    const filtered = assets.filter((a) => a.name.trim() && a.algorithm.trim());
    if (!filtered.length) return;
    setResult(analyzePostQuantumCBOM(filtered));
  };

  const onExport = () => {
    if (!result) return;
    const json = generateCycloneDXCBOM(assets.filter((a) => a.name && a.algorithm), result);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bkx-cbom-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const onCopy = () => {
    if (!result) return;
    const json = generateCycloneDXCBOM(assets.filter((a) => a.name && a.algorithm), result);
    navigator.clipboard.writeText(json).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const onReset = () => { setAssets([blankAsset()]); setResult(null); };

  return (
    <div className="tu-wrap" style={{ position: "relative" }}>
      <span className="tu-tag">BKX Compliance Tools</span>
      <h1 className="tu-title">Post-Quantum CBOM Generator</h1>
      <p className="tu-subtitle">Map cryptographic asset risks and generate CycloneDX v1.6 exports.</p>
      <hr className="tu-divider" />

      <div className={`tu-split-layout ${locked ? "pointer-events-none opacity-40 blur-sm" : ""}`}>
        <div className="tu-split-left">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <h3 style={{ fontSize: "0.85rem", fontWeight: 700, margin: 0, color: "#0d2b5e", textTransform: "uppercase" }}>Asset Inventory</h3>
            <button onClick={addAsset} className="tu-btn tu-btn-sm">+ Add Row</button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", maxHeight: "500px", overflowY: "auto", paddingRight: "0.5rem", marginBottom: "1.5rem" }}>
            {assets.map((a) => (
              <div key={a.id} style={{ 
                background: "white", padding: "1rem", borderRadius: "8px", border: "1px solid #d4d9de", 
                display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", position: "relative" 
              }}>
                <button onClick={() => removeAsset(a.id)} style={{ position: "absolute", top: "5px", right: "5px", background: "none", border: "none", color: "#9ca3af", cursor: "pointer", fontSize: "0.75rem" }}>✕</button>
                <div className="tu-field">
                  <label style={{ fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", color: "#64748b" }}>Asset Name</label>
                  <input type="text" value={a.name} onChange={(e) => updateAsset(a.id, "name", e.target.value)} className="tu-input" style={{ padding: "0.4rem" }} placeholder="e.g. Root CA" />
                </div>
                <div className="tu-field">
                  <label style={{ fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", color: "#64748b" }}>Algorithm</label>
                  <input type="text" value={a.algorithm} onChange={(e) => updateAsset(a.id, "algorithm", e.target.value)} className="tu-input" style={{ padding: "0.4rem" }} placeholder="e.g. RSA-2048" />
                </div>
                <div className="tu-field">
                  <label style={{ fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", color: "#64748b" }}>Shelf Life</label>
                  <select value={a.shelfLife} onChange={(e) => updateAsset(a.id, "shelfLife", e.target.value as any)} className="tu-select" style={{ padding: "0.35rem" }}>
                    {Object.entries(SHELF_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                  </select>
                </div>
                <div className="tu-field">
                  <label style={{ fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", color: "#64748b" }}>Implementation</label>
                  <input type="text" value={a.implementation} onChange={(e) => updateAsset(a.id, "implementation", e.target.value)} className="tu-input" style={{ padding: "0.4rem" }} placeholder="Openssl" />
                </div>
              </div>
            ))}
          </div>

          <div className="tu-btn-row">
            <button onClick={onAnalyze} className="tu-btn tu-btn-primary">Generate CBOM Audit</button>
            {result && <button onClick={onReset} className="tu-btn">Reset</button>}
          </div>

          <div className="tu-aeo" style={{ marginTop: "2rem" }}>
            <p>
              <strong>CBOM Standard (2026):</strong> Post-Quantum Cryptography migration 
              mandated under NIS2 requires a Cryptographic Bill of Materials (CBOM). 
              RSA/ECC assets with data shelf-life exceeding 10 years are flagged as "Critical Risk" 
              due to "Harvest Now, Decrypt Later" threats.
            </p>
          </div>
        </div>

        <div className="tu-split-right">
          {result ? (
            <div className="tu-animate">
              <div className="tu-result" style={{ marginTop: 0 }}>
                <div className="tu-result-hero" style={{ padding: "1.25rem" }}>
                  <div className="tu-metric">
                    <span className="tu-metric-label">Quantum Risk</span>
                    <span className="tu-metric-value" style={{ color: scoreColor(result.quantumRiskScore), fontSize: "2rem" }}>{result.quantumRiskScore}</span>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                    <div style={{ textAlign: "center" }}><span style={{ fontSize: "1.25rem", fontWeight: 800, color: "#dc2626" }}>{result.criticalCount}</span><p style={{ fontSize: "0.6rem", color: "#64748b" }}>CRIT</p></div>
                    <div style={{ textAlign: "center" }}><span style={{ fontSize: "1.25rem", fontWeight: 800, color: "#10b981" }}>{result.safeCount}</span><p style={{ fontSize: "0.6rem", color: "#64748b" }}>SAFE</p></div>
                  </div>
                </div>
                
                <div className="tu-table-wrap" style={{ marginTop: "1rem" }}>
                  <table className="tu-table">
                    <thead>
                      <tr>
                        <th>Asset / Algorithm</th>
                        <th>Risk Level</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.assets.map((r) => (
                        <tr key={r.id}>
                          <td>
                            <span style={{ fontWeight: 600, display: "block", fontSize: "0.8rem" }}>{r.name}</span>
                            <span style={{ fontSize: "0.7rem", color: "#4f565c" }}>{r.algorithm}</span>
                          </td>
                          <td>
                            <span className={`tu-badge ${RISK_BADGE_CLASS[r.risk]}`} style={{ fontSize: "0.65rem" }}>
                              {r.risk.replace(/_/g, " ")}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="tu-btn-row" style={{ marginTop: "1rem", justifyContent: "center" }}>
                  <button onClick={onExport} className="tu-btn tu-btn-sm tu-btn-success">Export JSON</button>
                  <button onClick={onCopy} className="tu-btn tu-btn-sm">{copied ? "Copied!" : "Copy"}</button>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#f8fafc", border: "2px dashed #d4d9de", borderRadius: "10px", padding: "2rem", textAlign: "center" }}>
              <p style={{ color: "#64748b" }}>Enter cryptographic assets and click "Generate" to start the vault audit.</p>
            </div>
          )}
        </div>
      </div>

      {locked && (
        <div className="tu-limit-overlay">
          <div className="tu-limit-box">
            <h2>Analysis Limit Reached</h2>
            <p>You've used your free sessions. Upgrade for unlimited CBOM generation.</p>
            <a href="/contact" className="tu-btn tu-btn-primary">Unlock Pro Features</a>
          </div>
        </div>
      )}
    </div>
  );
}
