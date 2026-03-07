<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use PDO;
use PDOException;

class RezgoDemoController extends Controller
{
    /**
     * Fetch all ticket prices joined with their types from the devrezgo database.
     * Uses an isolated PDO connection to guarantee access regardless of Laravel's main db config.
     */
    public function getPrices(Request $request)
    {
        try {
            $host = '127.0.0.1';
            $db   = 'devrezgo';
            $user = 'devrezgo_user';
            $pass = 'Faisalkhalid1#'; 
            $charset = 'utf8mb4';

            $dsn = "mysql:host=$host;dbname=$db;charset=$charset";
            $options = [
                PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES   => false,
            ];

            $pdo = new PDO($dsn, $user, $pass, $options);

            $stmt = $pdo->query("
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
                FROM ticket_prices tp
                JOIN tickettypes tt ON tp.ticket_id = tt.id
                ORDER BY tp.date ASC
            ");

            $results = $stmt->fetchAll();

            return response()->json([
                'status' => 'success',
                'data' => $results
            ]);
        } catch (PDOException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Could not connect to the Rezgo database. Ensure it is initialized.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
