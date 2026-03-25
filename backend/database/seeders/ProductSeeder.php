<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $products = [
            [
                'name'              => 'GPT Prompt Engineering Toolkit',
                'slug'              => 'gpt-prompt-engineering-toolkit',
                'short_description' => 'A complete collection of 200+ battle-tested GPT prompts for business, coding, and content creation.',
                'description'       => "Unlock the full power of large language models with our curated prompt library.\n\nIncludes:\n- 200+ categorized prompts\n- Prompt chaining templates\n- System instruction blueprints\n- Real-world use case examples",
                'price'             => 29.00,
                'category'          => 'ai_model',
                'is_active'         => true,
            ],
            [
                'name'              => 'Laravel SaaS Starter Kit',
                'slug'              => 'laravel-saas-starter-kit',
                'short_description' => 'Full-stack SaaS boilerplate with auth, Lemon Squeezy billing, admin panel, and multi-tenancy ready.',
                'description'       => "Skip months of setup — ship your SaaS in days.\n\nIncludes:\n- Laravel 12 + Filament Admin\n- Lemon Squeezy subscription billing\n- Role-based access control\n- Multi-tenant architecture\n- Full documentation",
                'lemon_squeezy_variant_id' => 'placeholder_variant_id',
                'price'             => 79.00,
                'category'          => 'script',
                'is_active'         => true,
            ],
            [
                'name'              => 'AI Lead Generation Bot',
                'slug'              => 'ai-lead-generation-bot',
                'short_description' => 'Automated Python bot that scrapes, qualifies, and emails leads using OpenAI — runs 24/7.',
                'description'       => "Generate qualified leads on autopilot.\n\nFeatures:\n- LinkedIn + web scraping\n- GPT-powered lead qualification\n- Automated personalized outreach\n- Dashboard with analytics",
                'price'             => 149.00,
                'category'          => 'ai_model',
                'is_active'         => true,
            ],
            [
                'name'              => 'Next.js Agency Website Template',
                'slug'              => 'nextjs-agency-website-template',
                'short_description' => 'Premium agency website template built with Next.js 15, fully animated and SEO optimized.',
                'description'       => "A stunning agency template that converts visitors into clients.\n\nIncludes:\n- Next.js 15 + TypeScript\n- Framer Motion animations\n- SEO optimized\n- Contact form integration\n- Lifetime updates",
                'price'             => 49.00,
                'category'          => 'template',
                'is_active'         => true,
            ],
        ];

        foreach ($products as $product) {
            Product::firstOrCreate(['slug' => $product['slug']], $product);
        }
    }
}
