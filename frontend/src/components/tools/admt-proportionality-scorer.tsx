import { useState, useMemo } from 'react';

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
      },
      {
        name: 'Worker Transparency',
        score: transparency,
        weight: FACTOR_WEIGHTS.transparency,
        normalized: normalizedTransparency,
      },
      {
        name: 'Intrusiveness',
        score: intrusiveness,
        weight: FACTOR_WEIGHTS.intrusiveness,
        normalized: normalizedIntrusiveness,
      },
      {
        name: 'Data Safeguards',
        score: safeguards,
        weight: FACTOR_WEIGHTS.safeguards,
        normalized: normalizedSafeguards,
      },
      {
        name: 'Worker Impact',
        score: workerImpact,
        weight: FACTOR_WEIGHTS.workerImpact,
        normalized: normalizedWorkerImpact,
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
      recommendations.push('Strengthen business case: Document specific, legitimate reasons for monitoring.');
    }
    if (transparency < 4) {
      recommendations.push('Increase transparency: Provide workers with detailed written disclosure of monitoring scope, frequency, and data retention.');
    }
    if (intrusiveness > 7) {
      recommendations.push('Consider less invasive alternatives: Evaluate whether monitoring scope can be reduced.');
    }
    if (safeguards < 4) {
      recommendations.push('Strengthen safeguards: Implement encryption, access controls, and regular audits.');
    }
    if (workerImpact > 7) {
      recommendations.push('High impact on workers: Consult legal counsel and consider worker input before deployment.');
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

  const handleReset = () => {
    setNecessity(5);
    setTransparency(5);
    setIntrusiveness(5);
    setSafeguards(5);
    setWorkerImpact(5);
  };

  const riskColor =
    result.riskBand === 'low' ? '#10b981' :
    result.riskBand === 'medium' ? '#d97706' :
    result.riskBand === 'high' ? '#d97706' :
    '#dc2626';

  return (
    <div className="tu-wrap">
      <span className="tu-tag">BKX Compliance Tools</span>
      <h1 className="tu-title">ADMT Proportionality Scorer</h1>
      <p className="tu-subtitle">
        Assess workplace monitoring and AI decision-making against GDPR Article 35 and ADMT Directive proportionality rules.
      </p>
      <hr className="tu-divider" />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '1.25rem' }}>
        <div className="tu-slider-row">
          <div className="tu-slider-header">
            <div>
              <span className="tu-label">Business Necessity</span>
              <p style={{ fontSize: '0.78rem', color: '#4f565c', margin: '0.15rem 0 0' }}>Is monitoring necessary for legitimate operational purposes?</p>
            </div>
            <span className="tu-slider-value">{necessity}/10</span>
          </div>
          <input
            type="range" value={necessity} min="0" max="10"
            onChange={(e) => setNecessity(Number(e.target.value))}
            className="tu-range" style={{ marginTop: '0.4rem' }}
          />
        </div>

        <div className="tu-slider-row">
          <div className="tu-slider-header">
            <div>
              <span className="tu-label">Worker Transparency</span>
              <p style={{ fontSize: '0.78rem', color: '#4f565c', margin: '0.15rem 0 0' }}>Are workers fully informed about monitoring scope and data use?</p>
            </div>
            <span className="tu-slider-value">{transparency}/10</span>
          </div>
          <input
            type="range" value={transparency} min="0" max="10"
            onChange={(e) => setTransparency(Number(e.target.value))}
            className="tu-range" style={{ marginTop: '0.4rem' }}
          />
        </div>

        <div className="tu-slider-row">
          <div className="tu-slider-header">
            <div>
              <span className="tu-label">Intrusiveness</span>
              <p style={{ fontSize: '0.78rem', color: '#4f565c', margin: '0.15rem 0 0' }}>How invasive is the monitoring (0=least, 10=most)?</p>
            </div>
            <span className="tu-slider-value">{intrusiveness}/10</span>
          </div>
          <input
            type="range" value={intrusiveness} min="0" max="10"
            onChange={(e) => setIntrusiveness(Number(e.target.value))}
            className="tu-range" style={{ marginTop: '0.4rem' }}
          />
        </div>

        <div className="tu-slider-row">
          <div className="tu-slider-header">
            <div>
              <span className="tu-label">Data Safeguards</span>
              <p style={{ fontSize: '0.78rem', color: '#4f565c', margin: '0.15rem 0 0' }}>Are strong controls in place to protect collected data?</p>
            </div>
            <span className="tu-slider-value">{safeguards}/10</span>
          </div>
          <input
            type="range" value={safeguards} min="0" max="10"
            onChange={(e) => setSafeguards(Number(e.target.value))}
            className="tu-range" style={{ marginTop: '0.4rem' }}
          />
        </div>

        <div className="tu-slider-row">
          <div className="tu-slider-header">
            <div>
              <span className="tu-label">Worker Impact</span>
              <p style={{ fontSize: '0.78rem', color: '#4f565c', margin: '0.15rem 0 0' }}>How significantly does monitoring affect worker autonomy?</p>
            </div>
            <span className="tu-slider-value">{workerImpact}/10</span>
          </div>
          <input
            type="range" value={workerImpact} min="0" max="10"
            onChange={(e) => setWorkerImpact(Number(e.target.value))}
            className="tu-range" style={{ marginTop: '0.4rem' }}
          />
        </div>
      </div>

      <div className="tu-btn-row">
        <button type="button" className="tu-btn" onClick={handleReset}>Reset Form</button>
      </div>

      <div className="tu-result tu-animate">
        <div className="tu-result-hero">
          <div className="tu-metric">
            <span className="tu-metric-label">Proportionality Score</span>
            <span className="tu-metric-value">{result.overallScore}<span className="tu-metric-unit">/ 100</span></span>
          </div>
          <div className="tu-metric">
            <span className="tu-metric-label">Risk Band</span>
            <span className="tu-metric-value" style={{ color: riskColor, textTransform: 'capitalize' }}>
              {result.riskBand}
            </span>
          </div>
        </div>

        <div className="tu-table-wrap" style={{ marginBottom: '1.25rem' }}>
          <table className="tu-table">
            <thead>
              <tr>
                <th>Factor</th>
                <th>Raw Score</th>
                <th>Contribution to Overall</th>
              </tr>
            </thead>
            <tbody>
              {result.factors.map(f => (
                <tr key={f.name}>
                  <td style={{ fontWeight: 600 }}>{f.name}</td>
                  <td>{f.score} / 10</td>
                  <td>{f.contribution}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {result.recommendations.length > 0 && (
          <div style={{ padding: '1rem', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px' }}>
            <p style={{ fontSize: '0.8rem', fontWeight: 700, color: '#991b1b', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Review Needed</p>
            <ul className="tu-result-list" style={{ marginTop: 0 }}>
              {result.recommendations.map((rec, idx) => (
                <li key={idx} style={{ color: '#991b1b' }}>{rec}</li>
              ))}
            </ul>
          </div>
        )}
        
        <p style={{ fontSize: "0.8rem", color: "#4f565c", marginTop: "1rem", fontStyle: "italic", textAlign: 'center' }}>
          Assessment only. Consult legal counsel before deployment.
        </p>
      </div>
    </div>
  );
}
