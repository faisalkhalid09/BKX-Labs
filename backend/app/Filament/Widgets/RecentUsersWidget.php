<?php

namespace App\Filament\Widgets;

use App\Models\User;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget as BaseWidget;

class RecentUsersWidget extends BaseWidget
{
    protected static ?int $sort = 6;
    protected static ?string $heading = 'Recent Registrations';

    public function table(Table $table): Table
    {
        return $table
            ->query(
                User::query()
                    ->withCount(['orders' => fn ($q) => $q->where('status', 'paid')])
                    ->orderByDesc('created_at')
                    ->limit(10)
            )
            ->columns([
                Tables\Columns\TextColumn::make('name')->searchable()->weight('bold'),
                Tables\Columns\TextColumn::make('email')->searchable()->toggleable(),
                Tables\Columns\TextColumn::make('orders_count')->label('Purchases')->sortable()->default(0),
                Tables\Columns\TextColumn::make('last_login_at')
                    ->label('Last Login')
                    ->since()
                    ->placeholder('Never')
                    ->sortable(),
                Tables\Columns\TextColumn::make('created_at')->label('Registered')->since()->sortable(),
            ])
            ->paginated(false);
    }
}
