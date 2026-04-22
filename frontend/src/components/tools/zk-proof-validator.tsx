
import { useState } from "react";
import { validateZkCircuit } from "@/lib/tools/zk-proof-validator";

export function ZkCircuitValidator() {
  const [code, setCode] = useState(
    "signal input x;\nsignal input y;\nsignal output out;\n\nout <== x * y;"
  );
  const [result, setResult] = useState<ReturnType<typeof validateZkCircuit> | null>(null);

  const onValidate = () => {
    const res = validateZkCircuit({ circuitCode: code });
    setResult(res);
  };

  return (
    <>
      <section className="tool-card">
        <h1 className="text-xl font-semibold">Zero-Knowledge Proof Validator</h1>
        <p className="mt-2 text-sm text-[#4f565c]">
          Validate zero-knowledge circuit syntax and detect likely unsound constraints.
        </p>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="mt-3 w-full rounded border border-[#d4d9de] px-2 py-2 text-sm font-mono"
          rows={6}
        />
        <button type="button" className="btn primary mt-3" onClick={onValidate}>
          Validate Circuit
        </button>
        {result && (
          <div className={`tool-result mt-3 ${result.isValid ? "border-green-300" : "border-red-300"}`}>
            <p className="text-lg font-semibold">{result.isValid ? "✓ Valid" : "✗ Errors"}</p>
            {result.errors.map((e) => (
              <p key={e} className="mt-1 text-sm text-red-600">
                • {e}
              </p>
            ))}
            {result.warnings.map((w) => (
              <p key={w} className="mt-1 text-sm text-yellow-600">
                ⚠ {w}
              </p>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
