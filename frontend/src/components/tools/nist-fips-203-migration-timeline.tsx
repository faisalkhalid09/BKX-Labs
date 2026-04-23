import { useState, useMemo } from 'react';
import { AlertTriangle, Clock, Zap, TrendingUp } from 'lucide-react';
import ToolToAgencyCTA from './ToolToAgencyCTA';

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
          'Risk assessment matrix',
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
          'Vendor coordination list',
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
          'Peer review of migration approach',
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
          'Production monitoring setup',
          'Incident response procedures',
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
          'Performance benchmarking',
          'Security audit completion',
          'Stakeholder sign-off',
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
          `${medium + low} medium/low-priority systems migrated`,
          'Legacy system decommissioning',
          'Final compliance audit',
          'Knowledge transfer completion',
        ],
      },
    ];

    const totalWeeks = phases[phases.length - 1].endWeek;
    const totalMonths = Math.ceil(totalWeeks / 4.33);

    const criticalPath = `${totalWeeks} weeks (${totalMonths} months) — driven by critical systems count (${critical} systems) and team capacity (${team} members)`;

    const recommendations: string[] = [];
    if (critical > 20) {
      recommendations.push('✗ High critical system count: Consider allocating additional resources to Phase 4');
    }
    if (team < 3) {
      recommendations.push('✗ Small team size: Recommend expanding QA/security review capacity for critical migrations');
    }
    if (high + critical > 100) {
      recommendations.push('✓ Parallel phase execution: Critical and high-risk phases can overlap by 2-3 weeks');
    }
    if (systems > 200) {
      recommendations.push('✓ Large inventory: Consider vendor-assisted migration for legacy systems in Phase 6');
    }
    recommendations.push('✓ Plan post-quantum contingency: Maintain dual-algorithm support for 18-36 months after initial deployment');

    const riskAssessment =
      critical > 30
        ? 'HIGH: Large critical system population requires extended timeline and careful sequencing'
        : totalMonths > 18
          ? 'MEDIUM: Extended timeline increases maintenance burden — prioritize quick wins for momentum'
          : 'MODERATE: Timeline is manageable with standard staffing and risk-based prioritization';

    return {
      totalWeeks,
      totalMonths,
      phases,
      criticalPath,
      recommendations,
      riskAssessment,
    };
  }, [cryptoSystems, teamSize, riskDistribution]);

  const handleRiskChange = (key: keyof typeof riskDistribution, value: number) => {
    const others = Object.keys(riskDistribution)
      .filter((k) => k !== key)
      .reduce((sum, k) => sum + riskDistribution[k as keyof typeof riskDistribution], 0);

    if (value + others <= 100) {
      setRiskDistribution((prev) => ({
        ...prev,
        [key]: value,
      }));
    }
  };

  const riskSum = Object.values(riskDistribution).reduce((a, b) => a + b, 0);
  const riskBalanced = riskSum === 100;

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      {/* Top Banner Ad Slot */}
      <div className="mb-8 bg-slate-100 border border-slate-300 rounded-md flex items-center justify-center h-24">
        <div className="text-slate-500 text-sm">728×90 Ad Slot</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Input Section */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-slate-900">Migration Inputs</h2>

            {/* Crypto Systems */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Zap size={18} className="text-slate-600" />
                <label className="font-semibold text-slate-900">Total Cryptographic Systems</label>
              </div>
              <p className="text-xs text-slate-600 mb-2">
                Estimate total count of systems using cryptography (includes databases, APIs, certs, key stores)
              </p>
              <input
                type="number"
                value={cryptoSystems}
                onChange={(e) => setCryptoSystems(e.target.value)}
                min="1"
                max="5000"
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-slate-900"
              />
            </div>

            {/* Team Size */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <TrendingUp size={18} className="text-slate-600" />
                <label className="font-semibold text-slate-900">Migration Team Size</label>
              </div>
              <p className="text-xs text-slate-600 mb-2">
                Full-time equivalents for crypto migration (developers, QA, security, ops)
              </p>
              <input
                type="number"
                value={teamSize}
                onChange={(e) => setTeamSize(e.target.value)}
                min="1"
                max="50"
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-slate-900"
              />
            </div>

            {/* Risk Distribution */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <AlertTriangle size={18} className="text-slate-600" />
                <label className="font-semibold text-slate-900">System Risk Distribution</label>
              </div>
              <p className="text-xs text-slate-600 mb-3">
                Percentage of systems by risk level (must sum to 100%)
              </p>

              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-red-600">Critical:</span>
                  <input
                    type="number"
                    value={riskDistribution.critical}
                    onChange={(e) => handleRiskChange('critical', parseInt(e.target.value) || 0)}
                    min="0"
                    max="100"
                    className="w-20 px-2 py-1 border border-slate-300 rounded text-slate-900"
                  />
                  <span className="text-xs text-slate-600">%</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-orange-600">High:</span>
                  <input
                    type="number"
                    value={riskDistribution.high}
                    onChange={(e) => handleRiskChange('high', parseInt(e.target.value) || 0)}
                    min="0"
                    max="100"
                    className="w-20 px-2 py-1 border border-slate-300 rounded text-slate-900"
                  />
                  <span className="text-xs text-slate-600">%</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-yellow-600">Medium:</span>
                  <input
                    type="number"
                    value={riskDistribution.medium}
                    onChange={(e) => handleRiskChange('medium', parseInt(e.target.value) || 0)}
                    min="0"
                    max="100"
                    className="w-20 px-2 py-1 border border-slate-300 rounded text-slate-900"
                  />
                  <span className="text-xs text-slate-600">%</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-green-600">Low:</span>
                  <input
                    type="number"
                    value={riskDistribution.low}
                    onChange={(e) => handleRiskChange('low', parseInt(e.target.value) || 0)}
                    min="0"
                    max="100"
                    className="w-20 px-2 py-1 border border-slate-300 rounded text-slate-900"
                  />
                  <span className="text-xs text-slate-600">%</span>
                </div>
              </div>

              {!riskBalanced && (
                <p className="text-xs text-red-600 font-semibold">Total must equal 100% (currently {riskSum}%)</p>
              )}
            </div>
          </div>

          {/* Timeline Results */}
          {riskBalanced && (
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-300 rounded-md p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Clock size={24} className="text-blue-600" />
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">
                      Total Migration Timeline: {timeline.totalMonths} months
                    </h3>
                    <p className="text-sm text-slate-600">({timeline.totalWeeks} weeks)</p>
                  </div>
                </div>

                <div className="space-y-2 text-sm text-slate-700">
                  <p>
                    <strong>Critical Path:</strong> {timeline.criticalPath}
                  </p>
                  <p>
                    <strong>Risk Assessment:</strong>{' '}
                    <span className={`${timeline.riskAssessment.includes('HIGH') ? 'text-red-600 font-semibold' : 'text-slate-700'}`}>
                      {timeline.riskAssessment}
                    </span>
                  </p>
                </div>
              </div>

              {/* Phase Timeline */}
              <div className="space-y-4">
                <h4 className="font-semibold text-slate-900">Migration Phases</h4>

                {timeline.phases.map((phase, idx) => (
                  <div key={idx} className="border border-slate-300 rounded-md overflow-hidden">
                    <div className="p-4 bg-slate-50 border-b border-slate-300">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <h5 className="font-semibold text-slate-900">{phase.name}</h5>
                          <p className="text-sm text-slate-600">{phase.description}</p>
                        </div>
                        <span className={`px-3 py-1 rounded text-sm font-semibold whitespace-nowrap ml-4 ${
                          phase.riskLevel === 'critical'
                            ? 'bg-red-100 text-red-700'
                            : phase.riskLevel === 'high'
                              ? 'bg-orange-100 text-orange-700'
                              : phase.riskLevel === 'medium'
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-green-100 text-green-700'
                        }`}>
                          {phase.durationWeeks}w
                        </span>
                      </div>
                    </div>

                    <div className="p-4 space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600">
                          Week {phase.startWeek} - Week {phase.endWeek}
                        </span>
                        {phase.systemCount > 0 && (
                          <span className="font-semibold text-slate-900">{phase.systemCount} systems</span>
                        )}
                      </div>

                      {/* Progress bar */}
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full bg-slate-900"
                          style={{
                            width: `${((phase.endWeek - phase.startWeek) / timeline.totalWeeks) * 100}%`,
                          }}
                        />
                      </div>

                      <div>
                        <p className="text-xs font-semibold text-slate-900 mb-2">Key Deliverables:</p>
                        <ul className="text-xs text-slate-600 space-y-1">
                          {phase.deliverables.map((d, di) => (
                            <li key={di}>• {d}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Recommendations */}
              {timeline.recommendations.length > 0 && (
                <div className="bg-green-50 border border-green-300 rounded-md p-4 space-y-3">
                  <h4 className="font-semibold text-slate-900">Optimization Recommendations</h4>
                  <ul className="space-y-2">
                    {timeline.recommendations.map((rec, idx) => (
                      <li key={idx} className="text-sm text-slate-700">
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Sidebar Ad + Reference */}
        <div className="lg:col-span-1 space-y-6">
          {/* Right Sidebar Ad Slot */}
          <div className="bg-slate-100 border border-slate-300 rounded-md flex flex-col items-center justify-center h-96">
            <div className="text-slate-500 text-sm text-center">300×600 Ad Slot</div>
          </div>

          {/* Reference Material */}
          <div className="p-4 bg-slate-50 border border-slate-300 rounded-md space-y-4">
            <div>
              <h4 className="font-semibold text-slate-900 mb-2">NIST FIPS 203 Overview</h4>
              <p className="text-xs text-slate-600 mb-3">
                Post-quantum cryptography standard replacing RSA, ECC algorithms with ML-KEM, ML-DSA, SLH-DSA.
              </p>
              <ul className="text-xs text-slate-600 space-y-2">
                <li>• <strong>ML-KEM:</strong> Key encapsulation (replaces RSA, ECDH)</li>
                <li>• <strong>ML-DSA:</strong> Digital signatures (replaces ECDSA, EdDSA)</li>
                <li>• <strong>SLH-DSA:</strong> Stateless hash-based signatures</li>
              </ul>
            </div>

            <div className="border-t border-slate-300 pt-3">
              <h4 className="font-semibold text-slate-900 mb-2">Success Factors</h4>
              <ul className="text-xs text-slate-600 space-y-2">
                <li>✓ Crypto inventory accuracy</li>
                <li>✓ Vendor library support</li>
                <li>✓ Dual-algorithm testing periods</li>
                <li>✓ Key rotation procedures</li>
              </ul>
            </div>

            <div className="border-t border-slate-300 pt-3">
              <p className="text-xs text-amber-700 font-semibold">
                ⚠️ <strong>Timeline Variance:</strong> Actual project may vary ±30% based on system complexity and vendor readiness.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-12 pt-8 border-t border-slate-300">
        <ToolToAgencyCTA />
      </div>
    </div>
  );
}
