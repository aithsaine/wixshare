<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class Notification extends Model
{
    use HasFactory;

    protected $fillable = ["content", "from", "to", "seen"];

    public static function validate(Request $request)
    {
        $request->validate(
            [
                "content" => 'required',
                "from" => ["required", "exists:users,id"],
                "to" => ["required", "exists:users,id"],
                "seen" => 'required'
            ]
        );
    }
    public function sender()
    {
        return $this->belongsTo(User::class, "from");
    }
    public function receiver()
    {
        return $this->belongsTo(User::class, "to");
    }
}
