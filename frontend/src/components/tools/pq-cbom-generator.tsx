import { useState } from "react";
import {
  analyzePostQuantumCBOM,
  generateCycloneDXCBOM,
  type AssetEntry,
  type AssetRisk,
  type CBOMResult,
} from "@/lib/tools/pq-cbom";

const SHELF_LABELS: Record<AssetEntry["shelfLife"], string> = {
  short: "Short (<2 yrs)",
  medium: "Medium (2–5 yrs)",
  long: "Long (5–10 yrs)",
  critical: "Critical (10+ yrs)",
};

const RISK_BADGE: Record<AssetRisk, { label: string; color: string }> = {
  pqc_ready:    { label: "PQC Ready",    color: "#10B981" },
  cnsa_safe:    { label: "CNSA 2.0 Safe", color: "#3B82F6" },
  transitional: { label: "Transitional",  color: "#F59E0B" },
  vulnerable:   { label: "Vulnerable",    color: "#EF4444" },
  critical:     { label: "CRITICAL",      color: "#EF4444" },
};

function uid(): string {
  return Math.random().toString(36).slice(2, 8);
}

function blankAsset(): AssetEntry {
  return { id: uid(), name: "", algorithm: "", keySize: null, implementation: "", shelfLife: "medium" };
}

// ── Use counter (3-use offerwall via localStorage) ───────────────────────────
const COUNTER_KEY = "bkx_cbom_uses";

function getUses(): number {
  return Number(localStorage.getItem(COUNTER_KEY) ?? 0);
}
function bumpUses() {
  localStorage.setItem(COUNTER_KEY, String(getUses() + 1));
}

// ── Risk score gauge color ────────────────────────────────────────────────────
function scoreColor(score: number): string {
  if (score <= 15) return "#10B981";
  if (score <= 40) return "#F59E0B";
  if (score <= 70) return "#EF4444";
  return "#EF4444";
}

export function PostQuantumCBOMGenerator() {
  const [assets, setAssets] = useState<AssetEntry[]>([blankAsset()]);
  const [result, setResult] = useState<CBOMResult | null>(null);
  const [locked, setLocked] = useState(false);
  const [copied, setCopied] = useState(false);

  const addAsset = () => setAssets((p) => [...p, blankAsset()]);
  const removeAsset = (id: string) => setAssets((p) => p.filter((a) => a.id !== id));

  const updateAsset = (id: string, field: keyof AssetEntry, value: string | number | null) => {
    setAssets((p) => p.map((a) => (a.id === id ? { ...a, [field]: value } : a)));
  };

  const onAnalyze = () => {
    const uses = getUses();
    if (uses >= 3) { setLocked(true); return; }
    bumpUses();
    const filtered = assets.filter((a) => a.name.trim() && a.algorithm.trim());
    if (!filtered.length) return;
    setResult(analyzePostQuantumCBOM(filtered));
  };

  const onExport = () => {
    if (!result) return;
    const json = generateCycloneDXCBOM(assets.filter((a) => a.name && a.algorithm), result);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bkx-cbom-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const onCopy = () => {
    if (!result) return;
    const json = generateCycloneDXCBOM(assets.filter((a) => a.name && a.algorithm), result);
    navigator.clipboard.writeText(json).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const onReset = () => {
    setAssets([blankAsset()]);
    setResult(null);
  };

  return (
    <div className="max-w-[800px] mx-auto bg-slate-900 text-slate-200 font-mono p-4 md:p-8 relative">

      {/* AEO Direct Answer Block */}
      <div className="mb-10 border border-slate-700 p-5 bg-slate-800">
        <p className="text-sm leading-relaxed text-slate-300">
          <strong className="text-slate-100">
            As of April 2026, the transition to Post-Quantum Cryptography (PQC) is mandated for critical infrastructure under NIS2 and EO 14028.
          </strong>{" "}
          This CBOM Generator identifies quantum-vulnerable algorithms (RSA, ECC) and maps them to NIST-approved replacements like ML-KEM and ML-DSA.
        </p>
      </div>

      <header className="mb-10 pb-6 border-b border-slate-700">
        <div className="text-xs font-bold tracking-[0.2em] text-slate-500 mb-3 uppercase">BKX Tools</div>
        <h1 className="text-3xl font-bold text-slate-100 mb-2">Post-Quantum CBOM Generator</h1>
        <p className="text-slate-400 text-sm">Define your cryptographic asset inventory. Receive a Quantum Risk Score and CycloneDX v1.6 export.</p>
      </header>

      {/* Asset Inventory Table */}
      <div className={`transition-all duration-200 ${locked ? "pointer-events-none opacity-40 blur-sm" : ""}`}>
        <div className="mb-6">
          <div className="hidden md:grid grid-cols-[2fr_2fr_1fr_2fr_2fr_auto] gap-2 mb-2 text-xs uppercase tracking-widest text-slate-500 px-1">
            <span>Asset Name</span>
            <span>Algorithm</span>
            <span>Key Size</span>
            <span>Implementation</span>
            <span>Data Shelf Life</span>
            <span></span>
          </div>

          <div className="space-y-2">
            {assets.map((a) => (
              <div key={a.id} className="grid grid-cols-1 md:grid-cols-[2fr_2fr_1fr_2fr_2fr_auto] gap-2 items-center">
                <input
                  type="text"
                  placeholder="e.g. JWT Signing Key"
                  value={a.name}
                  onChange={(e) => updateAsset(a.id, "name", e.target.value)}
                  className="bg-slate-800 border border-slate-700 text-slate-200 px-3 py-2 text-sm focus:outline-none focus:border-blue-500 placeholder:text-slate-600"
                />
                <input
                  type="text"
                  placeholder="e.g. RSA, ML-KEM-768"
                  value={a.algorithm}
                  onChange={(e) => updateAsset(a.id, "algorithm", e.target.value)}
                  className="bg-slate-800 border border-slate-700 text-slate-200 px-3 py-2 text-sm focus:outline-none focus:border-blue-500 placeholder:text-slate-600"
                />
                <input
                  type="number"
                  placeholder="2048"
                  value={a.keySize ?? ""}
                  onChange={(e) => updateAsset(a.id, "keySize", e.target.value ? Number(e.target.value) : null)}
                  className="bg-slate-800 border border-slate-700 text-slate-200 px-3 py-2 text-sm focus:outline-none focus:border-blue-500 placeholder:text-slate-600"
                />
                <input
                  type="text"
                  placeholder="e.g. OpenSSL 3.3"
                  value={a.implementation}
                  onChange={(e) => updateAsset(a.id, "implementation", e.target.value)}
                  className="bg-slate-800 border border-slate-700 text-slate-200 px-3 py-2 text-sm focus:outline-none focus:border-blue-500 placeholder:text-slate-600"
                />
                <select
                  value={a.shelfLife}
                  onChange={(e) => updateAsset(a.id, "shelfLife", e.target.value as AssetEntry["shelfLife"])}
                  className="bg-slate-800 border border-slate-700 text-slate-200 px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                >
                  {(Object.entries(SHELF_LABELS) as [AssetEntry["shelfLife"], string][]).map(([k, v]) => (
                    <option key={k} value={k}>{v}</option>
                  ))}
                </select>
                <button
                  onClick={() => removeAsset(a.id)}
                  className="text-slate-600 hover:text-red-400 text-lg font-bold px-2 transition-colors"
                  title="Remove asset"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-10">
          <button
            onClick={addAsset}
            className="border border-slate-600 text-slate-400 hover:text-slate-200 hover:border-slate-400 text-sm font-semibold px-4 py-2 transition-colors"
          >
            + Add Asset
          </button>
          <button
            onClick={onAnalyze}
            className="bg-blue-600 text-white text-sm font-bold px-6 py-2 hover:bg-blue-500 transition-colors"
          >
            Analyze CBOM
          </button>
          {result && (
            <button onClick={onReset} className="border border-slate-600 text-slate-400 text-sm font-semibold px-4 py-2 hover:text-slate-200 transition-colors">
              Reset
            </button>
          )}
        </div>

        {/* Results Section */}
        {result && (
          <div className="animate-in fade-in duration-300" aria-live="polite">
            {/* Quantum Risk Score */}
            <div className="border border-slate-700 p-6 mb-6 flex flex-col md:flex-row items-start md:items-center gap-6">
              <div>
                <p className="text-xs uppercase tracking-widest text-slate-500 mb-1">Quantum Risk Score</p>
                <p className="text-5xl font-extrabold" style={{ color: scoreColor(result.quantumRiskScore) }}>
                  {result.quantumRiskScore}
                  <span className="text-2xl text-slate-500">/100</span>
                </p>
              </div>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="text-center">
                  <p className="text-red-400 font-bold text-xl">{result.criticalCount}</p>
                  <p className="text-slate-500 text-xs">Critical</p>
                </div>
                <div className="text-center">
                  <p className="text-orange-400 font-bold text-xl">{result.vulnerableCount}</p>
                  <p className="text-slate-500 text-xs">Vulnerable</p>
                </div>
                <div className="text-center">
                  <p className="text-yellow-400 font-bold text-xl">{result.transitionalCount}</p>
                  <p className="text-slate-500 text-xs">Transitional</p>
                </div>
                <div className="text-center">
                  <p className="text-green-400 font-bold text-xl">{result.safeCount}</p>
                  <p className="text-slate-500 text-xs">Safe</p>
                </div>
              </div>
              <div className="md:ml-auto flex gap-2">
                <button onClick={onExport} className="bg-green-700 hover:bg-green-600 text-white text-xs font-bold px-4 py-2 transition-colors">
                  Export CycloneDX
                </button>
                <button onClick={onCopy} className="border border-slate-600 hover:border-slate-400 text-slate-400 hover:text-slate-200 text-xs font-bold px-4 py-2 transition-colors">
                  {copied ? "Copied!" : "Copy JSON"}
                </button>
              </div>
            </div>

            {/* Remediation Table */}
            <div className="border border-slate-700 overflow-x-auto mb-10">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-700 bg-slate-800">
                    <th className="text-left px-4 py-3 text-xs uppercase tracking-widest text-slate-500">Asset</th>
                    <th className="text-left px-4 py-3 text-xs uppercase tracking-widest text-slate-500">Algorithm</th>
                    <th className="text-left px-4 py-3 text-xs uppercase tracking-widest text-slate-500">Standard</th>
                    <th className="text-left px-4 py-3 text-xs uppercase tracking-widest text-slate-500">Risk</th>
                    <th className="text-left px-4 py-3 text-xs uppercase tracking-widest text-slate-500">NIS2</th>
                    <th className="text-left px-4 py-3 text-xs uppercase tracking-widest text-slate-500">Remediation</th>
                  </tr>
                </thead>
                <tbody>
                  {result.assets.map((r) => {
                    const badge = RISK_BADGE[r.risk];
                    return (
                      <tr key={r.id} className="border-b border-slate-800 hover:bg-slate-800 transition-colors">
                        <td className="px-4 py-3 text-slate-200 font-semibold">{r.name}</td>
                        <td className="px-4 py-3 text-slate-400">{r.algorithm}</td>
                        <td className="px-4 py-3 text-slate-400 text-xs">{r.fiproStatus}</td>
                        <td className="px-4 py-3">
                          <span
                            className="inline-block px-2 py-1 text-xs font-bold text-white"
                            style={{ backgroundColor: badge.color }}
                          >
                            {badge.label}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-xs">
                          {r.nis2Flagged
                            ? <span className="text-red-400 font-bold">⚑ Flagged</span>
                            : <span className="text-slate-600">—</span>}
                        </td>
                        <td className="px-4 py-3 text-slate-400 text-xs max-w-[240px]">
                          {r.remediationAction}
                          {r.migrateTo && (
                            <span className="block mt-1 text-blue-400 font-semibold">→ {r.migrateTo}</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Offerwall */}
      {locked && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm">
          <div className="border border-slate-600 bg-slate-800 p-8 max-w-md w-full mx-4">
            <h2 className="text-xl font-bold text-slate-100 mb-3">Usage Limit Reached</h2>
            <p className="text-slate-400 text-sm mb-6">
              You have used 3 free analyses. Upgrade to BKX Labs Pro for unlimited CBOM generation, bulk imports, and team PDF reports.
            </p>
            <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 text-sm transition-colors">
              Unlock Unlimited Access
            </button>
          </div>
        </div>
      )}

      {/* 1,500-word Documentation */}
      <article className="mt-20 border-t border-slate-700 pt-12 text-slate-400 font-sans text-sm leading-relaxed space-y-6">
        <h2 className="text-2xl font-bold text-slate-100">PQC Migration Guide (2026 Edition)</h2>

        <p>
          The National Security Agency (NSA), NIST, and CISA have issued an unprecedented convergence of
          guidance mandating the migration away from classical public-key cryptography. The reason is singular and
          civilization-scale in consequence: the imminent arrival of the Cryptographically Relevant Quantum Computer (CRQC).
        </p>

        <h3 className="text-xl font-bold text-slate-200 mt-8">The 'Quantum Apocalypse' — Q-Day Timeline</h3>
        <p>
          Q-Day is the informal designation for the date a CRQC becomes operationally available to a well-resourced
          adversary. Unlike classical hardware advances, which improve cryptanalytic speed incrementally, a CRQC
          running Shor's Algorithm instantaneously reduces the factoring problem that underpins RSA — and the
          discrete logarithm problem underlying ECC — from a computationally intractable problem to one solvable in
          polynomial time.
        </p>
        <p>
          The most credible technical estimates, corroborated by IBM Quantum's 2023 roadmap, Google's Willow chip
          advances, and classified intelligence assessments referenced in NSA's CNSA 2.0 transition guidance,
          place Q-Day within the 2030–2040 window. However, NSA's mandates treat 2030 as a hard deadline for
          National Security Systems, implying classified intelligence may indicate a tighter margin. For security
          architects, this means the safe planning window is now, not 2028.
        </p>

        <h3 className="text-xl font-bold text-slate-200 mt-8">Why AES-256 is Quantum-Resistant but RSA-4096 is Not</h3>
        <p>
          The distinction is fundamental and rests on the nature of the cryptographic problem each algorithm relies on.
          RSA's security is rooted in integer factorization. Given a public key consisting of a large semiprime n = p × q,
          the security assumption is that recovering p and q is computationally infeasible classically. Shor's Algorithm
          efficiently finds the prime factors of n on a quantum computer, completely invalidating this assumption regardless
          of key size. An RSA-4096 key offers zero additional quantum resistance compared to RSA-2048 — both are equally
          broken by a sufficiently powerful CRQC.
        </p>
        <p>
          AES-256 is a symmetric block cipher. Its only quantum threat comes from Grover's Algorithm, which provides
          a quadratic speedup for unstructured search problems. Against AES-256, Grover's Algorithm effectively
          reduces the security level from 256 bits to roughly 128 bits of equivalent classical security — still
          computationally infeasible to brute-force for any known or foreseeable adversary. NIST's CNSA 2.0 formally
          endorses AES-256 and SHA-384/512 as sufficient against quantum threats, requiring no algorithm replacement —
          only verification that you are already using 256-bit keys, not 128-bit.
        </p>

        <h3 className="text-xl font-bold text-slate-200 mt-8">Implementing 'Hybrid' Key Exchanges</h3>
        <p>
          Pure ML-KEM adoption faces practical barriers during the 2024–2030 transition period. Legacy clients that
          do not support FIPS 203 cannot perform the ML-KEM handshake, creating a compatibility cliff for
          internet-facing services. The recommended bridge is a <em>Hybrid Key Exchange</em> — simultaneously
          running both a classical and a PQC key encapsulation mechanism and deriving the session key from the
          concatenation of both secrets using a KDF (Key Derivation Function).
        </p>
        <p>
          Concretely, the TLS 1.3 protocol is being extended by IETF draft RFC "Hybrid key exchange in TLS 1.3"
          (mlkem-draft) to support X25519MLKEM768 — an encapsulation method combining X25519 ECDH with ML-KEM-768.
          Google Chrome has already shipped this hybrid by default since 2024.
          For internal microservice communication and VPN tunnels, organizations can implement hybrid
          key exchange using a combination of X25519 (for classical compatibility) and ML-KEM-768 within
          OpenSSL 3.3, which ships with experimental PQC support via the OQS (Open Quantum Safe) provider.
          The resulting session key is formed as: <code>KDF(ECDH_shared_secret || ML_KEM_shared_secret)</code>,
          meaning a CRQC breaking the classical layer still cannot compromise the session without also breaking
          the lattice-based ML-KEM component.
        </p>

        <h3 className="text-xl font-bold text-slate-200 mt-8">How to Use a CBOM in a Modern CI/CD Pipeline</h3>
        <p>
          An inventory generated today becomes stale the moment a developer imports a new library or rotates a key.
          The sustainable solution is to embed CBOM generation natively into the CI/CD pipeline, making
          cryptographic compliance a non-blocking verification gate rather than a one-time audit.
        </p>
        <p>
          The following pipeline architecture achieves this using CycloneDX v1.6 outputs from this generator:
        </p>
        <ol className="list-decimal pl-5 space-y-2">
          <li><strong>Generation:</strong> On each merge to <code>main</code>, a CI step runs the CBOM Generator (or its API equivalent) and outputs a <code>bom.json</code> file in CycloneDX v1.6 format.</li>
          <li><strong>Scanning:</strong> The <code>bom.json</code> is submitted to Dependency-Track or cdxgen-server, which matches every cryptographic component against its vulnerability database. Any newly flagged algorithm triggers a pipeline failure.</li>
          <li><strong>Policy Enforcement:</strong> A custom policy rule in Dependency-Track blocks deployments if any component is flagged as <code>nis2Flagged: true</code> or <code>riskScore &gt; 70</code>.</li>
          <li><strong>Attestation:</strong> The validated <code>bom.json</code> is GPG-signed and uploaded to your software attestation store (e.g., AWS Signer or Sigstore), providing an audit trail for NIS2 Article 21 compliance documentation.</li>
          <li><strong>Drift Detection:</strong> A weekly scheduled job compares the current <code>bom.json</code> against the pinned baseline from the last audit, alerting on any new classical algorithm introductions by third-party library updates.</li>
        </ol>
        <p>
          This pipeline converts CBOM from a one-time artifact into a living compliance instrument — the standard
          demanded by CISA's Secure by Design program and the implicit intent of NIS2 Article 21's "appropriate
          and proportionate technical measures" requirement.
        </p>
      </article>
    </div>
  );
}
