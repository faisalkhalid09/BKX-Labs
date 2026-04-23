import { useState } from "react";
import { compareCloudGpuCosts } from "@/lib/tools/cloud-gpu-cost";

const GPU_TYPES = ["a100-40gb", "a100-80gb", "h100-80gb", "v100-32gb"];
const COMMON_REGIONS = ["us-east-1", "eu-west-1", "us-central1", "us-east", "uk-south"];

export function CloudGpuCostComparison() {
  const [gpuType, setGpuType] = useState("a100-40gb");
  const [region, setRegion] = useState("us-east-1");
  const [hoursPerMonth, setHoursPerMonth] = useState(730);
  const [result, setResult] = useState<ReturnType<typeof compareCloudGpuCosts> | null>(null);

  const onCompare = () => {
    setResult(compareCloudGpuCosts({ gpuType, region, hoursPerMonth: Math.max(1, hoursPerMonth) }));
  };

  const onReset = () => { setGpuType("a100-40gb"); setRegion("us-east-1"); setHoursPerMonth(730); setResult(null); };

  return (
    <div className="tu-wrap">
      <span className="tu-tag">BKX Infrastructure Tools</span>
      <h1 className="tu-title">Cloud GPU Cost Comparison</h1>
      <p className="tu-subtitle">
        Compare GPU pricing across AWS, Azure, Google Cloud, and Lambda to find the best deal for your workload.
      </p>
      <hr className="tu-divider" />

      <div className="tu-form-grid">
        <div className="tu-field">
          <label className="tu-label">GPU Type</label>
          <select value={gpuType} onChange={(e) => setGpuType(e.target.value)} className="tu-select">
            {GPU_TYPES.map((gpu) => (
              <option key={gpu} value={gpu}>{gpu.toUpperCase()}</option>
            ))}
          </select>
        </div>
        <div className="tu-field">
          <label className="tu-label">Region</label>
          <select value={region} onChange={(e) => setRegion(e.target.value)} className="tu-select">
            {Array.from(new Set(COMMON_REGIONS)).map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>
        <div className="tu-field">
          <label className="tu-label">Hours per Month</label>
          <input
            type="number"
            value={hoursPerMonth}
            onChange={(e) => setHoursPerMonth(Number(e.target.value) || 0)}
            min="1" max="730"
            className="tu-input"
          />
        </div>
      </div>

      <div className="tu-btn-row">
        <button type="button" className="tu-btn tu-btn-primary" onClick={onCompare}>Compare Costs</button>
        <button type="button" className="tu-btn" onClick={onReset}>Reset</button>
      </div>

      {result && (
        <div className="tu-result tu-animate" aria-live="polite">
          <div className="tu-result-hero">
            <div className="tu-metric">
              <span className="tu-metric-label">Cheapest Provider</span>
              <span className="tu-metric-value" style={{ fontSize: "1.5rem", textTransform: "capitalize" }}>
                {result.cheapestProvider}
              </span>
            </div>
            <div className="tu-metric">
              <span className="tu-metric-label">Monthly Cost</span>
              <span className="tu-metric-value success">${result.cheapestCost.toFixed(2)}</span>
            </div>
            <div className="tu-metric">
              <span className="tu-metric-label">Monthly Savings</span>
              <span className="tu-metric-value">${result.monthlySavings.toFixed(2)}</span>
            </div>
          </div>

          <p className="tu-label" style={{ marginBottom: "0.5rem" }}>All Providers</p>
          {result.results.map((r: any) => (
            <div
              key={r.provider}
              className="tu-result-row"
              style={r.provider === result.cheapestProvider ? { fontWeight: 700, color: "#10b981" } : undefined}
            >
              <span className="tu-result-row-label" style={{ textTransform: "capitalize" }}>{r.provider}</span>
              <span className="tu-result-row-value">
                ${r.monthlyCost.toFixed(2)}/mo
                <span style={{ fontWeight: 400, color: "#4f565c", marginLeft: "0.5rem" }}>
                  (${r.hourlyRate.toFixed(3)}/hr)
                </span>
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
