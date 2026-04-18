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
  "mlkem",
  "mlsa",
]);

const ALGORITHM_MAP: Record<string, string> = {
  rsa: "Classical RSA (migrate needed)",
  ecc: "Classical ECC (migrate needed)",
  dsa: "Classical DSA (deprecated)",
  sha1: "SHA-1 (weak)",
  md5: "MD5 (broken)",
  aes: "AES (post-quantum safe)",
  sha256: "SHA-256 (safe)",
  sha3: "SHA-3 (safe)",
};

export function analyzePostQuantumCBOM(input: PqcReadinessInput): PqcReadinessResult {
  const totalDeps = input.dependencies.length;
  let pqcReady = 0;
  let pqcAware = 0;
  const notYetReady: string[] = [];
  const recommendations: string[] = [];

  input.dependencies.forEach((dep) => {
    const algoStatus = ALGORITHM_MAP[dep.algorithm?.toLowerCase() || ""] || "unknown";

    if (PQC_READY_LIBS.has(dep.name.toLowerCase())) {
      pqcReady++;
    } else if (
      dep.algorithm &&
      (dep.algorithm.toLowerCase().includes("aes") ||
        dep.algorithm.toLowerCase().includes("sha"))
    ) {
      pqcAware++;
    } else {
      notYetReady.push(`${dep.name} (${algoStatus})`);
    }
  });

  if (notYetReady.length > 0) {
    recommendations.push("Audit legacy cryptographic libraries for post-quantum alternatives.");
    recommendations.push("Plan migration roadmap for non-PQC-ready dependencies by 2030 (NIST timeline).");
  }

  if (pqcReady === 0 && pqcAware < totalDeps * 0.5) {
    recommendations.push("Consider adopting liboqs or Botan for structured PQC integration.");
  }

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
