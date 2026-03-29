<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BookingEmailVerification extends Model
{
    protected $fillable = [
        'email',
        'code_hash',
        'code_expires_at',
        'verified_at',
        'session_token_hash',
        'session_expires_at',
        'attempts',
        'last_sent_at',
    ];

    protected $casts = [
        'code_expires_at' => 'datetime',
        'verified_at' => 'datetime',
        'session_expires_at' => 'datetime',
        'last_sent_at' => 'datetime',
    ];
}
