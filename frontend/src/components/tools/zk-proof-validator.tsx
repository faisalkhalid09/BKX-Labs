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
    let baseConstraints = (privateInputs * 15) + (publicInputs * 30) + (hashOperations * 300);
    const estimatedConstraints = Math.round(baseConstraints * sys.constraint_factor);
    const isFeasibleInBrowser = sys.prover_memory_mb <= 4096 && estimatedConstraints < 2000000;
    
    let mem = sys.prover_memory_mb;
    if (estimatedConstraints > 1000000) mem *= 2; 

    return {
      estimatedConstraints,
      proverMemoryNeeded: `${Math.round(mem / 1024 * 10) / 10} GB`,
      proofCostUsd: sys.cost_per_proof,
      onChainVerificationGas: sys.verification_gas.toLocaleString(),
      isFeasibleInBrowser,
      securityBits: circuitSystem === 'stark' ? 120 : 128
    };
  }, [circuitSystem, privateInputs, publicInputs, hashOperations]);

  return (
    <div className="tu-wrap">
      <span className="tu-tag">BKX Cryptography Toolkit</span>
      <h1 className="tu-title">ZK-Proof Circuit Validator</h1>
      <p className="tu-subtitle">Estimate Zero-Knowledge circuit constraints and prover memory requirements.</p>
      <hr className="tu-divider" />

      <div className="tu-split-layout">
        <div className="tu-split-left">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <div className="tu-field">
              <label className="tu-label">System Architecture</label>
              <select value={circuitSystem} onChange={e => setCircuitSystem(e.target.value as any)} className="tu-select">
                <option value="groth16">Groth16 (Small Proofs, Trusted Setup)</option>
                <option value="plonk">PLONK (Universal Setup)</option>
                <option value="stark">STARK (No Setup, PQC Secure)</option>
              </select>
            </div>
            
            <div className="tu-form-grid">
              <div className="tu-field">
                <label className="tu-label">Private Inputs</label>
                <input type="number" value={privateInputs} onChange={e => setPrivateInputs(parseInt(e.target.value) || 0)} className="tu-input" />
              </div>
              <div className="tu-field">
                <label className="tu-label">Public Inputs</label>
                <input type="number" value={publicInputs} onChange={e => setPublicInputs(parseInt(e.target.value) || 0)} className="tu-input" />
              </div>
            </div>

            <div className="tu-field">
              <label className="tu-label">Hash Ops (e.g. Poseidon)</label>
              <input type="number" value={hashOperations} onChange={e => setHashOperations(parseInt(e.target.value) || 0)} className="tu-input" />
            </div>

            <div className="tu-aeo" style={{ marginTop: '1.5rem' }}>
              <p>
                <strong>ZK Circuit Math:</strong> Groth16 requires a Trusted Setup (CRS) but generates constant 
                ~128-byte proofs. STARKs are post-quantum secure but verification gas is 8x higher than SNARKs 
                on Ethereum L1.
              </p>
            </div>
          </div>
        </div>

        <div className="tu-split-right">
          <div className="tu-result tu-animate" style={{ marginTop: 0 }}>
            <div className="tu-result-hero">
              <div className="tu-metric">
                <span className="tu-metric-label">Constraints</span>
                <span className="tu-metric-value" style={{ fontSize: '1.5rem' }}>{result.estimatedConstraints.toLocaleString()}</span>
              </div>
              <div className="tu-metric">
                <span className="tu-metric-label">Browser Feasible</span>
                <span className="tu-metric-value" style={{ color: result.isFeasibleInBrowser ? '#10b981' : '#dc2626' }}>
                  {result.isFeasibleInBrowser ? 'YES' : 'NO'}
                </span>
              </div>
            </div>

            <div className="tu-table-wrap">
              <table className="tu-table">
                <tbody>
                  <tr>
                    <td style={{ fontWeight: 600, fontSize: '0.8rem' }}>Hardware Memory</td>
                    <td style={{ fontSize: '0.8rem' }}>{result.proverMemoryNeeded} RAM</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 600, fontSize: '0.8rem' }}>Security Level</td>
                    <td style={{ fontSize: '0.8rem' }}>~{result.securityBits}-bit</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 600, fontSize: '0.8rem' }}>Verification Gas</td>
                    <td style={{ fontSize: '0.8rem' }}>{result.onChainVerificationGas} units</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {!result.isFeasibleInBrowser && (
              <div style={{ marginTop: '1rem', padding: '0.75rem', background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '8px' }}>
                <p style={{ margin: 0, fontSize: '0.75rem', color: '#d97706', fontWeight: 700 }}>
                  ⚠ RESOURCE WARNING: Prover requirements likely exceed WASM client capacities.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
