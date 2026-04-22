// SOC 2 Readiness Logic — 2026 Continuous Monitoring Model
// Weights CC9.2 and CC6.1 at 25% of total score (top 2026 audit failure points)

export type EvidenceMode = "automated" | "manual";

export type ControlEntry = {
  id: string;
  implemented: boolean;
  evidenceMode: EvidenceMode;
};

export type TSCCategory = "security" | "availability" | "confidentiality" | "integrity" | "privacy";

export type ControlDef = {
  id: string;
  label: string;
  ccRef: string;
  category: TSCCategory;
  baseWeight: number; // Base points (before automation multiplier)
  isHighWeight: boolean; // CC9.2 / CC6.1 special weighting
};

// ── Control Definitions (CC Series) ──────────────────────────────────────────
// Total base weight across all controls = 120 (before multipliers)
// CC9.2 + CC6.1 together = 30 raw points = 25% of weighted total

export const CONTROL_DEFS: ControlDef[] = [
  // Security (Common Criteria — Mandatory)
  { id: "cc1_1", label: "CC1.1 — COSO Principle: Commitment to Integrity", ccRef: "CC1.1", category: "security", baseWeight: 4, isHighWeight: false },
  { id: "cc2_1", label: "CC2.1 — Internal Communication of Control Objectives", ccRef: "CC2.1", category: "security", baseWeight: 4, isHighWeight: false },
  { id: "cc3_2", label: "CC3.2 — Risk Identification & Assessment Process", ccRef: "CC3.2", category: "security", baseWeight: 6, isHighWeight: false },
  { id: "cc4_1", label: "CC4.1 — Monitoring Control Performance", ccRef: "CC4.1", category: "security", baseWeight: 6, isHighWeight: false },
  { id: "cc5_2", label: "CC5.2 — Technology Change Management Process", ccRef: "CC5.2", category: "security", baseWeight: 6, isHighWeight: false },
  { id: "cc6_1", label: "CC6.1 — Access Deprovisioning (Offboarding)", ccRef: "CC6.1", category: "security", baseWeight: 15, isHighWeight: true },
  { id: "cc6_6", label: "CC6.6 — External Access Controls (MFA, VPN)", ccRef: "CC6.6", category: "security", baseWeight: 6, isHighWeight: false },
  { id: "cc6_7", label: "CC6.7 — Transmission Encryption (TLS 1.2+)", ccRef: "CC6.7", category: "security", baseWeight: 6, isHighWeight: false },
  { id: "cc7_2", label: "CC7.2 — Security Event Monitoring (SIEM)", ccRef: "CC7.2", category: "security", baseWeight: 8, isHighWeight: false },
  { id: "cc7_3", label: "CC7.3 — Incident Response Plan & Testing", ccRef: "CC7.3", category: "security", baseWeight: 6, isHighWeight: false },
  { id: "cc8_1", label: "CC8.1 — Change Management Authorization", ccRef: "CC8.1", category: "security", baseWeight: 6, isHighWeight: false },
  { id: "cc9_2", label: "CC9.2 — Vendor & Supply Chain Risk Management", ccRef: "CC9.2", category: "security", baseWeight: 15, isHighWeight: true },

  // Availability
  { id: "a1_1", label: "A1.1 — System Availability SLA Definition", ccRef: "A1.1", category: "availability", baseWeight: 5, isHighWeight: false },
  { id: "a1_2", label: "A1.2 — Backup & Recovery Testing", ccRef: "A1.2", category: "availability", baseWeight: 5, isHighWeight: false },
  { id: "a1_3", label: "A1.3 — Capacity Monitoring & Alerting", ccRef: "A1.3", category: "availability", baseWeight: 4, isHighWeight: false },

  // Confidentiality
  { id: "c1_1", label: "C1.1 — Data Classification Policy", ccRef: "C1.1", category: "confidentiality", baseWeight: 5, isHighWeight: false },
  { id: "c1_2", label: "C1.2 — Encryption at Rest for Sensitive Data", ccRef: "C1.2", category: "confidentiality", baseWeight: 5, isHighWeight: false },

  // Processing Integrity
  { id: "pi1_1", label: "PI1.1 — Input Validation & Data Quality Controls", ccRef: "PI1.1", category: "integrity", baseWeight: 5, isHighWeight: false },
  { id: "pi1_2", label: "PI1.2 — Error Detection & Correction Procedures", ccRef: "PI1.2", category: "integrity", baseWeight: 5, isHighWeight: false },

  // Privacy
  { id: "p1_1", label: "P1.1 — Privacy Notice & Consent Mechanism", ccRef: "P1.1", category: "privacy", baseWeight: 5, isHighWeight: false },
  { id: "p4_3", label: "P4.3 — Data Retention & Deletion Policy", ccRef: "P4.3", category: "privacy", baseWeight: 5, isHighWeight: false },
];

export type ControlResult = {
  controlDef: ControlDef;
  implemented: boolean;
  evidenceMode: EvidenceMode;
  earnedPoints: number;
  maxPoints: number;
  isGap: boolean;
  auditOverhead: boolean; // manual = high overhead warning
};

export type CategoryResult = {
  category: TSCCategory;
  readiness: number; // 0-100
  controls: ControlResult[];
};

export type Soc2Result = {
  overallReadiness: number; // 0-100
  automationScore: number; // 0-100 (what % of implemented controls are automated)
  totalGaps: number;
  criticalGaps: string[]; // high-weight gaps
  estimatedTimelineMonths: number;
  byCategory: Record<TSCCategory, CategoryResult>;
  allControls: ControlResult[];
};

const AUTOMATION_MULTIPLIER = 1.5;

export function calculateSoc2Readiness(
  entries: Map<string, ControlEntry>,
  selectedCategories: Set<TSCCategory>
): Soc2Result {
  // Filter to relevant controls
  const activeControls = CONTROL_DEFS.filter(
    (c) => c.category === "security" || selectedCategories.has(c.category)
  );

  let totalMax = 0;
  let totalEarned = 0;
  let automatedImplemented = 0;
  let totalImplemented = 0;
  const criticalGaps: string[] = [];

  const allControls: ControlResult[] = activeControls.map((def) => {
    const entry = entries.get(def.id);
    const implemented = entry?.implemented ?? false;
    const evidenceMode: EvidenceMode = entry?.evidenceMode ?? "manual";

    // Max possible = base weight * automation multiplier
    const maxPoints = def.baseWeight * AUTOMATION_MULTIPLIER;
    let earnedPoints = 0;

    if (implemented) {
      totalImplemented++;
      if (evidenceMode === "automated") {
        earnedPoints = def.baseWeight * AUTOMATION_MULTIPLIER;
        automatedImplemented++;
      } else {
        earnedPoints = def.baseWeight; // Manual: no multiplier
      }
    }

    totalMax += maxPoints;
    totalEarned += earnedPoints;

    const isGap = !implemented;
    if (isGap && def.isHighWeight) {
      criticalGaps.push(`${def.ccRef} — ${def.label.split("—")[1].trim()}`);
    }

    return {
      controlDef: def,
      implemented,
      evidenceMode,
      earnedPoints,
      maxPoints,
      isGap,
      auditOverhead: implemented && evidenceMode === "manual",
    };
  });

  const overallReadiness = totalMax > 0 ? Math.round((totalEarned / totalMax) * 100) : 0;
  const automationScore = totalImplemented > 0 ? Math.round((automatedImplemented / totalImplemented) * 100) : 0;
  const totalGaps = allControls.filter((c) => c.isGap).length;

  // Estimate timeline: more gaps + less automation = longer timeline
  const baseMonths = Math.ceil(totalGaps * 0.8);
  const automationCredit = Math.round(automationScore * 0.03); // up to ~3 months saved
  const estimatedTimelineMonths = Math.max(3, baseMonths - automationCredit);

  // Build per-category breakdowns
  const byCategory = {} as Record<TSCCategory, CategoryResult>;
  const allCategories: TSCCategory[] = ["security", "availability", "confidentiality", "integrity", "privacy"];

  for (const cat of allCategories) {
    const catControls = allControls.filter((c) => c.controlDef.category === cat);
    const catMax = catControls.reduce((s, c) => s + c.maxPoints, 0);
    const catEarned = catControls.reduce((s, c) => s + c.earnedPoints, 0);
    byCategory[cat] = {
      category: cat,
      readiness: catMax > 0 ? Math.round((catEarned / catMax) * 100) : 0,
      controls: catControls,
    };
  }

  return {
    overallReadiness,
    automationScore,
    totalGaps,
    criticalGaps,
    estimatedTimelineMonths,
    byCategory,
    allControls,
  };
}

// ── CSV Gap Report Export ─────────────────────────────────────────────────────
export function generateGapReportCSV(result: Soc2Result): string {
  const header = "CC Reference,Control Label,Category,Status,Evidence Mode,Earned Points,Max Points,Audit Overhead,Priority\n";
  const rows = result.allControls.map((c) => {
    const priority = c.controlDef.isHighWeight ? "CRITICAL" : c.isGap ? "HIGH" : "OK";
    return [
      c.controlDef.ccRef,
      `"${c.controlDef.label}"`,
      c.controlDef.category,
      c.isGap ? "GAP" : "Implemented",
      c.evidenceMode,
      c.earnedPoints.toFixed(1),
      c.maxPoints.toFixed(1),
      c.auditOverhead ? "WARNING: High Overhead" : "OK",
      priority,
    ].join(",");
  });
  return header + rows.join("\n");
}
