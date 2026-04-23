import { useState } from "react";
import { analyzeDeepfakeProbability } from "@/lib/tools/deepfake-detector";

const INDICATORS = [
  { key: "hasCodecAnomalies",      label: "Codec anomalies detected" },
  { key: "frameCadenceIrregular",  label: "Frame cadence irregular" },
  { key: "audioVideoDesync",       label: "Audio-video desync present" },
  { key: "missingMetadata",        label: "Metadata stripped or absent" },
  { key: "suspiciousPatterns",     label: "Facial/body patterns suspicious" },
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
      <span className="tu-tag">BKX Security Tools</span>
      <h1 className="tu-title">Deepfake Detection Probability</h1>
      <p className="tu-subtitle">
        Score the likelihood that a media file is AI-generated based on forensic artifact indicators.
      </p>
      <hr className="tu-divider" />

      <p className="tu-label" style={{ marginBottom: "0.5rem" }}>Select all indicators present in the media file</p>
      <div className="tu-check-grid">
        {INDICATORS.map(({ key, label }) => (
          <label key={key} className="tu-check-label">
            <input
              type="checkbox"
              checked={flags[key]}
              onChange={(e) => setFlags((f) => ({ ...f, [key]: e.target.checked }))}
            />
            {label}
          </label>
        ))}
      </div>

      <div className="tu-btn-row">
        <button type="button" className="tu-btn tu-btn-primary" onClick={onAnalyze}>Analyze</button>
        <button type="button" className="tu-btn" onClick={onReset}>Reset</button>
      </div>

      {result && (
        <div className="tu-result tu-animate" aria-live="polite">
          <div className="tu-result-hero">
            <div className="tu-metric">
              <span className="tu-metric-label">AI-Generated Probability</span>
              <span className="tu-metric-value" style={{ color: probColor }}>
                {result.probabilityPercent}<span className="tu-metric-unit">%</span>
              </span>
            </div>
            <div className="tu-metric">
              <span className="tu-metric-label">Confidence</span>
              <span className="tu-metric-value" style={{ fontSize: "1.25rem", textTransform: "capitalize" }}>
                {result.confidence}
              </span>
            </div>
          </div>
          {result.indicators.length > 0 && (
            <ul className="tu-result-list">
              {result.indicators.map((ind: string) => <li key={ind}>{ind}</li>)}
            </ul>
          )}
          <p style={{ fontSize: "0.8rem", color: "#4f565c", marginTop: "0.875rem", fontStyle: "italic" }}>
            {result.disclaimer}
          </p>
        </div>
      )}
    </div>
  );
}
