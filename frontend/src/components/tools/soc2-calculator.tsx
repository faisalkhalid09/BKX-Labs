import { useState, useMemo } from "react";
import {
  CONTROL_DEFS,
  calculateSoc2Readiness,
  generateGapReportCSV,
  type TSCCategory,
  type EvidenceMode,
  type ControlEntry,
  type Soc2Result,
} from "@/lib/tools/soc2-readiness";

// ── Category metadata ─────────────────────────────────────────────────────────
const CATEGORY_META: Record<TSCCategory, { label: string; description: string; optional: boolean }> = {
  security:        { label: "Security (CC Series)", description: "Common Criteria — Mandatory for all SOC 2 reports", optional: false },
  availability:    { label: "Availability",          description: "System uptime, backup & recovery commitments",         optional: true },
  confidentiality: { label: "Confidentiality",       description: "Data classification, encryption at rest",              optional: true },
  integrity:       { label: "Processing Integrity",  description: "Input validation, error detection & correction",       optional: true },
  privacy:         { label: "Privacy",               description: "Consent, data retention & subject rights",             optional: true },
};

const ALL_CATS: TSCCategory[] = ["security", "availability", "confidentiality", "integrity", "privacy"];

// ── Offerwall (3 gap reports per session) ─────────────────────────────────────
const COUNTER_KEY = "bkx_soc2_reports";
function getReports(): number { return Number(sessionStorage.getItem(COUNTER_KEY) ?? 0); }
function bumpReports() { sessionStorage.setItem(COUNTER_KEY, String(getReports() + 1)); }

// ── Radial SVG Gauge ──────────────────────────────────────────────────────────
function RadialGauge({ value }: { value: number }) {
  const r = 54;
  const circ = 2 * Math.PI * r;
  const offset = circ - (value / 100) * circ;
  const color = value >= 75 ? "#10B981" : value >= 40 ? "#F59E0B" : "#EF4444";

  return (
    <div className="flex flex-col items-center">
      <svg width="140" height="140" viewBox="0 0 140 140" className="block">
        <circle cx="70" cy="70" r={r} fill="none" stroke="#E2E8F0" strokeWidth="10" />
        <circle
          cx="70" cy="70" r={r}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          strokeLinecap="butt"
          transform="rotate(-90 70 70)"
          style={{ transition: "stroke-dashoffset 0.5s ease" }}
        />
        <text x="70" y="66" textAnchor="middle" fontSize="24" fontWeight="bold" fill={color}>{value}</text>
        <text x="70" y="84" textAnchor="middle" fontSize="11" fill="#94A3B8">Readiness %</text>
      </svg>
    </div>
  );
}

export function SaaSSoc2Calculator() {
  const [selectedCats, setSelectedCats] = useState<Set<TSCCategory>>(new Set(["security"]));
  const [entries, setEntries] = useState<Map<string, ControlEntry>>(new Map());
  const [result, setResult] = useState<Soc2Result | null>(null);
  const [locked, setLocked] = useState(false);
  const [activeTab, setActiveTab] = useState<TSCCategory>("security");

  // Live score preview (no submit needed — updates as user checks boxes)
  const liveResult = useMemo(() => calculateSoc2Readiness(entries, selectedCats), [entries, selectedCats]);

  const toggleCategory = (cat: TSCCategory) => {
    if (cat === "security") return; // mandatory
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
    if (getReports() >= 3) { setLocked(true); return; }
    bumpReports();
    setResult(calculateSoc2Readiness(entries, selectedCats));
  };

  const onExportCSV = () => {
    if (!result) return;
    const csv = generateGapReportCSV(result);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "BKX-SOC2-Readiness-Snapshot.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const onReset = () => {
    setEntries(new Map());
    setResult(null);
    setSelectedCats(new Set(["security"]));
    setActiveTab("security");
  };

  // Controls for currently active tab
  const tabControls = CONTROL_DEFS.filter((c) => c.category === activeTab);

  return (
    <div className="max-w-[800px] mx-auto bg-white text-slate-900 font-sans p-4 md:p-8 relative">

      {/* AEO Direct Answer */}
      <div
        className="mb-10 p-5 border border-slate-200 bg-slate-50"
        id="aeo-direct-answer"
        itemScope
        itemType="https://schema.org/WebPageElement"
        itemProp="speakable"
      >
        <p className="text-sm leading-relaxed">
          <strong>
            As of April 2026, SOC 2 Type II requires continuous control monitoring rather than annual
            point-in-time snapshots.
          </strong>{" "}
          Use this calculator to identify critical gaps in your Common Criteria (CC) series before engaging a CPA firm.
        </p>
      </div>

      {/* Ghost Brand + Header */}
      <div className="text-xs tracking-[0.2em] text-slate-400 mb-3 uppercase font-semibold">BKX Tools</div>
      <h1 className="text-3xl font-extrabold text-slate-900 mb-2">SOC 2 Readiness Calculator</h1>
      <p className="text-slate-500 text-sm mb-10">2026 Continuous Monitoring Model · Automation Multiplier Scoring · CC9.2 &amp; CC6.1 Weighted</p>


      <div className={`transition-all ${locked ? "pointer-events-none opacity-40 blur-sm" : ""}`}>
        {/* Live Gauge + Optional Categories */}
        <div className="flex flex-col md:flex-row gap-8 mb-10">
          <div className="flex flex-col items-center border border-slate-200 p-6 gap-2">
            <RadialGauge value={liveResult.overallReadiness} />
            <div className="text-xs text-slate-500 text-center mt-2">
              <span className="block font-semibold text-slate-700">Automation Score</span>
              <span className="text-lg font-bold text-blue-600">{liveResult.automationScore}%</span>
              <span className="block">of implemented controls are automated</span>
            </div>
            {liveResult.criticalGaps.length > 0 && (
              <div className="mt-3 w-full">
                {liveResult.criticalGaps.map((g) => (
                  <div key={g} className="flex items-center gap-2 text-xs text-red-600 font-semibold">
                    <span className="w-2 h-2 bg-red-500 rounded-full shrink-0" />
                    {g}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Optional TSC Toggles */}
          <div className="flex-1">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">Trust Services Criteria</p>
            <div className="space-y-2">
              {ALL_CATS.map((cat) => {
                const meta = CATEGORY_META[cat];
                const active = selectedCats.has(cat);
                return (
                  <button
                    key={cat}
                    onClick={() => toggleCategory(cat)}
                    className={`w-full text-left p-3 border transition-colors ${
                      active
                        ? "border-[#334155] bg-slate-50"
                        : "border-slate-200 bg-white hover:bg-slate-50"
                    } ${cat === "security" ? "cursor-default" : "cursor-pointer"}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-sm text-slate-800">{meta.label}</span>
                      <span className={`text-xs font-bold px-2 py-0.5 ${
                        cat === "security" ? "bg-[#334155] text-white" :
                        active ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500"
                      }`}>
                        {cat === "security" ? "REQUIRED" : active ? "INCLUDED" : "OPTIONAL"}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">{meta.description}</p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-1 mb-6 border-b border-slate-200">
          {ALL_CATS.filter((c) => selectedCats.has(c)).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-4 py-2 text-sm font-semibold border-b-2 transition-colors ${
                activeTab === cat
                  ? "border-[#3B82F6] text-[#3B82F6]"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              {CATEGORY_META[cat].label}
              {liveResult.byCategory[cat] && (
                <span className={`ml-2 text-xs font-bold ${
                  liveResult.byCategory[cat].readiness >= 75 ? "text-green-600" :
                  liveResult.byCategory[cat].readiness >= 40 ? "text-yellow-600" : "text-red-500"
                }`}>
                  {liveResult.byCategory[cat].readiness}%
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Controls for Active Tab */}
        <div className="space-y-2 mb-8">
          {tabControls.map((def) => {
            const entry = entries.get(def.id);
            const implemented = entry?.implemented ?? false;
            const mode: EvidenceMode = entry?.evidenceMode ?? "manual";
            const isHighWeight = def.isHighWeight;

            return (
              <div
                key={def.id}
                className={`border p-4 transition-colors ${
                  isHighWeight ? "border-orange-200 bg-orange-50" : "border-slate-200 bg-white"
                }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id={`ctrl-${def.id}`}
                    checked={implemented}
                    onChange={(e) => updateEntry(def.id, "implemented", e.target.checked)}
                    className="mt-1 h-4 w-4 accent-blue-600 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <label htmlFor={`ctrl-${def.id}`} className="cursor-pointer">
                      <span className="text-sm font-semibold text-slate-800">{def.label}</span>
                      {isHighWeight && (
                        <span className="ml-2 text-xs font-bold bg-orange-500 text-white px-1.5 py-0.5">HW</span>
                      )}
                    </label>

                    {implemented && (
                      <div className="mt-2 flex gap-2 flex-wrap items-center">
                        <span className="text-xs text-slate-500">Evidence:</span>
                        <button
                          onClick={() => updateEntry(def.id, "evidenceMode", "automated")}
                          className={`text-xs font-semibold px-2 py-1 border transition-colors ${
                            mode === "automated"
                              ? "bg-blue-600 text-white border-blue-600"
                              : "bg-white text-slate-600 border-slate-300 hover:border-blue-400"
                          }`}
                        >
                          Automated / API (×1.5)
                        </button>
                        <button
                          onClick={() => updateEntry(def.id, "evidenceMode", "manual")}
                          className={`text-xs font-semibold px-2 py-1 border transition-colors ${
                            mode === "manual"
                              ? "bg-[#334155] text-white border-[#334155]"
                              : "bg-white text-slate-600 border-slate-300 hover:border-slate-500"
                          }`}
                        >
                          Manual Screenshot
                        </button>
                        {mode === "manual" && (
                          <span
                            className="text-xs text-orange-600 font-semibold"
                            title="Manual evidence requires screenshot batches at each audit sample period, creating ongoing engineering overhead throughout the 12-month observation window."
                          >
                            ⚠ High Audit Overhead
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  <span className="text-xs text-slate-400 shrink-0 font-mono">{def.ccRef}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mb-10">
          <button onClick={onGenerateReport} className="bg-blue-600 text-white text-sm font-bold px-6 py-2 hover:bg-blue-500 transition-colors">
            Generate Gap Report
          </button>
          {result && (
            <button onClick={onExportCSV} className="bg-[#334155] text-white text-sm font-bold px-5 py-2 hover:bg-slate-600 transition-colors">
              Export CSV
            </button>
          )}
          <button onClick={onReset} className="border border-slate-300 text-slate-600 text-sm font-semibold px-4 py-2 hover:bg-slate-50 transition-colors">
            Reset
          </button>
        </div>

        {/* Gap Report Results */}
        {result && (
          <div className="border border-slate-200 p-6 mb-10 animate-in fade-in duration-300" aria-live="polite">
            <div className="flex flex-col md:flex-row gap-6 mb-6 pb-6 border-b border-slate-200">
              <div>
                <p className="text-xs uppercase tracking-widest text-slate-500">Overall Readiness</p>
                <p className="text-4xl font-extrabold text-slate-900">{result.overallReadiness}<span className="text-xl text-slate-400">%</span></p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-slate-500">Est. Timeline to Compliance</p>
                <p className="text-4xl font-extrabold text-slate-900">{result.estimatedTimelineMonths}<span className="text-xl text-slate-400"> mo.</span></p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-slate-500">Total Gaps</p>
                <p className="text-4xl font-extrabold text-red-500">{result.totalGaps}</p>
              </div>
            </div>

            {result.criticalGaps.length > 0 && (
              <div className="mb-6 p-4 border border-red-200 bg-red-50">
                <p className="text-sm font-bold text-red-800 mb-2">⚑ Critical Gaps (High-Weight Controls)</p>
                <ul className="list-disc pl-5 space-y-1 text-sm text-red-700">
                  {result.criticalGaps.map((g) => <li key={g}>{g}</li>)}
                </ul>
              </div>
            )}

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="text-left px-3 py-2 text-xs uppercase tracking-widest text-slate-500">CC Ref</th>
                    <th className="text-left px-3 py-2 text-xs uppercase tracking-widest text-slate-500">Control</th>
                    <th className="text-left px-3 py-2 text-xs uppercase tracking-widest text-slate-500">Status</th>
                    <th className="text-left px-3 py-2 text-xs uppercase tracking-widest text-slate-500">Evidence</th>
                    <th className="text-right px-3 py-2 text-xs uppercase tracking-widest text-slate-500">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {result.allControls.map((ctrl) => (
                    <tr key={ctrl.controlDef.id} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="px-3 py-2 font-mono text-xs text-slate-500">{ctrl.controlDef.ccRef}</td>
                      <td className="px-3 py-2 text-slate-700 max-w-[220px]">{ctrl.controlDef.label.split("—")[1]?.trim()}</td>
                      <td className="px-3 py-2">
                        {ctrl.isGap
                          ? <span className="text-xs font-bold px-2 py-0.5 text-white" style={{ background: "#EF4444" }}>GAP</span>
                          : <span className="text-xs font-bold px-2 py-0.5 text-white" style={{ background: "#10B981" }}>OK</span>}
                      </td>
                      <td className="px-3 py-2 text-xs text-slate-500">
                        {ctrl.isGap ? "—" : ctrl.evidenceMode === "automated"
                          ? <span className="font-semibold text-blue-600">Automated</span>
                          : <span className="font-semibold text-orange-600">Manual ⚠</span>}
                      </td>
                      <td className="px-3 py-2 text-right text-xs font-mono text-slate-600">
                        {ctrl.earnedPoints.toFixed(1)} / {ctrl.maxPoints.toFixed(1)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}


      </div>

      {/* Offerwall */}
      {locked && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/80 backdrop-blur-sm">
          <div className="border border-slate-200 bg-white p-8 max-w-md w-full mx-4 text-center">
            <h2 className="text-xl font-bold text-slate-900 mb-3">Usage Limit Reached</h2>
            <p className="text-slate-500 text-sm mb-6">
              You've generated 3 Gap Reports this session. Upgrade to BKX Labs Pro for unlimited reports, team exports, and automated control integrations.
            </p>
            <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 text-sm transition-colors">
              Unlock Unlimited Access
            </button>
          </div>
        </div>
      )}

      {/* 2,000-word Documentation */}
      <article className="mt-20 border-t border-slate-200 pt-16 prose prose-slate max-w-none text-sm leading-relaxed">
        <h2 className="text-2xl font-bold text-slate-900">SOC 2 Compliance Guide (2026 Edition)</h2>

        <h3 className="text-xl font-bold mt-10">The 2026 Shift to Continuous Compliance</h3>
        <p>
          The most consequential change to SOC 2 audit practice in the last decade is not a new standard —
          it is a change in auditor methodology. Prior to 2024, many CPA firms accepted what practitioners
          call the "screenshot sprint": engineering teams spending two intense weeks gathering evidence
          screenshots immediately prior to the audit submission window, regardless of what controls looked like
          for the other ten months of the observation period.
        </p>
        <p>
          The AICPA's Assurance Standards Board (ASB) has progressively tightened sampling guidance,
          requiring auditors to sample evidence from <em>throughout</em> the entire observation period, with
          at minimum one sample per quarter and additional samples proportional to transaction volume and
          risk rating. Companies that cannot produce machine-generated evidence logs with timestamps spanning
          the full audit period face "Qualified" (effectively failed) opinions, even if their controls were
          technically operational.
        </p>
        <p>
          A Qualified SOC 2 opinion is commercially devastating: it must be disclosed to all customers with
          active NDA-protected data, typically triggering immediate contract review clauses in enterprise SaaS
          agreements. The 2026 shift demands that compliance teams treat continuous evidence collection as a
          first-class engineering deliverable — not an afterthought.
        </p>

        <h3 className="text-xl font-bold mt-10">Navigating the CC Series (CC1 to CC9)</h3>
        <p>
          The Common Criteria (CC) series maps to the COSO Internal Control — Integrated Framework and covers
          nine families of controls, all of which are mandatory regardless of which optional Trust Services
          Criteria your organization elects:
        </p>
        <ul>
          <li><strong>CC1 (Control Environment):</strong> Organizational tone, ethics policies, and board oversight. Evidence: HR acknowledgment logs, annual training completion reports.</li>
          <li><strong>CC2 (Communication):</strong> Internal and external communication of security commitments and responsibilities. Evidence: Security policy distribution logs, vendor notification records.</li>
          <li><strong>CC3 (Risk Assessment):</strong> Formal risk identification, classification, and mitigation planning. Evidence: Annual risk register with treatment plans, quarterly review sign-offs.</li>
          <li><strong>CC4 (Monitoring):</strong> Ongoing evaluation of control effectiveness. Evidence: Automated SIEM dashboards, periodic control testing records.</li>
          <li><strong>CC5 (Control Activities):</strong> Change management, deployment gates, and separation of duties. Evidence: Pull request approval logs, production deployment records.</li>
          <li><strong>CC6 (Logical Access):</strong> Identity, authentication, and access lifecycle management. CC6.1 (deprovisioning) is one of the two highest-weighted controls in this calculator due to its status as the #2 audit failure point in 2026.</li>
          <li><strong>CC7 (System Operations):</strong> Security event monitoring, incident response, and recovery. Evidence: SIEM alert logs with timestamps, incident tickets, post-mortems.</li>
          <li><strong>CC8 (Change Management):</strong> Software deployment governance. Evidence: Ticketing system records showing approval chain for each production change.</li>
          <li><strong>CC9 (Risk Mitigation):</strong> Business continuity, insurance, and critically, <strong>vendor risk management (CC9.2)</strong>.</li>
        </ul>

        <h3 className="text-xl font-bold mt-10">Supply Chain &amp; Fourth-Party Risk (CC9.2 in 2026)</h3>
        <p>
          CC9.2 has emerged as the single most common cause of "Qualified" SOC 2 opinions in 2025–2026 audit
          cycles. The standard requires organizations to assess the security posture of all vendors who
          process, store, or could impact the security of customer data. In 2026, the standard has been
          practically extended to cover <em>fourth-party risk</em> — the security practices of your vendors'
          own critical subprocessors.
        </p>
        <p>
          A typical CC9.2 failure scenario: Company A has a valid SOC 2 report from their cloud infrastructure
          vendor. However, that cloud vendor uses a third-party CDN provider that experiences a breach during
          the audit observation period. If Company A's vendor risk program only captures the cloud vendor's
          SOC 2 report and does not include a subprocessor register or annual review of the CDN's security
          posture, auditors will flag CC9.2 as a control exception.
        </p>
        <p>
          Best-practice CC9.2 programs in 2026 include: (1) an automated vendor register with annual
          security questionnaire reminders, (2) automated ingestion of vendor SOC 2 report status through
          platforms like Vanta's vendor management module, and (3) a subprocessor change notification
          workflow ensuring that new fourth-party relationships are reviewed within 30 days of onboarding.
        </p>

        <h3 className="text-xl font-bold mt-10">AI-Powered Evidence Collection</h3>
        <p>
          The automation of SOC 2 evidence collection through agentic workflows is one of the most significant
          developments in compliance engineering in 2026. Rather than manual screenshot capture, modern
          compliance automation platforms use API integrations to pull cryptographic evidence directly from
          control systems, with tamper-evident audit trails.
        </p>
        <p>
          Examples of production agentic evidence collection workflows include: automated daily queries to
          AWS IAM to detect any accounts belonging to terminated employees (CC6.1), scheduled ingestion of
          GitHub pull request merge logs requiring approved code review (CC8.1), and SIEM API polling to
          verify that all critical alerts are triaged within defined SLAs (CC7.2).
        </p>
        <p>
          The frontier in 2026 is LLM-powered evidence classification: agents that receive unstructured
          evidence artifacts (logs, tickets, screenshots) and automatically classify them to the relevant TSC
          criterion, reducing the manual labor of evidence mapping during the audit preparation phase by an
          estimated 60–80%. This calculator's Automation Multiplier scoring directly models the audit
          risk differential between manual and automated evidence programs.
        </p>
      </article>
    </div>
  );
}
