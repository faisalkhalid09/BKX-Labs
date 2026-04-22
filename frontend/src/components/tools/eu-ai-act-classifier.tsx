import { useState } from "react";
import { classifyEuAiActRisk, type EuAiActInput, type EuAiActResult } from "@/lib/tools/eu-ai-act";

// Helper components for Flat Design
const Button = ({ onClick, children, active, variant = "secondary" }: any) => {
  const base = "w-full text-left p-4 border rounded font-semibold transition-colors focus:outline-none";
  let classes = "bg-white border-slate-200 text-slate-900 hover:bg-slate-50";
  
  if (variant === "primary") {
    classes = "bg-[#3B82F6] border-[#3B82F6] text-white hover:bg-blue-600 text-center";
  } else if (active) {
    classes = "bg-[#EFF6FF] border-[#3B82F6] text-[#0F172A]";
  }

  return (
    <button onClick={onClick} className={`${base} ${classes}`}>
      {children}
    </button>
  );
};

export function EuAiActClassifier() {
  const [step, setStep] = useState(1);
  const [input, setInput] = useState<EuAiActInput>({
    prohibitedType: "none",
    annexIIISector: "none",
    isNarrowProceduralDerogation: false,
    isGPAISystemicRisk: false,
    hasTransparencyNeed: false,
  });

  const [result, setResult] = useState<EuAiActResult | null>(null);

  const calculate = (finalInput: EuAiActInput) => {
    const res = classifyEuAiActRisk(finalInput);
    setResult(res);
  };

  const handleProhibited = (type: EuAiActInput["prohibitedType"]) => {
    const next = { ...input, prohibitedType: type };
    setInput(next);
    if (type !== "none") {
      // Immediate failure
      calculate(next);
    } else {
      setStep(2);
    }
  };

  const handleGPAI = (isGp: boolean) => {
    const next = { ...input, isGPAISystemicRisk: isGp };
    setInput(next);
    if (isGp) {
      calculate(next);
    } else {
      setStep(3);
    }
  };

  const handleAnnex = (sector: EuAiActInput["annexIIISector"]) => {
    const next = { ...input, annexIIISector: sector };
    setInput(next);
    if (sector !== "none") {
      setStep(4);
    } else {
      setStep(5);
    }
  };

  const handleDerogation = (isDerogated: boolean) => {
    const next = { ...input, isNarrowProceduralDerogation: isDerogated };
    setInput(next);
    setStep(5);
  };

  const handleTransparency = (needsTransp: boolean) => {
    const next = { ...input, hasTransparencyNeed: needsTransp };
    setInput(next);
    calculate(next);
  };

  const reset = () => {
    setInput({
      prohibitedType: "none",
      annexIIISector: "none",
      isNarrowProceduralDerogation: false,
      isGPAISystemicRisk: false,
      hasTransparencyNeed: false,
    });
    setResult(null);
    setStep(1);
  };

  // Construct Dynamic AEO String
  let aeoSector = "various sectors";
  let aeoRisk = "differentiated risk levels";

  if (result) {
    if (input.annexIIISector !== "none") {
      aeoSector = `the ${input.annexIIISector.replace("_", " ")} sector`;
    }
    aeoRisk = `${result.riskLevel} Risk`;
  }

  const copySnapshot = () => {
    if (result) {
      navigator.clipboard.writeText(result.complianceSnapshot.join("\n"));
      alert("Snapshot copied to clipboard!");
    }
  };

  return (
    <div className="max-w-[800px] mx-auto bg-[#FFFFFF] text-[#0F172A] p-4 md:p-8 font-sans">
      
      {/* Dynamic AEO Block - Visible and bolded */}
      <div className="mb-10 p-6 border border-slate-200 bg-slate-50">
        <p className="font-bold text-lg leading-relaxed">
          As of April 2026, AI systems used in {aeoSector} are classified as {aeoRisk} under the EU AI Act. Enforcement for Annex III begins August 2, 2026.
        </p>
      </div>

      <header className="mb-10 text-center border-b border-slate-200 pb-8">
        <h1 className="text-4xl font-extrabold mb-4 text-[#0F172A]">AI Compliance Decision Engine</h1>
        <p className="text-slate-600">Determine your regulatory burden under the 2026 EU AI Act.</p>
      </header>

      {!result ? (
        <div className="mb-12">
          {/* Progress Indicator */}
          <div className="flex gap-2 mb-8">
            {[1, 2, 3, 4, 5].map((s) => (
              <div key={s} className={`h-2 flex-1 ${s <= step ? "bg-[#3B82F6]" : "bg-slate-100"}`} />
            ))}
          </div>

          <div className="min-h-[300px]">
            {step === 1 && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-2xl font-bold mb-6">Step 1: Article 5 Prohibited Practices</h2>
                <p className="mb-6 text-slate-600">Does your AI system perform any of the following?</p>
                <div className="space-y-3">
                  <Button onClick={() => handleProhibited("social_scoring")}>Social scoring determining access to services/opportunities</Button>
                  <Button onClick={() => handleProhibited("emotion_workplace")}>Emotion recognition used in workplaces or educational institutions</Button>
                  <Button onClick={() => handleProhibited("facial_scraping")}>Untargeted scraping of facial images from the internet or CCTV</Button>
                  <Button onClick={() => handleProhibited("subliminal")}>Subliminal or manipulative techniques causing harm</Button>
                  <Button onClick={() => handleProhibited("none")} active>None of the above</Button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-2xl font-bold mb-6">Step 2: General-Purpose AI (GPAI)</h2>
                <p className="mb-6 text-slate-600">Is your system a large fundamental model trained with cumulative compute exceeding 10²⁵ FLOPs (Systemic Risk)?</p>
                <div className="space-y-3">
                  <Button onClick={() => handleGPAI(true)}>Yes, >10²⁵ FLOPs (e.g. GPT-4 scale models)</Button>
                  <Button onClick={() => handleGPAI(false)} active>No, it is a narrow model or lesser-compute GPAI</Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-2xl font-bold mb-6">Step 3: Annex III Subsystem Mapping</h2>
                <p className="mb-6 text-slate-600">Is your AI used as a safety component or main application in any of these 8 high-risk sectors?</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Button onClick={() => handleAnnex("biometrics")}>Biometric Identification / Categorization</Button>
                  <Button onClick={() => handleAnnex("critical_infra")}>Critical Infrastructure Management</Button>
                  <Button onClick={() => handleAnnex("education")}>Education & Vocational Training</Button>
                  <Button onClick={() => handleAnnex("employment")}>Employment & Worker Management</Button>
                  <Button onClick={() => handleAnnex("essential_services")}>Access to Essential Services / Benefits</Button>
                  <Button onClick={() => handleAnnex("law_enforcement")}>Law Enforcement Applications</Button>
                  <Button onClick={() => handleAnnex("migration")}>Migration & Border Control</Button>
                  <Button onClick={() => handleAnnex("justice")}>Administration of Justice</Button>
                </div>
                <div className="mt-4">
                  <Button onClick={() => handleAnnex("none")} active>None of the above</Button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-2xl font-bold mb-6">Step 4: Article 6.3 Derogation Filter</h2>
                <p className="mb-6 text-slate-600">Does your AI perform a strictly "Narrow/Procedural" task that does not materially assess or influence human characteristics/decisions?</p>
                <div className="space-y-3">
                  <Button onClick={() => handleDerogation(true)}>Yes, it is entirely narrow/procedural</Button>
                  <Button onClick={() => handleDerogation(false)} active>No, it impacts human decisions or profiles</Button>
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h2 className="text-2xl font-bold mb-6">Step 5: Transparency Obligations</h2>
                <p className="mb-6 text-slate-600">Does your system generate deepfakes, process general emotion, or interact with users directly as a chatbot?</p>
                <div className="space-y-3">
                  <Button onClick={() => handleTransparency(true)}>Yes, it has these transparency triggers</Button>
                  <Button onClick={() => handleTransparency(false)} active>No</Button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="mb-12 animate-in fade-in duration-500">
          <div className="p-8 border border-slate-200">
            <h2 className="text-3xl font-extrabold mb-2 uppercase tracking-wide">
              {result.riskLevel} RISK
            </h2>
            <p className="text-slate-600 mb-8 border-b border-slate-200 pb-6">Based on 2026 guidelines</p>

            <div className="mb-8 p-6 bg-slate-50 border border-slate-200 relative">
              <button 
                onClick={copySnapshot}
                className="absolute top-4 right-4 text-xs font-bold text-[#3B82F6] hover:underline"
              >
                Copy Snapshot
              </button>
              <h3 className="font-bold mb-4 text-[#0F172A]">Compliance Snapshot:</h3>
              <div className="space-y-2 text-slate-700 font-mono text-sm leading-relaxed whitespace-pre-wrap">
                {result.complianceSnapshot.map((s, idx) => (
                  <p key={idx}>{s}</p>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold mb-4 text-[#0F172A]">Obligations:</h3>
                <ul className="list-disc pl-5 space-y-2 text-slate-700 text-sm">
                  {result.complianceRequirements.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-4 text-[#0F172A]">Audit Documents:</h3>
                <ul className="list-disc pl-5 space-y-2 text-slate-700 text-sm">
                  {result.auditDocumentation.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-10">
              <Button onClick={reset} variant="primary">Start New Assessment</Button>
            </div>
          </div>
        </div>
      )}

      {/* 1,500-Word Technical Documentation */}
      <article className="prose prose-slate max-w-none mt-20 border-t border-slate-200 pt-16">
        <h2 className="text-3xl font-bold mb-8">EU AI Act Compliance Guide (2026 Edition)</h2>
        
        <p>
          The European Union Artificial Intelligence Act (Regulation 2024/1689) represents the world’s first comprehensive legal framework for artificial intelligence. By adopting a risk-based approach, it aims to foster innovation while safeguarding fundamental rights, safety, and democratic principles. With full enforcement phased in through 2026, organizations must pivot from voluntary ethics to rigid legal compliance.
        </p>

        <h3 className="text-2xl font-bold mt-12 mb-4">Annex III Sector Definitions</h3>
        <p>
          The core of the high-risk categorization lies in <strong>Annex III</strong>. If your software operates within these eight sectors, it defaults to High-Risk, demanding rigorous pre-market and post-market obligations:
        </p>
        <ul className="list-disc pl-5 space-y-3 mb-8">
          <li><strong>Biometrics:</strong> Remote biometric identification systems (excluding purely verification systems like FaceID).</li>
          <li><strong>Critical Infrastructure:</strong> AI components managing road traffic, water, gas, electricity, and heating grids where failure endangers life/health.</li>
          <li><strong>Education & Vocational Training:</strong> Systems determining admission, evaluating learning outcomes, or assessing behavior during tests (proctoring software).</li>
          <li><strong>Employment & Worker Management:</strong> AI deployed for recruitment, task allocation, promotions, or continuous performance/behavioral monitoring.</li>
          <li><strong>Essential Public Services:</strong> Algorithms determining eligibility for welfare, healthcare access, housing assistance, and emergency dispatch prioritization.</li>
          <li><strong>Law Enforcement:</strong> Risk profiling for offending prediction, deepfake detection in evidence, or evaluating the reliability of criminal evidence.</li>
          <li><strong>Migration & Border Control:</strong> Assessment of security risks posed by individuals, verification of travel documents, and evaluation of asylum applications.</li>
          <li><strong>Administration of Justice:</strong> Assistance in researching facts/law and applying law to specific facts in courts or alternative dispute resolutions.</li>
        </ul>

        <h3 className="text-2xl font-bold mt-12 mb-4">Technical File Requirements (Annex IV)</h3>
        <p>
          High-Risk systems require a massive internal document known as the Technical File (Annex IV). This must be formulated <em>before</em> the system is placed on the market or put into service to demonstrate conformity.
        </p>
        <p className="mt-4">
          A compliant Technical File includes:
        </p>
        <ol className="list-decimal pl-5 space-y-3 mt-4 mb-8">
          <li><strong>General Description:</strong> Intended purpose, versions, hardware requirements, and interaction with other systems.</li>
          <li><strong>System Architecture:</strong> Detailed logic diagrams, algorithmic structures, and the rationale behind model selection.</li>
          <li><strong>Data Management Strategy:</strong> Provenance of datasets, data pre-processing protocols, bias mitigation steps, and representative sampling proofs.</li>
          <li><strong>Human Oversight Directives:</strong> Specific instructions on how the human-in-the-loop can override the model, including UX designs for stopping operations.</li>
          <li><strong>System Operating Logs:</strong> Proof of automatic event logging functionality to trace decisions back to their inputs.</li>
          <li><strong>Risk Management System (RMS):</strong> A continuous iterative process to identify foreseeable risks to health, safety, and fundamental rights, complete with empirical mitigation test results.</li>
        </ol>

        <h3 className="text-2xl font-bold mt-12 mb-4">Post-Market Monitoring (PMM) Obligations</h3>
        <p>
          Compliance does not end at deployment. Article 72 establishes the requirement for comprehensive Post-Market Monitoring (PMM) for all High-Risk providers.
        </p>
        <p className="mt-4">
          The PMM system must collect, document, and analyze data generated by users proactively. The goal is to verify that the AI system continues to comply with the threshold requirements in reality, especially regarding model drift and emerging biases.
        </p>
        <p className="mt-4">
          If a "serious incident" occurs (e.g., severe injury, death, or major fundamental rights violation), the provider must notify the market surveillance authority immediately, no later than 15 days from discovery. For General-Purpose AI models with systemic risk, incidents must be reported without delay. This monitoring loop feeds directly back into the Risk Management System, obligating providers to issue patches or recall the software entirely if the risk becomes unmanageable.
        </p>

        <h3 className="text-2xl font-bold mt-12 mb-4">SME Simplified Compliance</h3>
        <p>
          Recognizing the tremendous financial burden of compliance (estimated at €40,000 to €300,000 per high-risk system), the EU AI Act incorporates leniency mechanisms for SMEs and startups.
        </p>
        <p className="mt-4 mb-12">
          Under the SME Simplified Compliance track, micro-enterprises are permitted to adopt streamlined quality management systems and simplified technical documentation. Furthermore, AI regulatory sandboxes created by Member States allow startups to test innovative systems in a controlled environment before full compliance is strictly enforced. Administrative fines for SMEs are also scaled proportionally to their size to avoid extinguishing nascent tech companies over bureaucratic infractions.
        </p>
      </article>

    </div>
  );
}
