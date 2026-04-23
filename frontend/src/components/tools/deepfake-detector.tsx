import { useState } from "react";
import { analyzeDeepfakeProbability } from "@/lib/tools/deepfake-detector";

const INDICATORS = [
  { key: "hasCodecAnomalies",      label: "Codec anomalies detected" },
  { key: "frameCadenceIrregular",  label: "Frame cadence irregular" },
  { key: "audioVideoDesync",       label: "Audio-video desync present" },
  { key: "missingMetadata",        label: "Metadata stripped or absent" },
  { key: "suspiciousPatterns",     label: "Body/Face pattern jitter" },
] as const;

type Key = typeof INDICATORS[number]["key"];

export function DeepfakeDetector() {
  const [flags, setFlags] = useState<Record<Key, boolean>>({
    hasCodecAnomalies:     false,
    frameCadenceIrregular: false,
    audioVideoDesync:      false,
    missingMetadata:       false,
    suspiciousPatterns:    false,
  });

  const [result, setResult] = useState<ReturnType<typeof analyzeDeepfakeProbability> | null>(null);

  const onAnalyze = () => setResult(analyzeDeepfakeProbability(flags));
  const onReset   = () => { setFlags({ hasCodecAnomalies: false, frameCadenceIrregular: false, audioVideoDesync: false, missingMetadata: false, suspiciousPatterns: false }); setResult(null); };

  const probColor = result
    ? result.probabilityPercent >= 70 ? "#dc2626" : result.probabilityPercent >= 40 ? "#d97706" : "#10b981"
    : "#0d2b5e";

  return (
    <div className="tu-wrap">
      <span className="tu-tag">BKX Intelligence Tools</span>
      <h1 className="tu-title">Deepfake Detection Forensic Auditor</h1>
      <p className="tu-subtitle">Score the probability of AI-generated media based on technical forensic indicators.</p>
      <hr className="tu-divider" />

      <div className="tu-split-layout">
        <div className="tu-split-left">
          <p className="tu-label" style={{ marginBottom: "0.75rem" }}>Observed Indicators</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1.25rem" }}>
            {INDICATORS.map(({ key, label }) => (
              <label key={key} className="tu-check-label tu-check-label-styled">
                <input
                  type="checkbox"
                  checked={flags[key]}
                  onChange={(e) => setFlags((f) => ({ ...f, [key]: e.target.checked }))}
                  className="tu-checkbox"
                />
                <span style={{ fontSize: '0.85rem' }}>{label}</span>
              </label>
            ))}
          </div>

          <div className="tu-btn-row">
            <button type="button" className="tu-btn tu-btn-primary" onClick={onAnalyze}>Run Forensic Scan</button>
            <button type="button" className="tu-btn" onClick={onReset}>Clear Filters</button>
          </div>

          <div className="tu-aeo" style={{ marginTop: "2rem" }}>
            <p>
              <strong>2026 Detection Standards:</strong> As GenAI models (Sora, Kling) improve, 
              forensic detection shifts from visual artifacts to C2PA metadata verification 
              and watermarking (Article 50(2) of the EU AI Act). Indicators like frame cadence 
              irregularity remain the most reliable heuristics for non-technical audits.
            </p>
          </div>
        </div>

        <div className="tu-split-right">
          {result ? (
            <div className="tu-result tu-animate" style={{ marginTop: 0 }}>
              <div className="tu-result-hero">
                <div className="tu-metric">
                  <span className="tu-metric-label">AI Probability</span>
                  <span className="tu-metric-value" style={{ color: probColor }}>
                    {result.probabilityPercent}<span className="tu-metric-unit">%</span>
                  </span>
                </div>
                <div className="tu-metric">
                  <span className="tu-metric-label">Confidence</span>
                  <span className="tu-metric-value" style={{ fontSize: "1.2rem", textTransform: "capitalize" }}>{result.confidence}</span>
                </div>
              </div>
              
              {result.indicators.length > 0 && (
                <div style={{ marginTop: '1.25rem' }}>
                  <p className="tu-label" style={{ marginBottom: '0.5rem', color: '#0d2b5e' }}>Triggered Indicators</p>
                  <ul className="tu-result-list" style={{ marginTop: 0 }}>
                    {result.indicators.map((ind: string) => <li key={ind}>{ind}</li>)}
                  </ul>
                </div>
              )}
              
              <div style={{ marginTop: '1.25rem', padding: '0.75rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
                <p style={{ margin: 0, fontSize: "0.75rem", color: "#4f565c", fontStyle: "italic", lineHeight: 1.5 }}>
                  {result.disclaimer}
                </p>
              </div>
            </div>
          ) : (
            <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#f8fafc", border: "2px dashed #d4d9de", borderRadius: "10px", padding: "2rem", textAlign: "center" }}>
              <p style={{ color: "#64748b" }}>Select technical anomalies observed in the file to estimate detection probability.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
