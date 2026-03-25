<?php

namespace App\Filament\Resources;

use App\Mail\DownloadLinkMail;
use App\Filament\Resources\OrderResource\Pages;
use App\Models\Order;
use Filament\Actions\Action;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Facades\Mail;

class OrderResource extends Resource
{
    protected static ?string $model = Order::class;

    public static function getNavigationIcon(): string|\BackedEnum|null
    {
        return 'heroicon-o-banknotes';
    }

    public static function getNavigationLabel(): string
    {
        return 'Finance';
    }

    public static function getNavigationGroup(): ?string
    {
        return null; // Remove group to make a flat sidebar
    }

    public static function getNavigationSort(): ?int
    {
        return 4;
    }

    public static function form(Schema $schema): Schema
    {
        return $schema->components([]); // Orders are read-only — created via Stripe checkout
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('id')->label('Order #')->sortable(),
                Tables\Columns\TextColumn::make('user.name')->label('Customer')->searchable(),
                Tables\Columns\TextColumn::make('user.email')->label('Email')->searchable()->toggleable(),
                Tables\Columns\TextColumn::make('product.name')->label('Product')->searchable(),
                Tables\Columns\TextColumn::make('status')
                    ->badge()
                    ->color(fn (string $state): string => match($state) {
                        'pending'  => 'warning',
                        'paid'     => 'success',
                        'failed'   => 'danger',
                        'refunded' => 'gray',
                        default    => 'gray',
                    }),
                Tables\Columns\TextColumn::make('amount')->money('USD')->sortable(),
                Tables\Columns\TextColumn::make('lemon_squeezy_order_id')
                    ->label('Lemon Squeezy Order')
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('download_expires_at')
                    ->label('Download Expires')
                    ->dateTime()
                    ->toggleable(),
                Tables\Columns\TextColumn::make('created_at')->dateTime()->sortable(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->options([
                        'pending'  => 'Pending',
                        'paid'     => 'Paid',
                        'failed'   => 'Failed',
                        'refunded' => 'Refunded',
                    ]),
            ])
            ->actions([
                Action::make('resend_download')
                    ->label('Resend Link')
                    ->icon('heroicon-o-paper-airplane')
                    ->color('primary')
                    ->requiresConfirmation()
                    ->modalHeading('Resend Download Link')
                    ->modalDescription('This will refresh the download expiry to 48 hours and email a new link to the customer.')
                    ->visible(fn (Order $record): bool => $record->status === 'paid')
                    ->action(function (Order $record): void {
                        Mail::to($record->user->email)->send(new DownloadLinkMail($record));
                        \Filament\Notifications\Notification::make()
                            ->title('Download link sent to ' . $record->user->email)
                            ->success()
                            ->send();
                    }),
            ])
            ->bulkActions([]);
    }

    public static function canCreate(): bool
    {
        return false;
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListOrders::route('/'),
        ];
    }
}
