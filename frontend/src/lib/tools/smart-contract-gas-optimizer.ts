export type GasOptimizationInput = {
  hasExcessiveStorageWrites: boolean;
  hasUnboundedLoop: boolean;
  usesPacking: boolean;
  hasInlineAssembly: boolean;
  usesExternalCall: boolean;
};

export type GasOptimizationResult = {
  currentGasEstimate: number;
  optimizedGasEstimate: number;
  savingsPercent: number;
  recommendations: string[];
};

export function optimizeSmartContractGas(input: GasOptimizationInput): GasOptimizationResult {
  let baseGas = 50000;
  const issues: { name: string; gasCost: number; fix: string }[] = [];

  if (input.hasExcessiveStorageWrites) {
    issues.push({
      name: "Excessive storage writes",
      gasCost: 20000,
      fix: "Batch storage operations; use temporary memory arrays then commit once.",
    });
  }

  if (input.hasUnboundedLoop) {
    issues.push({
      name: "Unbounded loop",
      gasCost: 15000,
      fix: "Add explicit loop limit (e.g., MAX_ITERATIONS) to prevent out-of-gas.",
    });
  }

  if (!input.usesPacking) {
    issues.push({
      name: "Non-packed storage",
      gasCost: 8000,
      fix: "Use struct packing (uint16 + uint16 in one slot) to reduce SSTORE operations.",
    });
  }

  if (input.hasInlineAssembly) {
    issues.push({
      name: "Non-optimized assembly",
      gasCost: 5000,
      fix: "Profile and optimize hot-path assembly code with JUMPI reductions.",
    });
  }

  if (input.usesExternalCall) {
    issues.push({
      name: "External call overhead",
      gasCost: 10000,
      fix: "Cache results or use internal libraries if possible to avoid CALL opcode penalty.",
    });
  }

  const currentGasEstimate = baseGas + issues.reduce((sum, i) => sum + i.gasCost, 0);
  const optimizedGasEstimate = baseGas;
  const savingsPercent = Math.round(((currentGasEstimate - optimizedGasEstimate) / currentGasEstimate) * 100);
  const recommendations = issues.map((i) => `${i.name}: ${i.fix}`);

  if (recommendations.length === 0) {
    recommendations.push("No major gas inefficiencies detected. Code looks optimized.");
  }

  return {
    currentGasEstimate,
    optimizedGasEstimate,
    savingsPercent,
    recommendations,
  };
}
