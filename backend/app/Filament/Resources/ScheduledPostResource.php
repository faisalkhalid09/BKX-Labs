<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ScheduledPostResource\Pages;
use App\Models\ScheduledPost;
use Filament\Forms\Components;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Schemas\Components\Section;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Actions\EditAction;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\BulkActionGroup;

class ScheduledPostResource extends Resource
{
    protected static ?string $model = ScheduledPost::class;

    public static function getNavigationIcon(): string
    {
        return 'heroicon-o-sparkles';
    }

    public static function getNavigationLabel(): string
    {
        return 'AI Social Posts';
    }

    protected static ?string $modelLabel = 'AI Social Post';

    protected static ?string $slug = 'ai-social-posts';

    public static function getNavigationGroup(): ?string
    {
        return 'Content';
    }

    public static function form(Schema $schema): Schema
    {
        return $schema->components([

            // ── Content Prompt ──────────────────────────────────────────────
            Section::make('Content Prompt')
                ->description('Tell the AI what the post should be about. The more detail you give, the better the output.')
                ->schema([
                    Components\Textarea::make('content_prompt')
                        ->label('Post Topic / Brief')
                        ->required()
                        ->rows(6)
                        ->helperText('Write as much detail as you want: tone, key points, call-to-action, audience, etc.')
                        ->placeholder('Example: Announce our new web audit service targeting Pakistani SMBs. Tone: professional but friendly. Key points: fast turnaround, actionable report, free consultation call included.')
                        ->columnSpanFull()
                        ->disabled(fn ($record) => $record && in_array($record->status, ['processing', 'generated', 'published'])),
                ]),

            // ── Image Prompt ─────────────────────────────────────────────────
            Section::make('Image Generation')
                ->description('Describe the image for Gemini to generate. Leave blank to post text-only.')
                ->schema([
                    Components\Textarea::make('image_prompt')
                        ->label('Image Description')
                        ->nullable()
                        ->rows(4)
                        ->helperText('Describe the image in detail: style, colors, subject, mood. Example: "A modern flat-design illustration of a laptop with a magnifying glass overlay, blue and white color palette, clean and professional."')
                        ->placeholder('Leave blank to skip image generation.')
                        ->columnSpanFull()
                        ->disabled(fn ($record) => $record && in_array($record->status, ['processing', 'generated', 'published'])),
                ]),

            // ── Platform Selection ───────────────────────────────────────────
            Section::make('Platforms')
                ->description('Select one or more platforms to publish this post to.')
                ->schema([
                    Components\CheckboxList::make('platforms')
                        ->label('Publish to')
                        ->options([
                            'facebook'  => '📘 Facebook',
                            'instagram' => '📸 Instagram',
                            'linkedin'  => '💼 LinkedIn',
                        ])
                        ->required()
                        ->minItems(1)
                        ->columns(3)
                        ->helperText('Each platform receives an AI-optimized caption.')
                        ->disabled(fn ($record) => $record && in_array($record->status, ['processing', 'generated', 'published'])),
                ]),

            // ── Scheduling ───────────────────────────────────────────────────
            Section::make('Scheduling')
                ->description('Choose when to publish. "Publish Now" dispatches the AI job instantly on save.')
                ->schema([
                    Components\Toggle::make('publish_immediately')
                        ->label('Publish Immediately')
                        ->default(true)
                        ->live()
                        ->helperText('Turn OFF to choose a specific date and time.')
                        ->disabled(fn ($record) => $record && in_array($record->status, ['processing', 'generated', 'published'])),

                    Components\DateTimePicker::make('scheduled_at')
                        ->label('Schedule For')
                        ->minDate(now())
                        ->seconds(false)
                        ->helperText('The post will be published at this exact time (server timezone).')
                        ->hidden(fn (Components\Get $get) => $get('publish_immediately') !== false)
                        ->required(fn (Components\Get $get) => $get('publish_immediately') === false)
                        ->disabled(fn ($record) => $record && in_array($record->status, ['processing', 'generated', 'published']))
                        ->columnSpanFull(),
                ]),

            // ── Generated Output (visible on Edit only) ─────────────────────
            Section::make('AI Generated Output')
                ->description('Captions generated by Gemini. Read-only — populated automatically after the job runs.')
                ->schema([
                    Components\Select::make('status')
                        ->label('Status')
                        ->options([
                            'pending'    => 'Pending',
                            'processing' => 'Processing',
                            'generated'  => 'Generated',
                            'published'  => 'Published',
                            'failed'     => 'Failed',
                        ])
                        ->disabled()
                        ->dehydrated(false),

                    Components\Textarea::make('facebook_caption')
                        ->label('Facebook Caption (Generated)')
                        ->rows(4)
                        ->disabled()
                        ->dehydrated(false)
                        ->columnSpanFull(),

                    Components\Textarea::make('instagram_caption')
                        ->label('Instagram Caption (Generated)')
                        ->rows(4)
                        ->disabled()
                        ->dehydrated(false)
                        ->columnSpanFull(),

                    Components\Textarea::make('linkedin_caption')
                        ->label('LinkedIn Caption (Generated)')
                        ->rows(4)
                        ->disabled()
                        ->dehydrated(false)
                        ->columnSpanFull(),

                    Components\Textarea::make('error_message')
                        ->label('Error Details')
                        ->rows(3)
                        ->disabled()
                        ->dehydrated(false)
                        ->hidden(fn ($record) => !$record || $record->status !== 'failed')
                        ->columnSpanFull(),
                ])
                ->hidden(fn ($record) => !$record), // Only show on Edit page
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('content_prompt')
                    ->label('Content Brief')
                    ->limit(60)
                    ->searchable()
                    ->tooltip(fn ($record) => $record->content_prompt),

                Tables\Columns\BadgeColumn::make('platforms')
                    ->label('Platforms')
                    ->formatStateUsing(fn ($state) => implode(', ', (array) $state))
                    ->color('info'),

                Tables\Columns\BadgeColumn::make('status')
                    ->label('Status')
                    ->colors([
                        'gray'    => 'pending',
                        'info'    => 'processing',
                        'warning' => 'generated',
                        'success' => 'published',
                        'danger'  => 'failed',
                    ]),

                Tables\Columns\TextColumn::make('scheduled_at')
                    ->label('Scheduled For')
                    ->dateTime('M j, Y g:i A')
                    ->placeholder('Immediately')
                    ->sortable(),

                Tables\Columns\TextColumn::make('published_at')
                    ->label('Published At')
                    ->dateTime('M j, Y g:i A')
                    ->placeholder('Not yet')
                    ->sortable(),

                Tables\Columns\TextColumn::make('created_at')
                    ->label('Created')
                    ->date('M j, Y')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->options([
                        'pending'    => 'Pending',
                        'processing' => 'Processing',
                        'generated'  => 'Generated',
                        'published'  => 'Published',
                        'failed'     => 'Failed',
                    ]),
            ])
            ->actions([
                EditAction::make(),
                DeleteAction::make()
                    ->hidden(fn ($record) => in_array($record->status, ['processing'])),
            ])
            ->bulkActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('created_at', 'desc');
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index'  => Pages\ListScheduledPosts::route('/'),
            'create' => Pages\CreateScheduledPost::route('/create'),
            'edit'   => Pages\EditScheduledPost::route('/{record}/edit'),
        ];
    }
}
