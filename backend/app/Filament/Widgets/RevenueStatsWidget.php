<?php

namespace App\Filament\Widgets;

use App\Models\Order;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class RevenueStatsWidget extends BaseWidget
{
    protected static ?int $sort = 1;

    protected function getStats(): array
    {
        $totalRevenue   = Order::where('status', 'paid')->sum('amount');
        $monthlyRevenue = Order::where('status', 'paid')
            ->whereMonth('created_at', now()->month)
            ->whereYear('created_at', now()->year)
            ->sum('amount');
        $orderCount     = Order::where('status', 'paid')->count();
        $avgOrderValue  = $orderCount > 0 ? $totalRevenue / $orderCount : 0;

        return [
            Stat::make('Total Revenue', '$' . number_format($totalRevenue, 2))
                ->description('All paid orders')
                ->color('success'),

            Stat::make('Monthly Revenue', '$' . number_format($monthlyRevenue, 2))
                ->description(now()->format('F Y'))
                ->color('primary'),

            Stat::make('Avg Order Value', '$' . number_format($avgOrderValue, 2))
                ->description("Over {$orderCount} paid orders")
                ->color('warning'),
        ];
    }
}
