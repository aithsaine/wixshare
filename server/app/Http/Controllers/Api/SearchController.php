<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\PostResource;
use App\Http\Resources\UserResource;
use App\Models\Post;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function search(Request $request)
    {
        try {
            $query = $request->searchQuery;
            $users                = User::whereRaw("concat(first_name,last_name) like '%{$query}%' ")->get();
            $posts = Post::whereRaw("title like '%{$query}%' ")->get();
            return  response()->json(["users" => $users, "posts" => $posts, "success" => true]);
        } catch (Exception $e) {
            return response($e, 500);
        }
    }
}
