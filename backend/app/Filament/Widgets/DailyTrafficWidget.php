<?php

namespace App\Filament\Widgets;

use App\Models\StorePageView;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget as BaseWidget;

class DailyTrafficWidget extends BaseWidget
{
    protected static ?int $sort = 4;
    protected static ?string $heading = 'Store Traffic — Last 7 Days';

    public function table(Table $table): Table
    {
        return $table
            ->query(
                StorePageView::query()
                    ->where('date', '>=', now()->subDays(6)->toDateString())
                    ->orderByDesc('date')
            )
            ->columns([
                Tables\Columns\TextColumn::make('date')->date('D, M d Y')->sortable(),
                Tables\Columns\TextColumn::make('page')
                    ->badge()
                    ->color(fn (string $state): string => match($state) {
                        'store'   => 'primary',
                        'product' => 'success',
                        'search'  => 'warning',
                        default   => 'gray',
                    }),
                Tables\Columns\TextColumn::make('count')->label('Visits')->sortable(),
            ])
            ->paginated(false);
    }
}
