<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\WebsiteVisitor;
use App\Mail\WeeklyTrafficReport;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\DB;

class SendWeeklyTrafficEmail extends Command
{
    protected $signature = 'traffic:send-weekly';
    protected $description = 'Send a personalized weekly traffic report to Faisal';

    public function handle()
    {
        $lastWeek = now()->subDays(7);

        // Calculate total unique visitors based on unique IPs
        $totalVisitors = WebsiteVisitor::where('created_at', '>=', $lastWeek)
            ->distinct('ip_address')
            ->count('ip_address');

        // Identify the most frequently visited landing page over the past week
        $topPageResult = WebsiteVisitor::select('page', DB::raw('count(*) as total'))
            ->where('created_at', '>=', $lastWeek)
            ->groupBy('page')
            ->orderByDesc('total')
            ->first();

        // Convert the page name cleanly (e.g. '/' or 'home' -> 'Home')
        $topPage = $topPageResult ? ucfirst($topPageResult->page) : 'N/A';
        if ($topPage === '/' || empty($topPage)) {
            $topPage = 'Home';
        }

        // Send Email using strict address requested
        Mail::to('faisal3245.com@gmail.com')->send(new WeeklyTrafficReport($totalVisitors, $topPage));

        $this->info("Weekly traffic intelligence email sent successfully to Faisal! (Computed {$totalVisitors} visitors).");
    }
}
