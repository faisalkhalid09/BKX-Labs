<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class WeeklyTrafficReport extends Mailable
{
    use Queueable, SerializesModels;

    public $totalVisitors;
    public $topPage;

    public function __construct(int $totalVisitors, string $topPage)
    {
        $this->totalVisitors = $totalVisitors;
        $this->topPage = $topPage;
    }

    public function build()
    {
        return $this->subject('BKX Labs Weekly Traffic Report')
                    ->view('emails.weekly-traffic');
    }
}
