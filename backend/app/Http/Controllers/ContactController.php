<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class ContactController extends Controller
{
    public function submit(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'message' => 'required|string|max:5000',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            DB::table('contacts')->insert([
                'name' => $request->name,
                'email' => $request->email,
                'message' => $request->message,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            // TODO: Send email notification here
            // Mail::to('contact@vsh.com')->send(new ContactFormSubmitted($request->all()));

            return response()->json([
                'success' => true,
                'message' => 'Thank you for your message. We will get back to you within 24 hours.'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Something went wrong. Please try again later.'
            ], 500);
        }
    }
}
