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
        if (!Schema::hasTable('receipt_templates')) {
            Schema::create('receipt_templates', function (Blueprint $table) {
                $table->id();
                $table->string('name'); // e.g., "Payment Received"
                $table->string('subject');
                $table->text('body'); // The HTML/Text content
                $table->timestamps();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('receipt_templates');
    }
};
