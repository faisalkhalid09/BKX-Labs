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
     * Generates a structural SVG gauge (using SVG Paths) for perfect DOMPDF compatibility.
     */
    public function getScoreSvg(int $score): string
    {
        $color = self::getScoreColor($score);
        $radius = 42;
        $cx = 50;
        $cy = 50;
        
        if ($score >= 100) {
            return "<svg width=\"140\" height=\"140\" viewBox=\"0 0 100 100\">
                <circle cx=\"50\" cy=\"50\" r=\"$radius\" fill=\"none\" stroke=\"#1e293b\" stroke-width=\"12\" />
                <circle cx=\"50\" cy=\"50\" r=\"$radius\" fill=\"none\" stroke=\"$color\" stroke-width=\"12\" />
                <text x=\"50\" y=\"57\" font-family=\"sans-serif\" font-size=\"24\" fill=\"#ffffff\" text-anchor=\"middle\" font-weight=\"bold\">100%</text>
            </svg>";
        }

        if ($score <= 0) {
            return "<svg width=\"140\" height=\"140\" viewBox=\"0 0 100 100\">
                <circle cx=\"50\" cy=\"50\" r=\"$radius\" fill=\"none\" stroke=\"#1e293b\" stroke-width=\"12\" />
                <text x=\"50\" y=\"57\" font-family=\"sans-serif\" font-size=\"24\" fill=\"#ffffff\" text-anchor=\"middle\" font-weight=\"bold\">0%</text>
            </svg>";
        }

        $angle = ($score / 100) * 360;
        $startAngle = -pi() / 2;
        $endAngle = $startAngle + deg2rad($angle);

        $x1 = $cx + $radius * cos($startAngle);
        $y1 = $cy + $radius * sin($startAngle);
        $x2 = $cx + $radius * cos($endAngle);
        $y2 = $cy + $radius * sin($endAngle);
        
        $largeArcFlag = $angle > 180 ? 1 : 0;

        return "<svg width=\"140\" height=\"140\" viewBox=\"0 0 100 100\">
            <circle cx=\"50\" cy=\"50\" r=\"$radius\" fill=\"none\" stroke=\"#1e293b\" stroke-width=\"12\" />
            <path d=\"M $x1 $y1 A $radius $radius 0 $largeArcFlag 1 $x2 $y2\" fill=\"none\" stroke=\"$color\" stroke-width=\"12\" stroke-linecap=\"round\" />
            <text x=\"50\" y=\"57\" font-family=\"sans-serif\" font-size=\"24\" fill=\"#ffffff\" text-anchor=\"middle\" font-weight=\"bold\">$score%</text>
        </svg>";
    }
}
