<?php

namespace App\Filament\Resources\AuditReportResource\Pages;

use App\Filament\Resources\AuditReportResource;
use Filament\Actions;
use Filament\Resources\Pages\ViewRecord;

class ViewAuditReport extends ViewRecord
{
    protected static string $resource = AuditReportResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\EditAction::make(),
            Actions\Action::make('download_pdf')
                ->label('Download PDF')
                ->icon('heroicon-o-arrow-down-tray')
                ->color('success')
                ->action(function () {
                    $record = $this->getRecord();
                    $pdf = \Barryvdh\DomPDF\Facade\Pdf::loadView('reports.audit-report', ['report' => $record]);
                    return response()->streamDownload(
                        fn () => print($pdf->output()),
                        "Audit_Report_{$record->client_name}.pdf"
                    );
                }),
        ];
    }
}
