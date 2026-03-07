<?php

namespace App\Http\Controllers\Store;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\StreamedResponse;

class DownloadController extends Controller
{

    public function index()
    {
        $orders = Order::with('product')
            ->where('user_id', Auth::id())
            ->where('status', 'paid')
            ->latest()
            ->get();

        return view('downloads.index', compact('orders'));
    }

    public function download(Order $order): StreamedResponse
    {
        // Ensure the order belongs to the authenticated user
        abort_if($order->user_id !== Auth::id(), 403);

        // Ensure payment is complete
        abort_if(!$order->isPaid(), 403, 'Payment not completed.');

        // Ensure the download window hasn't expired
        abort_if(!$order->canDownload(), 410, 'Download link has expired.');

        $path = $order->product->private_file_path;

        abort_if(!$path || !Storage::disk('private')->exists($path), 404, 'File not found.');

        $filename = basename($path);

        return Storage::disk('private')->download($path, $filename);
    }
}
