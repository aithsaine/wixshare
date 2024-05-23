<?php

namespace App\Http\Controllers\Api;

use App\Models\Post;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\PostResource;
use Illuminate\Support\Facades\Storage;

class PostController extends Controller
{
    public function index()
    {
        $posts = PostResource::collection(Post::orderByDesc("created_at")->paginate(10));
        return response()->json(["posts" => $posts,  "success" => true, "length" => count(Post::all())]);
    }
    public function show($post_id)
    {
        $post = new PostResource(Post::where("id", $post_id)->first());
        $comments = $post->comments;
        return response()->json(["post" => $post, "comments" => $comments, "status" => "success"]);
    }
    public function store(Request $request)
    {
        Post::validation($request);
        $newPost = new Post();
        $newPost->title = $request->title;
        $newPost->user_id = $request->user_id;
        $newPost->save();

        if ($request->hasFile("postFile")) {
            $newPost->hasAssets = true;
            foreach ($request->file("postFile") as $item) {
                $item->store("public/posts/{$newPost->id}/");
            }
        }
        $newPost->save();
        return response()->json(["message" => "post created with success", "post" => new PostResource($newPost), "success" => true]);
    }

    public function getPostAsset($folder, $filename)
    {
        $filePath = Storage::path("posts/" . $folder . "/" . $filename);

        return response()->file($filePath);
    }

   
}