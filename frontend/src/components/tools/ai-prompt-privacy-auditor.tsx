
import { useState, useMemo } from 'react';
import { AlertTriangle, CheckCircle, Copy, X, Zap } from 'lucide-react';
import ToolToAgencyCTA from './ToolToAgencyCTA';

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
    const score =
      criticalCount * 50 +
      highCount * 25 +
      mediumCount * 10;
    return Math.min(100, score);
  }, [criticalCount, highCount, mediumCount]);

  const riskLevel =
    riskScore >= 75
      ? 'Critical'
      : riskScore >= 50
        ? 'High'
        : riskScore >= 25
          ? 'Medium'
          : 'Low';

  const riskColor =
    riskLevel === 'Critical'
      ? 'bg-red-50 border-red-300'
      : riskLevel === 'High'
        ? 'bg-orange-50 border-orange-300'
        : riskLevel === 'Medium'
          ? 'bg-yellow-50 border-yellow-300'
          : 'bg-green-50 border-green-300';

  const riskBgColor =
    riskLevel === 'Critical'
      ? 'bg-red-100'
      : riskLevel === 'High'
        ? 'bg-orange-100'
        : riskLevel === 'Medium'
          ? 'bg-yellow-100'
          : 'bg-green-100';

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setPrompt('');
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
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-900">Paste Your Prompt</h2>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Paste the AI prompt you want to scan for PII..."
              className="w-full h-48 p-4 border border-slate-300 rounded-md text-sm font-mono focus:outline-none focus:ring-2 focus:ring-slate-900 resize-none"
            />
            <div className="flex gap-3">
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-md hover:bg-slate-800 transition-colors"
              >
                <Copy size={16} />
                {copied ? 'Copied!' : 'Copy'}
              </button>
              <button
                onClick={handleClear}
                className="flex items-center gap-2 px-4 py-2 border border-slate-300 text-slate-900 rounded-md hover:bg-slate-50 transition-colors"
              >
                <X size={16} />
                Clear
              </button>
            </div>
          </div>

          {/* Results Section */}
          {prompt && (
            <div className="space-y-6">
              <div className={`p-6 border rounded-md ${riskColor}`}>
                <div className="flex items-center gap-3 mb-3">
                  {riskLevel === 'Low' ? (
                    <CheckCircle size={24} className="text-green-600" />
                  ) : (
                    <AlertTriangle size={24} className="text-red-600" />
                  )}
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">Risk Level: {riskLevel}</h3>
                    <p className="text-sm text-slate-600">
                      {riskLevel === 'Low'
                        ? 'No significant PII detected. Safe to share.'
                        : `${piiMatches.length} PII indicator(s) found. Review before sharing.`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${riskBgColor}`}
                      style={{ width: `${riskScore}%` }}
                    />
                  </div>
                  <span className="text-sm font-semibold text-slate-900">{riskScore}</span>
                </div>
              </div>

              {piiMatches.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-900">Detected Indicators</h3>
                  <div className="space-y-2">
                    {piiMatches.map((match, idx) => (
                      <div
                        key={idx}
                        className={`p-4 border rounded-md ${
                          match.severity === 'critical'
                            ? 'bg-red-50 border-red-200'
                            : match.severity === 'high'
                              ? 'bg-orange-50 border-orange-200'
                              : 'bg-yellow-50 border-yellow-200'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-slate-900">{match.type}</span>
                            <span
                              className={`text-xs font-semibold px-2 py-1 rounded ${
                                match.severity === 'critical'
                                  ? 'bg-red-200 text-red-800'
                                  : match.severity === 'high'
                                    ? 'bg-orange-200 text-orange-800'
                                    : 'bg-yellow-200 text-yellow-800'
                              }`}
                            >
                              {match.severity.toUpperCase()}
                            </span>
                          </div>
                          <span className="text-xs text-slate-600">
                            {(match.confidence * 100).toFixed(0)}% confidence
                          </span>
                        </div>
                        <code className="block text-xs font-mono bg-white px-3 py-2 rounded border border-slate-200 text-slate-700 max-w-md truncate">
                          {match.value}
                        </code>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Summary Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-slate-100 border border-slate-300 rounded-md">
                  <div className="text-2xl font-bold text-red-600">{criticalCount}</div>
                  <div className="text-sm text-slate-600">Critical</div>
                </div>
                <div className="p-4 bg-slate-100 border border-slate-300 rounded-md">
                  <div className="text-2xl font-bold text-orange-600">{highCount}</div>
                  <div className="text-sm text-slate-600">High</div>
                </div>
                <div className="p-4 bg-slate-100 border border-slate-300 rounded-md">
                  <div className="text-2xl font-bold text-yellow-600">{mediumCount}</div>
                  <div className="text-sm text-slate-600">Medium</div>
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-blue-50 border border-blue-300 rounded-md p-4">
                <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                  <Zap size={18} className="text-blue-600" />
                  Recommendations
                </h4>
                <ul className="text-sm text-slate-700 space-y-2">
                  <li>• Redact all email addresses, phone numbers, and SSNs before sharing</li>
                  <li>• Replace API keys with placeholder text like &quot;[REDACTED_API_KEY]&quot;</li>
                  <li>• Use domain names instead of IP addresses when possible</li>
                  <li>• Review flagged content for false positives—use your judgment</li>
                  <li>• Consider using a VPN or proxy before sharing sensitive infrastructure details</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar Ad + Info */}
        <div className="lg:col-span-1 space-y-6">
          {/* Right Sidebar Ad Slot */}
          <div className="bg-slate-100 border border-slate-300 rounded-md flex flex-col items-center justify-center h-96">
            <div className="text-slate-500 text-sm text-center">300×600 Ad Slot</div>
          </div>

          {/* Quick Reference */}
          <div className="p-4 bg-slate-50 border border-slate-300 rounded-md">
            <h4 className="font-semibold text-slate-900 mb-3">Quick Reference</h4>
            <div className="space-y-2 text-sm">
              <div>
                <span className="font-semibold text-slate-900">Emails:</span>
                <p className="text-slate-600">user@example.com</p>
              </div>
              <div>
                <span className="font-semibold text-slate-900">Phone:</span>
                <p className="text-slate-600">(555) 123-4567</p>
              </div>
              <div>
                <span className="font-semibold text-slate-900">SSN:</span>
                <p className="text-slate-600">123-45-6789</p>
              </div>
              <div>
                <span className="font-semibold text-slate-900">Card:</span>
                <p className="text-slate-600">1234-5678-9012-3456</p>
              </div>
              <div>
                <span className="font-semibold text-slate-900">API Key:</span>
                <p className="text-slate-600">sk_live_4eC39HqLyjWDarht...</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-12 pt-8 border-t border-slate-300">
        <ToolToAgencyCTA 
          toolName="AI Prompt Privacy Auditor" 
          description="Implement enterprise-grade PII detection in your AI workflows with custom detection rules and compliance reporting."
        />
      </div>
    </div>
  );
}
