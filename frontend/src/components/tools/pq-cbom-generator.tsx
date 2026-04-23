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
  medium:   "Medium (2–5 yrs)",
  long:     "Long (5–10 yrs)",
  critical: "Critical (10+ yrs)",
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
    if (uses >= 3) { setLocked(true); return; }
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

      <div className="tu-aeo">
        <p>
          <strong>As of April 2026</strong>, migration to Post-Quantum Cryptography is mandated
          for critical infrastructure under NIS2 and EO 14028. This CBOM Generator identifies
          quantum-vulnerable algorithms (RSA, ECC) and maps them to NIST-approved replacements (ML-KEM, ML-DSA).
        </p>
      </div>

      <span className="tu-tag">BKX Compliance Tools</span>
      <h1 className="tu-title">Post-Quantum CBOM Generator</h1>
      <p className="tu-subtitle">Define your cryptographic asset inventory. Receive a Quantum Risk Score and CycloneDX v1.6 export.</p>
      <hr className="tu-divider" />

      <div className={locked ? "pointer-events-none opacity-40 blur-sm" : ""} style={{ position: "relative" }}>

        {/* Column headers */}
        <div className="tu-asset-col-labels">
          <span className="tu-asset-col-label">Asset Name</span>
          <span className="tu-asset-col-label">Algorithm</span>
          <span className="tu-asset-col-label">Key Size</span>
          <span className="tu-asset-col-label">Implementation</span>
          <span className="tu-asset-col-label">Data Shelf Life</span>
          <span />
        </div>

        {/* Asset rows */}
        <div className="tu-asset-grid">
          {assets.map((a) => (
            <div key={a.id} className="tu-asset-row">
              <input
                type="text"
                placeholder="e.g. JWT Signing Key"
                value={a.name}
                onChange={(e) => updateAsset(a.id, "name", e.target.value)}
                className="tu-input"
              />
              <input
                type="text"
                placeholder="e.g. RSA, ML-KEM-768"
                value={a.algorithm}
                onChange={(e) => updateAsset(a.id, "algorithm", e.target.value)}
                className="tu-input"
              />
              <input
                type="number"
                placeholder="2048"
                value={a.keySize ?? ""}
                onChange={(e) => updateAsset(a.id, "keySize", e.target.value ? Number(e.target.value) : null)}
                className="tu-input"
              />
              <input
                type="text"
                placeholder="e.g. OpenSSL 3.3"
                value={a.implementation}
                onChange={(e) => updateAsset(a.id, "implementation", e.target.value)}
                className="tu-input"
              />
              <select
                value={a.shelfLife}
                onChange={(e) => updateAsset(a.id, "shelfLife", e.target.value as AssetEntry["shelfLife"])}
                className="tu-select"
              >
                {(Object.entries(SHELF_LABELS) as [AssetEntry["shelfLife"], string][]).map(([k, v]) => (
                  <option key={k} value={k}>{v}</option>
                ))}
              </select>
              <button onClick={() => removeAsset(a.id)} className="tu-remove-btn" title="Remove asset">✕</button>
            </div>
          ))}
        </div>

        <div className="tu-btn-row">
          <button onClick={addAsset} className="tu-btn">+ Add Asset</button>
          <button onClick={onAnalyze} className="tu-btn tu-btn-primary">Analyze CBOM</button>
          {result && <button onClick={onReset} className="tu-btn">Reset</button>}
        </div>

        {result && (
          <div className="tu-animate">
            {/* Score header */}
            <div className="tu-result">
              <div className="tu-result-hero">
                <div className="tu-metric">
                  <span className="tu-metric-label">Quantum Risk Score</span>
                  <span className="tu-metric-value" style={{ color: scoreColor(result.quantumRiskScore) }}>
                    {result.quantumRiskScore}<span className="tu-metric-unit">/100</span>
                  </span>
                </div>
                <div className="tu-metric">
                  <span className="tu-metric-label">Critical</span>
                  <span className="tu-metric-value danger">{result.criticalCount}</span>
                </div>
                <div className="tu-metric">
                  <span className="tu-metric-label">Vulnerable</span>
                  <span className="tu-metric-value warn">{result.vulnerableCount}</span>
                </div>
                <div className="tu-metric">
                  <span className="tu-metric-label">Transitional</span>
                  <span className="tu-metric-value">{result.transitionalCount}</span>
                </div>
                <div className="tu-metric">
                  <span className="tu-metric-label">Safe</span>
                  <span className="tu-metric-value success">{result.safeCount}</span>
                </div>
              </div>
              <div className="tu-actions">
                <button onClick={onExport} className="tu-btn tu-btn-success">Export CycloneDX JSON</button>
                <button onClick={onCopy} className="tu-btn">{copied ? "Copied!" : "Copy JSON"}</button>
              </div>
            </div>

            {/* Remediation table */}
            <div className="tu-table-wrap" style={{ marginTop: "1rem" }}>
              <table className="tu-table">
                <thead>
                  <tr>
                    <th>Asset</th>
                    <th>Algorithm</th>
                    <th>Standard</th>
                    <th>Risk</th>
                    <th>NIS2</th>
                    <th>Remediation</th>
                  </tr>
                </thead>
                <tbody>
                  {result.assets.map((r) => (
                    <tr key={r.id}>
                      <td style={{ fontWeight: 600 }}>{r.name}</td>
                      <td>{r.algorithm}</td>
                      <td style={{ fontSize: "0.78rem" }}>{r.fiproStatus}</td>
                      <td>
                        <span className={`tu-badge ${RISK_BADGE_CLASS[r.risk]}`}>
                          {r.risk.replace(/_/g, " ")}
                        </span>
                      </td>
                      <td>
                        {r.nis2Flagged
                          ? <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#dc2626" }}>⚑ Flagged</span>
                          : <span style={{ color: "#d4d9de" }}>—</span>}
                      </td>
                      <td style={{ fontSize: "0.8rem", color: "#4f565c" }}>
                        {r.remediationAction}
                        {r.migrateTo && (
                          <span style={{ display: "block", marginTop: "0.2rem", fontWeight: 600, color: "#0d2b5e" }}>
                            → {r.migrateTo}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {locked && (
        <div className="tu-limit-overlay">
          <div className="tu-limit-box">
            <h2>Usage Limit Reached</h2>
            <p>
              You've used 3 free analyses. Upgrade to BKX Labs Pro for unlimited CBOM generation,
              bulk imports, and team PDF reports.
            </p>
            <a href="/contact" className="tu-btn tu-btn-primary" style={{ width: "100%", justifyContent: "center" }}>
              Unlock Unlimited Access
            </a>
          </div>
        </div>
      )}

      <article className="tu-prose">
        <h2>PQC Migration Guide (2026 Edition)</h2>
        <p>
          The NSA, NIST, and CISA have issued guidance mandating migration away from classical public-key
          cryptography. The reason: the imminent arrival of the Cryptographically Relevant Quantum Computer (CRQC).
        </p>

        <h3>Q-Day Timeline</h3>
        <p>
          Q-Day is the date a CRQC becomes operationally available to a well-resourced adversary. A CRQC running
          Shor's Algorithm reduces the factoring problem underpinning RSA — and the discrete logarithm problem
          underlying ECC — from computationally intractable to solvable in polynomial time. NSA's mandates treat
          2030 as a hard deadline for National Security Systems. For security architects, the safe planning window
          is now, not 2028.
        </p>

        <h3>Why AES-256 is Quantum-Resistant but RSA-4096 is Not</h3>
        <p>
          RSA's security is rooted in integer factorization — a problem Shor's Algorithm solves efficiently on a
          quantum computer. An RSA-4096 key offers zero additional quantum resistance compared to RSA-2048.
          AES-256 is only threatened by Grover's Algorithm, which provides a quadratic speedup. Against AES-256,
          this reduces effective security to roughly 128 bits — still computationally infeasible. NIST's CNSA 2.0
          formally endorses AES-256 and SHA-384/512 as sufficient, requiring no algorithm replacement.
        </p>

        <h3>Implementing Hybrid Key Exchanges</h3>
        <p>
          Pure ML-KEM adoption faces compatibility barriers during the 2024–2030 transition. The recommended bridge
          is a Hybrid Key Exchange — simultaneously running both a classical and a PQC key encapsulation mechanism,
          deriving the session key from the concatenation of both secrets using a KDF. TLS 1.3 is being extended
          to support X25519MLKEM768, combining X25519 ECDH with ML-KEM-768. Google Chrome has shipped this
          hybrid by default since 2024.
        </p>

        <h3>Embedding CBOM in CI/CD Pipelines</h3>
        <p>The sustainable solution is native CI/CD CBOM generation as a non-blocking verification gate:</p>
        <ol>
          <li><strong>Generation:</strong> On each merge to <code>main</code>, output a <code>bom.json</code> in CycloneDX v1.6 format.</li>
          <li><strong>Scanning:</strong> Submit to Dependency-Track. Any newly flagged algorithm triggers a pipeline failure.</li>
          <li><strong>Policy Enforcement:</strong> Block deployments if any component is flagged <code>nis2Flagged: true</code> or risk score &gt;70.</li>
          <li><strong>Attestation:</strong> GPG-sign and upload the validated <code>bom.json</code> to your attestation store (AWS Signer, Sigstore).</li>
          <li><strong>Drift Detection:</strong> Compare the current inventory against the pinned audit baseline weekly.</li>
        </ol>
      </article>
    </div>
  );
}
