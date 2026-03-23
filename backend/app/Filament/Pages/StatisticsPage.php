<?php

namespace App\Filament\Pages;

use Filament\Pages\Page;

class StatisticsPage extends Page
{
    public static function getNavigationIcon(): string
    {
        return 'heroicon-o-chart-bar';
    }

    public static function getNavigationSort(): ?int
    {
        return 5;
    }
    protected string $view = 'filament.pages.statistics-page';
}
