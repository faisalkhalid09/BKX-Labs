"use client";

import { useState } from "react";
import { optimizeSmartContractGas } from "@/lib/tools/smart-contract-gas-optimizer";

export function GasOptimizer() {
  const [storage, setStorage] = useState(true);
  const [loop, setLoop] = useState(false);
  const [packing, setPacking] = useState(false);
  const [assembly, setAssembly] = useState(false);
  const [externalCall, setExternalCall] = useState(false);
  const [result, setResult] = useState<ReturnType<typeof optimizeSmartContractGas> | null>(null);

  const onOptimize = () => {
    const res = optimizeSmartContractGas({
      hasExcessiveStorageWrites: storage,
      hasUnboundedLoop: loop,
      usesPacking: packing,
      hasInlineAssembly: assembly,
      usesExternalCall: externalCall,
    });
    setResult(res);
  };

  return (
    <>
      <section className="tool-card">
        <h1 className="text-xl font-semibold">Smart Contract Gas Fee Optimizer</h1>
        <p className="mt-2 text-sm text-[#4f565c]">
          Detect gas inefficiency patterns in smart contracts and get refactoring hints to reduce transaction costs.
        </p>
        <div className="field-grid mt-4">
          {[
            { state: storage, setState: setStorage, label: "Excessive storage writes" },
            { state: loop, setState: setLoop, label: "Unbounded loop" },
            { state: packing, setState: setPacking, label: "Data packing used" },
            { state: assembly, setState: setAssembly, label: "Inline assembly" },
            { state: externalCall, setState: setExternalCall, label: "External calls" },
          ].map((item) => (
            <label key={item.label} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={item.state}
                onChange={(e) => item.setState(e.target.checked)}
                className="h-4 w-4"
              />
              <span className="text-sm">{item.label}</span>
            </label>
          ))}
        </div>
        <button type="button" className="btn primary mt-3" onClick={onOptimize}>
          Analyze & Optimize
        </button>
        {result && (
          <div className="tool-result mt-3" aria-live="polite">
            <p className="text-lg font-semibold">Gas Savings: {result.savingsPercent}%</p>
            <p className="mt-2 text-sm text-[#4f565c]">
              Current: {result.currentGasEstimate} → {result.optimizedGasEstimate}
            </p>
            <ul className="mt-2 list-disc pl-5 text-sm text-[#4f565c]">
              {result.recommendations.map((rec) => (
                <li key={rec}>{rec}</li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </>
  );
}
