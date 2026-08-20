<?php

namespace App\Filament\Resources\ScheduledPostResource\Pages;

use App\Filament\Resources\ScheduledPostResource;
use Filament\Resources\Pages\CreateRecord;

class CreateScheduledPost extends CreateRecord
{
    protected static string $resource = ScheduledPostResource::class;

    protected function mutateFormDataBeforeCreate(array $data): array
    {
        return ScheduledPostResource::mutateFormDataBeforeCreate($data);
    }

    protected function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }
}
