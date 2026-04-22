export type AdmtInput = {
  necessity: number;
  transparency: number;
  intrusiveness: number;
  safeguards: number;
  workerImpact: number;
};

export type AdmtResult = {
  proportionalityScore: number;
  riskBand: "low" | "medium" | "high";
  assessmentSummary: string;
  recommendations: string[];
};

export function scoreAdmtProportionality(input: AdmtInput): AdmtResult {
  const { necessity, transparency, intrusiveness, safeguards, workerImpact } = input;

  const weights = {
    necessity: 0.25,
    transparency: 0.2,
    intrusiveness: 0.2,
    safeguards: 0.2,
    workerImpact: 0.15,
  };

  const normalizedScores = {
    necessity: Math.min(necessity / 10, 1.0),
    transparency: Math.min(transparency / 10, 1.0),
    intrusiveness: 1.0 - Math.min(intrusiveness / 10, 1.0),
    safeguards: Math.min(safeguards / 10, 1.0),
    workerImpact: 1.0 - Math.min(workerImpact / 10, 1.0),
  };

  const proportionalityScore = Math.round(
    (normalizedScores.necessity * weights.necessity +
      normalizedScores.transparency * weights.transparency +
      normalizedScores.intrusiveness * weights.intrusiveness +
      normalizedScores.safeguards * weights.safeguards +
      normalizedScores.workerImpact * weights.workerImpact) *
      100
  );

  let riskBand: "low" | "medium" | "high" = "high";
  let assessmentSummary = "";

  if (proportionalityScore >= 70) {
    riskBand = "low";
    assessmentSummary = "Proportional use case: strong legal defensibility if contested.";
  } else if (proportionalityScore >= 50) {
    riskBand = "medium";
    assessmentSummary = "Mixed proportionality: some factors support use, others raise concerns.";
  } else {
    riskBand = "high";
    assessmentSummary = "Low proportionality: significant legal and ethical risks without further mitigation.";
  }

  const recommendations: string[] = [];
  if (necessity < 5) {
    recommendations.push("Strengthen business justification and frequency limits.");
  }
  if (transparency < 5) {
    recommendations.push("Improve worker disclosure and consent mechanisms.");
  }
  if (intrusiveness > 5) {
    recommendations.push("Consider less invasive monitoring alternatives.");
  }
  if (safeguards < 5) {
    recommendations.push("Add data minimization, retention limits, and access controls.");
  }
  if (workerImpact > 5) {
    recommendations.push("Consult labor law and worker representatives on impact mitigation.");
  }

  return {
    proportionalityScore,
    riskBand,
    assessmentSummary,
    recommendations,
  };
}
