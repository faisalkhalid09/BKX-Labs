
import { useState } from "react";
import { scoreAdmtProportionality } from "@/lib/tools/admt-proportionality";

export function AdmtProportionalityScorer() {
  const [necessity, setNecessity] = useState(5);
  const [transparency, setTransparency] = useState(5);
  const [intrusiveness, setIntrusiveness] = useState(5);
  const [safeguards, setSafeguards] = useState(5);
  const [workerImpact, setWorkerImpact] = useState(5);
  const [result, setResult] = useState<ReturnType<typeof scoreAdmtProportionality> | null>(null);

  const onScore = () => {
    const res = scoreAdmtProportionality({
      necessity,
      transparency,
      intrusiveness,
      safeguards,
      workerImpact,
    });
    setResult(res);
  };

  const onReset = () => {
    setNecessity(5);
    setTransparency(5);
    setIntrusiveness(5);
    setSafeguards(5);
    setWorkerImpact(5);
    setResult(null);
  };

  const scaleLabel = (value: number) => {
    if (value < 3) return "Low";
    if (value < 7) return "Moderate";
    return "High";
  };

  return (
    <>
      <section className="tool-card">
        <h1 className="text-xl font-semibold">ADMT Proportionality Scorer</h1>
        <p className="mt-2 text-sm text-[#4f565c]">
          Assess legal proportionality of workplace AI monitoring under ADMT and EU labor law. Scores & risk bands help justify or challenge deployment.
        </p>

        <div className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Business Necessity (0-10)</label>
            <input
              type="range"
              value={necessity}
              onChange={(e) => setNecessity(Number(e.target.value))}
              min="0"
              max="10"
              className="w-full"
            />
            <div className="flex justify-between text-xs text-[#4f565c]">
              <span>{necessity}</span>
              <span>{scaleLabel(necessity)}</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Worker Transparency (0-10)</label>
            <input
              type="range"
              value={transparency}
              onChange={(e) => setTransparency(Number(e.target.value))}
              min="0"
              max="10"
              className="w-full"
            />
            <div className="flex justify-between text-xs text-[#4f565c]">
              <span>{transparency}</span>
              <span>{scaleLabel(transparency)}</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Intrusiveness (0-10)</label>
            <input
              type="range"
              value={intrusiveness}
              onChange={(e) => setIntrusiveness(Number(e.target.value))}
              min="0"
              max="10"
              className="w-full"
            />
            <div className="flex justify-between text-xs text-[#4f565c]">
              <span>{intrusiveness}</span>
              <span>{scaleLabel(intrusiveness)}</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Data Safeguards (0-10)</label>
            <input
              type="range"
              value={safeguards}
              onChange={(e) => setSafeguards(Number(e.target.value))}
              min="0"
              max="10"
              className="w-full"
            />
            <div className="flex justify-between text-xs text-[#4f565c]">
              <span>{safeguards}</span>
              <span>{scaleLabel(safeguards)}</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Worker Impact (0-10)</label>
            <input
              type="range"
              value={workerImpact}
              onChange={(e) => setWorkerImpact(Number(e.target.value))}
              min="0"
              max="10"
              className="w-full"
            />
            <div className="flex justify-between text-xs text-[#4f565c]">
              <span>{workerImpact}</span>
              <span>{scaleLabel(workerImpact)}</span>
            </div>
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <button type="button" className="btn primary" onClick={onScore}>
            Calculate Proportionality
          </button>
          <button type="button" className="btn" onClick={onReset}>
            Reset
          </button>
        </div>

        {result && (
          <div className="tool-result" aria-live="polite">
            <p className="text-xs uppercase tracking-[0.08em] text-[#4f565c]">Proportionality Score</p>
            <p className="mt-1 text-lg font-semibold">{result.proportionalityScore}/100</p>
            <p className={`mt-2 font-semibold capitalize ${
              result.riskBand === "low"
                ? "text-green-600"
                : result.riskBand === "medium"
                ? "text-yellow-600"
                : "text-red-600"
            }`}>
              Risk Band: {result.riskBand.toUpperCase()}
            </p>
            <p className="mt-2 text-sm">{result.assessmentSummary}</p>
            {result.recommendations.length > 0 && (
              <>
                <h3 className="mt-3 font-semibold text-sm">Recommendations:</h3>
                <ul className="mt-1 list-disc pl-5 text-sm text-[#4f565c]">
                  {result.recommendations.map((rec) => (
                    <li key={rec}>{rec}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        )}
      </section>
    </>
  );
}
