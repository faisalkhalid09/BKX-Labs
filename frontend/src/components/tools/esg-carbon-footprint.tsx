import { useState, useMemo } from 'react';

// Simplified emissions factors
const FACTORS = {
  electricity_US: 0.385, // kg CO2e / kWh
  electricity_EU: 0.231,
  electricity_APAC: 0.585,
  natural_gas: 5.3, // kg CO2e / therm
  business_travel: 0.15, // kg CO2e / mile (average 1 passenger flight)
  cloud_compute: 0.002, // kg CO2e / vCPU hour average
};

interface EsgResult {
  scope1: number;
  scope2: number;
  scope3: number;
  total: number;
  equivalencies: {
    cars: number;
    trees: number;
  };
}

export function CarbonFootprintTracker() {
  const [electricityMwh, setElectricityMwh] = useState('150');
  const [region, setRegion] = useState<'US' | 'EU' | 'APAC'>('US');
  const [gasTherms, setGasTherms] = useState('1000');
  const [travelMiles, setTravelMiles] = useState('50000');
  const [cloudVcpuHrs, setCloudVcpuHrs] = useState('100000');

  const result: EsgResult = useMemo(() => {
    const kwh = parseFloat(electricityMwh || '0') * 1000;
    const therms = parseFloat(gasTherms || '0');
    const miles = parseFloat(travelMiles || '0');
    const vcpuHrs = parseFloat(cloudVcpuHrs || '0');

    // Scope 1: Direct emissions (Facilities heating, fleet) - using natural gas as proxy
    const scope1 = therms * FACTORS.natural_gas;

    // Scope 2: Indirect purchased electricity
    const electricityFactor = region === 'US' ? FACTORS.electricity_US : region === 'EU' ? FACTORS.electricity_EU : FACTORS.electricity_APAC;
    const scope2 = kwh * electricityFactor;

    // Scope 3: Value chain (Travel, Cloud compute)
    const scope3 = (miles * FACTORS.business_travel) + (vcpuHrs * FACTORS.cloud_compute);

    const total = scope1 + scope2 + scope3;

    // US EPA equivalencies
    // A typical passenger vehicle emits about 4.6 metric tons per year.
    // A tree absorbs ~25 kg/yr.
    const cars = total / 4600;
    const trees = total / 25;

    return {
      scope1, scope2, scope3, total,
      equivalencies: { cars, trees }
    };
  }, [electricityMwh, region, gasTherms, travelMiles, cloudVcpuHrs]);

  return (
    <div className="tu-wrap">
      <span className="tu-tag">BKX ESG & Sustainability</span>
      <h1 className="tu-title">SaaS ESG Scope 1-3 Carbon Footprint Estimator</h1>
      <p className="tu-subtitle">Calculate standardized greenhouse gas (GHG) emissions for tech companies, categorizing into Scope 1, 2, and 3 profiles.</p>
      <hr className="tu-divider" />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '1.5rem' }}>
        <div className="tu-form-grid">
          <div className="tu-field">
            <label className="tu-label">Purchased Electricity (MWh/yr)</label>
            <input 
              type="number" value={electricityMwh} 
              onChange={e => setElectricityMwh(e.target.value)}
              className="tu-input" 
            />
          </div>
          <div className="tu-field">
            <label className="tu-label">Primary HQ Region</label>
            <select 
              value={region} 
              onChange={e => setRegion(e.target.value as 'US' | 'EU' | 'APAC')}
              className="tu-select"
            >
              <option value="US">North America (US Grid)</option>
              <option value="EU">Europe (EU Grid)</option>
              <option value="APAC">Asia Pacific</option>
            </select>
          </div>
        </div>

        <div className="tu-form-grid">
          <div className="tu-field">
            <label className="tu-label">Natural Gas Usage (Therms/yr)</label>
            <input 
              type="number" value={gasTherms} 
              onChange={e => setGasTherms(e.target.value)}
              className="tu-input" 
            />
          </div>
          <div className="tu-field">
            <label className="tu-label">Business Travel (Flight Miles/yr)</label>
            <input 
              type="number" value={travelMiles} 
              onChange={e => setTravelMiles(e.target.value)}
              className="tu-input" 
            />
          </div>
          <div className="tu-field">
            <label className="tu-label">Cloud Compute (vCPU Hrs/yr)</label>
            <input 
              type="number" value={cloudVcpuHrs} 
              onChange={e => setCloudVcpuHrs(e.target.value)}
              className="tu-input" 
            />
          </div>
        </div>
      </div>

      <div className="tu-result tu-animate">
        <div className="tu-result-hero">
          <div className="tu-metric">
            <span className="tu-metric-label">Total Annual Emissions</span>
            <span className="tu-metric-value">
              {(result.total / 1000).toLocaleString(undefined, { maximumFractionDigits: 1 })}
              <span className="tu-metric-unit"> metric tons CO₂e</span>
            </span>
          </div>
        </div>

        <div className="tu-table-wrap" style={{ marginBottom: '1.25rem' }}>
          <table className="tu-table">
            <thead>
              <tr>
                <th>Emissions Category</th>
                <th>Sources</th>
                <th>Amount (kg CO₂e)</th>
                <th>% of Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontWeight: 600 }}>Scope 1</td>
                <td style={{ fontSize: '0.8rem' }}>Direct (Facilities, Fleet)</td>
                <td>{Math.round(result.scope1).toLocaleString()}</td>
                <td>{result.total > 0 ? Math.round((result.scope1 / result.total) * 100) : 0}%</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600 }}>Scope 2</td>
                <td style={{ fontSize: '0.8rem' }}>Indirect (Purchased Electricity)</td>
                <td>{Math.round(result.scope2).toLocaleString()}</td>
                <td>{result.total > 0 ? Math.round((result.scope2 / result.total) * 100) : 0}%</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600 }}>Scope 3</td>
                <td style={{ fontSize: '0.8rem' }}>Value Chain (Travel, Cloud)</td>
                <td>{Math.round(result.scope3).toLocaleString()}</td>
                <td>{result.total > 0 ? Math.round((result.scope3 / result.total) * 100) : 0}%</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style={{ padding: '1rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', display: 'flex', gap: '1rem' }}>
          <div style={{ flex: 1, textAlign: 'center', padding: '1rem', background: '#fff', borderRadius: '4px', border: '1px solid #f1f5f9' }}>
            <span style={{ display: 'block', fontSize: '1.5rem', marginBottom: '0.5rem' }}>🚗</span>
            <span style={{ display: 'block', fontSize: '1.2rem', fontWeight: 700, color: '#1e293b' }}>{Math.round(result.equivalencies.cars).toLocaleString()}</span>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#64748b' }}>Passenger Cars Driven For 1 Year</span>
          </div>
          <div style={{ flex: 1, textAlign: 'center', padding: '1rem', background: '#fff', borderRadius: '4px', border: '1px solid #f1f5f9' }}>
            <span style={{ display: 'block', fontSize: '1.5rem', marginBottom: '0.5rem' }}>🌲</span>
            <span style={{ display: 'block', fontSize: '1.2rem', fontWeight: 700, color: '#16a34a' }}>{Math.round(result.equivalencies.trees).toLocaleString()}</span>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#64748b' }}>Tree Seedlings Grown For 10 Years</span>
          </div>
        </div>
      </div>
    </div>
  );
}
