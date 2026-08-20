<?php

namespace App\Filament\Resources\ScheduledPostResource\Pages;

use App\Filament\Resources\ScheduledPostResource;
use Filament\Resources\Pages\CreateRecord;

class CreateScheduledPost extends CreateRecord
{
    protected static string $resource = ScheduledPostResource::class;

    /**
     * Convert the virtual "publish_immediately" toggle into scheduled_at before saving.
     * If the toggle is ON (true), scheduled_at = null → observer fires instant dispatch.
     * If the toggle is OFF, scheduled_at holds the chosen datetime.
     */
    protected function mutateFormDataBeforeCreate(array $data): array
    {
        if ($data['publish_immediately'] ?? true) {
            $data['scheduled_at'] = null;
        }
        unset($data['publish_immediately']);
        return $data;
    }

    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }
}

