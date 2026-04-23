import { useState, useMemo } from 'react';

// Industry constants and estimates
const CONSTANTS = {
  PUE_AIR: 1.5,
  PUE_LIQUID: 1.15,
  KW_PER_RACK_AIR: 20, // Max standard air cooling limit
  KW_PER_RACK_LIQUID: 80, // High density DLC limit
  COST_PER_KWH_DEFAULT: 0.12,
  HOURS_PER_YEAR: 8760,
  DLC_RETROFIT_COST_PER_KW: 300, // Estimate for CDU, manifolds, quick disconnects
  AIR_COOLING_OPEX_PERCENT: 0.4, // 40% of power bill is often cooling in air
  LIQUID_COOLING_OPEX_PERCENT: 0.1, // 10% in liquid
  WATER_USAGE_LITERS_PER_KWH_AIR: 1.8, // Evaporative cooling estimate
  WATER_USAGE_LITERS_PER_KWH_LIQUID: 0.2, // Closed loop DLC
};

interface ROIResult {
  pueImprovement: string;
  densityIncreaseMulti: number;
  annualSavingsOpex: number;
  annualPowerSavingsKWh: number;
  annualWaterSavingsLiters: number;
  estimatedRetrofitCapex: number;
  paybackPeriodYears: number;
  roi5Year: number;
  emissionsReducedKg: number;
}

export function DirectToChipLiquidCoolingRoi() {
  const [totalITPowerKw, setTotalITPowerKw] = useState('1000'); // 1 MW default
  const [costPerKwh, setCostPerKwh] = useState(CONSTANTS.COST_PER_KWH_DEFAULT.toString());
  const [carbonIntensityKgpKwh, setCarbonIntensityKgpKwh] = useState('0.385'); // US Average

  const result: ROIResult | null = useMemo(() => {
    const powerKW = parseFloat(totalITPowerKw) || 0;
    const costKWh = parseFloat(costPerKwh) || 0;
    const carbonKg = parseFloat(carbonIntensityKgpKwh) || 0;

    if (powerKW <= 0 || costKWh <= 0) return null;

    // Power Consumption calculation
    const currentTotalPowerKW = powerKW * CONSTANTS.PUE_AIR;
    const futureTotalPowerKW = powerKW * CONSTANTS.PUE_LIQUID;
    
    const annualPowerSavingsKW = (currentTotalPowerKW - futureTotalPowerKW);
    const annualPowerSavingsKWh = annualPowerSavingsKW * CONSTANTS.HOURS_PER_YEAR;

    const annualSavingsOpex = annualPowerSavingsKWh * costKWh;

    // Water computation (Rough estimates based on cooling tower usage vs closed loop)
    const annualWaterSavingsLiters = 
      (currentTotalPowerKW * CONSTANTS.HOURS_PER_YEAR * CONSTANTS.WATER_USAGE_LITERS_PER_KWH_AIR) - 
      (futureTotalPowerKW * CONSTANTS.HOURS_PER_YEAR * CONSTANTS.WATER_USAGE_LITERS_PER_KWH_LIQUID);

    // Capex computation
    const estimatedRetrofitCapex = powerKW * CONSTANTS.DLC_RETROFIT_COST_PER_KW;

    // Financials
    const paybackPeriodYears = annualSavingsOpex > 0 ? (estimatedRetrofitCapex / annualSavingsOpex) : 0;
    
    // 5 Year ROI = (Net Profit / Investment) * 100
    const netProfit5Yr = (annualSavingsOpex * 5) - estimatedRetrofitCapex;
    const roi5Year = estimatedRetrofitCapex > 0 ? (netProfit5Yr / estimatedRetrofitCapex) * 100 : 0;

    // Emissions
    const emissionsReducedKg = annualPowerSavingsKWh * carbonKg;

    return {
      pueImprovement: `${CONSTANTS.PUE_AIR} → ${CONSTANTS.PUE_LIQUID}`,
      densityIncreaseMulti: CONSTANTS.KW_PER_RACK_LIQUID / CONSTANTS.KW_PER_RACK_AIR,
      annualSavingsOpex,
      annualPowerSavingsKWh,
      annualWaterSavingsLiters,
      estimatedRetrofitCapex,
      paybackPeriodYears,
      roi5Year,
      emissionsReducedKg
    };
  }, [totalITPowerKw, costPerKwh, carbonIntensityKgpKwh]);

  return (
    <div className="tu-wrap">
      <span className="tu-tag">BKX Data Center Economics</span>
      <h1 className="tu-title">Direct-to-Chip Liquid Cooling (DLC) ROI Calculator</h1>
      <p className="tu-subtitle">Estimate the capital expenditure, operational savings, and environmental impact of retrofitting AI infrastructure with Direct-to-Chip Liquid Cooling.</p>
      <hr className="tu-divider" />

      <div className="tu-form-grid">
        <div className="tu-field">
          <label className="tu-label">Total IT Power (kW)</label>
          <input
            type="number" value={totalITPowerKw}
            onChange={(e) => setTotalITPowerKw(e.target.value)}
            className="tu-input" placeholder="e.g. 1000 for 1MW"
          />
        </div>
        <div className="tu-field">
          <label className="tu-label">Power Cost ($/kWh)</label>
          <input
            type="number" step="0.01" value={costPerKwh}
            onChange={(e) => setCostPerKwh(e.target.value)}
            className="tu-input"
          />
        </div>
        <div className="tu-field" style={{ gridColumn: '1 / -1' }}>
          <label className="tu-label">Grid Carbon Intensity (kg CO2e / kWh)</label>
          <input
            type="number" step="0.01" value={carbonIntensityKgpKwh}
            onChange={(e) => setCarbonIntensityKgpKwh(e.target.value)}
            className="tu-input"
          />
          <p style={{ fontSize: '0.75rem', color: '#4f565c', marginTop: '0.4rem' }}>
            US Avg is approx 0.385. Europe Avg is approx 0.231.
          </p>
        </div>
      </div>

      {result && (
        <div className="tu-result tu-animate">
          <div className="tu-result-hero">
            <div className="tu-metric">
              <span className="tu-metric-label">Estimated Payback</span>
              <span className="tu-metric-value">
                {result.paybackPeriodYears.toFixed(1)}<span className="tu-metric-unit">years</span>
              </span>
            </div>
            <div className="tu-metric">
              <span className="tu-metric-label">5-Year ROI</span>
              <span className="tu-metric-value" style={{ color: result.roi5Year > 0 ? '#10b981' : '#dc2626' }}>
                {result.roi5Year > 0 ? '+' : ''}{result.roi5Year.toFixed(0)}<span className="tu-metric-unit">%</span>
              </span>
            </div>
            <div className="tu-metric">
              <span className="tu-metric-label">Retrofit CapEx</span>
              <span className="tu-metric-value">
                ${(result.estimatedRetrofitCapex / 1000000).toFixed(2)}<span className="tu-metric-unit">M</span>
              </span>
            </div>
          </div>

          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0d2b5e', margin: '0 0 1rem' }}>Annual Operational Savings</h3>
          <div className="tu-table-wrap" style={{ marginBottom: '1.5rem' }}>
            <table className="tu-table">
              <tbody>
                <tr>
                  <td style={{ fontWeight: 600 }}>Energy Savings (OpEx)</td>
                  <td style={{ color: '#10b981', fontWeight: 'bold' }}>
                    ${result.annualSavingsOpex.toLocaleString(undefined, { maximumFractionDigits: 0 })} / yr
                  </td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 600 }}>Power Reduced</td>
                  <td>{Math.round(result.annualPowerSavingsKWh / 1000).toLocaleString()} MWh / yr</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 600 }}>Water Reduced</td>
                  <td>{Math.round(result.annualWaterSavingsLiters).toLocaleString()} Liters / yr</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 600 }}>Carbon Emissions Prevented</td>
                  <td>{Math.round(result.emissionsReducedKg / 1000).toLocaleString()} Metric Tons CO₂e</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style={{ padding: '1rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
            <p style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.8rem', textTransform: 'uppercase' }}>Performance Implications</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <div>
                <span style={{ display: 'block', fontSize: '0.75rem', color: '#4f565c', textTransform: 'uppercase', fontWeight: 700 }}>PUE Improvement</span>
                <span style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1e3a8a' }}>{result.pueImprovement}</span>
              </div>
              <div>
                <span style={{ display: 'block', fontSize: '0.75rem', color: '#4f565c', textTransform: 'uppercase', fontWeight: 700 }}>Rack Density Increase</span>
                <span style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1e3a8a' }}>{result.densityIncreaseMulti}x</span>
              </div>
            </div>
            <p style={{ fontSize: '0.8rem', color: '#4f565c', margin: '1rem 0 0' }}>
              Assumes transitioning from legacy air cooling (max ~20kW/rack) to high-density DLC (~80kW/rack) necessary for current-gen AI accelerators like NVIDIA Blackwell.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
