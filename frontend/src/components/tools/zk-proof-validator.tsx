import { useState, useMemo } from 'react';

// Simulated benchmark constraints per circuit type
const CIRCUIT_TYPES = {
  groth16: { name: 'Groth16', constraint_factor: 1.0, cost_per_proof: 0.05, verification_gas: 200000, prover_memory_mb: 2048 },
  plonk: { name: 'PLONK', constraint_factor: 1.3, cost_per_proof: 0.08, verification_gas: 300000, prover_memory_mb: 4096 },
  stark: { name: 'STARK', constraint_factor: 2.1, cost_per_proof: 0.02, verification_gas: 1500000, prover_memory_mb: 8192 },
};

interface ZkResult {
  estimatedConstraints: number;
  proverMemoryNeeded: string;
  proofCostUsd: number;
  onChainVerificationGas: string;
  isFeasibleInBrowser: boolean;
  securityBits: number;
}

export function ZkCircuitValidator() {
  const [circuitSystem, setCircuitSystem] = useState<'groth16' | 'plonk' | 'stark'>('groth16');
  const [privateInputs, setPrivateInputs] = useState(10);
  const [publicInputs, setPublicInputs] = useState(2);
  const [hashOperations, setHashOperations] = useState(5); // Expensive in constraints

  const result: ZkResult = useMemo(() => {
    const sys = CIRCUIT_TYPES[circuitSystem];
    
    // Simplistic heuristic: Hashes (e.g. Poseidon) are extremely constraint-heavy
    // Mismatched inputs also add constraints
    let baseConstraints = (privateInputs * 15) + (publicInputs * 30) + (hashOperations * 300);
    
    // Specific zero-knowledge system multiplier
    const estimatedConstraints = Math.round(baseConstraints * sys.constraint_factor);
    
    const isFeasibleInBrowser = sys.prover_memory_mb <= 4096 && estimatedConstraints < 2000000;
    
    // Scale memory roughly by constraints if large
    let mem = sys.prover_memory_mb;
    if (estimatedConstraints > 1000000) mem *= 2; 

    return {
      estimatedConstraints,
      proverMemoryNeeded: `${Math.round(mem / 1024 * 10) / 10} GB`,
      proofCostUsd: sys.cost_per_proof,
      onChainVerificationGas: sys.verification_gas.toLocaleString(),
      isFeasibleInBrowser,
      securityBits: circuitSystem === 'stark' ? 120 : 128 // STARKs often parametrized, but conventionally Groth16/Plonk map to curve sec
    };
  }, [circuitSystem, privateInputs, publicInputs, hashOperations]);

  return (
    <div className="tu-wrap">
      <span className="tu-tag">BKX Cryptography Toolkit</span>
      <h1 className="tu-title">ZK-Proof Circuit Feasibility Validator</h1>
      <p className="tu-subtitle">Estimate Zero-Knowledge circuit constraints, prover memory requirements, and verification gas costs for specific ZK architectures.</p>
      <hr className="tu-divider" />

      <div className="tu-form-grid" style={{ marginBottom: '1.5rem' }}>
        <div className="tu-field">
          <label className="tu-label">Proving System Architecture</label>
          <select 
            value={circuitSystem} 
            onChange={e => setCircuitSystem(e.target.value as any)}
            className="tu-select"
          >
            <option value="groth16">Groth16 (Smallest proof size, requires trusted setup)</option>
            <option value="plonk">PLONK (Universal trusted setup)</option>
            <option value="stark">zk-STARKs (No trusted setup, post-quantum secure)</option>
          </select>
        </div>
        <div className="tu-field">
          <label className="tu-label">Private Inputs (Witness)</label>
          <input 
            type="number" min="0" max="10000"
            value={privateInputs} 
            onChange={e => setPrivateInputs(parseInt(e.target.value) || 0)}
            className="tu-input" 
          />
        </div>
        <div className="tu-field">
          <label className="tu-label">Public Inputs (Instances)</label>
          <input 
            type="number" min="0" max="1000"
            value={publicInputs} 
            onChange={e => setPublicInputs(parseInt(e.target.value) || 0)}
            className="tu-input" 
          />
        </div>
        <div className="tu-field">
          <label className="tu-label">Non-linear Hash Operations</label>
          <input 
            type="number" min="0" max="10000"
            value={hashOperations} 
            onChange={e => setHashOperations(parseInt(e.target.value) || 0)}
            className="tu-input" 
          />
        </div>
      </div>

      <div className="tu-result tu-animate">
        <div className="tu-result-hero">
          <div className="tu-metric">
            <span className="tu-metric-label">Estimated Constraints (R1CS/Trace)</span>
            <span className="tu-metric-value">{result.estimatedConstraints.toLocaleString()}</span>
          </div>
          <div className="tu-metric">
            <span className="tu-metric-label">Client Browser Feasible</span>
            <span className="tu-metric-value" style={{ color: result.isFeasibleInBrowser ? '#10b981' : '#dc2626' }}>
              {result.isFeasibleInBrowser ? 'YES' : 'NO'}
            </span>
          </div>
        </div>

        <div className="tu-table-wrap">
          <table className="tu-table">
            <tbody>
              <tr>
                <td style={{ fontWeight: 600 }}>Prover Hardware Memory</td>
                <td>{result.proverMemoryNeeded} RAM</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600 }}>Theoretical Security Level</td>
                <td>~{result.securityBits}-bit</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600 }}>On-chain Verification Gas</td>
                <td>{result.onChainVerificationGas} EVM Gas</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600 }}>Estimated Per-Proof Compute Cost</td>
                <td>${result.proofCostUsd.toFixed(2)} USD</td>
              </tr>
            </tbody>
          </table>
        </div>

        {(!result.isFeasibleInBrowser) && (
          <div style={{ marginTop: '1.25rem', padding: '1rem', background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '8px' }}>
            <p style={{ margin: 0, fontSize: '0.8rem', color: '#d97706', fontWeight: 600 }}>
              WARNING: Prover requirements likely exceed WASM client capacities. Proof generation must be delegated to server infrastructure or serverless provers.
            </p>
          </div>
        )}
      </div>

    </div>
  );
}
