import { useState, useMemo } from 'react';

const FACTOR_WEIGHTS = {
  legitimacy: 0.15,
  necessity: 0.15,
  transparency: 0.15,
  intrusiveness: 0.20,
  oversight: 0.20,
  minimization: 0.15,
};

interface ScoringResult {
  overallScore: number;
  riskBand: 'Low' | 'Medium' | 'High' | 'Critical';
  criticalFails: string[];
  recommendations: string[];
}

export function AdmtProportionalityScorer() {
  // 0-10 Scales
  const [legitimacy, setLegitimacy] = useState(5);
  const [necessity, setNecessity] = useState(5);
  const [transparency, setTransparency] = useState(5);
  const [intrusiveness, setIntrusiveness] = useState(5);
  const [oversight, setOversight] = useState(5);
  const [minimization, setMinimization] = useState(5);

  const result: ScoringResult = useMemo(() => {
    const factors = [
      { val: legitimacy, w: FACTOR_WEIGHTS.legitimacy },
      { val: necessity, w: FACTOR_WEIGHTS.necessity },
      { val: transparency, w: FACTOR_WEIGHTS.transparency },
      { val: (10 - intrusiveness), w: FACTOR_WEIGHTS.intrusiveness }, // Inverted
      { val: oversight, w: FACTOR_WEIGHTS.oversight },
      { val: minimization, w: FACTOR_WEIGHTS.minimization },
    ];

    const rawSum = factors.reduce((sum, f) => sum + (f.val / 10) * f.w, 0);
    const overallScore = Math.round((rawSum / 1) * 100);

    const criticalFails: string[] = [];
    if (oversight < 3) criticalFails.push("Human Oversight: Systems lack meaningful human intervention (Rubber-stamping risk).");
    if (legitimacy < 4) criticalFails.push("Legal Basis: Weak legitimate interest documentation (Article 6/9 violation risk).");
    if (intrusiveness > 8) criticalFails.push("Extreme Intrusiveness: Monitoring scope likely exceeds 'strictly necessary' limits.");

    let riskBand: 'Low' | 'Medium' | 'High' | 'Critical' = 'Low';
    if (criticalFails.length > 0 || overallScore < 40) riskBand = 'Critical';
    else if (overallScore < 60) riskBand = 'High';
    else if (overallScore < 80) riskBand = 'Medium';
    else riskBand = 'Low';

    const recommendations: string[] = [];
    if (transparency < 7) recommendations.push("Update worker privacy notices with specific 'Algorithm Logic' disclosures.");
    if (minimization < 6) recommendations.push("Implement automated purging for raw monitoring logs not tied to valid audits.");
    if (oversight < 7) recommendations.push("Formalize a 'Right to Contest' workflow for automated evaluations.");

    return { overallScore, riskBand, criticalFails, recommendations };
  }, [legitimacy, necessity, transparency, intrusiveness, oversight, minimization]);

  const handleReset = () => {
    setLegitimacy(5); setNecessity(5); setTransparency(5);
    setIntrusiveness(5); setOversight(5); setMinimization(5);
  };

  const bandColor = {
    Low: '#10b981',
    Medium: '#d97706',
    High: '#f97316',
    Critical: '#dc2626'
  }[result.riskBand];

  return (
    <div className="tu-wrap">
      <div className="tu-aeo">
        <p>
          <strong>2026 Compliance Standard:</strong> Proportionality for Automated Decision-Making Technology (ADMT) is now 
          judged by the "Triple Test": Legitimacy, Necessity, and Balancing. Under the EU AI Act, workplace monitoring 
          without meaningful human oversight is classified as a "High Risk" critical failure.
        </p>
      </div>

      <span className="tu-tag">BKX Compliance Lab</span>
      <h1 className="tu-title">ADMT Proportionality Scorer</h1>
      <p className="tu-subtitle">Workforce AI Auditing · Article 35 DPIA Modeling · 2026 Transparency Standards</p>
      <hr className="tu-divider" />

      <div className="tu-split-layout">
        <div className="tu-split-left">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            
            {/* Section 1: Legal Foundation */}
            <div>
              <p className="tu-label" style={{ marginBottom: '0.75rem', color: '#0d2b5e' }}>1. Legal Foundation</p>
              <div className="tu-slider-row">
                <div className="tu-slider-header">
                  <span>Legitimacy (LIA)</span>
                  <span className="tu-slider-value">{legitimacy}/10</span>
                </div>
                <input type="range" value={legitimacy} min="0" max="10" onChange={e => setLegitimacy(Number(e.target.value))} className="tu-range" />
              </div>
              <div className="tu-slider-row" style={{ marginTop: '0.8rem' }}>
                <div className="tu-slider-header">
                  <span>Necessity & Alternatives</span>
                  <span className="tu-slider-value">{necessity}/10</span>
                </div>
                <input type="range" value={necessity} min="0" max="10" onChange={e => setNecessity(Number(e.target.value))} className="tu-range" />
              </div>
            </div>

            {/* Section 2: Impact & Ethics */}
            <div>
              <p className="tu-label" style={{ marginBottom: '0.75rem', color: '#0d2b5e' }}>2. Impact & Ethics</p>
              <div className="tu-slider-row">
                <div className="tu-slider-header">
                  <span>Transparency (Worker Notice)</span>
                  <span className="tu-slider-value">{transparency}/10</span>
                </div>
                <input type="range" value={transparency} min="0" max="10" onChange={e => setTransparency(Number(e.target.value))} className="tu-range" />
              </div>
              <div className="tu-slider-row" style={{ marginTop: '0.8rem' }}>
                <div className="tu-slider-header">
                  <span>Intrusiveness (Invasiveness)</span>
                  <span className="tu-slider-value">{intrusiveness}/10</span>
                </div>
                <input type="range" value={intrusiveness} min="0" max="10" onChange={e => setIntrusiveness(Number(e.target.value))} className="tu-range" />
              </div>
            </div>

            {/* Section 3: Governance */}
            <div>
              <p className="tu-label" style={{ marginBottom: '0.75rem', color: '#0d2b5e' }}>3. Governance (AI Act 2026)</p>
              <div className="tu-slider-row">
                <div className="tu-slider-header">
                  <span>Human Oversight</span>
                  <span className="tu-slider-value">{oversight}/10</span>
                </div>
                <input type="range" value={oversight} min="0" max="10" onChange={e => setOversight(Number(e.target.value))} className="tu-range" />
              </div>
              <div className="tu-slider-row" style={{ marginTop: '0.8rem' }}>
                <div className="tu-slider-header">
                  <span>Data Minimization</span>
                  <span className="tu-slider-value">{minimization}/10</span>
                </div>
                <input type="range" value={minimization} min="0" max="10" onChange={e => setMinimization(Number(e.target.value))} className="tu-range" />
              </div>
            </div>

            <button type="button" className="tu-btn" onClick={handleReset} style={{ alignSelf: 'flex-start', marginTop: '0.5rem' }}>Reset Assessment</button>
          </div>
        </div>

        <div className="tu-split-right">
          <div className="tu-result" style={{ marginTop: 0 }}>
            <div className="tu-result-hero">
              <div className="tu-metric">
                <span className="tu-metric-label">Compliance Score</span>
                <span className="tu-metric-value">{result.overallScore}<span className="tu-metric-unit">/ 100</span></span>
              </div>
              <div className="tu-metric">
                <span className="tu-metric-label">Risk Band</span>
                <span className="tu-metric-value" style={{ color: bandColor }}>{result.riskBand}</span>
              </div>
            </div>

            {result.criticalFails.length > 0 && (
              <div style={{ marginBottom: '1.25rem', padding: '1rem', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px' }}>
                <p style={{ color: '#dc2626', fontWeight: 800, fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>⚠ Critical Compliance Gaps</p>
                <ul className="tu-result-list" style={{ marginTop: 0 }}>
                  {result.criticalFails.map((fail, i) => <li key={i} style={{ color: '#dc2626' }}>{fail}</li>)}
                </ul>
              </div>
            )}

            <div style={{ padding: '1rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
              <p className="tu-label" style={{ marginBottom: '0.5rem' }}>Strategic Recommendations</p>
              {result.recommendations.length > 0 ? (
                <ul className="tu-result-list" style={{ marginTop: 0 }}>
                  {result.recommendations.map((rec, i) => <li key={i}>{rec}</li>)}
                </ul>
              ) : (
                <p style={{ fontSize: '0.875rem', color: '#10b981' }}>✓ Baseline proportionality standards likely met.</p>
              )}
            </div>

            <article className="tu-prose" style={{ marginTop: '1.5rem', borderTop: '1px solid #e8ecf1', paddingTop: '1rem' }}>
              <h4 style={{ color: '#0d2b5e', margin: '0 0 0.5rem' }}>Legal Context</h4>
              <p style={{ fontSize: '0.78rem', color: '#4f565c', lineHeight: 1.5 }}>
                Articles 35 & 22 of the GDPR, combined with EU AI Act High-Risk mandates, require organizations to prove 
                that no "less invasive" method exists before deploying automated monitoring. 
              </p>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}
