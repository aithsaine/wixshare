<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\NotificationResource;
use App\Http\Resources\PostResource;
use App\Http\Resources\UserResource;
use App\Models\Notification;
use App\Models\Post;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class NotificationController extends Controller
{
    //
    public function store(Request $request)
    {
        try {
            $posts = PostResource::collection(Post::findMany($request->posts));
            $notifications = Notification::where('to', $request->to)->get();
            foreach ($notifications as $notification) {
                $notification->seen = true;
                $notification->save();
            }
            return response()->json(["notifications" => NotificationResource::collection($notifications), "users" =>  UserResource::collection(User::findMany($request->users)), "posts" => $posts]);
        } catch (ValidationException $e) {
            return response()->json($e->errors(), 422);
        }
    }

    public function index(Request $request)
    {
    }

    public function maskseen($to)
    {
        try {

            $notifications = Notification::where('to', $to)->all();
            foreach ($notifications as $notification) {
                $notification->seen = true;
                $notification->save();
            }
            return response()->json(["success" => true]);
        } catch (Exception $error) {
            throw $error;
        }
    }
}
