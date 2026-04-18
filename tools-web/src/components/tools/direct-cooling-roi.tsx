"use client";

import { useState } from "react";
import { calculateCoolingROI } from "@/lib/tools/direct-cooling-roi";

export function DirectCoolingROITool() {
  const [racks, setRacks] = useState(10);
  const [airOpex, setAirOpex] = useState(150000);
  const [liquidOpex, setLiquidOpex] = useState(80000);
  const [liquidCapex, setLiquidCapex] = useState(250000);
  const [result, setResult] = useState<ReturnType<typeof calculateCoolingROI> | null>(null);

  const onCalculate = () => {
    const res = calculateCoolingROI({
      rackCount: racks,
      airCoolingAnnualOpexUsd: airOpex,
      liquidCoolingAnnualOpexUsd: liquidOpex,
      liquidImplementationCostUsd: liquidCapex,
    });
    setResult(res);
  };

  const onReset = () => {
    setRacks(10);
    setAirOpex(150000);
    setLiquidOpex(80000);
    setLiquidCapex(250000);
    setResult(null);
  };

  return (
    <>
      <section className="tool-card">
        <h1 className="text-xl font-semibold">Direct-to-Chip Liquid Cooling ROI Tool</h1>
        <p className="mt-2 text-sm text-[#4f565c]">
          Compare 5-year OpEx (air vs. liquid cooling) and calculate ROI, break-even timeline, and savings.
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
            <label className="block text-sm font-medium mb-1">Air Cooling Annual OpEx ($)</label>
            <input
              type="number"
              value={airOpex}
              onChange={(e) => setAirOpex(Math.max(0, Number(e.target.value) || 0))}
              min="0"
              className="w-full rounded border border-[#d4d9de] px-2 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Liquid Cooling Annual OpEx ($)</label>
            <input
              type="number"
              value={liquidOpex}
              onChange={(e) => setLiquidOpex(Math.max(0, Number(e.target.value) || 0))}
              min="0"
              className="w-full rounded border border-[#d4d9de] px-2 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Liquid Implementation Cost ($)</label>
            <input
              type="number"
              value={liquidCapex}
              onChange={(e) => setLiquidCapex(Math.max(0, Number(e.target.value) || 0))}
              min="0"
              className="w-full rounded border border-[#d4d9de] px-2 py-2 text-sm"
            />
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <button type="button" className="btn primary" onClick={onCalculate}>
            Calculate ROI
          </button>
          <button type="button" className="btn" onClick={onReset}>
            Reset
          </button>
        </div>

        {result && (
          <div className="tool-result" aria-live="polite">
            <p className="text-xs uppercase tracking-[0.08em] text-[#4f565c]">5-Year ROI</p>
            <p className="mt-1 text-lg font-semibold">{result.roi5YearPercent}%</p>

            <div className="mt-3 space-y-2 text-sm text-[#4f565c]">
              <p>Air Cooling (5-yr total): ${result.airCoolingTotal.toLocaleString()}</p>
              <p>Liquid Cooling (5-yr total): ${result.liquidCoolingTotal.toLocaleString()}</p>
              <p className="font-semibold text-[#105da8]">Annual Savings: ${result.annualSavings.toLocaleString()}</p>
              {result.breakEvenMonths < 999 && (
                <p className="font-semibold">Break-Even: {result.breakEvenMonths} months</p>
              )}
              {result.breakEvenMonths >= 999 && (
                <p className="text-red-600 font-semibold">No break-even in 5 years with current costs</p>
              )}
            </div>
          </div>
        )}
      </section>
    </>
  );
}
