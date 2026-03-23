<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProductResource\Pages;
use App\Models\Product;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\BulkActionGroup;
use Filament\Forms\Components;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Str;

class ProductResource extends Resource
{
    protected static ?string $model = Product::class;

    public static function getNavigationIcon(): string|\BackedEnum|null
    {
        return 'heroicon-o-shopping-bag';
    }

    public static function getNavigationGroup(): ?string
    {
        return null;
    }

    public static function getNavigationSort(): ?int
    {
        return 2;
    }

    public static function form(Schema $schema): Schema
    {
        return $schema->components([
            \Filament\Schemas\Components\Section::make('Product Details')->schema([
                Components\TextInput::make('name')
                    ->required()
                    ->maxLength(255)
                    ->live(onBlur: true)
                    ->afterStateUpdated(fn ($state, $set) => $set('slug', Str::slug($state))),

                Components\TextInput::make('slug')
                    ->required()
                    ->unique(Product::class, 'slug', ignoreRecord: true)
                    ->maxLength(255),

                Components\Select::make('category')
                    ->options([
                        'ai_model' => 'AI Model',
                        'script'   => 'Website Script',
                        'template' => 'Template',
                        'other'    => 'Other',
                    ])
                    ->required(),

                Components\TextInput::make('price')
                    ->numeric()
                    ->prefix('$')
                    ->required()
                    ->step(0.01),

                Components\Toggle::make('is_active')
                    ->label('Active / Visible in Store')
                    ->default(true),
            ])->columns(2),

            \Filament\Schemas\Components\Section::make('Description')->schema([
                Components\TextInput::make('short_description')
                    ->maxLength(300)
                    ->placeholder('One-liner shown on the catalog card'),

                Components\RichEditor::make('description')
                    ->columnSpanFull(),
            ]),

            \Filament\Schemas\Components\Section::make('Files')->schema([
                Components\FileUpload::make('thumbnail_path')
                    ->label('Thumbnail Image')
                    ->image()
                    ->directory('thumbnails')
                    ->disk('public')
                    ->imagePreviewHeight('150'),

                Components\FileUpload::make('private_file_path')
                    ->label('Product File (ZIP / Model — private)')
                    ->directory('products')
                    ->disk('private')
                    ->acceptedFileTypes(['application/zip', 'application/octet-stream', 'application/x-zip-compressed'])
                    ->maxSize(512000)
                    ->helperText('Stored securely outside the public directory.'),
            ]),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('thumbnail_path')
                    ->label('Thumbnail')
                    ->disk('public')
                    ->square(),
                Tables\Columns\TextColumn::make('name')->searchable()->sortable(),
                Tables\Columns\TextColumn::make('category')
                    ->badge()
                    ->color(fn (string $state): string => match($state) {
                        'ai_model' => 'primary',
                        'script'   => 'success',
                        'template' => 'warning',
                        default    => 'gray',
                    }),
                Tables\Columns\TextColumn::make('price')->money('USD')->sortable(),
                Tables\Columns\IconColumn::make('is_active')->label('Active')->boolean(),
                Tables\Columns\TextColumn::make('orders_count')->label('Sales')->counts('orders'),
                Tables\Columns\TextColumn::make('created_at')->dateTime()->sortable()->toggleable(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('category')
                    ->options([
                        'ai_model' => 'AI Model',
                        'script'   => 'Script',
                        'template' => 'Template',
                        'other'    => 'Other',
                    ]),
                Tables\Filters\TernaryFilter::make('is_active')->label('Active'),
            ])
            ->actions([
                EditAction::make(),
                DeleteAction::make(),
            ])
            ->bulkActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index'  => Pages\ListProducts::route('/'),
            'create' => Pages\CreateProduct::route('/create'),
            'edit'   => Pages\EditProduct::route('/{record}/edit'),
        ];
    }
}
