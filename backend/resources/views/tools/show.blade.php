<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $metadata['title'] }}</title>
    <meta name="description" content="{{ $metadata['description'] }}">
    <link rel="canonical" href="{{ $metadata['canonical'] }}">
    
    <!-- Open Graph -->
    <meta property="og:title" content="{{ $metadata['og']['title'] }}">
    <meta property="og:description" content="{{ $metadata['og']['description'] }}">
    <meta property="og:url" content="{{ $metadata['og']['url'] }}">
    <meta property="og:type" content="{{ $metadata['og']['type'] }}">
    <meta property="og:site_name" content="{{ $metadata['og']['site_name'] }}">
    <meta property="og:image" content="{{ $metadata['og']['image'] }}">
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="{{ $metadata['twitter']['card'] }}">
    <meta name="twitter:title" content="{{ $metadata['twitter']['title'] }}">
    <meta name="twitter:description" content="{{ $metadata['twitter']['description'] }}">
    <meta name="twitter:image" content="{{ $metadata['twitter']['image'] }}">
    
    <!-- Schema.org - SoftwareApplication + FAQPage -->
    <script type="application/ld+json">
    {!! json_encode($schema['softwareApplication']) !!}
    </script>
    
    <script type="application/ld+json">
    {!! json_encode($schema['faqPage']) !!}
    </script>
    
    <!-- Tailwind CSS via CDN for stateless rendering -->
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        :root {
            --color-bg-main: #f8f8f6;
            --color-text-primary: #161a1d;
            --color-text-secondary: #4f565c;
            --color-border: #d4d9de;
            --color-primary: #105da8;
            --color-primary-dark: #0d4a87;
        }

        html, body {
            margin: 0;
            min-height: 100%;
            background: #f8f8f6;
        }

        body[data-route="tools"] #agency-hero,
        body[data-route="tools"] .homepage-wrapper,
        body[data-route="tools"] .home-page,
        body[data-route="tools"] .agency-layout,
        body[data-route="tools"] .navbar,
        body[data-route="tools"] .site-header,
        body[data-route="tools"] .site-footer {
            display: none !important;
            visibility: hidden !important;
            opacity: 0 !important;
            pointer-events: none !important;
            height: 0 !important;
            overflow: hidden !important;
        }

        body[data-route="tools"] .tools-boot-slate {
            position: fixed;
            inset: 0;
            z-index: 0;
            background: linear-gradient(180deg, #f8f8f6 0%, #eef2f6 100%);
        }

        body[data-route="tools"] .tools-boot-slate::before {
            content: "";
            position: absolute;
            inset: 0;
            background-image:
                radial-gradient(circle at 20% 20%, rgba(16, 93, 168, 0.06), transparent 32%),
                radial-gradient(circle at 80% 20%, rgba(13, 74, 135, 0.05), transparent 28%),
                radial-gradient(circle at 50% 80%, rgba(16, 93, 168, 0.04), transparent 30%);
        }

        body[data-route="tools"] main {
            position: relative;
            z-index: 1;
        }
    </style>
</head>
<body class="bg-white text-gray-900" data-route="tools">
    <div class="tools-boot-slate" aria-hidden="true"></div>
    <!-- ═══════════════════════════════════════════════════════════════════
         DIRECT ANSWER BLOCK — Visible for crawlers + users
         This ensures Google, Bing, and AI crawlers see the direct answer
         without waiting for JavaScript to render.
    ═════════════════════════════════════════════════════════════════════ -->
    <main class="bg-white">
        <article itemscope itemtype="https://schema.org/SoftwareApplication">
            <meta itemprop="name" content="{{ $tool['title'] }}">
            <meta itemprop="description" content="{{ $tool['description'] }}">
            <meta itemprop="url" content="{{ $metadata['canonical'] }}">
            
            <div class="mx-auto max-w-4xl px-6 py-12">
                <!-- Tool Title & Description -->
                <h1 class="text-3xl font-bold mb-4" style="color: var(--color-text-primary);">{{ $tool['title'] }}</h1>
                <p class="text-lg mb-8" style="color: var(--color-text-secondary);">{{ $tool['description'] }}</p>
                
                <!-- Value Proposition (for user engagement) -->
                <div class="border-l-4 p-4 mb-8" style="background-color: var(--color-bg-main); border-color: var(--color-primary);">
                    <p style="color: var(--color-text-secondary);"><strong>Key Benefit:</strong> {{ $tool['valueProposition'] }}</p>
                </div>
                
                <!-- Direct Answer Block — Authoritative content for crawlers -->
                @if(isset($tool['directAnswer']))
                <section class="mb-12">
                    <h2 class="text-2xl font-semibold mb-4" style="color: var(--color-text-primary);">How This Tool Works</h2>
                    <div class="space-y-4" style="color: var(--color-text-secondary);">
                        <p>
                            <strong>{{ $tool['directAnswer']['sentence1'] }}</strong>
                        </p>
                        <p>
                            <strong>Authoritative Source:</strong> {{ $tool['directAnswer']['sentence2'] }}
                        </p>
                    </div>
                </section>
                @endif
                
                <!-- FAQs — Visible for crawlers + users + featured snippets -->
                @if(isset($tool['faqs']) && count($tool['faqs']) > 0)
                <section class="mb-12" itemscope itemtype="https://schema.org/FAQPage">
                    <h2 class="text-2xl font-semibold mb-6" style="color: var(--color-text-primary);">Frequently Asked Questions</h2>
                    <div class="space-y-4">
                        @foreach($tool['faqs'] as $faq)
                        <div class="border rounded-lg p-4" style="border-color: var(--color-border);" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
                            <h3 class="font-semibold mb-2" style="color: var(--color-text-primary);">
                                <span itemprop="name">{{ $faq['question'] }}</span>
                            </h3>
                            <div itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
                                <p style="color: var(--color-text-secondary);" itemprop="text">
                                    {{ $faq['answer'] }}
                                </p>
                            </div>
                        </div>
                        @endforeach
                    </div>
                </section>
                @endif
                
                <!-- Back to Tools Link -->
                <div class="mt-12 text-center">
                    <a href="/tools" class="inline-block px-6 py-3 rounded-lg font-semibold text-white" style="background-color: var(--color-primary);">
                        Back to All Tools
                    </a>
                </div>
            </div>
        </article>
    </main>
</body>
</html>

