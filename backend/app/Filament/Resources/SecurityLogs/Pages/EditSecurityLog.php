<?php

namespace App\Filament\Resources\SecurityLogs\Pages;

use App\Filament\Resources\SecurityLogs\SecurityLogResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditSecurityLog extends EditRecord
{
    protected static string $resource = SecurityLogResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make(),
        ];
    }
}
