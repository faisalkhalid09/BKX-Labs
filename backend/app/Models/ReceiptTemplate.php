<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ReceiptTemplate extends Model
{
    protected $fillable = ['name', 'subject', 'body'];
}
