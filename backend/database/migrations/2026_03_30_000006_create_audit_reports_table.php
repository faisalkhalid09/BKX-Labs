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
        Schema::create('audit_reports', function (Blueprint $table) {
            $table->id();
            
            // Project Metadata
            $table->string('client_name');
            $table->string('client_logo_path')->nullable();
            $table->json('tech_stack')->nullable();
            $table->text('audit_scope')->nullable();
            
            // Vital Signs (Scores 1-100)
            $table->integer('security_score')->default(0);
            $table->integer('performance_score')->default(0);
            $table->integer('maintainability_score')->default(0);
            
            // Forensic Findings
            $table->text('critical_vulnerabilities')->nullable();
            $table->text('infrastructure_bottlenecks')->nullable();
            $table->text('frontend_debt')->nullable();
            
            // Technical Metrics (for graphs)
            $table->integer('current_cpu')->default(0);
            $table->integer('optimized_cpu')->default(0);
            $table->integer('current_memory')->default(0);
            $table->integer('optimized_memory')->default(0);
            
            // Rescue Roadmap
            $table->text('phase_1')->nullable();
            $table->text('phase_2')->nullable();
            $table->text('phase_3')->nullable();
            
            // Decision
            $table->string('status_verdict')->default('DO NOT LAUNCH AS-IS');
            $table->text('fastest_path')->nullable();
            $table->string('upsell_link')->nullable();
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('audit_reports');
    }
};
