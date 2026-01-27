<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RestrictedUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\User::firstOrCreate(
            ['email' => 'faisal3245.com@gmail.com'],
            [
                'name' => 'Faisal Admin',
                'password' => \Illuminate\Support\Facades\Hash::make('Faisalkhalid1#'),
                'email_verified_at' => now(),
            ]
        );
    }
}
