<?php

namespace App\Filament\Resources\ScheduledPostResource\Pages;

use App\Filament\Resources\ScheduledPostResource;
use Filament\Resources\Pages\EditRecord;

class EditScheduledPost extends EditRecord
{
    protected static string $resource = ScheduledPostResource::class;

    protected function mutateFormDataBeforeFill(array $data): array
    {
        return ScheduledPostResource::mutateFormDataBeforeFill($data);
    }

    protected function mutateFormDataBeforeSave(array $data): array
    {
        return ScheduledPostResource::mutateFormDataBeforeSave($data);
    }
}
