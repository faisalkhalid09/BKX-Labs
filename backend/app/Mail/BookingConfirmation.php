<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class BookingConfirmation extends Mailable
{
    use Queueable, SerializesModels;

    public $lead;
    public $meetLink;

    public function __construct($lead, $meetLink)
    {
        $this->lead = $lead;
        $this->meetLink = $meetLink;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Meeting Confirmation: BKX Labs Strategy Session',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.booking-confirmation',
        );
    }
}
