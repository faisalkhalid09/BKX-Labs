<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ContactFormSubmitted extends Mailable
{
    use Queueable, SerializesModels;

    public string $contactName;
    public string $contactEmail;
    public string $contactMessage;

    /**
     * Create a new message instance.
     */
    public function __construct(array $data)
    {
        $this->contactName = $data['name'];
        $this->contactEmail = $data['email'];
        $this->contactMessage = $data['message'];
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'New Contact Form Submission - BKX Labs',
            replyTo: [$this->contactEmail],
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.contact-form',
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
