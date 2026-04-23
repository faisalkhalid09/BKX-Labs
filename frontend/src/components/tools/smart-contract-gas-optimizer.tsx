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
      <p className="tu-subtitle">Estimate execution costs for typical Web3 primitives and model savings from standard EVM optimization techniques.</p>
      <hr className="tu-divider" />

      <div className="tu-form-grid" style={{ marginBottom: '1.25rem' }}>
        <div className="tu-field">
          <label className="tu-label">Contract Primitive</label>
          <select 
            value={contractType} 
            onChange={e => setContractType(e.target.value)}
            className="tu-select"
          >
            <option value="ERC20_Transfer">ERC-20 Batch Transfer</option>
            <option value="ERC721_Mint">ERC-721 Batch Mint</option>
            <option value="DEX_Swap">DEX Swap Routing</option>
            <option value="Staking_Deposit">Staking Pool Deposit</option>
          </select>
        </div>
        <div className="tu-field">
          <label className="tu-label">Batch Size (Operations)</label>
          <input 
            type="number" min="1" max="1000"
            value={arrayLength} 
            onChange={e => setArrayLength(parseInt(e.target.value) || 1)}
            className="tu-input"
          />
        </div>
        <div className="tu-field">
          <label className="tu-label">Gas Price (Gwei)</label>
          <input 
            type="number" min="1" max="1000"
            value={gasPriceGwei} 
            onChange={e => setGasPriceGwei(parseInt(e.target.value) || 1)}
            className="tu-input"
          />
        </div>
        <div className="tu-field">
          <label className="tu-label">ETH Price (USD)</label>
          <input 
            type="number" min="1"
            value={ethPriceUSD} 
            onChange={e => setEthPriceUSD(parseInt(e.target.value) || 1)}
            className="tu-input"
          />
        </div>
      </div>

      <div className="tu-field" style={{ marginBottom: '1.5rem' }}>
        <label className="tu-label">Applied EVM Optimizations</label>
        <div className="tu-check-grid" style={{ gridTemplateColumns: 'minmax(200px, 1fr) minmax(200px, 1fr)' }}>
          <label className="tu-check-label tu-check-label-styled">
            <input 
              type="checkbox" 
              checked={useStoragePacking}
              onChange={e => setUseStoragePacking(e.target.checked)}
              className="tu-checkbox"
            />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontWeight: 600 }}>Storage Slot Packing</span>
              <span style={{ fontSize: '0.75rem', color: '#4f565c' }}>Pack uint8/uint16/bools into a single 256-bit slot to bypass multiple SSTORE ops.</span>
            </div>
          </label>
          <label className="tu-check-label tu-check-label-styled">
            <input 
              type="checkbox" 
              checked={useCalldata}
              onChange={e => setUseCalldata(e.target.checked)}
              className="tu-checkbox"
            />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontWeight: 600 }}>Calldata over Memory</span>
              <span style={{ fontSize: '0.75rem', color: '#4f565c' }}>Use calldata for read-only functional arguments arrays.</span>
            </div>
          </label>
        </div>
      </div>

      <div className="tu-result tu-animate">
        <div className="tu-result-hero">
          <div className="tu-metric">
            <span className="tu-metric-label">Estimated Savings</span>
            <span className="tu-metric-value" style={{ color: '#10b981' }}>
              ${result.savedUsd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
          <div className="tu-metric">
            <span className="tu-metric-label">Reduction</span>
            <span className="tu-metric-value">
              {result.savePercent.toFixed(1)}<span className="tu-metric-unit">%</span>
            </span>
          </div>
        </div>

        <div className="tu-table-wrap">
          <table className="tu-table">
            <thead>
              <tr>
                <th>Metric</th>
                <th>Unoptimized</th>
                <th>Optimized</th>
                <th>Difference</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontWeight: 600 }}>Gas Units</td>
                <td style={{ color: '#dc2626' }}>{result.unoptimizedGas.toLocaleString()}</td>
                <td style={{ color: '#10b981', fontWeight: 'bold' }}>{result.optimizedGas.toLocaleString()}</td>
                <td>{result.savedGas.toLocaleString()} units</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600 }}>Fiat Cost (USD)</td>
                <td style={{ color: '#dc2626' }}>${result.unoptimizedUsd.toFixed(2)}</td>
                <td style={{ color: '#10b981', fontWeight: 'bold' }}>${result.optimizedUsd.toFixed(2)}</td>
                <td>${result.savedUsd.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <p style={{ fontSize: "0.8rem", color: "#4f565c", marginTop: "1rem", fontStyle: "italic", textAlign: 'center' }}>
          Assuming standard London hard fork EIP-1559 base fee math. Real-world execution may vary.
        </p>
      </div>

      <div className="tu-btn-row">
         <button type="button" className="tu-btn" onClick={() => {
           setContractType('ERC20_Transfer');
           setArrayLength(1);
           setGasPriceGwei(DEFAULT_GWEI);
           setEthPriceUSD(DEFAULT_ETH_PRICE);
           setUseStoragePacking(true);
           setUseCalldata(true);
         }}>Reset Optimizer</button>
      </div>
    </div>
  );
}
