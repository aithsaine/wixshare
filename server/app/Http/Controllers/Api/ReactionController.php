<?php

namespace App\Http\Controllers\Api;

use App\Events\Notify;
use App\Models\Reaction;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\PostResource;
use App\Models\Notification;
use App\Models\Post;

class ReactionController extends Controller
{
    public function store(Request $request)
    {
        Reaction::validate($request);
        $react = Reaction::where("user_id", $request->user_id)->where("post_id", $request->post_id)->first();
        if ($react) {
            if ($react->type == $request->type) {
                $react->delete();
                return response()->json(["status" => "success", "post" => PostResource::make($react->post)]);
            }
            $react->type = $request->type;
            $react->save();
            return response()->json(["status" => "success", "post" => PostResource::make($react->post)]);
        }
        $react = new Reaction();
        $react->type = $request->type;
        $react->user_id = $request->user_id;
        $react->post_id = $request->post_id;
        $react->save();
        $notification = new Notification();
        $notification->content =  " comment you";
        $notification->from = $request->user()->id;
        $notification->to = Post::find($request->post_id)->user_id;
        $notification->type = "new_reaction";
        $notification->seen = false;
        $notification->data_code = $request->post_id;
        $notification->save();
        event(new Notify($notification));

        return response()->json(["status" => "success", "post" => PostResource::make($react->post)]);
    }
}
