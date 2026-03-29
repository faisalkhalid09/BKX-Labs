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
        if (! Schema::hasColumn('leads', 'website_url')) {
            Schema::table('leads', function (Blueprint $table): void {
                $table->text('website_url')->nullable()->after('meeting_time');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasColumn('leads', 'website_url')) {
            Schema::table('leads', function (Blueprint $table): void {
                $table->dropColumn('website_url');
            });
        }
    }
};
