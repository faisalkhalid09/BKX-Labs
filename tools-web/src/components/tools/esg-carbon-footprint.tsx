"use client";

import { useState } from "react";
import { calculateCarbonFootprint } from "@/lib/tools/esg-carbon-footprint";

const REGION_INTENSITY: Record<string, number> = {
  "us-west": 150,
  "us-east": 250,
  europe: 200,
  asia: 400,
};

export function CarbonFootprintTracker() {
  const [kwhMonth, setKwhMonth] = useState(500);
  const [gbMonth, setGbMonth] = useState(1000);
  const [region, setRegion] = useState("us-west");
  const [result, setResult] = useState<ReturnType<typeof calculateCarbonFootprint> | null>(null);

  const onCalculate = () => {
    const res = calculateCarbonFootprint({
      computeKwh: kwhMonth,
      storageGbMonth: gbMonth,
      regionCarbonIntensity: REGION_INTENSITY[region] || 200,
    });
    setResult(res);
  };

  return (
    <>
      <section className="tool-card">
        <h1 className="text-xl font-semibold">ESG Carbon Footprint Tracker for Devs</h1>
        <p className="mt-2 text-sm text-[#4f565c]">
          Calculate the CO2 footprint of your cloud deployment and estimate offset costs.
        </p>
        <div className="field-grid mt-4">
          <div>
            <label className="block text-sm font-medium mb-1">Compute (kWh/month)</label>
            <input
              type="number"
              value={kwhMonth}
              onChange={(e) => setKwhMonth(Math.max(0, Number(e.target.value) || 0))}
              className="w-full rounded border border-[#d4d9de] px-2 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Storage (GB/month)</label>
            <input
              type="number"
              value={gbMonth}
              onChange={(e) => setGbMonth(Math.max(0, Number(e.target.value) || 0))}
              className="w-full rounded border border-[#d4d9de] px-2 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Region</label>
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full rounded border border-[#d4d9de] px-2 py-2 text-sm"
            >
              <option value="us-west">US West (150 g/kWh)</option>
              <option value="us-east">US East (250 g/kWh)</option>
              <option value="europe">Europe (200 g/kWh)</option>
              <option value="asia">Asia (400 g/kWh)</option>
            </select>
          </div>
        </div>
        <button type="button" className="btn primary mt-3" onClick={onCalculate}>
          Calculate Footprint
        </button>
        {result && (
          <div className="tool-result mt-3" aria-live="polite">
            <p className="text-lg font-semibold">{result.annualCO2Tons} tons/year</p>
            <p className="mt-2 text-sm text-[#4f565c]">Monthly: {result.totalMonthlyCO2kg} kg</p>
            <p className="text-sm text-[#4f565c]">Offset cost: ${result.offsetCost} /year</p>
          </div>
        )}
      </section>
    </>
  );
}
