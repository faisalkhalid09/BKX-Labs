import { useState } from "react";
import { scoreCryptoAgilityMaturity } from "@/lib/tools/crypto-agility-maturity";

const DIMENSIONS = [
  { key: "inventoryScore",   label: "Cryptographic Inventory",    desc: "Completeness of crypto asset cataloguing" },
  { key: "abstractionScore", label: "Algorithm Abstraction",       desc: "Use of crypto abstraction layers / KMS" },
  { key: "kmsScore",         label: "Key Management System",       desc: "Maturity of key lifecycle management" },
  { key: "testingScore",     label: "Crypto-Agility Testing",      desc: "Automated tests for algorithm swaps" },
  { key: "governanceScore",  label: "Governance & Policy",         desc: "Documented policy for algorithm migration" },
] as const;

type Key = typeof DIMENSIONS[number]["key"];

export function CryptoAgilityMaturitModel() {
  const [scores, setScores] = useState<Record<Key, number>>({
    inventoryScore:   50,
    abstractionScore: 50,
    kmsScore:         50,
    testingScore:     50,
    governanceScore:  50,
  });

  const [result, setResult] = useState<ReturnType<typeof scoreCryptoAgilityMaturity> | null>(null);

  const onScore = () => setResult(scoreCryptoAgilityMaturity(scores));

  const levelColor = result
    ? result.overallMaturityLevel >= 4 ? "#10b981"
      : result.overallMaturityLevel === 3 ? "#d97706"
      : "#dc2626"
    : "#0d2b5e";

  return (
    <div className="tu-wrap">
      <span className="tu-tag">BKX Security Tools</span>
      <h1 className="tu-title">Crypto-Agility Maturity Model</h1>
      <p className="tu-subtitle">
        Score your organisation's capability to swap cryptographic algorithms (e.g. RSA → post-quantum) at scale.
      </p>
      <hr className="tu-divider" />

      <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", marginBottom: "1.25rem" }}>
        {DIMENSIONS.map(({ key, label, desc }) => (
          <div key={key} className="tu-slider-row">
            <div className="tu-slider-header">
              <div>
                <span className="tu-label">{label}</span>
                <p style={{ fontSize: "0.78rem", color: "#4f565c", margin: "0.15rem 0 0" }}>{desc}</p>
              </div>
              <span className="tu-slider-value">{scores[key]}</span>
            </div>
            <input
              type="range"
              value={scores[key]}
              min="0" max="100"
              onChange={(e) => setScores((s) => ({ ...s, [key]: Number(e.target.value) }))}
              className="tu-range"
              style={{ marginTop: "0.4rem" }}
            />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.72rem", color: "#4f565c" }}>
              <span>0 — None</span><span>50 — Developing</span><span>100 — Optimised</span>
            </div>
          </div>
        ))}
      </div>

      <div className="tu-btn-row">
        <button type="button" className="tu-btn tu-btn-primary" onClick={onScore}>Calculate Maturity</button>
      </div>

      {result && (
        <div className="tu-result tu-animate" aria-live="polite">
          <div className="tu-result-hero">
            <div className="tu-metric">
              <span className="tu-metric-label">Maturity Level</span>
              <span className="tu-metric-value" style={{ color: levelColor }}>
                {result.overallMaturityLevel}<span className="tu-metric-unit">/ 5</span>
              </span>
            </div>
            <div className="tu-metric">
              <span className="tu-metric-label">Overall Score</span>
              <span className="tu-metric-value">{result.overallScore}<span className="tu-metric-unit">%</span></span>
            </div>
          </div>
          {result.recommendations.length > 0 && (
            <>
              <p className="tu-label" style={{ margin: "0.875rem 0 0.4rem" }}>Recommendations</p>
              <ul className="tu-result-list">
                {result.recommendations.map((rec: string) => <li key={rec}>{rec}</li>)}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
}
