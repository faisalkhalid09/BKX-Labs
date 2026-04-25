import { useState, useMemo } from "react";
import {
  CONTROL_DEFS,
  calculateSoc2Readiness,
  type TSCCategory,
  type EvidenceMode,
  type ControlEntry,
  type Soc2Result,
} from "@/lib/tools/soc2-readiness";
import { Download, Linkedin, Twitter } from "lucide-react";

const CATEGORY_META: Record<TSCCategory, { label: string; description: string; optional: boolean }> = {
  security:        { label: "Security (CC)",      description: "Common Criteria — mandatory for all SOC 2 reports",     optional: false },
  availability:    { label: "Availability",        description: "Uptime, backup & recovery commitments",                optional: true },
  confidentiality: { label: "Confidentiality",     description: "Data classification, encryption at rest",              optional: true },
  integrity:       { label: "Processing Integrity", description: "Input validation, error detection & correction",      optional: true },
  privacy:         { label: "Privacy",              description: "Consent, data retention & subject rights",            optional: true },
};

const ALL_CATS: TSCCategory[] = ["security", "availability", "confidentiality", "integrity", "privacy"];


function csvEscape(value: string | number | boolean): string {
  const raw = String(value ?? "");
  if (raw.includes(",") || raw.includes("\n") || raw.includes("\"")) {
    return `"${raw.replace(/\"/g, '""')}"`;
  }
  return raw;
}

function downloadCsvFile(csvContent: string, fileName: string) {
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  a.click();
  URL.revokeObjectURL(url);
}

// Radial SVG gauge — site navy palette
function RadialGauge({ value }: { value: number }) {
  const r = 52;
  const circ = 2 * Math.PI * r;
  const offset = circ - (value / 100) * circ;
  const color = value >= 75 ? "#10b981" : value >= 40 ? "#d97706" : "#dc2626";

  return (
    <svg width="130" height="130" viewBox="0 0 130 130" aria-label={`Readiness gauge: ${value}%`}>
      <circle cx="65" cy="65" r={r} fill="none" stroke="#e8ecf1" strokeWidth="10" />
      <circle
        cx="65" cy="65" r={r}
        fill="none"
        stroke={color}
        strokeWidth="10"
        strokeDasharray={circ}
        strokeDashoffset={offset}
        strokeLinecap="butt"
        transform="rotate(-90 65 65)"
        style={{ transition: "stroke-dashoffset 0.5s ease" }}
      />
      <text x="65" y="61" textAnchor="middle" fontSize="22" fontWeight="800" fill={color}>{value}</text>
      <text x="65" y="78" textAnchor="middle" fontSize="11" fill="#4f565c">Readiness %</text>
    </svg>
  );
}

export function SaaSSoc2Calculator() {
  const [selectedCats, setSelectedCats] = useState<Set<TSCCategory>>(new Set(["security"]));
  const [entries, setEntries] = useState<Map<string, ControlEntry>>(new Map());
  const [result, setResult] = useState<Soc2Result | null>(null);
  const [activeTab, setActiveTab] = useState<TSCCategory>("security");

  const liveResult = useMemo(() => calculateSoc2Readiness(entries, selectedCats), [entries, selectedCats]);

  const toggleCategory = (cat: TSCCategory) => {
    if (cat === "security") return;
    const next = new Set(selectedCats);
    next.has(cat) ? next.delete(cat) : next.add(cat);
    setSelectedCats(next);
    if (!next.has(activeTab)) setActiveTab("security");
  };

  const updateEntry = (id: string, field: keyof ControlEntry, value: boolean | EvidenceMode) => {
    setEntries((prev) => {
      const next = new Map(prev);
      const existing = next.get(id) ?? { id, implemented: false, evidenceMode: "manual" };
      next.set(id, { ...existing, [field]: value });
      return next;
    });
  };

  const onGenerateReport = () => {
    setResult(calculateSoc2Readiness(entries, selectedCats));
  };

  const onExportCSV = () => {
    if (!result) return;
    const selectedCategoryRows = ALL_CATS.map((category) => [
      "Selected Category",
      category,
      selectedCats.has(category),
    ]);

    const controlRows = result.allControls.map((ctrl) => [
      ctrl.controlDef.ccRef,
      ctrl.controlDef.label,
      ctrl.controlDef.category,
      ctrl.implemented,
      ctrl.evidenceMode,
      ctrl.earnedPoints.toFixed(1),
      ctrl.maxPoints.toFixed(1),
      ctrl.isGap ? "GAP" : "OK",
      ctrl.controlDef.isHighWeight ? "CRITICAL" : "STANDARD",
    ]);

    const rows: Array<Array<string | number | boolean>> = [
      ["Tool", "SaaS SOC 2 Readiness Calculator"],
      ["Generated At", new Date().toISOString()],
      ["Overall Readiness", `${result.overallReadiness}%`],
      ["Automation Score", `${result.automationScore}%`],
      ["Estimated Timeline (Months)", result.estimatedTimelineMonths],
      ["Total Gaps", result.totalGaps],
      ["Critical Gaps", result.criticalGaps.join(" | ") || "None"],
      [],
      ["Input Summary"],
      ["Field", "Value", "Included"],
      ...selectedCategoryRows,
      [],
      ["Control Results"],
      ["CC Ref", "Control", "Category", "Implemented", "Evidence", "Earned Points", "Max Points", "Status", "Priority"],
      ...controlRows,
    ];

    const csv = rows.map((row) => row.map(csvEscape).join(",")).join("\n");
    downloadCsvFile(csv, `BKX-SOC2-Audit-Report-${Date.now()}.csv`);
  };

  const shareCopy = "I just ran a SaaS SOC 2 Readiness Calculator audit via @BKXLabs. Check your compliance score here:";
  const toolUrl = "https://bkxlabs.com/tools/saas-soc2-readiness-calculator";
  const shareToX = () => {
    const text = `${shareCopy} ${toolUrl}`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  };
  const shareToLinkedIn = () => {
    const text = `${shareCopy} ${toolUrl}`;
    window.open(`https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  };

  const onReset = () => {
    setEntries(new Map());
    setResult(null);
    setSelectedCats(new Set(["security"]));
    setActiveTab("security");
  };

  const tabControls = CONTROL_DEFS.filter((c) => c.category === activeTab);

  return (
    <div className="tu-wrap" style={{ position: "relative" }}>

      {/* AEO block */}
      <div className="tu-aeo">
        <p>
          <strong>As of April 2026</strong>, SOC 2 Type II requires continuous control monitoring
          rather than annual point-in-time snapshots. Use this calculator to identify critical gaps
          in your Common Criteria (CC) series before engaging a CPA firm.
        </p>
      </div>

      <span className="tu-tag">BKX Compliance Tools</span>
      <h1 className="tu-title">SOC 2 Readiness Calculator</h1>
      <p className="tu-subtitle">2026 Continuous Monitoring Model · Automation Multiplier Scoring · CC9.2 &amp; CC6.1 Weighted</p>
      <hr className="tu-divider" />

      <div className="transition-all">

        {/* Gauge + TSC Toggles */}
        <div className="tu-gauge-toggles-row">
          <div className="tu-gauge-wrap">
            <RadialGauge value={liveResult.overallReadiness} />
            <div className="tu-gauge-sub">
              <span className="tu-gauge-sub-label">Automation Score</span>
              <span className="tu-gauge-sub-value">{liveResult.automationScore}%</span>
              <span className="tu-gauge-sub-desc">of controls are automated</span>
            </div>
            {liveResult.criticalGaps.length > 0 && (
              <div className="tu-gap-pills">
                {liveResult.criticalGaps.map((g) => (
                  <div key={g} className="tu-gap-pill">
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#dc2626", display: "inline-block", flexShrink: 0 }} />
                    {g}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* TSC category toggles */}
          <div>
            <p className="tu-label" style={{ marginBottom: "0.5rem" }}>Trust Services Criteria</p>
            <div className="tu-tsc-list">
              {ALL_CATS.map((cat) => {
                const meta = CATEGORY_META[cat];
                const active = selectedCats.has(cat);
                return (
                  <button
                    key={cat}
                    onClick={() => toggleCategory(cat)}
                    className={`tu-tsc-btn ${active ? "active" : ""}`}
                    style={{ cursor: cat === "security" ? "default" : "pointer" }}
                  >
                    <div className="tu-tsc-btn-header">
                      <span className="tu-tsc-name">{meta.label}</span>
                      <span className={`tu-badge ${cat === "security" ? "tu-badge-req" : active ? "tu-badge-active" : "tu-badge-opt"}`}>
                        {cat === "security" ? "Required" : active ? "Included" : "Optional"}
                      </span>
                    </div>
                    <p className="tu-tsc-desc">{meta.description}</p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="tu-tabs">
          {ALL_CATS.filter((c) => selectedCats.has(c)).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`tu-tab ${activeTab === cat ? "active" : ""}`}
            >
              {CATEGORY_META[cat].label}
              {liveResult.byCategory[cat] && (
                <span className={`tu-tab-badge ${
                  liveResult.byCategory[cat].readiness >= 75 ? "ok" :
                  liveResult.byCategory[cat].readiness >= 40 ? "warn" : "danger"
                }`}>
                  {liveResult.byCategory[cat].readiness}%
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Controls list */}
        <div className="tu-control-list">
          {tabControls.map((def) => {
            const entry = entries.get(def.id);
            const implemented = entry?.implemented ?? false;
            const mode: EvidenceMode = entry?.evidenceMode ?? "manual";
            return (
              <div key={def.id} className={`tu-control-item ${def.isHighWeight ? "high-weight" : ""}`}>
                <div className="tu-control-header">
                  <input
                    type="checkbox"
                    id={`ctrl-${def.id}`}
                    checked={implemented}
                    onChange={(e) => updateEntry(def.id, "implemented", e.target.checked)}
                  />
                  <div className="tu-control-text">
                    <label htmlFor={`ctrl-${def.id}`} className="tu-control-name">
                      {def.label}
                      {def.isHighWeight && (
                        <span className="tu-badge tu-badge-warn" style={{ marginLeft: "0.5rem" }}>High Weight</span>
                      )}
                    </label>

                    {implemented && (
                      <div className="tu-evidence-row">
                        <span className="tu-evidence-label">Evidence type:</span>
                        <button
                          onClick={() => updateEntry(def.id, "evidenceMode", "automated")}
                          className={`tu-evidence-btn ${mode === "automated" ? "selected" : ""}`}
                        >
                          Automated API (×1.5)
                        </button>
                        <button
                          onClick={() => updateEntry(def.id, "evidenceMode", "manual")}
                          className={`tu-evidence-btn ${mode === "manual" ? "selected" : ""}`}
                        >
                          Manual Screenshot
                        </button>
                        {mode === "manual" && (
                          <span className="tu-evidence-warn">⚠ High Audit Overhead</span>
                        )}
                      </div>
                    )}
                  </div>
                  <span className="tu-control-ref">{def.ccRef}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action buttons */}
        <div className="tu-btn-row">
          <button onClick={onGenerateReport} className="tu-btn tu-btn-primary">Generate Gap Report</button>
          <button onClick={onReset} className="tu-btn">Reset</button>
        </div>

        {/* Gap report */}
        {result && (
          <div className="tu-result tu-animate" aria-live="polite">
            <div className="tu-result-hero">
              <div className="tu-metric">
                <span className="tu-metric-label">Overall Readiness</span>
                <span className="tu-metric-value">{result.overallReadiness}<span className="tu-metric-unit">%</span></span>
              </div>
              <div className="tu-metric">
                <span className="tu-metric-label">Est. Timeline</span>
                <span className="tu-metric-value">{result.estimatedTimelineMonths}<span className="tu-metric-unit">mo</span></span>
              </div>
              <div className="tu-metric">
                <span className="tu-metric-label">Total Gaps</span>
                <span className={`tu-metric-value ${result.totalGaps > 5 ? "danger" : result.totalGaps > 2 ? "warn" : "success"}`}>
                  {result.totalGaps}
                </span>
              </div>
            </div>

            {result.criticalGaps.length > 0 && (
              <div style={{ padding: "0.875rem", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 8, marginBottom: "1rem" }}>
                <p style={{ fontSize: "0.82rem", fontWeight: 700, color: "#991b1b", marginBottom: "0.4rem" }}>⚑ Critical Gaps (High-Weight Controls)</p>
                <ul className="tu-result-list">
                  {result.criticalGaps.map((g) => <li key={g} style={{ color: "#dc2626" }}>{g}</li>)}
                </ul>
              </div>
            )}

            <div className="tu-table-wrap">
              <table className="tu-table">
                <thead>
                  <tr>
                    <th>CC Ref</th>
                    <th>Control</th>
                    <th>Status</th>
                    <th>Evidence</th>
                    <th style={{ textAlign: "right" }}>Score</th>
                  </tr>
                </thead>
                <tbody>
                  {result.allControls.map((ctrl) => (
                    <tr key={ctrl.controlDef.id}>
                      <td style={{ fontFamily: "monospace", fontSize: "0.78rem", color: "#4f565c" }}>{ctrl.controlDef.ccRef}</td>
                      <td style={{ maxWidth: 200 }}>{ctrl.controlDef.label.split("—")[1]?.trim()}</td>
                      <td>
                        <span className={`tu-badge ${ctrl.isGap ? "tu-badge-gap" : "tu-badge-ok"}`}>
                          {ctrl.isGap ? "GAP" : "OK"}
                        </span>
                      </td>
                      <td>
                        {ctrl.isGap ? "—" : (
                          <span style={{ fontSize: "0.78rem", fontWeight: 600, color: ctrl.evidenceMode === "automated" ? "#0d2b5e" : "#d97706" }}>
                            {ctrl.evidenceMode === "automated" ? "Automated" : "Manual ⚠"}
                          </span>
                        )}
                      </td>
                      <td style={{ textAlign: "right", fontFamily: "monospace", fontSize: "0.78rem", color: "#4f565c" }}>
                        {ctrl.earnedPoints.toFixed(1)} / {ctrl.maxPoints.toFixed(1)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ marginTop: "1rem" }}>
              <button
                onClick={onExportCSV}
                className="tu-btn"
                style={{
                  width: "100%",
                  justifyContent: "center",
                  gap: "0.45rem",
                  background: "#0d2b5e",
                  color: "#fff",
                  borderColor: "#0d2b5e",
                  fontWeight: 700,
                }}
                aria-label="Download Audit Report as CSV"
              >
                <Download size={16} aria-hidden="true" />
                Download Audit Report (CSV)
              </button>

              <div
                style={{
                  marginTop: "0.75rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "0.5rem",
                  flexWrap: "wrap",
                }}
              >
                <span style={{ fontSize: "0.8rem", color: "#4f565c" }}>Share Results:</span>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button onClick={shareToLinkedIn} className="tu-btn tu-btn-sm" aria-label="Share SOC2 result to LinkedIn">
                    <Linkedin size={14} aria-hidden="true" /> LinkedIn
                  </button>
                  <button onClick={shareToX} className="tu-btn tu-btn-sm" aria-label="Share SOC2 result to X">
                    <Twitter size={14} aria-hidden="true" /> X
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>



      {/* Documentation */}
      <article className="tu-prose">
        <h2>SOC 2 Compliance Guide (2026 Edition)</h2>

        <h3>The 2026 Shift to Continuous Compliance</h3>
        <p>
          The most consequential change to SOC 2 audit practice in the last decade is a change in auditor methodology.
          Prior to 2024, many CPA firms accepted the "screenshot sprint" — teams gathering evidence immediately prior to
          the submission window. The AICPA's ASB now requires auditors to sample evidence from throughout the entire
          observation period, with at minimum one sample per quarter.
        </p>

        <h3>Navigating the CC Series (CC1 to CC9)</h3>
        <p>The Common Criteria series maps to the COSO Internal Control framework and covers nine mandatory families:</p>
        <ul>
          <li><strong>CC1 (Control Environment):</strong> Organizational ethics policies and board oversight.</li>
          <li><strong>CC2 (Communication):</strong> Internal and external communication of security commitments.</li>
          <li><strong>CC3 (Risk Assessment):</strong> Formal risk identification and mitigation planning.</li>
          <li><strong>CC4 (Monitoring):</strong> Ongoing evaluation of control effectiveness via SIEM dashboards.</li>
          <li><strong>CC5 (Control Activities):</strong> Change management, deployment gates, separation of duties.</li>
          <li><strong>CC6 (Logical Access):</strong> Identity, authentication, and access lifecycle management. CC6.1 is one of the highest-weighted controls.</li>
          <li><strong>CC7 (System Operations):</strong> Security event monitoring, incident response, and recovery.</li>
          <li><strong>CC8 (Change Management):</strong> Software deployment governance and approval chains.</li>
          <li><strong>CC9 (Risk Mitigation):</strong> Business continuity and vendor risk management (CC9.2).</li>
        </ul>

        <h3>Supply Chain &amp; Fourth-Party Risk (CC9.2 in 2026)</h3>
        <p>
          CC9.2 has emerged as the single most common cause of "Qualified" SOC 2 opinions in 2025–2026. The standard
          requires organizations to assess the security posture of all vendors who process or store customer data.
          In 2026, the standard effectively extends to cover fourth-party risk — your vendors' own critical subprocessors.
        </p>

        <h3>AI-Powered Evidence Collection</h3>
        <p>
          Modern compliance automation platforms use API integrations to pull cryptographic evidence directly from
          control systems with tamper-evident audit trails. Examples include automated AWS IAM queries to detect
          terminated employee accounts (CC6.1), GitHub pull request merge log ingestion (CC8.1), and SIEM API
          polling to verify alert triage SLAs (CC7.2). This calculator's Automation Multiplier scoring directly
          models the audit risk differential between manual and automated evidence programs.
        </p>
      </article>
    </div>
  );
}
