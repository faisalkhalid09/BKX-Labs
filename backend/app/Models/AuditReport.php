<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AuditReport extends Model
{
    protected $fillable = [
        'client_name',
        'client_logo_path',
        'tech_stack',
        'audit_scope',
        
        'security_score',
        'performance_score',
        'maintainability_score',
        
        'critical_vulnerabilities',
        'infrastructure_bottlenecks',
        'frontend_debt',
        
        'current_cpu',
        'optimized_cpu',
        'current_memory',
        'optimized_memory',
        
        'phase_1',
        'phase_1_duration',
        'phase_2',
        'phase_2_duration',
        'phase_3',
        'phase_3_duration',
        
        'status_verdict',
        'fastest_path',
        'upsell_link',
    ];

    protected $casts = [
        'tech_stack' => 'array',
        'security_score' => 'integer',
        'performance_score' => 'integer',
        'maintainability_score' => 'integer',
    ];

    /**
     * Get the overall health score percentage.
     */
    public function getOverallHealthAttribute(): int
    {
        return round(($this->security_score + $this->performance_score + $this->maintainability_score) / 3);
    }

    /**
     * Get the color based on a percentage (0-100).
     */
    public static function getScoreColor(int $score): string
    {
        if ($score < 40) return '#ef4444'; // Red
        if ($score < 70) return '#f97316'; // Orange
        return '#3b82f6'; // Light Blue (matching the shared screens)
    }

    /**
     * Generates a sleek, purely HTML/CSS resilient telemetry bar to completely bypass 
     * DOMPDF's broken SVG rasterizer. This is 100% crash proof inside dompdf.
     */
    public function getScoreSvg(int $score): string
    {
        $color = self::getScoreColor($score);
        
        return '
        <div style="width: 100%; text-align: center; margin-bottom: 40px; margin-top: 15px;">
            <div style="font-size: 50px; font-family: sans-serif; font-weight: bold; color: #ffffff; letter-spacing: -2px; margin-bottom: 25px;">
                ' . $score . '<span style="font-size: 24px; color: #64748b; margin-left: 2px;">%</span>
            </div>
            <div style="width: 130px; height: 8px; background-color: #1e293b; margin: 0 auto; border-radius: 4px; overflow: hidden; text-align: left;">
                <div style="width: ' . $score . '%; height: 8px; background-color: ' . $color . '; border-radius: 4px;"></div>
            </div>
        </div>';
    }
}
