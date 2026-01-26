<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;
use App\Mail\ContactFormSubmitted;
use App\Mail\ContactFormAutoReply;

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
            // Save to database
            DB::table('contacts')->insert([
                'name' => $request->name,
                'email' => $request->email,
                'message' => $request->message,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            // Send notification email to admin
            Mail::to(config('mail.contact_recipient', 'contact@bkxlabs.com'))
                ->send(new ContactFormSubmitted($request->all()));

            // Send auto-reply confirmation to customer
            Mail::to($request->email)
                ->send(new ContactFormAutoReply($request->name));

            return response()->json([
                'success' => true,
                'message' => 'Thank you for your message. We will get back to you within 24 hours.'
            ], 200);
        } catch (\Exception $e) {
            Log::error('Contact form error: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'Something went wrong. Please try again later.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
