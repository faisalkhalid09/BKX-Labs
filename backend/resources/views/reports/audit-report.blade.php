<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Audit Report - {{ $report->client_name }}</title>
    <style>
        @page {
            margin: 0cm;
        }
        body {
            font-family: 'Helvetica', 'Arial', sans-serif;
            color: #1a1a1a;
            line-height: 1.5;
            margin: 0;
            padding: 0;
        }
        .page {
            width: 21cm;
            height: 29.7cm;
            padding: 2cm;
            box-sizing: border-box;
            page-break-after: always;
            position: relative;
        }
        .header {
            border-bottom: 2px solid #000;
            padding-bottom: 10px;
            margin-bottom: 30px;
        }
        .logo {
            height: 40px;
        }
        .title {
            font-size: 28px;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 2px;
            margin-top: 100px;
        }
        .subtitle {
            font-size: 18px;
            color: #666;
            margin-top: 10px;
        }
        .meta-table {
            width: 100%;
            margin-top: 50px;
            border-collapse: collapse;
        }
        .meta-table td {
            padding: 10px;
            border-bottom: 1px solid #eee;
        }
        .label {
            font-weight: bold;
            width: 30%;
            color: #444;
        }
        
        /* Dashboard - Page 3 */
        .gauge-container {
            text-align: center;
            margin-top: 50px;
        }
        .gauge {
            display: inline-block;
            width: 150px;
            height: 150px;
            border-radius: 50%;
            border: 15px solid #eee;
            position: relative;
            margin: 20px;
        }
        .gauge-inner {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 24px;
            font-weight: bold;
        }
        .gauge-label {
            margin-top: 10px;
            font-weight: bold;
            text-transform: uppercase;
            font-size: 12px;
        }
        
        /* Scores Logic */
        .score-red { border-color: #ef4444; }
        .score-orange { border-color: #f97316; }
        .score-green { border-color: #22c55e; }
        
        /* Page 4 - Metrics */
        .chart-box {
            background: #f9f9f9;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 20px;
        }
        .bar-container {
            width: 100%;
            height: 20px;
            background: #ddd;
            border-radius: 10px;
            margin: 10px 0;
            overflow: hidden;
        }
        .bar {
            height: 100%;
            background: #3b82f6;
        }
        .bar-optimized {
            background: #10b981;
        }
        
        /* Page 5 - Roadmap */
        .roadmap-step {
            border-left: 4px solid #3b82f6;
            padding-left: 20px;
            margin-bottom: 30px;
            position: relative;
        }
        .roadmap-step::before {
            content: '';
            position: absolute;
            left: -12px;
            top: 0;
            width: 20px;
            height: 20px;
            background: #3b82f6;
            border-radius: 50%;
        }
        
        .verdict-box {
            background: #000;
            color: #fff;
            padding: 30px;
            text-align: center;
            margin-top: 50px;
        }
        .verdict-title {
            font-size: 32px;
            font-weight: bold;
            color: #ef4444; /* Default Red for Safety */
        }
        
        .footer-note {
            position: absolute;
            bottom: 2cm;
            left: 2cm;
            right: 2cm;
            font-size: 10px;
            color: #999;
            text-align: center;
            border-top: 1px solid #eee;
            padding-top: 10px;
        }
    </style>
</head>
<body>

    <!-- PAGE 1: COVER -->
    <div class="page">
        <div class="header">
            <img src="{{ public_path('brand-logo.png') }}" class="logo">
        </div>
        
        <div class="title">Technical Audit &<br>Forensic Analysis</div>
        <div class="subtitle">BKX Labs Internal Security & Performance Report</div>
        
        <table class="meta-table">
            <tr>
                <td class="label">CLIENT</td>
                <td>{{ $report->client_name }}</td>
            </tr>
            <tr>
                <td class="label">DATE</td>
                <td>{{ $report->created_at->format('M d, Y') }}</td>
            </tr>
            <tr>
                <td class="label">TECH STACK</td>
                <td>{{ implode(', ', $report->tech_stack ?? []) }}</td>
            </tr>
            <tr>
                <td class="label">AUDIT SCOPE</td>
                <td>{{ $report->audit_scope }}</td>
            </tr>
        </table>
        
        <div class="footer-note">CONFIDENTIAL - FOR AUTHORIZED PERSONNEL ONLY</div>
    </div>

    <!-- PAGE 2: FINDINGS -->
    <div class="page">
        <h2>Forensic Findings</h2>
        <div style="margin-bottom: 30px;">
            <h3 style="color: #ef4444;">1. Critical Vulnerabilities</h3>
            <div>{!! $report->critical_vulnerabilities !!}</div>
        </div>
        <div style="margin-bottom: 30px;">
            <h3 style="color: #f97316;">2. Infrastructure Bottlenecks</h3>
            <div>{!! $report->infrastructure_bottlenecks !!}</div>
        </div>
        <div>
            <h3 style="color: #3b82f6;">3. Frontend Debt</h3>
            <div>{!! $report->frontend_debt !!}</div>
        </div>
    </div>

    <!-- PAGE 3: DASHBOARD (VITAL SIGNS) -->
    <div class="page">
        <h2>System Health Dashboard</h2>
        <p>The following scores represent the primary health vectors of the codebase.</p>
        
        <div class="gauge-container">
            <div class="gauge {{ $report->security_score < 40 ? 'score-red' : ($report->security_score < 70 ? 'score-orange' : 'score-green') }}">
                <div class="gauge-inner">{{ $report->security_score }}%</div>
                <div class="gauge-label">Security Posture</div>
            </div>
            
            <div class="gauge {{ $report->performance_score < 40 ? 'score-red' : ($report->performance_score < 70 ? 'score-orange' : 'score-green') }}">
                <div class="gauge-inner">{{ $report->performance_score }}%</div>
                <div class="gauge-label">Performance</div>
            </div>
            
            <div class="gauge {{ $report->maintainability_score < 40 ? 'score-red' : ($report->maintainability_score < 70 ? 'score-orange' : 'score-green') }}">
                <div class="gauge-inner">{{ $report->maintainability_score }}%</div>
                <div class="gauge-label">Maintainability</div>
            </div>
        </div>
        
        <div style="margin-top: 50px; background: #f0fdf4; padding: 20px; border-left: 5px solid #22c55e;">
            <strong>Overall Health Index: {{ $report->overall_health }}%</strong>
            <p style="font-size: 14px;">Calculated based on 48 technical checkpoints across security, runtime, and architectural layers.</p>
        </div>
    </div>

    <!-- PAGE 4: TECHNICAL METRICS -->
    <div class="page">
        <h2>Technical Metrics Analysis</h2>
        <p>Current state vs. Optimized architectural benchmarks.</p>
        
        <div class="chart-box">
            <strong>CPU Utilization (High Latency Spike Analysis)</strong>
            <div class="bar-container">
                <div class="bar" style="width: {{ $report->current_cpu }}%"></div>
            </div>
            <small>Current State: {{ $report->current_cpu }}% Avg Load</small>
            
            <div class="bar-container">
                <div class="bar bar-optimized" style="width: {{ $report->optimized_cpu }}%"></div>
            </div>
            <small>Optimized Target: {{ $report->optimized_cpu }}% Avg Load</small>
        </div>

        <div class="chart-box">
            <strong>Memory Allocation (Leak & Garbage Collection)</strong>
            <div class="bar-container">
                <div class="bar" style="width: {{ $report->current_memory }}%"></div>
            </div>
            <small>Current Usage: {{ $report->current_memory }}% Peak</small>
            
            <div class="bar-container">
                <div class="bar bar-optimized" style="width: {{ $report->optimized_memory }}%"></div>
            </div>
            <small>Optimized Target: {{ $report->optimized_memory }}% Peak</small>
        </div>
        
        <p style="margin-top: 30px; color: #666;">
            <em>Note: Metrics captured using real-time kernel-level monitoring and heap analysis.</em>
        </p>
    </div>

    <!-- PAGE 5: ROADMAP & DECISION -->
    <div class="page">
        <h2>Rescue Roadmap</h2>
        
        <div class="roadmap-step">
            <strong>PHASE 1: STABILIZATION</strong>
            <p>{{ $report->phase_1 }}</p>
        </div>
        
        <div class="roadmap-step">
            <strong>PHASE 2: OPTIMIZATION</strong>
            <p>{{ $report->phase_2 }}</p>
        </div>
        
        <div class="roadmap-step">
            <strong>PHASE 3: SCALING</strong>
            <p>{{ $report->phase_3 }}</p>
        </div>
        
        <div class="verdict-box">
            <div style="font-size: 14px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 10px;">The Status Verdict</div>
            <div class="verdict-title" style="color: {{ $report->status_verdict === 'STABLE / READY' ? '#22c55e' : ($report->status_verdict === 'PROCEED WITH CAUTION' ? '#f97316' : '#ef4444') }}">
                {{ $report->status_verdict }}
            </div>
            <div style="margin-top: 20px; font-size: 14px;">
                {{ $report->fastest_path }}
            </div>
            <div style="margin-top: 30px;">
                <a href="{{ $report->upsell_link }}" style="color: #3b82f6; text-decoration: none; font-weight: bold; border: 1px solid #3b82f6; padding: 10px 20px;">BOOK RESCUE STRATEGY CALL</a>
            </div>
        </div>
    </div>

</body>
</html>
