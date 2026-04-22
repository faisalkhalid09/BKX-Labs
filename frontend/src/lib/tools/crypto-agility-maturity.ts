export type CryptoAgilityInput = {
  inventoryScore: number;
  abstractionScore: number;
  kmsScore: number;
  testingScore: number;
  governanceScore: number;
};

export type CryptoAgilityResult = {
  overallMaturityLevel: 1 | 2 | 3 | 4 | 5;
  overallScore: number;
  byDomain: Record<string, { score: number; level: 1 | 2 | 3 | 4 | 5 }>;
  recommendations: string[];
};

export function scoreCryptoAgilityMaturity(input: CryptoAgilityInput): CryptoAgilityResult {
  const domains: Record<
    string,
    { score: number; weights: number; level: 1 | 2 | 3 | 4 | 5 }
  > = {
    Inventory: {
      score: input.inventoryScore,
      weights: 0.2,
      level: Math.ceil((input.inventoryScore / 100) * 5) as 1 | 2 | 3 | 4 | 5,
    },
    "Abstraction & Agility": {
      score: input.abstractionScore,
      weights: 0.2,
      level: Math.ceil((input.abstractionScore / 100) * 5) as 1 | 2 | 3 | 4 | 5,
    },
    "Key Management": {
      score: input.kmsScore,
      weights: 0.25,
      level: Math.ceil((input.kmsScore / 100) * 5) as 1 | 2 | 3 | 4 | 5,
    },
    Testing: {
      score: input.testingScore,
      weights: 0.15,
      level: Math.ceil((input.testingScore / 100) * 5) as 1 | 2 | 3 | 4 | 5,
    },
    Governance: {
      score: input.governanceScore,
      weights: 0.2,
      level: Math.ceil((input.governanceScore / 100) * 5) as 1 | 2 | 3 | 4 | 5,
    },
  };

  const weightedScore =
    input.inventoryScore * 0.2 +
    input.abstractionScore * 0.2 +
    input.kmsScore * 0.25 +
    input.testingScore * 0.15 +
    input.governanceScore * 0.2;

  const overallMaturityLevel = Math.ceil((weightedScore / 100) * 5) as 1 | 2 | 3 | 4 | 5;
  const recommendations: string[] = [];

  if (input.inventoryScore < 50) {
    recommendations.push(
      "Improve inventory visibility: document all cryptographic assets and their lifecycle status."
    );
  }

  if (input.abstractionScore < 50) {
    recommendations.push(
      "Increase abstraction: decouple algorithm selection from application code (use provider abstraction layers)."
    );
  }

  if (input.kmsScore < 60) {
    recommendations.push("Strengthen key management: implement centralized KMS with cryptographic agility support.");
  }

  if (input.testingScore < 50) {
    recommendations.push(
      "Expand testing: include algorithm swap drills and hybrid-encryption interoperability tests."
    );
  }

  if (input.governanceScore < 50) {
    recommendations.push(
      "Establish governance: define crypto policies, deprecation timelines, and upgrade procedures."
    );
  }

  if (overallMaturityLevel === 1) {
    recommendations.push("URGENT: Crypto-agility foundation is weak. Prioritize inventory and governance initiatives.");
  } else if (overallMaturityLevel === 5) {
    recommendations.push("Excellent maturity. Maintain testing discipline and monitor regulatory changes.");
  }

  return {
    overallMaturityLevel,
    overallScore: Math.round(weightedScore),
    byDomain: Object.fromEntries(
      Object.entries(domains).map(([domain, data]) => [domain, { score: data.score, level: data.level }])
    ),
    recommendations,
  };
}
