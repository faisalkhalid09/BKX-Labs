<?php

namespace App\Filament\Resources;

use App\Filament\Resources\AuditReportResource\Pages;
use App\Models\AuditReport;
use Filament\Forms\Components;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Schemas\Components\Section;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Actions\Action;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Illuminate\Support\Facades\Blade;
use Barryvdh\DomPDF\Facade\Pdf;

class AuditReportResource extends Resource
{
    protected static ?string $model = AuditReport::class;

    public static function getNavigationIcon(): string
    {
        return 'heroicon-o-document-chart-bar';
    }

    public static function getNavigationLabel(): string
    {
        return 'Audit Reports';
    }

    protected static ?string $modelLabel = 'Audit Report';

    protected static ?string $slug = 'audit-reports';

    public static function form(Schema $schema): Schema
    {
        return $schema->components([
            Section::make('Project Metadata')
                ->description('The clinical data for the project.')
                ->schema([
                    Components\TextInput::make('client_name')
                        ->required()
                        ->placeholder('e.g., Acme Corp'),
                    Components\FileUpload::make('client_logo_path')
                        ->label('Client Logo')
                        ->image()
                        ->directory('audit-reports/logos')
                        ->disk('public'),
                    Components\TagsInput::make('tech_stack')
                        ->label('Primary Tech Stack')
                        ->placeholder('Add technology (e.g. Laravel 10, React 18)')
                        ->required(),
                    Components\Textarea::make('audit_scope')
                        ->label('Audit Scope')
                        ->rows(3)
                        ->placeholder('What parts of the code were reviewed?')
                        ->columnSpanFull(),
                ])->columns(2),

            Section::make('The "Vital Signs" (Scores 1-100)')
                ->description('Health scores that drive the radial gauges.')
                ->schema([
                    Components\TextInput::make('security_score')
                        ->label('Security Posture')
                        ->numeric()
                        ->minValue(0)
                        ->maxValue(100)
                        ->required()
                        ->suffix('%'),
                    Components\TextInput::make('performance_score')
                        ->label('System Performance')
                        ->numeric()
                        ->minValue(0)
                        ->maxValue(100)
                        ->required()
                        ->suffix('%'),
                    Components\TextInput::make('maintainability_score')
                        ->label('Code Maintainability')
                        ->numeric()
                        ->minValue(0)
                        ->maxValue(100)
                        ->required()
                        ->suffix('%'),
                ])->columns(3),

            Section::make('Forensic Findings')
                ->description('Detailed analysis of the codebase.')
                ->schema([
                    Components\RichEditor::make('critical_vulnerabilities')
                        ->label('Critical Vulnerabilities')
                        ->placeholder('High-risk items like leaked API keys or SQL injection risks.')
                        ->columnSpanFull(),
                    Components\RichEditor::make('infrastructure_bottlenecks')
                        ->label('Infrastructure Bottlenecks')
                        ->placeholder('Server-side issues like misconfigured AWS controls.')
                        ->columnSpanFull(),
                    Components\RichEditor::make('frontend_debt')
                        ->label('Frontend Debt')
                        ->placeholder('Structural inefficiencies in the UI layer.')
                        ->columnSpanFull(),
                ]),

            Section::make('Technical Metrics (Page 4 Graphs)')
                ->description('Data points for Current vs Optimized state.')
                ->schema([
                    Components\TextInput::make('current_cpu')->label('Current CPU Usage (%)')->numeric()->default(80),
                    Components\TextInput::make('optimized_cpu')->label('Target CPU Usage (%)')->numeric()->default(20),
                    Components\TextInput::make('current_memory')->label('Current Memory Usage (%)')->numeric()->default(90),
                    Components\TextInput::make('optimized_memory')->label('Target Memory Usage (%)')->numeric()->default(30),
                ])->columns(2),

            Section::make('The Rescue Roadmap')
                ->description('The path to recovery.')
                ->schema([
                    Components\TextInput::make('phase_1_duration')
                        ->label('Phase 1 Duration')
                        ->default('Days 1-14'),
                    Components\Textarea::make('phase_1')
                        ->label('Phase 1 Strategy')
                        ->rows(3)
                        ->required(),
                        
                    Components\TextInput::make('phase_2_duration')
                        ->label('Phase 2 Duration')
                        ->default('Days 15-45'),
                    Components\Textarea::make('phase_2')
                        ->label('Phase 2 Strategy')
                        ->rows(3)
                        ->required(),
                        
                    Components\TextInput::make('phase_3_duration')
                        ->label('Phase 3 Duration')
                        ->default('Days 45-60'),
                    Components\Textarea::make('phase_3')
                        ->label('Phase 3 Strategy')
                        ->rows(3)
                        ->required(),
                ])->columns(2),

            Section::make('Decision & Closing')
                ->schema([
                    Components\Select::make('status_verdict')
                        ->options([
                            'DO NOT LAUNCH AS-IS' => 'DO NOT LAUNCH AS-IS',
                            'PROCEED WITH CAUTION' => 'PROCEED WITH CAUTION',
                            'STABLE / READY' => 'STABLE / READY',
                        ])
                        ->required()
                        ->default('DO NOT LAUNCH AS-IS'),
                    Components\Textarea::make('fastest_path')
                        ->label('The Fastest Responsible Path')
                        ->placeholder('Why starting Phase 1 immediately is the only safe option.')
                        ->columnSpanFull(),
                    Components\TextInput::make('upsell_link')
                        ->label('Upsell Link (Booking Page)')
                        ->url()
                        ->default('https://bkxlabs.com/rescue-strategy'),
                ])->columns(2),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('client_name')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('status_verdict')
                    ->badge()
                    ->color(fn (string $state): string => match($state) {
                        'DO NOT LAUNCH AS-IS' => 'danger',
                        'PROCEED WITH CAUTION' => 'warning',
                        'STABLE / READY' => 'success',
                        default => 'gray',
                    }),
                Tables\Columns\TextColumn::make('security_score')
                    ->label('Security')
                    ->suffix('%')
                    ->color(fn ($state) => AuditReport::getScoreColor($state)),
                Tables\Columns\TextColumn::make('performance_score')
                    ->label('Perf')
                    ->suffix('%')
                    ->color(fn ($state) => AuditReport::getScoreColor($state)),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable(),
            ])
            ->filters([])
            ->actions([
                ViewAction::make(),
                EditAction::make(),
                Action::make('download_pdf')
                    ->label('Download PDF')
                    ->icon('heroicon-o-arrow-down-tray')
                    ->color('success')
                    ->action(function (AuditReport $record) {
                        $pdf = Pdf::loadView('reports.audit-report', ['report' => $record]);
                        return response()->streamDownload(
                            fn () => print($pdf->output()),
                            "Audit_Report_{$record->client_name}.pdf"
                        );
                    }),
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
            'index' => Pages\ListAuditReports::route('/'),
            'create' => Pages\CreateAuditReport::route('/create'),
            'view' => Pages\ViewAuditReport::route('/{record}'),
            'edit' => Pages\EditAuditReport::route('/{record}/edit'),
        ];
    }
}
