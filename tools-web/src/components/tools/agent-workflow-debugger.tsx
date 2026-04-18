"use client";

import { useState } from "react";
import { debugAgentWorkflow, type WorkflowNode } from "@/lib/tools/agent-workflow-debugger";

export function AgentWorkflowDebugger() {
  const [jsonInput, setJsonInput] = useState(
    JSON.stringify(
      {
        nodes: [
          { id: "start", name: "Start", nextNodeIds: ["process"], hasGuard: false },
          { id: "process", name: "Process", nextNodeIds: ["decide"], hasGuard: false },
          { id: "decide", name: "Decide", nextNodeIds: ["retry", "end"], hasGuard: true },
          { id: "retry", name: "Retry", nextNodeIds: ["process"], hasGuard: true },
          { id: "end", name: "End", nextNodeIds: [], hasGuard: false },
        ],
      },
      null,
      2
    )
  );
  const [result, setResult] = useState<ReturnType<typeof debugAgentWorkflow> | null>(null);

  const onDebug = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      const res = debugAgentWorkflow(parsed);
      setResult(res);
    } catch (e) {
      alert(`JSON parse error: ${e}`);
    }
  };

  return (
    <>
      <section className="tool-card">
        <h1 className="text-xl font-semibold">Agentic AI Workflow Debugger</h1>
        <p className="mt-2 text-sm text-[#4f565c]">
          Analyze an agent workflow graph for loops, unreachable nodes, and missing guards. Detect potential runaway loops before deployment.
        </p>
        <textarea
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          className="mt-3 w-full rounded border border-[#d4d9de] px-2 py-2 text-xs font-mono"
          rows={10}
        />
        <button type="button" className="btn primary mt-3" onClick={onDebug}>
          Debug Workflow
        </button>
        {result && (
          <div
            className={`tool-result mt-3 ${
              result.isValid ? "border-green-300" : "border-red-300"
            }`}
            aria-live="polite"
          >
            <p className="text-lg font-semibold">{result.isValid ? "✓ Valid" : "✗ Issues Found"}</p>
            {result.loopDetections.cycleFound && (
              <div className="mt-2">
                <p className="font-semibold">Loops: {result.loopDetections.loops.length}</p>
                {result.loopDetections.loops.map((loop, i) => (
                  <p key={i} className="text-sm text-[#4f565c]">
                    {loop.join(" → ")}
                  </p>
                ))}
              </div>
            )}
            {result.unreachableNodes.length > 0 && (
              <p className="mt-2 text-sm text-red-600">Unreachable: {result.unreachableNodes.join(", ")}</p>
            )}
            {result.recommendations.map((rec) => (
              <p key={rec} className="mt-1 text-sm">
                • {rec}
              </p>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
