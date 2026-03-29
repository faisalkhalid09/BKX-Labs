<?php

namespace App\Filament\Resources\AuditReportResource\Pages;

use App\Filament\Resources\AuditReportResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListAuditReports extends ListRecords
{
    protected static string $resource = AuditReportResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
