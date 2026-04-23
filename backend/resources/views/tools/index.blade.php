<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tools — BKX Labs</title>
    <meta name="description" content="Explore our collection of compliance, infrastructure, and AI security tools for technical teams.">
    <meta property="og:title" content="Tools — BKX Labs">
    <meta property="og:description" content="Explore our collection of compliance, infrastructure, and AI security tools for technical teams.">
    <meta property="og:type" content="website">
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        :root {
            --color-bg-main: #f8f8f6;
            --color-text-primary: #161a1d;
            --color-text-secondary: #4f565c;
            --color-border: #d4d9de;
        }
    </style>
</head>
<body class="bg-white text-gray-900">
    <div class="min-h-screen" style="background-color: var(--color-bg-main);">
        <div class="mx-auto max-w-6xl px-6 py-12 md:py-16">
            <div class="mb-12">
                <h1 class="text-4xl font-bold mb-4" style="color: var(--color-text-primary);">Tools</h1>
                <p class="text-lg" style="color: var(--color-text-secondary);">
                    A collection of compliance, infrastructure, and AI security tools designed for technical teams.
                </p>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                @if(!empty($tools))
                    @foreach($tools as $tool)
                    <a href="/tools/{{ $tool['slug'] }}" class="block p-6 bg-white border rounded-lg hover:shadow-lg transition-shadow" style="border-color: var(--color-border);">
                        <h3 class="text-xl font-semibold mb-2" style="color: var(--color-text-primary);">{{ $tool['title'] }}</h3>
                        <p class="mb-4 line-clamp-2" style="color: var(--color-text-secondary);">{{ $tool['description'] }}</p>
                        <div class="inline-flex items-center font-semibold" style="color: var(--color-primary);">
                            View Tool <span class="ml-2">→</span>
                        </div>
                    </a>
                    @endforeach
                @else
                    <p style="color: var(--color-text-secondary);">No tools available at this time.</p>
                @endif
            </div>
        </div>
    </div>
</body>
</html>

