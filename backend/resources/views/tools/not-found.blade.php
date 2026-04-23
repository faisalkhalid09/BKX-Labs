<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tool Not Found — BKX Labs</title>
    <meta name="description" content="The tool you're looking for doesn't exist.">
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        :root {
            --color-bg-main: #f8f8f6;
            --color-text-primary: #161a1d;
            --color-text-secondary: #4f565c;
            --color-primary: #105da8;
            --color-primary-dark: #0d4a87;
        }
    </style>
</head>
<body class="bg-white text-gray-900">
    <div class="min-h-screen flex items-center justify-center p-6 md:p-8" style="background-color: var(--color-bg-main);">
        <div class="mx-auto max-w-4xl text-center">
            <h1 class="text-4xl font-bold mb-4" style="color: var(--color-text-primary);">Tool Not Found</h1>
            <p class="text-lg mb-8" style="color: var(--color-text-secondary);">
                The tool you're looking for doesn't exist or has been moved.
            </p>
            @if(isset($slug))
            <p class="text-sm mb-8" style="color: var(--color-text-secondary);">
                Requested slug: <code>{{ $slug }}</code>
            </p>
            @endif
            <a href="/tools" class="inline-block rounded-lg px-6 py-3 text-white font-semibold hover:opacity-90 transition" style="background-color: var(--color-primary);">
                View All Tools
            </a>
        </div>
    </div>
</body>
</html>

