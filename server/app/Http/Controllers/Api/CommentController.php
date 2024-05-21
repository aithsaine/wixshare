<?php

namespace App\Http\Controllers\Api;

use App\Events\Notify;
use App\Models\Comment;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\CommentResource;
use App\Models\Notification;
use App\Models\Post;

class CommentController extends Controller
{
    public function index($post_id)
    {
        $comments = Comment::where('post_id', $post_id)->orderByDesc("created_at")->get();
        return response()->json(["status" => "success", "comments" => CommentResource::collection($comments)]);
    }
    public function store(Request $request)
    {
        Comment::validate($request);
        $comment =   Comment::create($request->only("user_id", "post_id", "content"));
        $to_id  = Post::find($request->post_id)->user_id;
        if ($request->user()->id != $to_id) {

            $notification = new Notification();
            $notification->content =  " comment you";
            $notification->from = $request->user()->id;
            $notification->to = $to_id;
            $notification->type = "new_comment";
            $notification->seen = false;
            $notification->data_code = $request->post_id;
            $notification->save();
            event(new Notify($notification));
        }
        return response()->json(["comment" => new CommentResource($comment), "status" => "success"]);
    }
}
