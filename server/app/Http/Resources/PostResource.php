<?php

namespace App\Http\Resources;

use App\Helpers\Helper;
use App\Models\Reaction;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class PostResource extends JsonResource
{

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function getFilesNames()
    {
        $files = Storage::files('public/posts/' . $this->id);

        $fileNames = [];
        foreach ($files as $file) {
            $fileNames[] = pathinfo($file, PATHINFO_BASENAME);
        }

        return $fileNames;
    }

    public function toArray(Request $request): array
    {




        return [
            "user_picture" => asset('storage/profiles/' . $this->user->picture),
            "user_name" => $this->user->first_name . " " . $this->user->last_name,
            "user_id" => $this->user_id,
            "id" => $this->id,
            "created_at" => $this->created_at,
            "title" => $this->title,
            "files" => $this->getFilesNames(),
            "commentsCount" => count($this->comments),
            "likes" => count(Reaction::where("post_id", $this->id)->where("type", "like")->get()),
            "dislikes" => count(Reaction::where("post_id", $this->id)->where("type", "dislike")->get()),
            "date" => Helper::getDate($this->created_at),
            "reaction" => Reaction::where("post_id", $this->id)->where("user_id", Auth::user()->id)->first()->type ?? "none"
        ];
    }
}
