<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Technical Audit - {{ $report->client_name }}</title>
    <style>
        /* PDF Global Reset */
        * { margin: 0; padding: 0; box-sizing: border-box; }
        @page { margin: 0; size: A4 portrait; }
        body { font-family: 'Helvetica', 'Arial', sans-serif; background: #0a1120; color: #cbd5e1; margin: 0; padding: 0; font-size: 14px; }
        
        .page-break { page-break-after: always; }
        .page-container { width: 100%; height: 297mm; position: relative; padding: 80px 60px; overflow: hidden; }

        /* Typography */
        h1, h2, h3 { margin: 0; padding: 0; }
        .hero-title { font-size: 52px; font-weight: bold; text-transform: uppercase; color: #ffffff; line-height: 1.1; margin-bottom: 25px; letter-spacing: -1px; }
        .hero-subtitle { font-size: 14px; color: #4aa5ff; text-transform: uppercase; letter-spacing: 4px; font-weight: bold; margin-bottom: 20px; display: block; }
        
        .section-title { font-size: 42px; font-weight: bold; color: #ffffff; margin-bottom: 40px; margin-top: 5px; letter-spacing: -1px; }
        .section-subtitle { font-size: 13px; color: #4aa5ff; text-transform: uppercase; letter-spacing: 3px; font-weight: bold; }
        
        /* Cover Page */
        .logo-img { height: 50px; margin-bottom: 140px; }
        
        .meta-table { width: 100%; margin-top: 100px; border-collapse: separate; border-spacing: 0; border: 1px solid #1e293b; border-radius: 8px; background: #0f172a; }
        .meta-table td { padding: 35px; border-bottom: 1px solid #1e293b; vertical-align: top; }
        .meta-table tr:last-child td { border-bottom: none; }
        .meta-label { width: 30%; font-size: 12px; font-weight: bold; color: #64748b; text-transform: uppercase; letter-spacing: 2px; }
        .meta-value { width: 70%; font-size: 20px; color: #ffffff; font-weight: bold; word-wrap: break-word; overflow-wrap: break-word; }
        .meta-subtext { font-size: 15px; font-weight: normal; color: #94a3b8; line-height: 1.6; margin-top: 8px; }

        .footer-note { position: absolute; bottom: 60px; left: 60px; font-size: 10px; color: #475569; text-transform: uppercase; letter-spacing: 2px; }

        /* Scores Grid */
        .scores-table { width: 100%; margin-top: 80px; text-align: center; table-layout: fixed; }
        .scores-table td { width: 33.3%; padding: 0 20px; vertical-align: top; }
        .score-svg { display: block; margin: 0 auto 40px auto; width: 160px; height: 160px; }
        .score-title { font-size: 24px; color: #ffffff; font-weight: bold; margin-bottom: 15px; }
        .score-desc { font-size: 15px; color: #94a3b8; line-height: 1.7; }

        /* Findings Boxes */
        .finding-box { background-color: #172136; padding: 40px; margin-bottom: 35px; border-radius: 6px; }
        .finding-title { font-size: 22px; font-weight: bold; margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px solid #1e293b; }
        .finding-text { font-size: 16px; color: #cbd5e1; line-height: 1.8; }
        
        .title-red { color: #f43f5e; }
        .title-orange { color: #f97316; }
        .title-blue { color: #3b82f6; }
        
        .border-red { border-left: 8px solid #f43f5e; }
        .border-orange { border-left: 8px solid #f97316; }
        .border-blue { border-left: 8px solid #3b82f6; }

        /* Roadmap */
        .timeline-table { width: 90%; margin-left: 5%; margin-top: 50px; border-collapse: collapse; }
        .timeline-table td { padding-bottom: 60px; vertical-align: top; }
        
        .tl-marker { width: 40px; border-right: 2px solid #005066; text-align: right; }
        .tl-dot { width: 20px; height: 20px; border-radius: 10px; background-color: #00e5ff; float: right; margin-right: -11px; margin-top: 6px; box-shadow: 0 0 10px rgba(0, 229, 255, 0.5); }
        .tl-content { padding-left: 50px; }
        
        .phase-dur { font-size: 13px; color: #00e5ff; text-transform: uppercase; font-weight: bold; letter-spacing: 2px; margin-bottom: 12px; }
        .phase-name { font-size: 28px; color: #ffffff; font-weight: bold; margin-bottom: 15px; }
        .phase-desc { font-size: 16px; color: #cbd5e1; line-height: 1.8; }

        .verdict-banner { background-color: #ef4444; color: #ffffff; padding: 35px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 3px; text-transform: uppercase; margin-top: 60px; border-radius: 8px; box-shadow: 0 10px 30px rgba(239, 68, 68, 0.5); }
    </style>
</head>
<body>

    <!-- PAGE 1: COVER -->
    <div class="page-container page-break">
        <!-- Assuming client_logo_path is prioritized, else fallback to brand-logo.png -->
        <img src="{{ public_path('brand-logo.png') }}" class="logo-img" alt="BKX Labs">
        
        <div class="hero-subtitle">Internal Security & Performance Report</div>
        <div class="hero-title">Technical Audit &<br>Forensic Analysis</div>
        
        <table class="meta-table">
            <tr>
                <td class="meta-label">Client / Target</td>
                <td class="meta-value">{{ $report->client_name }}</td>
            </tr>
            <tr>
                <td class="meta-label">Audit Date</td>
                <td class="meta-value">{{ $report->created_at->format('F d, Y') }}</td>
            </tr>
            <tr>
                <td class="meta-label">Environment Stack</td>
                <td class="meta-value">
                    <div class="meta-subtext">{{ implode(' • ', $report->tech_stack ?? []) }}</div>
                </td>
            </tr>
            <tr>
                <td class="meta-label">Analysis Scope</td>
                <td class="meta-value">
                    <div class="meta-subtext">{{ $report->audit_scope }}</div>
                </td>
            </tr>
        </table>

        <div class="footer-note">
            STRICTLY CONFIDENTIAL • FOR AUTHORIZED PERSONNEL ONLY • PREPARED BY BKX LABS
        </div>
    </div>

    <!-- PAGE 2: SYSTEM HEALTH SCORE -->
    <div class="page-container page-break">
        <div class="section-subtitle">Technical Health</div>
        <div class="section-title">System Score</div>
        
        <p style="color: #94a3b8; font-size: 18px; line-height: 1.6; margin-bottom: 60px;">
            The following aggregate scores indicate the active primary health vectors of the core platform infrastructure based on static code analysis and live forensic review.
        </p>

        <table class="scores-table">
            <tr>
                <td>
                    <div class="score-svg">{!! $report->getScoreSvg($report->security_score) !!}</div>
                    <div class="score-title" style="color: #f43f5e;">Security</div>
                    <div class="score-desc">Critical vulnerabilities, IAM constraints, data exfiltration risks, and credential exposure.</div>
                </td>
                <td>
                    <div class="score-svg">{!! $report->getScoreSvg($report->performance_score) !!}</div>
                    <div class="score-title" style="color: #f97316;">Performance</div>
                    <div class="score-desc">Cloud environment latency, unoptimized query pipelines, resource exhaustion points.</div>
                </td>
                <td>
                    <div class="score-svg">{!! $report->getScoreSvg($report->maintainability_score) !!}</div>
                    <div class="score-title" style="color: #3b82f6;">Architecture</div>
                    <div class="score-desc">Overall code quality index, frontend structural debt matrix, and critical refactor urgency.</div>
                </td>
            </tr>
        </table>
        
        <div class="footer-note">
            AGGREGATE DIAGNOSTIC RATING • AUTOMATED & MANUAL TRIAGE METRICS
        </div>
    </div>

    <!-- PAGE 3: CRITICAL FINDINGS -->
    <div class="page-container page-break">
        <div class="section-subtitle">Forensic Data</div>
        <div class="section-title">Critical Findings</div>
        
        <p style="color: #94a3b8; font-size: 17px; margin-bottom: 40px; font-style: italic;">
            Select forensic insights triggered from deep-level algorithmic scanning. These structural failures represent immediate operational consequences.
        </p>

        <div class="finding-box border-red">
            <div class="finding-title title-red">Security & Vulnerabilities</div>
            <div class="finding-text">{!! $report->critical_vulnerabilities !!}</div>
        </div>

        <div class="finding-box border-orange">
            <div class="finding-title title-orange">Infrastructure Bottlenecks</div>
            <div class="finding-text">{!! $report->infrastructure_bottlenecks !!}</div>
        </div>

        <div class="finding-box border-blue">
            <div class="finding-title title-blue">Frontend Technical Debt</div>
            <div class="finding-text">{!! $report->frontend_debt !!}</div>
        </div>
        
        <div class="footer-note">
            FORENSIC SNAPSHOT • CRITICAL SEVERITY LOGS ONLY
        </div>
    </div>

    <!-- PAGE 4: RESCUE ROADMAP -->
    <div class="page-container">
        <div class="section-subtitle">Remediation Protocol</div>
        <div class="section-title">Rescue Roadmap</div>
        
        <p style="color: #94a3b8; font-size: 17px; margin-bottom: 20px;">
            The resolution pipeline is intentionally strict to mitigate compounding structural failure. Attempting to compress or bypass these operational phases will systematically reintroduce technical debt.
        </p>

        <table class="timeline-table">
            <tr>
                <td class="tl-marker">
                    <div class="tl-dot"></div>
                </td>
                <td class="tl-content">
                    <div class="phase-dur">{{ $report->phase_1_duration }}</div>
                    <div class="phase-name">Phase 1: Stabilization</div>
                    <div class="phase-desc">{{ $report->phase_1 }}</div>
                </td>
            </tr>
            <tr>
                <td class="tl-marker">
                    <div class="tl-dot"></div>
                </td>
                <td class="tl-content">
                    <div class="phase-dur">{{ $report->phase_2_duration }}</div>
                    <div class="phase-name">Phase 2: Optimization</div>
                    <div class="phase-desc">{{ $report->phase_2 }}</div>
                </td>
            </tr>
            <tr>
                <td class="tl-marker" style="border-right: none;">
                    <div class="tl-dot" style="margin-right: -10px;"></div>
                </td>
                <td class="tl-content">
                    <div class="phase-dur">{{ $report->phase_3_duration }}</div>
                    <div class="phase-name">Phase 3: Scale-Ready</div>
                    <div class="phase-desc">{{ $report->phase_3 }}</div>
                </td>
            </tr>
        </table>

        @php
            // Setup dynamic styles for the actionable button
            $btnColor = '#ef4444'; // Red
            if ($report->status_verdict === 'STABLE / READY') $btnColor = '#10b981'; // Green
            if ($report->status_verdict === 'PROCEED WITH CAUTION') $btnColor = '#f97316'; // Orange
        @endphp

        <div class="verdict-banner" style="background-color: {{ $btnColor }}; box-shadow: 0 10px 30px {{ $btnColor }}66;">
            {{ $report->status_verdict }}
        </div>
        
        <div class="footer-note">
            RECOVERY TIMELINE • PROJECTED WORKLOAD ARCHITECTURE
        </div>
    </div>

</body>
</html>
