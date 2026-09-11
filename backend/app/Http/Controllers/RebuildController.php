<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class RebuildController extends Controller
{
    /**
     * POST /api/internal/rebuild
     *
     * Triggers a non-blocking frontend rebuild on the server.
     * Protected by a shared secret token in the X-Rebuild-Token header.
     *
     * The rebuild script runs asynchronously (fire-and-forget) so the
     * HTTP response returns immediately without waiting for the build.
     */
    public function trigger(Request $request): JsonResponse
    {
        // ── Token Validation ─────────────────────────────────────
        $expectedToken = config('app.rebuild_secret', env('REBUILD_SECRET'));
        $providedToken = $request->header('X-Rebuild-Token');

        if (empty($expectedToken) || !hash_equals($expectedToken, (string) $providedToken)) {
            Log::warning('RebuildController: Unauthorized rebuild attempt.', [
                'ip' => $request->ip(),
            ]);
            return response()->json(['message' => 'Unauthorized.'], 401);
        }

        // ── Fire-and-Forget Rebuild ───────────────────────────────
        $logFile = '/var/log/bkx-rebuild.log';
        $scriptPath = '/var/www/BKX-Labs/rebuild.sh';

        // Verify the script exists before attempting to run it
        if (!file_exists($scriptPath)) {
            Log::error("RebuildController: rebuild.sh not found at {$scriptPath}");
            return response()->json(['message' => 'Rebuild script not found on server.'], 500);
        }

        // Run the rebuild script in the background (non-blocking)
        // Output is appended to the log file with a timestamp separator
        $cmd = sprintf(
            'echo "\n\n=== Rebuild triggered at %s by %s ===" >> %s 2>&1 && bash %s >> %s 2>&1 &',
            date('Y-m-d H:i:s'),
            $request->ip(),
            escapeshellarg($logFile),
            escapeshellarg($scriptPath),
            escapeshellarg($logFile)
        );

        exec($cmd);

        Log::info('RebuildController: Frontend rebuild triggered.', [
            'ip'         => $request->ip(),
            'triggered_by' => $request->header('X-Triggered-By', 'unknown'),
        ]);

        return response()->json([
            'message' => 'Rebuild triggered successfully. Check /var/log/bkx-rebuild.log for progress.',
            'timestamp' => now()->toIso8601String(),
        ]);
    }
}
