
import { useState } from "react";
import { planNistFips203Migration } from "@/lib/tools/nist-fips-203";

export function NistFips203Planner() {
  const [assetCount, setAssetCount] = useState(50);
  const [teamSize, setTeamSize] = useState(5);
  const [criticality, setCriticality] = useState(1.0);
  const [result, setResult] = useState<ReturnType<typeof planNistFips203Migration> | null>(null);

  const onPlan = () => {
    const res = planNistFips203Migration({
      assetCount,
      teamSize: Math.max(1, teamSize),
      criticalityMultiplier: criticality,
    });
    setResult(res);
  };

  const onReset = () => {
    setAssetCount(50);
    setTeamSize(5);
    setCriticality(1.0);
    setResult(null);
  };

  return (
    <>
      <section className="tool-card">
        <h1 className="text-xl font-semibold">NIST FIPS 203 Migration Timeline Planner</h1>
        <p className="mt-2 text-sm text-[#4f565c]">
          Generate a phased migration timeline from classical cryptography to NIST-standardized post-quantum algorithms (ML-KEM, ML-DSA).
        </p>

        <div className="field-grid mt-4">
          <div>
            <label className="block text-sm font-medium mb-1">Cryptographic Assets (Count)</label>
            <input
              type="number"
              value={assetCount}
              onChange={(e) => setAssetCount(Math.max(1, Number(e.target.value) || 1))}
              min="1"
              className="w-full rounded border border-[#d4d9de] px-2 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Team Size</label>
            <input
              type="number"
              value={teamSize}
              onChange={(e) => setTeamSize(Math.max(1, Number(e.target.value) || 1))}
              min="1"
              className="w-full rounded border border-[#d4d9de] px-2 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Criticality  (1.0 = normal, 2.0 = high)</label>
            <select
              value={criticality}
              onChange={(e) => setCriticality(Number(e.target.value))}
              className="w-full rounded border border-[#d4d9de] px-2 py-2 text-sm"
            >
              <option value="0.8">Low (0.8x)</option>
              <option value="1.0">Normal (1.0x)</option>
              <option value="1.5">High (1.5x)</option>
              <option value="2.0">Critical (2.0x)</option>
            </select>
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <button type="button" className="btn primary" onClick={onPlan}>
            Generate Timeline
          </button>
          <button type="button" className="btn" onClick={onReset}>
            Reset
          </button>
        </div>

        {result && (
          <div className="tool-result" aria-live="polite">
            <p className="text-xs uppercase tracking-[0.08em] text-[#4f565c]">Total Migration Duration</p>
            <p className="mt-1 text-lg font-semibold">{result.totalDurationMonths} months</p>

            <div className="mt-3 space-y-3">
              {result.phases.map((phase, idx) => (
                <div key={idx} className="rounded-lg bg-[#fbfcfd] border border-[#d4d9de] p-3">
                  <p className="font-semibold text-sm">
                    Phase {idx + 1}: {phase.phase}
                  </p>
                  <p className="text-xs text-[#4f565c] mt-1">Duration: {phase.durationMonths} months</p>
                  <ul className="mt-2 list-disc pl-4 text-xs text-[#4f565c]">
                    {phase.keyActivities.map((activity) => (
                      <li key={activity}>{activity}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
}
