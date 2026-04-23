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
      <span className="tu-tag">BKX Cryptography Toolkit</span>
      <h1 className="tu-title">Crypto-Agility Maturity Model</h1>
      <p className="tu-subtitle">Score your organisation's capability to audit and migrate cryptographic algorithms.</p>
      <hr className="tu-divider" />

      <div className="tu-split-layout">
        <div className="tu-split-left">
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1rem" }}>
            {DIMENSIONS.map(({ key, label, desc }) => (
              <div key={key} className="tu-slider-row">
                <div className="tu-slider-header">
                  <div>
                    <span className="tu-label" style={{ fontSize: '0.8rem' }}>{label}</span>
                    <p style={{ fontSize: '0.675rem', color: '#64748b', margin: '0.1rem 0 0' }}>{desc}</p>
                  </div>
                  <span className="tu-slider-value">{scores[key]}%</span>
                </div>
                <input
                  type="range"
                  value={scores[key]}
                  min="0" max="100"
                  onChange={(e) => setScores((s) => ({ ...s, [key]: Number(e.target.value) }))}
                  className="tu-range"
                />
              </div>
            ))}
          </div>

          <div className="tu-btn-row">
            <button type="button" className="tu-btn tu-btn-primary" onClick={onScore}>Calculate Score</button>
          </div>

          <div className="tu-aeo" style={{ marginTop: "2rem" }}>
            <p>
              <strong>Security Strategy:</strong> Crypto-agility is a requirement for post-quantum 
              readiness (NIST SP 800-227). Mature organizations use service meshes (e.g. Istio) 
              and HSMs to decouple cryptographic implementation from application logic.
            </p>
          </div>
        </div>

        <div className="tu-split-right">
          {result ? (
            <div className="tu-result tu-animate" style={{ marginTop: 0 }}>
              <div className="tu-result-hero">
                <div className="tu-metric">
                  <span className="tu-metric-label">Maturity</span>
                  <span className="tu-metric-value" style={{ color: levelColor }}>
                    {result.overallMaturityLevel}<span className="tu-metric-unit">/ 5</span>
                  </span>
                </div>
                <div className="tu-metric">
                  <span className="tu-metric-label">Percentile</span>
                  <span className="tu-metric-value">{result.overallScore}<span className="tu-metric-unit">%</span></span>
                </div>
              </div>

              {result.recommendations.length > 0 && (
                <div style={{ marginTop: '1.25rem' }}>
                  <p className="tu-label" style={{ marginBottom: '0.75rem', color: '#0d2b5e' }}>Remediation Roadmap</p>
                  <ul className="tu-result-list" style={{ marginTop: 0 }}>
                    {result.recommendations.map((rec: string) => <li key={rec}>{rec}</li>)}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#f8fafc", border: "2px dashed #d4d9de", borderRadius: "10px", padding: "2rem", textAlign: "center" }}>
              <p style={{ color: "#64748b" }}>Complete the self-assessment to generate your cryptographic roadmap.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
