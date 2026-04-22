
import { useState } from "react";
import { analyzePostQuantumCBOM, type PqcReadinessInput } from "@/lib/tools/pq-cbom";

type Dependency = { name: string; version: string; algorithm?: string };

export function PostQuantumCBOMGenerator() {
  const [deps, setDeps] = useState<Dependency[]>([
    { name: "openssl", version: "3.0.0", algorithm: "RSA" },
  ]);
  const [jsonInput, setJsonInput] = useState('{"dependencies": []}');
  const [result, setResult] = useState<ReturnType<typeof analyzePostQuantumCBOM> | null>(null);
  const [mode, setMode] = useState<"form" | "json">("form");

  const onAddDep = () => {
    setDeps([...deps, { name: "", version: "1.0.0", algorithm: "RSA" }]);
  };

  const onUpdateDep = (idx: number, field: keyof Dependency, value: string) => {
    const updated = [...deps];
    updated[idx] = { ...updated[idx], [field]: value };
    setDeps(updated);
  };

  const onRemoveDep = (idx: number) => {
    setDeps(deps.filter((_, i) => i !== idx));
  };

  const onAnalyzeForm = () => {
    const filtered = deps.filter((d) => d.name.trim());
    const res = analyzePostQuantumCBOM({ dependencies: filtered });
    setResult(res);
  };

  const onParseJson = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      if (!parsed.dependencies || !Array.isArray(parsed.dependencies)) {
        alert("JSON must contain 'dependencies' array");
        return;
      }
      const res = analyzePostQuantumCBOM(parsed);
      setResult(res);
    } catch (e) {
      alert(`JSON parse error: ${e}`);
    }
  };

  return (
    <>
      <section className="tool-card">
        <h1 className="text-xl font-semibold">Post-Quantum CBOM Generator</h1>
        <p className="mt-2 text-sm text-[#4f565c]">
          Scan your dependency list for post-quantum cryptography (PQC) readiness and receive a migration roadmap.
        </p>

        <div className="mt-4 flex gap-2">
          <button
            type="button"
            className={`px-3 py-2 text-sm font-semibold rounded ${
              mode === "form"
                ? "bg-[#161a1d] text-white"
                : "border border-[#d4d9de] text-[#161a1d]"
            }`}
            onClick={() => setMode("form")}
          >
            Form
          </button>
          <button
            type="button"
            className={`px-3 py-2 text-sm font-semibold rounded ${
              mode === "json"
                ? "bg-[#161a1d] text-white"
                : "border border-[#d4d9de] text-[#161a1d]"
            }`}
            onClick={() => setMode("json")}
          >
            JSON
          </button>
        </div>

        {mode === "form" ? (
          <>
            <div className="field-grid mt-3">
              {deps.map((dep, idx) => (
                <div key={idx} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Library name"
                    value={dep.name}
                    onChange={(e) => onUpdateDep(idx, "name", e.target.value)}
                    className="flex-1 rounded border border-[#d4d9de] px-2 py-1 text-sm"
                  />
                  <input
                    type="text"
                    placeholder="Version"
                    value={dep.version}
                    onChange={(e) => onUpdateDep(idx, "version", e.target.value)}
                    className="w-24 rounded border border-[#d4d9de] px-2 py-1 text-sm"
                  />
                  <select
                    value={dep.algorithm || ""}
                    onChange={(e) => onUpdateDep(idx, "algorithm", e.target.value)}
                    className="w-24 rounded border border-[#d4d9de] px-2 py-1 text-sm"
                  >
                    <option>RSA</option>
                    <option>ECC</option>
                    <option>AES</option>
                    <option>SHA-256</option>
                  </select>
                  <button
                    type="button"
                    onClick={() => onRemoveDep(idx)}
                    className="px-2 py-1 text-sm text-red-600 rounded border border-red-300"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-3 flex gap-2">
              <button type="button" className="btn" onClick={onAddDep}>
                Add Dependency
              </button>
              <button type="button" className="btn primary" onClick={onAnalyzeForm}>
                Analyze
              </button>
            </div>
          </>
        ) : (
          <>
            <textarea
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              placeholder='{"dependencies": [{"name": "openssl", "algorithm": "RSA"}]}'
              className="mt-3 w-full rounded border border-[#d4d9de] px-2 py-2 text-sm font-mono"
              rows={6}
            />
            <button type="button" className="btn primary mt-3" onClick={onParseJson}>
              Analyze JSON
            </button>
          </>
        )}

        {result && (
          <div className="tool-result" aria-live="polite">
            <p className="text-xs uppercase tracking-[0.08em] text-[#4f565c]">PQC Readiness Score</p>
            <p className="mt-1 text-lg font-semibold">{result.readinessPercentage}%</p>
            <p className="mt-2 text-sm text-[#4f565c]">
              {result.pqcReadyCount} PQC-ready, {result.pqcAwareCount} safe-algo, {result.notYetReady.length} legacy
            </p>
            {result.notYetReady.length > 0 && (
              <>
                <h3 className="mt-3 font-semibold text-sm">Not Yet PQC-Ready:</h3>
                <ul className="mt-1 list-disc pl-5 text-sm text-[#4f565c]">
                  {result.notYetReady.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </>
            )}
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
