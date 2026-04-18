"use client";

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
  { key: "isSubliminalManipulation", label: "Subliminal manipulation or behavioral distortion" },
  { key: "isSocialScoring", label: "Social scoring by behavior or personal traits" },
  { key: "isUntargetedFacialScraping", label: "Untargeted facial image scraping for recognition" },
  { key: "isCriticalInfrastructure", label: "Critical infrastructure or safety operations" },
  { key: "isEducationOrVocationalScoring", label: "Education admission, grading, or vocational scoring" },
  { key: "isEmploymentOrWorkerManagement", label: "Hiring, workforce monitoring, or worker management" },
  { key: "isEssentialPublicServicesEligibility", label: "Eligibility for essential services or benefits" },
  { key: "isLawEnforcementUse", label: "Law enforcement use-case or investigative profiling" },
  { key: "isMigrationAsylumBorderControl", label: "Migration, asylum, or border control context" },
  { key: "isJusticeOrDemocraticProcess", label: "Judicial support or democratic process context" },
  {
    key: "hasEmotionRecognitionOrDeepfakeDisclosureNeed",
    label: "Transparency duty context (emotion recognition or deepfake disclosure)",
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
    setInput((current) => ({ ...current, [key]: !current[key] }));
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
      <section className="tool-card" aria-label="EU AI Act Risk Level form">
        <h1 className="text-xl font-semibold">EU AI Act Risk Level Classifier</h1>
        <p className="mt-2 text-sm text-[#4f565c]">
          Select each condition that applies to your AI deployment. The result returns the highest-triggered risk level with reasoning.
        </p>

        <div className="field-grid">
          {FIELD_LABELS.map((field) => (
            <label
              key={field.key}
              className="flex items-start gap-3 rounded-lg border border-[#d4d9de] bg-white px-3 py-2"
            >
              <input
                type="checkbox"
                checked={input[field.key]}
                onChange={() => onToggle(field.key)}
                className="mt-1 h-4 w-4"
              />
              <span className="text-sm">{field.label}</span>
            </label>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap gap-3">
          <button type="button" className="btn primary" onClick={onCalculate}>
            Classify Risk
          </button>
          <button type="button" className="btn" onClick={onReset}>
            Reset
          </button>
          <p className="self-center text-sm text-[#4f565c]">{selectedCount} signal(s) selected</p>
        </div>

        {result && (
          <div className="tool-result" aria-live="polite">
            <p className="text-xs uppercase tracking-[0.08em] text-[#4f565c]">Risk Result</p>
            <p className="mt-1 text-lg font-semibold">{result.riskLevel}</p>
            <ul className="mt-2 list-disc pl-5 text-sm text-[#4f565c]">
              {result.reasons.map((reason) => (
                <li key={reason}>{reason}</li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {result && (
        <section className="ad-slot mid" aria-label="Wait-result ad reserved slot">
          Wait-Result Ad Placeholder
        </section>
      )}

      {showOfferwall && (
        <div className="offerwall-overlay" role="dialog" aria-modal="true" aria-label="Offerwall unlock">
          <div className="offerwall-card">
            <h2 className="text-lg font-semibold">Unlock More Uses</h2>
            <p className="mt-2 text-sm text-[#4f565c]">
              You reached the 3-use session limit. Complete a rewarded action to continue using tools in this session.
            </p>
            <div className="offerwall-actions">
              <button type="button" className="btn primary" onClick={onOfferwallReward}>
                Complete Rewarded Action (Placeholder)
              </button>
              <button type="button" className="btn" onClick={() => setShowOfferwall(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
