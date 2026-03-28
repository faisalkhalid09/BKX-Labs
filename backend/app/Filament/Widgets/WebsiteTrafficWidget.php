<?php

namespace App\Filament\Widgets;

use App\Models\WebsitePageView;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget as BaseWidget;

class WebsiteTrafficWidget extends BaseWidget
{
    protected static ?int $sort = 5;
    protected static ?string $heading = 'Website Traffic — Last 7 Days';

    public function table(Table $table): Table
    {
        return $table
            ->query(
                WebsitePageView::query()
                    ->where('date', '>=', now()->subDays(6)->toDateString())
                    ->orderByDesc('date')
            )
            ->columns([
                Tables\Columns\TextColumn::make('date')->date('D, M d Y')->sortable(),
                Tables\Columns\TextColumn::make('page')
                    ->badge()
                    ->color(fn (string $state): string => match($state) {
                        'home'      => 'primary',
                        'services'  => 'success',
                        'process'   => 'warning',
                        'about'     => 'info',
                        'contact'   => 'danger',
                        default     => 'gray',
                    }),
                Tables\Columns\TextColumn::make('count')->label('Visits')->sortable(),
            ])
            ->paginated(false);
    }
}
