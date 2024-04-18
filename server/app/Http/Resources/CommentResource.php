<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CommentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public static function  getDate($dt)
    {
        if (\Carbon\Carbon::parse($dt)->diffInSeconds(Carbon::now()) < 5) {
            return "just now";
        }
        if (\Carbon\Carbon::parse($dt)->diffInSeconds(Carbon::now()) < 60) {
            return (int)\Carbon\Carbon::parse($dt)->diffInSeconds(Carbon::now()) . " seconds ago";
        }
        if (\Carbon\Carbon::parse($dt)->diffInMinutes(Carbon::now()) < 60) {
            return (int)\Carbon\Carbon::parse($dt)->diffInMinutes(Carbon::now()) . " minutes ago";
        }
        if (\Carbon\Carbon::parse($dt)->diffInHours(Carbon::now()) < 24) {
            return (int)\Carbon\Carbon::parse($dt)->diffInHours(Carbon::now()) . " hours ago";
        }
        if (\Carbon\Carbon::parse($dt)->diffInDays(Carbon::now()) < 7) {
            return (int)\Carbon\Carbon::parse($dt)->diffInDays(Carbon::now()) . " days ago";
        }
        if (\Carbon\Carbon::parse($dt)->diffInWeeks(Carbon::now()) <= 4) {
            return (int)\Carbon\Carbon::parse($dt)->diffInWeeks(Carbon::now()) . " weeks ago";
        }
        if (\Carbon\Carbon::parse($dt)->diffInMonths(Carbon::now()) < 12) {
            return (int)\Carbon\Carbon::parse($dt)->diffInMonths(Carbon::now()) . " months ago";
        }

        return (int)\Carbon\Carbon::parse($dt)->diffInYears(Carbon::now()) . " years ago";
    }
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "content" => $this->content,
            "date" => self::getDate($this->created_at),
            "user_name" => $this->user->first_name . " " . $this->user->last_name,
            "user_id" => $this->user->id,
            "picture" => $this->user->picture,
        ];
    }
}
