<?php
require __DIR__.'/vendor/autoload.php';
use LemonSqueezy\Laravel\Billable;
echo trait_exists(Billable::class) ? 'Exists' : 'Not found';
