<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('website_page_views', function (Blueprint $table) {
            $table->id();
            $table->date('date')->index();
            $table->string('page', 100)->default('home')->index();
            $table->unsignedBigInteger('count')->default(0);
            $table->unique(['date', 'page']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('website_page_views');
    }
};
