<?php

namespace App\Http\Resources;

use App\Helpers\Helper;
use App\Models\Chat;
use App\Models\Follower;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "first_name" => $this->first_name,
            "last_name" => $this->last_name,
            "email" => $this->email,
            "gender" => $this->gender,
            "birthday" => $this->birthday,
            "picture" => $this->picture ?? null,
            "followers" => count($this->followers),
            "following" => count($this->following),
            "posts" => count($this->posts),
            "FollowStatus" => Follower::where("user_id", auth()->user()->id)->where("follower_id", $this->id)->first()?->status,
            "status" => Helper::userLastActivityStatus($this->last_seen),
            // "msgs_not_seen" => count(Chat::where("sender_id", $this->id)->where("receiver_id", auth()->user()->id)->where("seen_at", null)->get()),
            // "msgsNotify" => count(Chat::where("receiver_id", $this->id)->whereNull("seen_at")->get()),
            "description" => $this->description,
            "phone" => $this->phone,
            "cover" => $this->cover
        ];
    }
}
