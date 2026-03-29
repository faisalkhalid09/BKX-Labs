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
        Schema::table('leads', function (Blueprint $table): void {
            if (! Schema::hasColumn('leads', 'success_access_token_hash')) {
                $table->string('success_access_token_hash', 64)->nullable()->after('meet_link');
            }

            if (! Schema::hasColumn('leads', 'success_cookie_hash')) {
                $table->string('success_cookie_hash', 64)->nullable()->after('success_access_token_hash');
            }

            if (! Schema::hasColumn('leads', 'success_access_expires_at')) {
                $table->dateTime('success_access_expires_at')->nullable()->after('success_cookie_hash');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('leads', function (Blueprint $table): void {
            if (Schema::hasColumn('leads', 'success_access_expires_at')) {
                $table->dropColumn('success_access_expires_at');
            }

            if (Schema::hasColumn('leads', 'success_cookie_hash')) {
                $table->dropColumn('success_cookie_hash');
            }

            if (Schema::hasColumn('leads', 'success_access_token_hash')) {
                $table->dropColumn('success_access_token_hash');
            }
        });
    }
};
