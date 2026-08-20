<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('scheduled_posts', function (Blueprint $table) {
            $table->id();

            // User-provided prompts
            $table->text('content_prompt');
            $table->text('image_prompt')->nullable();

            // Which platforms to post to (JSON array: ['facebook','instagram','linkedin'])
            $table->json('platforms');

            // When to publish (null = publish immediately on save)
            $table->timestamp('scheduled_at')->nullable();

            // Lifecycle status
            $table->enum('status', [
                'pending',    // Saved, waiting to be picked up
                'processing', // Job dispatched, AI is working
                'generated',  // AI content ready, posting in progress
                'published',  // Successfully posted to all platforms
                'failed',     // Something went wrong
            ])->default('pending');

            // AI-generated captions (populated by GenerateAndPublishJob)
            $table->text('facebook_caption')->nullable();
            $table->text('instagram_caption')->nullable();
            $table->text('linkedin_caption')->nullable();

            // Temporary image path in storage/app/temp/ (deleted after posting)
            $table->string('image_path')->nullable();

            // Error details if status = failed
            $table->text('error_message')->nullable();

            // When the post was actually sent to platforms
            $table->timestamp('published_at')->nullable();

            $table->timestamps();

            // Index for the scheduler query
            $table->index(['status', 'scheduled_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('scheduled_posts');
    }
};
