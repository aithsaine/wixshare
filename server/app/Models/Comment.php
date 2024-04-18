<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class Comment extends Model
{
    use HasFactory;
    protected $fillable = ["user_id", "post_id", "content"];

    public function  user()
    {
        return $this->belongsTo(User::class);
    }
    public function post()
    {
        return $this->belongsTo(Post::class);
    }
    public  static function validate(Request $request)
    {
        $request->validate([
            "user_id" => "required|exists:users,id",
            "post_id" => "required|exists:posts,id",
            "content" => "required"
        ]);
    }
}
