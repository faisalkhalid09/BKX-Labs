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
        'phase_2',
        'phase_3',
        
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
        return '#22c55e'; // Green
    }
}
