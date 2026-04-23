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
      <h1 className="tu-title">DLC Liquid Cooling ROI</h1>
      <p className="tu-subtitle">Estimate retrofit costs and OpEx savings for AI-ready infrastructure.</p>
      <hr className="tu-divider" />

      <div className="tu-split-layout">
        <div className="tu-split-left">
          <div className="tu-form-grid">
            <div className="tu-field">
              <label className="tu-label">Total IT Power (kW)</label>
              <input
                type="number" value={totalITPowerKw}
                onChange={(e) => setTotalITPowerKw(e.target.value)}
                className="tu-input"
              />
            </div>
            <div className="tu-field">
              <label className="tu-label">Cost ($/kWh)</label>
              <input
                type="number" step="0.01" value={costPerKwh}
                onChange={(e) => setCostPerKwh(e.target.value)}
                className="tu-input"
              />
            </div>
          </div>

          <div className="tu-field" style={{ marginTop: '1.25rem' }}>
            <label className="tu-label">Grid Carbon Intensity (kg CO2e)</label>
            <input
              type="number" step="0.01" value={carbonIntensityKgpKwh}
              onChange={(e) => setCarbonIntensityKgpKwh(e.target.value)}
              className="tu-input"
            />
            <p style={{ fontSize: '0.72rem', color: '#4f565c', marginTop: '0.4rem' }}>
              US Avg: 0.385 | EU Avg: 0.231.
            </p>
          </div>

          <div className="tu-aeo" style={{ marginTop: '2rem' }}>
            <p>
              <strong>Data Center ROI:</strong> Legacy air-cooled racks (max ~20kW) are incompatible with next-gen 
              AI loads (e.g., NVIDIA Blackwell @ 120kW+). DLC retrofitting improves PUE from 1.5 to ~1.15, 
              directing 30% more power to compute rather than fans.
            </p>
          </div>
        </div>

        <div className="tu-split-right">
          {result ? (
            <div className="tu-result tu-animate" style={{ marginTop: 0 }}>
              <div className="tu-result-hero">
                <div className="tu-metric">
                  <span className="tu-metric-label">Estimated Payback</span>
                  <span className="tu-metric-value">{result.paybackPeriodYears.toFixed(1)}<span className="tu-metric-unit">yr</span></span>
                </div>
                <div className="tu-metric">
                  <span className="tu-metric-label">5-Year ROI</span>
                  <span className="tu-metric-value" style={{ color: result.roi5Year > 0 ? '#10b981' : '#dc2626' }}>
                    {result.roi5Year.toFixed(0)}<span className="tu-metric-unit">%</span>
                  </span>
                </div>
              </div>

              <div className="tu-table-wrap" style={{ marginBottom: '1rem' }}>
                <table className="tu-table">
                  <tbody>
                    <tr>
                      <td style={{ fontWeight: 600, fontSize: '0.8rem' }}>Energy Savings</td>
                      <td style={{ color: '#10b981', fontWeight: 700, fontSize: '0.8rem' }}>
                        ${result.annualSavingsOpex.toLocaleString(undefined, { maximumFractionDigits: 0 })}/yr
                      </td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: 600, fontSize: '0.8rem' }}>Power Reduced</td>
                      <td style={{ fontSize: '0.8rem' }}>{Math.round(result.annualPowerSavingsKWh / 1000).toLocaleString()} MWh/yr</td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: 600, fontSize: '0.8rem' }}>Water Reduced</td>
                      <td style={{ fontSize: '0.8rem' }}>{Math.round(result.annualWaterSavingsLiters).toLocaleString()} L/yr</td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: 600, fontSize: '0.8rem' }}>Emissions Prevented</td>
                      <td style={{ fontSize: '0.8rem' }}>{Math.round(result.emissionsReducedKg / 1000).toLocaleString()} Tons CO₂e</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div style={{ padding: '0.875rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
                  <div>
                    <span style={{ display: 'block', fontSize: '0.65rem', color: '#4f565c', textTransform: 'uppercase', fontWeight: 700 }}>PUE</span>
                    <span style={{ fontSize: '1rem', fontWeight: 700, color: '#1e3a8a' }}>{result.pueImprovement}</span>
                  </div>
                  <div>
                    <span style={{ display: 'block', fontSize: '0.65rem', color: '#4f565c', textTransform: 'uppercase', fontWeight: 700 }}>Density</span>
                    <span style={{ fontSize: '1rem', fontWeight: 700, color: '#1e3a8a' }}>{result.densityIncreaseMulti}x</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', border: '2px dashed #d4d9de', borderRadius: '10px', color: '#4f565c' }}>
              <p>Enter power values to calculate ROI.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
