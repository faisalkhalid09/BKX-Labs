
import { useState, useMemo } from 'react';
import { AlertTriangle, CheckCircle, Eye, Shield, Zap } from 'lucide-react';
import ToolToAgencyCTA from './ToolToAgencyCTA';

const FACTOR_WEIGHTS = {
  necessity: 0.2,
  transparency: 0.25,
  intrusiveness: 0.2,
  safeguards: 0.2,
  workerImpact: 0.15,
};

interface ScoringResult {
  overallScore: number;
  riskBand: 'low' | 'medium' | 'high' | 'critical';
  factors: {
    name: string;
    score: number;
    weight: number;
    contribution: number;
  }[];
  recommendations: string[];
}

export function AdmtProportionalityScorer() {
  const [necessity, setNecessity] = useState(5);
  const [transparency, setTransparency] = useState(5);
  const [intrusiveness, setIntrusiveness] = useState(5);
  const [safeguards, setSafeguards] = useState(5);
  const [workerImpact, setWorkerImpact] = useState(5);

  const result: ScoringResult | null = useMemo(() => {
    // Normalize inputs (1-10 scale)
    const normalizedNecessity = necessity / 10;
    const normalizedTransparency = transparency / 10;
    const normalizedIntrusiveness = (10 - intrusiveness) / 10; // Invert: lower intrusiveness = better
    const normalizedSafeguards = safeguards / 10;
    const normalizedWorkerImpact = (10 - workerImpact) / 10; // Invert: lower impact = better

    const factors = [
      {
        name: 'Business Necessity',
        score: necessity,
        weight: FACTOR_WEIGHTS.necessity,
        normalized: normalizedNecessity,
        description: 'Is monitoring necessary for legitimate business purposes?',
      },
      {
        name: 'Worker Transparency',
        score: transparency,
        weight: FACTOR_WEIGHTS.transparency,
        normalized: normalizedTransparency,
        description: 'Are workers fully informed about monitoring scope and data use?',
      },
      {
        name: 'Intrusiveness',
        score: intrusiveness,
        weight: FACTOR_WEIGHTS.intrusiveness,
        normalized: normalizedIntrusiveness,
        description: 'How invasive is the monitoring (0=least, 10=most)?',
      },
      {
        name: 'Data Safeguards',
        score: safeguards,
        weight: FACTOR_WEIGHTS.safeguards,
        normalized: normalizedSafeguards,
        description: 'Are strong controls in place to protect collected data?',
      },
      {
        name: 'Worker Impact',
        score: workerImpact,
        weight: FACTOR_WEIGHTS.workerImpact,
        normalized: normalizedWorkerImpact,
        description: 'How significantly does monitoring affect worker privacy/autonomy?',
      },
    ];

    const overallScore = Math.round(
      factors.reduce((sum, f) => sum + f.normalized * f.weight * 100, 0)
    );

    let riskBand: 'low' | 'medium' | 'high' | 'critical' = 'low';
    if (overallScore >= 75) riskBand = 'low';
    else if (overallScore >= 50) riskBand = 'medium';
    else if (overallScore >= 25) riskBand = 'high';
    else riskBand = 'critical';

    const recommendations: string[] = [];

    if (necessity < 4) {
      recommendations.push('✓ Strengthen business case: Document specific, legitimate reasons for monitoring');
    }
    if (transparency < 4) {
      recommendations.push('✓ Increase transparency: Provide workers with detailed written disclosure of monitoring scope, frequency, and data retention');
    }
    if (intrusiveness > 7) {
      recommendations.push('✗ Consider less invasive alternatives: Evaluate whether monitoring scope can be reduced');
    }
    if (safeguards < 4) {
      recommendations.push('✗ Strengthen safeguards: Implement encryption, access controls, and regular audits');
    }
    if (workerImpact > 7) {
      recommendations.push('✗ High impact on workers: Consult legal counsel and consider worker input before deployment');
    }

    return {
      overallScore,
      riskBand,
      factors: factors.map((f) => ({
        name: f.name,
        score: f.score,
        weight: f.weight,
        contribution: Math.round(f.normalized * f.weight * 100),
      })),
      recommendations,
    };
  }, [necessity, transparency, intrusiveness, safeguards, workerImpact]);

  const riskColor =
    result.riskBand === 'low'
      ? 'bg-green-50 border-green-300'
      : result.riskBand === 'medium'
        ? 'bg-yellow-50 border-yellow-300'
        : result.riskBand === 'high'
          ? 'bg-orange-50 border-orange-300'
          : 'bg-red-50 border-red-300';

  const riskIcon =
    result.riskBand === 'low' || result.riskBand === 'medium' ? (
      <CheckCircle size={24} className="text-green-600" />
    ) : (
      <AlertTriangle size={24} className="text-red-600" />
    );

  const handleReset = () => {
    setNecessity(5);
    setTransparency(5);
    setIntrusiveness(5);
    setSafeguards(5);
    setWorkerImpact(5);
  };

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
            <h2 className="text-xl font-semibold text-slate-900">Assessment Factors</h2>

            {/* Business Necessity */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Eye size={18} className="text-slate-600" />
                <label className="font-semibold text-slate-900">Business Necessity (0-10)</label>
              </div>
              <p className="text-xs text-slate-600 mb-2">Is monitoring necessary for legitimate operational, safety, or compliance purposes?</p>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  value={necessity}
                  onChange={(e) => setNecessity(Number(e.target.value))}
                  min="0"
                  max="10"
                  className="flex-1"
                />
                <span className="font-semibold text-slate-900 min-w-[3rem]">{necessity}/10</span>
              </div>
            </div>

            {/* Worker Transparency */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Eye size={18} className="text-slate-600" />
                <label className="font-semibold text-slate-900">Worker Transparency (0-10)</label>
              </div>
              <p className="text-xs text-slate-600 mb-2">Are workers fully informed about monitoring scope, methods, and data usage?</p>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  value={transparency}
                  onChange={(e) => setTransparency(Number(e.target.value))}
                  min="0"
                  max="10"
                  className="flex-1"
                />
                <span className="font-semibold text-slate-900 min-w-[3rem]">{transparency}/10</span>
              </div>
            </div>

            {/* Intrusiveness */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Shield size={18} className="text-slate-600" />
                <label className="font-semibold text-slate-900">Intrusiveness (0-10)</label>
              </div>
              <p className="text-xs text-slate-600 mb-2">How intrusive is the monitoring? (0=minimal, 10=maximum privacy impact)</p>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  value={intrusiveness}
                  onChange={(e) => setIntrusiveness(Number(e.target.value))}
                  min="0"
                  max="10"
                  className="flex-1"
                />
                <span className="font-semibold text-slate-900 min-w-[3rem]">{intrusiveness}/10</span>
              </div>
            </div>

            {/* Data Safeguards */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Shield size={18} className="text-slate-600" />
                <label className="font-semibold text-slate-900">Data Safeguards (0-10)</label>
              </div>
              <p className="text-xs text-slate-600 mb-2">How strong are technical and organizational safeguards protecting collected data?</p>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  value={safeguards}
                  onChange={(e) => setSafeguards(Number(e.target.value))}
                  min="0"
                  max="10"
                  className="flex-1"
                />
                <span className="font-semibold text-slate-900 min-w-[3rem]">{safeguards}/10</span>
              </div>
            </div>

            {/* Worker Impact */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Zap size={18} className="text-slate-600" />
                <label className="font-semibold text-slate-900">Worker Impact (0-10)</label>
              </div>
              <p className="text-xs text-slate-600 mb-2">How significantly does monitoring affect worker autonomy, privacy, or wellbeing? (0=minimal, 10=severe)</p>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  value={workerImpact}
                  onChange={(e) => setWorkerImpact(Number(e.target.value))}
                  min="0"
                  max="10"
                  className="flex-1"
                />
                <span className="font-semibold text-slate-900 min-w-[3rem]">{workerImpact}/10</span>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="px-4 py-2 border border-slate-300 text-slate-900 rounded-md hover:bg-slate-50 transition-colors"
            >
              Reset All
            </button>
          </div>

          {/* Results Section */}
          <div className={`p-6 border rounded-md ${riskColor}`}>
            <div className="flex items-center gap-3 mb-4">
              {riskIcon}
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Proportionality Score: {result.overallScore}/100</h3>
                <p className="text-sm text-slate-600">
                  Risk Band:{' '}
                  <span
                    className={`font-semibold ${
                      result.riskBand === 'low'
                        ? 'text-green-600'
                        : result.riskBand === 'medium'
                          ? 'text-yellow-600'
                          : result.riskBand === 'high'
                            ? 'text-orange-600'
                            : 'text-red-600'
                    }`}
                  >
                    {result.riskBand.toUpperCase()}
                  </span>
                </p>
              </div>
            </div>

            {/* Factor Breakdown */}
            <div className="space-y-3">
              <h4 className="font-semibold text-slate-900">Factor Contributions</h4>
              {result.factors.map((factor) => (
                <div key={factor.name} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-700">{factor.name}</span>
                    <span className="font-semibold text-slate-900">{factor.contribution}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-slate-900 transition-all"
                      style={{ width: `${factor.contribution}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Legal Interpretation */}
            <div className="mt-4 p-3 bg-white bg-opacity-60 rounded border border-slate-300">
              <p className="text-sm text-slate-700">
                <strong>Interpretation:</strong>{' '}
                {result.riskBand === 'low' &&
                  'Monitoring appears proportional under GDPR and ADMT. Document the assessment for compliance audits.'}
                {result.riskBand === 'medium' &&
                  'Monitoring is moderately proportional. Strengthen transparency and safeguards. Consult legal counsel.'}
                {result.riskBand === 'high' &&
                  'Proportionality is questionable. Consider reducing scope, increasing transparency, or consulting labor lawyers.'}
                {result.riskBand === 'critical' &&
                  'Proportionality is highly suspect. Immediate legal review and stakeholder consultation recommended.'}
              </p>
            </div>
          </div>

          {/* Recommendations */}
          {result.recommendations.length > 0 && (
            <div className="bg-blue-50 border border-blue-300 rounded-md p-4 space-y-3">
              <h4 className="font-semibold text-slate-900">Recommendations</h4>
              <ul className="space-y-2">
                {result.recommendations.map((rec, idx) => (
                  <li key={idx} className="text-sm text-slate-700">
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right Sidebar Ad + Legal Notes */}
        <div className="lg:col-span-1 space-y-6">
          {/* Right Sidebar Ad Slot */}
          <div className="bg-slate-100 border border-slate-300 rounded-md flex flex-col items-center justify-center h-96">
            <div className="text-slate-500 text-sm text-center">300×600 Ad Slot</div>
          </div>

          {/* Legal Reference */}
          <div className="p-4 bg-slate-50 border border-slate-300 rounded-md space-y-4">
            <div>
              <h4 className="font-semibold text-slate-900 mb-2">ADMT Legal Framework</h4>
              <p className="text-xs text-slate-600 mb-3">
                This tool implements proportionality testing under:
              </p>
              <ul className="text-xs text-slate-600 space-y-2">
                <li>• <strong>EU GDPR Article 6:</strong> Lawful basis requirements</li>
                <li>• <strong>GDPR Article 35:</strong> Data Protection Impact Assessment</li>
                <li>• <strong>EU ADMT Directive:</strong> Proportionality of automated decisions</li>
                <li>• <strong>ILO Standards:</strong> Worker dignity and privacy rights</li>
              </ul>
            </div>

            <div className="border-t border-slate-300 pt-3">
              <p className="text-xs text-red-600 font-semibold">
                ⚠️ <strong>Legal Disclaimer:</strong> This tool is for assessment only. Consult qualified legal counsel before deploying workplace monitoring to ensure full compliance.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-12 pt-8 border-t border-slate-300">
        <ToolToAgencyCTA 
          toolName="ADMT Proportionality Scorer" 
          description="Conduct comprehensive compliance audits and proportionality assessments for AI-driven workplace monitoring systems across EU jurisdictions."
        />
      </div>
    </div>
  );
}
