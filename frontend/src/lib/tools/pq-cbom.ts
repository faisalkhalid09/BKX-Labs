// PQC Algorithm Classification Engine — 2026 Baseline
// Maps against NIST FIPS 203/204/205, CNSA 2.0, NIS2 Article 21

export type DataShelfLife = "short" | "medium" | "long" | "critical";
// short = <2 years, medium = 2-5 years, long = 5-10 years, critical = 10+

export type AssetEntry = {
  id: string;
  name: string;
  algorithm: string;
  keySize: number | null;
  implementation: string;
  shelfLife: DataShelfLife;
};

export type AssetRisk = "pqc_ready" | "cnsa_safe" | "transitional" | "vulnerable" | "critical";

export type AssetResult = {
  id: string;
  name: string;
  algorithm: string;
  risk: AssetRisk;
  riskScore: number; // 0-100 (100 = most critical)
  quantumSafe: boolean;
  cnsa20Compliant: boolean;
  nis2Flagged: boolean;
  fiproStatus: "FIPS 203" | "FIPS 204" | "FIPS 205" | "CNSA 2.0" | "Classical" | "Unknown";
  remediationAction: string;
  migrateTo: string | null;
};

export type CBOMResult = {
  quantumRiskScore: number; // 0-100 aggregate
  totalAssets: number;
  criticalCount: number;
  vulnerableCount: number;
  transitionalCount: number;
  safeCount: number;
  assets: AssetResult[];
};

// ── Algorithm Classification Tables ──────────────────────────────────────────

// Algorithms that are BROKEN by Shor's Algorithm on a CRQC
const SHOR_VULNERABLE = new Set([
  "rsa", "ecdsa", "ecdh", "dsa", "dh", "ecc", "ed25519", "ed448",
  "x25519", "x448", "p-256", "p-384", "p-521", "secp256k1",
]);

// Algorithms weakened but NOT broken by Grover's Algorithm
// AES-128 is borderline; AES-256, SHA-384, SHA-512 are CNSA 2.0 safe
const GROVER_WEAKENED = new Set(["aes-128", "sha-256", "sha-1", "md5", "3des", "des", "rc4"]);

// CNSA 2.0 Safe (symmetric / hash — just need adequate key sizes)
const CNSA_20_SAFE = new Set(["aes-256", "sha-384", "sha-512", "aes-256-gcm", "aes-256-cbc", "chacha20-poly1305"]);

// NIST PQC finalized standards
const FIPS_203 = new Set(["ml-kem", "ml-kem-512", "ml-kem-768", "ml-kem-1024", "kyber", "crystals-kyber"]);
const FIPS_204 = new Set(["ml-dsa", "ml-dsa-44", "ml-dsa-65", "ml-dsa-87", "dilithium", "crystals-dilithium"]);
const FIPS_205 = new Set(["slh-dsa", "sphincs+", "sphincs-sha2", "sphincs-shake"]);

// Shelf-life risk multipliers
const SHELF_RISK: Record<DataShelfLife, number> = {
  short: 0.4,
  medium: 0.7,
  long: 0.9,
  critical: 1.0,
};

function normalizeAlgo(algo: string): string {
  return algo.toLowerCase().trim();
}

function classifyAsset(asset: AssetEntry): AssetResult {
  const algo = normalizeAlgo(asset.algorithm);

  let risk: AssetRisk;
  let baseScore = 0;
  let quantumSafe = false;
  let cnsa20Compliant = false;
  let nis2Flagged = false;
  let fiproStatus: AssetResult["fiproStatus"] = "Unknown";
  let remediationAction = "";
  let migrateTo: string | null = null;

  if (FIPS_203.has(algo)) {
    risk = "pqc_ready";
    baseScore = 2;
    quantumSafe = true;
    cnsa20Compliant = true;
    fiproStatus = "FIPS 203";
    remediationAction = "No action required. System is ML-KEM compliant.";
  } else if (FIPS_204.has(algo)) {
    risk = "pqc_ready";
    baseScore = 2;
    quantumSafe = true;
    cnsa20Compliant = true;
    fiproStatus = "FIPS 204";
    remediationAction = "No action required. System is ML-DSA compliant.";
  } else if (FIPS_205.has(algo)) {
    risk = "pqc_ready";
    baseScore = 2;
    quantumSafe = true;
    cnsa20Compliant = true;
    fiproStatus = "FIPS 205";
    remediationAction = "No action required. System is SLH-DSA compliant.";
  } else if (CNSA_20_SAFE.has(algo)) {
    risk = "cnsa_safe";
    baseScore = 10;
    quantumSafe = true;
    cnsa20Compliant = true;
    fiproStatus = "CNSA 2.0";
    remediationAction = "Compliant. Schedule PQC hybrid mode adoption for future-proofing.";
  } else if (SHOR_VULNERABLE.has(algo)) {
    // Shor-breakable — severity scales with key size and shelf life
    const sizePenalty = asset.keySize && asset.keySize >= 4096 ? 0 : 15;
    baseScore = 80 + sizePenalty;
    risk = asset.shelfLife === "critical" || asset.shelfLife === "long" ? "critical" : "vulnerable";
    quantumSafe = false;
    cnsa20Compliant = false;
    nis2Flagged = true;
    fiproStatus = "Classical";
    remediationAction = algo.startsWith("rsa") || algo === "dh" || algo === "dsa"
      ? "Migrate key exchange to ML-KEM (FIPS 203). Migrate signatures to ML-DSA (FIPS 204)."
      : "Migrate to ML-KEM (FIPS 203) for key exchange or ML-DSA (FIPS 204) for signatures.";
    migrateTo = algo.includes("rsa") && asset.keySize ? "ML-KEM-1024 / ML-DSA-87" : "ML-KEM-768 / ML-DSA-65";
  } else if (GROVER_WEAKENED.has(algo)) {
    risk = "transitional";
    baseScore = 40;
    quantumSafe = false;
    cnsa20Compliant = false;
    nis2Flagged = asset.shelfLife === "critical" || asset.shelfLife === "long";
    fiproStatus = "Classical";
    remediationAction = algo === "aes-128"
      ? "Upgrade to AES-256 to meet CNSA 2.0 minimum key size requirements."
      : algo === "sha-256"
        ? "Upgrade to SHA-384 or SHA-512 for CNSA 2.0 compliance."
        : "Deprecate immediately. Algorithm is cryptographically broken (MD5/SHA-1/DES/RC4).";
    migrateTo = algo === "aes-128" ? "AES-256-GCM" : algo === "sha-256" ? "SHA-384" : null;
  } else {
    risk = "transitional";
    baseScore = 35;
    fiproStatus = "Unknown";
    remediationAction = "Algorithm not recognized in the NIST/CNSA database. Manual review required.";
  }

  // Apply shelf-life multiplier to finalize risk score
  const shelfMultiplier = SHELF_RISK[asset.shelfLife];
  const riskScore = Math.min(100, Math.round(baseScore * shelfMultiplier));

  return {
    id: asset.id,
    name: asset.name,
    algorithm: asset.algorithm,
    risk,
    riskScore,
    quantumSafe,
    cnsa20Compliant,
    nis2Flagged,
    fiproStatus,
    remediationAction,
    migrateTo,
  };
}

export function analyzePostQuantumCBOM(assets: AssetEntry[]): CBOMResult {
  const results = assets.map(classifyAsset);

  const criticalCount = results.filter((r) => r.risk === "critical").length;
  const vulnerableCount = results.filter((r) => r.risk === "vulnerable").length;
  const transitionalCount = results.filter((r) => r.risk === "transitional").length;
  const safeCount = results.filter((r) => r.risk === "pqc_ready" || r.risk === "cnsa_safe").length;

  // Aggregate Quantum Risk Score = weighted average skewed toward worst offenders
  const totalScore = results.reduce((sum, r) => sum + r.riskScore, 0);
  const quantumRiskScore = results.length > 0 ? Math.round(totalScore / results.length) : 0;

  return {
    quantumRiskScore,
    totalAssets: assets.length,
    criticalCount,
    vulnerableCount,
    transitionalCount,
    safeCount,
    assets: results,
  };
}

// ── CycloneDX v1.6 CBOM Export ────────────────────────────────────────────────

export function generateCycloneDXCBOM(assets: AssetEntry[], results: CBOMResult): string {
  const components = results.assets.map((r, idx) => {
    const asset = assets[idx];
    return {
      type: "cryptographic-asset",
      "bom-ref": `cbom-${r.id}`,
      name: r.name,
      version: asset.implementation || "unknown",
      cryptoProperties: {
        assetType: "algorithm",
        algorithmProperties: {
          primitive: r.algorithm,
          parameterSetIdentifier: asset.keySize ? String(asset.keySize) : "unknown",
          implementationLevel: asset.implementation || "unknown",
          nistQuantumSecurityLevel: r.quantumSafe ? 3 : 0,
        },
        oid: undefined,
      },
      externalReferences: r.migrateTo
        ? [{ type: "documentation", url: "https://csrc.nist.gov/publications/detail/fips/203/final", comment: `Migrate to: ${r.migrateTo}` }]
        : [],
      properties: [
        { name: "bkx:riskScore", value: String(r.riskScore) },
        { name: "bkx:cnsa20Compliant", value: String(r.cnsa20Compliant) },
        { name: "bkx:nis2Flagged", value: String(r.nis2Flagged) },
        { name: "bkx:dataShelfLife", value: asset.shelfLife },
        { name: "bkx:standard", value: r.fiproStatus },
      ],
    };
  });

  const cycloneDX = {
    bomFormat: "CycloneDX",
    specVersion: "1.6",
    version: 1,
    serialNumber: `urn:uuid:bkx-cbom-${Date.now()}`,
    metadata: {
      timestamp: new Date().toISOString(),
      tools: [{ vendor: "BKX Labs", name: "Post-Quantum CBOM Generator", version: "2026.1" }],
    },
    components,
  };

  return JSON.stringify(cycloneDX, null, 2);
}
