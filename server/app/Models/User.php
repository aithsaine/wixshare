<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Rules\VerifyAgeRule;
use Exception;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Http\Request;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        "gender",
        "birthday",
        'password',
        "description",
        "phone",
        "country",
        "hasCover"
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
    public static function validation(Request $request)
    {
        $request->validate([
            'first_name' => "required",
            "last_name" => "required",
            "email" => ["required", "unique:users,email",],
            "password" => "required",
            "birthday" => ["required", "date", new VerifyAgeRule()],
            "gender" => "required",
            "description" => "max:500",
            "phone" => "",
            "hasCover" => "boolean"
        ]);
    }
    public  function posts()
    {
        return $this->hasMany(Post::class)->orderByDesc("created_at");
    }
    public function  reactions()
    {
        return $this->hasMany(Reaction::class);
    }
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
    public function following()
    {
        return $this->belongsToMany(User::class, 'followers', 'user_id', 'follower_id');
    }

    public function followers()
    {
        return $this->belongsToMany(User::class, 'followers', 'follower_id', 'user_id');
    }
    public function sendMessages()
    {
        return $this->hasMany(Chat::class, "sender_id");
    }
    public function receivedMessages()
    {
        return $this->hasMany(Chat::class, "receiver_id");
    }
}
