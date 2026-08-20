<?php

namespace App\Filament\Resources\ScheduledPostResource\Pages;

use App\Filament\Resources\ScheduledPostResource;
use Filament\Resources\Pages\ListRecords;

class ListScheduledPosts extends ListRecords
{
    protected static string $resource = ScheduledPostResource::class;
}
