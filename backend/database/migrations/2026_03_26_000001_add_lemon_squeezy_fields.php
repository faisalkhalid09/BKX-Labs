<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->string('lemon_squeezy_variant_id')->nullable()->after('price');
        });

        Schema::table('orders', function (Blueprint $table) {
            $table->string('lemon_squeezy_id')->nullable()->after('amount');
            $table->string('lemon_squeezy_order_id')->nullable()->after('lemon_squeezy_id');
            // Keep stripe_payment_intent_id for now to avoid breaking existing data if any, 
            // but we can make it nullable or remove it later.
            $table->string('stripe_payment_intent_id')->nullable()->change();
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
