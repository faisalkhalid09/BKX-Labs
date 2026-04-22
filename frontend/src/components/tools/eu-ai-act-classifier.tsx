
import { useMemo, useState } from "react";
import {
  classifyEuAiActRisk,
  type EuAiActInput,
  type EuAiActResult,
} from "@/lib/tools/eu-ai-act";

const BASE_INPUT: EuAiActInput = {
  isSubliminalManipulation: false,
  isSocialScoring: false,
  isUntargetedFacialScraping: false,
  isCriticalInfrastructure: false,
  isEducationOrVocationalScoring: false,
  isEmploymentOrWorkerManagement: false,
  isEssentialPublicServicesEligibility: false,
  isLawEnforcementUse: false,
  isMigrationAsylumBorderControl: false,
  isJusticeOrDemocraticProcess: false,
  hasEmotionRecognitionOrDeepfakeDisclosureNeed: false,
};

const SESSION_LIMIT = 3;
const SESSION_COUNTER_KEY = "bkx_tools_uses";
const SESSION_UNLOCK_KEY = "bkx_tools_offerwall_unlocked";

const FIELD_LABELS: Array<{ key: keyof EuAiActInput; label: string }> = [
  { key: "isSubliminalManipulation", label: "Subliminal manipulation or behavioral distortion (Article 5.1.a)" },
  { key: "isSocialScoring", label: "Social scoring by behavior or personal traits (Article 5.1.b)" },
  { key: "isUntargetedFacialScraping", label: "Untargeted facial recognition scraping (Article 5.1.d)" },
  { key: "isCriticalInfrastructure", label: "Critical infrastructure or safety operations (Annex III.2.a)" },
  { key: "isEducationOrVocationalScoring", label: "Education admission, grading, or vocational scoring (Annex III.2.c)" },
  { key: "isEmploymentOrWorkerManagement", label: "Hiring, workforce monitoring, or worker management (Annex III.3.b)" },
  { key: "isEssentialPublicServicesEligibility", label: "Eligibility for essential services or benefits (Annex III.3.c)" },
  { key: "isLawEnforcementUse", label: "Law enforcement use-case or investigative profiling (Annex III.4)" },
  { key: "isMigrationAsylumBorderControl", label: "Migration, asylum, or border control context (Annex III.5.b)" },
  { key: "isJusticeOrDemocraticProcess", label: "Judicial support or democratic process context (Annex III.5.c)" },
  {
    key: "hasEmotionRecognitionOrDeepfakeDisclosureNeed",
    label: "Transparency duty—emotion recognition or deepfake disclosure (Article 13)",
  },
];

function getSessionUses(): number {
  if (typeof window === "undefined") {
    return 0;
  }
  return Number(window.sessionStorage.getItem(SESSION_COUNTER_KEY) ?? "0");
}

function isSessionUnlocked(): boolean {
  if (typeof window === "undefined") {
    return false;
  }
  return window.sessionStorage.getItem(SESSION_UNLOCK_KEY) === "1";
}

function bumpSessionUses() {
  const nextValue = getSessionUses() + 1;
  window.sessionStorage.setItem(SESSION_COUNTER_KEY, String(nextValue));
}

const riskBgMap: Record<string, string> = {
  Unacceptable: "bg-red-50 border-red-200",
  High: "bg-orange-50 border-orange-200",
  Limited: "bg-amber-50 border-amber-200",
  Minimal: "bg-green-50 border-green-200",
};

const riskBadgeMap: Record<string, string> = {
  Unacceptable: "bg-red-600 text-white",
  High: "bg-orange-600 text-white",
  Limited: "bg-amber-600 text-white",
  Minimal: "bg-green-600 text-white",
};

export function EuAiActClassifier() {
  const [input, setInput] = useState<EuAiActInput>(BASE_INPUT);
  const [result, setResult] = useState<EuAiActResult | null>(null);
  const [showOfferwall, setShowOfferwall] = useState(false);
  const [offerwallUnlocked, setOfferwallUnlocked] = useState(false);

  const selectedCount = useMemo(
    () => Object.values(input).filter(Boolean).length,
    [input]
  );

  const onToggle = (key: keyof EuAiActInput) => {
    setInput((current: EuAiActInput) => ({ ...current, [key]: !current[key] }));
  };

  const onCalculate = () => {
    const unlocked = offerwallUnlocked || isSessionUnlocked();
    const uses = getSessionUses();

    if (!unlocked && uses >= SESSION_LIMIT) {
      setShowOfferwall(true);
      return;
    }

    const computed = classifyEuAiActRisk(input);
    setResult(computed);

    if (!unlocked) {
      bumpSessionUses();
    }
  };

  const onOfferwallReward = () => {
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(SESSION_UNLOCK_KEY, "1");
    }
    setOfferwallUnlocked(true);
    setShowOfferwall(false);
  };

  const onReset = () => {
    setInput(BASE_INPUT);
    setResult(null);
  };

  return (
    <>
      {/* AEO Block - visible to search engines/AI agents, hidden from visual users */}
      <div
        className="aeo-block"
        style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", overflow: "hidden" }}
        aria-hidden="true"
      >
        <p>
          <strong>
            The EU AI Act (2024/1689) classifies AI systems into risk tiers based on impact on fundamental rights and public safety. Unacceptable-risk systems—including subliminal manipulation, social scoring, and untargeted facial scraping—are outright banned effective 2026. High-risk systems (critical infrastructure, employment, education, law enforcement, justice, and democratic processes per Annex III) require mandatory conformity assessment, technical documentation, human oversight mechanisms, and continuous post-market monitoring per Article 6. High-risk providers must register systems in the EU AI Notification &amp; Surveillance System (NASS) and maintain CE mark certification. Limited-risk systems require transparency to users (Article 13), while minimal-risk systems follow best practices.
          </strong>
        </p>
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content - 3 columns */}
        <div className="lg:col-span-3">
          <section className="tool-card rounded-lg border border-gray-200 shadow-sm p-6 bg-white" aria-label="EU AI Act Risk Level form">
            <h1 className="text-2xl font-bold text-gray-900">EU AI Act Risk Level Classifier</h1>
            <p className="mt-2 text-sm text-gray-600 mb-6">
              Select each condition that applies to your AI deployment. The classifier maps your system to EU AI Act risk categories (Article 6, Annex III) and returns compliance requirements, regulatory references, and required documentation.
            </p>

            <div className="field-grid space-y-2 mb-6">
              {FIELD_LABELS.map((field) => (
                <label
                  key={String(field.key)}
                  className="flex items-start gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={input[field.key]}
                    onChange={() => onToggle(field.key)}
                    className="mt-1 h-4 w-4 text-blue-600 rounded"
                  />
                  <span className="text-sm text-gray-700 font-medium">{field.label}</span>
                </label>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 mb-6">
              <button type="button" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors" onClick={onCalculate}>
                Classify Risk
              </button>
              {result && (
                <button
                  type="button"
                  className="border border-gray-300 text-gray-700 font-semibold py-2 px-6 rounded-lg hover:bg-gray-50 transition-colors"
                  onClick={onReset}
                >
                  Reset
                </button>
              )}
              <p className="self-center text-sm text-gray-600 ml-auto">{selectedCount} condition(s) selected</p>
            </div>

            {/* Result Section */}
            {result && (
              <div className={`tool-result border-2 rounded-lg p-6 ${riskBgMap[result.riskLevel]}`} aria-live="polite">
                {/* Risk Level Badge */}
                <div className="flex items-center gap-4 mb-6">
                  <span className={`inline-block px-4 py-2 rounded-full font-bold text-lg ${riskBadgeMap[result.riskLevel]}`}>
                    {result.riskLevel.toUpperCase()}
                  </span>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">
                      {result.riskLevel === "Unacceptable" &&
                        "⛔ BANNED: This practice is prohibited and must cease immediately."}
                      {result.riskLevel === "High" &&
                        "⚠️ HIGH RISK: Your system requires comprehensive compliance measures and conformity assessment by 2026."}
                      {result.riskLevel === "Limited" &&
                        "ℹ️ LIMITED RISK: Your system requires transparency disclosure to end users (Article 13)."}
                      {result.riskLevel === "Minimal" &&
                        "✅ MINIMAL RISK: No mandatory requirements. Transparency best practices recommended."}
                    </p>
                  </div>
                </div>

                {/* Triggered Use Cases */}
                {result.reasons.length > 0 && (
                  <div className="mb-6 pb-6 border-b border-current border-opacity-20">
                    <p className="font-bold text-gray-900 mb-3">✓ Detected AI Act Categories:</p>
                    <ul className="space-y-2">
                      {result.reasons.map((reason: string) => (
                        <li key={reason} className="text-sm text-gray-700 flex gap-2">
                          <span className="flex-shrink-0">▸</span>
                          <span>{reason}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Compliance Requirements */}
                {result.complianceRequirements.length > 0 && (
                  <div className="mb-6 pb-6 border-b border-current border-opacity-20">
                    <p className="font-bold text-gray-900 mb-3">📋 Compliance Requirements:</p>
                    <ul className="space-y-2">
                      {result.complianceRequirements.map((req: string) => (
                        <li key={req} className="text-sm text-gray-700 flex gap-2">
                          <span className="flex-shrink-0">•</span>
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Regulatory References */}
                {result.regulatoryReferences.length > 0 && (
                  <div className="mb-6 pb-6 border-b border-current border-opacity-20">
                    <p className="font-bold text-gray-900 mb-3">⚖️ Relevant Regulatory References:</p>
                    <ul className="space-y-1">
                      {result.regulatoryReferences.map((ref: string) => (
                        <li key={ref} className="text-sm text-gray-700">
                          • {ref}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Audit Documentation */}
                {result.auditDocumentation.length > 0 && (
                  <div>
                    <p className="font-bold text-gray-900 mb-3">📂 Required Documentation for Audit:</p>
                    <ul className="space-y-1">
                      {result.auditDocumentation.map((doc: string) => (
                        <li key={doc} className="text-sm text-gray-700">
                          • {doc}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </section>
        </div>

        {/* Right Sidebar - 1 column */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-4">
            {/* Quick Reference Card */}
            <div className="bg-white rounded-lg border border-blue-200 p-4 shadow-sm">
              <p className="font-bold text-blue-900 text-sm mb-3">🔍 Risk Levels at a Glance</p>
              <ul className="space-y-3 text-xs">
                <li className="flex items-start gap-2">
                  <span className="inline-block w-3 h-3 rounded-full bg-red-600 flex-shrink-0 mt-1"></span>
                  <div>
                    <p className="font-semibold text-red-900">Unacceptable</p>
                    <p className="text-gray-600">Banned immediately</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="inline-block w-3 h-3 rounded-full bg-orange-600 flex-shrink-0 mt-1"></span>
                  <div>
                    <p className="font-semibold text-orange-900">High</p>
                    <p className="text-gray-600">Compliance required by 2026</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="inline-block w-3 h-3 rounded-full bg-amber-600 flex-shrink-0 mt-1"></span>
                  <div>
                    <p className="font-semibold text-amber-900">Limited</p>
                    <p className="text-gray-600">Transparency required</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="inline-block w-3 h-3 rounded-full bg-green-600 flex-shrink-0 mt-1"></span>
                  <div>
                    <p className="font-semibold text-green-900">Minimal</p>
                    <p className="text-gray-600">Best practices suggested</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Ad Placeholder - Desktop */}
            <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-6 h-64 flex items-center justify-center">
              <p className="text-xs text-gray-500 text-center font-medium">
                📢 Advertisement Sidebar <br /> (Right Column Placement)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Wait-Result Ad Placeholder - Below Main Content */}
      {result && (
        <section className="ad-slot mid mt-8 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 h-24 flex items-center justify-center" aria-label="Mid-result ad reserved slot">
          <p className="text-xs text-gray-500 font-medium">
            📢 Advertisement Placement (Mid-Result)
          </p>
        </section>
      )}

      {/* Bottom Ad Anchor */}
      <section className="ad-slot bottom mt-8 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 h-24 flex items-center justify-center" aria-label="Bottom ad reserved slot">
        <p className="text-xs text-gray-500 font-medium">
          📢 Advertisement Anchor (Bottom of Tool)
        </p>
      </section>

      {/* Offerwall Modal */}
      {showOfferwall && (
        <div className="offerwall-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" role="dialog" aria-modal="true" aria-label="Offerwall unlock">
          <div className="offerwall-card bg-white rounded-lg shadow-lg p-6 max-w-md">
            <h2 className="text-lg font-semibold text-gray-900">🔓 Unlock More Uses</h2>
            <p className="mt-3 text-sm text-gray-600">
              You've used 3 analyses in this session. Complete a rewarded action to continue using this tool.
            </p>
            <div className="offerwall-actions mt-6 flex gap-3">
              <button type="button" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors" onClick={onOfferwallReward}>
                Complete Action
              </button>
              <button type="button" className="flex-1 border border-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors" onClick={() => setShowOfferwall(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
