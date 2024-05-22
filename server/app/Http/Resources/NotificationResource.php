<?php

namespace App\Http\Resources;

use App\Helpers\Helper;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class NotificationResource extends JsonResource
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
            "user_picture" => $this->sender->picture,
            "sender_name" => $this->sender->first_name . " " . $this->sender->last_name,
            "from_id" => $this->from,
            "type" => $this->type,
            "seen" => $this->seen,
            "time" => Helper::getDate($this->created_at)
        ];
    }
}
