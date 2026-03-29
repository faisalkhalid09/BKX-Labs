<?php

namespace App\Filament\Resources\AuditReportResource\Pages;

use App\Filament\Resources\AuditReportResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditAuditReport extends EditRecord
{
    protected static string $resource = AuditReportResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\ViewAction::make(),
            Actions\DeleteAction::make(),
        ];
    }
}
