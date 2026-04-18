"use client";

import { useState } from "react";
import { calculateSoc2Readiness, type Soc2Category, type Soc2Control } from "@/lib/tools/soc2-readiness";

const CATEGORIES: Soc2Category[] = ["security", "availability", "confidentiality", "integrity", "privacy"];
const CONTROLS: Soc2Control[] = [
  "access-controls",
  "encryption",
  "monitoring",
  "change-management",
  "incident-response",
  "vendor-management",
];

export function SaaSSoc2Calculator() {
  const [selectedCategories, setSelectedCategories] = useState<Set<Soc2Category>>(
    new Set(["security"])
  );
  const [selectedControls, setSelectedControls] = useState<Set<Soc2Control>>(new Set());
  const [result, setResult] = useState<ReturnType<typeof calculateSoc2Readiness> | null>(null);

  const onToggleCategory = (cat: Soc2Category) => {
    const next = new Set(selectedCategories);
    if (next.has(cat)) {
      next.delete(cat);
    } else {
      next.add(cat);
    }
    setSelectedCategories(next);
  };

  const onToggleControl = (ctrl: Soc2Control) => {
    const next = new Set(selectedControls);
    if (next.has(ctrl)) {
      next.delete(ctrl);
    } else {
      next.add(ctrl);
    }
    setSelectedControls(next);
  };

  const onCalculate = () => {
    if (selectedCategories.size === 0) {
      alert("Select at least one SOC 2 category");
      return;
    }
    const res = calculateSoc2Readiness({
      categories: Array.from(selectedCategories),
      implementedControls: Array.from(selectedControls),
    });
    setResult(res);
  };

  const onReset = () => {
    setSelectedCategories(new Set(["security"]));
    setSelectedControls(new Set());
    setResult(null);
  };

  return (
    <>
      <section className="tool-card">
        <h1 className="text-xl font-semibold">SaaS SOC 2 Readiness Calculator</h1>
        <p className="mt-2 text-sm text-[#4f565c]">
          Assess your security controls against SOC 2 trust criteria and get a prioritized gap analysis with timeline estimates.
        </p>

        <div className="mt-4">
          <h3 className="font-semibold text-sm">Select SOC 2 Categories:</h3>
          <div className="field-grid mt-2">
            {CATEGORIES.map((cat) => (
              <label key={cat} className="flex items-center gap-2 rounded border border-[#d4d9de] bg-white px-3 py-2">
                <input
                  type="checkbox"
                  checked={selectedCategories.has(cat)}
                  onChange={() => onToggleCategory(cat)}
                  className="h-4 w-4"
                />
                <span className="text-sm capitalize">{cat}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <h3 className="font-semibold text-sm">Implemented Controls:</h3>
          <div className="field-grid mt-2">
            {CONTROLS.map((ctrl) => (
              <label key={ctrl} className="flex items-center gap-2 rounded border border-[#d4d9de] bg-white px-3 py-2">
                <input
                  type="checkbox"
                  checked={selectedControls.has(ctrl)}
                  onChange={() => onToggleControl(ctrl)}
                  className="h-4 w-4"
                />
                <span className="text-sm">{ctrl.replace(/-/g, " ")}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <button type="button" className="btn primary" onClick={onCalculate}>
            Calculate Readiness
          </button>
          <button type="button" className="btn" onClick={onReset}>
            Reset
          </button>
        </div>

        {result && (
          <div className="tool-result" aria-live="polite">
            <p className="text-xs uppercase tracking-[0.08em] text-[#4f565c]">Overall Readiness</p>
            <p className="mt-1 text-lg font-semibold">{result.overallReadiness}%</p>
            <p className="mt-2 text-sm text-[#4f565c]">
              Estimated timeline: {result.estimatedTimelineMonths} months to full compliance
            </p>

            {result.priorityGaps.length > 0 && (
              <>
                <h3 className="mt-3 font-semibold text-sm">Priority Gaps:</h3>
                <ul className="mt-1 list-disc pl-5 text-sm text-[#4f565c]">
                  {result.priorityGaps.map((gap) => (
                    <li key={gap}>{gap}</li>
                  ))}
                </ul>
              </>
            )}

            <h3 className="mt-3 font-semibold text-sm">By Category:</h3>
            <div className="mt-2 space-y-2">
              {Object.entries(result.byCategory).map(([cat, data]) => (
                <div key={cat} className="text-sm">
                  <p className="capitalize font-medium">{cat}: {data.percentage}%</p>
                  {data.gaps.length > 0 && (
                    <p className="text-xs text-[#4f565c] ml-2">Gaps: {data.gaps.join(", ")}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
}
