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
  complianceRequirements: string[];
  regulatoryReferences: string[];
  auditDocumentation: string[];
};

/**
 * EU AI Act Risk Classifier - Based on 2026 consolidated framework
 * Implements Annex III High-Risk categories and prohibited practices
 */
export function classifyEuAiActRisk(input: EuAiActInput): EuAiActResult {
  const prohibitedReasons: string[] = [];
  const highReasons: string[] = [];
  const annex3Matches: string[] = [];
  const complianceRequirements: string[] = [];
  const regulatoryReferences: string[] = [];
  const auditDocumentation: string[] = [];

  // ===== PROHIBITED PRACTICES (Article 5) =====
  if (input.isSubliminalManipulation) {
    prohibitedReasons.push(
      "Subliminal manipulation or behavioral distortion (Article 5.1.a)"
    );
    regulatoryReferences.push("Article 5.1.a - Subliminal Manipulation Ban");
  }
  if (input.isSocialScoring) {
    prohibitedReasons.push(
      "Social scoring systems based on personal behavior or characteristics (Article 5.1.b)"
    );
    regulatoryReferences.push("Article 5.1.b - Social Scoring Ban");
  }
  if (input.isUntargetedFacialScraping) {
    prohibitedReasons.push(
      "Real-time untargeted facial recognition in government-controlled spaces (Article 5.1.d)"
    );
    regulatoryReferences.push("Article 5.1.d - Facial Scraping Ban");
  }

  if (prohibitedReasons.length > 0) {
    complianceRequirements.push(
      "IMMEDIATE COMPLIANCE: Discontinue use within 6 months per transition rules"
    );
    complianceRequirements.push(
      "Document all past deployments and affected individuals for breach notification"
    );
    auditDocumentation.push(
      "Date of discovery of prohibited practice"
    );
    auditDocumentation.push(
      "Affected user/data subject count"
    );
    auditDocumentation.push(
      "Mitigation steps taken and timeline"
    );

    return {
      riskLevel: "Unacceptable",
      reasons: prohibitedReasons,
      complianceRequirements,
      regulatoryReferences,
      auditDocumentation,
    };
  }

  // ===== ANNEX III HIGH-RISK SYSTEMS =====
  if (input.isCriticalInfrastructure) {
    highReasons.push(
      "AI for critical infrastructure (Annex III.2.a) - electricity, gas, water, transport"
    );
    annex3Matches.push("Annex III Part II.2.a - Critical Infrastructure");
    complianceRequirements.push(
      "Risk management system per Article 9 (documented, updated, proportionate)"
    );
    complianceRequirements.push(
      "Technical documentation including training data composition"
    );
    complianceRequirements.push(
      "Bias monitoring and mitigation strategy (Article 10)"
    );
    auditDocumentation.push("System architecture and data flow diagram");
    auditDocumentation.push("Training data provenance and version control");
    auditDocumentation.push("Bias testing protocols and results");
  }

  if (input.isEducationOrVocationalScoring) {
    highReasons.push(
      "AI for education access, grading, or vocational assessment (Annex III.2.c)"
    );
    annex3Matches.push("Annex III Part II.2.c - Education & Vocational Training");
    complianceRequirements.push(
      "Transparency to students/parents on AI-based decisions (Article 13)"
    );
    complianceRequirements.push(
      "Human oversight mechanism for consequential decisions (Article 14)"
    );
    auditDocumentation.push("Student/parental notification templates");
    auditDocumentation.push("Override/appeal process documentation");
  }

  if (input.isEmploymentOrWorkerManagement) {
    highReasons.push(
      "AI for employment decisions or worker management (Annex III.3.b)"
    );
    annex3Matches.push(
      "Annex III Part III.3.b - Employment & Worker Management"
    );
    complianceRequirements.push(
      "Inform workers of monitoring/evaluation per Article 13"
    );
    complianceRequirements.push(
      "Right to human review of adverse decisions (Article 14)"
    );
    complianceRequirements.push(
      "Comply with EU labor law (GDPR, ePrivacy, work-life balance)"
    );
    auditDocumentation.push("Employee notification policy");
    auditDocumentation.push("Worker manual review procedures");
    auditDocumentation.push("Labor law compliance audit trail");
  }

  if (input.isEssentialPublicServicesEligibility) {
    highReasons.push(
      "AI determining eligibility for essential services (Annex III.3.c)"
    );
    annex3Matches.push("Annex III Part III.3.c - Essential Services Access");
    complianceRequirements.push(
      "Inform citizens of AI use in benefit/service determinations"
    );
    complianceRequirements.push(
      "Accessible appeal process (Article 14)"
    );
    auditDocumentation.push("Public-facing disclosure statements");
    auditDocumentation.push("Appeal handling metrics and timelines");
  }

  if (input.isLawEnforcementUse) {
    highReasons.push(
      "AI used in law enforcement decisions (Annex III.4.a - identification; 4.c - criminal risk assessment)"
    );
    annex3Matches.push("Annex III Part IV - Law Enforcement");
    complianceRequirements.push(
      "Strict accuracy thresholds and false positive testing (Article 10.3)"
    );
    complianceRequirements.push(
      "Legal basis under Art. 6 GDPR (plus law enforcement derogations)"
    );
    complianceRequirements.push(
      "Log all uses of system for audit by enforcement authority"
    );
    auditDocumentation.push("Accuracy validation reports");
    auditDocumentation.push("False positive/negative rates");
    auditDocumentation.push("System access and usage logs");
  }

  if (input.isMigrationAsylumBorderControl) {
    highReasons.push(
      "AI in migration, asylum, or border control (Annex III.5.b)"
    );
    annex3Matches.push("Annex III Part V.5.b - Migration & Border");
    complianceRequirements.push(
      "Respect fundamental rights in asylum process (Article 18)"
    );
    complianceRequirements.push(
      "Inform applicants of AI use affecting their case"
    );
    auditDocumentation.push("Asylum applicant AI impact notice");
    auditDocumentation.push("Human review decision logs");
  }

  if (input.isJusticeOrDemocraticProcess) {
    highReasons.push(
      "AI supporting judicial decisions or democratic participation (Annex III.5.c)"
    );
    annex3Matches.push("Annex III Part V.5.c - Justice & Democratic Process");
    complianceRequirements.push(
      "Maintain human-centered decision-making in courts (Article 14)"
    );
    complianceRequirements.push(
      "Publish guidelines on AI use in judicial processes"
    );
    auditDocumentation.push("Judicial override documentation");
    auditDocumentation.push("System guidelines and training for court staff");
  }

  if (highReasons.length > 0) {
    regulatoryReferences.push("Chapter III - Prohibited & High-Risk Systems");
    regulatoryReferences.push("Article 6 - Conformity Assessment Procedure");
    regulatoryReferences.push(
      "Article 11 - Post-market Monitoring (ongoing surveillance)"
    );
    complianceRequirements.push(
      "Register system in EU NASS (AI Notification & Surveillance System) before deployment"
    );
    complianceRequirements.push(
      "Maintain CE mark and EU Declaration of Conformity"
    );
    complianceRequirements.push(
      "Establish independent notified body or in-house technical file"
    );
    auditDocumentation.push("EU Declaration of Conformity");
    auditDocumentation.push("CE mark documentation");
    auditDocumentation.push("NASS registration confirmation");

    return {
      riskLevel: "High",
      reasons: highReasons,
      complianceRequirements,
      regulatoryReferences: [
        ...new Set(regulatoryReferences),
      ],
      auditDocumentation,
    };
  }

  // ===== LIMITED RISK (Transparency required) =====
  if (input.hasEmotionRecognitionOrDeepfakeDisclosureNeed) {
    complianceRequirements.push(
      "Disclose AI use to citizens/users per Article 13"
    );
    complianceRequirements.push(
      "Document purpose and data use in privacy notice"
    );
    regulatoryReferences.push(
      "Article 13 - Transparency Requirements for Limited-Risk Systems"
    );
    auditDocumentation.push("User-facing disclosure notice");
    auditDocumentation.push("Privacy impact assessment (DPIA)");

    return {
      riskLevel: "Limited",
      reasons: [
        "Emotion recognition or synthetic media detection system (requires transparency per Article 13)",
      ],
      complianceRequirements,
      regulatoryReferences,
      auditDocumentation,
    };
  }

  // ===== MINIMAL RISK =====
  regulatoryReferences.push(
    "Article 69 - General-purpose AI compliance recommended (best practice)"
  );

  return {
    riskLevel: "Minimal",
    reasons: [
      "No prohibited practices or Annex III high-risk use case detected",
    ],
    complianceRequirements: [
      "No mandatory compliance, but recommend transparency (Article 13 best practice)",
      "Monitor for regulatory changes in your jurisdiction",
    ],
    regulatoryReferences,
    auditDocumentation: ["System description and intended use"],
  };
}
