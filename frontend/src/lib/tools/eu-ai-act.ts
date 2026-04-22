import type { RiskLevel } from "@/lib/tools/types";

export type EuAiActInput = {
  isSubliminalManipulation: boolean;
  isSocialScoring: boolean;
  isUntargetedFacialScraping: boolean;
  isCriticalInfrastructure: boolean;
  isEducationOrVocationalScoring: boolean;
  isEmploymentOrWorkerManagement: boolean;
  isEssentialPublicServicesEligibility: boolean;
  isLawEnforcementUse: boolean;
  isMigrationAsylumBorderControl: boolean;
  isJusticeOrDemocraticProcess: boolean;
  hasEmotionRecognitionOrDeepfakeDisclosureNeed: boolean;
};

export type EuAiActResult = {
  riskLevel: RiskLevel;
  reasons: string[];
};

export function classifyEuAiActRisk(input: EuAiActInput): EuAiActResult {
  const prohibitedReasons: string[] = [];
  const highReasons: string[] = [];

  if (input.isSubliminalManipulation) {
    prohibitedReasons.push("Potential subliminal or manipulative behavioral distortion");
  }
  if (input.isSocialScoring) {
    prohibitedReasons.push("Social scoring behavior for individuals or groups");
  }
  if (input.isUntargetedFacialScraping) {
    prohibitedReasons.push("Untargeted facial image scraping for recognition systems");
  }

  if (prohibitedReasons.length > 0) {
    return {
      riskLevel: "Unacceptable",
      reasons: prohibitedReasons,
    };
  }

  if (input.isCriticalInfrastructure) {
    highReasons.push("Used in critical infrastructure or safety-relevant operations");
  }
  if (input.isEducationOrVocationalScoring) {
    highReasons.push("Used for education access, grading, or vocational assessment");
  }
  if (input.isEmploymentOrWorkerManagement) {
    highReasons.push("Used for hiring, promotions, productivity, or worker monitoring");
  }
  if (input.isEssentialPublicServicesEligibility) {
    highReasons.push("Used to determine eligibility for essential public/private services");
  }
  if (input.isLawEnforcementUse) {
    highReasons.push("Used for law-enforcement decisions or investigative profiling");
  }
  if (input.isMigrationAsylumBorderControl) {
    highReasons.push("Used in migration, asylum, or border-control decisions");
  }
  if (input.isJusticeOrDemocraticProcess) {
    highReasons.push("Used in judicial administration or democratic process support");
  }

  if (highReasons.length > 0) {
    return {
      riskLevel: "High",
      reasons: highReasons,
    };
  }

  if (input.hasEmotionRecognitionOrDeepfakeDisclosureNeed) {
    return {
      riskLevel: "Limited",
      reasons: [
        "Transparency duties likely apply (for example emotion recognition or synthetic media disclosure)",
      ],
    };
  }

  return {
    riskLevel: "Minimal",
    reasons: ["No prohibited pattern or high-risk Annex-like use-case was selected"],
  };
}
