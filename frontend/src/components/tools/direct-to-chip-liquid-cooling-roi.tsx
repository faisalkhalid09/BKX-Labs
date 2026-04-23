import { useState, useMemo } from 'react';
import { DollarSign, TrendingUp, Clock, BarChart3 } from 'lucide-react';
import ToolToAgencyCTA from './ToolToAgencyCTA';

interface YearlyProjection {
  year: number;
  airCoolingCost: number;
  liquidCoolingCost: number;
  totalSavings: number;
  cumulativeSavings: number;
  paybackAchieved: boolean;
}

interface ROIResult {
  capitalCost: number;
  paybackPeriodMonths: number;
  paybackPeriodYears: number;
  roi5Year: number;
  totalSavings5Year: number;
  annualSavings: number;
  liquidCoolingPercentage: number;
  breakEvenYear: number;
  projections: YearlyProjection[];
  recommendations: string[];
}

export function DirectToChipLiquidCoolingRoi() {
  const [racks, setRacks] = useState('48');
  const [capitalCost, setCapitalCost] = useState('125000');
  const [airAnnualOpex, setAirAnnualOpex] = useState('84000');
  const [liquidAnnualOpex, setLiquidAnnualOpex] = useState('45000');
  const [electricityCostPerKwYear, setElectricityCostPerKwYear] = useState('120');
  const [projectYears, setProjectYears] = useState('5');

  const result: ROIResult | null = useMemo(() => {
    const numRacks = Math.max(1, parseInt(racks) || 1);
    const capCost = Math.max(0, parseFloat(capitalCost) || 0);
    const airOpex = Math.max(0, parseFloat(airAnnualOpex) || 0);
    const liquidOpex = Math.max(0, parseFloat(liquidAnnualOpex) || 0);
    const years = Math.max(1, parseInt(projectYears) || 5);

    // Annual savings calculation
    const annualSavings = airOpex - liquidOpex;
    
    // Calculate payback period (in months)
    let paybackMonths = 0;
    if (annualSavings > 0) {
      paybackMonths = Math.round((capCost / annualSavings) * 12);
    } else {
      paybackMonths = 999; // No payback if no savings
    }

    const paybackYears = (paybackMonths / 12).toFixed(1);

    // Find break-even year
    let breakEvenYear = years + 1;
    let cumulativeSavings = 0;
    for (let y = 1; y <= years; y++) {
      cumulativeSavings += annualSavings;
      if (cumulativeSavings >= capCost && breakEvenYear > years) {
        breakEvenYear = y;
      }
    }

    // 5-year projection
    const projections: YearlyProjection[] = [];
    let cumSavings = 0;
    let paybackAchieved = false;

    for (let y = 1; y <= years; y++) {
      const airCost = airOpex * y;
      const liquidCost = capCost + liquidOpex * y;
      const yearlySavings = airOpex - liquidOpex;
      cumSavings += yearlySavings;
      
      if (cumSavings >= capCost && !paybackAchieved) {
        paybackAchieved = true;
      }

      projections.push({
        year: y,
        airCoolingCost: airCost,
        liquidCoolingCost: liquidCost,
        totalSavings: yearlySavings,
        cumulativeSavings: cumSavings,
        paybackAchieved,
      });
    }

    const totalSavings5Year = cumSavings;
    const roi5Year = capCost > 0 ? Math.round((totalSavings5Year / capCost) * 100) : 0;
    const liquidCoolingPercentage = Math.round((liquidOpex / airOpex) * 100);

    // Generate recommendations
    const recommendations: string[] = [];

    if (paybackMonths <= 24) {
      recommendations.push('✓ Quick ROI: Payback within 2 years — strong financial case for immediate deployment');
    } else if (paybackMonths <= 48) {
      recommendations.push('⟳ Moderate ROI: Payback between 2-4 years — justified for large-scale data centers');
    } else {
      recommendations.push('✗ Extended payback: Consider reducing CapEx through phased rollout or vendor partnerships');
    }

    if (liquidCoolingPercentage < 60) {
      recommendations.push('✓ Strong OpEx advantage: Liquid cooling reduces operating costs by >40%');
    }

    if (numRacks < 20) {
      recommendations.push('⟳ Small deployment: ROI improves significantly with scale — consider pilot + expansion');
    } else if (numRacks > 100) {
      recommendations.push('✓ Large scale: Enterprise economics favor liquid cooling — negotiate multi-year maintenance contracts');
    }

    if (roi5Year > 150) {
      recommendations.push('✓ Exceptional returns: 5-year ROI >150% — recommend immediate implementation');
    }

    recommendations.push('✓ Long-term benefit: Liquid cooling enables higher power density and future chip generations');

    return {
      capitalCost: capCost,
      paybackPeriodMonths: paybackMonths,
      paybackPeriodYears: parseFloat(paybackYears),
      roi5Year,
      totalSavings5Year,
      annualSavings,
      liquidCoolingPercentage,
      breakEvenYear,
      projections,
      recommendations,
    };
  }, [racks, capitalCost, airAnnualOpex, liquidAnnualOpex, electricityCostPerKwYear, projectYears]);

  const handleReset = () => {
    setRacks('48');
    setCapitalCost('125000');
    setAirAnnualOpex('84000');
    setLiquidAnnualOpex('45000');
    setElectricityCostPerKwYear('120');
    setProjectYears('5');
  };

  const formatCurrencyFull = (num: number) => {
    return `$${num.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      {/* Top Banner Ad Slot */}
      <div className="mb-8 bg-slate-100 border border-slate-300 rounded-md flex items-center justify-center h-24">
        <div className="text-slate-500 text-sm">728×90 Ad Slot</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Input Section */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-slate-900">Financial Inputs</h2>

            {/* Infrastructure Parameters */}
            <div className="space-y-4">
              <h3 className="font-semibold text-slate-900 text-sm">Infrastructure</h3>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <BarChart3 size={18} className="text-slate-600" />
                  <label className="font-semibold text-slate-900">Number of Racks</label>
                </div>
                <p className="text-xs text-slate-600 mb-2">Total rack count for liquid cooling deployment</p>
                <input
                  type="number"
                  value={racks}
                  onChange={(e) => setRacks(e.target.value)}
                  min="1"
                  max="10000"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-slate-900"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <DollarSign size={18} className="text-slate-600" />
                  <label className="font-semibold text-slate-900">Capital Cost (Liquid Cooling System)</label>
                </div>
                <p className="text-xs text-slate-600 mb-2">Total CapEx for installing direct-to-chip liquid cooling</p>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-slate-600">$</span>
                  <input
                    type="number"
                    value={capitalCost}
                    onChange={(e) => setCapitalCost(e.target.value)}
                    min="0"
                    max="10000000"
                    className="w-full pl-8 pr-3 py-2 border border-slate-300 rounded-md text-slate-900"
                  />
                </div>
              </div>
            </div>

            {/* Operating Cost Parameters */}
            <div className="space-y-4 border-t border-slate-300 pt-4">
              <h3 className="font-semibold text-slate-900 text-sm">Annual Operating Costs</h3>

              <div className="space-y-2">
                <label className="font-semibold text-slate-900 text-sm">Air Cooling (Current Annual OpEx)</label>
                <p className="text-xs text-slate-600 mb-2">Total annual cost for existing air-cooled infrastructure</p>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-slate-600">$</span>
                  <input
                    type="number"
                    value={airAnnualOpex}
                    onChange={(e) => setAirAnnualOpex(e.target.value)}
                    min="0"
                    max="10000000"
                    className="w-full pl-8 pr-3 py-2 border border-slate-300 rounded-md text-slate-900"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-semibold text-slate-900 text-sm">Liquid Cooling (Projected Annual OpEx)</label>
                <p className="text-xs text-slate-600 mb-2">Total annual cost for liquid cooling (electricity + maintenance)</p>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-slate-600">$</span>
                  <input
                    type="number"
                    value={liquidAnnualOpex}
                    onChange={(e) => setLiquidAnnualOpex(e.target.value)}
                    min="0"
                    max="10000000"
                    className="w-full pl-8 pr-3 py-2 border border-slate-300 rounded-md text-slate-900"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-semibold text-slate-900 text-sm">Electricity Cost</label>
                <p className="text-xs text-slate-600 mb-2">Cost per kW per year (used for OpEx calculations)</p>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-slate-600">$/kW/yr</span>
                  <input
                    type="number"
                    value={electricityCostPerKwYear}
                    onChange={(e) => setElectricityCostPerKwYear(e.target.value)}
                    min="0"
                    max="1000"
                    step="10"
                    className="w-full pl-20 pr-3 py-2 border border-slate-300 rounded-md text-slate-900"
                  />
                </div>
              </div>
            </div>

            {/* Projection Period */}
            <div className="space-y-4 border-t border-slate-300 pt-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Clock size={18} className="text-slate-600" />
                  <label className="font-semibold text-slate-900">Analysis Period (Years)</label>
                </div>
                <p className="text-xs text-slate-600 mb-2">Calculate financial projection over this timeframe</p>
                <input
                  type="number"
                  value={projectYears}
                  onChange={(e) => setProjectYears(e.target.value)}
                  min="1"
                  max="20"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-slate-900"
                />
              </div>
            </div>

            <button
              onClick={handleReset}
              className="px-4 py-2 border border-slate-300 text-slate-900 rounded-md hover:bg-slate-50 transition-colors"
            >
              Reset All
            </button>
          </div>

          {/* Financial Results */}
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-green-50 border border-green-300 rounded-md">
                <p className="text-xs text-slate-600 uppercase tracking-wider">Annual Savings</p>
                <p className="mt-2 text-2xl font-bold text-green-600">
                  {formatCurrencyFull(Math.max(0, result.annualSavings))}
                </p>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-300 rounded-md">
                <p className="text-xs text-slate-600 uppercase tracking-wider">Payback Period</p>
                <p className="mt-2 text-2xl font-bold text-blue-600">
                  {result.paybackPeriodMonths === 999 ? 'N/A' : `${result.paybackPeriodYears} years`}
                </p>
              </div>

              <div className="p-4 bg-purple-50 border border-purple-300 rounded-md">
                <p className="text-xs text-slate-600 uppercase tracking-wider">5-Year ROI</p>
                <p className="mt-2 text-2xl font-bold text-purple-600">{result.roi5Year}%</p>
              </div>

              <div className="p-4 bg-orange-50 border border-orange-300 rounded-md">
                <p className="text-xs text-slate-600 uppercase tracking-wider">5-Year Total Savings</p>
                <p className="mt-2 text-2xl font-bold text-orange-600">
                  {formatCurrencyFull(result.totalSavings5Year)}
                </p>
              </div>
            </div>

            {/* Break-even Analysis */}
            {result.breakEvenYear <= parseInt(projectYears) && (
              <div className="bg-blue-50 border border-blue-300 rounded-md p-4">
                <div className="flex items-center gap-3">
                  <TrendingUp size={20} className="text-blue-600" />
                  <div>
                    <p className="font-semibold text-slate-900">Break-Even Timeline</p>
                    <p className="text-sm text-slate-700 mt-1">
                      Liquid cooling investment recovers in <strong>Year {result.breakEvenYear}</strong> ({result.paybackPeriodMonths} months). After break-even, all savings are pure profit.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Year-by-Year Projection Table */}
            <div className="space-y-3">
              <h3 className="font-semibold text-slate-900">Year-by-Year Financial Projection</h3>
              <div className="overflow-x-auto border border-slate-300 rounded-md">
                <table className="w-full text-sm">
                  <thead className="bg-slate-100 border-b border-slate-300">
                    <tr>
                      <th className="px-4 py-2 text-left text-slate-900 font-semibold">Year</th>
                      <th className="px-4 py-2 text-right text-slate-900 font-semibold">Air Cooling Total</th>
                      <th className="px-4 py-2 text-right text-slate-900 font-semibold">Liquid Cooling Total</th>
                      <th className="px-4 py-2 text-right text-slate-900 font-semibold">Annual Savings</th>
                      <th className="px-4 py-2 text-right text-slate-900 font-semibold">Cumulative Savings</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.projections.map((proj, idx) => (
                      <tr
                        key={idx}
                        className={`border-t border-slate-200 ${
                          proj.paybackAchieved ? 'bg-green-50' : ''
                        }`}
                      >
                        <td className="px-4 py-2 text-slate-900 font-semibold">{proj.year}</td>
                        <td className="px-4 py-2 text-right text-slate-700">
                          {formatCurrencyFull(proj.airCoolingCost)}
                        </td>
                        <td className="px-4 py-2 text-right text-slate-700">
                          {formatCurrencyFull(proj.liquidCoolingCost)}
                        </td>
                        <td className="px-4 py-2 text-right text-green-600 font-semibold">
                          {formatCurrencyFull(proj.totalSavings)}
                        </td>
                        <td className="px-4 py-2 text-right">
                          <span
                            className={`font-semibold ${
                              proj.paybackAchieved ? 'text-green-600' : 'text-slate-700'
                            }`}
                          >
                            {formatCurrencyFull(proj.cumulativeSavings)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recommendations */}
            {result.recommendations.length > 0 && (
              <div className="bg-amber-50 border border-amber-300 rounded-md p-4 space-y-3">
                <h4 className="font-semibold text-slate-900">Investment Recommendations</h4>
                <ul className="space-y-2">
                  {result.recommendations.map((rec, idx) => (
                    <li key={idx} className="text-sm text-slate-700">
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar Ad + Reference */}
        <div className="lg:col-span-1 space-y-6">
          {/* Right Sidebar Ad Slot */}
          <div className="bg-slate-100 border border-slate-300 rounded-md flex flex-col items-center justify-center h-96">
            <div className="text-slate-500 text-sm text-center">300×600 Ad Slot</div>
          </div>

          {/* Technical Reference */}
          <div className="p-4 bg-slate-50 border border-slate-300 rounded-md space-y-4">
            <div>
              <h4 className="font-semibold text-slate-900 mb-2">Direct-to-Chip Basics</h4>
              <p className="text-xs text-slate-600 mb-3">
                Liquid cooling pumps coolant directly to chip heat spreaders, enabling higher power density than air cooling.
              </p>
              <ul className="text-xs text-slate-600 space-y-2">
                <li>• <strong>Efficiency Gain:</strong> 30-50% power reduction</li>
                <li>• <strong>Density:</strong> 3-5x more workload per rack</li>
                <li>• <strong>Lifespan:</strong> Extends CPU/GPU operating window</li>
              </ul>
            </div>

            <div className="border-t border-slate-300 pt-3">
              <h4 className="font-semibold text-slate-900 mb-2">ROI Drivers</h4>
              <ul className="text-xs text-slate-600 space-y-2">
                <li>✓ Electricity savings (PUE reduction)</li>
                <li>✓ Space consolidation (higher density)</li>
                <li>✓ Maintenance cost reduction</li>
                <li>✓ Longer equipment lifespan</li>
              </ul>
            </div>

            <div className="border-t border-slate-300 pt-3">
              <p className="text-xs text-slate-700 font-semibold">
                💡 <strong>Pro Tip:</strong> Negotiate CapEx with vendors or consider leasing models to reduce upfront costs and improve ROI.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-12 pt-8 border-t border-slate-300">
        <ToolToAgencyCTA />
      </div>
    </div>
  );
}
