<?php

namespace App\Filament\Widgets;

use App\Models\WebsiteVisitor;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget as BaseWidget;
use Illuminate\Database\Eloquent\Builder;

class WebsiteTrafficWidget extends BaseWidget
{
    protected static ?int $sort = 5;
    protected static ?string $heading = 'Advanced Traffic Forensics';
    protected int | string | array $columnSpan = 'full';

    public function table(Table $table): Table
    {
        return $table
            ->query(
                WebsiteVisitor::query()->latest()
            )
            ->columns([
                Tables\Columns\TextColumn::make('created_at')
                    ->label('Visited At')
                    ->dateTime('D, M d Y - h:i A')
                    ->sortable()
                    ->badge()
                    ->color('info'),
                    
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
                    
                Tables\Columns\TextColumn::make('visitor_id')
                    ->label('Visitor Identity')
                    ->description(fn (WebsiteVisitor $record): string => $record->ip_address ?? 'Unknown IP')
                    ->copyable()
                    ->searchable(['ip_address'])
                    ->icon('heroicon-o-user'),
                    
                Tables\Columns\TextColumn::make('device')
                    ->label('Hardware / OS')
                    ->searchable(['user_agent']),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('timeline')
                    ->label('Data Range')
                    ->options([
                        '7'   => 'Last 7 Days',
                        '30'  => 'Last 30 Days',
                        '90'  => 'Last 90 Days',
                        '120' => 'Last 120 Days',
                    ])
                    ->query(function (Builder $query, array $data) {
                        if ($value = $data['value']) {
                            $query->where('created_at', '>=', now()->subDays((int)$value));
                        }
                    })
                    ->default('7'),
            ])
            ->defaultSort('created_at', 'desc')
            ->paginated([10, 25, 50, 'all'])
            ->striped();
    }
}
