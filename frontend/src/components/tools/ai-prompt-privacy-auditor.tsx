import { useState, useMemo } from 'react';

// PII Detection patterns with confidence weighting
const PII_PATTERNS = [
  {
    name: 'Email Address',
    pattern: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
    confidence: 0.95,
    severity: 'high' as const,
  },
  {
    name: 'US Phone Number',
    pattern: /\b(?:\+?1[-.\s]?)?\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})\b/g,
    confidence: 0.88,
    severity: 'high' as const,
  },
  {
    name: 'Social Security Number',
    pattern: /\b(?!000|666|9\d{2})\d{3}-(?!00)\d{2}-(?!0000)\d{4}\b/g,
    confidence: 0.99,
    severity: 'critical' as const,
  },
  {
    name: 'Credit Card Number',
    pattern: /\b(?:\d{4}[-\s]?){3}\d{4}\b/g,
    confidence: 0.92,
    severity: 'critical' as const,
  },
  {
    name: 'API Key / Token',
    pattern: /(?:api[_-]?key|token|secret|auth)[:\s=]+[A-Za-z0-9_\-\.]{20,}/gi,
    confidence: 0.85,
    severity: 'critical' as const,
  },
  {
    name: 'IP Address',
    pattern: /\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/g,
    confidence: 0.8,
    severity: 'medium' as const,
  },
];

interface PiiMatch {
  type: string;
  position: number;
  value: string;
  confidence: number;
  severity: 'critical' | 'high' | 'medium';
}

export function AiPromptPrivacyAuditor() {
  const [prompt, setPrompt] = useState('');
  const [copied, setCopied] = useState(false);

  const piiMatches = useMemo(() => {
    const matches: PiiMatch[] = [];
    const seen = new Set<string>();

    PII_PATTERNS.forEach((pattern) => {
      let match;
      const regex = new RegExp(pattern.pattern.source, pattern.pattern.flags);
      while ((match = regex.exec(prompt)) !== null) {
        const key = `${pattern.name}:${match[0]}:${match.index}`;
        if (!seen.has(key)) {
          seen.add(key);
          matches.push({
            type: pattern.name,
            position: match.index,
            value: match[0],
            confidence: pattern.confidence,
            severity: pattern.severity,
          });
        }
      }
    });

    return matches.sort((a, b) => a.position - b.position);
  }, [prompt]);

  const criticalCount = piiMatches.filter((m) => m.severity === 'critical').length;
  const highCount = piiMatches.filter((m) => m.severity === 'high').length;
  const mediumCount = piiMatches.filter((m) => m.severity === 'medium').length;

  const riskScore = useMemo(() => {
    const score = criticalCount * 50 + highCount * 25 + mediumCount * 10;
    return Math.min(100, score);
  }, [criticalCount, highCount, mediumCount]);

  const riskLevel =
    riskScore >= 75 ? 'Critical' :
    riskScore >= 50 ? 'High' :
    riskScore >= 25 ? 'Medium' :
    'Low';

  const levelColor =
    riskLevel === 'Critical' ? '#dc2626' :
    riskLevel === 'High' ? '#d97706' :
    riskLevel === 'Medium' ? '#d97706' :
    '#10b981';

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="tu-wrap">
      <span className="tu-tag">BKX Data Security</span>
      <h1 className="tu-title">AI Prompt Privacy Auditor</h1>
      <p className="tu-subtitle">
        Scan your prompts for PII, API keys, and sensitive data before sending them to LLM providers.
      </p>
      <hr className="tu-divider" />

      <div className="tu-split-layout">
        <div className="tu-split-left">
          <div className="tu-field" style={{ marginBottom: '1.25rem' }}>
            <label className="tu-label">Paste Your Prompt</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Paste the AI prompt you want to scan for PII..."
              className="tu-textarea"
              style={{ minHeight: '300px' }}
            />
          </div>

          <div className="tu-btn-row">
            <button type="button" className="tu-btn tu-btn-primary" onClick={handleCopy} disabled={!prompt}>
              {copied ? 'Copied!' : 'Copy Prompt'}
            </button>
            <button type="button" className="tu-btn" onClick={() => setPrompt('')} disabled={!prompt}>Clear</button>
          </div>

          <div className="tu-aeo" style={{ marginTop: '2rem' }}>
            <p>
              <strong>Privacy Standard:</strong> Enterprise LLM deployments often leak PII via "in-context" data. 
              This auditor uses deterministic regex patterns to detect typical leaks like SSNs and API keys which 
              form the base for GDPR Article 32 security controls.
            </p>
          </div>
        </div>

        <div className="tu-split-right">
          {prompt ? (
            <div className="tu-result tu-animate" style={{ marginTop: 0 }}>
              <div className="tu-result-hero">
                <div className="tu-metric">
                  <span className="tu-metric-label">Risk Level</span>
                  <span className="tu-metric-value" style={{ color: levelColor }}>
                    {riskLevel}
                  </span>
                </div>
                <div className="tu-metric">
                  <span className="tu-metric-label">Risk Score</span>
                  <span className="tu-metric-value">{riskScore}<span className="tu-metric-unit">/ 100</span></span>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.8rem', marginBottom: '1.25rem' }}>
                <div style={{ padding: '0.6rem', background: '#fff', border: '1px solid #d4d9de', borderRadius: '8px', textAlign: 'center' }}>
                  <span style={{ display: 'block', fontSize: '1.2rem', fontWeight: 800, color: '#dc2626' }}>{criticalCount}</span>
                  <span style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', color: '#4f565c' }}>Critical</span>
                </div>
                <div style={{ padding: '0.6rem', background: '#fff', border: '1px solid #d4d9de', borderRadius: '8px', textAlign: 'center' }}>
                  <span style={{ display: 'block', fontSize: '1.2rem', fontWeight: 800, color: '#d97706' }}>{highCount}</span>
                  <span style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', color: '#4f565c' }}>High</span>
                </div>
                <div style={{ padding: '0.6rem', background: '#fff', border: '1px solid #d4d9de', borderRadius: '8px', textAlign: 'center' }}>
                  <span style={{ display: 'block', fontSize: '1.2rem', fontWeight: 800, color: '#4f565c' }}>{mediumCount}</span>
                  <span style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', color: '#4f565c' }}>Medium</span>
                </div>
              </div>

              {piiMatches.length > 0 && (
                <div className="tu-table-wrap">
                  <table className="tu-table">
                    <thead>
                      <tr>
                        <th>Type</th>
                        <th>Severity</th>
                        <th>Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {piiMatches.map((match, idx) => (
                        <tr key={idx}>
                          <td style={{ fontWeight: 600 }}>{match.type}</td>
                          <td>
                            <span className={`tu-badge ${match.severity === 'critical' ? 'tu-badge-gap' : match.severity === 'high' ? 'tu-badge-warn' : 'tu-badge-opt'}`}>
                              {match.severity}
                            </span>
                          </td>
                          <td style={{ fontFamily: 'monospace', fontSize: '0.75rem' }}>{match.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {piiMatches.length > 0 && (
                <div style={{ padding: '0.875rem', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', marginTop: '1rem' }}>
                  <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#991b1b', marginBottom: '0.4rem', textTransform: 'uppercase' }}>Recommendations</p>
                  <ul className="tu-result-list" style={{ marginTop: 0 }}>
                    <li style={{ color: '#991b1b', fontSize: '0.8rem' }}>Redact PII before sharing with third-party model providers.</li>
                    <li style={{ color: '#991b1b', fontSize: '0.8rem' }}>Replace secrets/API keys with placeholders.</li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div style={{ 
              height: '100%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              background: '#f8fafc', 
              border: '2px dashed #d4d9de', 
              borderRadius: '10px',
              padding: '2rem',
              color: '#4f565c',
              textAlign: 'center'
            }}>
              <div>
                <span style={{ fontSize: '2rem', display: 'block', marginBottom: '1rem' }}>🔍</span>
                <p style={{ fontSize: '0.9rem' }}>Enter text or code on the left to start the privacy audit.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
