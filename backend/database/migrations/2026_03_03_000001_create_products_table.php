<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->string('short_description', 300)->nullable();
            $table->decimal('price', 10, 2);
            $table->enum('category', ['ai_model', 'script', 'template', 'other'])->default('other');
            $table->string('private_file_path')->nullable(); // relative to storage/app/private/products/
            $table->string('thumbnail_path')->nullable();    // relative to storage/app/public/thumbnails/
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
