<?php

namespace App\Filament\Widgets;

use App\Models\Product;
use App\Models\ProductView;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget as BaseWidget;
use Illuminate\Database\Eloquent\Builder;

class TopProductsWidget extends BaseWidget
{
    protected static ?int $sort = 3;
    protected static ?string $heading = 'Top Products by Views';
    protected int | string | array $columnSpan = 'full';

    public function table(Table $table): Table
    {
        return $table
            ->query(
                Product::query()
                    ->withSum('productViews as total_views', 'count')
                    ->withSum('orders as total_sales', 'amount')
                    ->withCount(['orders' => fn (Builder $q) => $q->where('status', 'paid')])
                    ->orderByDesc('total_views')
                    ->limit(8)
            )
            ->columns([
                Tables\Columns\TextColumn::make('name')->searchable()->weight('bold'),
                Tables\Columns\TextColumn::make('category')->badge()
                    ->color(fn (string $state): string => match($state) {
                        'ai_model' => 'primary', 'script' => 'success', 'template' => 'warning', default => 'gray',
                    }),
                Tables\Columns\TextColumn::make('total_views')->label('Views')->sortable()->default(0),
                Tables\Columns\TextColumn::make('orders_count')->label('Sales')->sortable()->default(0),
                Tables\Columns\TextColumn::make('total_sales')->label('Revenue')
                    ->money('USD')->sortable()->default(0),
                Tables\Columns\TextColumn::make('price')->money('USD'),
            ])
            ->paginated(false);
    }
}
