<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;

class SitemapController extends Controller
{
    public function index()
    {
        // Fetch all published posts ordered by newest first
        $posts = Post::where('is_published', true)
            ->whereNotNull('published_at')
            ->orderBy('published_at', 'desc')
            ->get();

        $xml = '<?xml version="1.0" encoding="UTF-8"?>';
        $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

        // ── Core Agency Pages ──
        $staticUrls = [
            ['loc' => '/', 'changefreq' => 'weekly', 'priority' => '1.0'],
            ['loc' => '/services', 'changefreq' => 'monthly', 'priority' => '0.9'],
            ['loc' => '/case-study', 'changefreq' => 'monthly', 'priority' => '0.8'],
            ['loc' => '/about', 'changefreq' => 'monthly', 'priority' => '0.8'],
            ['loc' => '/process', 'changefreq' => 'monthly', 'priority' => '0.8'],
            ['loc' => '/contact', 'changefreq' => 'monthly', 'priority' => '0.7'],
            ['loc' => '/privacy-policy', 'changefreq' => 'yearly', 'priority' => '0.3'],
            ['loc' => '/tos', 'changefreq' => 'yearly', 'priority' => '0.3'],
            // ── New Service Landing Pages ──
            ['loc' => '/hire-laravel-developer', 'changefreq' => 'monthly', 'priority' => '0.95'],
            ['loc' => '/hire-react-developer', 'changefreq' => 'monthly', 'priority' => '0.95'],
            ['loc' => '/technical-debt-remediation', 'changefreq' => 'monthly', 'priority' => '0.9'],
            ['loc' => '/codebase-audit', 'changefreq' => 'monthly', 'priority' => '0.9'],
            ['loc' => '/software-rescue', 'changefreq' => 'monthly', 'priority' => '0.9'],
            // ── Tools Hub ──
            ['loc' => '/tools', 'changefreq' => 'weekly', 'priority' => '0.95'],
            // ── Individual Tool Pages ──
            ['loc' => '/tools/post-quantum-cbom-generator', 'changefreq' => 'monthly', 'priority' => '0.85'],
            ['loc' => '/tools/nvidia-blackwell-pue-estimator', 'changefreq' => 'monthly', 'priority' => '0.80'],
            ['loc' => '/tools/ai-prompt-privacy-auditor', 'changefreq' => 'monthly', 'priority' => '0.80'],
            ['loc' => '/tools/admt-proportionality-scorer', 'changefreq' => 'monthly', 'priority' => '0.80'],
            ['loc' => '/tools/nist-fips-203-migration-timeline-planner', 'changefreq' => 'monthly', 'priority' => '0.80'],
            ['loc' => '/tools/direct-to-chip-liquid-cooling-roi', 'changefreq' => 'monthly', 'priority' => '0.80'],
            ['loc' => '/tools/esg-carbon-footprint-tracker', 'changefreq' => 'monthly', 'priority' => '0.80'],
            ['loc' => '/tools/zk-circuit-validator', 'changefreq' => 'monthly', 'priority' => '0.80'],
            ['loc' => '/tools/crypto-agility-maturity-model', 'changefreq' => 'monthly', 'priority' => '0.80'],
            // ── Glossary Pages ──
            ['loc' => '/glossary/post-quantum-cbom', 'changefreq' => 'monthly', 'priority' => '0.8'],
            ['loc' => '/glossary/soc2-type-2-compliance', 'changefreq' => 'monthly', 'priority' => '0.8'],
            ['loc' => '/glossary/eu-ai-act-annex-iii', 'changefreq' => 'monthly', 'priority' => '0.8'],
            ['loc' => '/glossary/data-center-pue', 'changefreq' => 'monthly', 'priority' => '0.8'],
            ['loc' => '/glossary/gpu-cloud-egress-fees', 'changefreq' => 'monthly', 'priority' => '0.8'],
        ];

        $now = now()->toAtomString();

        foreach ($staticUrls as $item) {
            $xml .= '<url>';
            $xml .= '<loc>https://bkxlabs.com' . $item['loc'] . '</loc>';
            $xml .= '<lastmod>' . $now . '</lastmod>';
            $xml .= '<changefreq>' . $item['changefreq'] . '</changefreq>';
            $xml .= '<priority>' . $item['priority'] . '</priority>';
            $xml .= '</url>';
        }

        // Add Blog Main Page
        $xml .= '<url>';
        $xml .= '<loc>https://bkxlabs.com/blog</loc>';
        $xml .= '<lastmod>' . $now . '</lastmod>';
        $xml .= '<changefreq>weekly</changefreq>';
        $xml .= '<priority>0.9</priority>';
        $xml .= '</url>';

        // Add all dynamic blog posts
        foreach ($posts as $post) {
            $xml .= '<url>';
            $xml .= '<loc>https://bkxlabs.com/blog/' . $post->slug . '</loc>';
            
            // Use the updated_at or published_at for the last modified date
            $lastMod = $post->updated_at ? $post->updated_at->toAtomString() : $post->published_at->toAtomString();
            
            $xml .= '<lastmod>' . $lastMod . '</lastmod>';
            $xml .= '<changefreq>monthly</changefreq>';
            $xml .= '<priority>0.6</priority>';
            $xml .= '</url>';
        }

        $xml .= '</urlset>';

        return Response::make($xml, 200, [
            'Content-Type' => 'application/xml',
        ]);
    }
}
