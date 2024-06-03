<?php

namespace App\Http\Controllers\Api;

use App\Models\Post;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\CommentResource;
use App\Http\Resources\PostResource;
use Error;
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

        if ($request->postFiles) {
            foreach ($request->file("postFiles") as $file) {
                $fileName = uniqid() . '_' . $file->getClientOriginalName();
                $file->move(public_path($postDirectory), $fileName);
            }

            $newPost->save();
        }


        return response()->json([
            "message" => "Post created successfully",
            "post" => new PostResource($newPost),
            "success" => true
        ]);
    }

    public function destroy($post_id, Request $request)
    {
        try {
            $post = Post::find($post_id);
            if ($post->user_id == $request->user()->id) {
                $postDirectory =
                    public_path('storage/posts/' . $post->id);;
                if (File::exists($postDirectory)) {
                    File::deleteDirectory($postDirectory);
                }
                $post->delete();
                return response()->json(["success" => true]);
            }
            return response("error deleting this post", 422);
        } catch (Error    $error) {
            return response($error, 422);
        }
    }


    public function getPostAsset($userId, $postId, $filename)
    {
        $filePath = public_path("storage/posts/{$postId}/{$filename}");

        if (!File::exists($filePath)) {
            return response()->json(["message" => "File not found", "success" => false], 404);
        }

        return response()->file($filePath);
    }

    public function postDetails($post_id)
    {
        $post = Post::find($post_id);
        if ($post) {
            $comments = CommentResource::collection($post->comments);
            $response = ["post" => new PostResource($post), "comments" => $comments, "success" => true];
            return response()->json($response);
        }
    }
}
