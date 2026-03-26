<?php

namespace App\Http\Controllers\Store;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class LegalController extends Controller
{
    public function index(Request $request)
    {
        $tab = $request->query('tab', 'terms');

        if (!in_array($tab, ['terms', 'privacy', 'dmca'])) {
            $tab = 'terms';
        }

        return view('store.legal', compact('tab'));
    }
}
