<?php

namespace App\Filament\Resources;

use App\Filament\Resources\PostResource\Pages;
use App\Models\Post;
use Filament\Forms\Components;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Schemas\Components\Section;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Actions\EditAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\BulkActionGroup;
use Illuminate\Support\Str;

class PostResource extends Resource
{
    protected static ?string $model = Post::class;

    public static function getNavigationIcon(): string
    {
        return 'heroicon-o-pencil-square';
    }

    public static function getNavigationLabel(): string
    {
        return 'Blog Posts';
    }

    protected static ?string $modelLabel = 'Blog Post';

    protected static ?string $slug = 'blog-posts';

    public static function getNavigationGroup(): ?string
    {
        return 'Content';
    }

    public static function form(Schema $schema): Schema
    {
        return $schema->components([
            Section::make('Post Content')
                ->description('The main content of the blog post.')
                ->schema([
                    Components\TextInput::make('title')
                        ->required()
                        ->live(onBlur: true)
                        ->afterStateUpdated(function (string $state, callable $set, $get) {
                            // Auto-fill slug from title only if slug is currently empty
                            if (empty($get('slug'))) {
                                $set('slug', Str::slug($state));
                            }
                        })
                        ->columnSpanFull(),

                    Components\TextInput::make('slug')
                        ->required()
                        ->unique(Post::class, 'slug', ignoreRecord: true)
                        ->helperText('Auto-generated from title. Change only if needed.')
                        ->columnSpanFull(),

                    Components\Textarea::make('excerpt')
                        ->required()
                        ->rows(3)
                        ->helperText('A short summary shown on the blog listing page. Aim for 1-2 sentences.')
                        ->columnSpanFull(),

                    Components\RichEditor::make('body')
                        ->required()
                        ->label('Post Body')
                        ->toolbarButtons([
                            'attachFiles',
                            'blockquote',
                            'bold',
                            'bulletList',
                            'codeBlock',
                            'h2',
                            'h3',
                            'italic',
                            'link',
                            'orderedList',
                            'redo',
                            'strike',
                            'underline',
                            'undo',
                        ])
                        ->columnSpanFull(),
                ]),

            Section::make('Cover Image')
                ->schema([
                    Components\FileUpload::make('cover_image')
                        ->label('Cover Image (optional)')
                        ->image()
                        ->directory('blog/covers')
                        ->disk('public')
                        ->helperText('Recommended: 1200x630px. Shown at the top of the post and on the listing card.')
                        ->columnSpanFull(),
                ]),

            Section::make('SEO Settings')
                ->description('Leave blank to use the post title and excerpt automatically.')
                ->schema([
                    Components\TextInput::make('meta_title')
                        ->label('Meta Title (optional)')
                        ->helperText('Overrides the post title in browser tab and Google results. Max 60 characters.')
                        ->maxLength(60)
                        ->columnSpanFull(),

                    Components\Textarea::make('meta_description')
                        ->label('Meta Description (optional)')
                        ->rows(2)
                        ->helperText('Overrides the excerpt in Google search snippets. Max 160 characters.')
                        ->maxLength(160)
                        ->columnSpanFull(),
                ]),

            Section::make('Publishing')
                ->schema([
                    Components\Toggle::make('is_published')
                        ->label('Published')
                        ->helperText('Toggle on to make this post visible on the website.')
                        ->default(false),
                ]),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('title')
                    ->searchable()
                    ->sortable()
                    ->limit(60),

                Tables\Columns\IconColumn::make('is_published')
                    ->label('Published')
                    ->boolean(),

                Tables\Columns\TextColumn::make('reading_time_mins')
                    ->label('Read Time')
                    ->suffix(' min')
                    ->sortable(),

                Tables\Columns\TextColumn::make('published_at')
                    ->label('Published At')
                    ->date('M j, Y')
                    ->sortable(),

                Tables\Columns\TextColumn::make('updated_at')
                    ->label('Last Updated')
                    ->date('M j, Y')
                    ->sortable(),
            ])
            ->filters([
                Tables\Filters\TernaryFilter::make('is_published')
                    ->label('Published Status')
                    ->trueLabel('Published only')
                    ->falseLabel('Drafts only'),
            ])
            ->actions([
                EditAction::make(),
            ])
            ->bulkActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('published_at', 'desc');
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index'  => Pages\ListPosts::route('/'),
            'create' => Pages\CreatePost::route('/create'),
            'edit'   => Pages\EditPost::route('/{record}/edit'),
        ];
    }
}
