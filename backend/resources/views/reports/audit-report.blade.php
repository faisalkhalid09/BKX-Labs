<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Technical Audit - {{ $report->client_name }}</title>
    <style>
        @page {
            margin: 0;
        }
        body {
            font-family: 'Helvetica', sans-serif;
            margin: 0;
            padding: 0;
            background: #ffffff;
            color: #1a202c;
        }
        .page {
            width: 210mm;
            height: 297mm;
            page-break-after: always;
            position: relative;
            overflow: hidden;
        }
        .dark-page {
            background: #0b1120;
            color: #ffffff;
        }
        
        /* Sidebar Layout */
        .sidebar {
            position: absolute;
            top: 0;
            left: 0;
            width: 35%;
            height: 100%;
            background-size: cover;
            background-position: center;
        }
        .content {
            position: absolute;
            top: 0;
            right: 0;
            width: 65%;
            height: 100%;
            padding: 40px;
            box-sizing: border-box;
        }

        /* Page 1: Cover */
        .cover-content {
            padding: 80px 50px;
        }
        .logo-header {
            height: 45px;
            margin-bottom: 80px;
        }
        .hero-title {
            font-size: 42px;
            font-weight: bold;
            line-height: 1.1;
            text-transform: uppercase;
            letter-spacing: -1px;
            color: #111827;
        }
        .hero-subtitle {
            font-size: 18px;
            color: #6b7280;
            margin-top: 20px;
            letter-spacing: 2px;
            text-transform: uppercase;
        }
        .meta-container {
            margin-top: 100px;
            border-top: 1px solid #e5e7eb;
        }
        .meta-row {
            padding: 20px 0;
            border-bottom: 1px solid #e5e7eb;
        }
        .meta-label {
            font-weight: bold;
            color: #9ca3af;
            font-size: 12px;
            text-transform: uppercase;
            margin-bottom: 5px;
        }
        .meta-value {
            font-size: 16px;
            color: #111827;
            word-wrap: break-word;
            overflow-wrap: break-word;
        }

        /* Page 3: Health Scores */
        .score-grid {
            margin-top: 60px;
            text-align: center;
        }
        .score-card {
            margin-bottom: 40px;
        }
        .score-title {
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 10px;
            color: #3b82f6;
        }
        .score-desc {
            font-size: 14px;
            color: #94a3b8;
            padding: 0 20px;
            word-wrap: break-word;
        }

        /* Page 4: Findings */
        .finding-box {
            background: rgba(255, 255, 255, 0.03);
            border-left: 4px solid #3b82f6;
            padding: 20px;
            margin-bottom: 25px;
            border-radius: 0 8px 8px 0;
            word-wrap: break-word;
        }
        .finding-title {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 10px;
            color: #f8fafc;
        }
        .finding-text {
            font-size: 14px;
            color: #94a3b8;
            word-wrap: break-word;
        }

        /* Page 5: Roadmap */
        .roadmap-container {
            margin-top: 40px;
        }
        .phase-box {
            position: relative;
            padding-left: 30px;
            margin-bottom: 40px;
            border-left: 2px solid #1e293b;
        }
        .phase-dot {
            position: absolute;
            left: -7px;
            top: 0;
            width: 12px;
            height: 12px;
            background: #3b82f6;
            border-radius: 50%;
            box-shadow: 0 0 10px #3b82f6;
        }
        .phase-tag {
            font-size: 12px;
            color: #3b82f6;
            font-weight: bold;
            text-transform: uppercase;
        }
        .phase-title {
            font-size: 22px;
            font-weight: bold;
            margin: 5px 0;
        }
        .phase-duration {
            font-size: 14px;
            color: #64748b;
            margin-bottom: 10px;
        }

        .verdict-banner {
            background: #ef4444;
            color: white;
            padding: 20px;
            text-align: center;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 2px;
            margin-top: 50px;
        }
        
        /* Utils */
        .text-gradient {
            color: #3b82f6;
        }
    </style>
</head>
<body>

    <!-- PAGE 1: COVER -->
    <div class="page">
        <div class="cover-content">
            <img src="{{ public_path('brand-logo.png') }}" class="logo-header">
            
            <div class="hero-subtitle">Technical Audit &</div>
            <div class="hero-title">Forensic<br>Analysis</div>
            
            <div class="meta-container">
                <div class="meta-row">
                    <div class="meta-label">Client</div>
                    <div class="meta-value">{{ $report->client_name }}</div>
                </div>
                <div class="meta-row">
                    <div class="meta-label">Release Date</div>
                    <div class="meta-value">{{ $report->created_at->format('M d, Y') }}</div>
                </div>
                <div class="meta-row">
                    <div class="meta-label">Audit Engine</div>
                    <div class="meta-value">BKX Labs Internal v4.2</div>
                </div>
                <div class="meta-row">
                    <div class="meta-label">Primary Stack</div>
                    <div class="meta-value">{{ implode(', ', $report->tech_stack ?? []) }}</div>
                </div>
            </div>
        </div>
    </div>

    <!-- PAGE 2: SYSTEM HEALTH SCORE -->
    <div class="page dark-page">
        <div class="sidebar" style="background-image: url('{{ public_path('assets/audit-report/dashboard-sidebar.png') }}')"></div>
        <div class="content">
            <h1 class="hero-subtitle" style="color: #3b82f6;">Technical Health</h1>
            <h2 style="font-size: 32px; margin-top: 0;">System Score</h2>
            
            <div class="score-grid">
                <div class="score-card">
                    {!! $report->getScoreSvg($report->security_score) !!}
                    <div class="score-title">Security Posture</div>
                    <div class="score-desc">Critical vulnerabilities and credential exposure metrics.</div>
                </div>
                
                <div class="score-card">
                    {!! $report->getScoreSvg($report->performance_score) !!}
                    <div class="score-title">Performance</div>
                    <div class="score-desc">Latency benchmarks and resource utilization efficiency.</div>
                </div>
                
                <div class="score-card">
                    {!! $report->getScoreSvg($report->maintainability_score) !!}
                    <div class="score-title">Maintainability</div>
                    <div class="score-desc">Code quality, technical debt, and refactor priorities.</div>
                </div>
            </div>
        </div>
    </div>

    <!-- PAGE 3: CRITICAL FINDINGS -->
    <div class="page dark-page">
        <div class="sidebar" style="background-image: url('{{ public_path('assets/audit-report/triage-sidebar.png') }}')"></div>
        <div class="content">
            <h1 class="hero-subtitle" style="color: #ef4444;">Forensic Data</h1>
            <h2 style="font-size: 32px; margin-top: 0;">Critical Findings</h2>
            
            <div class="finding-box" style="border-color: #ef4444;">
                <div class="finding-title">Security & Vulnerabilities</div>
                <div class="finding-text">{!! $report->critical_vulnerabilities !!}</div>
            </div>

            <div class="finding-box" style="border-color: #f97316;">
                <div class="finding-title">Infrastructure Bottlenecks</div>
                <div class="finding-text">{!! $report->infrastructure_bottlenecks !!}</div>
            </div>

            <div class="finding-box" style="border-color: #3b82f6;">
                <div class="finding-title">Frontend Technical Debt</div>
                <div class="finding-text">{!! $report->frontend_debt !!}</div>
            </div>
            
            <p style="font-size: 12px; color: #64748b; margin-top: 40px; font-style: italic;">
                Findings based on static code analysis and dynamic runtime profiling.
            </p>
        </div>
    </div>

    <!-- PAGE 4: RESCUE ROADMAP -->
    <div class="page dark-page">
        <div class="sidebar" style="background-image: url('{{ public_path('assets/audit-report/roadmap-sidebar.png') }}')"></div>
        <div class="content">
            <h1 class="hero-subtitle" style="color: #3b82f6;">Remediation</h1>
            <h2 style="font-size: 32px; margin-top: 0;">Rescue Roadmap</h2>
            
            <div class="roadmap-container">
                <div class="phase-box">
                    <div class="phase-dot"></div>
                    <div class="phase-tag">Phase 01</div>
                    <div class="phase-title">Stabilization</div>
                    <div class="phase-duration">{{ $report->phase_1_duration }}</div>
                    <div class="finding-text">{{ $report->phase_1 }}</div>
                </div>

                <div class="phase-box">
                    <div class="phase-dot"></div>
                    <div class="phase-tag">Phase 02</div>
                    <div class="phase-title">Optimization</div>
                    <div class="phase-duration">{{ $report->phase_2_duration }}</div>
                    <div class="finding-text">{{ $report->phase_2 }}</div>
                </div>

                <div class="phase-box">
                    <div class="phase-dot"></div>
                    <div class="phase-tag">Phase 03</div>
                    <div class="phase-title">Scale-Ready</div>
                    <div class="phase-duration">{{ $report->phase_3_duration }}</div>
                    <div class="finding-text">{{ $report->phase_3 }}</div>
                </div>
            </div>

            <div class="verdict-banner" style="background: {{ $report->status_verdict === 'STABLE / READY' ? '#10b981' : ($report->status_verdict === 'PROCEED WITH CAUTION' ? '#f97316' : '#ef4444') }}">
                Status Verdict: {{ $report->status_verdict }}
            </div>
        </div>
    </div>

</body>
</html>
