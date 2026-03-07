<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Store — BKX Labs</title>
    <meta name="description" content="BKX Labs digital product store — launching soon.">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            font-family: 'Inter', sans-serif;
            background: #f8fafc;
            color: #0f172a;
            -webkit-font-smoothing: antialiased;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
        }

        /* ── Header ── */
        header {
            background: #fff;
            border-bottom: 1px solid #e2e8f0;
            padding: 0 2rem;
            height: 60px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .logo {
            font-size: 1.15rem;
            font-weight: 800;
            color: #0f172a;
            letter-spacing: -0.03em;
            text-decoration: none;
        }
        .logo span { color: #1e3a8a; }
        .back-link {
            font-size: 0.825rem;
            font-weight: 500;
            color: #64748b;
            text-decoration: none;
            display: flex;
            align-items: center;
            gap: 0.375rem;
            transition: color .18s;
        }
        .back-link:hover { color: #0f172a; }

        /* ── Main ── */
        main {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 4rem 1.5rem;
        }

        .card {
            background: #fff;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            padding: 3rem 2.5rem;
            max-width: 520px;
            width: 100%;
            text-align: center;
        }

        /* Status dot */
        .status-row {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            background: #eff6ff;
            border: 1px solid #bfdbfe;
            border-radius: 999px;
            padding: 0.3rem 0.875rem;
            margin-bottom: 1.75rem;
        }
        .status-dot {
            width: 7px;
            height: 7px;
            border-radius: 50%;
            background: #1e3a8a;
        }
        .status-label {
            font-size: 0.75rem;
            font-weight: 700;
            letter-spacing: 0.06em;
            text-transform: uppercase;
            color: #1e3a8a;
        }

        /* Icon */
        .icon-wrap {
            width: 56px;
            height: 56px;
            background: #f1f5f9;
            border-radius: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1.5rem;
        }
        .icon-wrap svg {
            width: 26px;
            height: 26px;
            stroke: #1e3a8a;
        }

        h1 {
            font-size: 1.6rem;
            font-weight: 800;
            letter-spacing: -0.04em;
            color: #0f172a;
            line-height: 1.2;
            margin-bottom: 0.75rem;
        }
        p {
            font-size: 0.9rem;
            color: #64748b;
            line-height: 1.7;
            max-width: 38ch;
            margin: 0 auto 2rem;
        }

        /* Divider */
        .sep {
            border: none;
            border-top: 1px solid #f1f5f9;
            margin: 0 0 1.5rem;
        }

        /* Info rows */
        .info-list {
            list-style: none;
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
            text-align: left;
            margin-bottom: 2rem;
        }
        .info-item {
            display: flex;
            align-items: flex-start;
            gap: 0.75rem;
            font-size: 0.85rem;
            color: #374151;
        }
        .info-item-icon {
            width: 20px;
            height: 20px;
            flex-shrink: 0;
            margin-top: 1px;
            stroke: #94a3b8;
        }

        /* CTA */
        .btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-family: 'Inter', sans-serif;
            font-weight: 600;
            font-size: 0.875rem;
            border-radius: 8px;
            cursor: pointer;
            border: 1.5px solid transparent;
            padding: 0.65rem 1.5rem;
            text-decoration: none;
            transition: all .18s;
        }
        .btn-primary { background: #0f172a; color: #fff; border-color: #0f172a; }
        .btn-primary:hover { background: #1e293b; }
        .btn-outline { background: #fff; color: #374151; border-color: #e2e8f0; margin-left: .5rem; }
        .btn-outline:hover { border-color: #94a3b8; color: #0f172a; }

        /* ── Footer ── */
        footer {
            border-top: 1px solid #e2e8f0;
            padding: 1.25rem 2rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: .5rem;
        }
        footer p { font-size: 0.775rem; color: #94a3b8; }
    </style>
</head>
<body>

<header>
    <a href="{{ url('/') }}" class="logo">BKX<span>Labs</span></a>
    <a href="{{ url('/') }}" class="back-link">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        Back to site
    </a>
</header>

<main>
    <div class="card">

        <div class="status-row">
            <div class="status-dot"></div>
            <span class="status-label">In Development</span>
        </div>

        <div class="icon-wrap">
            <svg viewBox="0 0 24 24" fill="none" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2"/>
                <path d="M8 21h8M12 17v4"/>
            </svg>
        </div>

        <h1>Store is Coming Soon</h1>
        <p>We are building something for you. The BKX Labs digital product store will be available shortly.</p>

        <hr class="sep">

        <ul class="info-list">
            <li class="info-item">
                <svg class="info-item-icon" viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"/>
                </svg>
                AI models, automation scripts, and digital templates
            </li>
            <li class="info-item">
                <svg class="info-item-icon" viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                Secure payments and instant digital delivery
            </li>
            <li class="info-item">
                <svg class="info-item-icon" viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 6v6l4 2"/>
                </svg>
                Launching soon — check back in a few days
            </li>
        </ul>

        <div>
            <a href="{{ url('/') }}" class="btn btn-primary">Go to Main Site</a>
            <a href="mailto:contact@bkxlabs.com" class="btn btn-outline">Contact Us</a>
        </div>

    </div>
</main>

<footer>
    <p>BKX Labs</p>
    <p>© {{ date('Y') }} BKX Labs. All rights reserved.</p>
</footer>

</body>
</html>
