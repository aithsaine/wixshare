<?php

use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;
use App\Http\Middleware\AddBearerTokenFromCookie;
use App\Http\Controllers\Api\AuthenticationController;
use App\Http\Middleware\LastSeen;
use App\Models\User;
use Illuminate\Support\Facades\App;

Route::get('/user', function (Request $request) {
    $auth =  new UserResource($request->user());
    $messages = array_merge($request->user()->receivedMessages->toArray(), $request->user()->sendMessages->toArray());
    $friends = UserResource::collection(User::whereNot("id", $request->user()->id)->get());
    return response()->json(["success" => true, "auth" => $auth, "friends" => $friends, "messages" => $messages, "suggests" => UserResource::collection(User::whereNot("id", $request->user()->id)->get())]);
})->middleware("auth:sanctum");

Route::controller(AuthenticationController::class)
    ->group(function () {
        Route::post("register", "register");
        Route::post("login", "login");
        Route::post("logout", "logout")->middleware("auth:sanctum");
    });

Route::middleware(["auth:sanctum", LastSeen::class])->group(function () {
    // Post Controller
    Route::get("posts/index", [\App\Http\Controllers\Api\PostController::class, "index"])->name("post.index");
    Route::get("posts/{post_id}/show", [\App\Http\Controllers\Api\PostController::class, "show"])->name("post.show");
    Route::post("post/store", [\App\Http\Controllers\Api\PostController::class, "store"])->name("post.store");
    Route::get("post/assets/posts/{folder}/{filename}", [\App\Http\Controllers\Api\PostController::class, "getPostAsset"]);



    // Chat Controller
    Route::get("chat/messages", [\App\Http\Controllers\Api\ChatController::class, "getChat"]);
    Route::post("chat", [\App\Http\Controllers\Api\ChatController::class, "saveMessage"])->name("chat.save");
    Route::post("chat/{receiver_id}/{sender_id}/markseen", [\App\Http\Controllers\Api\ChatController::class, "markseen"]);
    Route::get("messages/unreaded", [\App\Http\Controllers\Api\ChatController::class, "getUnseenMessages"]);


    //Reaction Controller 
    Route::post("reaction/store", [\App\Http\Controllers\Api\ReactionController::class, "store"])->name("reaction.store");


    //Profile Controller
    Route::patch('/profile', [\App\Http\Controllers\Api\ProfileController::class, 'update'])->name('profile.update');
    Route::get("user/{user_id}", [\App\Http\Controllers\Api\ProfileController::class,  "getUser"]);
    Route::delete('/profile', [\App\Http\Controllers\Api\ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::patch("/profile/picture/update", [\App\Http\Controllers\Api\ProfileController::class,  "uploadOnlyPicture"])->name("profile.updatePicture");


    //Comment Controller
    Route::get("/comments/{post_id}", [\App\Http\Controllers\Api\CommentController::class, "index"]);
    Route::post("/comment/store", [\App\Http\Controllers\Api\CommentController::class, "store"])->name("comment.store");


    //Follower Controller
    Route::post("follow/store", [\App\Http\Controllers\Api\FollowController::class, "follow"]);
    Route::delete("follow/{user_id}/delete", [\App\Http\Controllers\Api\FollowController::class, "unfollow"]);



    //Other
    Route::get('/storage/picture/{filename}', function ($filename) {
        $filePath = Storage::path('/profiles/' . $filename);

        $resp = response();

        return response()->file($filePath);
    })->name("picture.get");
});
