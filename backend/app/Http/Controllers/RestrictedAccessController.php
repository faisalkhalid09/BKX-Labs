<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\ReceiptTemplate;
use Illuminate\Support\Facades\Mail;
use App\Mail\ClientReceipt;

class RestrictedAccessController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            // Check if it's the specific restricted user
            if ($user->email === 'faisal3245.com@gmail.com') {
                $token = $user->createToken('restricted-access')->plainTextToken;
                return response()->json(['token' => $token, 'user' => $user]);
            }
            
            // Logout if not the specific user
            Auth::logout();
            return response()->json(['message' => 'Unauthorized access.'], 403);
        }

        return response()->json(['message' => 'Invalid credentials.'], 401);
    }

    public function getTemplates()
    {
        return response()->json(ReceiptTemplate::all());
    }

    public function sendReceipt(Request $request)
    {
        $validated = $request->validate([
            'client_email' => 'required|email',
            'subject' => 'required|string',
            'body' => 'required|string',
        ]);

        Mail::to($validated['client_email'])->send(new ClientReceipt(
            $validated['subject'],
            $validated['body']
        ));

        return response()->json(['message' => 'Email sent successfully!']);
    }
}
