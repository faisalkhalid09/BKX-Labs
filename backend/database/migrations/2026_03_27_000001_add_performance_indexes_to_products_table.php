<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Add composite indexes on products for the catalog and search queries.
     * Query pattern: WHERE is_active = 1 [AND category = ?] ORDER BY is_promoted DESC, created_at DESC
     */
    public function up(): void
    {
        Schema::table('products', function (Blueprint $table) {
            // Composite index for the catalog: is_active + is_promoted + created_at
            // Covers: WHERE is_active=1 ORDER BY is_promoted DESC, created_at DESC
            $table->index(['is_active', 'is_promoted', 'created_at'], 'products_catalog_idx');

            // Composite index for filtered catalog: is_active + category + is_promoted + created_at
            // Covers: WHERE is_active=1 AND category=? ORDER BY is_promoted DESC, created_at DESC
            $table->index(['is_active', 'category', 'is_promoted', 'created_at'], 'products_catalog_category_idx');

            // Index for price-range filter queries
            $table->index(['is_active', 'price'], 'products_active_price_idx');
        });
    }

    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropIndex('products_catalog_idx');
            $table->dropIndex('products_catalog_category_idx');
            $table->dropIndex('products_active_price_idx');
        });
    }
};
