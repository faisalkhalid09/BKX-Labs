export type ZkCircuitInput = {
  circuitCode: string;
};

export type ZkValidationResult = {
  isValid: boolean;
  errors: string[];
  warnings: string[];
};

export function validateZkCircuit(input: ZkCircuitInput): ZkValidationResult {
  const { circuitCode } = input;
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!circuitCode.trim()) {
    return {
      isValid: false,
      errors: ["Circuit code is empty."],
      warnings: [],
    };
  }

  const hasSignalKeyword = /signal\s+(input|output|intermediate)/.test(circuitCode);
  if (!hasSignalKeyword) {
    warnings.push("No signal declarations found. Ensure variables are properly declared as input, output, or intermediate.");
  }

  const hasConstraint = /===|<==|==>/.test(circuitCode);
  if (!hasConstraint) {
    errors.push("No constraints detected. Circuit must contain constraint relationships (===, <==, ==>).");
  }

  const unclosedParens = (circuitCode.match(/\(/g) || []).length - (circuitCode.match(/\)/g) || []).length;
  if (unclosedParens !== 0) {
    errors.push(`Mismatched parentheses: ${Math.abs(unclosedParens)} unmatched bracket(s).`);
  }

  const undeclaredVars = Array.from(new Set(
    [...(circuitCode.match(/\b[a-z_][a-z0-9_]*\b/gi) || [])].filter(
      (v) =>
        ![
          "signal",
          "input",
          "output",
          "component",
          "template",
          "var",
          "if",
          "for",
          "while",
        ].includes(v.toLowerCase())
    )
  )) as string[];

  const declaredVars = Array.from(new Set([
    ...(circuitCode.match(/signal\s+(?:input|output|intermediate)\s+([a-z_][a-z0-9_]*)/gi) || []).map(
      (m) => m.replace(/signal\s+(?:input|output|intermediate)\s+/, "")
    ),
    ...(circuitCode.match(/var\s+([a-z_][a-z0-9_]*)/gi) || []).map((m) =>
      m.replace(/var\s+/, "")
    ),
  ])) as string[];

  const undeclared = undeclaredVars.filter((v) => !declaredVars.includes(v) && v.length > 1);
  if (undeclared.length > 0 && undeclared.length <= 5) {
    warnings.push(`Potentially undeclared variables: ${undeclared.slice(0, 3).join(", ")}`);
  }

  const isValid = errors.length === 0;

  return {
    isValid,
    errors,
    warnings,
  };
}
