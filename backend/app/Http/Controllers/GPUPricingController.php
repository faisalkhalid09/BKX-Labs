<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class GPUPricingController extends Controller
{
    /**
     * April 2026 GPU Pricing Data
     * Real-time pricing API endpoint
     */
    public function getPricing(): JsonResponse
    {
        $pricing = [
            'B200' => [
                'name' => 'NVIDIA B200 (Blackwell)',
                'vram' => '192GB HBM3E',
                'specs' => '72 cores, 15.5 TFLOPs FP64',
                'release_date' => '2026-01-15',
                'availability_score' => 6, // 1-10 scale
                'providers' => [
                    'Hyperscaler' => [
                        'rate' => 14.24,
                        'providers' => 'AWS/GCP/Azure',
                        'availability' => 'High',
                        'sla' => '99.99%',
                    ],
                    'Specialist' => [
                        'rate' => 4.99,
                        'providers' => 'RunPod/Modal',
                        'availability' => 'Limited',
                        'sla' => '99.5%',
                    ],
                    'Spot' => [
                        'rate' => 2.12,
                        'providers' => 'Vast.ai/CoreWeave',
                        'availability' => 'Variable',
                        'sla' => '95%',
                    ],
                ],
            ],
            'H200' => [
                'name' => 'NVIDIA H200 (Hopper)',
                'vram' => '141GB HBM3',
                'specs' => 'Ultra-fast memory, perfect for LLMs',
                'release_date' => '2024-11-20',
                'availability_score' => 9,
                'providers' => [
                    'Hyperscaler' => [
                        'rate' => 10.80,
                        'providers' => 'AWS/GCP/Azure',
                        'availability' => 'High',
                        'sla' => '99.99%',
                    ],
                    'Specialist' => [
                        'rate' => 3.59,
                        'providers' => 'RunPod/Lambda Labs',
                        'availability' => 'High',
                        'sla' => '99.5%',
                    ],
                    'Spot' => [
                        'rate' => 1.94,
                        'providers' => 'Vast.ai',
                        'availability' => 'High',
                        'sla' => '95%',
                    ],
                ],
            ],
            'H100' => [
                'name' => 'NVIDIA H100 (Hopper)',
                'vram' => '80GB HBM3',
                'specs' => 'Industry standard for LLMs',
                'release_date' => '2023-03-28',
                'availability_score' => 10,
                'providers' => [
                    'Hyperscaler' => [
                        'rate' => 6.88,
                        'providers' => 'AWS/GCP/Azure',
                        'availability' => 'High',
                        'sla' => '99.99%',
                    ],
                    'Specialist' => [
                        'rate' => 2.49,
                        'providers' => 'RunPod/Lambda Labs',
                        'availability' => 'High',
                        'sla' => '99.5%',
                    ],
                    'Spot' => [
                        'rate' => 0.99,
                        'providers' => 'Vast.ai',
                        'availability' => 'Variable',
                        'sla' => '95%',
                    ],
                ],
            ],
            'L40S' => [
                'name' => 'NVIDIA L40S (Ada)',
                'vram' => '48GB GDDR6X',
                'specs' => 'Cost-effective inference, 1:1 video processing',
                'release_date' => '2023-09-20',
                'availability_score' => 10,
                'providers' => [
                    'Specialist' => [
                        'rate' => 0.85,
                        'providers' => 'RunPod/Modal',
                        'availability' => 'High',
                        'sla' => '99.5%',
                    ],
                    'Marketplace' => [
                        'rate' => 0.40,
                        'providers' => 'Vast.ai/Paperspace',
                        'availability' => 'High',
                        'sla' => '95%',
                    ],
                ],
            ],
            'A100' => [
                'name' => 'NVIDIA A100 (Ampere)',
                'vram' => '80GB HBM2',
                'specs' => 'Legacy standard, excellent value',
                'release_date' => '2020-05-14',
                'availability_score' => 10,
                'providers' => [
                    'Hyperscaler' => [
                        'rate' => 4.56,
                        'providers' => 'AWS/GCP/Azure',
                        'availability' => 'High',
                        'sla' => '99.99%',
                    ],
                    'Specialist' => [
                        'rate' => 1.79,
                        'providers' => 'RunPod/Lambda Labs',
                        'availability' => 'High',
                        'sla' => '99.5%',
                    ],
                    'Spot' => [
                        'rate' => 0.65,
                        'providers' => 'Vast.ai',
                        'availability' => 'High',
                        'sla' => '95%',
                    ],
                ],
            ],
        ];

        return response()->json([
            'status' => 'success',
            'timestamp' => now()->toIso8601String(),
            'data' => $pricing,
            'source' => 'BKX Labs - April 2026 Benchmarks',
            'version' => '1.0',
        ]);
    }

    /**
     * Calculate cost based on configuration
     */
    public function calculateCost(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'gpu_model' => 'required|string',
            'provider_type' => 'required|string',
            'hours' => 'required|integer|min:1|max:730',
            'quantity' => 'required|integer|min:1|max:100',
        ]);

        $pricing_data = $this->getPricing()->getData(true)['data'];
        
        if (!isset($pricing_data[$validated['gpu_model']])) {
            return response()->json([
                'status' => 'error',
                'message' => 'GPU model not found',
            ], 404);
        }

        $gpu = $pricing_data[$validated['gpu_model']];
        $provider = $gpu['providers'][$validated['provider_type']] ?? null;

        if (!$provider) {
            return response()->json([
                'status' => 'error',
                'message' => 'Provider type not found for this GPU',
            ], 404);
        }

        $hourly_rate = $provider['rate'];
        $total_cost = $hourly_rate * $validated['hours'] * $validated['quantity'];
        
        // Calculate comparison to hyperscaler
        $hyperscaler_rate = $gpu['providers']['Hyperscaler']['rate'] ?? $hourly_rate;
        $hyperscaler_cost = $hyperscaler_rate * $validated['hours'] * $validated['quantity'];
        $monthly_waste = ($hyperscaler_rate - $hourly_rate) * $validated['hours'] * $validated['quantity'];
        $savings_percent = ($hyperscaler_rate > 0) 
            ? (($hyperscaler_rate - $hourly_rate) / $hyperscaler_rate * 100)
            : 0;

        return response()->json([
            'status' => 'success',
            'gpu' => [
                'model' => $gpu['name'],
                'vram' => $gpu['vram'],
            ],
            'configuration' => $validated,
            'pricing' => [
                'hourly_rate' => $hourly_rate,
                'total_cost' => round($total_cost, 2),
                'monthly_cost' => round($total_cost, 2),
                'annual_cost' => round($total_cost * 12, 2),
            ],
            'savings' => [
                'vs_hyperscaler_monthly' => round($monthly_waste, 2),
                'vs_hyperscaler_annual' => round($monthly_waste * 12, 2),
                'savings_percentage' => round($savings_percent, 1),
                'breakdown_percentage' => round(($hourly_rate / $hyperscaler_rate) * 100, 0),
            ],
            'provider_details' => [
                'type' => $validated['provider_type'],
                'providers' => $provider['providers'],
                'availability' => $provider['availability'],
                'sla' => $provider['sla'],
            ],
        ]);
    }

    /**
     * Get recommendations based on workload
     */
    public function getRecommendations(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'workload_type' => 'required|string|in:Inference,Training,Batch Processing',
            'monthly_budget' => 'required|numeric|min:100',
            'model_size' => 'required|string|in:7B,30B,70B,400B',
        ]);

        $recommendations = [
            'Inference' => [
                '7B' => [
                    'recommended_gpu' => 'L40S',
                    'recommended_provider' => 'Marketplace',
                    'reasoning' => 'Cheapest inference option, 48GB sufficient for 7B model',
                    'throughput' => '900 tokens/sec',
                    'estimated_monthly_cost' => 292,
                ],
                '30B' => [
                    'recommended_gpu' => 'H200',
                    'recommended_provider' => 'Specialist',
                    'reasoning' => 'Best cost-to-throughput for 30B inference, 141GB VRAM',
                    'throughput' => '3800 tokens/sec',
                    'estimated_monthly_cost' => 2620,
                ],
                '70B' => [
                    'recommended_gpu' => 'H200',
                    'recommended_provider' => 'Specialist',
                    'reasoning' => '70B requires 2× GPU; use H200 cluster',
                    'throughput' => '1900 tokens/sec',
                    'estimated_monthly_cost' => 5240,
                ],
                '400B' => [
                    'recommended_gpu' => 'B200',
                    'recommended_provider' => 'Spot',
                    'reasoning' => '400B requires distributed training; B200 spot for cost efficiency',
                    'throughput' => '4500 tokens/sec',
                    'estimated_monthly_cost' => 1549,
                ],
            ],
            'Training' => [
                '7B' => [
                    'recommended_gpu' => 'A100',
                    'recommended_provider' => 'Spot',
                    'reasoning' => '7B training needs 32GB; A100 spot with checkpoints',
                    'training_speed' => '450 samples/sec',
                    'estimated_monthly_cost' => 475,
                ],
                '30B' => [
                    'recommended_gpu' => 'H100',
                    'recommended_provider' => 'Specialist',
                    'reasoning' => '30B training requires 2× H100 for stable training',
                    'training_speed' => '750 samples/sec',
                    'estimated_monthly_cost' => 3628,
                ],
                '70B' => [
                    'recommended_gpu' => 'H200',
                    'recommended_provider' => 'Specialist',
                    'reasoning' => '70B training on 4× H200 cluster, use spot for non-critical runs',
                    'training_speed' => '1200 samples/sec',
                    'estimated_monthly_cost' => 10480,
                ],
            ],
            'Batch Processing' => [
                'any' => [
                    'recommended_gpu' => 'A100',
                    'recommended_provider' => 'Spot',
                    'reasoning' => 'Non-critical workload; spot instances provide 70% discount',
                    'throughput' => '2400 samples/sec',
                    'estimated_monthly_cost' => 475,
                ],
            ],
        ];

        $workload_recs = $recommendations[$validated['workload_type']][$validated['model_size']] 
            ?? $recommendations[$validated['workload_type']]['any'] ?? null;

        if (!$workload_recs) {
            return response()->json([
                'status' => 'error',
                'message' => 'Recommendation not found for this configuration',
            ], 404);
        }

        // Check if within budget
        $budget_ok = $workload_recs['estimated_monthly_cost'] <= $validated['monthly_budget'];

        return response()->json([
            'status' => 'success',
            'workload' => $validated,
            'recommendation' => $workload_recs,
            'budget_status' => $budget_ok ? 'within_budget' : 'exceeds_budget',
            'budget_gap' => $validated['monthly_budget'] - $workload_recs['estimated_monthly_cost'],
            'alternative_options' => $this->getAlternatives($validated),
        ]);
    }

    /**
     * Helper: Get alternative GPU options
     */
    private function getAlternatives(array $config): array
    {
        return [
            [
                'gpu' => 'A100 Spot',
                'cost_reduction' => '40%',
                'trade_off' => 'Interruption risk every 30-60 min',
            ],
            [
                'gpu' => 'Vast.ai Marketplace',
                'cost_reduction' => '50-60%',
                'trade_off' => 'Speed reduction 15-25% due to shared hardware',
            ],
            [
                'gpu' => 'Lambda Labs (Free Egress)',
                'cost_reduction' => '+5% for egress savings',
                'trade_off' => 'Limited availability on cutting-edge GPUs',
            ],
        ];
    }
}
