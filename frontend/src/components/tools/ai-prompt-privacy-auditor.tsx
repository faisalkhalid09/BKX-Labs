
import { useState } from "react";
import { auditPromptPrivacy } from "@/lib/tools/ai-prompt-privacy-auditor";

export function AiPromptPrivacyAuditor() {
  const [promptText, setPromptText] = useState("");
  const [result, setResult] = useState<ReturnType<typeof auditPromptPrivacy> | null>(null);

  const onAudit = () => {
    if (!promptText.trim()) {
      alert("Enter a prompt to audit");
      return;
    }
    const res = auditPromptPrivacy({ promptText });
    setResult(res);
  };

  const onReset = () => {
    setPromptText("");
    setResult(null);
  };

  const getRiskColor = () => {
    if (!result) return "";
    if (result.riskLevel === "critical") return "bg-red-50 border-red-300";
    if (result.riskLevel === "high") return "bg-orange-50 border-orange-300";
    if (result.riskLevel === "medium") return "bg-yellow-50 border-yellow-300";
    return "bg-green-50 border-green-300";
  };

  return (
    <>
      <section className="tool-card">
        <h1 className="text-xl font-semibold">AI Prompt Privacy Auditor</h1>
        <p className="mt-2 text-sm text-[#4f565c]">
          Check if your prompt contains Personally Identifiable Information (PII) or secrets before sharing with AI services.
        </p>

        <div className="mt-4">
          <label className="block text-sm font-medium mb-2">Prompt Text</label>
          <textarea
            value={promptText}
            onChange={(e) => setPromptText(e.target.value)}
            placeholder="Paste your prompt here to scan for PII (emails, phone numbers, API keys, etc.)..."
            className="w-full rounded border border-[#d4d9de] px-3 py-2 text-sm font-mono"
            rows={8}
          />
        </div>

        <div className="mt-4 flex gap-2">
          <button type="button" className="btn primary" onClick={onAudit}>
            Scan for PII
          </button>
          <button type="button" className="btn" onClick={onReset}>
            Reset
          </button>
          <p className="self-center text-xs text-[#4f565c]">{promptText.length} chars</p>
        </div>

        {result && (
          <div className={`tool-result border ${getRiskColor()}`} aria-live="polite">
            <p className="text-xs uppercase tracking-[0.08em] text-[#4f565c]">Privacy Risk</p>
            <p className="mt-1 text-lg font-semibold capitalize">{result.riskLevel.toUpperCase()}: {result.riskScore}%</p>

            {result.detectedSignals.length > 0 && (
              <>
                <h3 className="mt-3 font-semibold text-sm">Detected Signals:</h3>
                <ul className="mt-1 space-y-2">
                  {result.detectedSignals.map((signal: any) => (
                    <li key={signal.type} className="text-sm">
                      <p className="font-medium capitalize">{signal.type} (Confidence: {Math.round(signal.confidence * 100)}%)</p>
                      <p className="text-xs text-[#4f565c]">Examples: {signal.examples.join(", ")}</p>
                    </li>
                  ))}
                </ul>
              </>
            )}

            {result.recommendations.length > 0 && (
              <>
                <h3 className="mt-3 font-semibold text-sm">Recommendations:</h3>
                <ul className="mt-1 list-disc pl-5 text-sm text-[#4f565c]">
                  {result.recommendations.map((rec: string) => (
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
