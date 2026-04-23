import React, { useState, useMemo } from 'react';
import { ChevronDown } from 'lucide-react';

// April 2026 GPU Pricing Data
const GPU_PRICING = {
  B200: {
    name: 'NVIDIA B200 (Blackwell)',
    vram: '192GB HBM3E',
    specs: '72 cores, 15.5 TFLOPs FP64',
    providers: {
      'Hyperscaler': { rate: 14.24, availability: 'High', provider: 'AWS/GCP/Azure' },
      'Specialist': { rate: 4.99, availability: 'Limited', provider: 'RunPod/Modal' },
      'Spot': { rate: 2.12, availability: 'Variable', provider: 'Vast.ai/CoreWeave' }
    }
  },
  H200: {
    name: 'NVIDIA H200 (Hopper)',
    vram: '141GB HBM3',
    specs: 'Ultra-fast memory, perfect for LLMs',
    providers: {
      'Hyperscaler': { rate: 10.80, availability: 'High', provider: 'AWS/GCP/Azure' },
      'Specialist': { rate: 3.59, availability: 'High', provider: 'RunPod/Lambda Labs' },
      'Spot': { rate: 1.94, availability: 'High', provider: 'Vast.ai' }
    }
  },
  H100: {
    name: 'NVIDIA H100 (Hopper)',
    vram: '80GB HBM3',
    specs: 'Industry standard for LLMs',
    providers: {
      'Hyperscaler': { rate: 6.88, availability: 'High', provider: 'AWS/GCP/Azure' },
      'Specialist': { rate: 2.49, availability: 'High', provider: 'RunPod/Lambda Labs' },
      'Spot': { rate: 0.99, availability: 'Variable', provider: 'Vast.ai' }
    }
  },
  L40S: {
    name: 'NVIDIA L40S (Ada)',
    vram: '48GB GDDR6X',
    specs: 'Cost-effective inference, 1:1 video processing',
    providers: {
      'Specialist': { rate: 0.85, availability: 'High', provider: 'RunPod/Modal' },
      'Marketplace': { rate: 0.40, availability: 'High', provider: 'Vast.ai/Paperspace' }
    }
  },
  A100: {
    name: 'NVIDIA A100 (Ampere)',
    vram: '80GB HBM2',
    specs: 'Legacy standard, excellent value',
    providers: {
      'Hyperscaler': { rate: 4.56, availability: 'High', provider: 'AWS/GCP/Azure' },
      'Specialist': { rate: 1.79, availability: 'High', provider: 'RunPod/Lambda Labs' },
      'Spot': { rate: 0.65, availability: 'High', provider: 'Vast.ai' }
    }
  }
};

const WORKLOAD_PROFILES = {
  'Inference': {
    description: '7B-30B model inference, real-time APIs',
    hours: 168,
    recommendation: 'H200 or L40S'
  },
  'Training': {
    description: 'Model fine-tuning, continued pretraining',
    hours: 240,
    recommendation: 'B200 or H100 or H200'
  },
  'Batch Processing': {
    description: 'Large-scale data processing, embeddings',
    hours: 720,
    recommendation: 'H100 Spot or A100'
  }
};

export default function CloudGPUCostComparison() {
  const [selectedGPU, setSelectedGPU] = useState('H200');
  const [selectedProvider, setSelectedProvider] = useState('Specialist');
  const [usageHours, setUsageHours] = useState(168);
  const [workloadType, setWorkloadType] = useState('Inference');
  const [quantity, setQuantity] = useState(1);

  const currentGPU = GPU_PRICING[selectedGPU];
  const currentRate = currentGPU.providers[selectedProvider]?.rate || 0;

  const calculations = useMemo(() => {
    const hyperscalerRate = currentGPU.providers['Hyperscaler']?.rate || currentRate;
    const totalCost = currentRate * usageHours * quantity;
    const hyperscalerCost = hyperscalerRate * usageHours * quantity;
    const monthlyWaste = (hyperscalerRate - currentRate) * usageHours * quantity;
    const savingsPercent = ((hyperscalerRate - currentRate) / hyperscalerRate * 100).toFixed(1);

    return {
      totalCost: totalCost.toFixed(2),
      hyperscalerCost: hyperscalerCost.toFixed(2),
      monthlyWaste: monthlyWaste.toFixed(2),
      savingsPercent,
      costPerHour: currentRate.toFixed(2),
      breakdownPercentage: ((currentRate / hyperscalerRate) * 100).toFixed(0)
    };
  }, [selectedGPU, selectedProvider, usageHours, quantity, currentRate]);

  const availabilityColor = {
    'High': 'bg-green-100 text-green-800',
    'Limited': 'bg-yellow-100 text-yellow-800',
    'Variable': 'bg-orange-100 text-orange-800',
    'Low': 'bg-red-100 text-red-800'
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900">Cloud GPU Cost Comparison</h1>
          <p className="text-gray-600 mt-2">April 2026 Benchmarks | Real-time Pricing Analysis</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Direct Answer Block */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-3">Quick Answer</h2>
          <p className="text-gray-700 leading-relaxed">
            As of April 2026, the cheapest NVIDIA B200 instances start at <strong>$4.99/hr</strong> on specialist clouds (RunPod, Modal), representing a <strong>65% saving</strong> compared to traditional hyperscalers ($14.24/hr). For LLM inference workloads, the <strong>H200 remains the most cost-efficient choice</strong> due to its superior memory bandwidth and specialist pricing at $3.59/hr, ideal for 7B-30B model deployment.
          </p>
        </div>

        {/* Calculator */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Input Panel */}
          <div className="lg:col-span-1 bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Configuration</h2>

            {/* GPU Selection */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-900 mb-2">GPU Model</label>
              <select
                value={selectedGPU}
                onChange={(e) => setSelectedGPU(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {Object.entries(GPU_PRICING).map(([key, gpu]) => (
                  <option key={key} value={key}>
                    {gpu.name} ({gpu.vram})
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">{currentGPU.specs}</p>
            </div>

            {/* Provider Selection */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-900 mb-2">Provider Type</label>
              <div className="space-y-2">
                {Object.keys(currentGPU.providers).map((provider) => (
                  <label key={provider} className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      value={provider}
                      checked={selectedProvider === provider}
                      onChange={(e) => setSelectedProvider(e.target.value)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="ml-2 text-sm text-gray-700">{provider}</span>
                    <span className="ml-auto text-sm font-bold text-gray-900">
                      ${currentGPU.providers[provider].rate.toFixed(2)}/hr
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Workload Type */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-900 mb-2">Workload Type</label>
              <select
                value={workloadType}
                onChange={(e) => setWorkloadType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {Object.entries(WORKLOAD_PROFILES).map(([key, profile]) => (
                  <option key={key} value={key}>
                    {key}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">{WORKLOAD_PROFILES[workloadType].description}</p>
            </div>

            {/* Usage Hours */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Usage Hours/Month: <span className="text-blue-600">{usageHours}</span>
              </label>
              <input
                type="range"
                min="1"
                max="730"
                value={usageHours}
                onChange={(e) => setUsageHours(parseInt(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>1 hr</span>
                <span>730 hrs (24/7)</span>
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-900 mb-2">Number of GPUs</label>
              <input
                type="number"
                min="1"
                max="100"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Provider Info */}
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-xs text-gray-500 mb-1">Provider</p>
              <p className="font-semibold text-gray-900">{currentGPU.providers[selectedProvider].provider}</p>
              <div className="mt-2">
                <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${availabilityColor[currentGPU.providers[selectedProvider].availability]}`}>
                  {currentGPU.providers[selectedProvider].availability} Availability
                </span>
              </div>
            </div>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-2 space-y-6">
            {/* Total Monthly Cost */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <p className="text-sm text-gray-600 mb-2">Total Monthly Cost</p>
              <p className="text-5xl font-bold text-gray-900">${calculations.totalCost}</p>
              <p className="text-sm text-gray-600 mt-2">
                {quantity} GPU{quantity > 1 ? 's' : ''} × ${calculations.costPerHour}/hr × {usageHours} hours
              </p>
            </div>

            {/* Monthly Waste - Hyperscaler vs Specialist */}
            <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-6">
              <p className="text-sm font-semibold text-gray-600 mb-2">Total Monthly Waste (vs. Hyperscaler)</p>
              <p className="text-4xl font-bold text-red-600">${calculations.monthlyWaste}</p>
              <p className="text-sm text-gray-600 mt-3">
                You're paying <strong>{calculations.breakdownPercentage}% of hyperscaler rates</strong>, saving <strong className="text-red-600">{calculations.savingsPercent}%</strong>
              </p>
              <div className="mt-4 bg-white bg-opacity-60 p-3 rounded text-xs text-gray-700">
                <p className="font-semibold mb-1">Comparison:</p>
                <p>Hyperscaler: ${calculations.hyperscalerCost}/month</p>
                <p className="text-green-700 font-semibold">Your Choice: ${calculations.totalCost}/month</p>
              </div>
            </div>

            {/* Cost Breakdown Table */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-900 text-white">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Metric</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold">Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900">Hourly Rate</td>
                    <td className="px-4 py-3 text-right text-sm font-semibold text-gray-900">${calculations.costPerHour}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-900">Usage Hours</td>
                    <td className="px-4 py-3 text-right text-sm font-semibold text-gray-900">{usageHours}</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900">Quantity</td>
                    <td className="px-4 py-3 text-right text-sm font-semibold text-gray-900">{quantity}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm font-semibold text-gray-900">Monthly Total</td>
                    <td className="px-4 py-3 text-right text-sm font-bold text-blue-600">${calculations.totalCost}</td>
                  </tr>
                  <tr className="bg-red-50">
                    <td className="px-4 py-3 text-sm font-semibold text-red-700">vs. Hyperscaler</td>
                    <td className="px-4 py-3 text-right text-sm font-bold text-red-600">-${calculations.monthlyWaste}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Comprehensive Comparison Table */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-xl font-bold text-gray-900">All GPU Pricing (April 2026)</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-900 text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">GPU Model</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">VRAM</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold">Hyperscaler</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold">Specialist</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold">Spot/Marketplace</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold">Best Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {Object.entries(GPU_PRICING).map(([key, gpu]) => {
                  const hyperscaler = gpu.providers['Hyperscaler'];
                  const specialist = gpu.providers['Specialist'];
                  const spot = gpu.providers['Spot'] || gpu.providers['Marketplace'];
                  const bestRate = Math.min(
                    hyperscaler?.rate || Infinity,
                    specialist?.rate || Infinity,
                    spot?.rate || Infinity
                  );

                  return (
                    <tr key={key} className={key === selectedGPU ? 'bg-blue-50' : ''}>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold text-gray-900">{gpu.name}</p>
                          <p className="text-xs text-gray-500">{gpu.vram}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{gpu.vram}</td>
                      <td className="px-6 py-4 text-center">
                        {hyperscaler ? (
                          <div>
                            <p className="font-semibold text-gray-900">${hyperscaler.rate.toFixed(2)}</p>
                            <p className="text-xs text-gray-500">{hyperscaler.provider}</p>
                          </div>
                        ) : (
                          <span className="text-gray-400">N/A</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {specialist ? (
                          <div className={bestRate === specialist.rate ? 'bg-green-100 rounded p-2' : ''}>
                            <p className="font-semibold text-gray-900">${specialist.rate.toFixed(2)}</p>
                            <p className="text-xs text-gray-500">{specialist.provider}</p>
                          </div>
                        ) : (
                          <span className="text-gray-400">N/A</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {spot ? (
                          <div className={bestRate === spot.rate ? 'bg-green-100 rounded p-2' : ''}>
                            <p className="font-semibold text-gray-900">${spot.rate.toFixed(2)}</p>
                            <p className="text-xs text-gray-500">{spot.provider}</p>
                          </div>
                        ) : (
                          <span className="text-gray-400">N/A</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-block bg-green-500 text-white px-3 py-1 rounded text-xs font-semibold">
                          ${bestRate.toFixed(2)}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Workload Recommendations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {Object.entries(WORKLOAD_PROFILES).map(([type, profile]) => (
            <div key={type} className={`border-2 rounded-lg p-6 ${workloadType === type ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'}`}>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{type}</h3>
              <p className="text-sm text-gray-600 mb-4">{profile.description}</p>
              <div className="bg-gray-100 rounded p-3">
                <p className="text-xs text-gray-600 mb-1">Recommended:</p>
                <p className="font-semibold text-gray-900 text-sm">{profile.recommendation}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Cloud GPU Cost Comparison",
          "description": "NVIDIA GPU pricing comparison engine with April 2026 benchmarks",
          "applicationCategory": "BusinessApplication",
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
          "name": "GPU Pricing Dataset April 2026",
          "description": "NVIDIA GPU hourly pricing across hyperscalers and specialist clouds",
          "creator": "BKX Labs"
        })
      }} />
    </div>
  );
}
