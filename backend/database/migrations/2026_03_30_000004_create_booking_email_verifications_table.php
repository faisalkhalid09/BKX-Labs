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
        Schema::create('booking_email_verifications', function (Blueprint $table): void {
            $table->id();
            $table->string('email')->unique();
            $table->string('code_hash')->nullable();
            $table->dateTime('code_expires_at')->nullable();
            $table->dateTime('verified_at')->nullable();
            $table->string('session_token_hash', 64)->nullable();
            $table->dateTime('session_expires_at')->nullable();
            $table->unsignedTinyInteger('attempts')->default(0);
            $table->dateTime('last_sent_at')->nullable();
            $table->timestamps();

            $table->index(['email', 'session_expires_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('booking_email_verifications');
    }
};
