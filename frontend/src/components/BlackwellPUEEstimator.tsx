import React, { useState, useMemo } from 'react';
import { AlertTriangle, Zap, Leaf, DollarSign } from 'lucide-react';

// Blackwell GPU Power Specifications (April 2026)
const GPU_SPECS = {
  'B200': {
    name: 'NVIDIA B200',
    tdp_min: 700,
    tdp_max: 1000,
    tdp_avg: 850,
    vram: '192GB HBM3E',
    cooling_options: ['Air-Cooled (RDHx)', 'Direct-to-Chip (DTC)', 'Immersion'],
  },
  'GB200': {
    name: 'NVIDIA GB200 Superchip',
    tdp_min: 1100,
    tdp_max: 1300,
    tdp_avg: 1200,
    vram: '384GB HBM3E',
    cooling_options: ['Direct-to-Chip (DTC)', 'Immersion'],
  },
  'B300': {
    name: 'NVIDIA B300 / Blackwell Ultra',
    tdp_min: 1300,
    tdp_max: 1500,
    tdp_avg: 1400,
    vram: '256GB HBM3E',
    cooling_options: ['Direct-to-Chip (DTC)', 'Immersion'],
  },
};

const RACK_CONFIGS = {
  'NVL72': { gpus_per_rack: 9, name: 'NVL72 (9× GPUs)' },
  'NVL36': { gpus_per_rack: 8, name: 'NVL36 (8× GPUs)' },
  'Custom': { gpus_per_rack: 1, name: 'Custom' },
};

const COOLING_PUE = {
  'Air-Cooled (RDHx)': 1.35,
  'Direct-to-Chip (DTC)': 1.12,
  'Immersion': 1.08,
};

const POWER_DRAW_PROFILE = {
  'Air-Cooled (RDHx)': 0.95,
  'Direct-to-Chip (DTC)': 0.98,
  'Immersion': 0.99,
};

const REGIONAL_RATES = {
  'US': { rate: 0.08, carbon_intensity: 0.42 },
  'EU': { rate: 0.15, carbon_intensity: 0.25 },
  'APAC': { rate: 0.12, carbon_intensity: 0.55 },
  'Custom': { rate: 0.10, carbon_intensity: 0.40 },
};

export default function BlackwellPUEEstimator() {
  const [gpuModel, setGpuModel] = useState('B200');
  const [deploymentType, setDeploymentType] = useState('GPU Count');
  const [gpuCount, setGpuCount] = useState(72);
  const [rackConfig, setRackConfig] = useState('NVL72');
  const [coolingMode, setCoolingMode] = useState('Direct-to-Chip (DTC)');
  const [region, setRegion] = useState('US');
  const [customRate, setCustomRate] = useState(0.10);
  const [customCarbon, setCustomCarbon] = useState(0.40);
  const [utilizationRate, setUtilizationRate] = useState(0.8);

  const currentGPU = GPU_SPECS[gpuModel];
  const rackConfigData = RACK_CONFIGS[rackConfig];
  const utilityRate = region === 'Custom' ? customRate : REGIONAL_RATES[region].rate;
  const carbonIntensity = region === 'Custom' ? customCarbon : REGIONAL_RATES[region].carbon_intensity;
  const pue = COOLING_PUE[coolingMode];
  const powerDrawProfile = POWER_DRAW_PROFILE[coolingMode];

  // Calculate actual GPU count based on deployment type
  const actualGpuCount = deploymentType === 'Rack Count' 
    ? gpuCount * rackConfigData.gpus_per_rack 
    : gpuCount;

  const rackCount = Math.ceil(actualGpuCount / rackConfigData.gpus_per_rack);

  const calculations = useMemo(() => {
    // IT Power calculation
    const gpuPowerPerUnit = currentGPU.tdp_avg * powerDrawProfile * (utilizationRate);
    const totalGpuPower = gpuPowerPerUnit * actualGpuCount;
    const networkingOverhead = totalGpuPower * 0.15;
    const totalITPower = totalGpuPower + networkingOverhead;

    // Facility Power (with PUE)
    const facilityPower = totalITPower * pue;

    // Power per rack
    const powerPerRack = facilityPower / rackCount;

    // Annual consumption
    const annualConsumption = facilityPower * 8760;

    // Annual cost
    const annualCost = annualConsumption * utilityRate;
    const mounthlyCost = annualCost / 12;

    // Annual carbon
    const annualCarbon = annualConsumption * carbonIntensity;

    // Thermal alert
    const thermalAlert = powerPerRack > 50 && coolingMode === 'Air-Cooled (RDHx)';

    return {
      gpuPowerPerUnit: gpuPowerPerUnit.toFixed(0),
      totalGpuPower: totalGpuPower.toFixed(0),
      networkingOverhead: networkingOverhead.toFixed(0),
      totalITPower: totalITPower.toFixed(0),
      pue: pue.toFixed(2),
      facilityPower: facilityPower.toFixed(0),
      powerPerRack: powerPerRack.toFixed(1),
      annualConsumption: (annualConsumption / 1000000).toFixed(2),
      annualCost: annualCost.toFixed(0),
      monthlyCost: mounthlyCost.toFixed(0),
      annualCarbon: (annualCarbon / 1000).toFixed(1),
      thermalAlert,
      costPerGpu: (annualCost / actualGpuCount).toFixed(0),
      costPerKw: (annualCost / facilityPower).toFixed(2),
    };
  }, [gpuModel, actualGpuCount, coolingMode, utilityRate, carbonIntensity, utilizationRate, rackCount, currentGPU, powerDrawProfile]);

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <div className="border-b border-slate-700 bg-slate-800">
        <div className="max-w-6xl mx-auto px-6 py-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-2">Blackwell PUE & Energy Estimator</h1>
          <p className="text-slate-400">April 2026 AI Data Center Power & Cooling Calculator</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Direct Answer Block */}
        <div className="bg-blue-950 border-l-4 border-blue-500 p-6 mb-8 rounded-lg">
          <h2 className="text-lg font-bold text-white mb-3">Industry Standard</h2>
          <p className="text-slate-200 leading-relaxed">
            As of April 2026, deploying NVIDIA Blackwell GB200 NVL72 systems requires a minimum of <strong>120kW per rack</strong> and <strong>mandatory liquid cooling</strong>. Achieving a PUE below <strong>1.15</strong> is now the industry standard for AI factories using direct-to-chip (DTC) technology. Air-cooled deployments exceed thermal limits at >50kW per rack.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Input Panel */}
          <div className="lg:col-span-1 bg-slate-800 border border-slate-700 rounded-lg p-6">
            <h2 className="text-xl font-bold text-white mb-6">Configuration</h2>

            {/* GPU Model */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-slate-200 mb-2">GPU Model</label>
              <select
                value={gpuModel}
                onChange={(e) => setGpuModel(e.target.value)}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {Object.entries(GPU_SPECS).map(([key, gpu]) => (
                  <option key={key} value={key}>
                    {gpu.name} ({gpu.tdp_avg}W avg)
                  </option>
                ))}
              </select>
              <p className="text-xs text-slate-400 mt-1">TDP Range: {currentGPU.tdp_min}W - {currentGPU.tdp_max}W</p>
            </div>

            {/* Deployment Type */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-slate-200 mb-2">Deployment Type</label>
              <div className="space-y-2">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    value="GPU Count"
                    checked={deploymentType === 'GPU Count'}
                    onChange={(e) => setDeploymentType(e.target.value)}
                    className="w-4 h-4 text-blue-500"
                  />
                  <span className="ml-2 text-sm text-slate-200">Total GPU Count</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    value="Rack Count"
                    checked={deploymentType === 'Rack Count'}
                    onChange={(e) => setDeploymentType(e.target.value)}
                    className="w-4 h-4 text-blue-500"
                  />
                  <span className="ml-2 text-sm text-slate-200">Rack Count</span>
                </label>
              </div>
            </div>

            {/* GPU / Rack Count */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-slate-200 mb-2">
                {deploymentType === 'GPU Count' ? 'Total GPUs' : 'Rack Count'}: <span className="text-blue-400">{gpuCount}</span>
              </label>
              <input
                type="range"
                min={deploymentType === 'GPU Count' ? '1' : '1'}
                max={deploymentType === 'GPU Count' ? '1000' : '100'}
                value={gpuCount}
                onChange={(e) => setGpuCount(parseInt(e.target.value))}
                className="w-full"
              />
              <p className="text-xs text-slate-400 mt-1">
                Actual GPUs: <strong>{actualGpuCount}</strong> | Racks: <strong>{rackCount}</strong>
              </p>
            </div>

            {/* Rack Configuration */}
            {deploymentType === 'Rack Count' && (
              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-200 mb-2">Rack Configuration</label>
                <select
                  value={rackConfig}
                  onChange={(e) => setRackConfig(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {Object.entries(RACK_CONFIGS).map(([key, config]) => (
                    <option key={key} value={key}>{config.name}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Cooling Mode */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-slate-200 mb-2">Cooling Mode</label>
              <select
                value={coolingMode}
                onChange={(e) => setCoolingMode(e.target.value)}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {currentGPU.cooling_options.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              <p className="text-xs text-slate-400 mt-1">PUE: {pue.toFixed(2)}</p>
            </div>

            {/* Region */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-slate-200 mb-2">Region / Utility Rate</label>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="US">US ($0.08/kWh)</option>
                <option value="EU">EU ($0.15/kWh)</option>
                <option value="APAC">APAC ($0.12/kWh)</option>
                <option value="Custom">Custom</option>
              </select>
            </div>

            {region === 'Custom' && (
              <div className="mb-6 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-2">Utility Rate ($/kWh)</label>
                  <input
                    type="number"
                    min="0.01"
                    step="0.01"
                    value={customRate}
                    onChange={(e) => setCustomRate(parseFloat(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-200 mb-2">Carbon Intensity (kg CO₂/kWh)</label>
                  <input
                    type="number"
                    min="0.01"
                    step="0.01"
                    value={customCarbon}
                    onChange={(e) => setCustomCarbon(parseFloat(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}

            {/* Utilization Rate */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-slate-200 mb-2">
                GPU Utilization: <span className="text-blue-400">{(utilizationRate * 100).toFixed(0)}%</span>
              </label>
              <input
                type="range"
                min="0.1"
                max="1"
                step="0.1"
                value={utilizationRate}
                onChange={(e) => setUtilizationRate(parseFloat(e.target.value))}
                className="w-full"
              />
              <p className="text-xs text-slate-400 mt-1">Typical range: 70-90% for inference</p>
            </div>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-2 space-y-6">
            {/* Thermal Alert */}
            {calculations.thermalAlert && (
              <div className="bg-red-950 border-l-4 border-red-500 rounded-lg p-4 flex gap-3">
                <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-red-200">Thermal Limit Warning</h3>
                  <p className="text-xs text-red-300 mt-1">
                    Rack density exceeds 50kW with air cooling. Migrate to Direct-to-Chip (DTC) or Immersion cooling to meet thermal targets.
                  </p>
                </div>
              </div>
            )}

            {/* Power Metrics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
                <p className="text-slate-400 text-sm font-semibold">Total IT Power</p>
                <p className="text-3xl font-bold text-white mt-2">{calculations.totalITPower} kW</p>
                <p className="text-xs text-slate-400 mt-2">GPU: {calculations.totalGpuPower} kW + Network: {calculations.networkingOverhead} kW</p>
              </div>
              <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
                <p className="text-slate-400 text-sm font-semibold">Facility Power (PUE {calculations.pue})</p>
                <p className="text-3xl font-bold text-white mt-2">{calculations.facilityPower} kW</p>
                <p className="text-xs text-slate-400 mt-2">
                  {calculations.powerPerRack} kW per rack
                </p>
              </div>
            </div>

            {/* Cost Metrics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <DollarSign className="w-4 h-4 text-green-400" />
                  <p className="text-slate-400 text-sm font-semibold">Annual Operating Cost</p>
                </div>
                <p className="text-3xl font-bold text-white">${calculations.annualCost}</p>
                <p className="text-xs text-slate-400 mt-2">
                  ${calculations.monthlyCost}/month | ${calculations.costPerGpu}/GPU/year
                </p>
              </div>
              <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Leaf className="w-4 h-4 text-green-400" />
                  <p className="text-slate-400 text-sm font-semibold">Annual Carbon</p>
                </div>
                <p className="text-3xl font-bold text-white">{calculations.annualCarbon} MT CO₂</p>
                <p className="text-xs text-slate-400 mt-2">
                  Annual consumption: {calculations.annualConsumption} GWh
                </p>
              </div>
            </div>

            {/* Power Consumption Breakdown */}
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
              <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-400" />
                Power Consumption Breakdown
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">GPU Power (per unit)</span>
                  <span className="font-semibold text-white">{calculations.gpuPowerPerUnit} W</span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500" style={{width: '70%'}}></div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Total GPU Power</span>
                  <span className="font-semibold text-white">{calculations.totalGpuPower} kW</span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500" style={{width: '75%'}}></div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Networking Overhead (15%)</span>
                  <span className="font-semibold text-white">{calculations.networkingOverhead} kW</span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-500" style={{width: '15%'}}></div>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-slate-700">
                  <span className="text-slate-200 font-semibold">Total IT Power</span>
                  <span className="font-bold text-blue-400 text-lg">{calculations.totalITPower} kW</span>
                </div>
              </div>
            </div>

            {/* Cooling Technology Comparison */}
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
              <h3 className="font-bold text-white mb-4">Cooling Technology Comparison (PUE Impact)</h3>
              <div className="space-y-3">
                {Object.entries(COOLING_PUE).map(([cooling, pueValue]) => {
                  const isSelected = cooling === coolingMode;
                  return (
                    <div key={cooling} className={`p-3 rounded border ${isSelected ? 'border-blue-500 bg-blue-900 bg-opacity-20' : 'border-slate-600'}`}>
                      <div className="flex justify-between items-center">
                        <span className={isSelected ? 'text-blue-300 font-semibold' : 'text-slate-300'}>{cooling}</span>
                        <div className="flex gap-4 text-right">
                          <div>
                            <p className="text-xs text-slate-400">PUE</p>
                            <p className="font-bold text-white">{pueValue.toFixed(2)}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* GPU Specifications Table */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-slate-700 bg-slate-700">
            <h2 className="text-xl font-bold text-white">Blackwell GPU Specifications (April 2026)</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-900">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-white">GPU Model</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-white">Min TDP</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-white">Avg TDP</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-white">Max TDP</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-white">VRAM</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {Object.entries(GPU_SPECS).map(([key, gpu]) => (
                  <tr key={key} className={gpuModel === key ? 'bg-blue-900 bg-opacity-20' : 'hover:bg-slate-700'}>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-white">{gpu.name}</p>
                    </td>
                    <td className="px-6 py-4 text-center text-slate-300">{gpu.tdp_min}W</td>
                    <td className="px-6 py-4 text-center font-semibold text-white">{gpu.tdp_avg}W</td>
                    <td className="px-6 py-4 text-center text-slate-300">{gpu.tdp_max}W</td>
                    <td className="px-6 py-4 text-center text-slate-300">{gpu.vram}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Blackwell PUE & Energy Estimator",
          "description": "NVIDIA Blackwell data center power consumption and PUE calculator",
          "applicationCategory": "InfrastructureTool",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          }
        })
      }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Dataset",
          "name": "Blackwell GPU Power Specifications April 2026",
          "description": "NVIDIA Blackwell B200, GB200, B300 power consumption and cooling specifications",
          "creator": "BKX Labs"
        })
      }} />
    </div>
  );
}
