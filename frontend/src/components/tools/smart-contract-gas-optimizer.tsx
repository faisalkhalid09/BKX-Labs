import { useState, useMemo } from 'react';

// Default mock values for typical operations in units of gas
const GAS_MODELS: Record<string, { base: number, perOp: number }> = {
  'ERC20_Transfer': { base: 21000, perOp: 34000 },
  'ERC721_Mint': { base: 21000, perOp: 154000 },
  'DEX_Swap': { base: 21000, perOp: 110000 },
  'Staking_Deposit': { base: 21000, perOp: 85000 },
};

const DEFAULT_GWEI = 35;
const DEFAULT_ETH_PRICE = 2800;
const ETH_DECIMALS = 1e9; // Gwei to ETH factor

export function GasOptimizer() {
  const [contractType, setContractType] = useState('ERC20_Transfer');
  const [arrayLength, setArrayLength] = useState(1);
  const [gasPriceGwei, setGasPriceGwei] = useState(DEFAULT_GWEI);
  const [ethPriceUSD, setEthPriceUSD] = useState(DEFAULT_ETH_PRICE);
  const [useStoragePacking, setUseStoragePacking] = useState(true);
  const [useCalldata, setUseCalldata] = useState(true);

  const result = useMemo(() => {
    const model = GAS_MODELS[contractType];
    const ops = Math.max(1, arrayLength);

    // Unoptimized total
    const unoptimizedGas = model.base + (model.perOp * ops * 1.5); // Add inefficiency multiplier
    
    // Optimizations
    let optimizedGas = model.base + (model.perOp * ops);
    
    if (useStoragePacking) {
        optimizedGas -= (ops * 15000); // Storage packing saves ~15k per slot
    }
    
    if (useCalldata) {
        optimizedGas -= (ops * 3000); // Calldata over Memory logic saves gas
    }

    // Ensure we don't go below theoretical minimum
    optimizedGas = Math.max(optimizedGas, model.base + (ops * 10000));

    const eip1559Factor = 1.1; // Base fee + priority fee buffer

    const unoptimizedEth = (unoptimizedGas * gasPriceGwei * eip1559Factor) / ETH_DECIMALS;
    const optimizedEth = (optimizedGas * gasPriceGwei * eip1559Factor) / ETH_DECIMALS;

    const unoptimizedUsd = unoptimizedEth * ethPriceUSD;
    const optimizedUsd = optimizedEth * ethPriceUSD;

    const savedGas = unoptimizedGas - optimizedGas;
    const savedUsd = unoptimizedUsd - optimizedUsd;
    const savePercent = savedUsd / unoptimizedUsd * 100;

    return {
      unoptimizedGas: Math.round(unoptimizedGas),
      optimizedGas: Math.round(optimizedGas),
      unoptimizedUsd,
      optimizedUsd,
      savedGas: Math.round(savedGas),
      savedUsd,
      savePercent
    };

  }, [contractType, arrayLength, gasPriceGwei, ethPriceUSD, useStoragePacking, useCalldata]);

  return (
    <div className="tu-wrap">
      <span className="tu-tag">BKX Web3 Security</span>
      <h1 className="tu-title">Smart Contract Gas Optimizer</h1>
      <p className="tu-subtitle">Model savings from EVM storage packing and calldata optimization techniques.</p>
      <hr className="tu-divider" />

      <div className="tu-split-layout">
        <div className="tu-split-left">
          <div className="tu-form-grid" style={{ marginBottom: '1.25rem' }}>
            <div className="tu-field" style={{ gridColumn: '1 / -1' }}>
              <label className="tu-label">Contract Primitive</label>
              <select value={contractType} onChange={e => setContractType(e.target.value)} className="tu-select">
                <option value="ERC20_Transfer">ERC-20 Batch Transfer</option>
                <option value="ERC721_Mint">ERC-721 Batch Mint</option>
                <option value="DEX_Swap">DEX Swap (Multi-hop)</option>
                <option value="Staking_Deposit">Staking Pool Entry</option>
              </select>
            </div>
            <div className="tu-field">
              <label className="tu-label">Batch Size</label>
              <input type="number" min="1" value={arrayLength} onChange={e => setArrayLength(parseInt(e.target.value) || 1)} className="tu-input" />
            </div>
            <div className="tu-field">
              <label className="tu-label">Gwei</label>
              <input type="number" value={gasPriceGwei} onChange={e => setGasPriceGwei(parseInt(e.target.value) || 1)} className="tu-input" />
            </div>
          </div>

          <div className="tu-field">
            <label className="tu-label">EVM Optimizations</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <label className="tu-check-label tu-check-label-styled">
                <input type="checkbox" checked={useStoragePacking} onChange={e => setUseStoragePacking(e.target.checked)} className="tu-checkbox" />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>Storage Slot Packing</span>
                  <span style={{ fontSize: '0.7rem', color: '#4f565c' }}>Combine uint8/bools into 256-bit slots.</span>
                </div>
              </label>
              <label className="tu-check-label tu-check-label-styled">
                <input type="checkbox" checked={useCalldata} onChange={e => setUseCalldata(e.target.checked)} className="tu-checkbox" />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>Calldata over Memory</span>
                  <span style={{ fontSize: '0.7rem', color: '#4f565c' }}>Use read-only calldata for function arrays.</span>
                </div>
              </label>
            </div>
          </div>

          <div className="tu-aeo" style={{ marginTop: '2rem' }}>
            <p>
              <strong>EVM Economics:</strong> Gas efficiency (Solidity 0.8.x) is the primary driver for protocol LTV. 
              Optimizing SSTORE operations via slot packing remains the most effective way to reduce protocol-level 
              overhead by up to 40% per transaction.
            </p>
          </div>
        </div>

        <div className="tu-split-right">
          <div className="tu-result tu-animate" style={{ marginTop: 0 }}>
            <div className="tu-result-hero">
              <div className="tu-metric">
                <span className="tu-metric-label">Est. Savings</span>
                <span className="tu-metric-value" style={{ color: '#10b981' }}>
                  ${result.savedUsd.toFixed(2)}
                </span>
              </div>
              <div className="tu-metric">
                <span className="tu-metric-label">Reduction</span>
                <span className="tu-metric-value">{result.savePercent.toFixed(1)}<span className="tu-metric-unit">%</span></span>
              </div>
            </div>

            <div className="tu-table-wrap">
              <table className="tu-table">
                <thead>
                  <tr>
                    <th>Metric</th>
                    <th>Unopt.</th>
                    <th>Opt.</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ fontWeight: 600, fontSize: '0.8rem' }}>Gas Units</td>
                    <td style={{ color: '#dc2626', fontSize: '0.8rem' }}>{result.unoptimizedGas.toLocaleString()}</td>
                    <td style={{ color: '#10b981', fontWeight: 700, fontSize: '0.8rem' }}>{result.optimizedGas.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 600, fontSize: '0.8rem' }}>Cost (USD)</td>
                    <td style={{ color: '#dc2626', fontSize: '0.8rem' }}>${result.unoptimizedUsd.toFixed(2)}</td>
                    <td style={{ color: '#10b981', fontWeight: 700, fontSize: '0.8rem' }}>${result.optimizedUsd.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div style={{ marginTop: '1rem', padding: '0.75rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
              <p style={{ fontSize: '0.78rem', color: '#4f565c', margin: 0, fontStyle: 'italic' }}>
                Note: Calculation includes a 1.1x safety buffer for EIP-1559 base fee fluctuations.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="tu-btn-row" style={{ marginTop: '1.25rem' }}>
        <button type="button" className="tu-btn tu-btn-sm" onClick={() => {
          setContractType('ERC20_Transfer'); setArrayLength(1);
          setGasPriceGwei(DEFAULT_GWEI); setEthPriceUSD(DEFAULT_ETH_PRICE);
          setUseStoragePacking(true); setUseCalldata(true);
        }}>Reset Settings</button>
      </div>
    </div>
  );
}
