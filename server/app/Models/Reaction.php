<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class Reaction extends Model
{
    use HasFactory;
    protected  $fillable = ["type", "user_id", "post_id"];
    public static function validate(Request $request)
    {
        $request->validate(["type" => "required", "user_id" => "required|exists:users,id", "post_id" => "required|exists:posts,id"]);
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function  post()
    {
        return $this->belongsTo(Post::class);
    }
}
