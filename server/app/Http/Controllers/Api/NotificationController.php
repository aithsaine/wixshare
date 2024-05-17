<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Notification;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class NotificationController extends Controller
{
    //
    public function store(Request $request)
    {
        try {
            Notification::validate($request);
        } catch (ValidationException $e) {
            return response()->json($e->errors());
        }
    }
}
