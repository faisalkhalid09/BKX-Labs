import type { RiskLevel } from "@/lib/tools/types";

export type EuAiActInput = {
  prohibitedType: "social_scoring" | "emotion_workplace" | "facial_scraping" | "subliminal" | "none";
  annexIIISector: "biometrics" | "critical_infra" | "education" | "employment" | "essential_services" | "law_enforcement" | "migration" | "justice" | "none";
  isProfiling: boolean; // Precludes Article 6.3
  derogationCategory: "none" | "narrow_procedural" | "improving_human_activity" | "detecting_patterns" | "purely_preparatory"; // Article 6.3 exceptions
  isGPAISystemicRisk: boolean; // >10^25 FLOPs
  hasTransparencyNeed: boolean; // General emotion AI or deepfakes
};

export type EuAiActResult = {
  riskLevel: RiskLevel;
  reasons: string[];
  complianceSnapshot: string[];
  complianceRequirements: string[];
  regulatoryReferences: string[];
  auditDocumentation: string[];
};

export function classifyEuAiActRisk(input: EuAiActInput): EuAiActResult {
  const complianceSnapshot: string[] = [];
  const complianceRequirements: string[] = [];
  const regulatoryReferences: string[] = [];
  const auditDocumentation: string[] = [];
  const reasons: string[] = [];

  // ===== STEP 1: PROHIBITED PRACTICES (Article 5) =====
  if (input.prohibitedType !== "none") {
    let prohibitedName = "";
    if (input.prohibitedType === "social_scoring") prohibitedName = "Social scoring by behavior or personal traits";
    else if (input.prohibitedType === "emotion_workplace") prohibitedName = "Emotion recognition in workplace or education";
    else if (input.prohibitedType === "facial_scraping") prohibitedName = "Untargeted facial scraping";
    else if (input.prohibitedType === "subliminal") prohibitedName = "Subliminal manipulation causing harm";

    reasons.push(prohibitedName);
    complianceSnapshot.push(`[RED ALERT] System is classified as Unacceptable Risk due to Article 5 Prohibited Practices.`);
    complianceSnapshot.push(`Immediate action required: The deployment of ${prohibitedName} is strictly illegal and must cease.`);
    complianceRequirements.push("Cease deployment and decommission system immediately.");
    regulatoryReferences.push("Article 5 - Prohibited AI Practices");
    auditDocumentation.push("Decommission timeline and user impact analysis");

    return {
      riskLevel: "Unacceptable",
      reasons,
      complianceSnapshot,
      complianceRequirements,
      regulatoryReferences,
      auditDocumentation,
    };
  }

  // ===== STEP 2: GPAI SYSTEMIC RISK =====
  // General-purpose AI models trained with >10^25 FLOPs or notified by the Commission
  if (input.isGPAISystemicRisk) {
    reasons.push("General-Purpose AI Model with Systemic Risk (>10^25 FLOPs)");
    complianceSnapshot.push("[SYSTEMIC RISK] Classified as GPAI with systemic risk obligations.");
    complianceRequirements.push("Perform state-of-the-art model evaluation and adversarial testing.");
    complianceRequirements.push("Report serious incidents to the AI Office without delay.");
    complianceRequirements.push("Ensure strict cybersecurity protections for model weights.");
    regulatoryReferences.push("Article 51 - Classification of GPAI models with systemic risk");
    auditDocumentation.push("Adversarial testing results (Red Teaming)");
    auditDocumentation.push("Energy consumption metrics");
    // GPAI models don't fit perfectly into the 4 tier system but are heavily regulated. We assign 'High' for severity.
    return {
      riskLevel: "High",
      reasons,
      complianceSnapshot,
      complianceRequirements,
      regulatoryReferences,
      auditDocumentation,
    };
  }

  // ===== STEP 3: ANNEX III HIGH-RISK SYSTEMS =====
  if (input.annexIIISector !== "none") {
    if (!input.isProfiling && input.derogationCategory !== "none") {
      // Article 6.3 Derogation allows bypassing High-Risk requirements
      let derogationText = "";
      if (input.derogationCategory === "narrow_procedural") derogationText = "Narrow procedural task";
      else if (input.derogationCategory === "improving_human_activity") derogationText = "Improving result of a previously completed human activity";
      else if (input.derogationCategory === "detecting_patterns") derogationText = "Detecting patterns/deviations without replacing human assessment";
      else if (input.derogationCategory === "purely_preparatory") derogationText = "Purely preparatory task";

      reasons.push(`System applied in ${input.annexIIISector} sector, but exempted via Article 6.3 Derogation (${derogationText}).`);
      complianceSnapshot.push(`[MINIMAL RISK] System downgraded from Annex III High-Risk under Article 6.3.`);
      complianceSnapshot.push("Provider must document this assessment before market entry per Article 6(4).");
      complianceRequirements.push("Document the justification for the Article 6.3 derogation before placing on the market.");
      complianceRequirements.push("Register the derogation in the EU NASS database.");
      regulatoryReferences.push("Article 6.3 - Classification rules for high-risk AI systems");
      regulatoryReferences.push("Article 6.4 - Documentation requirements for derogations");
      auditDocumentation.push("Documented assessment proving the AI system meets derogation criteria per Article 6(4)");
      
      return {
        riskLevel: "Minimal", 
        reasons,
        complianceSnapshot,
        complianceRequirements,
        regulatoryReferences,
        auditDocumentation,
      };
    } else {
      reasons.push(`Annex III High-Risk Designation: ${input.annexIIISector}${input.isProfiling ? " (Profiling Detected - Derogation Impossible)" : ""}`);
      complianceSnapshot.push(`[HIGH RISK] Sector: ${input.annexIIISector}. Strict compliance mandated by August 2026.`);
      if (input.isProfiling) {
        complianceSnapshot.push("CRITICAL: The system performs Profiling of natural persons. Article 6.3 derogation is legally impossible.");
      }
      complianceSnapshot.push("Requires full Quality Management System (QMS), continuous post-market monitoring, and human-in-the-loop oversight.");
      
      complianceRequirements.push("Establish and implement a continuous Risk Management System (Article 9).");
      complianceRequirements.push("Draw up Technical Documentation per Annex IV before market placement.");
      complianceRequirements.push("Design system to enable effective human oversight (Article 14).");
      complianceRequirements.push("Establish Post-Market Monitoring plans (Article 72).");
      
      regulatoryReferences.push("Article 6 - Conformity Assessment Procedure");
      regulatoryReferences.push("Annex III - High-Risk AI Systems");
      regulatoryReferences.push("Article 11 - Post-market Monitoring");
      
      auditDocumentation.push("EU Declaration of Conformity and CE Marking");
      auditDocumentation.push("Technical File (datasets, architecture, risk logs)");
      auditDocumentation.push("NASS Registration Confirmation (Article 71)");

      return {
        riskLevel: "High",
        reasons,
        complianceSnapshot,
        complianceRequirements,
        regulatoryReferences,
        auditDocumentation,
      };
    }
  }

  // ===== STEP 4: LIMITED / MINIMAL RISK =====
  if (input.hasTransparencyNeed) {
    reasons.push("AI system requires transparency disclosures (e.g., Deepfakes, AI chatbots)");
    complianceSnapshot.push("[LIMITED RISK] Requires end-user transparency per Article 13.");
    complianceRequirements.push("Clearly inform users they are interacting with an AI system.");
    complianceRequirements.push("Mark synthetic audiovisual content (deepfakes) explicitly in a machine-readable format.");
    regulatoryReferences.push("Article 50 - Transparency obligations for certain AI systems");
    auditDocumentation.push("Copy of user disclosure text or watermark implementation");

    return {
      riskLevel: "Limited",
      reasons,
      complianceSnapshot,
      complianceRequirements,
      regulatoryReferences,
      auditDocumentation,
    };
  }

  // Default Minimal Risk
  reasons.push("No Annex III, GPAI, or transparency triggers detected.");
  complianceSnapshot.push("[MINIMAL RISK] System does not fall under mandatory regulatory burden.");
  complianceSnapshot.push("Voluntary adherence to codes of conduct (Article 69) is recommended to future-proof the application.");
  complianceRequirements.push("No mandatory compliance; transparency best practices suggested.");
  regulatoryReferences.push("Article 69 - General-purpose AI compliance recommended (best practice)");
  auditDocumentation.push("Baseline system description outlining intended use");

  return {
    riskLevel: "Minimal",
    reasons,
    complianceSnapshot,
    complianceRequirements,
    regulatoryReferences,
    auditDocumentation,
  };
}
