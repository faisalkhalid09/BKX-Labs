<?php

namespace App\Filament\Resources\SecurityLogs;

use App\Filament\Resources\SecurityLogs\Pages\CreateSecurityLog;
use App\Filament\Resources\SecurityLogs\Pages\EditSecurityLog;
use App\Filament\Resources\SecurityLogs\Pages\ListSecurityLogs;
use App\Filament\Resources\SecurityLogs\Schemas\SecurityLogForm;
use App\Filament\Resources\SecurityLogs\Tables\SecurityLogsTable;
use App\Models\SecurityLog;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class SecurityLogResource extends Resource
{
    protected static ?string $model = SecurityLog::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    public static function form(Schema $schema): Schema
    {
        return SecurityLogForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return SecurityLogsTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListSecurityLogs::route('/'),
            'create' => CreateSecurityLog::route('/create'),
            'edit' => EditSecurityLog::route('/{record}/edit'),
        ];
    }
}
