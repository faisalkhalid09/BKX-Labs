<?php

namespace App\Filament\Resources\SecurityLogs\Pages;

use App\Filament\Resources\SecurityLogs\SecurityLogResource;
use Filament\Resources\Pages\CreateRecord;

class CreateSecurityLog extends CreateRecord
{
    protected static string $resource = SecurityLogResource::class;
}
