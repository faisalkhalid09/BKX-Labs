<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->string('lemon_squeezy_variant_id')->nullable();
        });

        Schema::table('orders', function (Blueprint $table) {
            $table->string('lemon_squeezy_id')->nullable();
            $table->string('lemon_squeezy_order_id')->nullable();
            // Drop old payment column
            $table->dropColumn('stripe_payment_intent_id');
        });
    }

    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn('lemon_squeezy_variant_id');
        });

        Schema::table('orders', function (Blueprint $table) {
            $table->dropColumn(['lemon_squeezy_id', 'lemon_squeezy_order_id']);
        });
    }
};
