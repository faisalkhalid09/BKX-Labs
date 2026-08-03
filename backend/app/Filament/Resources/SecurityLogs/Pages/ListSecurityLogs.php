<?php

namespace App\Filament\Resources\SecurityLogs\Pages;

use App\Filament\Resources\SecurityLogs\SecurityLogResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListSecurityLogs extends ListRecords
{
    protected static string $resource = SecurityLogResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
