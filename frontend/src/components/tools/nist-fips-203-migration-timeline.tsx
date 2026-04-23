import { useState, useMemo } from 'react';

interface MigrationPhase {
  name: string;
  description: string;
  durationWeeks: number;
  systemCount: number;
  riskLevel: 'critical' | 'high' | 'medium' | 'low';
  startWeek: number;
  endWeek: number;
  deliverables: string[];
}

interface TimelineResult {
  totalWeeks: number;
  totalMonths: number;
  phases: MigrationPhase[];
  criticalPath: string;
  recommendations: string[];
  riskAssessment: string;
}

export function NistFips203MigrationTimeline() {
  const [cryptoSystems, setCryptoSystems] = useState('150');
  const [teamSize, setTeamSize] = useState('6');
  const [riskDistribution, setRiskDistribution] = useState({
    critical: 15,
    high: 35,
    medium: 40,
    low: 10,
  });

  const timeline: TimelineResult | null = useMemo(() => {
    const systems = Math.max(1, parseInt(cryptoSystems) || 0);
    const team = Math.max(1, parseInt(teamSize) || 1);
    
    // Risk-weighted system count per phase
    const critical = Math.round(systems * (riskDistribution.critical / 100));
    const high = Math.round(systems * (riskDistribution.high / 100));
    const medium = Math.round(systems * (riskDistribution.medium / 100));
    const low = systems - critical - high - medium;

    // Phase duration formula: (systemCount / team) + fixed overhead
    const criticalPhaseDuration = Math.max(4, Math.ceil(critical / Math.max(1, team / 2)) + 3);
    const highPhaseDuration = Math.max(3, Math.ceil(high / team) + 2);
    const mediumPhaseDuration = Math.max(3, Math.ceil(medium / team) + 1);
    const lowPhaseDuration = Math.max(2, Math.ceil(low / team));

    const discoveryWeeks = 4;
    const inventoryWeeks = 3;
    const assessmentWeeks = 4;

    let currentWeek = 0;

    const phases: MigrationPhase[] = [
      {
        name: 'Phase 1: Discovery & Planning',
        description: 'Conduct pre-migration assessment, stakeholder interviews, and compliance gap analysis.',
        durationWeeks: discoveryWeeks,
        systemCount: 0,
        riskLevel: 'medium',
        startWeek: currentWeek,
        endWeek: (currentWeek += discoveryWeeks),
        deliverables: [
          'Crypto asset inventory checklist',
          'Compliance baseline documentation',
          'Migration strategy document',
        ],
      },
      {
        name: 'Phase 2: Cryptographic Inventory',
        description: 'Complete system-level inventory of all cryptographic implementations.',
        durationWeeks: inventoryWeeks,
        systemCount: 0,
        riskLevel: 'medium',
        startWeek: currentWeek,
        endWeek: (currentWeek += inventoryWeeks),
        deliverables: [
          'Complete crypto asset database',
          'Dependency mapping',
          'Integration point documentation',
        ],
      },
      {
        name: 'Phase 3: Assessment & Planning',
        description: 'Detailed impact analysis and migration roadmap creation.',
        durationWeeks: assessmentWeeks,
        systemCount: 0,
        riskLevel: 'medium',
        startWeek: currentWeek,
        endWeek: (currentWeek += assessmentWeeks),
        deliverables: [
          'Detailed impact assessment',
          'Algorithm replacement matrix',
          'Testing strategy document',
        ],
      },
      {
        name: 'Phase 4: Critical Systems Migration',
        description: 'Migrate highest-risk cryptographic systems first.',
        durationWeeks: criticalPhaseDuration,
        systemCount: critical,
        riskLevel: 'critical',
        startWeek: currentWeek,
        endWeek: (currentWeek += criticalPhaseDuration),
        deliverables: [
          `${critical} critical systems migrated`,
          'Comprehensive testing validation',
        ],
      },
      {
        name: 'Phase 5: High-Risk Systems Migration',
        description: 'Migrate high-priority systems with full validation.',
        durationWeeks: highPhaseDuration,
        systemCount: high,
        riskLevel: 'high',
        startWeek: currentWeek,
        endWeek: (currentWeek += highPhaseDuration),
        deliverables: [
          `${high} high-priority systems migrated`,
          'Security audit completion',
        ],
      },
      {
        name: 'Phase 6: Medium/Low Systems & Closeout',
        description: 'Complete remaining systems and finalize documentation.',
        durationWeeks: mediumPhaseDuration + lowPhaseDuration,
        systemCount: medium + low,
        riskLevel: 'low',
        startWeek: currentWeek,
        endWeek: (currentWeek += mediumPhaseDuration + lowPhaseDuration),
        deliverables: [
          `${medium + low} systems migrated`,
          'Legacy system decommissioning',
        ],
      },
    ];

    const totalWeeks = phases[phases.length - 1].endWeek;
    const totalMonths = Math.ceil(totalWeeks / 4.33);

    const criticalPath = `${totalWeeks} weeks (${totalMonths} months) — driven by critical systems count (${critical} systems) and team capacity (${team} members)`;

    const recommendations: string[] = [];
    if (critical > 20) recommendations.push('High critical system count: Consider allocating additional resources to Phase 4');
    if (team < 3) recommendations.push('Small team size: Recommend expanding QA/security review capacity for critical migrations');
    if (high + critical > 100) recommendations.push('Parallel phase execution: Critical and high-risk phases can overlap by 2-3 weeks');
    if (systems > 200) recommendations.push('Large inventory: Consider vendor-assisted migration for legacy systems in Phase 6');
    recommendations.push('Plan post-quantum contingency: Maintain dual-algorithm support for 18-36 months after initial deployment');

    const riskAssessment =
      critical > 30 ? 'HIGH: Large critical system population requires extended timeline' :
      totalMonths > 18 ? 'MEDIUM: Extended timeline increases maintenance burden' :
      'MODERATE: Timeline is manageable with standard staffing';

    return { totalWeeks, totalMonths, phases, criticalPath, recommendations, riskAssessment };
  }, [cryptoSystems, teamSize, riskDistribution]);

  const handleRiskChange = (key: keyof typeof riskDistribution, value: number) => {
    const others = Object.keys(riskDistribution)
      .filter((k) => k !== key)
      .reduce((sum, k) => sum + riskDistribution[k as keyof typeof riskDistribution], 0);

    if (value + others <= 100) {
      setRiskDistribution((prev) => ({ ...prev, [key]: value }));
    }
  };

  const riskSum = Object.values(riskDistribution).reduce((a, b) => a + b, 0);
  const riskBalanced = riskSum === 100;

  return (
    <div className="tu-wrap">
      <span className="tu-tag">BKX Compliance Tools</span>
      <h1 className="tu-title">NIST FIPS 203 Migration Timeline Planner</h1>
      <p className="tu-subtitle">Estimate timelines for transitioning to Post-Quantum Cryptography (ML-KEM, ML-DSA) based on workload.</p>
      <hr className="tu-divider" />

      <div className="tu-form-grid">
        <div className="tu-field">
          <label className="tu-label">Total Systems</label>
          <input
            type="number" value={cryptoSystems} min="1" max="5000"
            onChange={(e) => setCryptoSystems(e.target.value)}
            className="tu-input"
          />
        </div>
        <div className="tu-field">
          <label className="tu-label">Team FTEs</label>
          <input
            type="number" value={teamSize} min="1" max="50"
            onChange={(e) => setTeamSize(e.target.value)}
            className="tu-input"
          />
        </div>
      </div>

      <div className="tu-field" style={{ marginTop: '1.25rem' }}>
        <label className="tu-label">Risk Distribution (%)</label>
        <div className="tu-check-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', marginBottom: 0 }}>
          {['critical', 'high', 'medium', 'low'].map(key => (
            <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
              <span style={{ fontSize: '0.7rem', textTransform: 'capitalize', color: '#4f565c' }}>{key}</span>
              <input
                type="number"
                value={riskDistribution[key as keyof typeof riskDistribution]}
                onChange={(e) => handleRiskChange(key as keyof typeof riskDistribution, parseInt(e.target.value) || 0)}
                className="tu-input"
                style={{ padding: '0.4rem' }}
              />
            </div>
          ))}
        </div>
        {!riskBalanced && <p style={{ fontSize: '0.75rem', color: '#dc2626', marginTop: '0.4rem', fontWeight: 600 }}>Total must equal 100% (currently {riskSum}%)</p>}
      </div>

      <hr className="tu-divider" />

      {riskBalanced && timeline && (
        <div className="tu-result tu-animate">
          <div className="tu-result-hero">
            <div className="tu-metric">
              <span className="tu-metric-label">Estimated Timeline</span>
              <span className="tu-metric-value">{timeline.totalMonths}<span className="tu-metric-unit">months</span></span>
            </div>
            <div className="tu-metric">
              <span className="tu-metric-label">Total Weeks</span>
              <span className="tu-metric-value" style={{ color: '#4f565c', fontSize: '1.5rem' }}>{timeline.totalWeeks}</span>
            </div>
          </div>
          
          <div className="tu-result-row">
            <span className="tu-result-row-label">Critical Path</span>
            <span className="tu-result-row-value" style={{ textAlign: 'left', fontWeight: 'normal', fontSize: '0.8rem' }}>{timeline.criticalPath}</span>
          </div>
          <div className="tu-result-row">
            <span className="tu-result-row-label">Risk Assessment</span>
            <span className="tu-result-row-value" style={{ color: timeline.riskAssessment.includes('HIGH') ? '#dc2626' : '#161a1d', textAlign: 'left', fontWeight: 'bold', fontSize: '0.8rem' }}>
              {timeline.riskAssessment}
            </span>
          </div>

          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0d2b5e', margin: '1.5rem 0 1rem' }}>Migration Phases</h3>
          <div className="tu-table-wrap">
            <table className="tu-table">
              <thead>
                <tr>
                  <th>Phase</th>
                  <th>Duration</th>
                  <th>Systems</th>
                  <th>Key Deliverables</th>
                </tr>
              </thead>
              <tbody>
                {timeline.phases.map((p, idx) => (
                  <tr key={idx}>
                    <td>
                      <span style={{ fontWeight: 600, display: 'block' }}>{p.name}</span>
                      <span style={{ fontSize: '0.72rem', color: '#4f565c' }}>Wk {p.startWeek}-{p.endWeek}</span>
                    </td>
                    <td>{p.durationWeeks} weeks</td>
                    <td>{p.systemCount || '—'}</td>
                    <td style={{ fontSize: '0.75rem' }}>
                      <ul style={{ margin: 0, paddingLeft: '1rem' }}>
                        {p.deliverables.map((d, i) => <li key={i}>{d}</li>)}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {timeline.recommendations.length > 0 && (
            <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '8px' }}>
              <p style={{ fontSize: '0.8rem', fontWeight: 700, color: '#1e3a8a', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Recommendations</p>
              <ul className="tu-result-list" style={{ marginTop: 0 }}>
                {timeline.recommendations.map((rec, idx) => (
                  <li key={idx} style={{ color: '#1e3a8a' }}>{rec}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
