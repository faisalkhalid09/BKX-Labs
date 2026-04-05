<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            // SafePay tracker token — unique identifier for the payment session
            $table->string('safepay_tracker_token')->nullable()->unique()->after('amount');
            // SafePay order reference (our internal ref echoed back in metadata)
            $table->string('safepay_order_ref')->nullable()->after('safepay_tracker_token');
        });
    }

    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropColumn(['safepay_tracker_token', 'safepay_order_ref']);
        });
    }
};
