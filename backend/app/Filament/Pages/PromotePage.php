<?php

namespace App\Filament\Pages;

use Filament\Pages\Page;

class PromotePage extends Page
{
    public static function getNavigationIcon(): string
    {
        return 'heroicon-o-megaphone';
    }

    public static function getNavigationSort(): ?int
    {
        return 3;
    }
    protected string $view = 'filament.pages.promote-page';
}
