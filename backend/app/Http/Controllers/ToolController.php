<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\View\View;
use Illuminate\Http\Response;

class ToolController extends Controller
{
    /**
     * Display a specific tool page with full server-side metadata injection
     * 
     * This controller ensures that Google, Bing, and AI crawlers see the correct
     * tool metadata and Direct Answer blocks in the initial HTML response (not
     * waiting for JavaScript to render).
     * 
     * @param string $slug The tool slug (e.g., "eu-ai-act-risk-level-classifier")
     * @return View|Response
     */
    public function show(string $slug): View|Response
    {
        // Load the JSON registry file
        $registryPath = public_path('data/tools-registry.json');
        
        if (!file_exists($registryPath)) {
            return response()->view('tools.not-found', [], 404);
        }

        $registryJson = file_get_contents($registryPath);
        $toolsRegistry = json_decode($registryJson, true);

        // Find the tool by slug
        $tool = null;
        foreach ($toolsRegistry as $t) {
            if ($t['slug'] === $slug) {
                $tool = $t;
                break;
            }
        }

        // Tool not found
        if (!$tool) {
            return response()->view('tools.not-found', ['slug' => $slug], 404);
        }

        // Generate Schema.org markup for the tool
        $schema = $this->generateToolSchema($tool);

        // Generate SEO metadata
        $metadata = $this->generateMetadata($tool);

        return view('tools.show', [
            'tool' => $tool,
            'schema' => $schema,
            'metadata' => $metadata,
            'ogImage' => asset('/images/tools-og-image.png'), // Updated below
        ]);
    }

    /**
     * Generate Schema.org SoftwareApplication + FAQPage markup
     * Google uses FAQPage schema for featured snippets
     * 
     * @param array $tool
     * @return array
     */
    private function generateToolSchema(array $tool): array
    {
        $siteUrl = config('app.url');

        // SoftwareApplication schema
        $softwareApplication = [
            '@context' => 'https://schema.org',
            '@type' => 'SoftwareApplication',
            'name' => $tool['title'],
            'description' => $tool['description'],
            'url' => "{$siteUrl}/tools/{$tool['slug']}",
            'applicationCategory' => 'BusinessApplication',
            'offers' => [
                '@type' => 'Offer',
                'price' => '0',
                'priceCurrency' => 'USD',
            ],
            'inLanguage' => 'en-US',
        ];

        // FAQPage schema (for Google featured snippets)
        $faqPageItems = [];
        if (!empty($tool['faqs'])) {
            foreach ($tool['faqs'] as $faq) {
                $faqPageItems[] = [
                    '@type' => 'Question',
                    'name' => $faq['question'],
                    'acceptedAnswer' => [
                        '@type' => 'Answer',
                        'text' => $faq['answer'],
                    ],
                ];
            }
        }

        $faqPage = [
            '@context' => 'https://schema.org',
            '@type' => 'FAQPage',
            'mainEntity' => $faqPageItems,
        ];

        return [
            'softwareApplication' => $softwareApplication,
            'faqPage' => $faqPage,
        ];
    }

    /**
     * Generate Meta tags and Open Graph data
     * 
     * @param array $tool
     * @return array
     */
    private function generateMetadata(array $tool): array
    {
        $siteUrl = config('app.url');
        $toolUrl = "{$siteUrl}/tools/{$tool['slug']}";
        
        // Create a comprehensive meta description from direct answer
        $metaDescription = $tool['description'];
        if (!empty($tool['directAnswer']['sentence1'])) {
            $metaDescription = \Str::limit($tool['directAnswer']['sentence1'], 160);
        }

        // Use a default OG image from public storage
        $ogImage = "{$siteUrl}/images/tools-og-image.png";

        return [
            'title' => $tool['title'] . ' | BKX Labs',
            'description' => $metaDescription,
            'canonical' => $toolUrl,
            'og' => [
                'title' => $tool['title'],
                'description' => $tool['valueProposition'],
                'url' => $toolUrl,
                'type' => 'website',
                'site_name' => 'BKX Labs',
                'image' => $ogImage,
            ],
            'twitter' => [
                'card' => 'summary_large_image',
                'title' => $tool['title'],
                'description' => $tool['valueProposition'],
                'image' => $ogImage,
            ],
        ];
    }

    /**
     * List all available tools (for /tools page)
     * 
     * @return View
     */
    public function index(): View
    {
        $registryPath = public_path('data/tools-registry.json');
        
        if (!file_exists($registryPath)) {
            return view('tools.index', ['tools' => []]);
        }

        $registryJson = file_get_contents($registryPath);
        $tools = json_decode($registryJson, true) ?? [];

        return view('tools.index', ['tools' => $tools]);
    }
}
