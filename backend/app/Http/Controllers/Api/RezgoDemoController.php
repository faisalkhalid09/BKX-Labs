<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RezgoDemoController extends Controller
{
    /**
     * Fetch all ticket prices joined with their types from the devrezgo database.
     * This uses the default connection but explicitly queries the external database
     * to keep the integration cleanly separated from the main Laravel app migrations.
     */
    public function getPrices(Request $request)
    {
        try {
            // Ensure the root user can access the manual db
            $results = DB::select("
                SELECT 
                    tp.id,
                    tp.date,
                    tp.price,
                    tp.park_price,
                    tp.price_adult,
                    tp.price_child,
                    tp.KGS_Adult,
                    tp.KGS_Child,
                    tt.ticket_name
                FROM devrezgo.ticket_prices tp
                JOIN devrezgo.tickettypes tt ON tp.ticket_id = tt.id
                ORDER BY tp.date ASC
            ");

            return response()->json([
                'status' => 'success',
                'data' => $results
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Could not connect to the Rezgo database. Ensure it is initialized.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
