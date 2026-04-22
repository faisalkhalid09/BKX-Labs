
import { useState } from "react";
import { estimateBlackwellPUE } from "@/lib/tools/nvidia-blackwell-pue";

export function NvidiaBlackwellEstimator() {
  const [racks, setRacks] = useState(1);
  const [gpusPerRack, setGpusPerRack] = useState(4);
  const [utilization, setUtilization] = useState(75);
  const [cooling, setCooling] = useState<"air" | "liquid">("air");
  const [result, setResult] = useState<ReturnType<typeof estimateBlackwellPUE> | null>(null);

  const onCalculate = () => {
    const res = estimateBlackwellPUE({
      rackCount: racks,
      gpusPerRack,
      utilizationPercent: utilization,
      coolingType: cooling,
    });
    setResult(res);
  };

  const onReset = () => {
    setRacks(1);
    setGpusPerRack(4);
    setUtilization(75);
    setCooling("air");
    setResult(null);
  };

  return (
    <>
      <section className="tool-card">
        <h1 className="text-xl font-semibold">NVIDIA Blackwell PUE Estimator</h1>
        <p className="mt-2 text-sm text-[#4f565c]">
          Calculate Power Usage Effectiveness (PUE) for high-density liquid-cooled GPU racks and estimate annual energy costs.
        </p>

        <div className="field-grid mt-4">
          <div>
            <label className="block text-sm font-medium mb-1">Number of Racks</label>
            <input
              type="number"
              value={racks}
              onChange={(e) => setRacks(Math.max(1, Number(e.target.value) || 1))}
              min="1"
              className="w-full rounded border border-[#d4d9de] px-2 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">GPUs per Rack</label>
            <input
              type="number"
              value={gpusPerRack}
              onChange={(e) => setGpusPerRack(Math.max(1, Number(e.target.value) || 1))}
              min="1"
              className="w-full rounded border border-[#d4d9de] px-2 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Utilization (%)</label>
            <input
              type="range"
              value={utilization}
              onChange={(e) => setUtilization(Number(e.target.value))}
              min="10"
              max="100"
              className="w-full"
            />
            <span className="text-xs text-[#4f565c]">{utilization}%</span>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Cooling Type</label>
            <select
              value={cooling}
              onChange={(e) => setCooling(e.target.value as "air" | "liquid")}
              className="w-full rounded border border-[#d4d9de] px-2 py-2 text-sm"
            >
              <option value="air">Air cooling</option>
              <option value="liquid">Liquid cooling</option>
            </select>
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <button type="button" className="btn primary" onClick={onCalculate}>
            Estimate PUE
          </button>
          <button type="button" className="btn" onClick={onReset}>
            Reset
          </button>
        </div>

        {result && (
          <div className="tool-result" aria-live="polite">
            <p className="text-xs uppercase tracking-[0.08em] text-[#4f565c]">Power Usage Effectiveness</p>
            <p className="mt-1 text-lg font-semibold">{result.pueValue.toFixed(2)}</p>
            <div className="mt-3 space-y-2 text-sm text-[#4f565c]">
              <p>Total GPUs: {result.totalGpus}</p>
              <p>IT Load: {result.itLoadKw} kW</p>
              <p>Facility Power: {result.facilityPowerKw} kW</p>
              <p>Cooling Power: {result.coolingPowerKw} kW</p>
              <p className="font-semibold">Annual Energy: {result.annualEnergyMwh} MWh</p>
              <p className="font-semibold text-[#105da8]">Est. Annual Cost: ${result.estimatedAnnualCostUsd.toLocaleString()}</p>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
