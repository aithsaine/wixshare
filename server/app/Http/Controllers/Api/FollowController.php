<?php

namespace App\Http\Controllers\Api;

use App\Events\Notify;
use App\Http\Controllers\Controller;
use App\Models\Follower;
use App\Models\Notification;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;

use function PHPUnit\Framework\returnValue;

class FollowController extends Controller
{
    public function follow(Request $request)
    {

        $request->validate([
            "user_id" => "required|exists:users,id",
        ]);

        if ($request->user()->id != $request->user_id) {
            $follower = new Follower();
            $follower->user_id = $request->user()->id;
            $follower->status = "followed";
            $follower->follower_id = $request->user_id;
            $follower->save();
            $followerName = User::find($request->user_id)->name; // Assuming 'name' is a field in the User model.
            $notification = new Notification();
            $notification->content = $followerName . " followed you";
            $notification->from = $request->user()->id;
            $notification->to = $request->user_id;
            $notification->type = "new_follower";
            $notification->seen = false;
            $notification->save(); // Make sure to save the notification.
            event(new Notify($notification));
            return response()->json(["success" => true]);
        }
    }


    public function unfollow(Request $request, $user_id)
    {
        $save = Follower::where("user_id", $request->user()->id)->where("follower_id", $user_id)->first()->delete();
        if ($save) {
            Notification::where("from", $request->user()->id)->where("to", $user_id)->first()->delete();
            return response()->json(["status" => "success"]);
        }
        return response()->json(["status" => "failed"]);
    }
}
