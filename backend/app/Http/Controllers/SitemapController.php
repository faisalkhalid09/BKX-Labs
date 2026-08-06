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

        // Add the main website pages manually
        $staticPages = [
            '/',
            '/about',
            '/services',
            '/process',
            '/case-studies',
            '/contact',
            '/blog',
            '/codebase-audit',
            '/software-rescue',
        ];

        $now = now()->toAtomString();

        foreach ($staticPages as $page) {
            $xml .= '<url>';
            $xml .= '<loc>https://bkxlabs.com' . $page . '</loc>';
            $xml .= '<lastmod>' . $now . '</lastmod>';
            $xml .= '<changefreq>weekly</changefreq>';
            $xml .= '<priority>0.8</priority>';
            $xml .= '</url>';
        }

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
