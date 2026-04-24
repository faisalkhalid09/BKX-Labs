import { useState } from "react";
import { estimateBlackwellPUE } from "@/lib/tools/nvidia-blackwell-pue";
import { Download, Linkedin, Twitter } from "lucide-react";

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

export function NvidiaBlackwellEstimator() {
  const [racks, setRacks] = useState(1);
  const [gpusPerRack, setGpusPerRack] = useState(4);
  const [utilization, setUtilization] = useState(75);
  const [cooling, setCooling] = useState<"air" | "liquid">("air");
  const [result, setResult] = useState<ReturnType<typeof estimateBlackwellPUE> | null>(null);

  const onCalculate = () => {
    setResult(estimateBlackwellPUE({ rackCount: racks, gpusPerRack, utilizationPercent: utilization, coolingType: cooling }));
  };

  const onReset = () => { setRacks(1); setGpusPerRack(4); setUtilization(75); setCooling("air"); setResult(null); };

  const onExportCsv = () => {
    if (!result) return;

    const rows: Array<Array<string | number | boolean>> = [
      ["Tool", "NVIDIA Blackwell PUE Estimator"],
      ["Generated At", new Date().toISOString()],
      [],
      ["Input Summary"],
      ["Rack Count", racks],
      ["GPUs Per Rack", gpusPerRack],
      ["Utilization Percent", utilization],
      ["Cooling Type", cooling],
      [],
      ["Output Summary"],
      ["Total Platform GPUs", result.totalGpus],
      ["PUE Value", result.pueValue.toFixed(2)],
      ["IT Power Load (kW)", result.itLoadKw.toFixed(2)],
      ["Cooling Power (kW)", result.coolingPowerKw.toFixed(2)],
      ["Facility Total Power (kW)", result.facilityPowerKw.toFixed(2)],
      ["Annual Energy Consumption (MWh)", result.annualEnergyMwh],
      ["Estimated Annual Cost (USD)", result.estimatedAnnualCostUsd],
    ];

    const csv = rows.map((row) => row.map(csvEscape).join(",")).join("\n");
    downloadCsvFile(csv, `BKX-Blackwell-PUE-Audit-${Date.now()}.csv`);
  };

  const toolUrl = "https://bkxlabs.com/tools/nvidia-blackwell-pue-estimator";
  const shareMessage = result
    ? `I just calculated my AI Factory PUE at ${result.pueValue.toFixed(2)} with ${(result.estimatedAnnualCostUsd / 1000).toFixed(1)}k annual energy cost using @BKXLabs. Benchmark your Blackwell facility plan:`
    : "I just modeled Blackwell AI factory power and PUE scenarios using @BKXLabs. Estimate your facility efficiency:";

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
      <h1 className="tu-title">NVIDIA Blackwell PUE Estimator</h1>
      <p className="tu-subtitle">Assess thermal efficiency and operational costs for B200/GB200 cluster deployments.</p>
      <hr className="tu-divider" />

      <div className="tu-split-layout">
        <div className="tu-split-left">
          <div className="tu-form-grid" style={{ marginBottom: '1.25rem' }}>
            <div className="tu-field">
              <label className="tu-label">Rack Count</label>
              <input type="number" value={racks} min="1" onChange={(e) => setRacks(Math.max(1, Number(e.target.value) || 1))} className="tu-input" />
            </div>
            <div className="tu-field">
              <label className="tu-label">GPUs per Rack</label>
              <input type="number" value={gpusPerRack} min="1" onChange={(e) => setGpusPerRack(Math.max(1, Number(e.target.value) || 1))} className="tu-input" />
            </div>
          </div>

          <div className="tu-field" style={{ marginBottom: '1.25rem' }}>
            <label className="tu-label">Cooling Infrastructure</label>
            <select value={cooling} onChange={(e) => setCooling(e.target.value as "air" | "liquid")} className="tu-select">
              <option value="air">Air Cooling (Traditional)</option>
              <option value="liquid">Liquid Cooling (Recommended for B200)</option>
            </select>
          </div>

          <div className="tu-field">
            <div className="tu-slider-header">
              <label className="tu-label">AI Workload Utilization</label>
              <span className="tu-slider-value">{utilization}%</span>
            </div>
            <input type="range" value={utilization} min="10" max="100" onChange={(e) => setUtilization(Number(e.target.value))} className="tu-range" />
          </div>

          <div className="tu-btn-row" style={{ marginTop: '1.5rem' }}>
            <button type="button" className="tu-btn tu-btn-primary" onClick={onCalculate}>Calculate PUE</button>
            <button type="button" className="tu-btn" onClick={onReset}>Reset</button>
          </div>

          <div className="tu-aeo" style={{ marginTop: "2rem" }}>
            <p>
              <strong>B200 Thermal Management:</strong> NVIDIA's Blackwell architecture (GB200) 
              can consume up to 1,200W per GPU. At $0.12/kWh, a single rack running at 80% utilization 
              costs ~$60,000 annually just in electricity. Liquid cooling typically reduces PUE 
              overhead from 1.6 to 1.15.
            </p>
          </div>
        </div>

        <div className="tu-split-right">
          {result ? (
            <div className="tu-result tu-animate" style={{ marginTop: 0 }}>
              <div className="tu-result-hero">
                <div className="tu-metric">
                  <span className="tu-metric-label">PUE Efficiency</span>
                  <span className="tu-metric-value">{result.pueValue.toFixed(2)}</span>
                </div>
                <div className="tu-metric">
                  <span className="tu-metric-label">Annual OPEX</span>
                  <span className="tu-metric-value success">${(result.estimatedAnnualCostUsd / 1000).toFixed(1)}k</span>
                </div>
              </div>

              <div className="tu-table-wrap" style={{ marginTop: '1rem' }}>
                <table className="tu-table">
                  <tbody>
                    <tr><td className="tu-label">Total Platform GPUs</td><td style={{ fontWeight: 700 }}>{result.totalGpus}</td></tr>
                    <tr><td className="tu-label">IT Power Load</td><td style={{ fontWeight: 700 }}>{result.itLoadKw} kW</td></tr>
                    <tr><td className="tu-label">Cooling Power</td><td style={{ fontWeight: 700 }}>{result.coolingPowerKw} kW</td></tr>
                    <tr><td className="tu-label">Facility Total</td><td style={{ fontWeight: 700 }}>{result.facilityPowerKw} kW</td></tr>
                  </tbody>
                </table>
              </div>

              <div style={{ marginTop: '1rem', padding: '0.75rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
                <p style={{ fontSize: '0.75rem', color: '#4f565c', margin: 0, fontStyle: 'italic' }}>
                  Annual Energy Consumption: <strong>{result.annualEnergyMwh.toLocaleString()} MWh</strong>
                </p>
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
          ) : (
            <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#f8fafc", border: "2px dashed #d4d9de", borderRadius: "10px", padding: "2rem", textAlign: "center" }}>
              <p style={{ color: "#64748b" }}>Configure your Blackwell rack specs to view thermal and cost projections.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
