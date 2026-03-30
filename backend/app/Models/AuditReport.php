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
     * Generates a precise SVG gauge ensuring DOMPDF/php-svg-lib renders primitive shapes explicitly.
     */
    public function getScoreSvg(int $score): string
    {
        $color = self::getScoreColor($score);
        $radius = 50;
        $cx = 65;
        $cy = 65;
        
        $circumference = 2 * M_PI * $radius;
        $offset = $circumference - ($score / 100) * $circumference;
        
        // Format to exact 2 decimal strings to prevent php-svg-lib choking on long floats
        $circStr = number_format($circumference, 2, '.', '');
        $offsetStr = number_format($offset, 2, '.', '');
        
        if ($score >= 100) {
            $offsetStr = "0.00";
        }

        return "
        <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"130\" height=\"130\" viewBox=\"0 0 130 130\">
            <circle cx=\"$cx\" cy=\"$cy\" r=\"$radius\" style=\"fill:none; stroke:#1e293b; stroke-width:12px;\" />
            <circle cx=\"$cx\" cy=\"$cy\" r=\"$radius\" style=\"fill:none; stroke:$color; stroke-width:12px; stroke-dasharray:$circStr; stroke-dashoffset:$offsetStr; stroke-linecap:round;\" transform=\"rotate(-90 $cx $cy)\" />
            <text x=\"$cx\" y=\"73\" font-family=\"sans-serif\" font-size=\"24\" fill=\"#ffffff\" text-anchor=\"middle\" font-weight=\"bold\">$score%</text>
        </svg>";
    }
}
