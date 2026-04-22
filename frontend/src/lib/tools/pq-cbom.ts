export type PqcReadinessInput = {
  dependencies: Array<{ name: string; version: string; algorithm?: string }>;
};

export type PqcReadinessResult = {
  readinessPercentage: number;
  totalDependencies: number;
  pqcReadyCount: number;
  pqcAwareCount: number;
  notYetReady: string[];
  recommendations: string[];
};

const PQC_READY_LIBS = new Set([
  "liboqs",
  "botan",
  "liboqs-python",
  "quantum-safe-crypto",
  "kyber",
  "dilithium",
  "sphincs",
  "falcon",
  "ml-kem",
  "ml-dsa",
  "slh-dsa",
  "fn-dsa",
  "lms",
  "xmss",
]);

const ALGORITHM_MAP: Record<string, string> = {
  rsa: "Classical RSA (migrate needed)",
  ecc: "Classical ECC (migrate needed)",
  ecdsa: "Classical ECDSA (migrate needed)",
  ed25519: "Classical Ed25519 (migrate needed)",
  dsa: "Classical DSA (deprecated)",
  sha1: "SHA-1 (weak)",
  md5: "MD5 (broken)",
  aes: "AES-128/192 (classical safe)",
  "aes-256": "AES-256 (CNSA 2.0 PQC safe)",
  sha256: "SHA-256 (classical safe)",
  sha384: "SHA-384 (CNSA 2.0 PQC safe)",
  sha512: "SHA-512 (CNSA 2.0 PQC safe)",
  sha3: "SHA-3 (safe)",
  "ml-kem": "ML-KEM / FIPS 203 (PQC standard)",
  "ml-dsa": "ML-DSA / FIPS 204 (PQC standard)",
};

export function analyzePostQuantumCBOM(input: PqcReadinessInput): PqcReadinessResult {
  const totalDeps = input.dependencies.length;
  let pqcReady = 0;
  let pqcAware = 0;
  const notYetReady: string[] = [];
  const recommendations: string[] = [];

  input.dependencies.forEach((dep) => {
    const algoStr = (dep.algorithm || "").toLowerCase();
    const algoStatus = ALGORITHM_MAP[algoStr] || "unknown";

    if (
      PQC_READY_LIBS.has(dep.name.toLowerCase()) || 
      algoStr.includes("ml-kem") || 
      algoStr.includes("ml-dsa") || 
      algoStr.includes("slh-dsa") || 
      algoStr.includes("fn-dsa") ||
      algoStr === "aes-256" ||
      algoStr === "sha384" ||
      algoStr === "sha512"
    ) {
      pqcReady++;
    } else if (
      algoStr.includes("aes") ||
      algoStr.includes("sha256") ||
      algoStr.includes("sha3")
    ) {
      // AES-128, SHA-256 are safe against Grover's to some extent, but CNSA 2.0 requires AES-256/SHA-384
      pqcAware++;
    } else {
      notYetReady.push(`${dep.name} (${algoStatus})`);
    }
  });

  if (notYetReady.length > 0) {
    recommendations.push("Audit legacy cryptographic libraries (RSA/ECC) for ML-KEM/ML-DSA alternatives per FIPS 203/204.");
    recommendations.push("Plan migration roadmap for non-PQC-ready dependencies by 2030 (NIST timeline).");
  }

  if (pqcAware > 0 && pqcReady === 0) {
    recommendations.push("Upgrade symmetric algorithms (AES-128 -> AES-256) and hashing (SHA-256 -> SHA-384) to meet CNSA 2.0 guidelines.");
  }

  if (pqcReady === 0 && pqcAware < totalDeps * 0.5) {
    recommendations.push("Consider adopting liboqs or Botan for structured NIST PQC integration.");
  }

  // Weight symmetric-safe / aware slightly lower than purely post-quantum ready
  const readiness = totalDeps === 0 ? 0 : Math.round(((pqcReady + pqcAware * 0.5) / totalDeps) * 100);

  return {
    readinessPercentage: readiness,
    totalDependencies: totalDeps,
    pqcReadyCount: pqcReady,
    pqcAwareCount: pqcAware,
    notYetReady,
    recommendations,
  };
}
