<?php

namespace App\Mail;

use App\Models\Order;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\URL;

class DownloadLinkMail extends Mailable
{
    use Queueable, SerializesModels;

    public string $downloadUrl;

    public function __construct(public Order $order)
    {
        // Refresh expiry to 48 h from now
        $order->update(['download_expires_at' => now()->addHours(48)]);

        $this->downloadUrl = route('downloads.download', $order);
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Your BKX Labs Download Link — ' . $this->order->product->name,
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.download-link',
        );
    }
}
