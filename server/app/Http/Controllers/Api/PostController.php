<?php

namespace App\Http\Controllers\Api;

use App\Models\Post;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\PostResource;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class PostController extends Controller
{
    public function index()
    {
        $posts = PostResource::collection(Post::orderByDesc("created_at")->paginate(10));
        $totalPosts = Post::count();
        return response()->json(["posts" => $posts, "success" => true, "length" => $totalPosts]);
    }

    public function show($post_id)
    {
        $post = Post::with('comments')->find($post_id);

        if (!$post) {
            return response()->json(["message" => "Post not found", "success" => false], 404);
        }

        return response()->json([
            "post" => new PostResource($post),
            "comments" => $post->comments,
            "success" => true
        ]);
    }

    public function store(Request $request)
    {
        Post::validation($request);

        $newPost = new Post();
        $newPost->title = $request->title;
        $newPost->user_id = $request->user_id;
        $newPost->save();

        $newPost->hasAssets = true;
        $postDirectory = "storage/posts/{$newPost->id}/";

        // Create directory if it doesn't exist
        // if (!File::exists(public_path($postDirectory))) {
        //     File::makeDirectory(public_path($postDirectory), 0755, true);
        // }

        foreach ($request->file("postFile") as $file) {
            $fileName = uniqid() . '_' . $file->getClientOriginalName();
            $file->move(public_path($postDirectory), $fileName);
        }

        $newPost->save();

        return response()->json([
            "message" => "Post created successfully",
            "post" => new PostResource($newPost),
            "success" => true
        ]);
    }

    public function getPostAsset($userId, $postId, $filename)
    {
        $filePath = public_path("storage/posts/{$postId}/{$filename}");

        if (!File::exists($filePath)) {
            return response()->json(["message" => "File not found", "success" => false], 404);
        }

        return response()->file($filePath);
    }
}
