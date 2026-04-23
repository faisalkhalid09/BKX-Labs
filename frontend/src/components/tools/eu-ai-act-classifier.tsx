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

      {/* AEO block */}
      <div className="tu-aeo">
        <p>
          <strong>As of April 2026</strong>, AI systems in Annex III sectors are classified as High-Risk
          under the EU AI Act. Enforcement begins August 2, 2026. Use this classifier to determine
          your regulatory obligations before deployment.
        </p>
      </div>

      <span className="tu-tag">BKX Compliance Tools</span>
      <h1 className="tu-title">EU AI Act Risk Classifier</h1>
      <p className="tu-subtitle">Determine your 2026 regulatory burden using the 5-step Article 6 decision tree.</p>
      <hr className="tu-divider" />

      {!result ? (
        <div>
          {/* Step progress */}
          <div className="tu-progress">
            {[1, 2, 3, 4, 5].map((s) => (
              <div key={s} className={`tu-progress-step ${s <= step ? "done" : ""}`} />
            ))}
          </div>

          {/* Step 1 */}
          {step === 1 && (
            <div className="tu-animate">
              <h2 className="tu-title" style={{ fontSize: "1.05rem", marginBottom: "0.5rem" }}>
                Step 1 — Article 5 Prohibited Practices
              </h2>
              <p className="tu-subtitle">Does your AI system perform any of the following?</p>
              <div className="tu-options">
                <button className="tu-option" onClick={() => handleProhibited("social_scoring")}>
                  Social scoring determining access to services or opportunities
                </button>
                <button className="tu-option" onClick={() => handleProhibited("emotion_workplace")}>
                  Emotion recognition in workplaces or educational institutions
                </button>
                <button className="tu-option" onClick={() => handleProhibited("facial_scraping")}>
                  Untargeted scraping of facial images from the internet or CCTV
                </button>
                <button className="tu-option" onClick={() => handleProhibited("subliminal")}>
                  Subliminal or manipulative techniques causing harm
                </button>
                <button className="tu-option active" onClick={() => handleProhibited("none")}>
                  None of the above
                </button>
              </div>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div className="tu-animate">
              <h2 className="tu-title" style={{ fontSize: "1.05rem", marginBottom: "0.5rem" }}>
                Step 2 — General-Purpose AI (GPAI)
              </h2>
              <p className="tu-subtitle">
                Is your system a large model trained with cumulative compute exceeding 10²⁵ FLOPs (Systemic Risk)?
              </p>
              <div className="tu-options">
                <button className="tu-option" onClick={() => handleGPAI(true)}>
                  Yes — exceeds 10²⁵ FLOPs (e.g. GPT-4 scale models)
                </button>
                <button className="tu-option active" onClick={() => handleGPAI(false)}>
                  No — narrow model or lesser-compute GPAI
                </button>
              </div>
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <div className="tu-animate">
              <h2 className="tu-title" style={{ fontSize: "1.05rem", marginBottom: "0.5rem" }}>
                Step 3 — Annex III Sector Mapping
              </h2>
              <p className="tu-subtitle">
                Is your AI a safety component or main application in any of these 8 high-risk sectors?
              </p>
              <div className="tu-options-grid">
                <button className="tu-option" onClick={() => handleAnnex("biometrics")}>Biometric Identification</button>
                <button className="tu-option" onClick={() => handleAnnex("critical_infra")}>Critical Infrastructure</button>
                <button className="tu-option" onClick={() => handleAnnex("education")}>Education &amp; Training</button>
                <button className="tu-option" onClick={() => handleAnnex("employment")}>Employment &amp; HR</button>
                <button className="tu-option" onClick={() => handleAnnex("essential_services")}>Essential Services</button>
                <button className="tu-option" onClick={() => handleAnnex("law_enforcement")}>Law Enforcement</button>
                <button className="tu-option" onClick={() => handleAnnex("migration")}>Migration &amp; Border</button>
                <button className="tu-option" onClick={() => handleAnnex("justice")}>Administration of Justice</button>
              </div>
              <div className="tu-options">
                <button className="tu-option active" onClick={() => handleAnnex("none")}>None of the above</button>
              </div>
            </div>
          )}

          {/* Step 4 */}
          {step === 4 && (
            <div className="tu-animate">
              <h2 className="tu-title" style={{ fontSize: "1.05rem", marginBottom: "0.5rem" }}>
                Step 4 — Article 6.3 Derogation Filter
              </h2>
              <p className="tu-subtitle">Select the description that best fits your AI system's function.</p>
              <div className="tu-options">
                <button className="tu-option" style={{ borderColor: "#0d2b5e", background: "#eff6ff" }} onClick={() => handleDerogation(true, "none")}>
                  System performs Profiling of natural persons — Derogation impossible
                </button>
                <button className="tu-option" onClick={() => handleDerogation(false, "narrow_procedural")}>
                  (a) Performs a narrow procedural task (data transformation)
                </button>
                <button className="tu-option" onClick={() => handleDerogation(false, "improving_human_activity")}>
                  (b) Improves the result of a previously completed human activity
                </button>
                <button className="tu-option" onClick={() => handleDerogation(false, "detecting_patterns")}>
                  (c) Detects patterns without replacing human assessment
                </button>
                <button className="tu-option" onClick={() => handleDerogation(false, "purely_preparatory")}>
                  (d) Performs a purely preparatory task
                </button>
                <button className="tu-option active" onClick={() => handleDerogation(false, "none")}>
                  None of the above (no derogation applies)
                </button>
              </div>
            </div>
          )}

          {/* Step 5 */}
          {step === 5 && (
            <div className="tu-animate">
              <h2 className="tu-title" style={{ fontSize: "1.05rem", marginBottom: "0.5rem" }}>
                Step 5 — Transparency Obligations
              </h2>
              <p className="tu-subtitle">
                Does your system generate deepfakes, process emotion, or interact with users directly as a chatbot?
              </p>
              <div className="tu-options">
                <button className="tu-option" onClick={() => handleTransparency(true)}>
                  Yes — it has these transparency triggers
                </button>
                <button className="tu-option active" onClick={() => handleTransparency(false)}>
                  No
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="tu-animate">
          {/* Risk result */}
          <div className={`tu-risk-box ${riskClass}`}>
            <div className="tu-risk-level">{result.riskLevel}</div>
            <p style={{ fontSize: "0.875rem", color: "#4f565c", margin: 0 }}>Based on 2026 EU AI Act guidelines</p>
          </div>

          {/* Compliance snapshot */}
          <div className="tu-result" style={{ position: "relative" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
              <span style={{ fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#4f565c" }}>Compliance Snapshot</span>
              <button className="tu-btn tu-btn-sm" onClick={copySnapshot}>Copy</button>
            </div>
            <div style={{ fontFamily: "monospace", fontSize: "0.82rem", lineHeight: 1.7, color: "#161a1d", whiteSpace: "pre-wrap" }}>
              {result.complianceSnapshot.map((s, i) => <p key={i} style={{ margin: "0.2rem 0" }}>{s}</p>)}
            </div>
          </div>

          {/* Two-column: obligations + audit docs */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginTop: "1rem" }}>
            <div>
              <p style={{ fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#4f565c", marginBottom: "0.5rem" }}>Obligations</p>
              <ul className="tu-result-list">
                {result.complianceRequirements.map((r, i) => <li key={i}>{r}</li>)}
              </ul>
            </div>
            <div>
              <p style={{ fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#4f565c", marginBottom: "0.5rem" }}>Audit Documents</p>
              <ul className="tu-result-list">
                {result.auditDocumentation.map((r, i) => <li key={i}>{r}</li>)}
              </ul>
            </div>
          </div>

          <div className="tu-btn-row" style={{ marginTop: "1.25rem" }}>
            <button className="tu-btn tu-btn-primary" onClick={reset}>Start New Assessment</button>
          </div>
        </div>
      )}

      {/* Documentation */}
      <article className="tu-prose">
        <h2>EU AI Act Compliance Guide (2026 Edition)</h2>
        <p>
          The European Union Artificial Intelligence Act (Regulation 2024/1689) represents the world's first comprehensive
          legal framework for artificial intelligence. By adopting a risk-based approach, it aims to foster innovation while
          safeguarding fundamental rights, safety, and democratic principles.
        </p>

        <h3>Annex III Sector Definitions</h3>
        <p>
          The core of the high-risk categorization lies in <strong>Annex III</strong>. If your software operates within
          these eight sectors, it defaults to High-Risk, demanding rigorous pre-market obligations:
        </p>
        <ul>
          <li><strong>Biometrics:</strong> Remote biometric identification systems (excluding purely verification systems like FaceID).</li>
          <li><strong>Critical Infrastructure:</strong> AI managing road traffic, water, gas, electricity, and heating grids where failure endangers life.</li>
          <li><strong>Education &amp; Vocational Training:</strong> Systems determining admission, evaluating outcomes, or assessing behavior during tests.</li>
          <li><strong>Employment &amp; Worker Management:</strong> AI for recruitment, task allocation, promotions, or continuous behavioral monitoring.</li>
          <li><strong>Essential Public Services:</strong> Algorithms determining eligibility for welfare, healthcare, and emergency dispatch.</li>
          <li><strong>Law Enforcement:</strong> Risk profiling for offending prediction or evaluating the reliability of criminal evidence.</li>
          <li><strong>Migration &amp; Border Control:</strong> Assessment of security risks posed by individuals or evaluation of asylum applications.</li>
          <li><strong>Administration of Justice:</strong> Assistance in researching facts/law in courts or alternative dispute resolutions.</li>
        </ul>

        <h3>Technical File Requirements (Annex IV)</h3>
        <p>
          High-Risk systems require an internal Technical File (Annex IV) formulated <em>before</em> the system is
          placed on the market. A compliant file includes: general description, system architecture diagrams,
          data management strategy (provenance, bias mitigation), human oversight directives, system operating logs,
          and a continuous Risk Management System.
        </p>

        <h3>Post-Market Monitoring (Article 72)</h3>
        <p>
          Compliance does not end at deployment. Article 72 requires comprehensive Post-Market Monitoring for all High-Risk
          providers. If a serious incident occurs (severe injury, death, or major fundamental rights violation), the provider
          must notify the market surveillance authority no later than 15 days from discovery.
        </p>

        <h3>SME Simplified Compliance</h3>
        <p>
          Recognizing the financial burden (estimated €40,000–€300,000 per high-risk system), the Act incorporates
          leniency mechanisms for SMEs. Micro-enterprises may adopt streamlined quality management systems, and
          AI regulatory sandboxes allow startups to test innovative systems before full enforcement is strictly applied.
        </p>
      </article>
    </div>
  );
}
