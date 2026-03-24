<?php

namespace App\Filament\Pages;

use App\Models\Product;
use Filament\Pages\Page;
use Filament\Tables;
use Filament\Tables\Concerns\InteractsWithTable;
use Filament\Tables\Contracts\HasTable;
use Filament\Tables\Table;

class PromotePage extends Page implements HasTable
{
    use InteractsWithTable;

    public static function getNavigationIcon(): string
    {
        return 'heroicon-o-megaphone';
    }

    public static function getNavigationSort(): ?int
    {
        return 3;
    }

    public static function getNavigationLabel(): string
    {
        return 'Promote Page';
    }

    public function getTitle(): string
    {
        return 'Promote Products';
    }

    protected string $view = 'filament.pages.promote-page';

    public function table(Table $table): Table
    {
        return $table
            ->query(Product::query())
            ->columns([
                Tables\Columns\ImageColumn::make('thumbnail_path')
                    ->label('Thumbnail')
                    ->square(),
                Tables\Columns\TextColumn::make('name')
                    ->searchable()
                    ->sortable()
                    ->weight('bold'),
                Tables\Columns\TextColumn::make('price')
                    ->money('usd')
                    ->sortable(),
                Tables\Columns\ToggleColumn::make('is_promoted')
                    ->label('Sponsor Product')
                    ->sortable(),
            ])
            ->filters([
                Tables\Filters\TernaryFilter::make('is_promoted')
                    ->label('Promotion Status'),
            ]);
    }
}
