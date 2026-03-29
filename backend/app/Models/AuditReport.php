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
     * Generates a circular SVG gauge for the PDF.
     */
    public function getScoreSvg(int $score): string
    {
        $color = self::getScoreColor($score);
        $radius = 45;
        $circumference = 2 * M_PI * $radius;
        $offset = $circumference - ($score / 100) * $circumference;

        return "
        <svg width=\"140\" height=\"140\" viewBox=\"0 0 100 100\">
            <circle cx=\"50\" cy=\"50\" r=\"$radius\" fill=\"none\" stroke=\"#334155\" stroke-width=\"8\" />
            <circle cx=\"50\" cy=\"50\" r=\"$radius\" fill=\"none\" stroke=\"$color\" stroke-width=\"8\"
                stroke-dasharray=\"$circumference\" stroke-dashoffset=\"$offset\"
                stroke-linecap=\"round\" transform=\"rotate(-90 50 50)\" />
            <text x=\"50\" y=\"55\" font-family=\"Arial\" font-size=\"20\" fill=\"white\" text-anchor=\"middle\" font-weight=\"bold\">$score%</text>
        </svg>";
    }
}
