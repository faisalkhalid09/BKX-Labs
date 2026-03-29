<?php

namespace App\Filament\Resources;

use App\Filament\Resources\MeetingResource\Pages;
use App\Models\Lead;
use Filament\Forms;
use Filament\Forms\Form;
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

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Attendee Information')
                    ->schema([
                        Forms\Components\TextInput::make('first_name')
                            ->required(),
                        Forms\Components\TextInput::make('last_name')
                            ->required(),
                        Forms\Components\TextInput::make('email')
                            ->email()
                            ->required(),
                    ])->columns(2),
                
                Forms\Components\Section::make('Meeting Details')
                    ->schema([
                        Forms\Components\DateTimePicker::make('meeting_time')
                            ->required(),
                        Forms\Components\TextInput::make('google_event_id')
                            ->label('Google Event ID')
                            ->disabled(),
                    ])->columns(2),

                Forms\Components\Section::make('Project & Codebase State')
                    ->schema([
                        Forms\Components\Textarea::make('website_url')
                            ->label('Website URL or Codebase State')
                            ->required()
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
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\ViewAction::make(),
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
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
