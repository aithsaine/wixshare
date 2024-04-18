<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Follower;
use Illuminate\Http\Request;

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
            $save = $follower->save();
            // if ($save)
            //     return response()->json(["status" => "success"]);
            // return response()->json(["status" => "failed"]);
            return response()->json(["success" => true]);
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
