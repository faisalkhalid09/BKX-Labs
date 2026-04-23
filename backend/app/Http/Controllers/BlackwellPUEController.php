<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class BlackwellPUEController extends Controller
{
    /**
     * GPU Specifications with thermal and power data
     */
    private const GPU_SPECS = [
        'B200' => [
            'name' => 'NVIDIA B200',
            'tdp_min' => 700,
            'tdp_max' => 1000,
            'tdp_avg' => 850,
            'vram' => '192GB HBM3E',
            'cooling_options' => ['Air-Cooled (RDHx)', 'Direct-to-Chip (DTC)', 'Immersion'],
        ],
        'GB200' => [
            'name' => 'NVIDIA GB200 Superchip',
            'tdp_min' => 1100,
            'tdp_max' => 1300,
            'tdp_avg' => 1200,
            'vram' => '384GB HBM3E',
            'cooling_options' => ['Direct-to-Chip (DTC)', 'Immersion'],
        ],
        'B300' => [
            'name' => 'NVIDIA B300 / Blackwell Ultra',
            'tdp_min' => 1300,
            'tdp_max' => 1500,
            'tdp_avg' => 1400,
            'vram' => '256GB HBM3E',
            'cooling_options' => ['Direct-to-Chip (DTC)', 'Immersion'],
        ],
    ];

    /**
     * Cooling technology PUE values (Power Usage Effectiveness)
     */
    private const COOLING_PUE = [
        'Air-Cooled (RDHx)' => 1.35,
        'Direct-to-Chip (DTC)' => 1.12,
        'Immersion' => 1.08,
    ];

    /**
     * Power draw profile by cooling type (affects GPU utilization)
     */
    private const POWER_DRAW_PROFILE = [
        'Air-Cooled (RDHx)' => 0.95,
        'Direct-to-Chip (DTC)' => 0.98,
        'Immersion' => 0.99,
    ];

    /**
     * Regional utility rates and carbon intensity
     */
    private const REGIONAL_RATES = [
        'US' => ['rate' => 0.08, 'carbon_intensity' => 0.42],
        'EU' => ['rate' => 0.15, 'carbon_intensity' => 0.25],
        'APAC' => ['rate' => 0.12, 'carbon_intensity' => 0.55],
    ];

    /**
     * Rack configurations
     */
    private const RACK_CONFIGS = [
        'NVL72' => ['gpus_per_rack' => 9, 'name' => 'NVL72 (9× GPUs)'],
        'NVL36' => ['gpus_per_rack' => 8, 'name' => 'NVL36 (8× GPUs)'],
    ];

    /**
     * Get all GPU specifications and cooling options
     *
     * @return JsonResponse
     */
    public function getSpecifications(): JsonResponse
    {
        return response()->json([
            'gpu_models' => self::GPU_SPECS,
            'cooling_technologies' => self::COOLING_PUE,
            'rack_configurations' => self::RACK_CONFIGS,
            'regional_rates' => self::REGIONAL_RATES,
        ]);
    }

    /**
     * Calculate PUE and energy consumption for a Blackwell deployment
     *
     * POST /api/blackwell/calculate-pue
     *
     * Request body:
     * {
     *   "gpu_model": "B200|GB200|B300",
     *   "gpu_count": 72,
     *   "cooling_mode": "Air-Cooled (RDHx)|Direct-to-Chip (DTC)|Immersion",
     *   "region": "US|EU|APAC|custom",
     *   "custom_rate": 0.10 (optional, if region=custom),
     *   "custom_carbon_intensity": 0.40 (optional),
     *   "utilization_rate": 0.85 (0.0-1.0, default 0.85)
     * }
     */
    public function calculatePUE(Request $request): JsonResponse
    {
        // Validation
        $validated = $request->validate([
            'gpu_model' => 'required|in:B200,GB200,B300',
            'gpu_count' => 'required|integer|min:1|max:10000',
            'cooling_mode' => 'required|string',
            'region' => 'required|in:US,EU,APAC,custom',
            'custom_rate' => 'nullable|numeric|min:0.01|max:1',
            'custom_carbon_intensity' => 'nullable|numeric|min:0.01|max:2',
            'utilization_rate' => 'nullable|numeric|min:0.1|max:1',
            'rack_config' => 'nullable|in:NVL72,NVL36',
        ]);

        // Extract validated data
        $gpuModel = $validated['gpu_model'];
        $gpuCount = $validated['gpu_count'];
        $coolingMode = $validated['cooling_mode'];
        $region = $validated['region'];
        $utilizationRate = $validated['utilization_rate'] ?? 0.85;
        $rackConfig = $validated['rack_config'] ?? 'NVL72';

        // Validate cooling mode for GPU model
        if (!in_array($coolingMode, self::GPU_SPECS[$gpuModel]['cooling_options'])) {
            return response()->json([
                'error' => "Cooling mode '{$coolingMode}' not compatible with {$gpuModel}",
                'valid_modes' => self::GPU_SPECS[$gpuModel]['cooling_options']
            ], 422);
        }

        // Get GPU and cooling specs
        $gpuSpec = self::GPU_SPECS[$gpuModel];
        $pue = self::COOLING_PUE[$coolingMode];
        $powerDrawProfile = self::POWER_DRAW_PROFILE[$coolingMode];

        // Get utility rates
        if ($region === 'custom') {
            $utilityRate = $validated['custom_rate'] ?? 0.10;
            $carbonIntensity = $validated['custom_carbon_intensity'] ?? 0.40;
        } else {
            $utilityRate = self::REGIONAL_RATES[$region]['rate'];
            $carbonIntensity = self::REGIONAL_RATES[$region]['carbon_intensity'];
        }

        // Get rack config
        $rackConfigData = self::RACK_CONFIGS[$rackConfig];
        $rackCount = ceil($gpuCount / $rackConfigData['gpus_per_rack']);

        // Calculate power consumption
        $gpuPowerPerUnit = $gpuSpec['tdp_avg'] * $powerDrawProfile * $utilizationRate;
        $totalGpuPower = $gpuPowerPerUnit * $gpuCount;
        $networkingOverhead = $totalGpuPower * 0.15; // 15% networking overhead
        $totalITPower = ($totalGpuPower + $networkingOverhead) / 1000; // Convert to kW

        // Facility power with PUE
        $facilityPower = $totalITPower * $pue;
        $powerPerRack = $facilityPower / $rackCount;

        // Annual calculations
        $annualConsumption = $facilityPower * 8760; // kWh per year
        $annualCost = $annualConsumption * $utilityRate;
        $monthlyCost = $annualCost / 12;
        $annualCarbon = $annualConsumption * $carbonIntensity; // kg CO2

        // Thermal alert logic: if >50kW per rack AND air cooling
        $thermalAlert = $powerPerRack > 50 && $coolingMode === 'Air-Cooled (RDHx)';

        // Calculate cost per GPU per year
        $costPerGpuPerYear = $annualCost / $gpuCount;

        // Calculate cost per kW
        $costPerKw = $annualCost / $facilityPower;

        // WUE (Water Usage Effectiveness) calculation
        $wue = match($coolingMode) {
            'Air-Cooled (RDHx)' => 1.8,
            'Direct-to-Chip (DTC)' => 0.25,
            'Immersion' => 0.35,
            default => 1.8
        };

        return response()->json([
            'deployment' => [
                'gpu_model' => $gpuModel,
                'gpu_count' => $gpuCount,
                'rack_count' => $rackCount,
                'rack_config' => $rackConfig,
                'cooling_mode' => $coolingMode,
                'region' => $region,
                'utilization_rate' => $utilizationRate,
            ],
            'power_metrics' => [
                'gpu_power_per_unit_w' => round($gpuPowerPerUnit, 0),
                'total_gpu_power_kw' => round($totalGpuPower / 1000, 1),
                'networking_overhead_kw' => round($networkingOverhead / 1000, 1),
                'total_it_power_kw' => round($totalITPower, 1),
                'facility_power_kw' => round($facilityPower, 1),
                'power_per_rack_kw' => round($powerPerRack, 1),
            ],
            'efficiency_metrics' => [
                'pue' => round($pue, 2),
                'wue_liters_per_kwh' => round($wue, 2),
                'power_draw_profile' => $powerDrawProfile,
            ],
            'annual_metrics' => [
                'consumption_gwh' => round($annualConsumption / 1_000_000, 2),
                'cost_usd' => round($annualCost, 0),
                'cost_per_month_usd' => round($monthlyCost, 0),
                'cost_per_gpu_per_year_usd' => round($costPerGpuPerYear, 0),
                'cost_per_kw_usd' => round($costPerKw, 2),
                'carbon_emissions_mt_co2' => round($annualCarbon / 1000, 1),
            ],
            'thermal_alert' => [
                'triggered' => $thermalAlert,
                'message' => $thermalAlert ? 'Rack density exceeds 50kW with air cooling. Migrate to Direct-to-Chip (DTC) or Immersion cooling.' : 'Thermal parameters within safe limits.',
                'power_per_rack_kw' => round($powerPerRack, 1),
                'thermal_limit_kw' => 50,
            ],
            'recommendations' => $this->getRecommendations($coolingMode, $powerPerRack, $pue, $annualCost),
        ]);
    }

    /**
     * Get optimization recommendations based on deployment
     */
    private function getRecommendations(string $coolingMode, float $powerPerRack, float $pue, float $annualCost): array
    {
        $recommendations = [];

        // Thermal recommendations
        if ($powerPerRack > 50 && $coolingMode === 'Air-Cooled (RDHx)') {
            $recommendations[] = [
                'type' => 'thermal',
                'priority' => 'critical',
                'message' => 'Thermal limit exceeded. Migrate to DTC or immersion cooling immediately.',
                'potential_savings' => round(($pue - 1.12) / $pue * $annualCost, 0),
            ];
        }

        // PUE optimization
        if ($pue > 1.15) {
            $recommendations[] = [
                'type' => 'efficiency',
                'priority' => 'high',
                'message' => 'Current PUE exceeds 2026 industry standard (1.15). Immersion cooling achieves 1.05-1.08.',
                'potential_savings' => round(($pue - 1.08) / $pue * $annualCost, 0),
            ];
        }

        // Cost optimization for DTC
        if ($coolingMode === 'Direct-to-Chip (DTC)') {
            $recommendations[] = [
                'type' => 'economics',
                'priority' => 'medium',
                'message' => 'DTC is cost-effective. Consider immersion for batch workloads (24/7 >80% utilization) for additional 3-7% savings.',
                'potential_savings' => round(0.05 * $annualCost, 0),
            ];
        }

        return $recommendations;
    }

    /**
     * Get provider cost comparison for a deployment
     *
     * POST /api/blackwell/provider-comparison
     *
     * Request body:
     * {
     *   "gpu_model": "B200|GB200|B300",
     *   "gpu_count": 72,
     *   "monthly_usage_hours": 720
     * }
     */
    public function getProviderComparison(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'gpu_model' => 'required|in:B200,GB200,B300',
            'gpu_count' => 'required|integer|min:1|max:10000',
            'monthly_usage_hours' => 'nullable|integer|min:1|max:730',
        ]);

        $gpuModel = $validated['gpu_model'];
        $gpuCount = $validated['gpu_count'];
        $monthlyHours = $validated['monthly_usage_hours'] ?? 730; // Full month default

        // Provider pricing (April 2026)
        $providers = [
            [
                'name' => 'AWS US East (on-demand)',
                'rate_per_hour' => 9.92,
                'cooling_type' => 'Hyperscaler Chiller',
                'pue' => 1.10,
                'sla_uptime' => 99.99,
                'esg_rating' => 'A',
                'provisioning_days' => 14,
            ],
            [
                'name' => 'Google Cloud (committed)',
                'rate_per_hour' => 7.43,
                'cooling_type' => 'Hyperscaler Chiller',
                'pue' => 1.08,
                'sla_uptime' => 99.99,
                'esg_rating' => 'A+',
                'provisioning_days' => 14,
            ],
            [
                'name' => 'Azure (reserved)',
                'rate_per_hour' => 8.15,
                'cooling_type' => 'Hyperscaler Chiller',
                'pue' => 1.12,
                'sla_uptime' => 99.95,
                'esg_rating' => 'A',
                'provisioning_days' => 10,
            ],
            [
                'name' => 'RunPod Pro (DTC)',
                'rate_per_hour' => 4.99,
                'cooling_type' => 'Direct-to-Chip',
                'pue' => 1.12,
                'sla_uptime' => 99.5,
                'esg_rating' => 'B',
                'provisioning_days' => 2,
            ],
            [
                'name' => 'Lambda Labs',
                'rate_per_hour' => 5.50,
                'cooling_type' => 'DTC (mixed air)',
                'pue' => 1.18,
                'sla_uptime' => 99.2,
                'esg_rating' => 'B',
                'provisioning_days' => 3,
            ],
            [
                'name' => 'Vast.ai Spot',
                'rate_per_hour' => 2.10,
                'cooling_type' => 'Air-Cooled (RDHx)',
                'pue' => 1.35,
                'sla_uptime' => 97.0,
                'esg_rating' => 'C',
                'provisioning_days' => 0,
            ],
        ];

        // Calculate monthly cost for each provider
        $comparison = array_map(function ($provider) use ($gpuCount, $monthlyHours) {
            $monthlyGpuCost = $provider['rate_per_hour'] * $gpuCount * $monthlyHours;
            return array_merge($provider, [
                'monthly_cost_usd' => round($monthlyGpuCost, 0),
                'annual_cost_usd' => round($monthlyGpuCost * 12, 0),
                'cost_per_gpu_per_month' => round($monthlyGpuCost / $gpuCount, 2),
            ]);
        }, $providers);

        // Sort by monthly cost
        usort($comparison, fn($a, $b) => $a['monthly_cost_usd'] <=> $b['monthly_cost_usd']);

        return response()->json([
            'deployment' => [
                'gpu_model' => $gpuModel,
                'gpu_count' => $gpuCount,
                'monthly_usage_hours' => $monthlyHours,
            ],
            'providers' => $comparison,
            'recommendation' => [
                'cheapest' => $comparison[0]['name'],
                'best_reliability' => 'Google Cloud' . ($comparison[0]['name'] === 'Google Cloud' ? ' (also cheapest)' : ''),
                'best_cooling' => 'Google Cloud or AWS',
                'best_for_training' => 'RunPod Pro (guaranteed DTC cooling)',
                'best_for_batch' => 'Vast.ai Spot (if interruptible tolerance)',
            ],
        ]);
    }

    /**
     * Get 5-year TCO comparison between cooling types
     *
     * GET /api/blackwell/tco-analysis
     *
     * Query parameters:
     * ?gpu_count=120&annual_electricity_cost=921000
     */
    public function getTCOAnalysis(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'gpu_count' => 'nullable|integer|min:1|max:10000',
            'annual_electricity_cost' => 'nullable|numeric|min:1000',
        ]);

        $gpuCount = $validated['gpu_count'] ?? 120;
        $annualElectricityCost = $validated['annual_electricity_cost'] ?? 921000;

        // TCO comparison: Air vs. DTC
        $airCooled = [
            'cooling_type' => 'Air-Cooled (RDHx)',
            'capex' => 4_100_000,
            'pue' => 1.35,
            'annual_opex' => 921_000,
            'annual_maintenance' => 30_000,
            'years' => 5,
        ];

        $dtcCooled = [
            'cooling_type' => 'Direct-to-Chip (DTC)',
            'capex' => 4_170_000,
            'pue' => 1.12,
            'annual_opex' => 761_000,
            'annual_maintenance' => 16_000,
            'years' => 5,
        ];

        // Calculate 5-year TCO
        $airTco = $airCooled['capex'] + ($airCooled['annual_opex'] * 5) + ($airCooled['annual_maintenance'] * 5);
        $dtcTco = $dtcCooled['capex'] + ($dtcCooled['annual_opex'] * 5) + ($dtcCooled['annual_maintenance'] * 5);

        $savings = $airTco - $dtcTco;
        $breakEvenMonths = round(($dtcCooled['capex'] - $airCooled['capex']) / (($airCooled['annual_opex'] - $dtcCooled['annual_opex']) / 12), 1);

        return response()->json([
            'comparison' => [
                'air_cooled' => [
                    'capex' => $airCooled['capex'],
                    'opex_5_years' => $airCooled['annual_opex'] * 5,
                    'maintenance_5_years' => $airCooled['annual_maintenance'] * 5,
                    'total_5_year_cost' => $airTco,
                    'cost_per_gpu_5_years' => round($airTco / $gpuCount, 0),
                ],
                'dtc_cooled' => [
                    'capex' => $dtcCooled['capex'],
                    'opex_5_years' => $dtcCooled['annual_opex'] * 5,
                    'maintenance_5_years' => $dtcCooled['annual_maintenance'] * 5,
                    'total_5_year_cost' => $dtcTco,
                    'cost_per_gpu_5_years' => round($dtcTco / $gpuCount, 0),
                ],
            ],
            'roi_metrics' => [
                'total_5_year_savings_usd' => round($savings, 0),
                'annual_savings_usd' => round($savings / 5, 0),
                'break_even_months' => $breakEvenMonths,
                'savings_percentage' => round(($savings / $airTco) * 100, 1),
                'cost_per_kw_air' => 921_000 / (4_100_000 / (8760 * 10)), // Simplified
                'cost_per_kw_dtc' => 761_000 / (4_100_000 / (8760 * 10)),
            ],
        ]);
    }
}
