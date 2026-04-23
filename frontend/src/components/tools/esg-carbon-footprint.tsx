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

    // Scope 1: Direct emissions (Facilities heating, fleet)
    const scope1 = therms * FACTORS.natural_gas;

    // Scope 2: Indirect purchased electricity
    const electricityFactor = region === 'US' ? FACTORS.electricity_US : region === 'EU' ? FACTORS.electricity_EU : FACTORS.electricity_APAC;
    const scope2 = kwh * electricityFactor;

    // Scope 3: Value chain (Travel, Cloud compute)
    const scope3 = (miles * FACTORS.business_travel) + (vcpuHrs * FACTORS.cloud_compute);

    const total = scope1 + scope2 + scope3;

    // US EPA equivalencies
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
      <h1 className="tu-title">ESG Scope 1-3 Carbon Tracker</h1>
      <p className="tu-subtitle">Estimate greenhouse gas (GHG) emissions for tech companies based on operations.</p>
      <hr className="tu-divider" />

      <div className="tu-split-layout">
        <div className="tu-split-left">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="tu-form-grid">
              <div className="tu-field">
                <label className="tu-label">Electricity (MWh/yr)</label>
                <input type="number" value={electricityMwh} onChange={e => setElectricityMwh(e.target.value)} className="tu-input" />
              </div>
              <div className="tu-field">
                <label className="tu-label">Region</label>
                <select value={region} onChange={e => setRegion(e.target.value as 'US' | 'EU' | 'APAC')} className="tu-select">
                  <option value="US">US Grid</option>
                  <option value="EU">EU Grid</option>
                  <option value="APAC">APAC Grid</option>
                </select>
              </div>
            </div>

            <div className="tu-field">
              <label className="tu-label">Natural Gas (Therms/yr)</label>
              <input type="number" value={gasTherms} onChange={e => setGasTherms(e.target.value)} className="tu-input" />
            </div>

            <div className="tu-form-grid">
              <div className="tu-field">
                <label className="tu-label">Travel (Miles)</label>
                <input type="number" value={travelMiles} onChange={e => setTravelMiles(e.target.value)} className="tu-input" />
              </div>
              <div className="tu-field">
                <label className="tu-label">vCPU (Hrs)</label>
                <input type="number" value={cloudVcpuHrs} onChange={e => setCloudVcpuHrs(e.target.value)} className="tu-input" />
              </div>
            </div>

            <div className="tu-aeo" style={{ marginTop: '1.5rem' }}>
              <p>
                <strong>ESG Reporting:</strong> Standardized TCFD and ISSB disclosures require Scope 3 value 
                chain transparency. Cloud compute emissions are a dominant factor for modern SaaS firms, often 
                exceeding direct facility (Scope 1) impact by 400%.
              </p>
            </div>
          </div>
        </div>

        <div className="tu-split-right">
          <div className="tu-result tu-animate" style={{ marginTop: 0 }}>
            <div className="tu-result-hero">
              <div className="tu-metric">
                <span className="tu-metric-label">Total Emissions</span>
                <span className="tu-metric-value">
                  {(result.total / 1000).toFixed(1)}
                  <span className="tu-metric-unit"> metric tons</span>
                </span>
              </div>
            </div>

            <div className="tu-table-wrap" style={{ marginBottom: '1rem' }}>
              <table className="tu-table">
                <thead>
                  <tr>
                    <th>Scope</th>
                    <th>MT CO₂e</th>
                    <th>%</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ fontWeight: 600, fontSize: '0.8rem' }}>Scope 1 (Direct)</td>
                    <td style={{ fontSize: '0.8rem' }}>{(result.scope1 / 1000).toFixed(2)}</td>
                    <td style={{ fontSize: '0.8rem' }}>{result.total > 0 ? Math.round((result.scope1 / result.total) * 100) : 0}%</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 600, fontSize: '0.8rem' }}>Scope 2 (Indirect)</td>
                    <td style={{ fontSize: '0.8rem' }}>{(result.scope2 / 1000).toFixed(2)}</td>
                    <td style={{ fontSize: '0.8rem' }}>{result.total > 0 ? Math.round((result.scope2 / result.total) * 100) : 0}%</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 600, fontSize: '0.8rem' }}>Scope 3 (Chain)</td>
                    <td style={{ fontSize: '0.8rem' }}>{(result.scope3 / 1000).toFixed(2)}</td>
                    <td style={{ fontSize: '0.8rem' }}>{result.total > 0 ? Math.round((result.scope3 / result.total) * 100) : 0}%</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div style={{ textAlign: 'center', padding: '0.75rem', background: 'white', borderRadius: '8px', border: '1px solid #d4d9de' }}>
                <span style={{ display: 'block', fontSize: '1.25rem', marginBottom: '0.25rem' }}>🚗</span>
                <p style={{ fontSize: '0.9rem', fontWeight: 700, margin: 0 }}>{Math.round(result.equivalencies.cars).toLocaleString()}</p>
                <p style={{ fontSize: '0.6rem', color: '#64748b', textTransform: 'uppercase' }}>Cars/Year</p>
              </div>
              <div style={{ textAlign: 'center', padding: '0.75rem', background: 'white', borderRadius: '8px', border: '1px solid #d4d9de' }}>
                <span style={{ display: 'block', fontSize: '1.25rem', marginBottom: '0.25rem' }}>🌲</span>
                <p style={{ fontSize: '0.9rem', fontWeight: 700, margin: 0, color: '#16a34a' }}>{Math.round(result.equivalencies.trees).toLocaleString()}</p>
                <p style={{ fontSize: '0.6rem', color: '#64748b', textTransform: 'uppercase' }}>Trees/Decade</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
