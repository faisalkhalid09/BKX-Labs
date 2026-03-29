<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lead extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'meeting_time',
        'website_url',
        'codebase_state',
        'google_event_id',
        'meet_link',
        'success_access_token_hash',
        'success_cookie_hash',
        'success_access_expires_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'meeting_time' => 'datetime',
        'success_access_expires_at' => 'datetime',
    ];
}
