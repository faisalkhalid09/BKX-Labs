import { useState } from "react";
import { estimateBlackwellPUE } from "@/lib/tools/nvidia-blackwell-pue";

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

  return (
    <div className="tu-wrap">
      <span className="tu-tag">BKX Infrastructure Tools</span>
      <h1 className="tu-title">NVIDIA Blackwell PUE Estimator</h1>
      <p className="tu-subtitle">
        Calculate Power Usage Effectiveness for high-density GPU racks and estimate annual energy costs.
      </p>
      <hr className="tu-divider" />

      <div className="tu-form-grid">
        <div className="tu-field">
          <label className="tu-label">Number of Racks</label>
          <input
            type="number" value={racks} min="1"
            onChange={(e) => setRacks(Math.max(1, Number(e.target.value) || 1))}
            className="tu-input"
          />
        </div>
        <div className="tu-field">
          <label className="tu-label">GPUs per Rack</label>
          <input
            type="number" value={gpusPerRack} min="1"
            onChange={(e) => setGpusPerRack(Math.max(1, Number(e.target.value) || 1))}
            className="tu-input"
          />
        </div>
        <div className="tu-field">
          <label className="tu-label">Cooling Type</label>
          <select value={cooling} onChange={(e) => setCooling(e.target.value as "air" | "liquid")} className="tu-select">
            <option value="air">Air Cooling</option>
            <option value="liquid">Liquid Cooling</option>
          </select>
        </div>
        <div className="tu-field">
          <div className="tu-slider-header">
            <label className="tu-label">Utilization</label>
            <span className="tu-slider-value">{utilization}%</span>
          </div>
          <input
            type="range" value={utilization} min="10" max="100"
            onChange={(e) => setUtilization(Number(e.target.value))}
            className="tu-range" style={{ marginTop: "0.35rem" }}
          />
        </div>
      </div>

      <div className="tu-btn-row">
        <button type="button" className="tu-btn tu-btn-primary" onClick={onCalculate}>Estimate PUE</button>
        <button type="button" className="tu-btn" onClick={onReset}>Reset</button>
      </div>

      {result && (
        <div className="tu-result tu-animate" aria-live="polite">
          <div className="tu-result-hero">
            <div className="tu-metric">
              <span className="tu-metric-label">PUE Value</span>
              <span className="tu-metric-value">{result.pueValue.toFixed(2)}</span>
            </div>
            <div className="tu-metric">
              <span className="tu-metric-label">Total GPUs</span>
              <span className="tu-metric-value">{result.totalGpus}</span>
            </div>
            <div className="tu-metric">
              <span className="tu-metric-label">Est. Annual Cost</span>
              <span className="tu-metric-value success">${result.estimatedAnnualCostUsd.toLocaleString()}</span>
            </div>
          </div>
          <div className="tu-result-row">
            <span className="tu-result-row-label">IT Load</span>
            <span className="tu-result-row-value">{result.itLoadKw} kW</span>
          </div>
          <div className="tu-result-row">
            <span className="tu-result-row-label">Facility Power</span>
            <span className="tu-result-row-value">{result.facilityPowerKw} kW</span>
          </div>
          <div className="tu-result-row">
            <span className="tu-result-row-label">Cooling Power</span>
            <span className="tu-result-row-value">{result.coolingPowerKw} kW</span>
          </div>
          <div className="tu-result-row">
            <span className="tu-result-row-label">Annual Energy</span>
            <span className="tu-result-row-value">{result.annualEnergyMwh} MWh</span>
          </div>
        </div>
      )}
    </div>
  );
}
