export type NistFips203Input = {
  assetCount: number;
  teamSize: number;
  criticalityMultiplier: number;
};

export type NistFips203Phase = {
  phase: string;
  durationMonths: number;
  keyActivities: string[];
};

export type NistFips203Result = {
  totalDurationMonths: number;
  phases: NistFips203Phase[];
};

export function planNistFips203Migration(input: NistFips203Input): NistFips203Result {
  const { assetCount, teamSize, criticalityMultiplier } = input;

  const baseVersionDuration = Math.ceil((assetCount / teamSize) * 0.5) + 2;
  const discoveryDuration = Math.max(1, Math.ceil(baseVersionDuration * criticalityMultiplier));
  const designDuration = Math.max(2, Math.ceil((baseVersionDuration * 0.8) * criticalityMultiplier));
  const implementDuration = Math.max(3, Math.ceil((baseVersionDuration * 1.2) * criticalityMultiplier));
  const testDuration = Math.max(2, Math.ceil((baseVersionDuration * 0.6) * criticalityMultiplier));
  const dualRunDuration = 3;
  const cutoverDuration = 1;

  const phases: NistFips203Phase[] = [
    {
      phase: "Assessment & Discovery",
      durationMonths: discoveryDuration,
      keyActivities: [
        "Inventory cryptographic assets and dependencies",
        "Identify FIPS 140-2 vs FIPS 203 migration candidates",
        "Assess readiness gaps",
      ],
    },
    {
      phase: "Design & Planning",
      durationMonths: designDuration,
      keyActivities: [
        "Select FIPS 203 algorithms (Kyber, Dilithium, etc.)",
        "Design integration architecture",
        "Plan data migration strategies",
      ],
    },
    {
      phase: "Implementation & Development",
      durationMonths: implementDuration,
      keyActivities: [
        "Integrate PQC libraries",
        "Refactor key management",
        "Update critical system binaries",
      ],
    },
    {
      phase: "Testing & Validation",
      durationMonths: testDuration,
      keyActivities: [
        "Unit and integration testing",
        "Interoperability testing with vendor systems",
        "Security and performance audits",
      ],
    },
    {
      phase: "Dual-Run (Legacy + PQC)",
      durationMonths: dualRunDuration,
      keyActivities: ["Parallel operation", "Monitor performance and incidents", "Gradual traffic ramp"],
    },
    {
      phase: "Cutover & Decommission",
      durationMonths: cutoverDuration,
      keyActivities: ["Final validation", "Legacy system decommission", "Maintain PQC fallback"],
    },
  ];

  const totalDuration = phases.reduce((sum, p) => sum + p.durationMonths, 0);

  return {
    totalDurationMonths: totalDuration,
    phases,
  };
}
