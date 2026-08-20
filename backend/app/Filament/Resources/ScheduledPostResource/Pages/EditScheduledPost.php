<?php

namespace App\Filament\Resources\ScheduledPostResource\Pages;

use App\Filament\Resources\ScheduledPostResource;
use Filament\Actions\DeleteAction;
use Filament\Resources\Pages\EditRecord;

class EditScheduledPost extends EditRecord
{
    protected static string $resource = ScheduledPostResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make()
                ->hidden(fn () => in_array($this->record->status, ['processing'])),
        ];
    }

    /**
     * Restore the virtual toggle from the stored scheduled_at value when filling the form.
     */
    protected function mutateFormDataBeforeFill(array $data): array
    {
        $data['publish_immediately'] = is_null($data['scheduled_at'] ?? null);
        return $data;
    }

    /**
     * Convert the virtual toggle back to scheduled_at before saving.
     */
    protected function mutateFormDataBeforeSave(array $data): array
    {
        if ($data['publish_immediately'] ?? true) {
            $data['scheduled_at'] = null;
        }
        unset($data['publish_immediately']);
        return $data;
    }
}

