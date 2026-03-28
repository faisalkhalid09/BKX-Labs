<?php

namespace App\Filament\Pages;

use Filament\Pages\Page;
use App\Filament\Widgets\WebsiteTrafficWidget;

class WebsiteTraffic extends Page
{
    public static function getNavigationIcon(): string
    {
        return 'heroicon-o-chart-bar';
    }

    protected string $view = 'filament.pages.website-traffic';

    public static function getNavigationLabel(): string
    {
        return 'Website Traffic';
    }

    public function getTitle(): string
    {
        return 'Website Traffic Statistics';
    }

    public static function getNavigationSort(): ?int
    {
        return 10;
    }

    protected function getHeaderWidgets(): array
    {
        return [
            WebsiteTrafficWidget::class,
        ];
    }
}
