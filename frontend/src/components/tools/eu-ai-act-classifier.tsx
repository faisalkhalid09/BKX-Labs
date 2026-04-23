import { useState } from "react";
import { classifyEuAiActRisk, type EuAiActInput, type EuAiActResult } from "@/lib/tools/eu-ai-act";

type RiskClass = "prohibited" | "high" | "limited" | "minimal" | "gpai";

function getRiskClass(level: string): RiskClass {
  if (level.toLowerCase().includes("prohibited")) return "prohibited";
  if (level.toLowerCase().includes("high")) return "high";
  if (level.toLowerCase().includes("gpai")) return "gpai";
  if (level.toLowerCase().includes("limited")) return "limited";
  return "minimal";
}

export function EuAiActClassifier() {
  const [step, setStep] = useState(1);
  const [input, setInput] = useState<EuAiActInput>({
    prohibitedType: "none",
    annexIIISector: "none",
    isProfiling: false,
    derogationCategory: "none",
    isGPAISystemicRisk: false,
    hasTransparencyNeed: false,
  });
  const [result, setResult] = useState<EuAiActResult | null>(null);

  const calculate = (finalInput: EuAiActInput) => {
    setResult(classifyEuAiActRisk(finalInput));
  };

  const handleProhibited = (type: EuAiActInput["prohibitedType"]) => {
    const next = { ...input, prohibitedType: type };
    setInput(next);
    if (type !== "none") { calculate(next); } else { setStep(2); }
  };

  const handleGPAI = (isGp: boolean) => {
    const next = { ...input, isGPAISystemicRisk: isGp };
    setInput(next);
    if (isGp) { calculate(next); } else { setStep(3); }
  };

  const handleAnnex = (sector: EuAiActInput["annexIIISector"]) => {
    const next = { ...input, annexIIISector: sector };
    setInput(next);
    setStep(sector !== "none" ? 4 : 5);
  };

  const handleDerogation = (profiling: boolean, category: EuAiActInput["derogationCategory"]) => {
    const next = { ...input, isProfiling: profiling, derogationCategory: category };
    setInput(next);
    setStep(5);
  };

  const handleTransparency = (needsTransp: boolean) => {
    const next = { ...input, hasTransparencyNeed: needsTransp };
    setInput(next);
    calculate(next);
  };

  const reset = () => {
    setInput({ prohibitedType: "none", annexIIISector: "none", isProfiling: false, derogationCategory: "none", isGPAISystemicRisk: false, hasTransparencyNeed: false });
    setResult(null);
    setStep(1);
  };

  const copySnapshot = () => {
    if (result) {
      navigator.clipboard.writeText(result.complianceSnapshot.join("\n"));
    }
  };

  const riskClass = result ? getRiskClass(result.riskLevel) : null;

  return (
    <div className="tu-wrap">
      <span className="tu-tag">BKX Compliance Tools</span>
      <h1 className="tu-title">EU AI Act Risk Classifier</h1>
      <p className="tu-subtitle">Determine your 2026 regulatory burden using the Article 6 decision tree.</p>
      <hr className="tu-divider" />

      {!result ? (
        <div className="tu-animate" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div className="tu-progress" style={{ marginBottom: '2rem' }}>
            {[1, 2, 3, 4, 5].map((s) => (
              <div key={s} className={`tu-progress-step ${s <= step ? "done" : ""}`} />
            ))}
          </div>

          <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', border: '1px solid #d4d9de' }}>
            {step === 1 && (
              <>
                <h2 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.5rem" }}>Step 1 — Prohibited Practices</h2>
                <div className="tu-options">
                  <button className="tu-option" onClick={() => handleProhibited("social_scoring")}>Social scoring access to services</button>
                  <button className="tu-option" onClick={() => handleProhibited("emotion_workplace")}>Emotion recognition in workplace/schools</button>
                  <button className="tu-option" onClick={() => handleProhibited("facial_scraping")}>Untargeted facial scraping (CCTV/Web)</button>
                  <button className="tu-option" onClick={() => handleProhibited("subliminal")}>Subliminal or manipulative techniques</button>
                  <button className="tu-option active" onClick={() => handleProhibited("none")}>None of the above</button>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <h2 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.5rem" }}>Step 2 — General-Purpose AI</h2>
                <div className="tu-options">
                  <button className="tu-option" onClick={() => handleGPAI(true)}>Yes — Systemic Risk model (>10²⁵ FLOPs)</button>
                  <button className="tu-option active" onClick={() => handleGPAI(false)}>No — Narrow or standard GPAI</button>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <h2 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.5rem" }}>Step 3 — Annex III Sector Mapping</h2>
                <div className="tu-options-grid" style={{ gap: '0.65rem' }}>
                  <button className="tu-option" onClick={() => handleAnnex("biometrics")}>Biometrics</button>
                  <button className="tu-option" onClick={() => handleAnnex("critical_infra")}>Infrastructure</button>
                  <button className="tu-option" onClick={() => handleAnnex("education")}>Education</button>
                  <button className="tu-option" onClick={() => handleAnnex("employment")}>Employment</button>
                  <button className="tu-option" onClick={() => handleAnnex("essential_services")}>Public Svc</button>
                  <button className="tu-option" onClick={() => handleAnnex("law_enforcement")}>Police/Law</button>
                  <button className="tu-option" onClick={() => handleAnnex("migration")}>Migration</button>
                  <button className="tu-option" onClick={() => handleAnnex("justice")}>Justice</button>
                </div>
                <button className="tu-option active" style={{ marginTop: '0.65rem' }} onClick={() => handleAnnex("none")}>None of the above</button>
              </>
            )}

            {step === 4 && (
              <>
                <h2 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.5rem" }}>Step 4 — Derogation Filter</h2>
                <div className="tu-options">
                  <button className="tu-option" style={{ borderColor: "#0d2b5e", background: "#f8fafc" }} onClick={() => handleDerogation(true, "none")}>PROFILING detected (Derogation impossible)</button>
                  <button className="tu-option" onClick={() => handleDerogation(false, "narrow_procedural")}>(a) Narrow procedural task</button>
                  <button className="tu-option" onClick={() => handleDerogation(false, "improving_human_activity")}>(b) Improves human activity result</button>
                  <button className="tu-option" onClick={() => handleDerogation(false, "detecting_patterns")}>(c) Detects patterns only</button>
                  <button className="tu-option active" onClick={() => handleDerogation(false, "none")}>None (No derogation applies)</button>
                </div>
              </>
            )}

            {step === 5 && (
              <>
                <h2 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.5rem" }}>Step 5 — Transparency</h2>
                <div className="tu-options">
                  <button className="tu-option" onClick={() => handleTransparency(true)}>System generates deepfakes/chatbot/emotion</button>
                  <button className="tu-option active" onClick={() => handleTransparency(false)}>No transparency triggers</button>
                </div>
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="tu-split-layout tu-animate">
          <div className="tu-split-left">
            <div className={`tu-risk-box ${riskClass}`} style={{ marginBottom: '1.5rem', padding: '1.5rem' }}>
              <div className="tu-risk-level" style={{ fontSize: '2rem' }}>{result.riskLevel}</div>
              <p style={{ fontSize: "0.8rem", color: "rgba(0,0,0,0.6)", margin: 0 }}>EU AI Act Enforcement: August 2026</p>
            </div>

            <div className="tu-result" style={{ marginTop: 0 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                <span className="tu-label">Compliance Snapshot</span>
                <button className="tu-btn tu-btn-sm" onClick={copySnapshot}>Copy Text</button>
              </div>
              <div style={{ fontFamily: "monospace", fontSize: "0.82rem", lineHeight: 1.6, color: "#161a1d", whiteSpace: "pre-wrap", background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #d4d9de' }}>
                {result.complianceSnapshot.join("\n")}
              </div>
            </div>

            <button className="tu-btn tu-btn-primary" style={{ marginTop: '1.5rem' }} onClick={reset}>Restart Classifier</button>

            <div className="tu-aeo" style={{ marginTop: '2.5rem' }}>
              <p>
                <strong>2026 Legal Notice:</strong> High-risk AI providers must register in the EU database 
                and appoint an EU-based authorized representative. Penalties for non-compliance with 
                Annex III data quality rules can reach €15M or 3% of global turnover.
              </p>
            </div>
          </div>

          <div className="tu-split-right">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <p className="tu-label" style={{ marginBottom: '0.75rem', color: '#0d2b5e' }}>Critical Obligations</p>
                <ul className="tu-result-list" style={{ marginTop: 0 }}>
                  {result.complianceRequirements.map((r, i) => <li key={i}>{r}</li>)}
                </ul>
              </div>
              <div>
                <p className="tu-label" style={{ marginBottom: '0.75rem', color: '#0d2b5e' }}>Required Audit Artifacts</p>
                <ul className="tu-result-list" style={{ marginTop: 0 }}>
                  {result.auditDocumentation.map((r, i) => <li key={i}>{r}</li>)}
                </ul>
              </div>
              
              <article className="tu-prose" style={{ borderTop: '1px solid #e8ecf1', paddingTop: '1rem' }}>
                <h4 style={{ fontSize: '0.9rem', color: '#0d2b5e', margin: '0 0 0.5rem' }}>Article 6.3 Derogations</h4>
                <p style={{ fontSize: '0.78rem', color: '#4f565c', lineHeight: 1.5 }}>
                  AI systems in High-Risk sectors may qualify for derogation if they purely improve human activity 
                  or perform minor preparatory tasks, provided they do NOT involve profiling.
                </p>
              </article>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
