<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class WebsitePageView extends Model
{
    public $timestamps = false;

    protected $fillable = ['date', 'page', 'count'];

    protected $casts = ['date' => 'date'];

    /**
     * Atomically increment the view count for a given page on today's date.
     */
    public static function track(string $page = 'home'): void
    {
        static::upsert(
            [['date' => today()->toDateString(), 'page' => $page, 'count' => 1]],
            ['date', 'page'],
            ['count' => DB::raw('count + 1')]
        );
    }
}
