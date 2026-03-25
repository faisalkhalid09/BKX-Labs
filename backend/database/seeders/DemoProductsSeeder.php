<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class DemoProductsSeeder extends Seeder
{
    public function run(): void
    {
        $targetCount = 5000;
        $chunkSize = 500;
        $thumbnailPath = $this->ensureDemoThumbnail();

        $categories = ['ai_model', 'script', 'template', 'other'];
        $namePrefixes = [
            'Neural', 'Quantum', 'Prompt', 'Automation', 'Cloud', 'Secure', 'Dynamic', 'Smart',
            'Rapid', 'Modern', 'Enterprise', 'Velocity', 'Apex', 'Core', 'Prime', 'Data',
        ];
        $nameTopics = [
            'Analytics', 'Pipeline', 'Toolkit', 'Framework', 'Assistant', 'Generator', 'Workflow',
            'Dashboard', 'Optimizer', 'Engine', 'Builder', 'Suite', 'Pack', 'Matrix', 'Studio',
        ];
        $nameUseCases = [
            'for Marketing Teams', 'for SaaS Founders', 'for DevOps', 'for Agencies',
            'for Content Ops', 'for Product Teams', 'for Ecommerce', 'for Startups',
            'for Customer Support', 'for Data Teams',
        ];

        $batch = [];
        $now = now();

        for ($i = 1; $i <= $targetCount; $i++) {
            $category = $categories[array_rand($categories)];
            $name = sprintf(
                '%s %s %s %d',
                $namePrefixes[array_rand($namePrefixes)],
                $nameTopics[array_rand($nameTopics)],
                $nameUseCases[array_rand($nameUseCases)],
                $i
            );

            $slug = Str::slug($name) . '-' . $i;
            $price = mt_rand(900, 150000) / 100;
            $isPromoted = ($i % 20 === 0);

            $shortDescription = sprintf(
                'Demo %s product focused on speed, reliability, and practical workflows for modern teams.',
                str_replace('_', ' ', $category)
            );

            $description = implode("\n", [
                'This is a demo catalog product generated for performance and UI testing.',
                'Includes implementation guidance, editable assets, and usage examples.',
                'Use this item to validate filtering, search, checkout, and promoted listing behavior.',
            ]);

            $batch[] = [
                'name' => $name,
                'slug' => $slug,
                'description' => $description,
                'short_description' => $shortDescription,
                'price' => $price,
                'category' => $category,
                'private_file_path' => null,
                'thumbnail_path' => $thumbnailPath,
                'images' => json_encode([$thumbnailPath]),
                'is_active' => true,
                'is_promoted' => $isPromoted,
                'created_at' => $now,
                'updated_at' => $now,
            ];

            if (count($batch) >= $chunkSize || $i === $targetCount) {
                DB::table('products')->upsert(
                    $batch,
                    ['slug'],
                    [
                        'name',
                        'description',
                        'short_description',
                        'price',
                        'category',
                        'private_file_path',
                        'thumbnail_path',
                        'images',
                        'is_active',
                        'is_promoted',
                        'updated_at',
                    ]
                );

                $batch = [];
            }
        }
    }

    private function ensureDemoThumbnail(): string
    {
        $targetRelative = 'thumbnails/demo-product.png';
        $targetAbsolute = storage_path('app/public/' . $targetRelative);

        if (File::exists($targetAbsolute)) {
            return $targetRelative;
        }

        File::ensureDirectoryExists(dirname($targetAbsolute));

        $sourceCandidates = [
            public_path('brand-logo.png'),
            public_path('logo-header.png'),
            public_path('logo.png'),
        ];

        foreach ($sourceCandidates as $source) {
            if (File::exists($source)) {
                File::copy($source, $targetAbsolute);
                return $targetRelative;
            }
        }

        return $targetRelative;
    }
}
