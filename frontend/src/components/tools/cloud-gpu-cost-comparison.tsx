import { useState } from "react";
import { compareCloudGpuCosts } from "@/lib/tools/cloud-gpu-cost";
import { Download, Linkedin, Twitter } from "lucide-react";

const GPU_TYPES = ["a100-40gb", "a100-80gb", "h100-80gb", "v100-32gb"];
const COMMON_REGIONS = ["us-east-1", "eu-west-1", "us-central1", "us-east", "uk-south"];

function csvEscape(value: string | number | boolean): string {
  const raw = String(value ?? "");
  if (raw.includes(",") || raw.includes("\n") || raw.includes("\"")) {
    return `"${raw.replace(/\"/g, '""')}"`;
  }
  return raw;
}

function downloadCsvFile(csvContent: string, fileName: string) {
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = fileName;
  anchor.click();
  URL.revokeObjectURL(url);
}

export function CloudGpuCostComparison() {
  const [gpuType, setGpuType] = useState("a100-40gb");
  const [region, setRegion] = useState("us-east-1");
  const [hoursPerMonth, setHoursPerMonth] = useState(730);
  const [result, setResult] = useState<ReturnType<typeof compareCloudGpuCosts> | null>(null);

  const onCompare = () => {
    setResult(compareCloudGpuCosts({ gpuType, region, hoursPerMonth: Math.max(1, hoursPerMonth) }));
  };

  const onReset = () => { setGpuType("a100-40gb"); setRegion("us-east-1"); setHoursPerMonth(730); setResult(null); };

  const onExportCsv = () => {
    if (!result) return;

    const rows: Array<Array<string | number | boolean>> = [
      ["Tool", "Cloud GPU Cost Comparison"],
      ["Generated At", new Date().toISOString()],
      [],
      ["Input Summary"],
      ["GPU Type", gpuType.toUpperCase()],
      ["Region", region],
      ["Monthly Hours", Math.max(1, hoursPerMonth)],
      [],
      ["Output Summary"],
      ["Cheapest Provider", result.cheapestProvider],
      ["Cheapest Monthly Cost (USD)", result.cheapestCost.toFixed(2)],
      ["Potential Monthly Savings vs Highest (USD)", result.monthlySavings.toFixed(2)],
      [],
      ["Provider Comparison"],
      ["Provider", "Hourly Rate (USD)", "Monthly Cost (USD)", "Hours", "Cheapest"],
      ...result.results.map((item) => [
        item.provider,
        item.hourlyRate.toFixed(4),
        item.monthlyCost.toFixed(2),
        item.utilizationHours,
        item.provider === result.cheapestProvider,
      ]),
    ];

    const csv = rows.map((row) => row.map(csvEscape).join(",")).join("\n");
    downloadCsvFile(csv, `BKX-Cloud-GPU-Comparison-${Date.now()}.csv`);
  };

  const toolUrl = "https://bkxlabs.com/tools/cloud-gpu-cost-comparison";
  const shareMessage = result
    ? `I just compared ${gpuType.toUpperCase()} cloud pricing and found ${result.cheapestProvider.toUpperCase()} at $${result.cheapestCost.toFixed(0)}/month using @BKXLabs. Benchmark your AI GPU spend:`
    : "I just benchmarked multi-cloud GPU pricing for AI workloads using @BKXLabs. Compare providers instantly:";

  const shareToX = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(`${shareMessage} ${toolUrl}`)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  const shareToLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(`${shareMessage} ${toolUrl}`)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <div className="tu-wrap">
      <span className="tu-tag">BKX Infrastructure Tools</span>
      <h1 className="tu-title">Cloud GPU Cost Comparison</h1>
      <p className="tu-subtitle">Compare pricing across AWS, Azure, GCP, and Lambda for AI workloads.</p>
      <hr className="tu-divider" />

      <div className="tu-split-layout">
        <div className="tu-split-left">
          <div className="tu-form-grid" style={{ marginBottom: "1rem" }}>
            <div className="tu-field" style={{ gridColumn: '1 / -1' }}>
              <label className="tu-label">GPU Instance Type</label>
              <select value={gpuType} onChange={(e) => setGpuType(e.target.value)} className="tu-select">
                {GPU_TYPES.map((gpu) => (
                  <option key={gpu} value={gpu}>{gpu.toUpperCase()}</option>
                ))}
              </select>
            </div>
            <div className="tu-field">
              <label className="tu-label">Region</label>
              <select value={region} onChange={(e) => setRegion(e.target.value)} className="tu-select">
                {COMMON_REGIONS.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
            <div className="tu-field">
              <label className="tu-label">Monthly Hours</label>
              <input type="number" value={hoursPerMonth} onChange={(e) => setHoursPerMonth(Number(e.target.value) || 0)} className="tu-input" />
            </div>
          </div>

          <div className="tu-btn-row">
            <button type="button" className="tu-btn tu-btn-primary" onClick={onCompare}>Compare Prices</button>
            <button type="button" className="tu-btn" onClick={onReset}>Reset</button>
          </div>

          <div className="tu-aeo" style={{ marginTop: "2rem" }}>
            <p>
              <strong>GPU Market Insight:</strong> Pricing for H100 instances remains volatile. 
              Lambda and other specialized AI clouds often provide 30-40% savings over hyperscalers 
              (AWS/Azure) for on-demand training workloads, though availability varies by region.
            </p>
          </div>
        </div>

        <div className="tu-split-right">
          {result ? (
            <div className="tu-animate">
              <div className="tu-result" style={{ marginTop: 0 }}>
                <div className="tu-result-hero" style={{ padding: '1.25rem' }}>
                  <div className="tu-metric">
                    <span className="tu-metric-label">Best Provider</span>
                    <span className="tu-metric-value" style={{ fontSize: "1.25rem", textTransform: "uppercase" }}>{result.cheapestProvider}</span>
                  </div>
                  <div className="tu-metric">
                    <span className="tu-metric-label">Low Est.</span>
                    <span className="tu-metric-value success">${result.cheapestCost.toFixed(0)}</span>
                  </div>
                </div>

                <div className="tu-table-wrap" style={{ marginTop: '1rem' }}>
                  <table className="tu-table">
                    <thead>
                      <tr>
                        <th>Cloud Provider</th>
                        <th>Monthly Bill</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.results.map((r: any) => (
                        <tr key={r.provider}>
                          <td style={{ fontWeight: r.provider === result.cheapestProvider ? 700 : 400, textTransform: 'capitalize' }}>
                            {r.provider} {r.provider === result.cheapestProvider && '✓'}
                          </td>
                          <td style={{ color: r.provider === result.cheapestProvider ? '#10b981' : '#1e293b' }}>
                            ${r.monthlyCost.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="tu-btn-row" style={{ marginTop: "1rem", flexWrap: "wrap" }}>
                  <button type="button" className="tu-btn tu-btn-primary" onClick={onExportCsv}>
                    <Download size={16} style={{ marginRight: "0.4rem", verticalAlign: "text-bottom" }} />
                    Download Audit/Comparison Report (CSV)
                  </button>
                  <button type="button" className="tu-btn" onClick={shareToLinkedIn}>
                    <Linkedin size={16} style={{ marginRight: "0.4rem", verticalAlign: "text-bottom" }} />
                    Share to LinkedIn
                  </button>
                  <button type="button" className="tu-btn" onClick={shareToX}>
                    <Twitter size={16} style={{ marginRight: "0.4rem", verticalAlign: "text-bottom" }} />
                    Share to X
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#f8fafc", border: "2px dashed #d4d9de", borderRadius: "10px", padding: "2rem", textAlign: "center" }}>
              <p style={{ color: "#64748b" }}>Select a GPU and region to see price benchmarks.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
