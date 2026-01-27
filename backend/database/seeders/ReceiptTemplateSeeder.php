<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ReceiptTemplateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $templates = [
            [
                'name' => 'Payment Received',
                'subject' => 'Payment Confirmation - {Project Name}',
                'body' => "Dear Client,\n\nWe have successfully received your payment of {Amount}. Thank you for your business.\n\nBest regards,\nVSH Team",
            ],
            [
                'name' => 'Project Update',
                'subject' => 'Project Update - {Project Name}',
                'body' => "Dear Client,\n\nHere is an update on your project: {Description}\n\nWe are making great progress.\n\nBest regards,\nVSH Team",
            ]
        ];

        foreach ($templates as $template) {
            \App\Models\ReceiptTemplate::firstOrCreate(
                ['name' => $template['name']],
                $template
            );
        }
    }
}
