<?php

namespace App\Filament\Resources;

use App\Filament\Resources\MeetingResource\Pages;
use App\Models\Lead;
use Filament\Actions;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Schemas\Schema;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class MeetingResource extends Resource
{
    protected static ?string $model = Lead::class;

    public static function getNavigationIcon(): string
    {
        return 'heroicon-o-calendar-days';
    }

    public static function getNavigationLabel(): string
    {
        return 'Meetings';
    }

    protected static ?string $modelLabel = 'Meeting';

    protected static ?string $slug = 'meetings';

    public static function form(Schema $schema): Schema
    {
        return $schema->components([
            \Filament\Schemas\Components\Section::make('Attendee Information')
                ->schema([
                    \Filament\Forms\Components\TextInput::make('first_name')
                        ->required(),
                    \Filament\Forms\Components\TextInput::make('last_name')
                        ->required(),
                    \Filament\Forms\Components\TextInput::make('email')
                        ->email()
                        ->required(),
                ])->columns(2),
            
            \Filament\Schemas\Components\Section::make('Meeting Details')
                ->schema([
                    \Filament\Forms\Components\DateTimePicker::make('meeting_time')
                        ->required(),
                    \Filament\Forms\Components\TextInput::make('google_event_id')
                        ->label('Google Event ID')
                        ->disabled(),
                    \Filament\Forms\Components\TextInput::make('meet_link')
                        ->label('Google Meet Link')
                        ->url()
                        ->nullable()
                        ->columnSpanFull(),
                ])->columns(2),

            \Filament\Schemas\Components\Section::make('Project & Codebase State')
                ->schema([
                    \Filament\Forms\Components\Textarea::make('website_url')
                        ->label('Website URL or Codebase State')
                        ->rows(4)
                        ->required()
                        ->columnSpanFull(),
                    \Filament\Forms\Components\Textarea::make('codebase_state')
                        ->label('Additional Codebase Notes')
                        ->rows(4)
                        ->nullable()
                        ->columnSpanFull(),
                ]),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('first_name')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('last_name')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('email')
                    ->searchable(),
                Tables\Columns\TextColumn::make('meeting_time')
                    ->dateTime()
                    ->sortable(),
                Tables\Columns\TextColumn::make('website_url')
                    ->label('Website / Codebase')
                    ->limit(40)
                    ->toggleable(),
                Tables\Columns\TextColumn::make('meet_link')
                    ->label('Meet Link')
                    ->url(fn (Lead $record): ?string => $record->meet_link)
                    ->openUrlInNewTab()
                    ->formatStateUsing(fn (?string $state): string => filled($state) ? 'Open Link' : 'Not Available')
                    ->toggleable(),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->actions([
                ViewAction::make(),
                EditAction::make(),
            ])
            ->bulkActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
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
            'index' => Pages\ListMeetings::route('/'),
            'create' => Pages\CreateMeeting::route('/create'),
            'view' => Pages\ViewMeeting::route('/{record}'),
            'edit' => Pages\EditMeeting::route('/{record}/edit'),
        ];
    }
}
