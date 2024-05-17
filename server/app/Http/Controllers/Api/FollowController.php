<?php

namespace App\Http\Controllers\Api;

use App\Events\NotifyEvent;
use App\Http\Controllers\Controller;
use App\Models\Follower;
use App\Models\Notification;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;

class FollowController extends Controller
{
    public function follow(Request $request)
    {
        try {

            $request->validate([
                "user_id" => "required|exists:users,id",
            ]);

            if ($request->user()->id != $request->user_id) {
                $follower = new Follower();
                $follower->user_id = $request->user()->id;
                $follower->status = "followed";
                $follower->follower_id = $request->user_id;
                $save = $follower->save();

                if ($save) {
                    $followerName = User::find($request->user_id)->name; // Assuming 'name' is a field in the User model.
                    $notification = new Notification();
                    $notification->content = $followerName . " followed you";
                    $notification->from = $request->user_id;
                    $notification->to = $request->user()->id;
                    $notification->seen = false;
                    $notification->save(); // Make sure to save the notification.

                    // Send response to the client
                    $response = response()->json(["success" => true]);

                    // Broadcast the notification asynchronously
                    broadcast(new NotifyEvent($notification));
                }
            }
        } catch (Exception $err) {
            return response()->json(["success" => false]);
        }
    }


    public function unfollow(Request $request, $user_id)
    {
        $save = Follower::where("user_id", $request->user()->id)->where("follower_id", $user_id)->first()->delete();
        if ($save)
            return response()->json(["status" => "success"]);
        return response()->json(["status" => "failed"]);
    }
}
