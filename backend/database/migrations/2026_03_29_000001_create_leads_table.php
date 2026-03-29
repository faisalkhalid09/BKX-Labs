<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('leads', function (Blueprint $blueprint) {
            $blueprint->id();
            $blueprint->string('first_name')->nullable();
            $blueprint->string('last_name')->nullable();
            $blueprint->string('email');
            $blueprint->dateTime('meeting_time');
            $blueprint->text('website_url')->nullable(); // The new question
            $blueprint->text('codebase_state')->nullable();
            $blueprint->string('google_event_id')->unique();
            $blueprint->timestamps();

            // Index for faster searching
            $blueprint->index('email');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('leads');
    }
};
