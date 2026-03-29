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
        Schema::table('audit_reports', function (Blueprint $table) {
            $table->string('phase_1_duration')->default('Days 1-14')->after('phase_1');
            $table->string('phase_2_duration')->default('Days 15-45')->after('phase_2');
            $table->string('phase_3_duration')->default('Days 45-60')->after('phase_3');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('audit_reports', function (Blueprint $table) {
            $table->dropColumn(['phase_1_duration', 'phase_2_duration', 'phase_3_duration']);
        });
    }
};
