export type Soc2Control =
  | "access-controls"
  | "change-management"
  | "encryption"
  | "monitoring"
  | "incident-response"
  | "vendor-management";

export type Soc2Category = "security" | "availability" | "confidentiality" | "integrity" | "privacy";

export type Soc2Input = {
  implementedControls: Soc2Control[];
  categories: Soc2Category[];
};

export type Soc2Result = {
  overallReadiness: number;
  byCategory: Record<Soc2Category, { percentage: number; gaps: string[] }>;
  priorityGaps: string[];
  estimatedTimelineMonths: number;
};

const CATEGORY_CONTROLS: Record<Soc2Category, Soc2Control[]> = {
  security: ["access-controls", "encryption", "monitoring"],
  availability: ["change-management", "monitoring", "incident-response"],
  confidentiality: ["encryption", "access-controls", "monitoring"],
  integrity: ["change-management", "monitoring", "vendor-management"],
  privacy: ["access-controls", "encryption", "incident-response", "monitoring"],
};

const CONTROL_TIMELINE: Record<Soc2Control, number> = {
  "access-controls": 3,
  encryption: 2,
  monitoring: 1,
  "change-management": 2,
  "incident-response": 4,
  "vendor-management": 3,
};

export function calculateSoc2Readiness(input: Soc2Input): Soc2Result {
  const selectedCategories = new Set(input.categories);
  const implementedSet = new Set(input.implementedControls);

  const categoryResults: Record<Soc2Category, { percentage: number; gaps: string[] }> = {
    security: { percentage: 0, gaps: [] },
    availability: { percentage: 0, gaps: [] },
    confidentiality: { percentage: 0, gaps: [] },
    integrity: { percentage: 0, gaps: [] },
    privacy: { percentage: 0, gaps: [] },
  };

  let totalReadiness = 0;
  let categoryCount = 0;
  const allGaps: Set<string> = new Set();
  let maxTimelineMonths = 0;

  selectedCategories.forEach((category) => {
    const requiredControls = CATEGORY_CONTROLS[category];
    const implementedCount = requiredControls.filter((c) => implementedSet.has(c)).length;
    const percentage = Math.round((implementedCount / requiredControls.length) * 100);

    const gaps = requiredControls.filter((c) => !implementedSet.has(c));
    gaps.forEach((gap) => {
      allGaps.add(gap);
      maxTimelineMonths = Math.max(maxTimelineMonths, CONTROL_TIMELINE[gap]);
    });

    categoryResults[category] = { percentage, gaps };
    totalReadiness += percentage;
    categoryCount++;
  });

  const overallReadiness = categoryCount > 0 ? Math.round(totalReadiness / categoryCount) : 0;
  const priorityGaps = Array.from(allGaps).map(
    (gap) => `${gap.replace(/-/g, " ")} (~${CONTROL_TIMELINE[gap as Soc2Control]} months)`
  );

  return {
    overallReadiness,
    byCategory: categoryResults,
    priorityGaps,
    estimatedTimelineMonths: maxTimelineMonths + 6,
  };
}
