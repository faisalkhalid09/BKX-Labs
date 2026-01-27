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
        // FORCE DROP - This will run because it's a new migration file
        Schema::dropIfExists('receipt_templates');

        // FORCE CREATE
        Schema::create('receipt_templates', function (Blueprint $table) {
            $table->id();
            $table->string('name'); 
            $table->string('subject');
            $table->text('body');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('receipt_templates');
    }
};
