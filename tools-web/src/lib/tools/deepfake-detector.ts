export type DeepfakeIndicatorInput = {
  hasCodecAnomalies: boolean;
  frameCadenceIrregular: boolean;
  audioVideoDesync: boolean;
  missingMetadata: boolean;
  suspiciousPatterns: boolean;
};

export type DeepfakeResult = {
  probabilityPercent: number;
  confidence: "low" | "medium" | "high";
  indicators: string[];
  disclaimer: string;
};

export function analyzeDeepfakeProbability(input: DeepfakeIndicatorInput): DeepfakeResult {
  let probabilityScore = 20;
  const indicators: string[] = [];

  if (input.hasCodecAnomalies) {
    probabilityScore += 20;
    indicators.push("Codec anomalies detected (unusual compression, color artifacts)");
  }

  if (input.frameCadenceIrregular) {
    probabilityScore += 15;
    indicators.push("Frame rate inconsistencies (typical of AI generation)");
  }

  if (input.audioVideoDesync) {
    probabilityScore += 25;
    indicators.push("Audio-video synchronization issues");
  }

  if (input.missingMetadata) {
    probabilityScore += 10;
    indicators.push("Missing or suspicious metadata (creation date, camera model)");
  }

  if (input.suspiciousPatterns) {
    probabilityScore += 20;
    indicators.push("Unnatural eye contact, blinking, facial symmetry patterns");
  }

  const probabilityPercent = Math.min(probabilityScore, 100);
  let confidence: "low" | "medium" | "high" = "low";
  if (probabilityPercent >= 70) confidence = "high";
  else if (probabilityPercent >= 40) confidence = "medium";

  const disclaimer =
    "This score is probabilistic and NOT a definitive forensic conclusion. Always verify with professional deepfake forensics labs and digital provenance analysis.";

  return {
    probabilityPercent,
    confidence,
    indicators,
    disclaimer,
  };
}
