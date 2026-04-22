export type PromptyPrivacyInput = {
  promptText: string;
};

export type PiiSignal = {
  type: string;
  confidence: number;
  examples: string[];
};

export type PromptPrivacyResult = {
  riskScore: number;
  riskLevel: "low" | "medium" | "high" | "critical";
  detectedSignals: PiiSignal[];
  recommendations: string[];
};

const PII_PATTERNS: Record<string, { regex: RegExp; weight: number }> = {
  email: { regex: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, weight: 0.8 },
  phone: { regex: /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/g, weight: 0.7 },
  ssn: { regex: /\b\d{3}-\d{2}-\d{4}\b/g, weight: 1.0 },
  creditcard: { regex: /\b\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}\b/g, weight: 0.9 },
  apikey: { regex: /(api[_-]?key|token|secret|password)\s*[:=]\s*['\"]?([a-zA-Z0-9_-]{20,})/gi, weight: 0.95 },
  ipaddress: { regex: /\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/g, weight: 0.6 },
};

export function auditPromptPrivacy(input: PromptyPrivacyInput): PromptPrivacyResult {
  const text = input.promptText;
  const signals: PiiSignal[] = [];
  let maxRisk = 0;

  Object.entries(PII_PATTERNS).forEach(([type, { regex, weight }]) => {
    const matches = text.match(regex);
    if (matches && matches.length > 0) {
      const confidence = Math.min(weight, 1.0);
      maxRisk = Math.max(maxRisk, confidence);

      signals.push({
        type,
        confidence,
        examples: matches.slice(0, 2),
      });
    }
  });

  const riskScore = Math.round(maxRisk * 100);
  let riskLevel: "low" | "medium" | "high" | "critical" = "low";
  if (riskScore >= 80) riskLevel = "critical";
  else if (riskScore >= 60) riskLevel = "high";
  else if (riskScore >= 30) riskLevel = "medium";

  const recommendations: string[] = [];
  if (signals.some((s) => s.type === "apikey")) {
    recommendations.push("URGENT: API keys or secrets detected. Rotate credentials immediately.");
  }
  if (signals.some((s) => s.type === "ssn" || s.type === "creditcard")) {
    recommendations.push("Remove PII (SSN, credit card) before sharing prompts.");
  }
  if (signals.some((s) => s.type === "email" || s.type === "phone")) {
    recommendations.push("Redact personal contact information (email, phone numbers).");
  }
  if (signals.length === 0) {
    recommendations.push("No obvious PII detected, but always review sensitive content.");
  }

  return {
    riskScore,
    riskLevel,
    detectedSignals: signals,
    recommendations,
  };
}
