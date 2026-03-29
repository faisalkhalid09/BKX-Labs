<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::table('leads')
            ->select(['id', 'email', 'first_name', 'last_name'])
            ->orderBy('id')
            ->chunkById(200, function ($rows): void {
                foreach ($rows as $row) {
                    $first = strtolower(trim((string) $row->first_name));
                    $last = strtolower(trim((string) $row->last_name));

                    $isPlaceholder = ($first === '' || $first === 'valued')
                        && ($last === '' || $last === 'lead');

                    if (! $isPlaceholder) {
                        continue;
                    }

                    $localPart = strtolower((string) strtok((string) $row->email, '@'));
                    $tokens = preg_split('/[._\-]+/', $localPart);
                    $tokens = array_values(array_filter($tokens, static fn ($token) => $token !== ''));

                    if (empty($tokens)) {
                        continue;
                    }

                    $newFirstName = ucfirst($tokens[0]);
                    $newLastName = isset($tokens[1]) ? ucfirst($tokens[1]) : 'Lead';

                    DB::table('leads')
                        ->where('id', $row->id)
                        ->update([
                            'first_name' => $newFirstName,
                            'last_name' => $newLastName,
                            'updated_at' => now(),
                        ]);
                }
            });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // No-op: this is a one-time data correction migration.
    }
};
