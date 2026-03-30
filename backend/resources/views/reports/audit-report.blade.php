<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Technical Audit - {{ $report->client_name }}</title>
    <style>
        /* PDF Global Reset */
        * { margin: 0; padding: 0; box-sizing: border-box; }
        @page { margin: 0; size: auto; }
        body { font-family: 'Helvetica', 'Arial', sans-serif; background: #ffffff; color: #1e293b; margin: 0; padding: 0; font-size: 14px; }
        
        .page-break { page-break-after: always; }
        .page-container { width: 100%; height: 100%; position: relative; }
        .dark-bg { background-color: #0b1120; color: #ffffff; }

        /* Typography */
        h1, h2, h3 { margin: 0; padding: 0; }
        .hero-title { font-size: 46px; font-weight: bold; text-transform: uppercase; color: #0f172a; line-height: 1.1; margin-bottom: 20px; }
        .hero-subtitle { font-size: 16px; color: #64748b; text-transform: uppercase; letter-spacing: 2px; }
        
        .section-title { font-size: 32px; font-weight: bold; color: #ffffff; margin-bottom: 30px; margin-top: 10px; }
        .section-subtitle { font-size: 14px; color: #3b82f6; text-transform: uppercase; letter-spacing: 2px; font-weight: bold; }
        
        /* Table Split Layouts */
        .layout-table { width: 100%; height: 297mm; border-collapse: collapse; padding: 0; margin: 0; }
        .layout-table td { vertical-align: top; padding: 0; margin: 0; }
        .sidebar-td { width: 35%; background-color: #0b1120; }
        .sidebar-img { width: 100%; height: 297mm; display: block; object-fit: cover; }
        .content-td { width: 65%; padding: 60px 50px; }

        /* Cover Page */
        .cover-wrapper { padding: 80px 60px; height: 100%; }
        .logo-img { height: 45px; margin-bottom: 120px; }
        
        .meta-table { width: 100%; margin-top: 100px; border-collapse: collapse; }
        .meta-table td { padding: 25px 0; border-bottom: 1px solid #e2e8f0; vertical-align: top; }
        .meta-label { width: 30%; font-size: 12px; font-weight: bold; color: #64748b; text-transform: uppercase; letter-spacing: 1px; }
        .meta-value { width: 70%; font-size: 18px; color: #0f172a; font-weight: bold; word-wrap: break-word; overflow-wrap: break-word; }

        /* Scores Grid */
        .scores-table { width: 100%; margin-top: 50px; text-align: center; }
        .scores-table td { width: 33.3%; padding: 20px 10px; vertical-align: top; }
        .score-title { font-size: 18px; color: #3b82f6; font-weight: bold; margin-top: 20px; margin-bottom: 10px; }
        .score-desc { font-size: 13px; color: #94a3b8; line-height: 1.5; }

        /* Findings Boxes */
        .finding-box { background-color: #1e293b; padding: 25px; margin-bottom: 25px; border-radius: 6px; }
        .finding-title { font-size: 18px; color: #f8fafc; font-weight: bold; margin-bottom: 15px; border-bottom: 1px solid #334155; padding-bottom: 10px; }
        .finding-text { font-size: 14px; color: #cbd5e1; line-height: 1.6; }
        
        .border-red { border-left: 5px solid #ef4444; }
        .border-orange { border-left: 5px solid #f97316; }
        .border-blue { border-left: 5px solid #3b82f6; }

        /* Roadmap */
        .timeline-table { width: 100%; margin-top: 20px; border-collapse: collapse; }
        .timeline-table td { padding: 20px 0; border-bottom: 1px solid #1e293b; vertical-align: top; }
        .phase-name { font-size: 20px; color: #ffffff; font-weight: bold; margin-bottom: 5px; }
        .phase-dur { font-size: 13px; color: #3b82f6; text-transform: uppercase; font-weight: bold; letter-spacing: 1px; margin-bottom: 15px; }
        .phase-desc { font-size: 14px; color: #cbd5e1; line-height: 1.6; }

        .verdict-banner { background-color: #ef4444; color: #ffffff; padding: 25px; text-align: center; font-size: 22px; font-weight: bold; letter-spacing: 2px; text-transform: uppercase; margin-top: 50px; border-radius: 6px; }
    </style>
</head>
<body>

    <!-- PAGE 1: COVER -->
    <div class="page-container page-break">
        <div class="cover-wrapper">
            <img src="{{ public_path('brand-logo.png') }}" class="logo-img" alt="BKX Labs">
            
            <div class="hero-subtitle" style="margin-bottom: 10px;">Internal Security & Performance Report</div>
            <div class="hero-title">Technical Audit &<br>Forensic Analysis</div>
            
            <table class="meta-table">
                <tr>
                    <td class="meta-label">Client</td>
                    <td class="meta-value">{{ $report->client_name }}</td>
                </tr>
                <tr>
                    <td class="meta-label">Date</td>
                    <td class="meta-value">{{ $report->created_at->format('M d, Y') }}</td>
                </tr>
                <tr>
                    <td class="meta-label">Tech Stack</td>
                    <td class="meta-value" style="font-weight: normal; color: #334155; line-height: 1.5;">{{ implode(', ', $report->tech_stack ?? []) }}</td>
                </tr>
                <tr>
                    <td class="meta-label">Audit Scope</td>
                    <td class="meta-value" style="font-size: 15px; font-weight: normal; color: #334155; line-height: 1.5;">{{ $report->audit_scope }}</td>
                </tr>
            </table>

            <div style="position: absolute; bottom: 60px; left: 60px; font-size: 11px; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px;">
                CONFIDENTIAL • FOR AUTHORIZED PERSONNEL ONLY • DEVELOPED BY BKX LABS
            </div>
        </div>
    </div>

    <!-- PAGE 2: SYSTEM HEALTH SCORE -->
    <div class="page-container dark-bg page-break">
        <table class="layout-table">
            <tr>
                <td class="sidebar-td">
                    <img src="{{ public_path('assets/audit-report/dashboard-sidebar.png') }}" class="sidebar-img" />
                </td>
                <td class="content-td">
                    <div class="section-subtitle">Technical Health</div>
                    <div class="section-title">System Score</div>
                    
                    <p style="color: #94a3b8; font-size: 15px; line-height: 1.6; margin-bottom: 40px;">
                        The following scores indicate the primary health vectors of the platform based on static analysis and infrastructure review.
                    </p>

                    <table class="scores-table">
                        <tr>
                            <td>
                                {!! $report->getScoreSvg($report->security_score) !!}
                                <div class="score-title">Security</div>
                                <div class="score-desc">Critical vulnerabilities, IAM constraints, and credential exposure.</div>
                            </td>
                            <td>
                                {!! $report->getScoreSvg($report->performance_score) !!}
                                <div class="score-title">Performance</div>
                                <div class="score-desc">Cloud latency, query optimization, and resource efficiency.</div>
                            </td>
                            <td>
                                {!! $report->getScoreSvg($report->maintainability_score) !!}
                                <div class="score-title">Architecture</div>
                                <div class="score-desc">Code quality, frontend structural debt, and refactor needs.</div>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </div>

    <!-- PAGE 3: CRITICAL FINDINGS -->
    <div class="page-container dark-bg page-break">
        <table class="layout-table">
            <tr>
                <td class="sidebar-td">
                    <img src="{{ public_path('assets/audit-report/triage-sidebar.png') }}" class="sidebar-img" />
                </td>
                <td class="content-td">
                    <div class="section-subtitle">Forensic Data</div>
                    <div class="section-title">Critical Findings</div>

                    <div class="finding-box border-red">
                        <div class="finding-title" style="color: #ef4444;">Security & Vulnerabilities</div>
                        <div class="finding-text">{!! $report->critical_vulnerabilities !!}</div>
                    </div>

                    <div class="finding-box border-orange">
                        <div class="finding-title" style="color: #f97316;">Infrastructure Bottlenecks</div>
                        <div class="finding-text">{!! $report->infrastructure_bottlenecks !!}</div>
                    </div>

                    <div class="finding-box border-blue">
                        <div class="finding-title" style="color: #3b82f6;">Frontend Technical Debt</div>
                        <div class="finding-text">{!! $report->frontend_debt !!}</div>
                    </div>

                    <p style="font-size: 13px; color: #64748b; margin-top: 30px; font-style: italic;">
                        Findings based on full-stack forensic review. These elements represent immediate operational consequences.
                    </p>
                </td>
            </tr>
        </table>
    </div>

    <!-- PAGE 4: RESCUE ROADMAP -->
    <div class="page-container dark-bg">
        <table class="layout-table">
            <tr>
                <td class="sidebar-td">
                    <img src="{{ public_path('assets/audit-report/roadmap-sidebar.png') }}" class="sidebar-img" />
                </td>
                <td class="content-td">
                    <div class="section-subtitle">Remediation</div>
                    <div class="section-title">Rescue Roadmap</div>
                    
                    <p style="color: #94a3b8; font-size: 15px; margin-bottom: 30px;">
                        The sequence is intentionally strict to minimize risk. Compressing these phases reintroduces technical debt.
                    </p>

                    <table class="timeline-table">
                        <tr>
                            <td style="width: 40px; text-align: center;">
                                <div style="width: 20px; height: 20px; border-radius: 10px; background-color: #3b82f6; margin: 0 auto;"></div>
                            </td>
                            <td style="padding-left: 20px; padding-bottom: 40px;">
                                <div class="phase-dur">{{ $report->phase_1_duration }}</div>
                                <div class="phase-name">Phase 1: Stabilization</div>
                                <div class="phase-desc">{{ $report->phase_1 }}</div>
                            </td>
                        </tr>
                        <tr>
                            <td style="width: 40px; text-align: center;">
                                <div style="width: 20px; height: 20px; border-radius: 10px; background-color: #3b82f6; margin: 0 auto;"></div>
                            </td>
                            <td style="padding-left: 20px; padding-bottom: 40px;">
                                <div class="phase-dur">{{ $report->phase_2_duration }}</div>
                                <div class="phase-name">Phase 2: Optimization</div>
                                <div class="phase-desc">{{ $report->phase_2 }}</div>
                            </td>
                        </tr>
                        <tr>
                            <td style="width: 40px; text-align: center;">
                                <div style="width: 20px; height: 20px; border-radius: 10px; background-color: #3b82f6; margin: 0 auto;"></div>
                            </td>
                            <td style="padding-left: 20px;">
                                <div class="phase-dur">{{ $report->phase_3_duration }}</div>
                                <div class="phase-name">Phase 3: Scale-Ready</div>
                                <div class="phase-desc">{{ $report->phase_3 }}</div>
                            </td>
                        </tr>
                    </table>

                    <div class="verdict-banner" style="background-color: {{ $report->status_verdict === 'STABLE / READY' ? '#10b981' : ($report->status_verdict === 'PROCEED WITH CAUTION' ? '#f97316' : '#ef4444') }}">
                        {{ $report->status_verdict }}
                    </div>
                </td>
            </tr>
        </table>
    </div>

</body>
</html>
