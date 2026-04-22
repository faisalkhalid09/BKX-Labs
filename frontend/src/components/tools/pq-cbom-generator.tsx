import { useState, useEffect } from "react";
import { analyzePostQuantumCBOM } from "@/lib/tools/pq-cbom";

type Dependency = { name: string; version: string; algorithm?: string };

export function PostQuantumCBOMGenerator() {
  const [deps, setDeps] = useState<Dependency[]>([
    { name: "openssl", version: "3.0.0", algorithm: "RSA" },
    { name: "aws-sdk", version: "2.1.0", algorithm: "AES-256" },
  ]);
  const [jsonInput, setJsonInput] = useState('{"dependencies": []}');
  const [result, setResult] = useState<ReturnType<typeof analyzePostQuantumCBOM> | null>(null);
  const [mode, setMode] = useState<"form" | "json">("form");
  
  // Monetization Offerwall state
  const [uses, setUses] = useState(0);
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    const savedUses = localStorage.getItem("bkx_tool_uses_cbom");
    if (savedUses) {
      const parsed = parseInt(savedUses, 10);
      setUses(parsed);
      if (parsed >= 3) {
        setLocked(true);
      }
    }
  }, []);

  const trackUsage = () => {
    const newUses = uses + 1;
    setUses(newUses);
    localStorage.setItem("bkx_tool_uses_cbom", newUses.toString());
    if (newUses >= 3) {
      setLocked(true);
    }
  };

  const onAddDep = () => {
    setDeps([...deps, { name: "", version: "1.0.0", algorithm: "RSA" }]);
  };

  const onUpdateDep = (idx: number, field: keyof Dependency, value: string) => {
    const updated = [...deps];
    updated[idx] = { ...updated[idx], [field]: value };
    setDeps(updated);
  };

  const onRemoveDep = (idx: number) => {
    setDeps(deps.filter((_, i) => i !== idx));
  };

  const onAnalyzeForm = () => {
    if (uses >= 3) { setLocked(true); return; }
    trackUsage();
    const filtered = deps.filter((d) => d.name.trim());
    const res = analyzePostQuantumCBOM({ dependencies: filtered });
    setResult(res);
  };

  const onParseJson = () => {
    if (uses >= 3) { setLocked(true); return; }
    trackUsage();
    try {
      const parsed = JSON.parse(jsonInput);
      if (!parsed.dependencies || !Array.isArray(parsed.dependencies)) {
        alert("JSON must contain 'dependencies' array");
        return;
      }
      const res = analyzePostQuantumCBOM(parsed);
      setResult(res);
    } catch (e) {
      alert(`JSON parse error: ${e}`);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto font-sans text-[#161a1d] leading-relaxed relative">
      
      {/* Main Content Column */}
      <div className="flex-1 w-full bg-white shadow-sm p-6 md:p-10 rounded-lg border border-[#d4d9de] relative">
        
        {/* Ghost Brand */}
        <div className="text-xs font-bold tracking-[0.15em] text-[#4f565c] mb-6 uppercase">
          BKX Tools
        </div>
        
        {/* Ad Slot: Top Banner (0 CLS) */}
        <div className="w-full h-[90px] bg-[#f8f8f6] border border-[#d4d9de] mb-8 flex items-center justify-center text-[#4f565c] text-sm hidden md:flex">
          [Ad Slot: Top Banner - 728x90]
        </div>

        {/* AEO HEADER */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4 text-[#105da8]">
            Post-Quantum CBOM Generator
          </h1>
          <p className="text-lg md:text-xl font-medium">
            <strong>Generate a 2026-compliant Cryptographic Bill of Materials to identify quantum-vulnerable dependencies.</strong>
            <br />
            <span className="text-[#4f565c] text-base mt-2 block">
              This tool parses JSON dependency lists and cross-references against NIST FIPS 203 (ML-KEM), FIPS 204 (ML-DSA) and CNSA 2.0 readiness to map vulnerabilities and generate a migration roadmap.
            </span>
          </p>
        </header>

        {/* Tool Interaction Boundary */}
        <div className={`transition-all duration-300 ${locked ? "blur-sm pointer-events-none opacity-50" : ""}`}>
          <div className="mt-4 flex gap-2">
            <button
              type="button"
              className={`px-4 py-2 text-sm font-semibold rounded transition-colors ${
                mode === "form"
                  ? "bg-[#105da8] text-white"
                  : "bg-white border border-[#d4d9de] text-[#161a1d] hover:bg-gray-50"
              }`}
              onClick={() => setMode("form")}
            >
              Visual Builder
            </button>
            <button
              type="button"
              className={`px-4 py-2 text-sm font-semibold rounded transition-colors ${
                mode === "json"
                  ? "bg-[#105da8] text-white"
                  : "bg-white border border-[#d4d9de] text-[#161a1d] hover:bg-gray-50"
              }`}
              onClick={() => setMode("json")}
            >
              JSON Input
            </button>
          </div>

          <div className="mt-6 border border-[#d4d9de] rounded-md p-4 bg-[#f8f8f6]">
            {mode === "form" ? (
              <>
                <div className="grid gap-3">
                  {deps.map((dep, idx) => (
                    <div key={idx} className="flex flex-wrap md:flex-nowrap gap-2 items-center">
                      <input
                        type="text"
                        placeholder="Library name (e.g. openssl)"
                        value={dep.name}
                        onChange={(e) => onUpdateDep(idx, "name", e.target.value)}
                        className="flex-1 rounded border border-[#d4d9de] px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#105da8]"
                      />
                      <input
                        type="text"
                        placeholder="Version"
                        value={dep.version}
                        onChange={(e) => onUpdateDep(idx, "version", e.target.value)}
                        className="w-24 rounded border border-[#d4d9de] px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#105da8]"
                      />
                      <select
                        value={dep.algorithm || ""}
                        onChange={(e) => onUpdateDep(idx, "algorithm", e.target.value)}
                        className="w-40 rounded border border-[#d4d9de] px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-[#105da8]"
                      >
                        <optgroup label="Classical (At Risk)">
                          <option>RSA</option>
                          <option>ECC</option>
                          <option>ECDSA</option>
                        </optgroup>
                        <optgroup label="CNSA 2.0 (Symmetric)">
                          <option>AES-128</option>
                          <option value="AES-256">AES-256 (Safe)</option>
                          <option value="SHA384">SHA-384 (Safe)</option>
                          <option value="SHA512">SHA-512 (Safe)</option>
                        </optgroup>
                        <optgroup label="NIST PQC (Standard)">
                          <option value="ML-KEM">ML-KEM (FIPS 203)</option>
                          <option value="ML-DSA">ML-DSA (FIPS 204)</option>
                          <option value="SLH-DSA">SLH-DSA (FIPS 205)</option>
                        </optgroup>
                      </select>
                      <button
                        type="button"
                        onClick={() => onRemoveDep(idx)}
                        className="px-3 py-2 text-sm font-semibold text-red-600 rounded hover:bg-red-50"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex gap-3">
                  <button type="button" className="px-4 py-2 text-sm font-semibold rounded border border-[#d4d9de] hover:bg-gray-50" onClick={onAddDep}>
                    + Add Dependency
                  </button>
                  <button type="button" className="px-4 py-2 text-sm font-bold rounded bg-[#105da8] text-white hover:bg-[#0d4a87] shadow-sm" onClick={onAnalyzeForm}>
                    Analyze CBOM
                  </button>
                </div>
              </>
            ) : (
              <>
                <textarea
                  value={jsonInput}
                  onChange={(e) => setJsonInput(e.target.value)}
                  placeholder='{"dependencies": [{"name": "openssl", "version": "3.0", "algorithm": "RSA"}]}'
                  className="w-full rounded border border-[#d4d9de] px-3 py-3 text-sm font-mono focus:outline-none focus:ring-1 focus:ring-[#105da8]"
                  rows={8}
                />
                <button type="button" className="px-4 py-2 mt-4 text-sm font-bold rounded bg-[#105da8] text-white hover:bg-[#0d4a87] shadow-sm" onClick={onParseJson}>
                  Analyze JSON
                </button>
              </>
            )}
          </div>

          {result && (
            <div className="mt-8 p-6 border-2 border-[#105da8] rounded-md bg-[#f0f6fc]" aria-live="polite">
              <div className="flex border-b border-[#c8e1ff] pb-4 mb-4 gap-4">
                <div className="flex-1">
                  <p className="text-xs uppercase tracking-[0.08em] text-[#4f565c] font-bold">PQC Readiness Score</p>
                  <p className="mt-1 text-4xl font-extrabold text-[#105da8]">{result.readinessPercentage}%</p>
                </div>
                <div className="flex-1">
                  <p className="text-xs uppercase tracking-[0.08em] text-[#4f565c] font-bold">Asset Breakdown</p>
                  <p className="mt-1 text-sm text-[#4f565c] leading-tight mt-2">
                    <strong className="text-green-700">{result.pqcReadyCount}</strong> PQC Standard<br/>
                    <strong className="text-blue-700">{result.pqcAwareCount}</strong> CNSA 2.0 / Symmetric<br/>
                    <strong className="text-red-700">{result.notYetReady.length}</strong> Legacy (At-Risk)
                  </p>
                </div>
              </div>
              
              {result.notYetReady.length > 0 && (
                <div className="mb-4">
                  <h3 className="font-bold text-sm text-red-800">Critical: Not Yet PQC-Ready</h3>
                  <ul className="mt-2 list-disc pl-5 text-sm text-[#161a1d] space-y-1">
                    {result.notYetReady.map((item: string) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
              {result.recommendations.length > 0 && (
                <div>
                  <h3 className="font-bold text-sm text-[#105da8]">Migration Recommendations</h3>
                  <ul className="mt-2 list-disc pl-5 text-sm text-[#161a1d] space-y-1">
                    {result.recommendations.map((rec: string) => (
                      <li key={rec}>{rec}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Monetization Offerwall Modal */}
        {locked && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm rounded-lg p-6">
            <div className="bg-white p-8 rounded-lg shadow-xl border border-[#d4d9de] max-w-md text-center">
              <h2 className="text-2xl font-bold mb-3 text-[#105da8]">Usage Limit Reached</h2>
              <p className="text-[#4f565c] mb-6">
                You have reached the 3-use limit for our free tools. Upgrade your plan to get unlimited API access and full PDF reports.
              </p>
              <button className="w-full px-4 py-3 text-sm font-bold rounded bg-[#105da8] text-white hover:bg-[#0d4a87] shadow-md">
                Unlock Unlimited Access
              </button>
              <p className="mt-4 text-xs font-semibold text-gray-400 uppercase tracking-widest">BKX Labs Pro</p>
            </div>
          </div>
        )}

        {/* Ad Slot: Mid Content (0 CLS) */}
        <div className="w-full h-[250px] bg-[#f8f8f6] border border-[#d4d9de] my-10 flex items-center justify-center text-[#4f565c] text-sm">
          [Ad Slot: Mid-Result - 300x250]
        </div>

        {/* Documentation Surface: 1,200+ words */}
        <article className="mt-12 prose prose-[#161a1d] max-w-none prose-headings:text-[#105da8] prose-h2:border-b prose-h2:pb-2">
          <h2>NIST PQC Standards Overview</h2>
          <p>
            The transition to Post-Quantum Cryptography (PQC) represents a fundamental shift in how digital security is architected. 
            In August 2024, the National Institute of Standards and Technology (NIST) finalized its first set of primary PQC standards, designed to withstand the decryption capabilities of future cryptographically-relevant quantum computers (CRQC). The finalized standards include Federal Information Processing Standards (FIPS) 203, 204, and 205.
          </p>
          <p>
            <strong>FIPS 203 (ML-KEM)</strong> specifies a key encapsulation mechanism based on the CRYSTALS-Kyber algorithm. It replaces the key exchange functionalities historically handled by RSA and Diffie-Hellman algorithms. ML-KEM relies on the mathematical difficulty of the Module Learning with Errors (MLWE) problem.
          </p>
          <p>
            <strong>FIPS 204 (ML-DSA)</strong> provides digital signature capabilities based on the CRYSTALS-Dilithium algorithm. This is the primary recommendation for authenticating identities and ensuring the integrity of digital documents, replacing RSA and ECDSA signatures.
          </p>
          <p>
            <strong>FIPS 205 (SLH-DSA)</strong> offers a stateless hash-based digital signature algorithm (derived from SPHINCS+). While larger in signature size and slower in verification compared to ML-DSA, it serves as a conservative backup relying on different mathematical properties (hashing security) rather than lattice equations.
          </p>
          <p>
            This Cryptographic Bill of Materials (CBOM) generator evaluates software dependencies against these exact standards. The importance of generating a CBOM is parallel to a standard Software Bill of Materials (SBOM)—it provides visibility into which cryptographic primitives are used, deeply nested within third-party libraries, enabling security teams to prioritize deprecation of algorithms vulnerable to Shor's Algorithm.
          </p>

          <h2>Crypto-Agility in 2026</h2>
          <p>
            By 2026, regulatory environments and compliance architectures mandate moving beyond merely knowing what algorithms are used, towards achieving operational <em>crypto-agility</em>. Crypto-agility is the capability of an organization's systems to swap cryptographic primitives and protocols without disrupting existing system infrastructure or requiring significant codebase overhauls.
          </p>
          <p>
            The realization of "harvest now, decrypt later" attacks means that any encrypted data captured today—such as health records, national security intelligence, and long-lived intellectual property—can be stored by adversaries until a CRQC is built. The mandate for crypto-agility is twofold: first, the capability to seamlessly update algorithms, and second, the capacity to operate in hybrid states. 
          </p>
          <p>
            Operating in a hybrid state implies that during the migration phase (estimated to span well beyond 2030 for complex infrastructures), systems must support both classical algorithms (for backwards compatibility with legacy clients) and modern FIPS 203/204 algorithms. Your CBOM output highlights dependencies that currently restrict this agility, specifically flagging non-upgradable implementations of RSA, ECC, and DSA.
          </p>

          <h2>Mapping Classical to Post-Quantum Algorithms</h2>
          <p>
            The migration path requires specific mapping of deprecated cryptographic components to their quantum-resistant counterparts. The Commercial National Security Algorithm (CNSA) Suite 2.0 released by the NSA outlines definitive transition guidelines for National Security Systems, which are heavily adopted by the private sector standardizations.
          </p>
          <p>
            <strong>Symmetric Cryptography & Hashing:</strong> Unlike asymmetric public-key cryptography, symmetric cryptography and hash functions are not fundamentally broken by Shor's algorithm, although they are weakened by Grover's algorithm. 
            CNSA 2.0 mandates the use of AES-256 for symmetric encryption (upgrading from AES-128) and SHA-384 or SHA-512 for hashing (upgrading from SHA-256). The provided CBOM analyzer natively recognizes these as "CNSA 2.0 / Symmetric Safe" implementations.
          </p>
          <p>
            <strong>Key Establishment:</strong> Classical mechanisms like RSA key transport, Finite Field Diffie-Hellman (FFDH), and Elliptic Curve Diffie-Hellman (ECDH) must be transitioned to ML-KEM. Depending on the library mapped in the CBOM, organizations may use hybrid key encapsulation mechanisms (binding an ML-KEM key with an ECDH key) as recommended by NIST SP 800-227.
          </p>
          <p>
            <strong>Digital Signatures:</strong> RSA and Elliptic Curve Digital Signature Algorithm (ECDSA) must be migrated to ML-DSA or SLH-DSA. For stateful signature scenarios like firmware updates, LMS (Leighton-Micali Signature) and XMSS (eXtended Merkle Signature Scheme) are also supported mappings within the CBOM evaluation model.
          </p>
          <p>
            Establishing an automated mechanism for tracking these transitions within your CI/CD pipelines ensures that no newly introduced code or third-party dependency injects vulnerable cryptography back into a secured environment. Generating a CBOM regularly is the cornerstone of passing the rigorous post-quantum architecture audits expected by 2026.
          </p>
        </article>
      </div>

      {/* Right Sidebar Column */}
      <aside className="hidden lg:block w-[300px] shrink-0">
        <div className="w-[300px] h-[600px] sticky top-8 bg-[#f8f8f6] border border-[#d4d9de] flex items-center justify-center text-[#4f565c] text-sm">
          [Ad Slot: Right Sidebar - 300x600]
        </div>
      </aside>

    </div>
  );
}
