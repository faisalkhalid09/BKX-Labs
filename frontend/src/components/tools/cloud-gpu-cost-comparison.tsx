
import { useState } from "react";
import { compareCloudGpuCosts } from "@/lib/tools/cloud-gpu-cost";

const GPU_TYPES = ["a100-40gb", "a100-80gb", "h100-80gb", "v100-32gb"];
const COMMON_REGIONS = [
  "us-east-1",
  "us-east-1",
  "eu-west-1",
  "us-central1",
  "us-east",
  "uk-south",
];

export function CloudGpuCostComparison() {
  const [gpuType, setGpuType] = useState("a100-40gb");
  const [region, setRegion] = useState("us-east-1");
  const [hoursPerMonth, setHoursPerMonth] = useState(730);
  const [result, setResult] = useState<ReturnType<typeof compareCloudGpuCosts> | null>(null);

  const onCompare = () => {
    const res = compareCloudGpuCosts({
      gpuType,
      region,
      hoursPerMonth: Math.max(1, hoursPerMonth),
    });
    setResult(res);
  };

  const onReset = () => {
    setGpuType("a100-40gb");
    setRegion("us-east-1");
    setHoursPerMonth(730);
    setResult(null);
  };

  return (
    <>
      <section className="tool-card">
        <h1 className="text-xl font-semibold">Cloud-GPU Cost Comparison Tool</h1>
        <p className="mt-2 text-sm text-[#4f565c]">
          Compare GPU pricing across AWS, Azure, Google Cloud, and Lambda in real-time to find the best deal for your workload.
        </p>

        <div className="field-grid mt-4">
          <div>
            <label className="block text-sm font-medium mb-1">GPU Type</label>
            <select
              value={gpuType}
              onChange={(e) => setGpuType(e.target.value)}
              className="w-full rounded border border-[#d4d9de] px-2 py-2 text-sm"
            >
              {GPU_TYPES.map((gpu) => (
                <option key={gpu} value={gpu}>
                  {gpu.toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Region</label>
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full rounded border border-[#d4d9de] px-2 py-2 text-sm"
            >
              {Array.from(new Set(COMMON_REGIONS)).map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Hours per Month</label>
            <input
              type="number"
              value={hoursPerMonth}
              onChange={(e) => setHoursPerMonth(Number(e.target.value) || 0)}
              min="1"
              max="730"
              className="w-full rounded border border-[#d4d9de] px-2 py-2 text-sm"
            />
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <button type="button" className="btn primary" onClick={onCompare}>
            Compare Costs
          </button>
          <button type="button" className="btn" onClick={onReset}>
            Reset
          </button>
        </div>

        {result && (
          <div className="tool-result" aria-live="polite">
            <p className="text-xs uppercase tracking-[0.08em] text-[#4f565c]">Cheapest Provider</p>
            <p className="mt-1 text-lg font-semibold capitalize">{result.cheapestProvider}</p>
            <p className="mt-2 text-sm text-[#4f565c]">
              Monthly cost: ${result.cheapestCost.toFixed(2)} | Monthly savings vs most expensive: ${result.monthlySavings.toFixed(2)}
            </p>

            <h3 className="mt-3 font-semibold text-sm">All Providers:</h3>
            <div className="mt-2 space-y-2">
              {result.results.map((r) => (
                <div
                  key={r.provider}
                  className={`text-sm rounded p-2 ${
                    r.provider === result.cheapestProvider ? "bg-green-50 border border-green-200" : "bg-white"
                  }`}
                >
                  <p className="capitalize font-medium">
                    {r.provider}: ${r.monthlyCost.toFixed(2)}/mo (${r.hourlyRate.toFixed(3)}/hr)
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
}
