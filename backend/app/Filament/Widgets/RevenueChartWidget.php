<?php

namespace App\Filament\Widgets;

use App\Models\Order;
use Filament\Widgets\Widget;
use Illuminate\Support\Carbon;

class RevenueChartWidget extends Widget
{
    protected string $view = 'filament.widgets.revenue-chart';
    protected static ?int $sort = 2;
    protected int | string | array $columnSpan = 'full';

    public function getChartData(): array
    {
        $days = collect(range(29, 0))->map(fn ($i) => now()->subDays($i)->toDateString());

        $revenues = Order::where('status', 'paid')
            ->where('created_at', '>=', now()->subDays(29)->startOfDay())
            ->get()
            ->groupBy(fn ($o) => $o->created_at->toDateString())
            ->map(fn ($group) => $group->sum('amount'));

        return [
            'labels' => $days->map(fn ($d) => Carbon::parse($d)->format('M d'))->values()->toArray(),
            'data'   => $days->map(fn ($d) => round($revenues->get($d, 0), 2))->values()->toArray(),
        ];
    }
}
