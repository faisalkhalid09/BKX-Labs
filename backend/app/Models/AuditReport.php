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
     * Generates an absolute vanilla SVG gauge with zero `transform` attributes to guarantee DOMPDF rendering.
     */
    public function getScoreSvg(int $score): string
    {
        $color = self::getScoreColor($score);
        $radius = 50;
        $cx = 65;
        $cy = 65;
        
        $circumference = 2 * M_PI * $radius;
        $offset = $circumference - ($score / 100) * $circumference;
        
        // Exact 2 decimal formatting
        $circStr = number_format($circumference, 2, '.', '');
        $offsetStr = number_format($offset, 2, '.', '');
        
        if ($score >= 100) {
            $offsetStr = "0.00";
        }

        // We use explicit presentation attributes instead of `style="..."` and remove `<transform>` 
        // to completely bypass DOMPDF's parser crashes. 
        return '
        <svg xmlns="http://www.w3.org/2000/svg" width="130" height="130" viewBox="0 0 130 130">
            <circle cx="' . $cx . '" cy="' . $cy . '" r="' . $radius . '" fill-opacity="0" stroke="#1e293b" stroke-width="12" />
            <circle cx="' . $cx . '" cy="' . $cy . '" r="' . $radius . '" fill-opacity="0" stroke="' . $color . '" stroke-width="12" stroke-dasharray="' . $circStr . '" stroke-dashoffset="' . $offsetStr . '" stroke-linecap="round" />
            <text x="' . $cx . '" y="73" font-family="sans-serif" font-size="24" fill="#ffffff" text-anchor="middle" font-weight="bold">' . $score . '%</text>
        </svg>';
    }
}
